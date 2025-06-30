<template>
  <div class="relative">
    <div class="absolute top-0 right-1/4 w-64 h-64 bg-primary-100/20 rounded-full blur-3xl"></div>
    <div
      class="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary-100/15 rounded-full blur-2xl"
    ></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Controle de Estoque</h2>
          <p class="text-gray-600 text-sm md:text-base">
            Gerencie seus lotes e validades de forma eficiente
          </p>
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
                v-model="searchTerm"
                type="text"
                placeholder="Buscar produtos no estoque..."
                class="pl-10 pr-4 py-2 w-full sm:w-64 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300 transition-all duration-200"
              />
            </div>
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
            <i class="pi pi-info-circle"></i>
            Total: {{ filteredStocks.length }} lotes
          </div>
        </div>

        <div class="overflow-x-auto">
          <DataTable
            :value="filteredStocks"
            :loading="loading"
            stripedRows
            responsiveLayout="stack"
            breakpoint="768px"
            :paginator="true"
            :rows="10"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} a {last} de {totalRecords} lotes"
            :rowsPerPageOptions="[5, 10, 20]"
            class="custom-table"
            :pt="{
              table: 'min-w-full',
              header: 'bg-gray-50/80 text-gray-600 font-semibold text-sm',
              headerRow: 'border-b border-gray-200/50',
              headerCell: 'px-4 py-3 text-left',
              bodyRow: 'border-b border-gray-100/50 hover:bg-gray-50/30 transition-colors duration-150',
              bodyCell: 'px-4 py-3 text-sm',
              loading: 'text-center py-8',
            }"
          >
            <template #empty>
              <div class="text-center py-8 text-gray-500">
                <i class="pi pi-inbox text-4xl mb-4 block text-gray-300"></i>
                <p class="text-lg font-medium mb-2">Nenhum lote encontrado</p>
                <p class="text-sm">Cadastre produtos para começar a gerenciar seu estoque</p>
              </div>
            </template>

            <template #loading>
              <div class="text-center py-8">
                <i class="pi pi-spin pi-spinner text-2xl text-primary-500"></i>
                <p class="mt-2 text-gray-600">Carregando estoques...</p>
              </div>
            </template>

            <Column field="product.name" header="Produto" sortable>
              <template #body="{ data }">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {{ getProductInitials(data.product?.name || '') }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ data.product?.name || 'N/A' }}</div>
                    <div class="text-xs text-gray-500">{{ data.product?.brand || 'N/A' }}</div>
                  </div>
                </div>
              </template>
            </Column>

            <Column field="product.barcode" header="Código de Barras" sortable>
              <template #body="{ data }">
                <span class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {{ data.product?.barcode || 'N/A' }}
                </span>
              </template>
            </Column>

            <Column field="quantity" header="Quantidade" sortable>
              <template #body="{ data }">
                <div class="flex items-center">
                  <Badge
                    :value="data.quantity"
                    :severity="getQuantitySeverity(data.quantity)"
                    class="font-semibold"
                  />
                  <span class="ml-2 text-xs text-gray-500">unidades</span>
                </div>
              </template>
            </Column>

            <Column field="expiration_date" header="Data de Validade" sortable>
              <template #body="{ data }">
                <div class="flex items-center">
                  <i
                    class="pi pi-calendar mr-2"
                    :class="getExpirationIconClass(data.expiration_date)"
                  ></i>
                  <div>
                    <div class="font-medium" :class="getExpirationTextClass(data.expiration_date)">
                      {{ formatDate(data.expiration_date) }}
                    </div>
                    <div class="text-xs" :class="getExpirationTextClass(data.expiration_date)">
                      {{ getExpirationStatus(data.expiration_date) }}
                    </div>
                  </div>
                </div>
              </template>
            </Column>

            <Column field="product.category" header="Categoria" sortable>
              <template #body="{ data }">
                <Tag
                  :value="data.product?.category || 'N/A'"
                  severity="info"
                  class="text-xs"
                />
              </template>
            </Column>

            <Column header="Ações" class="w-32">
              <template #body="{ data }">
                <div class="flex gap-2">
                  <Button
                    icon="pi pi-pencil"
                    size="small"
                    text
                    rounded
                    severity="info"
                    @click="$emit('editStock', data)"
                    v-tooltip.top="'Editar lote'"
                  />
                  <Button
                    icon="pi pi-trash"
                    size="small"
                    text
                    rounded
                    severity="danger"
                    @click="$emit('deleteStock', data)"
                    v-tooltip.top="'Excluir lote'"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'
import type { Stock } from '@/types/stock'
import { stockService } from '@/services/stock.service'

interface Emits {
  editStock: [stock: Stock]
  deleteStock: [stock: Stock]
}

defineEmits<Emits>()

const stocks = ref<Stock[]>([])
const loading = ref(false)
const searchTerm = ref('')

const filteredStocks = computed(() => {
  if (!searchTerm.value) return stocks.value

  const search = searchTerm.value.toLowerCase()
  return stocks.value.filter(
    (stock) =>
      stock.product?.name?.toLowerCase().includes(search) ||
      stock.product?.barcode?.toLowerCase().includes(search) ||
      stock.product?.brand?.toLowerCase().includes(search) ||
      stock.product?.category?.toLowerCase().includes(search)
  )
})

const loadStocks = async () => {
  loading.value = true
  try {
    const result = await stockService.getStocks()
    stocks.value = result.stocks
  } catch (error) {
    console.error('Erro ao carregar estoques:', error)
  } finally {
    loading.value = false
  }
}

const getProductInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getQuantitySeverity = (quantity: number) => {
  if (quantity <= 5) return 'danger'
  if (quantity <= 10) return 'warning'
  return 'success'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const getExpirationStatus = (dateString: string): string => {
  const today = new Date()
  const expirationDate = new Date(dateString)
  const diffTime = expirationDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'Vencido'
  if (diffDays === 0) return 'Vence hoje'
  if (diffDays <= 7) return `Vence em ${diffDays} dias`
  if (diffDays <= 30) return `Vence em ${diffDays} dias`
  return `Vence em ${diffDays} dias`
}

const getExpirationTextClass = (dateString: string): string => {
  const today = new Date()
  const expirationDate = new Date(dateString)
  const diffTime = expirationDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'text-red-600'
  if (diffDays <= 7) return 'text-orange-600'
  if (diffDays <= 30) return 'text-yellow-600'
  return 'text-gray-900'
}

const getExpirationIconClass = (dateString: string): string => {
  const today = new Date()
  const expirationDate = new Date(dateString)
  const diffTime = expirationDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'text-red-500'
  if (diffDays <= 7) return 'text-orange-500'
  if (diffDays <= 30) return 'text-yellow-500'
  return 'text-gray-500'
}

onMounted(() => {
  loadStocks()
})

defineExpose({
  loadStocks,
})
</script>

<style scoped>
.custom-table :deep(.p-datatable-tbody > tr > td) {
  border-bottom: 1px solid rgb(229 231 235 / 0.5);
}

.custom-table :deep(.p-datatable-thead > tr > th) {
  background: rgb(249 250 251 / 0.8);
  border-bottom: 1px solid rgb(229 231 235 / 0.5);
  font-weight: 600;
  color: rgb(75 85 99);
}

.custom-table :deep(.p-paginator) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}
</style>