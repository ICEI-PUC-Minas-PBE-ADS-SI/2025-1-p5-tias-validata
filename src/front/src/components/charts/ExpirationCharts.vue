<template>
  <div class="relative">
    <div class="absolute top-0 right-1/3 w-72 h-72 bg-primary-100/20 rounded-full blur-3xl"></div>
    <div
      class="absolute bottom-1/4 left-1/3 w-64 h-64 bg-secondary-100/15 rounded-full blur-2xl"
    ></div>

    <div class="relative z-10 space-y-8">
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Análise de Vencimentos</h2>
          <p class="text-gray-600">
            Selecione o período para visualizar produtos com validade próxima
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div class="flex-1 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="pi pi-calendar mr-2 text-primary-500"></i>
                Período de Análise
              </label>
              <Dropdown
                v-model="selectedWeek"
                :options="weekOptions"
                option-label="label"
                placeholder="Selecione uma semana"
                class="w-full lg:w-80"
                :pt="{
                  root: 'w-full',
                  input:
                    'w-full pl-4 pr-12 py-3 rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300',
                }"
              />
              <div v-if="selectedWeek" class="text-xs text-gray-500 mt-2 ml-6">
                Período: {{ formatDateRange(selectedWeek.start, selectedWeek.end) }}
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <Button
              icon="pi pi-refresh"
              label="Atualizar"
              @click="refreshData"
              :loading="loading"
              class="px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
            />
          </div>
        </div>
      </div>

      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
        <div v-if="loading" class="flex items-center justify-center py-12">
          <ProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
          <span class="ml-3 text-gray-600 font-medium">Carregando dados...</span>
        </div>
        <div v-else-if="analytics">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-primary-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-clock text-white text-xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-primary-600 mb-1">
                  {{ analytics.productsExpiringThisWeek.length }}
                </h3>
                <p class="text-sm text-gray-600">Produtos vencendo no período</p>
              </div>
            </div>

            <div
              class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-secondary-50/50 to-secondary-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-box text-white text-xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-secondary-600 mb-1">
                  {{ analytics.totalQuantityExpiring }}
                </h3>
                <p class="text-sm text-gray-600">Unidades no total</p>
              </div>
            </div>

            <div
              class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-red-50/50 to-red-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-exclamation-triangle text-white text-xl"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-1">
                  {{ analytics.urgentProducts.length }}
                </h3>
                <p class="text-sm text-gray-600">Produtos urgentes</p>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div v-if="analytics.productsExpiringThisWeek.length > 0">
              <div class="text-xl font-bold text-gray-900 mb-2">
                Você tem {{ analytics.productsExpiringThisWeek.length }}
                {{
                  analytics.productsExpiringThisWeek.length === 1
                    ? 'produto vencendo'
                    : 'produtos vencendo'
                }}
                no período selecionado
              </div>
              <div
                v-if="analytics.urgentProducts.length > 0"
                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 border border-red-200/50 rounded-full"
              >
                <i class="pi pi-exclamation-triangle text-red-600 mr-2"></i>
                <span class="text-red-700 font-semibold">
                  {{ analytics.urgentProducts.length }}
                  {{
                    analytics.urgentProducts.length === 1 ? 'produto precisa' : 'produtos precisam'
                  }}
                  de atenção imediata!
                </span>
              </div>
            </div>
            <div v-else>
              <div
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 rounded-full"
              >
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="text-green-700 font-semibold">
                  Nenhum produto vencendo no período selecionado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="analytics?.productsExpiringThisWeek.length"
        class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
      >
        <div
          class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6"
        >
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Visualização dos Dados</h3>
            <p class="text-gray-600">
              {{ selectedWeek?.label }} - {{ analytics.productsExpiringThisWeek.length }} produtos
            </p>
          </div>

          <div class="flex gap-3">
            <Button
              icon="pi pi-chart-pie"
              label="Pizza"
              @click="chartType = 'pie'"
              :class="
                chartType === 'pie'
                  ? 'px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg border-none'
                  : 'px-4 py-2 bg-white/80 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300'
              "
            />
            <Button
              icon="pi pi-chart-bar"
              label="Barras"
              @click="chartType = 'bar'"
              :class="
                chartType === 'bar'
                  ? 'px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg border-none'
                  : 'px-4 py-2 bg-white/80 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300'
              "
            />
          </div>
        </div>

        <div class="chart-wrapper bg-white/50 rounded-2xl p-6 border border-white/30">
          <PieChart
            v-if="chartType === 'pie'"
            ref="pieChartRef"
            :week-offset="getWeekOffset()"
            :key="`pie-chart-${selectedWeek?.value}`"
          />
          <BarChart
            v-else-if="chartType === 'bar'"
            ref="barChartRef"
            :week-offset="getWeekOffset()"
            :key="`bar-chart-${selectedWeek?.value}`"
          />
        </div>
      </div>

      <div
        v-if="analytics?.productsExpiringThisWeek.length"
        class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
      >
        <div class="mb-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">Detalhes dos Produtos</h3>
          <p class="text-gray-600">Lista completa dos produtos que vencem no período selecionado</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="item in analytics.productsExpiringThisWeek"
            :key="item.stock.id"
            class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            :class="{
              'border-red-300/50 bg-gradient-to-br from-red-50/80 to-red-100/50':
                item.isExpired || item.isExpiringSoon,
              'border-orange-300/50 bg-gradient-to-br from-orange-50/80 to-orange-100/50':
                !item.isExpired && !item.isExpiringSoon && item.daysUntilExpiration <= 3,
              'border-gray-200/50': item.daysUntilExpiration > 3,
            }"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 truncate mb-1">{{ item.stock.product?.name || 'Produto' }}</h4>
                <p class="text-xs text-gray-600">{{ item.stock.product?.brand || 'Sem marca' }}</p>
              </div>
              <div class="ml-3">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-red-100 text-red-800': item.stock.quantity <= 2,
                    'bg-orange-100 text-orange-800':
                      item.stock.quantity > 2 && item.stock.quantity <= 5,
                    'bg-green-100 text-green-800': item.stock.quantity > 5,
                  }"
                >
                  {{ item.stock.quantity }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-600">
                {{ new Date(item.stock.expiration_date).toLocaleDateString('pt-BR') }}
              </span>
              <span
                class="font-semibold px-2 py-1 rounded-full"
                :class="{
                  'text-red-700 bg-red-100': item.isExpired || item.isExpiringSoon,
                  'text-orange-700 bg-orange-100':
                    !item.isExpired && !item.isExpiringSoon && item.daysUntilExpiration <= 3,
                  'text-gray-700 bg-gray-100': item.daysUntilExpiration > 3,
                }"
              >
                {{ getDaysText(item.daysUntilExpiration) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import ProgressSpinner from 'primevue/progressspinner'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import {
  expirationAnalyticsService,
  type WeeklyExpirationData,
  type WeekOption,
} from '@/services/expiration-analytics.service'

const chartType = ref<'pie' | 'bar'>('pie')
const loading = ref(true)
const analytics = ref<WeeklyExpirationData | null>(null)
const selectedWeek = ref<WeekOption | null>(null)
const weekOptions = ref<WeekOption[]>([])

const pieChartRef = ref<InstanceType<typeof PieChart>>()
const barChartRef = ref<InstanceType<typeof BarChart>>()

const loadAnalytics = async () => {
  try {
    loading.value = true
    const weekOffset = getWeekOffset()
    analytics.value = await expirationAnalyticsService.getWeeklyExpirationAnalytics(weekOffset)
  } catch (error) {
    console.error('Error loading expiration analytics:', error)
  } finally {
    loading.value = false
  }
}

const getWeekOffset = (): number => {
  if (!selectedWeek.value) return 0
  return parseInt(selectedWeek.value.value.replace('week-', ''))
}

const refreshData = async () => {
  await loadAnalytics()

  const weekOffset = getWeekOffset()
  if (chartType.value === 'pie' && pieChartRef.value) {
    pieChartRef.value.refresh(weekOffset)
  } else if (chartType.value === 'bar' && barChartRef.value) {
    barChartRef.value.refresh(weekOffset)
  }
}

const getDaysText = (days: number): string => {
  if (days < 0) {
    const absDays = Math.abs(days)
    return `Vencido há ${absDays} ${absDays === 1 ? 'dia' : 'dias'}`
  } else if (days === 0) {
    return 'Vence hoje!'
  } else if (days === 1) {
    return 'Vence amanhã'
  } else {
    return `${days} dias restantes`
  }
}

const formatDateRange = (start: Date, end: Date): string => {
  try {
    const startFormatted = start.toLocaleDateString('pt-BR')
    const endFormatted = end.toLocaleDateString('pt-BR')
    return `${startFormatted} até ${endFormatted}`
  } catch (error) {
    return 'Data inválida'
  }
}

watch(selectedWeek, async () => {
  if (selectedWeek.value) {
    await refreshData()
  }
})

onMounted(async () => {
  weekOptions.value = expirationAnalyticsService.getWeekOptions()
  selectedWeek.value = weekOptions.value[0]

  await loadAnalytics()
})
</script>

<style scoped>
.chart-wrapper {
  min-height: 400px;
}
</style>
