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

axios.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        const isApi = axios.getUri(error.config).includes(axios.defaults.baseURL)

        if (!isApi) {
            notyf.error('Une erreur est survenue. Veuillez réessayer.')
            return Promise.reject(error)
        }

        switch (error.response.status) {
            case 401:
                store.dispatch('logout')
                router.push('/login')
                break
            case 403:
                notyf.error("Vous n'avez pas les droits pour effectuer cette action.")
                router.push('/workspaces')
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

axios.defaults.baseURL =
    import.meta.env.VITE_BASE_URL

axios.interceptors.response.use(undefined, async function(error) {
    if (error) {
        if (error.response.status === 401) {
            await store.commit('setToken', null)
            await store.commit('setUser', null)

            return router.push('/login')
        }
    }
})

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


library.add(faCircleCheck)
library.add(faSpinner)

const app = createApp(App)
app.config.globalProperties.$notyf = notyf
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')