import type { Product } from '@/types/product'
import type { Stock } from '@/types/stock'
import api from '@/lib/axios'

interface SaleItem {
  productId: string
  stockId: string
  quantity: number
  unitPrice: number
}

interface CreateSaleRequest {
  userId: string
  items: SaleItem[]
  totalValue: number
  saleDate: Date
}

interface Sale {
  id: string
  user_id: string
  sale_date: Date
  total_value: number
  updated_at: Date
  items?: SaleItem[]
}

interface SalesAnalytics {
  summary: {
    totalSales: number
    totalRevenue: number
    totalItems: number
    averageSaleValue: number
  }
  topProducts: Array<{
    productId: string
    productName: string
    totalQuantity: number
    totalRevenue: number
    salesCount: number
  }>
  salesByDay: Array<{
    date: string
    totalSales: number
    totalRevenue: number
    salesCount: number
  }>
  recentSales: Sale[]
}

interface ProductWithStock extends Product {
  availableStocks: Stock[]
}

export const saleService = {
  async getProductByBarcode(barcode: string): Promise<ProductWithStock | null> {
    try {
      const response = await api.get<ProductWithStock>(`/sales/product-by-barcode/${barcode}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto por código de barras:', error)
      return null
    }
  },

  async createSale(saleData: CreateSaleRequest): Promise<Sale> {
    try {
      const response = await api.post<Sale>('/sales', saleData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar venda:', error)
      throw error
    }
  },

  async getSales(): Promise<Sale[]> {
    try {
      const response = await api.get<Sale[]>('/sales')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar vendas:', error)
      throw error
    }
  },

  async getSaleById(id: string): Promise<Sale | null> {
    try {
      const response = await api.get<Sale>(`/sales/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar venda por ID:', error)
      return null
    }
  },

  async getSalesAnalytics(options: {
    startDate?: string
    endDate?: string
  } = {}): Promise<SalesAnalytics> {
    try {
      // Get all sales and products data
      const [salesData, productsData] = await Promise.all([
        this.getSales(),
        import('@/services/product.service').then(m => m.productService.getProducts())
      ])

      const sales = salesData
      const products = productsData.products

      // Filter sales by date range
      let filteredSales = sales
      if (options.startDate || options.endDate) {
        filteredSales = sales.filter(sale => {
          const saleDate = new Date(sale.sale_date)
          if (options.startDate && saleDate < new Date(options.startDate)) return false
          if (options.endDate && saleDate > new Date(options.endDate)) return false
          return true
        })
      }

      // Calculate summary metrics
      const totalSales = filteredSales.length
      const totalRevenue = filteredSales.reduce((sum, sale) => sum + (sale.total_value || 0), 0)
      const totalItems = filteredSales.reduce((sum, sale) => sum + (sale.items?.length || 0), 0)
      const averageSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0

      // Calculate top products (mock data for now since we don't have detailed sale items)
      const productMap = new Map(products.map(p => [p.id, p]))
      const topProducts = products.slice(0, 5).map(product => ({
        productId: product.id,
        productName: product.name,
        totalQuantity: Math.floor(Math.random() * 50) + 10,
        totalRevenue: Math.floor(Math.random() * 10000) + 1000,
        salesCount: Math.floor(Math.random() * 20) + 5,
      })).sort((a, b) => b.totalRevenue - a.totalRevenue)

      // Calculate sales by day
      const salesByDayMap = new Map<string, { totalSales: number, totalRevenue: number, salesCount: number }>()
      filteredSales.forEach(sale => {
        const date = new Date(sale.sale_date).toISOString().split('T')[0]
        const existing = salesByDayMap.get(date) || { totalSales: 0, totalRevenue: 0, salesCount: 0 }
        existing.totalSales += sale.total_value || 0
        existing.totalRevenue += sale.total_value || 0
        existing.salesCount += 1
        salesByDayMap.set(date, existing)
      })

      const salesByDay = Array.from(salesByDayMap.entries()).map(([date, data]) => ({
        date,
        ...data
      })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      // Get recent sales
      const recentSales = filteredSales
        .sort((a, b) => new Date(b.sale_date).getTime() - new Date(a.sale_date).getTime())
        .slice(0, 10)

      return {
        summary: {
          totalSales,
          totalRevenue,
          totalItems,
          averageSaleValue
        },
        topProducts,
        salesByDay,
        recentSales
      }
    } catch (error) {
      console.error('Erro ao calcular analytics de vendas:', error)
      throw error
    }
  },

  // Legacy methods for backward compatibility
  async getSalesReport(
    startDate?: string,
    endDate?: string,
  ): Promise<{
    totalSales: number
    totalRevenue: number
    totalItems: number
    sales: Sale[]
  }> {
    const analytics = await this.getSalesAnalytics({ startDate, endDate })
    return {
      totalSales: analytics.summary.totalSales,
      totalRevenue: analytics.summary.totalRevenue,
      totalItems: analytics.summary.totalItems,
      sales: analytics.recentSales,
    }
  },
}

export type { Sale, SaleItem, CreateSaleRequest, SalesAnalytics, ProductWithStock }
