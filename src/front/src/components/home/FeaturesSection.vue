<template>
  <div id="features" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <n-text class="text-base font-semibold tracking-wide uppercase text-primary">
          Recursos
        </n-text>

        <h2 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Tudo que você precisa para reduzir o desperdício
        </h2>

        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Nossa plataforma oferece ferramentas poderosas para otimizar sua gestão de estoque.
        </p>
      </div>

      <div class="mt-10">
        <n-grid :cols="24" :x-gap="24" :y-gap="24">
          <n-grid-item :span="24" :sm="12" :md="12">
            <n-card class="h-full shadow-sm hover:shadow-md transition-shadow duration-200">
              <template #header>
                <div class="flex items-center">
                  <n-icon size="24" class="text-primary mr-2">
                    <i class="fas fa-barcode"></i>
                  </n-icon>
                  <n-text class="text-lg md:text-xl font-medium">Controle de Validade</n-text>
                </div>
              </template>

              <n-text class="text-base md:text-lg text-gray-500">
                Acompanhe automaticamente a validade dos produtos e receba alertas quando estiverem
                próximos do vencimento.
              </n-text>
            </n-card>
          </n-grid-item>

          <n-grid-item :span="24" :sm="12" :md="12">
            <n-card class="h-full shadow-sm hover:shadow-md transition-shadow duration-200">
              <template #header>
                <div class="flex items-center">
                  <n-icon size="24" class="text-primary mr-2">
                    <i class="fas fa-tags"></i>
                  </n-icon>
                  <n-text class="text-lg md:text-xl font-medium">Precificação Dinâmica</n-text>
                </div>
              </template>

              <n-text class="text-base md:text-lg text-gray-500">
                Descontos automáticos baseados na proximidade da data de validade para garantir que
                os produtos sejam vendidos.
              </n-text>
            </n-card>
          </n-grid-item>

          <n-grid-item :span="24" :sm="12" :md="12">
            <n-card class="h-full shadow-sm hover:shadow-md transition-shadow duration-200">
              <template #header>
                <div class="flex items-center">
                  <n-icon size="24" class="text-primary mr-2">
                    <i class="fas fa-chart-line"></i>
                  </n-icon>
                  <n-text class="text-lg md:text-xl font-medium">Relatórios Inteligentes</n-text>
                </div>
              </template>

              <n-text class="text-base md:text-lg text-gray-500">
                Análises detalhadas para entender padrões de venda e otimizar suas compras junto aos
                fornecedores.
              </n-text>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NCard, NIcon, NText } from 'naive-ui'
</script>

<style scoped>
@media (max-width: 768px) {
  :deep(.n-card) {
    margin-bottom: 16px;
  }

  :deep(.n-card-header) {
    padding: 16px;
  }

  :deep(.n-card__content) {
    padding: 16px;
  }
}

@media (max-width: 640px) {
  :deep(.n-grid) {
    margin: 0 -8px;
  }

  :deep(.n-grid-item) {
    padding: 0 8px;
  }
}
</style>
