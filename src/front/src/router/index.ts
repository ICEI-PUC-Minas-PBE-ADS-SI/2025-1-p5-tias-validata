import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppView from '../views/AppView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/app',
      name: 'app',
      component: AppView,
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          redirect: '/dashboard/expiring',
        },
        {
          path: 'expiring',
          name: 'dashboard-expiring',
          component: () => import('../views/dashboard/ExpiringView.vue'),
        },
        {
          path: 'sales',
          name: 'dashboard-sales',
          component: () => import('../views/dashboard/SalesView.vue'),
        },
      ],
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: () => import('../views/StocksView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
