<template>
  <div>
    <ProductsTable
      ref="productsTableRef"
      @open-create-modal="openCreateModal"
      @open-sell-modal="openSellModal"
      @edit-product="openEditModal"
    />

    <ProductModal
      ref="productModalRef"
      v-model:visible="showProductModal"
      :product="selectedProduct"
      @product-saved="handleProductSaved"
      @open-barcode-scanner="openBarcodeScanner"
    />

    <SellModal v-model:show="showSellModal" @sale-completed="handleSaleCompleted" />

    <BarcodeScanner
      v-if="showBarcodeScanner"
      @barcode-detected="handleBarcodeDetected"
      @close="closeBarcodeScanner"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductsTable from './ProductsTable.vue'
import ProductModal from './ProductModal.vue'
import SellModal from './SellModal.vue'
import BarcodeScanner from '@/components/barcode/BarcodeScanner.vue'
import type { Product } from '@/types/product'

interface BarcodeDetectedEvent {
  code: string
  format: string
}

const productsTableRef = ref<InstanceType<typeof ProductsTable>>()
const showProductModal = ref(false)
const showSellModal = ref(false)
const showBarcodeScanner = ref(false)
const selectedProduct = ref<Product | null>(null)
const productModalRef = ref<InstanceType<typeof ProductModal>>()

const openCreateModal = () => {
  selectedProduct.value = null
  showBarcodeScanner.value = true
}

const openSellModal = () => {
  showSellModal.value = true
}

const openEditModal = (product: Product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const handleProductSaved = () => {
  if (productsTableRef.value) {
    productsTableRef.value.refreshTable()
  }
}

const handleSaleCompleted = () => {
  if (productsTableRef.value) {
    productsTableRef.value.refreshTable()
  }
}

const openBarcodeScanner = () => {
  showBarcodeScanner.value = true
}

const closeBarcodeScanner = () => {
  showBarcodeScanner.value = false
}

const handleBarcodeDetected = (event: BarcodeDetectedEvent) => {
  console.log(event)
  showBarcodeScanner.value = false

  selectedProduct.value = null
  showProductModal.value = true

  nextTick(() => {
    if (productModalRef.value) {
      productModalRef.value.setBarcodeCode(event.code)
    }
  })
}
</script>

<script lang="ts">
import { nextTick } from 'vue'
</script>
