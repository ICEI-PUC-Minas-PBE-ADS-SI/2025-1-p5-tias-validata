<template>
  <Dialog
    :visible="visible"
    :modal="true"
    :closable="false"
    :draggable="false"
    :style="{ width: '90vw', maxWidth: '500px', maxHeight: '90vh', zIndex: 1000 }"
    @update:visible="$emit('update:visible', $event)"
    :pt="{
      root: 'bg-transparent',
      mask: 'bg-black/50 backdrop-blur-sm',
      content:
        'border-none shadow-none bg-transparent p-0 overflow-hidden rounded-3xl max-h-[90vh]',
    }"
  >
    <template #header>
      <div class="relative w-full">
        <button
          @click="$emit('update:visible', false)"
          class="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-200"
        >
          <i class="pi pi-times text-sm"></i>
        </button>

        <div
          class="relative bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh]"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/90 to-secondary-50/80"
          ></div>

          <div
            class="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-2xl"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-secondary-200/30 to-transparent rounded-full blur-2xl"
          ></div>

          <div class="relative z-10 flex flex-col max-h-[85vh]">
            <!-- Header Section (Fixed) -->
            <div class="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4">
              <div class="text-center">
                <div class="relative mx-auto mb-4">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl blur opacity-30"
                  ></div>
                  <div
                    class="relative w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto"
                  >
                    <i class="pi pi-edit text-white text-2xl"></i>
                  </div>
                </div>

                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Editar Lote do Estoque
                </h3>

                <p class="text-gray-600 leading-relaxed text-sm">
                  Atualize a quantidade e data de validade do lote
                </p>
              </div>
            </div>

            <!-- Content Section (Scrollable) -->
            <div class="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-4">
              <div class="space-y-4 sm:space-y-6 max-w-none">
                <!-- Product Info (Read-only) -->
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="pi pi-info-circle mr-2 text-primary-500"></i>
                    Informações do Produto
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span class="text-gray-600">Nome:</span>
                      <span class="ml-2 font-medium text-gray-900">{{
                        stock?.product?.name || 'N/A'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Marca:</span>
                      <span class="ml-2 font-medium text-gray-900">{{
                        stock?.product?.brand || 'N/A'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Categoria:</span>
                      <span class="ml-2 font-medium text-gray-900">{{
                        stock?.product?.category || 'N/A'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Código de Barras:</span>
                      <span class="ml-2 font-mono text-xs bg-gray-200 px-2 py-1 rounded">{{
                        stock?.product?.barcode || 'N/A'
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Editable Stock Fields -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="animate-fade-in">
                    <label for="quantity" class="block text-sm font-semibold text-gray-700 mb-2">
                      <i class="pi pi-calculator mr-2 text-primary-500"></i>
                      Quantidade *
                    </label>
                    <div class="relative">
                      <InputNumber
                        id="quantity"
                        v-model="formData.quantity"
                        :disabled="loading"
                        :min="0"
                        placeholder="Digite a quantidade"
                        class="w-full"
                        :pt="{
                          input:
                            'w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300',
                        }"
                        :inputClass="{ 'border-danger-300 bg-danger-50/50': errors.quantity }"
                      />
                      <div
                        v-if="errors.quantity"
                        class="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <i class="pi pi-exclamation-triangle text-danger-400"></i>
                      </div>
                    </div>
                    <small v-if="errors.quantity" class="text-danger-500 text-xs mt-1 block">{{
                      errors.quantity
                    }}</small>
                  </div>

                  <div class="animate-fade-in" style="animation-delay: 0.1s">
                    <label
                      for="expiration_date"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      <i class="pi pi-calendar mr-2 text-primary-500"></i>
                      Data de Validade *
                    </label>
                    <div class="relative">
                      <InputText
                        id="expiration_date"
                        v-model="formData.expiration_date"
                        :disabled="loading"
                        type="date"
                        placeholder="Selecione a data"
                        class="w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                        :class="{ 'border-danger-300 bg-danger-50/50': errors.expiration_date }"
                      />
                      <div
                        v-if="errors.expiration_date"
                        class="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <i class="pi pi-exclamation-triangle text-danger-400"></i>
                      </div>
                    </div>
                    <small
                      v-if="errors.expiration_date"
                      class="text-danger-500 text-xs mt-1 block"
                      >{{ errors.expiration_date }}</small
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Section (Fixed) -->
            <div class="border-t border-gray-200/50 px-4 sm:px-6 md:px-8 py-4">
              <form @submit.prevent="handleSubmit">
                <div class="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                  <Button
                    label="Cancelar"
                    @click="$emit('update:visible', false)"
                    :disabled="loading"
                    class="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-300"
                  />
                  <Button
                    type="submit"
                    label="Atualizar Lote"
                    :loading="loading"
                    :disabled="loading"
                    class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import type { Stock, StockUpdateRequest } from '@/types/stock'
import { stockService } from '@/services/stock.service'

interface Props {
  visible: boolean
  stock?: Stock | null
}

interface Emits {
  'update:visible': [value: boolean]
  stockUpdated: [stock: Stock]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toast = useToast()

const formData = ref({
  quantity: 0,
  expiration_date: '',
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)

const resetForm = () => {
  formData.value = {
    quantity: 0,
    expiration_date: '',
  }
  errors.value = {}
}

const populateForm = (stock: Stock) => {
  formData.value = {
    quantity: stock.quantity,
    expiration_date: stock.expiration_date
      ? new Date(stock.expiration_date).toISOString().split('T')[0]
      : '',
  }
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.quantity || formData.value.quantity < 0) {
    errors.value.quantity = 'Quantidade deve ser maior ou igual a zero'
  }

  if (!formData.value.expiration_date) {
    errors.value.expiration_date = 'Data de validade é obrigatória'
  } else {
    const today = new Date()
    const expirationDate = new Date(formData.value.expiration_date)
    if (expirationDate <= today) {
      errors.value.expiration_date = 'Data de validade deve ser futura'
    }
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm() || !props.stock) return

  loading.value = true

  try {
    const updateData: Omit<StockUpdateRequest, 'id'> = {
      quantity: formData.value.quantity,
      expiration_date: formData.value.expiration_date,
    }

    const updatedStock = await stockService.updateStock(props.stock.id, updateData)

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Lote atualizado com sucesso',
      life: 3000,
    })

    emit('stockUpdated', updatedStock)
    emit('update:visible', false)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao atualizar lote',
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      if (props.stock) {
        populateForm(props.stock)
      } else {
        resetForm()
      }
    }
  },
)
</script>

<style scoped>
/* Custom scrollbar for the modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

/* Ensure smooth scrolling */
.overflow-y-auto {
  scroll-behavior: smooth;
}

/* Animation classes */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>