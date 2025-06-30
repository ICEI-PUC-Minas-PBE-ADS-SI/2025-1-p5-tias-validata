<template>
  <footer class="bg-white border-t">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <div class="space-y-8">
        <nav class="flex flex-wrap justify-center" aria-label="Footer">
          <Button
            v-for="item in navigationItems"
            :key="item.href"
            link
            class="px-5 py-2"
            @click="scrollTo(item.href)"
          >
            {{ item.label }}
          </Button>
        </nav>

        <div class="flex justify-center space-x-6">
          <Button
            v-for="social in socialLinks"
            :key="social.name"
            text
            rounded
            :icon="social.icon"
            @click="openSocialLink(social.href)"
          />
        </div>

        <p class="text-center text-base text-gray-400">
          &copy; {{ new Date().getFullYear() }} Validata. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const navigationItems = [
  { label: 'Recursos', href: '#features' },
  { label: 'Como Funciona', href: '#how-it-works' },
  { label: 'Termos de Uso', href: '#' },
]

const socialLinks = [
  { name: 'Facebook', icon: 'pi pi-facebook', href: '#' },
  { name: 'Instagram', icon: 'pi pi-instagram', href: '#' },
  { name: 'Twitter', icon: 'pi pi-twitter', href: '#' },
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
