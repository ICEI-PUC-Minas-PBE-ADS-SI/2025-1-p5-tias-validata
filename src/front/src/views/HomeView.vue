<template>
  <n-layout>
    <the-navbar @show-auth="showAuthModal = true" />

    <n-layout-content>
      <hero-section @show-auth="showAuthModal = true" @scroll-to="scrollTo" />

      <features-section />

      <how-it-works-section />

      <div class="bg-primary">
        <div
          class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <h2
            class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-center lg:text-left"
          >
            <span class="block">Pronto para reduzir o desperdício?</span>
            <span class="block text-gray-200 mt-2">Comece hoje mesmo.</span>
          </h2>
          <div
            class="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0 space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <n-button
              type="default"
              size="large"
              class="bg-white w-full sm:w-auto"
              @click="showAuthModal = true"
            >
              Cadastre-se gratuitamente
            </n-button>
            <n-button
              type="default"
              size="large"
              class="bg-white w-full sm:w-auto"
              @click="scrollTo('#how-it-works')"
            >
              Saiba mais
            </n-button>
          </div>
        </div>
      </div>

      <the-footer />
    </n-layout-content>

    <auth-modal v-model:show="showAuthModal" @login="handleLogin" @register="handleRegister" />
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutContent, NButton } from 'naive-ui'
import { useMessage } from 'naive-ui'

// Components
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import AuthModal from '@/components/auth/AuthModal.vue'

const message = useMessage()
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
    message.success('Login realizado com sucesso!')
  } catch {
    message.error('Erro ao realizar login')
  }
}

const handleRegister = async (data: { name: string; email: string; password: string }) => {
  try {
    console.log('Register attempt:', data)
    message.success('Cadastro realizado com sucesso!')
  } catch {
    message.error('Erro ao realizar cadastro')
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  :deep(.n-button) {
    width: 100%;
  }
}
</style>
