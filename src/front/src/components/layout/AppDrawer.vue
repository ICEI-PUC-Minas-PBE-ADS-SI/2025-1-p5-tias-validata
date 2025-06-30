<template>
  <div class="app-drawer-container">
    <div v-if="isMobile && drawerOpen" class="drawer-overlay" @click="closeDrawer"></div>

    <aside
      :class="[
        'app-drawer',
        {
          'drawer-open': drawerOpen,
          'drawer-closed': !drawerOpen,
          'drawer-mobile': isMobile,
          'drawer-desktop': !isMobile,
        },
      ]"
    >
      <div class="drawer-header">
        <div class="flex items-center gap-3">
          <div class="w-40 h-12 flex justify-center items-center overflow-hidden">
            <img
              src="/logo-validata.png"
              alt="Validata Logo"
              class="h-24 object-contain scale-[1.1] mt-8"
            />
          </div>
        </div>
        <Button v-if="isMobile" icon="pi pi-times" text @click="closeDrawer" class="p-1" />
      </div>

      <nav class="drawer-nav">
        <ul class="nav-list">
          <li v-for="item in menuItems" :key="item.route || item.label" class="nav-item">
            <div v-if="item.children" class="nav-group">
              <button
                :class="[
                  'nav-link',
                  'nav-group-header',
                  { 'nav-link-active': isGroupActive(item) },
                ]"
                @click="toggleSubmenu(item)"
              >
                <i :class="item.icon" class="nav-icon"></i>
                <span class="nav-label">{{ item.label }}</span>
                <i
                  :class="['pi', item.expanded ? 'pi-chevron-down' : 'pi-chevron-right']"
                  class="nav-chevron"
                ></i>
              </button>

              <Transition name="submenu">
                <ul v-if="item.expanded" class="submenu-list">
                  <li v-for="child in item.children" :key="child.route" class="submenu-item">
                    <router-link
                      :to="child.route"
                      :class="[
                        'submenu-link',
                        { 'submenu-link-active': $route.name === child.name },
                      ]"
                      @click="handleNavClick"
                    >
                      <i :class="child.icon" class="submenu-icon"></i>
                      <span class="submenu-label">{{ child.label }}</span>
                    </router-link>
                  </li>
                </ul>
              </Transition>
            </div>

            <router-link
              v-else-if="item.route"
              :to="item.route"
              :class="['nav-link', { 'nav-link-active': $route.name === item.name }]"
              @click="handleNavClick"
            >
              <i :class="item.icon" class="nav-icon"></i>
              <span class="nav-label">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'

interface MenuItemChild {
  label: string
  icon: string
  route: string
  name: string
}

interface MenuItem {
  label: string
  icon: string
  route?: string
  name?: string
  children?: MenuItemChild[]
  expanded?: boolean
}

const route = useRoute()
const drawerOpen = ref(false)
const screenWidth = ref(window.innerWidth)

const isMobile = computed(() => screenWidth.value < 768)

const menuItems = ref<MenuItem[]>([
  {
    label: 'Produtos',
    icon: 'pi pi-box',
    route: '/app',
    name: 'app',
  },
  {
    label: 'Estoque',
    icon: 'pi pi-warehouse',
    route: '/stocks',
    name: 'stocks',
  },
  {
    label: 'Dashboard',
    icon: 'pi pi-chart-bar',
    expanded: false,
    children: [
      {
        label: 'Análise de Vencimentos',
        icon: 'pi pi-exclamation-triangle',
        route: '/dashboard/expiring',
        name: 'dashboard-expiring',
      },
      {
        label: 'Análise de Vendas',
        icon: 'pi pi-chart-line',
        route: '/dashboard/sales',
        name: 'dashboard-sales',
      },
    ],
  },
])

const toggleSubmenu = (item: MenuItem) => {
  if (item.children) {
    item.expanded = !item.expanded
  }
}

const isGroupActive = (item: MenuItem): boolean => {
  if (!item.children) return false
  return item.children.some((child) => child.name === route.name)
}

const autoExpandActiveGroup = () => {
  menuItems.value.forEach((item) => {
    if (item.children && isGroupActive(item)) {
      item.expanded = true
    }
  })
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const handleNavClick = () => {
  if (isMobile.value) {
    closeDrawer()
  }
}

const handleResize = () => {
  screenWidth.value = window.innerWidth
  if (!isMobile.value) {
    drawerOpen.value = true
  } else {
    drawerOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  drawerOpen.value = !isMobile.value
  autoExpandActiveGroup()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

defineExpose({
  toggleDrawer: () => {
    drawerOpen.value = !drawerOpen.value
  },
  openDrawer: () => {
    drawerOpen.value = true
  },
  closeDrawer,
})
</script>

<style scoped>
.app-drawer-container {
  position: relative;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.app-drawer {
  height: 100vh;
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.drawer-desktop {
  position: relative;
  box-shadow: none;
  border-right: 1px solid #e5e7eb;
  transform: none !important;
}

.drawer-mobile {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.drawer-mobile.drawer-closed {
  transform: translateX(-100%);
}

.drawer-mobile.drawer-open {
  transform: translateX(0);
}

.drawer-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
}

.drawer-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #dc2626;
}

.nav-link-active {
  background: #fef2f2;
  color: #dc2626;
  border-right: 3px solid #dc2626;
}

.nav-icon {
  font-size: 1.25rem;
  width: 1.25rem;
  text-align: center;
}

.nav-label {
  font-weight: 500;
  font-size: 0.875rem;
}

.nav-group {
  width: 100%;
}

.nav-group-header {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  justify-content: space-between;
}

.nav-chevron {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
  color: #6b7280;
}

.submenu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f9fafb;
  border-left: 2px solid #e5e7eb;
  margin-left: 1.5rem;
}

.submenu-item {
  margin-bottom: 0;
}

.submenu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0;
  font-size: 0.8125rem;
}

.submenu-link:hover {
  background: #f3f4f6;
  color: #dc2626;
}

.submenu-link-active {
  background: #fef2f2;
  color: #dc2626;
  border-right: 3px solid #dc2626;
  font-weight: 500;
}

.submenu-icon {
  font-size: 1rem;
  width: 1rem;
  text-align: center;
}

.submenu-label {
  font-weight: 400;
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}

@media (min-width: 768px) {
  .drawer-overlay {
    display: none;
  }

  .drawer-mobile {
    position: relative !important;
    transform: none !important;
    box-shadow: none !important;
  }
}
</style>
