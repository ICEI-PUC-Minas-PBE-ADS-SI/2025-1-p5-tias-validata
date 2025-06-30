import type { Stock, StockCreateRequest } from '@/types/stock'
import api from '@/lib/axios'

export const stockService = {
  async getStocks(): Promise<{ stocks: Stock[]; total: number }> {
    try {
      const response = await api.get<Stock[]>('/stocks')
      return {
        stocks: response.data,
        total: response.data.length,
      }
    } catch (error) {
      console.error('Erro ao buscar estoques:', error)
      throw error
    }
  },

  async getStocksByProduct(productId: string): Promise<Stock[]> {
    try {
      const response = await api.get<Stock[]>(`/stocks/product/${productId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar estoques por produto:', error)
      throw error
    }
  },

  async createStock(stockData: StockCreateRequest): Promise<Stock> {
    try {
      const response = await api.post<Stock>('/stocks', stockData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar estoque:', error)
      throw error
    }
  },

  async updateStock(id: string, stockData: Partial<StockCreateRequest>): Promise<Stock> {
    try {
      const response = await api.patch<Stock>(`/stocks/${id}`, stockData)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error)
      throw error
    }
  },

  async deleteStock(id: string): Promise<void> {
    try {
      await api.delete(`/stocks/${id}`)
    } catch (error) {
      console.error('Erro ao deletar estoque:', error)
      throw error
    }
  },
}