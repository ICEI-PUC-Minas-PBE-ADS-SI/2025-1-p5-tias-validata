<template>
  <Dialog
    :visible="visible"
    :modal="true"
    :closable="false"
    :draggable="false"
    :style="{ width: '90vw', maxWidth: '600px', maxHeight: '90vh', zIndex: 1000 }"
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
                    <i class="pi pi-box text-white text-2xl"></i>
                  </div>
                </div>

                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {{ isEdit ? 'Editar Produto' : 'Cadastrar Novo Produto' }}
                </h3>

                <p class="text-gray-600 leading-relaxed text-sm">
                  {{
                    isEdit
                      ? 'Atualize as informações do produto conforme necessário'
                      : 'Preencha as informações do produto para adicionar ao seu estoque'
                  }}
                </p>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-4">
              <div class="space-y-4 sm:space-y-6 max-w-none">
                <div class="animate-fade-in">
                  <label for="barcode" class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-barcode mr-2 text-primary-500"></i>
                    Código de Barras *
                  </label>
                  <div class="flex gap-3">
                    <div class="flex-1 relative">
                      <InputText
                        id="barcode"
                        v-model="formData.barcode"
                        :disabled="loading || isEdit || lookupLoading"
                        placeholder="Digite ou escaneie o código"
                        class="w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                        :class="{ 'border-danger-300 bg-danger-50/50': errors.barcode }"
                        @blur="lookupProductByBarcode(formData.barcode)"
                      />
                      <div
                        v-if="errors.barcode"
                        class="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <i class="pi pi-exclamation-triangle text-danger-400"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="animate-fade-in" style="animation-delay: 0.1s">
                  <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-tags mr-2 text-primary-500"></i>
                    Categoria *
                  </label>
                  <div class="relative">
                    <InputText
                      id="category"
                      v-model="formData.category"
                      :disabled="loading || (!!productFound && !isEdit)"
                      placeholder="Digite a categoria do produto"
                      class="w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                      :class="{ 'border-danger-300 bg-danger-50/50': errors.category }"
                    />
                    <div
                      v-if="errors.category"
                      class="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <i class="pi pi-exclamation-triangle text-danger-400"></i>
                    </div>
                  </div>
                  <small v-if="errors.category" class="text-danger-500 text-xs mt-1 block">{{
                    errors.category
                  }}</small>
                </div>

                <div class="animate-fade-in" style="animation-delay: 0.2s">
                  <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-tag mr-2 text-primary-500"></i>
                    Nome do Produto *
                  </label>
                  <div class="relative">
                    <InputText
                      id="name"
                      v-model="formData.name"
                      :disabled="loading || (!!productFound && !isEdit)"
                      placeholder="Digite o nome do produto"
                      class="w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                      :class="{ 'border-danger-300 bg-danger-50/50': errors.name }"
                    />
                    <div
                      v-if="errors.name"
                      class="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <i class="pi pi-exclamation-triangle text-danger-400"></i>
                    </div>
                  </div>
                  <small v-if="errors.name" class="text-danger-500 text-xs mt-1 block">{{
                    errors.name
                  }}</small>
                </div>

                <div class="animate-fade-in" style="animation-delay: 0.3s">
                  <label for="brand" class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-bookmark mr-2 text-primary-500"></i>
                    Marca *
                  </label>
                  <div class="relative">
                    <InputText
                      id="brand"
                      v-model="formData.brand"
                      :disabled="loading || (!!productFound && !isEdit)"
                      placeholder="Digite a marca do produto"
                      class="w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                      :class="{ 'border-danger-300 bg-danger-50/50': errors.brand }"
                    />
                    <div
                      v-if="errors.brand"
                      class="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <i class="pi pi-exclamation-triangle text-danger-400"></i>
                    </div>
                  </div>
                  <small v-if="errors.brand" class="text-danger-500 text-xs mt-1 block">{{
                    errors.brand
                  }}</small>
                </div>

                <div class="animate-fade-in" style="animation-delay: 0.4s">
                  <label for="cost_price" class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="pi pi-dollar mr-2 text-primary-500"></i>
                    Preço de Custo *
                  </label>
                  <div class="relative">
                    <InputNumber
                      id="cost_price"
                      v-model="formData.cost_price"
                      :disabled="loading || (!!productFound && !isEdit)"
                      :min="0"
                      :min-fraction-digits="2"
                      :max-fraction-digits="2"
                      placeholder="0,00"
                      mode="currency"
                      currency="BRL"
                      locale="pt-BR"
                      class="w-full"
                      :pt="{
                        input:
                          'w-full pl-4 pr-4 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300',
                      }"
                      :inputClass="{ 'border-danger-300 bg-danger-50/50': errors.cost_price }"
                    />
                    <div
                      v-if="errors.cost_price"
                      class="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <i class="pi pi-exclamation-triangle text-danger-400"></i>
                    </div>
                  </div>
                  <small v-if="errors.cost_price" class="text-danger-500 text-xs mt-1 block">{{
                    errors.cost_price
                  }}</small>
                </div>

                <div v-if="!isEdit" class="border-t pt-6 mt-6">
                  <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i class="pi pi-box mr-2 text-primary-500"></i>
                    Informações do Estoque
                  </h4>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="animate-fade-in" style="animation-delay: 0.5s">
                      <label for="quantity" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="pi pi-calculator mr-2 text-primary-500"></i>
                        Quantidade *
                      </label>
                      <div class="relative">
                        <InputNumber
                          id="quantity"
                          v-model="formData.quantity"
                          :disabled="loading"
                          :min="1"
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

                    <div class="animate-fade-in" style="animation-delay: 0.6s">
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
            </div>

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
                    :label="isEdit ? 'Atualizar Produto' : 'Cadastrar Produto'"
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
import { ref, watch, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import type { Product, ProductCreateRequest, ProductUpdateRequest } from '@/types/product'
import type { StockCreateRequest } from '@/types/stock'
import { productService } from '@/services/product.service'
import { stockService } from '@/services/stock.service'

interface Props {
  visible: boolean
  product?: Product | null
}

interface Emits {
  'update:visible': [value: boolean]
  productSaved: [product: Product]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toast = useToast()

const formData = ref({
  barcode: '',
  name: '',
  brand: '',
  category: '',
  cost_price: 0,
  quantity: 1,
  expiration_date: '',
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const productFound = ref<Product | null>(null)
const lookupLoading = ref(false)

const isEdit = computed(() => !!props.product)

const resetForm = () => {
  formData.value = {
    barcode: '',
    name: '',
    brand: '',
    category: '',
    cost_price: 0,
    quantity: 1,
    expiration_date: '',
  }
  errors.value = {}
  productFound.value = null
}

const populateForm = (product: Product) => {
  formData.value = {
    barcode: product.barcode,
    name: product.name,
    brand: product.brand,
    category: product.category,
    cost_price: (product.cost_price || product.base_price) / 100,
    quantity: formData.value.quantity,
    expiration_date: formData.value.expiration_date,
  }
}

const setBarcodeCode = (code: string) => {
  formData.value.barcode = code
  // Opcional: fazer lookup automático do produto
  if (code.trim()) {
    lookupProductByBarcode(code)
  }
}

const lookupProductByBarcode = async (barcode: string) => {
  if (!barcode.trim() || isEdit.value) return

  lookupLoading.value = true
  try {
    const product = await productService.getProductByBarcode(barcode)
    if (product) {
      productFound.value = product
      populateForm(product)
      toast.add({
        severity: 'success',
        summary: 'Produto Encontrado',
        detail: 'Dados do produto preenchidos automaticamente',
        life: 3000,
      })
    } else {
      productFound.value = null
    }
  } catch (error) {
    productFound.value = null
  } finally {
    lookupLoading.value = false
  }
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.barcode.trim()) {
    errors.value.barcode = 'Código de barras é obrigatório'
  }

  if (!isEdit.value) {
    if (!formData.value.quantity || formData.value.quantity <= 0) {
      errors.value.quantity = 'Quantidade deve ser maior que zero'
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
  }

  if (!productFound.value || isEdit.value) {
    if (!formData.value.name.trim()) {
      errors.value.name = 'Nome do produto é obrigatório'
    }

    if (!formData.value.brand.trim()) {
      errors.value.brand = 'Marca é obrigatória'
    }

    if (!formData.value.category.trim()) {
      errors.value.category = 'Categoria é obrigatória'
    }

    if (!formData.value.cost_price || formData.value.cost_price <= 0) {
      errors.value.cost_price = 'Preço de custo deve ser maior que zero'
    }
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    if (isEdit.value && props.product) {
      const productData = {
        barcode: formData.value.barcode,
        name: formData.value.name,
        brand: formData.value.brand,
        category: formData.value.category,
        cost_price: Math.round(formData.value.cost_price * 100),
      }

      const updateData: ProductUpdateRequest = {
        id: props.product.id,
        ...productData,
      }
      const savedProduct = await productService.updateProduct(updateData)

      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto atualizado com sucesso',
        life: 3000,
      })

      emit('productSaved', savedProduct)
      emit('update:visible', false)
    } else {
      let productId: string

      if (productFound.value) {
        productId = productFound.value.id
      } else {
        const productData = {
          barcode: formData.value.barcode,
          name: formData.value.name,
          brand: formData.value.brand,
          category: formData.value.category,
          cost_price: Math.round(formData.value.cost_price * 100),
        }
        const savedProduct = await productService.createProduct(productData as ProductCreateRequest)
        productId = savedProduct.id
      }

      const stockData: StockCreateRequest = {
        productId: productId,
        quantity: formData.value.quantity,
        expiration_date: formData.value.expiration_date,
      }

      await stockService.createStock(stockData)

      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: productFound.value
          ? 'Lote adicionado ao estoque com sucesso'
          : 'Produto e lote cadastrados com sucesso',
        life: 3000,
      })

      emit('update:visible', false)
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: isEdit.value ? 'Erro ao atualizar produto' : 'Erro ao cadastrar produto/estoque',
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
      if (props.product) {
        populateForm(props.product)
      } else {
        resetForm()
      }
    }
  },
)

defineExpose({
  setBarcodeCode,
})
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
