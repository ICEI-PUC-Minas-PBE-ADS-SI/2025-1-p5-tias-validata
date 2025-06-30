<template>
  <div class="min-h-screen bg-white">
    <the-navbar @show-auth="showAuthModal = true" />

    <main>
      <hero-section @show-auth="showAuthModal = true" @scroll-to="scrollTo" />

      <features-section />

      <how-it-works-section />

      <div
        class="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 overflow-hidden"
      >
        <div class="absolute inset-0">
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div
          class="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <div class="text-center lg:text-left">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              <span class="block">Pronto para transformar</span>
              <span class="block text-white/90 mt-2 hover:!text-white">seu negócio?</span>
            </h2>
            <p class="text-lg text-white/80 max-w-2xl">
              Junte-se a centenas de empresas que já reduziram desperdícios e aumentaram lucros.
            </p>
          </div>

          <div
            class="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0 space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              size="large"
              class="px-8 py-4 !bg-white !text-primary-600 hover:!bg-gray-50 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 !border-none"
              @click="showAuthModal = true"
            >
              <i class="pi pi-rocket mr-2"></i>
              Começar Gratuitamente
            </Button>

            <Button
              outlined
              size="large"
              class="px-8 py-4 !border-2 !border-white/30 !text-white hover:!bg-white/10 hover:!border-white hover:!text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300"
              @click="scrollTo('#features')"
            >
              <i class="pi pi-info-circle mr-2"></i>
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>

      <the-footer />
    </main>

    <auth-modal v-model:show="showAuthModal" @login="handleLogin" @register="handleRegister" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import AuthModal from '@/components/auth/AuthModal.vue'

const toast = useToast()
const showAuthModal = ref(false)

const scrollTo = (id: string) => {
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleLogin = async (credentials: { email: string; password: string }) => {
  try {
    console.log('Login attempt:', credentials)
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
      life: 3000,
    })
  } catch {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar login', life: 5000 })
  }
}

const handleRegister = async (data: { name: string; email: string; password: string }) => {
  try {
    console.log('Register attempt:', data)
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Cadastro realizado com sucesso!',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao realizar cadastro',
      life: 5000,
    })
  }
}
</script>
