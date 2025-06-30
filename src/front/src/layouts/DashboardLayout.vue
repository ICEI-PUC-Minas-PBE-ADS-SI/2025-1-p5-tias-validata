<template>
  <AppLayout :page-title="pageTitle">
    <div class="dashboard-layout">
      <Card class="mb-6">
        <template #content>
          <div class="dashboard-nav">
            <div
              class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div>
                <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p class="text-gray-600 text-sm">Análises e métricas do seu negócio</p>
              </div>

              <div class="flex gap-2 w-full sm:w-auto">
                <router-link
                  v-for="tab in dashboardTabs"
                  :key="tab.name"
                  :to="{ name: tab.name }"
                  class="dashboard-tab"
                  :class="{ active: isActiveTab(tab.name) }"
                >
                  <i :class="tab.icon" class="mr-2"></i>
                  <span class="hidden sm:inline">{{ tab.label }}</span>
                  <span class="sm:hidden">{{ tab.shortLabel }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <div class="dashboard-content">
        <router-view />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Card from 'primevue/card'
import AppLayout from '@/components/layout/AppLayout.vue'

interface DashboardTab {
  name: string
  label: string
  shortLabel: string
  icon: string
}

const route = useRoute()

const dashboardTabs: DashboardTab[] = [
  {
    name: 'dashboard-expiring',
    label: 'Análise de Vencimentos',
    shortLabel: 'Vencimentos',
    icon: 'pi pi-exclamation-triangle',
  },
  {
    name: 'dashboard-sales',
    label: 'Análise de Vendas',
    shortLabel: 'Vendas',
    icon: 'pi pi-chart-line',
  },
]

const pageTitle = computed(() => {
  const currentTab = dashboardTabs.find((tab) => tab.name === route.name)
  return currentTab ? `Dashboard - ${currentTab.label}` : 'Dashboard'
})

const isActiveTab = (tabName: string): boolean => {
  return route.name === tabName
}
</script>

<style scoped>
.dashboard-layout {
  width: 100%;
}

.dashboard-nav {
  width: 100%;
}

.dashboard-tab {
  @apply flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium;
  @apply border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50;
  @apply flex-1 sm:flex-none justify-center sm:justify-start;
  text-decoration: none;
  min-height: 44px;
}

.dashboard-tab.active {
  @apply border-red-500 text-red-700 bg-red-50;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
}

.dashboard-tab:hover.active {
  @apply border-red-600 text-red-800 bg-red-100;
}

.dashboard-content {
  min-height: 400px;
}

@media (max-width: 640px) {
  .dashboard-tab {
    font-size: 0.875rem;
    padding: 0.625rem 1rem;
  }
}
</style>
