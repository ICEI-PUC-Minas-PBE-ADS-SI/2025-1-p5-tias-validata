<template>
  <div class="relative">
    <!-- Background gradients -->
    <div class="absolute top-0 right-1/4 w-64 h-64 bg-primary-100/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary-100/15 rounded-full blur-2xl"></div>

    <div class="relative z-10">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard de Estoque</h2>
          <p class="text-gray-600 text-sm md:text-base">
            Visão geral do estoque e análise de validades
          </p>
        </div>
        
        <div class="flex gap-2">
          <Button
            @click="loadStocks"
            :loading="loading"
            icon="pi pi-refresh"
            label="Atualizar"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <!-- Search -->
          <div class="relative flex-1 min-w-64">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Buscar produtos..."
              class="pl-10 pr-4 py-2 w-full bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300 transition-all duration-200"
            />
          </div>

          <!-- Category filter -->
          <Dropdown
            v-model="filters.category"
            :options="categoryOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Categoria"
            class="w-48"
            :pt="{
              root: 'bg-white/80 border border-gray-200/50 rounded-xl',
              trigger: 'px-4 py-2',
            }"
          />

          <!-- Expiration filter -->
          <Dropdown
            v-model="filters.expiration"
            :options="expirationOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Validade"
            class="w-48"
            :pt="{
              root: 'bg-white/80 border border-gray-200/50 rounded-xl',
              trigger: 'px-4 py-2',
            }"
          />

          <!-- Stock level filter -->
          <Dropdown
            v-model="filters.stockLevel"
            :options="stockLevelOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Nível de Estoque"
            class="w-48"
            :pt="{
              root: 'bg-white/80 border border-gray-200/50 rounded-xl',
              trigger: 'px-4 py-2',
            }"
          />

          <!-- Clear filters -->
          <Button
            @click="clearFilters"
            icon="pi pi-times"
            label="Limpar"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
          />
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total de Lotes</p>
              <p class="text-2xl font-bold text-gray-900">{{ summary.totalBatches }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-box text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total de Produtos</p>
              <p class="text-2xl font-bold text-gray-900">{{ summary.totalQuantity }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-shopping-cart text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Vencendo Esta Semana</p>
              <p class="text-2xl font-bold text-orange-600">{{ summary.expiringThisWeek }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-exclamation-triangle text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Estoque Baixo</p>
              <p class="text-2xl font-bold text-red-600">{{ summary.lowStock }}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-exclamation-circle text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Stock by Category Chart -->
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Estoque por Categoria</h3>
          <div class="h-64">
            <canvas ref="categoryChart"></canvas>
          </div>
        </div>

        <!-- Expiration Timeline Chart -->
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Produtos Vencendo Esta Semana</h3>
          <div class="h-64">
            <PieChart :weekOffset="0" />
          </div>
        </div>
      </div>

      <!-- Filtered Stocks Table -->
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Lotes Filtrados</h3>
          <div class="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
            <i class="pi pi-info-circle"></i>
            {{ filteredStocks.length }} de {{ allStocks.length }} lotes
          </div>
        </div>

        <div class="overflow-x-auto">
          <DataTable
            :value="paginatedStocks"
            :loading="loading"
            stripedRows
            class="w-full"
            :pt="{
              table: 'w-full',
              thead: 'bg-gray-50/80',
              tbody: 'bg-white/50',
            }"
          >
            <Column field="product.name" header="Produto" sortable>
              <template #body="{ data }">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <i class="pi pi-box text-primary-600"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ data.product?.name || 'Produto' }}</p>
                    <p class="text-sm text-gray-600">{{ data.product?.brand || 'Sem marca' }}</p>
                  </div>
                </div>
              </template>
            </Column>

            <Column field="product.category" header="Categoria" sortable>
              <template #body="{ data }">
                <Badge
                  :value="data.product?.category || 'N/A'"
                  :severity="getCategorySeverity(data.product?.category)"
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                />
              </template>
            </Column>

            <Column field="quantity" header="Quantidade" sortable>
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                    :class="getQuantityClass(data.quantity)"
                  >
                    {{ data.quantity }}
                  </span>
                </div>
              </template>
            </Column>

            <Column field="expiration_date" header="Validade" sortable>
              <template #body="{ data }">
                <div class="text-center">
                  <p class="font-medium text-gray-900">
                    {{ formatDate(data.expiration_date) }}
                  </p>
                  <Badge
                    :value="getExpirationStatus(data.expiration_date).label"
                    :severity="getExpirationStatus(data.expiration_date).severity"
                    class="mt-1 px-2 py-1 rounded-full text-xs font-semibold"
                  />
                </div>
              </template>
            </Column>

            <Column field="created_at" header="Criado em" sortable>
              <template #body="{ data }">
                <span class="text-sm text-gray-600">
                  {{ formatDate(data.created_at) }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
          <div class="text-sm text-gray-600">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a 
            {{ Math.min(currentPage * itemsPerPage, filteredStocks.length) }} 
            de {{ filteredStocks.length }} lotes
          </div>
          <Paginator
            v-model:first="first"
            :rows="itemsPerPage"
            :totalRecords="filteredStocks.length"
            @page="onPageChange"
            class="bg-transparent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Paginator from 'primevue/paginator'
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import type { Stock } from '@/types/stock'
import { stockService } from '@/services/stock.service'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartConfiguration } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Data
const toast = useToast()
const loading = ref(false)
const allStocks = ref<Stock[]>([])
const first = ref(0)
const itemsPerPage = ref(10)
const currentPage = ref(1)
const categoryChart = ref<HTMLCanvasElement>()
const categoryChartInstance = ref<ChartJS<'pie'>>()

// Filters
const filters = ref({
  search: '',
  category: null as string | null,
  expiration: null as string | null,
  stockLevel: null as string | null,
})

// Filter options
const categoryOptions = ref([
  { label: 'Todas as categorias', value: null },
])

const expirationOptions = [
  { label: 'Todas as validades', value: null },
  { label: 'Vencidos', value: 'expired' },
  { label: 'Vencendo hoje', value: 'today' },
  { label: 'Vencendo esta semana', value: 'thisWeek' },
  { label: 'Vencendo este mês', value: 'thisMonth' },
  { label: 'Válidos por mais de 1 mês', value: 'longTerm' },
]

const stockLevelOptions = [
  { label: 'Todos os níveis', value: null },
  { label: 'Estoque baixo (≤ 5)', value: 'low' },
  { label: 'Estoque médio (6-20)', value: 'medium' },
  { label: 'Estoque alto (> 20)', value: 'high' },
]

// Computed properties
const filteredStocks = computed(() => {
  let filtered = [...allStocks.value]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(stock =>
      stock.product?.name?.toLowerCase().includes(search) ||
      stock.product?.brand?.toLowerCase().includes(search) ||
      stock.product?.category?.toLowerCase().includes(search) ||
      stock.product?.barcode?.includes(search)
    )
  }

  // Category filter
  if (filters.value.category) {
    filtered = filtered.filter(stock => stock.product?.category === filters.value.category)
  }

  // Expiration filter
  if (filters.value.expiration) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    filtered = filtered.filter(stock => {
      const expDate = new Date(stock.expiration_date)
      expDate.setHours(0, 0, 0, 0)
      const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      switch (filters.value.expiration) {
        case 'expired':
          return diffDays < 0
        case 'today':
          return diffDays === 0
        case 'thisWeek':
          return diffDays >= 0 && diffDays <= 7
        case 'thisMonth':
          return diffDays >= 0 && diffDays <= 30
        case 'longTerm':
          return diffDays > 30
        default:
          return true
      }
    })
  }

  // Stock level filter
  if (filters.value.stockLevel) {
    filtered = filtered.filter(stock => {
      switch (filters.value.stockLevel) {
        case 'low':
          return stock.quantity <= 5
        case 'medium':
          return stock.quantity > 5 && stock.quantity <= 20
        case 'high':
          return stock.quantity > 20
        default:
          return true
      }
    })
  }

  return filtered
})

const paginatedStocks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredStocks.value.slice(start, end)
})

const summary = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const oneWeekFromNow = new Date(today)
  oneWeekFromNow.setDate(today.getDate() + 7)

  return {
    totalBatches: allStocks.value.length,
    totalQuantity: allStocks.value.reduce((sum, stock) => sum + stock.quantity, 0),
    expiringThisWeek: allStocks.value.filter(stock => {
      const expDate = new Date(stock.expiration_date)
      return expDate >= today && expDate <= oneWeekFromNow
    }).length,
    lowStock: allStocks.value.filter(stock => stock.quantity <= 5).length,
  }
})


// Methods
const loadStocks = async () => {
  loading.value = true
  try {
    const response = await stockService.getStocks()
    allStocks.value = response.stocks
    
    // Update category options
    const categories = new Set(allStocks.value.map(stock => stock.product?.category).filter(Boolean))
    categoryOptions.value = [
      { label: 'Todas as categorias', value: null },
      ...Array.from(categories).map(cat => ({ label: cat!, value: cat! }))
    ] as any
    
    // Update category chart
    await nextTick()
    updateCategoryChart()
  } catch (error) {
    console.error('Erro ao carregar estoque:', error)
  } finally {
    loading.value = false
  }
}

const updateCategoryChart = () => {
  if (!categoryChart.value) return
  
  // Destroy existing chart
  if (categoryChartInstance.value) {
    categoryChartInstance.value.destroy()
  }
  
  // Calculate category data
  const categoryMap = new Map<string, number>()
  filteredStocks.value.forEach(stock => {
    const category = stock.product?.category || 'Sem categoria'
    categoryMap.set(category, (categoryMap.get(category) || 0) + stock.quantity)
  })

  const labels = Array.from(categoryMap.keys())
  const data = Array.from(categoryMap.values())
  
  if (labels.length === 0) return
  
  const colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 205, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ]

  const config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.parsed
              const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ${value} unidades (${percentage}%)`
            }
          }
        }
      }
    }
  }

  categoryChartInstance.value = new ChartJS(categoryChart.value, config)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    category: null,
    expiration: null,
    stockLevel: null,
  }
}

const onPageChange = (event: any) => {
  first.value = event.first
  currentPage.value = event.page + 1
}

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const getCategorySeverity = (category?: string): string => {
  const severityMap: Record<string, string> = {
    'Alimentos': 'success',
    'Bebidas': 'info',
    'Limpeza': 'warning',
    'Higiene': 'help',
  }
  return severityMap[category || ''] || 'secondary'
}

const getQuantityClass = (quantity: number): string => {
  if (quantity <= 5) return 'bg-red-100 text-red-800'
  if (quantity <= 20) return 'bg-orange-100 text-orange-800'
  return 'bg-green-100 text-green-800'
}

const getExpirationStatus = (date: string | Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const expDate = new Date(date)
  expDate.setHours(0, 0, 0, 0)
  
  const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: 'Vencido', severity: 'danger' }
  } else if (diffDays === 0) {
    return { label: 'Vence hoje', severity: 'danger' }
  } else if (diffDays <= 7) {
    return { label: `${diffDays} dias`, severity: 'warning' }
  } else if (diffDays <= 30) {
    return { label: `${diffDays} dias`, severity: 'info' }
  } else {
    return { label: `${diffDays} dias`, severity: 'success' }
  }
}

// Watchers
watch(() => filters.value, () => {
  currentPage.value = 1
  first.value = 0
  updateCategoryChart()
}, { deep: true })

watch(() => allStocks.value, () => {
  updateCategoryChart()
}, { deep: true })

// Lifecycle
onMounted(() => {
  loadStocks()
})

// Expose methods for parent components
defineExpose({
  loadStocks,
})
</script>