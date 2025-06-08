<template>
  <n-layout>
    <n-layout-header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900">ValiData</h1>
      </div>
    </n-layout-header>

    <n-layout-content class="p-4">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Bem-vindo</h2>
          <p class="text-gray-600">Você está logado no sistema.</p>
        </div>
      </div>
    </n-layout-content>

    <div class="max-w-7xl mx-auto mt-8">
      <barcode-scanner-button />
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
import BarcodeScannerButton from '@/components/barcode/BarcodeScannerButton.vue'
</script>
