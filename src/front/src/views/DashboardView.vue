<template>
  <AppLayout page-title="Dashboard">
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div class="relative">
        <div
          class="absolute top-0 right-1/4 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-100/15 rounded-full blur-2xl"
        ></div>

        <div class="relative z-10 space-y-8">
          <div class="mb-8">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta! 👋</h1>
                <p class="text-gray-600">Acompanhe o desempenho do seu negócio em tempo real</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div
              class="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-primary-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-shopping-cart text-white text-xl"></i>
                  </div>
                  <span
                    class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium"
                  >
                    +12.5%
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">R$ 12.480</h3>
                <p class="text-sm text-gray-500">Vendas do Mês</p>
              </div>
            </div>

            <div
              class="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-secondary-50/50 to-secondary-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-box text-white text-xl"></i>
                  </div>
                  <span
                    class="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium"
                  >
                    23 próximos
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">247</h3>
                <p class="text-sm text-gray-500">Produtos em Estoque</p>
              </div>
            </div>

            <div
              class="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-accent-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-dollar text-white text-xl"></i>
                  </div>
                  <span
                    class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium"
                  >
                    R$ 2.4k
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">95%</h3>
                <p class="text-sm text-gray-500">Redução Desperdício</p>
              </div>
            </div>

            <div
              class="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-purple-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <i class="pi pi-chart-line text-white text-xl"></i>
                  </div>
                  <span
                    class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium"
                  >
                    +8.2%
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">68%</h3>
                <p class="text-sm text-gray-500">Margem de Lucro</p>
              </div>
            </div>
          </div>

          <ExpirationCharts />

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
            >
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900">Produtos Críticos</h3>
                <Button size="small" icon="pi pi-external-link" text class="text-primary-600" />
              </div>

              <div class="space-y-4">
                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200/50"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg flex items-center justify-center"
                    >
                      <i class="pi pi-exclamation-triangle text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Iogurte Natural</h4>
                      <p class="text-sm text-gray-600">Vence em 2 dias</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                    CRÍTICO
                  </span>
                </div>

                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center"
                    >
                      <i class="pi pi-clock text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Pão Integral</h4>
                      <p class="text-sm text-gray-600">Vence em 5 dias</p>
                    </div>
                  </div>
                  <span
                    class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium"
                  >
                    ATENÇÃO
                  </span>
                </div>

                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200/50"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center"
                    >
                      <i class="pi pi-info-circle text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Leite Desnatado</h4>
                      <p class="text-sm text-gray-600">Vence em 7 dias</p>
                    </div>
                  </div>
                  <span
                    class="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium"
                  >
                    MODERADO
                  </span>
                </div>
              </div>
            </div>

            <div
              class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
            >
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900">Ações Recomendadas</h3>
                <i class="pi pi-lightbulb text-yellow-500 text-xl"></i>
              </div>

              <div class="space-y-4">
                <div
                  class="p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-xl border border-blue-200/50"
                >
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-blue-500 to-primary-500 rounded-lg flex items-center justify-center"
                    >
                      <i class="pi pi-percentage text-white text-sm"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900 mb-1">Aplicar desconto de 30%</h4>
                      <p class="text-sm text-gray-600">
                        Em produtos próximos do vencimento para acelerar vendas
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="p-4 bg-gradient-to-r from-green-50 to-accent-50 rounded-xl border border-green-200/50"
                >
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-green-500 to-accent-500 rounded-lg flex items-center justify-center"
                    >
                      <i class="pi pi-shopping-bag text-white text-sm"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900 mb-1">Reabastecer estoque</h4>
                      <p class="text-sm text-gray-600">15 produtos estão com estoque baixo</p>
                    </div>
                  </div>
                </div>

                <div
                  class="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200/50"
                >
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center"
                    >
                      <i class="pi pi-bell text-white text-sm"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900 mb-1">Configurar alertas</h4>
                      <p class="text-sm text-gray-600">
                        Para produtos que vencem em menos de 3 dias
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900">Resumo de Performance</h3>
              <div class="flex space-x-2">
                <Button size="small" text severity="secondary">Semana</Button>
                <Button size="small" text>Mês</Button>
                <Button size="small" text severity="secondary">Ano</Button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                class="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <i class="pi pi-trending-up text-white text-2xl"></i>
                </div>
                <h4 class="text-2xl font-bold text-primary-600 mb-2">+25%</h4>
                <p class="text-sm text-gray-600">Aumento nas vendas</p>
              </div>

              <div
                class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <i class="pi pi-check-circle text-white text-2xl"></i>
                </div>
                <h4 class="text-2xl font-bold text-green-600 mb-2">92%</h4>
                <p class="text-sm text-gray-600">Taxa de aproveitamento</p>
              </div>

              <div
                class="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <i class="pi pi-clock text-white text-2xl"></i>
                </div>
                <h4 class="text-2xl font-bold text-orange-600 mb-2">3.2 dias</h4>
                <p class="text-sm text-gray-600">Tempo médio p/ venda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import AppLayout from '@/components/layout/AppLayout.vue'
import ExpirationCharts from '@/components/charts/ExpirationCharts.vue'
</script>
