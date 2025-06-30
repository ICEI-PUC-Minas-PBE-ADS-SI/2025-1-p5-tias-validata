<template>
  <div id="how-it-works" class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="text-base font-semibold tracking-wide uppercase text-primary">Como funciona</p>

        <h2 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Transforme sua gestão em 3 passos simples
        </h2>
      </div>

      <div class="mt-10">
        <div class="relative">
          <div class="flex flex-col md:flex-row gap-6 items-center">
            <div class="w-full md:w-1/2 order-1">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="App interface"
                :preview="false"
                class="rounded-lg shadow-xl w-full"
              />
            </div>

            <div class="w-full md:w-1/2 order-2 space-y-6">
              <Card class="shadow-sm hover:shadow-md transition-shadow duration-200 p-2">
                <template #header>
                  <div class="flex items-center">
                    <i class="pi pi-circle-fill text-primary mr-2 text-xl"></i>
                    <span class="text-xl md:text-2xl font-bold">Cadastre seus produtos</span>
                  </div>
                </template>
                <template #content>
                  <p class="text-base md:text-lg text-gray-500">
                    Registre todos os produtos do seu estoque incluindo informações como data de
                    validade, quantidade e preço.
                  </p>
                </template>
              </Card>

              <Card class="shadow-sm hover:shadow-md transition-shadow duration-200 p-2">
                <template #header>
                  <div class="flex items-center">
                    <i class="pi pi-circle-fill text-primary mr-2 text-xl"></i>
                    <span class="text-xl md:text-2xl font-bold">Receba alertas inteligentes</span>
                  </div>
                </template>
                <template #content>
                  <p class="text-base md:text-lg text-gray-500">
                    Nosso sistema avisa quando produtos estão próximos do vencimento e sugere ações
                    como promoções ou reposição.
                  </p>
                </template>
              </Card>

              <Card class="shadow-sm hover:shadow-md transition-shadow duration-200 p-2">
                <template #header>
                  <div class="flex items-center">
                    <i class="pi pi-circle-fill text-primary mr-2 text-xl"></i>
                    <span class="text-xl md:text-2xl font-bold"
                      >Reduza o desperdício e aumente lucros</span
                    >
                  </div>
                </template>
                <template #content>
                  <p class="text-base md:text-lg text-gray-500">
                    Com menos produtos vencidos e mais vendas, você reduz desperdícios e aumenta sua
                    margem de lucro.
                  </p>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Image from 'primevue/image'
</script>

<style scoped>
@media (max-width: 768px) {
  :deep(.p-card) {
    margin-bottom: 16px;
  }

  :deep(.p-card-header) {
    padding: 16px;
  }

  :deep(.p-card-content) {
    padding: 16px;
  }
}
</style>
