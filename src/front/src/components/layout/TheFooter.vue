<template>
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <n-space vertical>
        <nav class="flex flex-wrap justify-center" aria-label="Footer">
          <n-button
            v-for="item in navigationItems"
            :key="item.href"
            text
            class="px-5 py-2"
            @click="scrollTo(item.href)"
          >
            {{ item.label }}
          </n-button>
        </nav>

        <div class="flex justify-center space-x-6">
          <n-button
            v-for="social in socialLinks"
            :key="social.name"
            text
            circle
            @click="openSocialLink(social.href)"
          >
            <template #icon>
              <n-icon>
                <i :class="social.icon"></i>
              </n-icon>
            </template>
          </n-button>
        </div>

        <p class="text-center text-base text-gray-400">
          &copy; {{ new Date().getFullYear() }} Validata. Todos os direitos reservados.
        </p>
      </n-space>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NSpace, NButton, NIcon } from 'naive-ui'

const navigationItems = [
  { label: 'Recursos', href: '#features' },
  { label: 'Como Funciona', href: '#how-it-works' },
  { label: 'Termos de Uso', href: '#' },
]

const socialLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook', href: '#' },
  { name: 'Instagram', icon: 'fab fa-instagram', href: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', href: '#' },
]

const scrollTo = (id: string) => {
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const openSocialLink = (url: string) => {
  window.open(url, '_blank')
}
</script>
