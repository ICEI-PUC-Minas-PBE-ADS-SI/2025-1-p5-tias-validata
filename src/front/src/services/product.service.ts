import type { Product, ProductCreateRequest, ProductUpdateRequest } from '@/types/product'
import api from '@/lib/axios'

export const productService = {
  async getProducts(): Promise<{ products: Product[]; total: number }> {
    try {
      const response = await api.get<Product[]>('/products')
      return {
        products: response.data,
        total: response.data.length,
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await api.get<Product>(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error)
      return null
    }
  },

  async getProductByBarcode(barcode: string): Promise<Product | null> {
    try {
      const response = await api.get<Product>(`/products/barcode/${barcode}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto por código de barras:', error)
      return null
    }
  },

  async createProduct(productData: ProductCreateRequest): Promise<Product> {
    console.log(productData)
    try {
      const response = await api.post<Product>('/products', productData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      throw error
    }
  },

  async updateProduct(productData: ProductUpdateRequest): Promise<Product> {
    try {
      const { id, ...updateData } = productData
      const response = await api.patch<Product>(`/products/${id}`, updateData)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      throw error
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`)
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      throw error
    }
  },

  async seedProducts(): Promise<{ message: string; count: number }> {
    const { stockService } = await import('./stock.service')

    const realProductsWithStock = [
      {
        product: {
          name: 'Coca-Cola 350ml',
          barcode: '7894900011517',
          brand: 'Coca-Cola',
          category: 'Bebidas',
          base_price: 350,
        },
        stock: {
          quantity: 24,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Pão de Açúcar Integral',
          barcode: '7891000100103',
          brand: 'Wickbold',
          category: 'Padaria',
          base_price: 420,
        },
        stock: {
          quantity: 15,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Leite UHT Integral 1L',
          barcode: '7891991010023',
          brand: 'Parmalat',
          category: 'Laticínios',
          base_price: 590,
        },
        stock: {
          quantity: 18,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Arroz Branco Tipo 1 5kg',
          barcode: '7896036093542',
          brand: 'Tio João',
          category: 'Grãos e Cereais',
          base_price: 1890,
        },
        stock: {
          quantity: 8,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Feijão Preto 1kg',
          barcode: '7891118100056',
          brand: 'Kicaldo',
          category: 'Grãos e Cereais',
          base_price: 750,
        },
        stock: {
          quantity: 12,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Iogurte Natural 170g',
          barcode: '7891025103455',
          brand: 'Danone',
          category: 'Laticínios',
          base_price: 280,
        },
        stock: {
          quantity: 20,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Detergente Neutro 500ml',
          barcode: '7891150056329',
          brand: 'Ypê',
          category: 'Limpeza',
          base_price: 295,
        },
        stock: {
          quantity: 10,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Açúcar Cristal 1kg',
          barcode: '7891000055502',
          brand: 'União',
          category: 'Açúcar e Adoçantes',
          base_price: 480,
        },
        stock: {
          quantity: 6,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Óleo de Soja 900ml',
          barcode: '7891118015504',
          brand: 'Liza',
          category: 'Óleos e Azeites',
          base_price: 670,
        },
        stock: {
          quantity: 14,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Macarrão Espaguete 500g',
          barcode: '7891962021015',
          brand: 'Barilla',
          category: 'Massas',
          base_price: 540,
        },
        stock: {
          quantity: 16,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Frango Congelado 1kg',
          barcode: '7891234567890',
          brand: 'Sadia',
          category: 'Carnes e Aves',
          base_price: 1290,
        },
        stock: {
          quantity: 5,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Banana Prata (kg)',
          barcode: '2000000000001',
          brand: 'Natural',
          category: 'Frutas',
          base_price: 450,
        },
        stock: {
          quantity: 25,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Sabonete Líquido 250ml',
          barcode: '7891024130121',
          brand: 'Dove',
          category: 'Higiene Pessoal',
          base_price: 890,
        },
        stock: {
          quantity: 11,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Papel Higiênico 4 rolos',
          barcode: '7896058251547',
          brand: 'Scott',
          category: 'Higiene',
          base_price: 1250,
        },
        stock: {
          quantity: 8,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
      {
        product: {
          name: 'Biscoito Recheado 140g',
          barcode: '7622210951069',
          brand: 'Oreo',
          category: 'Biscoitos',
          base_price: 320,
        },
        stock: {
          quantity: 30,
          expiration_date: new Date(
            Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split('T')[0],
        },
      },
    ]

    try {
      let successCount = 0
      const errors = []

      for (const item of realProductsWithStock) {
        try {
          const savedProduct = await this.createProduct(item.product as ProductCreateRequest)

          const stockData = {
            productId: savedProduct.id,
            quantity: item.stock.quantity,
            expiration_date: item.stock.expiration_date,
          }

          await stockService.createStock(stockData)
          successCount++
        } catch (error) {
          errors.push({ product: item.product.name, error })
        }
      }

      if (errors.length > 0) {
        console.warn('Alguns produtos não puderam ser criados:', errors)
      }

      return {
        message: `Seed realizado com sucesso! ${successCount} produtos criados com estoque.`,
        count: successCount,
      }
    } catch (error) {
      console.error('Erro durante o seed:', error)
      throw error
    }
  },
}
