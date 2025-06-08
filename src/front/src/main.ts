import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

import { themeOverrides } from './theme/theme'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

app.provide('themeOverrides', themeOverrides)

app.mount('#app')
