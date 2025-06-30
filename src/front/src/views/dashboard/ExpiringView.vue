<template>
  <div class="expiring-view">
    <!-- Enhanced Expiration Dashboard -->
    <div class="relative">
      <!-- Background gradients -->
      <div class="absolute top-0 right-1/4 w-64 h-64 bg-primary-100/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary-100/15 rounded-full blur-2xl"></div>

      <div class="relative z-10">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Análise de Vencimentos</h2>
            <p class="text-gray-600 text-sm md:text-base">
              Monitore produtos próximos ao vencimento e tome ações preventivas
            </p>
          </div>

          <!-- Week Selector -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700">Semana:</span>
            <Dropdown
              v-model="selectedWeek"
              :options="weekOptions"
              optionLabel="label"
              optionValue="value"
              class="w-48"
              :pt="{
                root: 'bg-white/80 border border-gray-200/50 rounded-xl',
                trigger: 'px-4 py-2',
              }"
              @change="loadAnalytics"
            />
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-medium">Total Vencendo</p>
                <p class="text-2xl font-bold text-blue-600">{{ analytics?.totalQuantityExpiring || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i class="pi pi-calendar text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-medium">Produtos Urgentes</p>
                <p class="text-2xl font-bold text-red-600">{{ analytics?.urgentProducts?.length || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <i class="pi pi-exclamation-triangle text-red-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-medium">Lotes Afetados</p>
                <p class="text-2xl font-bold text-orange-600">{{ analytics?.productsExpiringThisWeek?.length || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i class="pi pi-box text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-medium">Período</p>
                <p class="text-sm font-bold text-gray-900">
                  {{ formatDateRange(analytics?.weekRange) }}
                </p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <i class="pi pi-clock text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Charts -->
        <ExpirationCharts :weekOffset="selectedWeekOffset" />

        <!-- Urgent Actions Required -->
        <div v-if="analytics?.urgentProducts && analytics.urgentProducts.length > 0" 
             class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 shadow-lg mt-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-exclamation-triangle text-red-600"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Ação Urgente Necessária</h3>
              <p class="text-sm text-gray-600">Produtos que vencem hoje ou amanhã</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="item in analytics.urgentProducts"
              :key="item.stock.id"
              class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 truncate">
                    {{ item.stock.product?.name || 'Produto' }}
                  </h4>
                  <p class="text-xs text-gray-600">{{ item.stock.product?.brand || 'Sem marca' }}</p>
                </div>
                <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {{ item.stock.quantity }}
                </span>
              </div>
              
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-600">
                  {{ formatDate(item.stock.expiration_date) }}
                </span>
                <Badge
                  :value="item.isExpired ? 'Vencido' : 'Vence hoje'"
                  severity="danger"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Summary Table -->
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mt-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Resumo Semanal</h3>
            <div class="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
              <i class="pi pi-info-circle"></i>
              {{ analytics?.productsExpiringThisWeek?.length || 0 }} lotes vencendo
            </div>
          </div>

          <div class="overflow-x-auto">
            <DataTable
              :value="analytics?.productsExpiringThisWeek || []"
              :loading="loading"
              stripedRows
              class="w-full"
              :pt="{
                table: 'w-full',
                thead: 'bg-gray-50/80',
                tbody: 'bg-white/50',
              }"
            >
              <Column field="stock.product.name" header="Produto" sortable>
                <template #body="{ data }">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i class="pi pi-box text-primary-600"></i>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ data.stock.product?.name || 'Produto' }}</p>
                      <p class="text-sm text-gray-600">{{ data.stock.product?.brand || 'Sem marca' }}</p>
                    </div>
                  </div>
                </template>
              </Column>

              <Column field="stock.quantity" header="Quantidade" sortable>
                <template #body="{ data }">
                  <Badge
                    :value="data.stock.quantity.toString()"
                    :severity="data.stock.quantity <= 5 ? 'danger' : data.stock.quantity <= 20 ? 'warning' : 'success'"
                    class="px-3 py-1 rounded-full font-semibold"
                  />
                </template>
              </Column>

              <Column field="stock.expiration_date" header="Data de Vencimento" sortable>
                <template #body="{ data }">
                  <div class="text-center">
                    <p class="font-medium text-gray-900">
                      {{ formatDate(data.stock.expiration_date) }}
                    </p>
                    <Badge
                      :value="getExpirationLabel(data.daysUntilExpiration)"
                      :severity="getExpirationSeverity(data.daysUntilExpiration)"
                      class="mt-1 px-2 py-1 rounded-full text-xs font-semibold"
                    />
                  </div>
                </template>
              </Column>

              <Column field="daysUntilExpiration" header="Status" sortable>
                <template #body="{ data }">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-3 h-3 rounded-full"
                      :class="{
                        'bg-red-500': data.isExpired || data.isExpiringSoon,
                        'bg-orange-500': !data.isExpired && !data.isExpiringSoon && data.daysUntilExpiration <= 3,
                        'bg-green-500': data.daysUntilExpiration > 3,
                      }"
                    ></div>
                    <span class="text-sm font-medium text-gray-700">
                      {{ getStatusLabel(data) }}
                    </span>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Badge from 'primevue/badge'
import ExpirationCharts from '@/components/charts/ExpirationCharts.vue'
import { expirationAnalyticsService, type WeeklyExpirationData } from '@/services/expiration-analytics.service'

// Data
const loading = ref(false)
const selectedWeek = ref('0')
const analytics = ref<WeeklyExpirationData | null>(null)

// Computed
const selectedWeekOffset = computed(() => parseInt(selectedWeek.value))

const weekOptions = computed(() => {
  return expirationAnalyticsService.getWeekOptions().map(option => ({
    label: option.label,
    value: option.value,
  }))
})

// Methods
const loadAnalytics = async () => {
  loading.value = true
  try {
    analytics.value = await expirationAnalyticsService.getWeeklyExpirationAnalytics(selectedWeekOffset.value)
  } catch (error) {
    console.error('Erro ao carregar análise de vencimentos:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const formatDateRange = (range?: { start: Date; end: Date }): string => {
  if (!range) return ''
  const start = formatDate(range.start)
  const end = formatDate(range.end)
  return `${start} - ${end}`
}

const getExpirationLabel = (days: number): string => {
  if (days < 0) return 'Vencido'
  if (days === 0) return 'Vence hoje'
  if (days === 1) return 'Vence amanhã'
  return `${days} dias`
}

const getExpirationSeverity = (days: number): string => {
  if (days < 0) return 'danger'
  if (days <= 1) return 'danger'
  if (days <= 3) return 'warning'
  return 'success'
}

const getStatusLabel = (item: any): string => {
  if (item.isExpired) return 'Vencido'
  if (item.isExpiringSoon) return 'Crítico'
  if (item.daysUntilExpiration <= 3) return 'Atenção'
  return 'Normal'
}

// Lifecycle
onMounted(() => {
  loadAnalytics()
})
</script>

<style scoped>
.expiring-view {
  width: 100%;
}
</style>
