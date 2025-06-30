<template>
  <div class="chart-container">
    <Pie
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
      :plugins="plugins"
    />
    <div v-else class="flex items-center justify-center h-64">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import ProgressSpinner from 'primevue/progressspinner'
import { expirationAnalyticsService } from '@/services/expiration-analytics.service'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

interface Props {
  weekOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  weekOffset: 0
})

const chartData = ref<ChartData<'pie'>>({
  labels: [],
  datasets: []
})

const loaded = ref(false)
const currentWeekOffset = ref(0)
const weekLabel = ref('Esta Semana')

const chartOptions = ref<ChartOptions<'pie'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Produtos Vencendo',
      font: {
        size: 16,
        weight: 'bold'
      },
      color: '#374151'
    },
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12
        },
        color: '#374151'
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
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1
    }
  },
  elements: {
    arc: {
      borderWidth: 2
    }
  }
})

const plugins = [{
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: ChartJS<'pie'>) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  }
}]

const updateWeekLabel = (weekOffset: number) => {
  if (weekOffset === 0) {
    weekLabel.value = 'Esta Semana'
  } else if (weekOffset === 1) {
    weekLabel.value = 'Próxima Semana'
  } else {
    weekLabel.value = `Semana ${weekOffset + 1}`
  }
  
  if (chartOptions.value.plugins?.title) {
    chartOptions.value.plugins.title.text = `Produtos Vencendo (${weekLabel.value})`
  }
}

const loadChartData = async (weekOffset: number = 0) => {
  try {
    currentWeekOffset.value = weekOffset
    updateWeekLabel(weekOffset)
    
    const data = await expirationAnalyticsService.getPieChartData(weekOffset)
    chartData.value = data
    loaded.value = true
  } catch (error) {
    console.error('Error loading pie chart data:', error)
    loaded.value = true
  }
}

watch(() => props.weekOffset, async (newWeekOffset) => {
  await loadChartData(newWeekOffset)
})

onMounted(async () => {
  await loadChartData(props.weekOffset)
})

defineExpose({
  refresh: loadChartData
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>