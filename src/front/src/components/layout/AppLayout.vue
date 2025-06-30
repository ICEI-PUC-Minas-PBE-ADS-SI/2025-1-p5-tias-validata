<template>
  <div class="app-layout">
    <div class="app-header">
      <Button v-if="isMobile" icon="pi pi-bars" text @click="toggleDrawer" class="menu-toggle" />
      <div class="header-content">
        <slot name="header">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </slot>
      </div>
    </div>

    <div class="app-body">
      <AppDrawer ref="drawerRef" />

      <main class="app-main">
        <div class="main-content">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'
import AppDrawer from './AppDrawer.vue'

interface Props {
  pageTitle?: string
}

withDefaults(defineProps<Props>(), {
  pageTitle: 'Validata',
})

const drawerRef = ref<InstanceType<typeof AppDrawer>>()
const screenWidth = ref(window.innerWidth)

const isMobile = computed(() => screenWidth.value < 768)

const toggleDrawer = () => {
  if (drawerRef.value) {
    drawerRef.value.toggleDrawer()
  }
}

const handleResize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f9fafb;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 64px;
}

.menu-toggle {
  padding: 0.5rem;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
  margin: 0;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .app-header {
    padding-left: 1.5rem;
  }
}

@media (max-width: 767px) {
  .main-content {
    padding: 1rem;
  }
}
</style>
