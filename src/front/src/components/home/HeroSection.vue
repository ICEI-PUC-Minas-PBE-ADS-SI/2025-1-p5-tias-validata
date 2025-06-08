<template>
  <div class="bg-primary-50">
    <div
      class="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <div class="lg:w-1/2 text-center lg:text-left">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block text-primary"> Reduza o desperdício, </span>
          <span class="block text-gray-600 mt-2">aumente seus lucros</span>
        </h1>

        <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
        >
          Uma solução inteligente para pequenos e médios varejistas gerenciarem estoques, validades
          e reduzirem o desperdício de alimentos.
        </p>

        <div
          class="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <n-button size="large" class="w-full sm:w-auto" @click="$emit('show-auth')">
            Comece agora
          </n-button>

          <n-button
            type="default"
            size="large"
            class="w-full sm:w-auto"
            @click="$emit('scroll-to', 'how-it-works')"
          >
            Saiba mais
          </n-button>
        </div>
      </div>

      <div class="mt-8 sm:mt-12 lg:mt-0 lg:w-1/2">
        <n-image
          width="100%"
          src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="App screenshot"
          :preview-disabled="true"
          class="rounded-lg shadow-xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NImage } from 'naive-ui'

defineEmits<{
  (e: 'show-auth'): void
  (e: 'scroll-to', section: string): void
}>()
</script>

<style scoped>
@media (max-width: 768px) {
  :deep(.n-button) {
    width: 100%;
  }
}
</style>
