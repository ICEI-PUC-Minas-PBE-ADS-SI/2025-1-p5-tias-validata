import { productService } from '@/services/product.service'
import { stockService } from '@/services/stock.service'
import type { ProductCreateRequest } from '@/types/product'
import type { StockCreateRequest } from '@/types/stock'

// Dados de teste para produtos
const testProducts: ProductCreateRequest[] = [
  {
    name: 'Biscoito Recheado',
    barcode: '7891234567890',
    brand: 'Marca A',
    category: 'Alimentos',
    base_price: 350
  },
  {
    name: 'Refrigerante Cola',
    barcode: '7891234567891',
    brand: 'Marca B',
    category: 'Bebidas',
    base_price: 400
  },
  {
    name: 'Detergente Líquido',
    barcode: '7891234567892',
    brand: 'Marca C',
    category: 'Limpeza',
    base_price: 250
  },
  {
    name: 'Shampoo',
    barcode: '7891234567893',
    brand: 'Marca D',
    category: 'Higiene',
    base_price: 890
  },
  {
    name: 'Iogurte Natural',
    barcode: '7891234567894',
    brand: 'Marca E',
    category: 'Alimentos',
    base_price: 180
  }
]

// Função para criar dados de teste
export async function createTestData() {
  console.log('Criando dados de teste...')
  
  try {
    const createdProducts = []
    
    // Criar produtos
    for (const productData of testProducts) {
      try {
        const product = await productService.createProduct(productData)
        createdProducts.push(product)
        console.log('Produto criado:', product.name)
      } catch (error) {
        console.log('Produto já existe ou erro:', productData.name)
        // Tentar buscar o produto existente
        try {
          const existingProduct = await productService.getProductByBarcode(productData.barcode)
          if (existingProduct) {
            createdProducts.push(existingProduct)
          }
        } catch (e) {
          console.error('Erro ao buscar produto existente:', e)
        }
      }
    }

    console.log('Produtos disponíveis:', createdProducts.length)

    // Criar lotes de estoque com diferentes datas de vencimento
    const today = new Date()
    const stocksToCreate: StockCreateRequest[] = []

    createdProducts.forEach((product, index) => {
      // Criar 2-3 lotes por produto com datas variadas
      const stockVariations = [
        {
          quantity: 10 + Math.floor(Math.random() * 20),
          daysOffset: Math.floor(Math.random() * 7) + 1, // 1-7 dias
        },
        {
          quantity: 5 + Math.floor(Math.random() * 15),
          daysOffset: Math.floor(Math.random() * 14) + 8, // 8-21 dias
        },
        {
          quantity: 15 + Math.floor(Math.random() * 25),
          daysOffset: Math.floor(Math.random() * 30) + 22, // 22-51 dias
        }
      ]

      stockVariations.forEach((variation, stockIndex) => {
        const expirationDate = new Date(today)
        expirationDate.setDate(today.getDate() + variation.daysOffset)
        
        stocksToCreate.push({
          productId: product.id,
          quantity: variation.quantity,
          expiration_date: expirationDate.toISOString().split('T')[0]
        })
      })
    })

    // Criar alguns produtos vencidos para teste
    if (createdProducts.length > 0) {
      const expiredDate = new Date(today)
      expiredDate.setDate(today.getDate() - 2) // 2 dias atrás
      
      stocksToCreate.push({
        productId: createdProducts[0].id,
        quantity: 3,
        expiration_date: expiredDate.toISOString().split('T')[0]
      })
    }

    console.log('Criando lotes de estoque:', stocksToCreate.length)

    // Criar lotes
    for (const stockData of stocksToCreate) {
      try {
        const stock = await stockService.createStock(stockData)
        console.log('Lote criado:', stock.quantity, 'unidades vencendo em', stock.expiration_date)
      } catch (error) {
        console.error('Erro ao criar lote:', error)
      }
    }

    console.log('Dados de teste criados com sucesso!')
    return true
  } catch (error) {
    console.error('Erro ao criar dados de teste:', error)
    return false
  }
}

// Função para limpar dados de teste (opcional)
export async function clearTestData() {
  console.log('Limpando dados de teste...')
  // Implementar se necessário
}