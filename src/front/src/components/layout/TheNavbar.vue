<template>
  <header class="bg-white shadow-md border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <img
              src="/logo-validata.png"
              alt="Validata Logo"
              class="h-12 object-contain ml-2 mt-4 scale-[2]"
            />
          </div>
        </div>

        <div class="hidden md:flex md:items-center md:space-x-4">
          <Menubar
            :model="menuItems as MenuItem[]"
            class="border-0 bg-transparent menubar-padding"
          />
          <Button label="Entrar / Cadastrar" @click="showAuthModal = true" size="small" />
        </div>

        <div class="md:hidden flex items-center">
          <Button icon="pi pi-bars" text @click="mobileMenuOpen = !mobileMenuOpen" size="small" />
        </div>
      </div>
    </div>

    <Drawer
      v-model:visible="mobileMenuOpen"
      position="right"
      :style="{ width: '300px' }"
      header="Menu"
    >
      <div class="flex flex-col gap-2">
        <Button
          v-for="item in menuItems"
          :key="item.label"
          :label="item.label"
          :icon="item.icon"
          text
          class="justify-start"
          @click="item.command"
        />
        <Divider />
        <Button label="Entrar / Cadastrar" @click="handleAuthClick" size="small" />
      </div>
    </Drawer>

    <auth-modal v-model:show="showAuthModal" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import Drawer from 'primevue/drawer'
import Divider from 'primevue/divider'
import type { MenuItem } from 'primevue/menuitem'

interface CustomMenuItem {
  label: string
  icon: string
  command: () => void
}
import AuthModal from '@/components/auth/AuthModal.vue'

const mobileMenuOpen = ref(false)
const showAuthModal = ref(false)

const handleAuthClick = () => {
  showAuthModal.value = true
  mobileMenuOpen.value = false
}

const menuItems: CustomMenuItem[] = [
  {
    label: 'Recursos',
    icon: 'pi pi-star',
    command: () => handleMenuClick('#features'),
  },
  {
    label: 'Como Funciona',
    icon: 'pi pi-info-circle',
    command: () => handleMenuClick('#how-it-works'),
  },
]

const handleMenuClick = (id: string) => {
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.menubar-padding {
  padding: 2px 0.5rem !important;
}
</style>
