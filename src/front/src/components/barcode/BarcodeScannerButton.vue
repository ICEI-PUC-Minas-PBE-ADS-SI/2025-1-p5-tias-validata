<template>
  <div>
    <Button @click="showScanner = true" size="large" icon="pi pi-qrcode">
      Cadastrar produto
    </Button>

    <barcode-scanner
      v-if="showScanner"
      @barcode-detected="handleBarcodeDetected"
      @close="showScanner = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import BarcodeScanner from './BarcodeScanner.vue'

const showScanner = ref(false)

const handleBarcodeDetected = () => {
  showScanner.value = false
}
</script>
