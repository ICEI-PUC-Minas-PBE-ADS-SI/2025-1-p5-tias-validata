<template>
  <router-view />
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-primary-50 font-sans;
}
</style>
