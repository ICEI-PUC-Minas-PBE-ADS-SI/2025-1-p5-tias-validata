<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden"
  >
    <div class="absolute inset-0">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-200/30 rounded-full blur-3xl animate-float"
        style="animation-delay: -1s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-200/20 rounded-full blur-2xl animate-float"
        style="animation-delay: -2s"
      ></div>
    </div>

    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIzNywgNTksIDI1NSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
        <div class="lg:col-span-6 text-center lg:text-left">
          <div class="animate-fade-in">
            <div
              class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 backdrop-blur-sm mb-6"
            >
              <span class="bg-primary-500 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
              <span class="text-sm font-medium text-primary-700">Solução Inteligente</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span
                class="block bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent leading-tight"
              >
                Reduza o
              </span>
              <span
                class="block bg-gradient-to-r from-secondary-600 via-accent-500 to-primary-500 bg-clip-text text-transparent leading-tight"
              >
                desperdício,
              </span>
              <span class="block text-gray-900 leading-tight"> aumente lucros </span>
            </h1>

            <p class="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none">
              Transforme seu negócio com nossa plataforma de gestão inteligente.
              <span class="font-semibold text-primary-600">Monitore validades</span>,
              <span class="font-semibold text-secondary-600">otimize preços</span> e
              <span class="font-semibold text-accent-600">elimine desperdícios</span>
              automaticamente.
            </p>

            <div
              class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8"
            >
              <Button
                size="large"
                class="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-glow"
                @click="$emit('show-auth')"
              >
                <span class="relative z-10 flex items-center justify-center">
                  <i class="pi pi-rocket mr-2"></i>
                  Comece Gratuitamente
                </span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                ></div>
              </Button>

              <Button
                outlined
                size="large"
                class="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600 font-semibold rounded-2xl backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300"
                @click="$emit('scroll-to', '#features')"
              >
                <i class="pi pi-play mr-2"></i>
                Ver Demo
              </Button>
            </div>

            <div class="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">95%</div>
                <div class="text-sm text-gray-500">Redução Desperdício</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1">30%</div>
                <div class="text-sm text-gray-500">Aumento Lucros</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-accent-600 mb-1">500+</div>
                <div class="text-sm text-gray-500">Clientes Ativos</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 lg:mt-0 lg:col-span-6">
          <div class="relative animate-slide-up">
            <div class="relative mx-auto max-w-lg lg:max-w-none">
              <div
                class="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
              >
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 bg-danger-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-accent-400 rounded-full"></div>
                  </div>
                  <div class="text-sm text-gray-500 font-medium">ValidaTA Dashboard</div>
                </div>

                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div
                      class="bg-gradient-to-br from-primary-100/50 to-primary-200/50 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <div class="text-xs text-primary-700 mb-2">
                        Produtos Próximos do Vencimento
                      </div>
                      <div class="text-2xl font-bold text-primary-800">23</div>
                    </div>
                    <div
                      class="bg-gradient-to-br from-accent-100/50 to-accent-200/50 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <div class="text-xs text-accent-700 mb-2">Economia Mensal</div>
                      <div class="text-2xl font-bold text-accent-800">R$ 2.4k</div>
                    </div>
                  </div>

                  <div class="space-y-3">
                    <div
                      class="flex items-center justify-between bg-white/30 backdrop-blur-sm rounded-lg p-3"
                    >
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg"
                        ></div>
                        <div>
                          <div class="text-sm font-medium text-gray-800">Iogurte Natural</div>
                          <div class="text-xs text-gray-500">Vence em 2 dias</div>
                        </div>
                      </div>
                      <div class="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        20% OFF
                      </div>
                    </div>

                    <div
                      class="flex items-center justify-between bg-white/30 backdrop-blur-sm rounded-lg p-3"
                    >
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg"
                        ></div>
                        <div>
                          <div class="text-sm font-medium text-gray-800">Maçã Gala</div>
                          <div class="text-xs text-gray-500">Vence em 5 dias</div>
                        </div>
                      </div>
                      <div class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        10% OFF
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center shadow-lg animate-float"
              >
                <i class="pi pi-chart-line text-white text-xl"></i>
              </div>

              <div
                class="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full flex items-center justify-center shadow-lg animate-float"
                style="animation-delay: -1.5s"
              >
                <i class="pi pi-dollar text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Image from 'primevue/image'

defineEmits<{
  (e: 'show-auth'): void
  (e: 'scroll-to', section: string): void
}>()
</script>
