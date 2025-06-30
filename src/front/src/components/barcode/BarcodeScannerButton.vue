<template>
  <div>
    <n-button @click="showScanner = true" type="primary"> Cadastrar produto </n-button>

    <barcode-scanner
      v-if="showScanner"
      @barcode-detected="handleBarcodeDetected"
      @close="showScanner = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import BarcodeScanner from './BarcodeScanner.vue'

const showScanner = ref(false)

const handleBarcodeDetected = () => {
  showScanner.value = false
}
</script>
