<template>
  <div class="barcode-scanner">
    <div v-if="isScanning" class="scanner-container">
      <div class="scanner-header">
        <h2 class="scanner-title">
          <i class="pi pi-camera mr-2"></i>
          Escaneie o código de barras
        </h2>
        <p class="scanner-subtitle">Posicione o código dentro da área de leitura</p>
      </div>

      <div class="scanner-viewport">
        <div id="interactive" class="viewport"></div>

        <div class="scanning-overlay">
          <div class="corner-marker top-left"></div>
          <div class="corner-marker top-right"></div>
          <div class="corner-marker bottom-left"></div>
          <div class="corner-marker bottom-right"></div>

          <div class="scan-line"></div>

          <div class="focus-area">
            <div class="focus-frame"></div>
          </div>
        </div>
      </div>

      <div class="scanner-instructions">
        <div class="instruction-item">
          <i class="pi pi-eye text-blue-400"></i>
          <span>Mantenha o código bem visível</span>
        </div>
        <div class="instruction-item">
          <i class="pi pi-mobile text-green-400"></i>
          <span>Use boa iluminação</span>
        </div>
        <div class="instruction-item">
          <i class="pi pi-clock text-purple-400"></i>
          <span>Aguarde a leitura automática</span>
        </div>
      </div>

      <div class="scanner-controls">
        <Button
          @click="stopScanner"
          severity="danger"
          size="large"
          icon="pi pi-times"
          class="close-button"
        >
          Cancelar
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'
import Quagga, { type QuaggaJSResultObject } from '@ericblade/quagga2'

const emit = defineEmits(['barcode-detected', 'close'])

const isScanning = ref(false)

const startScanner = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true })
    isScanning.value = true

    await new Promise((resolve) => setTimeout(resolve, 100))

    const targetElement = document.querySelector('#interactive') as HTMLElement
    if (!targetElement) {
      throw new Error('Elemento do scanner não encontrado')
    }

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: targetElement,
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        frequency: 10,
        decoder: {
          readers: ['ean_reader'],
        },
        locate: true,
      },
      (err: Error | null) => {
        if (err) {
          console.error('Erro ao inicializar o scanner:', err)
          isScanning.value = false
          emit('close')
          return
        }
        Quagga.start()
      },
    )

    const detectionHandler = (result: QuaggaJSResultObject) => {
      console.log(result)
      if (result.codeResult.code) {
        const format = result.codeResult.format || 'EAN_13'
        emit('barcode-detected', { code: result.codeResult.code, format })
        Quagga.stop()
        stopScanner()
      }
    }

    Quagga.onDetected(detectionHandler)
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error)
    isScanning.value = false
    emit('close')
  }
}

const stopScanner = () => {
  try {
    if (Quagga.CameraAccess.getActiveStreamLabel()) {
      Quagga.stop()
    }
  } catch (error) {
    console.error('Erro ao parar o scanner:', error)
  } finally {
    isScanning.value = false
    emit('close')
  }
}

onMounted(() => {
  startScanner()
})

onUnmounted(() => {
  if (isScanning.value) {
    stopScanner()
  }
})
</script>

<style scoped>
.barcode-scanner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95));
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.scanner-container {
  width: 100%;
  max-width: 600px;
  height: 100vh;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.scanner-header {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  z-index: 10;
}

.scanner-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8fafc;
}

.scanner-subtitle {
  font-size: 0.9rem;
  color: #cbd5e1;
  font-weight: 400;
}

.scanner-viewport {
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 450px;
  flex-shrink: 0;
}

.viewport {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.scanning-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
}

.corner-marker {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #3b82f6;
  border-radius: 4px;
}

.corner-marker.top-left {
  top: 20px;
  left: 20px;
  border-right: none;
  border-bottom: none;
  animation: pulse-corner 2s infinite;
}

.corner-marker.top-right {
  top: 20px;
  right: 20px;
  border-left: none;
  border-bottom: none;
  animation: pulse-corner 2s infinite 0.5s;
}

.corner-marker.bottom-left {
  bottom: 20px;
  left: 20px;
  border-right: none;
  border-top: none;
  animation: pulse-corner 2s infinite 1s;
}

.corner-marker.bottom-right {
  bottom: 20px;
  right: 20px;
  border-left: none;
  border-top: none;
  animation: pulse-corner 2s infinite 1.5s;
}

.focus-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 150px;
}

.focus-frame {
  width: 100%;
  height: 100%;
  border: 2px dashed #10b981;
  border-radius: 8px;
  animation: focus-glow 2s infinite alternate;
}

.scan-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ef4444, transparent);
  animation: scan-move 2s linear infinite;
  box-shadow: 0 0 10px #ef4444;
}

.scanner-instructions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  z-index: 10;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e2e8f0;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.instruction-item i {
  font-size: 1.1rem;
}

.scanner-controls {
  display: flex;
  justify-content: center;
  z-index: 10;
  margin-bottom: 20px;
}

.close-button {
  border-radius: 50px !important;
  padding: 16px 32px !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  min-width: 150px !important;
  background: rgba(239, 68, 68, 0.9) !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3) !important;
  transition: all 0.3s ease !important;
  color: white !important;
}

.close-button:hover {
  background: rgba(239, 68, 68, 1) !important;
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4) !important;
}

.close-button:focus {
  outline: none !important;
  box-shadow:
    0 0 0 3px rgba(239, 68, 68, 0.2),
    0 15px 40px rgba(239, 68, 68, 0.4) !important;
}

@keyframes scan-move {
  0% {
    transform: translate(-50%, -50%) translateY(-75px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translateY(75px);
    opacity: 0;
  }
}

@keyframes pulse-corner {
  0%,
  100% {
    border-color: #3b82f6;
    transform: scale(1);
  }
  50% {
    border-color: #60a5fa;
    transform: scale(1.1);
  }
}

@keyframes focus-glow {
  0% {
    border-color: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  }
  100% {
    border-color: #34d399;
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
  }
}

@media (max-width: 480px) {
  .scanner-container {
    max-width: 100%;
    padding: 15px;
  }

  .scanner-viewport {
    max-width: 350px;
    height: 350px;
  }

  .focus-area {
    width: 280px;
    height: 120px;
  }

  .scan-line {
    width: 280px;
  }

  .scanner-title {
    font-size: 1.3rem;
  }

  .instruction-item {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-height: 700px) {
  .scanner-container {
    height: 100vh;
    justify-content: center;
  }

  .scanner-instructions {
    margin: 10px 0;
    gap: 8px;
  }
}
</style>
