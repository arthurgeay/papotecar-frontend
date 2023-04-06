import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import store from './store'
import axios from 'axios'

import './style.css'
import 'flowbite'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.response.use(undefined, async function (error) {
  if (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await store.dispatch('logout')
      return router.push('/login')
    }
  }
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
