import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import store from './store'
import axios from 'axios'
import { Notyf } from 'notyf'

import './style.css'
import 'flowbite'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  duration: 4000,
  position: { x: 'right', y: 'top' },
})

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const isApi = axios.getUri(error.config).includes(axios.defaults.baseURL)

    if (!isApi) {
      notyf.error('Une erreur est survenue. Veuillez réessayer.')
      return Promise.reject(error)
    }

    if (error && error.response.status === 401) {
      await store.commit('setToken', null)
      await store.commit('setUser', null)

      return router.push('/login')
    }

    switch (error.response.status) {
      case 403:
        notyf.error("Vous n'avez pas les droits pour effectuer cette action.")
        router.push('/')
        break
      case 404:
        notyf.error('Une erreur est survenue. Veuillez réessayer')
        break
      default:
        notyf.error('Une erreur est survenue. Veuillez réessayer.')
        break
    }

    return Promise.reject(error)
  }
)

const app = createApp(App)
app.config.globalProperties.$notyf = notyf
app.use(store)
app.use(router)
app.mount('#app')
