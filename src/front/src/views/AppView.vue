<template>
  <AppLayout page-title="Gestão de Produtos">
    <Card class="mb-8">
      <template #content>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Gestão de Produtos</h2>
        <p class="text-gray-600">Gerencie seus produtos com controle de validade e estoque.</p>
      </template>
    </Card>

    <ProductBarcodeIntegration />
  </AppLayout>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import AppLayout from '@/components/layout/AppLayout.vue'
import ProductBarcodeIntegration from '@/components/products/ProductBarcodeIntegration.vue'
</script>
