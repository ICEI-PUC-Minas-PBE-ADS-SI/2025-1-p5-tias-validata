<template>
  <Dialog
    :visible="show"
    @update:visible="(value: boolean) => emit('update:show', value)"
    modal
    :style="{ width: 'min(500px, 95vw)', maxHeight: '95vh' }"
    :closable="false"
    :draggable="false"
    class="sell-modal"
    :pt="{
      root: 'bg-transparent',
      mask: 'bg-black/50 backdrop-blur-sm',
      content:
        'border-none shadow-none bg-transparent p-0 overflow-hidden rounded-3xl max-h-[95vh] overflow-y-auto',
    }"
  >
    <template #header>
      <div class="relative">
        <button
          @click="emit('update:show', false)"
          class="absolute top-2 right-2 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-200"
        >
          <i class="pi pi-times text-xs md:text-sm"></i>
        </button>

        <div
          class="relative bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white/90 to-emerald-50/80"
          ></div>

          <div
            class="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-2xl"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tl from-emerald-200/30 to-transparent rounded-full blur-2xl"
          ></div>

          <div class="relative z-10 p-6 md:p-8">
            <div v-if="scannerMode" class="text-center mb-6">
              <div class="relative mx-auto mb-4 md:mb-6">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30"
                ></div>
                <div
                  class="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto"
                >
                  <i class="pi pi-qrcode text-white text-xl md:text-2xl"></i>
                </div>
              </div>

              <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Escaneie o código de barras
              </h3>

              <p class="text-sm md:text-base text-gray-600 leading-relaxed px-2 md:px-0 mb-6">
                Aponte a câmera para o código de barras do produto que deseja vender
              </p>

              <div
                v-if="showBarcodeScanner"
                class="relative bg-black rounded-2xl overflow-hidden mb-6"
              >
                <div class="relative h-64 md:h-80">
                  <div id="sell-modal-scanner" class="w-full h-full"></div>

                  <!-- Scanning Overlay -->
                  <div class="absolute inset-0 pointer-events-none">
                    <!-- Corner markers -->
                    <div
                      class="absolute top-4 left-4 w-6 h-6 border-2 border-green-400 border-r-0 border-b-0 rounded-tl-lg"
                    ></div>
                    <div
                      class="absolute top-4 right-4 w-6 h-6 border-2 border-green-400 border-l-0 border-b-0 rounded-tr-lg"
                    ></div>
                    <div
                      class="absolute bottom-4 left-4 w-6 h-6 border-2 border-green-400 border-r-0 border-t-0 rounded-bl-lg"
                    ></div>
                    <div
                      class="absolute bottom-4 right-4 w-6 h-6 border-2 border-green-400 border-l-0 border-t-0 rounded-br-lg"
                    ></div>

                    <div
                      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div
                        class="w-48 h-20 border-2 border-dashed border-green-400 rounded-lg animate-pulse"
                      ></div>
                    </div>

                    <div
                      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div class="w-48 h-0.5 bg-red-500 animate-scan-line shadow-lg"></div>
                    </div>
                  </div>

                  <button
                    @click="closeBarcodeScanner"
                    class="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <i class="pi pi-times text-sm"></i>
                  </button>
                </div>

                <div class="bg-gray-800 px-4 py-3 text-center">
                  <p class="text-green-400 text-sm font-medium">
                    Posicione o código de barras na área marcada
                  </p>
                </div>
              </div>

              <div v-else class="relative bg-gray-100 rounded-2xl p-8 mb-6">
                <div
                  class="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl flex items-center justify-center"
                >
                  <div class="text-center">
                    <i class="pi pi-camera text-4xl text-gray-400 mb-2"></i>
                    <p class="text-gray-500">Scanner de código de barras</p>
                    <Button
                      label="Ativar câmera"
                      icon="pi pi-camera"
                      @click="activateScanner"
                      class="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div class="flex gap-3">
                <Button
                  label="Cancelar"
                  outlined
                  @click="emit('update:show', false)"
                  class="flex-1 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl md:rounded-2xl transition-all duration-300"
                />
                <Button
                  label="Inserir manualmente"
                  @click="switchToManualMode"
                  class="flex-1 py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
                />
              </div>
            </div>

            <div v-else-if="manualMode" class="mb-6">
              <div class="text-center mb-6">
                <div class="relative mx-auto mb-4 md:mb-6">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30"
                  ></div>
                  <div
                    class="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto"
                  >
                    <i class="pi pi-barcode text-white text-xl md:text-2xl"></i>
                  </div>
                </div>

                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Digite o código de barras
                </h3>

                <p class="text-sm md:text-base text-gray-600 leading-relaxed px-2 md:px-0 mb-6">
                  Insira o código de barras do produto manualmente
                </p>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-barcode mr-2 text-green-500"></i>
                    Código de barras
                  </label>
                  <InputText
                    v-model="barcodeInput"
                    placeholder="Digite o código de barras"
                    class="w-full pl-3 md:pl-4 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-green-300 focus:bg-white/80 transition-all duration-300"
                    @keyup.enter="searchProduct"
                  />
                </div>

                <div class="flex gap-3">
                  <Button
                    label="Voltar ao scanner"
                    outlined
                    @click="switchToScannerMode"
                    class="flex-1 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl md:rounded-2xl transition-all duration-300"
                  />
                  <Button
                    label="Buscar produto"
                    :loading="searchingProduct"
                    :disabled="!barcodeInput.trim()"
                    @click="searchProduct"
                    class="flex-1 py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
                  />
                </div>
              </div>
            </div>

            <div v-else-if="selectedProduct" class="mb-6">
              <div class="text-center mb-6">
                <div class="relative mx-auto mb-4 md:mb-6">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30"
                  ></div>
                  <div
                    class="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto"
                  >
                    <i class="pi pi-shopping-cart text-white text-xl md:text-2xl"></i>
                  </div>
                </div>

                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Confirmar venda
                </h3>

                <p class="text-sm md:text-base text-gray-600 leading-relaxed px-2 md:px-0 mb-6">
                  Verifique os dados e selecione a quantidade a ser vendida
                </p>
              </div>

              <div
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 mb-6 border border-green-200/50"
              >
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <div
                      class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center"
                    >
                      <i class="pi pi-box text-green-600 text-xl"></i>
                    </div>
                    <div
                      class="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-green-500"
                    >
                      {{ selectedProduct.quantity }}
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <h4 class="text-lg font-semibold text-gray-900 truncate">
                      {{ selectedProduct.product?.name || 'Produto' }}
                    </h4>
                    <p class="text-sm text-gray-600 mb-1">
                      {{ selectedProduct.product?.brand || 'Sem marca' }}
                    </p>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Código: {{ selectedProduct.product?.barcode || 'N/A' }}</span>
                      <span :class="getExpirationDateClass(selectedProduct.expiration_date)">
                        Vence em {{ getDaysUntilExpiration(selectedProduct.expiration_date) }} dias
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4 mb-6">
                <div>
                  <label class="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-shopping-bag mr-2 text-green-500"></i>
                    Quantidade a vender
                  </label>
                  <div class="flex items-center space-x-3">
                    <Button
                      icon="pi pi-minus"
                      size="small"
                      outlined
                      :disabled="sellQuantity <= 1"
                      @click="sellQuantity = Math.max(1, sellQuantity - 1)"
                      class="w-10 h-10 border-2 border-green-300 text-green-600 hover:bg-green-50 rounded-xl"
                    />
                    <InputText
                      v-model="sellQuantityString"
                      type="number"
                      :min="1"
                      :max="selectedProduct.quantity"
                      class="flex-1 text-center text-lg font-semibold py-2 rounded-xl border-2 border-green-200/50 bg-white/50 backdrop-blur-sm focus:border-green-300 focus:bg-white/80 transition-all duration-300"
                      @input="updateSellQuantity"
                    />
                    <Button
                      icon="pi pi-plus"
                      size="small"
                      outlined
                      :disabled="sellQuantity >= selectedProduct.quantity"
                      @click="sellQuantity = Math.min(selectedProduct.quantity, sellQuantity + 1)"
                      class="w-10 h-10 border-2 border-green-300 text-green-600 hover:bg-green-50 rounded-xl"
                    />
                  </div>
                  <small class="text-green-600 text-xs mt-1 block">
                    Estoque disponível: {{ selectedProduct.quantity }} unidades
                  </small>
                </div>
              </div>

              <div class="flex gap-3">
                <Button
                  label="Cancelar"
                  outlined
                  @click="resetModal"
                  class="flex-1 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl md:rounded-2xl transition-all duration-300"
                />
                <Button
                  label="Confirmar venda"
                  :loading="processingSale"
                  @click="confirmSale"
                  class="flex-1 py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
                >
                  <template #icon>
                    <i class="pi pi-check ml-2"></i>
                  </template>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Quagga, { type QuaggaJSResultObject } from '@ericblade/quagga2'
import type { Stock } from '@/types/stock'
import { saleService } from '@/services/sale.service'
import { auth } from '@/lib/auth'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'saleCompleted'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toast = useToast()

const scannerMode = ref(true)
const manualMode = ref(false)
const selectedProduct = ref<Stock | null>(null)
const showBarcodeScanner = ref(false)

const barcodeInput = ref('')
const sellQuantity = ref(1)

const searchingProduct = ref(false)
const processingSale = ref(false)

const sellQuantityString = computed({
  get: () => sellQuantity.value.toString(),
  set: (value: string) => {
    const num = parseInt(value) || 1
    sellQuantity.value = Math.max(1, num)
  },
})

const updateSellQuantity = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value) || 1
  sellQuantity.value = Math.max(1, Math.min(selectedProduct.value?.quantity || 999, value))
}

const switchToManualMode = () => {
  scannerMode.value = false
  manualMode.value = true
}

const switchToScannerMode = () => {
  scannerMode.value = true
  manualMode.value = false
  barcodeInput.value = ''
  showBarcodeScanner.value = false
}

const activateScanner = async () => {
  showBarcodeScanner.value = true
  await nextTick()
  setTimeout(() => {
    startCustomScanner()
  }, 100)
}

const closeBarcodeScanner = () => {
  stopCustomScanner()
  showBarcodeScanner.value = false
}

const handleBarcodeDetected = (event: { code: string; format: string }) => {
  stopCustomScanner()
  showBarcodeScanner.value = false
  barcodeInput.value = event.code
  searchProduct()
}

const startCustomScanner = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true })

    const targetElement = document.querySelector('#sell-modal-scanner') as HTMLElement
    if (!targetElement) {
      throw new Error('Elemento do scanner não encontrado')
    }

    const parentElement = targetElement.parentElement as HTMLElement
    if (parentElement) {
      const containerHeight = parentElement.offsetHeight
      const containerWidth = parentElement.offsetWidth
      targetElement.style.width = `${containerWidth}px`
      targetElement.style.height = `${containerHeight}px`
      targetElement.style.maxWidth = `${containerWidth}px`
      targetElement.style.maxHeight = `${containerHeight}px`
    }

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: targetElement,
          constraints: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          area: {
            top: '0%',
            right: '0%',
            left: '0%',
            bottom: '0%',
          },
          singleChannel: false,
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'code_128_reader',
            'code_39_reader',
            'upc_reader',
          ],
        },
        locate: true,
      },
      (err: Error | null) => {
        if (err) {
          console.error('Erro ao inicializar o scanner:', err)
          showBarcodeScanner.value = false
          toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao acessar a câmera',
            life: 3000,
          })
          return
        }
        Quagga.start()
      },
    )

    const detectionHandler = (result: QuaggaJSResultObject) => {
      if (result.codeResult.code) {
        const format = result.codeResult.format || 'EAN_13'
        handleBarcodeDetected({ code: result.codeResult.code, format })
      }
    }

    Quagga.onDetected(detectionHandler)
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error)
    showBarcodeScanner.value = false
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível acessar a câmera',
      life: 3000,
    })
  }
}

const stopCustomScanner = () => {
  try {
    if (Quagga.CameraAccess.getActiveStreamLabel()) {
      Quagga.stop()
    }
  } catch (error) {
    console.error('Erro ao parar o scanner:', error)
  }
}

const searchProduct = async () => {
  if (!barcodeInput.value.trim()) return

  searchingProduct.value = true
  try {
    const productWithStock = await saleService.getProductByBarcode(barcodeInput.value.trim())

    if (productWithStock && productWithStock.availableStocks) {
      const availableStocks = productWithStock.availableStocks.filter((stock) => stock.quantity > 0)

      if (availableStocks.length > 0) {
        const closestExpirationStock = availableStocks.reduce((closest, current) => {
          const closestDays = getDaysUntilExpiration(closest.expiration_date)
          const currentDays = getDaysUntilExpiration(current.expiration_date)
          return currentDays < closestDays ? current : closest
        })

        selectedProduct.value = { ...closestExpirationStock, product: productWithStock }
        sellQuantity.value = 1
        scannerMode.value = false
        manualMode.value = false
      } else {
        toast.add({
          severity: 'warn',
          summary: 'Produto sem estoque',
          detail: 'Produto encontrado mas sem estoque disponível',
          life: 3000,
        })
      }
    } else {
      toast.add({
        severity: 'warn',
        summary: 'Produto não encontrado',
        detail: 'Nenhum produto encontrado com este código de barras',
        life: 3000,
      })
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao buscar produto',
      life: 3000,
    })
  } finally {
    searchingProduct.value = false
  }
}

const confirmSale = async () => {
  if (!selectedProduct.value) return

  processingSale.value = true
  try {
    const user = auth.getUser()
    if (!user?.id) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário não encontrado. Faça login novamente.',
        life: 3000,
      })
      return
    }

    const saleData = {
      userId: user.id,
      items: [
        {
          productId: selectedProduct.value.productId,
          stockId: selectedProduct.value.id,
          quantity: sellQuantity.value,
          unitPrice: (selectedProduct.value.product?.base_price || 0) / 100,
        },
      ],
      totalValue: ((selectedProduct.value.product?.base_price || 0) / 100) * sellQuantity.value,
      saleDate: new Date(),
    }

    await saleService.createSale(saleData)

    toast.add({
      severity: 'success',
      summary: 'Venda realizada',
      detail: `${sellQuantity.value} unidade(s) de ${selectedProduct.value.product?.name || 'produto'} vendida(s) com sucesso!`,
      life: 3000,
    })

    emit('saleCompleted')
    resetModal()
    emit('update:show', false)
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao processar venda',
      life: 3000,
    })
  } finally {
    processingSale.value = false
  }
}

const resetModal = () => {
  stopCustomScanner()
  scannerMode.value = true
  manualMode.value = false
  selectedProduct.value = null
  barcodeInput.value = ''
  sellQuantity.value = 1
  showBarcodeScanner.value = false
}

const getDaysUntilExpiration = (date: string | Date) => {
  const today = new Date()
  const expirationDate = new Date(date)
  const diffTime = expirationDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays < 0 ? 0 : diffDays
}

const getExpirationDateClass = (date: string | Date) => {
  const days = getDaysUntilExpiration(date)

  if (days === 0) {
    return 'text-red-600 font-bold'
  } else if (days <= 3) {
    return 'text-red-500 font-semibold'
  } else if (days <= 7) {
    return 'text-orange-500 font-semibold'
  } else if (days <= 15) {
    return 'text-yellow-600 font-medium'
  }
  return 'text-green-600'
}

watch(
  () => props.show,
  (newValue) => {
    if (!newValue) {
      resetModal()
    }
  },
)
</script>

<style scoped>
#sell-modal-scanner {
  overflow: hidden;
  position: relative;
}

#sell-modal-scanner video {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: cover !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  border-radius: 0;
}

#sell-modal-scanner canvas {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: cover !important;
}

#sell-modal-scanner > div {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  position: relative !important;
}

@keyframes scan-line {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(40px);
    opacity: 0;
  }
}

.animate-scan-line {
  animation: scan-line 2s linear infinite;
}
</style>
