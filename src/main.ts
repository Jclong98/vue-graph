import './assets/main.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const app = createApp(App)

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

app.use(router)

app.mount('#app')
