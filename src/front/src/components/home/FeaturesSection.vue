<template>
  <div id="features" class="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 backdrop-blur-sm mb-6 animate-fade-in">
          <i class="pi pi-sparkles text-primary-600 mr-2"></i>
          <span class="text-sm font-medium text-primary-700">Recursos Poderosos</span>
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
          <span class="block text-gray-900 mb-2">Tudo que você precisa</span>
          <span class="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            para o sucesso
          </span>
        </h2>

        <p class="max-w-3xl mx-auto text-xl text-gray-600 animate-fade-in" style="animation-delay: 0.2s;">
          Nossa plataforma oferece um conjunto completo de ferramentas inteligentes para transformar 
          a gestão do seu negócio e maximizar seus resultados.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div class="group relative animate-fade-in" style="animation-delay: 0.1s;">
          <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-primary-200/50 transform hover:-translate-y-2">
            <div class="relative mb-6">
              <div class="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i class="pi pi-calendar-clock text-white text-2xl"></i>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
              Controle de Validade
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              Monitore automaticamente todas as datas de validade. Receba alertas inteligentes e 
              nunca mais perca produtos por vencimento.
            </p>

            <ul class="space-y-2 text-sm text-gray-500">
              <li class="flex items-center">
                <i class="pi pi-check-circle text-primary-500 mr-2"></i>
                Alertas automáticos personalizáveis
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-primary-500 mr-2"></i>
                Dashboard visual intuitivo
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-primary-500 mr-2"></i>
                Relatórios de tendências
              </li>
            </ul>

            <div class="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-primary-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        <div class="group relative animate-fade-in" style="animation-delay: 0.2s;">
          <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-secondary-200/50 transform hover:-translate-y-2">
            <div class="relative mb-6">
              <div class="absolute inset-0 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i class="pi pi-percentage text-white text-2xl"></i>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
              Precificação Dinâmica
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              Algoritmos inteligentes ajustam preços automaticamente baseados na proximidade do vencimento, 
              maximizando vendas e reduzindo perdas.
            </p>

            <ul class="space-y-2 text-sm text-gray-500">
              <li class="flex items-center">
                <i class="pi pi-check-circle text-secondary-500 mr-2"></i>
                Descontos automáticos inteligentes
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-secondary-500 mr-2"></i>
                Regras personalizáveis
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-secondary-500 mr-2"></i>
                Análise de margem em tempo real
              </li>
            </ul>

            <div class="absolute inset-0 bg-gradient-to-r from-secondary-50/50 to-secondary-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        <div class="group relative animate-fade-in" style="animation-delay: 0.3s;">
          <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-accent-200/50 transform hover:-translate-y-2">
            <div class="relative mb-6">
              <div class="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i class="pi pi-chart-line text-white text-2xl"></i>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
              Relatórios Inteligentes
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              Insights detalhados sobre padrões de venda, sazonalidade e otimização de compras. 
              Tome decisões baseadas em dados reais.
            </p>

            <ul class="space-y-2 text-sm text-gray-500">
              <li class="flex items-center">
                <i class="pi pi-check-circle text-accent-500 mr-2"></i>
                Analytics avançado
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-accent-500 mr-2"></i>
                Previsões de demanda
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-accent-500 mr-2"></i>
                Exportação em múltiplos formatos
              </li>
            </ul>

            <div class="absolute inset-0 bg-gradient-to-r from-accent-50/50 to-accent-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="group relative animate-fade-in" style="animation-delay: 0.4s;">
          <div class="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 hover:border-primary-200/50 transition-all duration-300 hover:shadow-lg">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <i class="pi pi-qrcode text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Códigos de Barra</h4>
                <p class="text-gray-600 text-sm">
                  Escaneamento instantâneo para cadastro e controle de produtos com precisão total.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative animate-fade-in" style="animation-delay: 0.5s;">
          <div class="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 hover:border-secondary-200/50 transition-all duration-300 hover:shadow-lg">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <i class="pi pi-bell text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Notificações Inteligentes</h4>
                <p class="text-gray-600 text-sm">
                  Alertas personalizados por WhatsApp, email ou SMS para nunca perder uma oportunidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative animate-fade-in" style="animation-delay: 0.6s;">
          <div class="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 hover:border-accent-200/50 transition-all duration-300 hover:shadow-lg">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <i class="pi pi-link text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Integrações Nativas</h4>
                <p class="text-gray-600 text-sm">
                  Conecte com seus sistemas existentes através de nossa API robusta e documentada.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative animate-fade-in" style="animation-delay: 0.7s;">
          <div class="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 hover:border-primary-200/50 transition-all duration-300 hover:shadow-lg">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <i class="pi pi-headphones text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Suporte Especializado</h4>
                <p class="text-gray-600 text-sm">
                  Equipe dedicada para garantir que você aproveite ao máximo todas as funcionalidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center animate-fade-in" style="animation-delay: 0.8s;">
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl blur opacity-30"></div>
          <div class="relative bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 class="text-2xl font-bold mb-4">Pronto para transformar seu negócio?</h3>
            <p class="text-primary-100 mb-6 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já reduziram o desperdício e aumentaram os lucros com nossa plataforma.
            </p>
            <Button 
              size="large"
              class="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <i class="pi pi-arrow-right mr-2"></i>
              Experimente Gratuitamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
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
