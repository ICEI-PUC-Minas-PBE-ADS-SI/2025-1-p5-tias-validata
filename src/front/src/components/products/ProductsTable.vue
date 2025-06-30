<template>
  <div class="relative">
    <div class="absolute top-0 right-1/4 w-64 h-64 bg-primary-100/20 rounded-full blur-3xl"></div>
    <div
      class="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary-100/15 rounded-full blur-2xl"
    ></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Produtos Cadastrados</h2>
          <p class="text-gray-600 text-sm md:text-base">
            Gerencie seu catálogo de produtos de forma inteligente
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <Button
            v-show="false"
            @click="handleSeedProducts"
            :loading="seedLoading"
            severity="secondary"
            size="large"
            icon="pi pi-database"
            class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Seed Produtos
          </Button>
          <Button
            :label="$attrs.isMobile ? '' : 'Vender Produto'"
            icon="pi pi-shopping-cart"
            @click="$emit('openSellModal')"
            class="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none self-start lg:self-auto"
            :size="$attrs.isMobile ? 'small' : 'large'"
          />
          <Button
            :label="$attrs.isMobile ? '' : 'Cadastrar Produto'"
            icon="pi pi-plus"
            @click="$emit('openCreateModal')"
            class="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none self-start lg:self-auto"
            :size="$attrs.isMobile ? 'small' : 'large'"
          />
        </div>
      </div>

      <div
        class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg"
      >
        <div
          class="mb-6 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center"
        >
          <div
            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto"
          >
            <div class="relative">
              <i
                class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                type="text"
                placeholder="Buscar produtos..."
                class="pl-10 pr-4 py-2 w-full sm:w-64 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300 transition-all duration-200"
              />
            </div>
            <select
              class="px-4 py-2 w-full sm:w-auto bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300 transition-all duration-200"
            >
              <option>Todas as categorias</option>
              <option>Laticínios</option>
              <option>Panificados</option>
              <option>Frios</option>
              <option>Grãos</option>
            </select>
          </div>
          <div class="flex items-center space-x-2 self-start lg:self-auto">
            <span class="text-sm text-gray-500">{{ products.length }} produtos</span>
          </div>
        </div>
        <div class="relative">
          <div v-if="!loading && products.length > 0" class="grid gap-4">
            <div
              v-for="product in products"
              :key="product.id"
              class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-primary-50/20 to-secondary-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <div class="relative">
                <!-- Mobile Layout -->
                <div class="block md:hidden">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="relative">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center"
                        >
                          <i class="pi pi-box text-primary-600 text-lg"></i>
                        </div>
                        <div
                          class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        >
                          <i class="pi pi-check text-xs"></i>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="text-base font-semibold text-gray-900 truncate">
                          {{ product.name }}
                        </h3>
                        <span
                          class="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                        >
                          {{ product.brand }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div
                        class="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                      >
                        {{ product.category }}
                      </div>
                      <Button
                        icon="pi pi-pencil"
                        size="small"
                        text
                        rounded
                        @click="$emit('editProduct', product)"
                        v-tooltip.top="'Editar produto'"
                        class="text-primary-600 hover:bg-primary-50 w-8 h-8"
                      />
                    </div>
                  </div>

                  <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center space-x-2">
                      <i class="pi pi-dollar text-gray-400"></i>
                      <span class="font-semibold text-green-600">
                        R$ {{ (product.cost_price / 100).toFixed(2).replace('.', ',') }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <i class="pi pi-chart-line text-gray-400"></i>
                      <span>Frequência: {{ (product.sales_frequency * 100).toFixed(0) }}%</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <i class="pi pi-barcode text-gray-400"></i>
                      <span class="font-mono text-xs">{{ product.barcode }}</span>
                    </div>
                  </div>
                </div>

                <div class="hidden md:flex items-center justify-between">
                  <div class="flex items-center space-x-4 flex-1">
                    <div class="relative">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center"
                      >
                        <i class="pi pi-box text-primary-600 text-xl"></i>
                      </div>
                      <div
                        class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      >
                        <i class="pi pi-check text-sm"></i>
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-3 mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">
                          {{ product.name }}
                        </h3>
                        <span
                          class="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium w-fit"
                        >
                          {{ product.brand }}
                        </span>
                      </div>

                      <div
                        class="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-1 lg:space-y-0 text-sm text-gray-600"
                      >
                        <div class="flex items-center space-x-2">
                          <i class="pi pi-dollar text-gray-400"></i>
                          <span class="font-semibold text-green-600">
                            R$ {{ (product.cost_price / 100).toFixed(2).replace('.', ',') }}
                          </span>
                        </div>

                        <div class="flex items-center space-x-2">
                          <i class="pi pi-chart-line text-gray-400"></i>
                          <span>Frequência: {{ (product.sales_frequency * 100).toFixed(0) }}%</span>
                        </div>

                        <div class="flex items-center space-x-2">
                          <i class="pi pi-barcode text-gray-400"></i>
                          <span class="font-mono text-xs">{{ product.barcode }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <div class="text-right">
                      <div
                        class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                      >
                        {{ product.category }}
                      </div>
                    </div>

                    <Button
                      icon="pi pi-pencil"
                      size="small"
                      text
                      rounded
                      @click="$emit('editProduct', product)"
                      v-tooltip.top="'Editar produto'"
                      class="text-primary-600 hover:bg-primary-50 w-10 h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="!loading" class="text-center py-16">
            <div class="relative mx-auto mb-8">
              <div
                class="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto"
              >
                <i class="pi pi-inbox text-4xl text-gray-400"></i>
              </div>
              <div
                class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-plus text-white text-sm"></i>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Nenhum produto cadastrado</h3>
            <p class="text-gray-600 mb-6 max-w-md mx-auto">
              Começe cadastrando seu primeiro produto para gerenciar seu catálogo de forma
              inteligente
            </p>
            <Button
              label="Cadastrar Primeiro Produto"
              icon="pi pi-plus"
              @click="$emit('openCreateModal')"
              class="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
            />
          </div>

          <div
            v-if="loading"
            class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg z-10"
          >
            <div class="text-center">
              <ProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
              <p class="text-gray-600 mt-3 font-medium">Carregando produtos...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import type { Product } from '@/types/product'
import { productService } from '@/services/product.service'

defineEmits<{
  openCreateModal: []
  editProduct: [product: Product]
}>()

const toast = useToast()

const products = ref<Product[]>([])
const loading = ref(false)
const seedLoading = ref(false)

const loadProducts = async () => {
  loading.value = true
  try {
    const response = await productService.getProducts()
    products.value = response.products
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao carregar produtos',
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

const handleSeedProducts = async () => {
  try {
    seedLoading.value = true
    const result = await productService.seedProducts()

    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: result.message,
      life: 5000,
    })

    await loadProducts()
  } catch (error) {
    console.error('Erro ao fazer seed:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro!',
      detail: 'Falha ao criar produtos de exemplo. Verifique se o backend está funcionando.',
      life: 5000,
    })
  } finally {
    seedLoading.value = false
  }
}

const refreshTable = () => {
  loadProducts()
}

defineExpose({ refreshTable })

onMounted(() => {
  loadProducts()
})
</script>
