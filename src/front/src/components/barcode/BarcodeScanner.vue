<template>
  <div class="barcode-scanner">
    <div v-if="isScanning" class="scanner-container">
      <div id="interactive" class="viewport"></div>
      <div class="scanner-controls">
        <n-button @click="stopScanner" type="error" size="large"> Fechar Scanner </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NButton } from 'naive-ui'
import Quagga, { type QuaggaResult } from 'quagga'

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
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'code_128_reader',
            'code_39_reader',
            'upc_reader',
          ],
        },
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

    const detectionHandler = (result: QuaggaResult) => {
      console.log(result)
      if (result.codeResult.code) {
        emit('barcode-detected', result.codeResult.code)
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
    if (Quagga.isRunning) {
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
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scanner-container {
  width: 100%;
  max-width: 800px;
  height: 80vh;
  background: transparent;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.viewport {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.scanner-controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  z-index: 2;
}
</style>
