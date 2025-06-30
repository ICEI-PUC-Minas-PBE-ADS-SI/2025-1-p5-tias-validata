import { stockService } from './stock.service'
import type { Stock } from '@/types/stock'

export interface ExpiringProduct {
  stock: Stock
  daysUntilExpiration: number
  isExpired: boolean
  isExpiringSoon: boolean
}

export interface WeeklyExpirationData {
  productsExpiringThisWeek: ExpiringProduct[]
  totalQuantityExpiring: number
  expirationByDate: Map<string, { products: ExpiringProduct[]; totalQuantity: number }>
  urgentProducts: ExpiringProduct[]
  weekRange: { start: Date; end: Date }
}

export interface WeekOption {
  label: string
  value: string
  start: Date
  end: Date
}

class ExpirationAnalyticsService {
  /**
   * Get available week options for filtering
   */
  getWeekOptions(): WeekOption[] {
    const options: WeekOption[] = []
    const today = new Date()

    for (let weekOffset = 0; weekOffset < 4; weekOffset++) {
      const weekStart = new Date(today)
      const currentDay = today.getDay()

      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
      const daysToAdd = weekOffset * 7 + mondayOffset
      weekStart.setDate(today.getDate() + daysToAdd)
      weekStart.setHours(0, 0, 0, 0)

      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      weekEnd.setHours(23, 59, 59, 999)

      let label = ''
      if (weekOffset === 0) {
        label = 'Esta Semana'
      } else if (weekOffset === 1) {
        label = 'Próxima Semana'
      } else {
        try {
          const startFormatted = weekStart.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          })
          const endFormatted = weekEnd.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          })
          label = `${startFormatted} - ${endFormatted}`
        } catch (error) {
          label = `Semana ${weekOffset + 1}`
        }
      }

      options.push({
        label,
        value: `week-${weekOffset}`,
        start: new Date(weekStart),
        end: new Date(weekEnd),
      })
    }

    return options
  }

  /**
   * Get the start and end of a specific week
   */
  private getWeekRange(weekOffset: number = 0): { start: Date; end: Date } {
    const today = new Date()
    const currentDay = today.getDay()

    const start = new Date(today)
    // Ajustar para começar na segunda-feira
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
    const daysToAdd = weekOffset * 7 + mondayOffset
    start.setDate(today.getDate() + daysToAdd)
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    end.setHours(23, 59, 59, 999)

    return { start: new Date(start), end: new Date(end) }
  }

  /**
   * Calculate days until expiration for a product
   */
  private calculateDaysUntilExpiration(expirationDate: string | Date): number {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const expDate = new Date(expirationDate)
    expDate.setHours(0, 0, 0, 0)

    const diffTime = expDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * Check if a product expires within a specific week
   */
  private isExpiringInWeek(
    expirationDate: string | Date,
    weekRange: { start: Date; end: Date },
  ): boolean {
    const expDate = new Date(expirationDate)
    return expDate >= weekRange.start && expDate <= weekRange.end
  }

  /**
   * Format date to YYYY-MM-DD for grouping
   */
  private formatDateKey(date: string | Date): string {
    return new Date(date).toISOString().split('T')[0]
  }

  /**
   * Get comprehensive expiration analytics for a specific week
   */
  async getWeeklyExpirationAnalytics(weekOffset: number = 0): Promise<WeeklyExpirationData> {
    try {
      const response = await stockService.getStocks()
      const allStocks = response.stocks

      const weekRange = this.getWeekRange(weekOffset)

      const productsExpiringThisWeek: ExpiringProduct[] = []
      const expirationByDate = new Map<
        string,
        { products: ExpiringProduct[]; totalQuantity: number }
      >()

      let totalQuantityExpiring = 0

      for (const stock of allStocks) {
        const daysUntilExpiration = this.calculateDaysUntilExpiration(stock.expiration_date)

        if (this.isExpiringInWeek(stock.expiration_date, weekRange)) {
          const expiringStock: ExpiringProduct = {
            stock,
            daysUntilExpiration,
            isExpired: daysUntilExpiration < 0,
            isExpiringSoon: daysUntilExpiration <= 1 && daysUntilExpiration >= 0,
          }

          productsExpiringThisWeek.push(expiringStock)
          totalQuantityExpiring += stock.quantity

          const dateKey = this.formatDateKey(stock.expiration_date)
          if (!expirationByDate.has(dateKey)) {
            expirationByDate.set(dateKey, { products: [], totalQuantity: 0 })
          }

          const dateGroup = expirationByDate.get(dateKey)!
          dateGroup.products.push(expiringStock)
          dateGroup.totalQuantity += stock.quantity
        }
      }

      const urgentProducts =
        weekOffset === 0
          ? productsExpiringThisWeek.filter(
              (p) => p.daysUntilExpiration <= 1 && p.daysUntilExpiration >= 0,
            )
          : []

      return {
        productsExpiringThisWeek,
        totalQuantityExpiring,
        expirationByDate,
        urgentProducts,
        weekRange,
      }
    } catch (error) {
      console.error('Error getting weekly expiration analytics:', error)
      throw error
    }
  }

  /**
   * Get formatted data for pie chart
   */
  async getPieChartData(weekOffset: number = 0): Promise<{
    labels: string[]
    datasets: Array<{
      data: number[]
      backgroundColor: string[]
      borderColor: string[]
      borderWidth: number
    }>
  }> {
    const analytics = await this.getWeeklyExpirationAnalytics(weekOffset)

    const labels: string[] = []
    const data: number[] = []
    const backgroundColor: string[] = []
    const borderColor: string[] = []

    const colors = [
      { bg: 'rgba(255, 99, 132, 0.8)', border: 'rgba(255, 99, 132, 1)' },
      { bg: 'rgba(54, 162, 235, 0.8)', border: 'rgba(54, 162, 235, 1)' },
      { bg: 'rgba(255, 205, 86, 0.8)', border: 'rgba(255, 205, 86, 1)' },
      { bg: 'rgba(75, 192, 192, 0.8)', border: 'rgba(75, 192, 192, 1)' },
      { bg: 'rgba(153, 102, 255, 0.8)', border: 'rgba(153, 102, 255, 1)' },
      { bg: 'rgba(255, 159, 64, 0.8)', border: 'rgba(255, 159, 64, 1)' },
      { bg: 'rgba(199, 199, 199, 0.8)', border: 'rgba(199, 199, 199, 1)' },
      { bg: 'rgba(83, 102, 255, 0.8)', border: 'rgba(83, 102, 255, 1)' },
      { bg: 'rgba(255, 99, 255, 0.8)', border: 'rgba(255, 99, 255, 1)' },
      { bg: 'rgba(50, 205, 50, 0.8)', border: 'rgba(50, 205, 50, 1)' },
      { bg: 'rgba(255, 140, 0, 0.8)', border: 'rgba(255, 140, 0, 1)' },
      { bg: 'rgba(220, 20, 60, 0.8)', border: 'rgba(220, 20, 60, 1)' },
      { bg: 'rgba(32, 178, 170, 0.8)', border: 'rgba(32, 178, 170, 1)' },
      { bg: 'rgba(106, 90, 205, 0.8)', border: 'rgba(106, 90, 205, 1)' },
      { bg: 'rgba(255, 20, 147, 0.8)', border: 'rgba(255, 20, 147, 1)' },
    ]

    analytics.productsExpiringThisWeek.forEach((item, index) => {
      const color = colors[index % colors.length]
      const expDate = new Date(item.stock.expiration_date).toLocaleDateString('pt-BR')

      labels.push(`${item.stock.product?.name || 'Produto'} (${expDate})`)
      data.push(item.stock.quantity)

      if (item.isExpiringSoon || item.isExpired) {
        backgroundColor.push('rgba(239, 68, 68, 0.8)')
        borderColor.push('rgba(239, 68, 68, 1)')
      } else {
        backgroundColor.push(color.bg)
        borderColor.push(color.border)
      }
    })

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 2,
        },
      ],
    }
  }

  /**
   * Get formatted data for bar chart (grouped by date)
   */
  async getBarChartData(weekOffset: number = 0): Promise<{
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }>
  }> {
    const analytics = await this.getWeeklyExpirationAnalytics(weekOffset)

    const labels: string[] = []
    const data: number[] = []

    const sortedDates = Array.from(analytics.expirationByDate.keys()).sort()

    sortedDates.forEach((dateKey) => {
      const dateGroup = analytics.expirationByDate.get(dateKey)!
      const formattedDate = new Date(dateKey).toLocaleDateString('pt-BR')

      labels.push(formattedDate)
      data.push(dateGroup.totalQuantity)
    })

    return {
      labels,
      datasets: [
        {
          label: 'Quantidade de Produtos',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    }
  }
}

export const expirationAnalyticsService = new ExpirationAnalyticsService()
