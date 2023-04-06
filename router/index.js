import { createWebHistory, createRouter } from 'vue-router'
import SearchTrip from '../src/views/SearchTrip.vue'
import LoginView from '../src/views/LoginView.vue'
import RegisterView from '../src/views/RegisterView.vue'
import CreateTrip from '../src/views/CreateTrip.vue'
import MessagesView from '../src/views/MessagesView.vue'
import store from '../src/store'

const routes = [{
        path: '/',
        name: 'Search Trip',
        component: SearchTrip,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            guest: true,
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: {
            guest: true,
        },
    },
    {
        path: '/messages/:id',
        name: 'MessagesView',
        component: MessagesView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/new-trip',
        name: 'New trip',
        component: CreateTrip,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:catchAll(.*)*',
        name: 'Not Found',
        component: '<h1>404 Not Found</h1>',
    },
]

const router = createRouter({
    history: createWebHistory(),
    base: import.meta.env.VITE_BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next('/')
            return
        }
        next()
    } else {
        next()
    }
})

export default router