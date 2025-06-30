<template>
  <div class="chart-container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" :plugins="plugins" />
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
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import ProgressSpinner from 'primevue/progressspinner'
import { expirationAnalyticsService } from '@/services/expiration-analytics.service'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
  weekOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  weekOffset: 0
})

const chartData = ref<ChartData<'bar'>>({
  labels: [],
  datasets: []
})

const loaded = ref(false)
const currentWeekOffset = ref(0)
const weekLabel = ref('Esta Semana')

const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Produtos por Data de Validade',
      font: {
        size: 16,
        weight: 'bold'
      },
      color: '#374151'
    },
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const value = context.parsed.y
          return `${value} ${value === 1 ? 'produto' : 'produtos'}`
        }
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Data de Validade',
        font: {
          size: 12,
          weight: 'bold'
        },
        color: '#6B7280'
      },
      grid: {
        display: false
      },
      ticks: {
        color: '#6B7280'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Quantidade de Produtos',
        font: {
          size: 12,
          weight: 'bold'
        },
        color: '#6B7280'
      },
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        color: '#6B7280'
      },
      grid: {
        color: 'rgba(107, 114, 128, 0.1)'
      }
    }
  },
  elements: {
    bar: {
      borderRadius: 4,
      borderSkipped: false
    }
  }
})

const plugins = [{
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: ChartJS<'bar'>) => {
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
    chartOptions.value.plugins.title.text = `Produtos por Data de Validade (${weekLabel.value})`
  }
}

const loadChartData = async (weekOffset: number = 0) => {
  try {
    currentWeekOffset.value = weekOffset
    updateWeekLabel(weekOffset)
    
    const data = await expirationAnalyticsService.getBarChartData(weekOffset)
    chartData.value = data
    loaded.value = true
  } catch (error) {
    console.error('Error loading bar chart data:', error)
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
