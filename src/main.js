import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import store from './store'
import axios from 'axios';

import './style.css'
import 'flowbite'

axios.defaults.baseURL = 'https://papotecar-backend.onrender.com/';

// Vue.config.productionTip = false
// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
