<template>
  <AppLayout page-title="Controle de Estoque">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <!-- Tab Navigation -->
      <div class="mb-6">
        <div class="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
          <button
            @click="activeTab = 'dashboard'"
            :class="[
              'flex-1 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
              activeTab === 'dashboard'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            ]"
          >
            <i class="pi pi-chart-bar mr-2"></i>
            Dashboard
          </button>
          <button
            @click="activeTab = 'table'"
            :class="[
              'flex-1 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
              activeTab === 'table'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            ]"
          >
            <i class="pi pi-table mr-2"></i>
            Tabela
          </button>
        </div>
      </div>

      <!-- Content -->
      <div v-if="activeTab === 'dashboard'">
        <StockDashboard ref="stockDashboardRef" />
      </div>
      
      <div v-else>
        <StocksTable
          ref="stocksTableRef"
          @edit-stock="handleEditStock"
          @delete-stock="handleDeleteStock"
        />
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      v-model:visible="deleteDialogVisible"
      :modal="true"
      :closable="false"
      :style="{ width: '450px' }"
      header="Confirmar Exclusão"
      :pt="{
        root: 'bg-white rounded-2xl shadow-2xl border border-gray-100',
        header: 'px-6 py-4 border-b border-gray-100',
        content: 'px-6 py-4',
        footer: 'px-6 py-4 border-t border-gray-100',
      }"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <i class="pi pi-exclamation-triangle text-red-600"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Confirmar Exclusão</h3>
            <p class="text-sm text-gray-500">Esta ação não pode ser desfeita</p>
          </div>
        </div>
      </template>

      <div class="py-4">
        <p class="text-gray-700 mb-4">Tem certeza que deseja excluir este lote do estoque?</p>
        <div v-if="stockToDelete" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-gray-900">
                {{ stockToDelete.product?.name || 'Produto não identificado' }}
              </p>
              <p class="text-sm text-gray-600">{{ stockToDelete.quantity }} unidades</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Validade:</p>
              <p class="font-medium text-gray-900">
                {{ formatDate(stockToDelete.expiration_date) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button
            label="Cancelar"
            @click="deleteDialogVisible = false"
            class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
          />
          <Button
            label="Excluir"
            @click="confirmDelete"
            :loading="deleteLoading"
            class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200"
          />
        </div>
      </template>
    </Dialog>

    <!-- Edit Stock Modal -->
    <StockEditModal
      v-model:visible="editModalVisible"
      :stock="stockToEdit"
      @stock-updated="handleStockUpdated"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import AppLayout from '@/components/layout/AppLayout.vue'
import StocksTable from '@/components/stocks/StocksTable.vue'
import StockDashboard from '@/components/stocks/StockDashboard.vue'
import StockEditModal from '@/components/stocks/StockEditModal.vue'
import type { Stock } from '@/types/stock'
import { stockService } from '@/services/stock.service'

const toast = useToast()

const activeTab = ref('dashboard')
const stocksTableRef = ref()
const stockDashboardRef = ref()
const deleteDialogVisible = ref(false)
const editModalVisible = ref(false)
const stockToDelete = ref<Stock | null>(null)
const stockToEdit = ref<Stock | null>(null)
const deleteLoading = ref(false)

const handleEditStock = (stock: Stock) => {
  stockToEdit.value = stock
  editModalVisible.value = true
}

const handleDeleteStock = (stock: Stock) => {
  stockToDelete.value = stock
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  if (!stockToDelete.value) return

  deleteLoading.value = true
  try {
    await stockService.deleteStock(stockToDelete.value.id)

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Lote excluído com sucesso',
      life: 3000,
    })

    stocksTableRef.value?.loadStocks()
    stockDashboardRef.value?.loadStocks()
    deleteDialogVisible.value = false
    stockToDelete.value = null
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao excluir lote',
      life: 3000,
    })
  } finally {
    deleteLoading.value = false
  }
}

const handleStockUpdated = (updatedStock: Stock) => {
  stocksTableRef.value?.loadStocks()
  stockDashboardRef.value?.loadStocks()
  editModalVisible.value = false
  stockToEdit.value = null
}

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>
