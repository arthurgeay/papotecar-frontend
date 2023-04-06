import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import store from './store'
import axios from 'axios'

import './style.css'
import 'flowbite'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      store.dispatch('logout')
      return router.push('/login')
    }
  }
})

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'


library.add(faCircleCheck)
library.add(faSpinner)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')
