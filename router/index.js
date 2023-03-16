import { createWebHistory, createRouter } from 'vue-router';
import SearchTrip from '../src/views/SearchTrip.vue';
import Login from '../src/views/Login.vue';
import Register from '../src/views/Register.vue';

const routes = [
    {
      path: '/',
      name: 'Search Trip',
      component: SearchTrip,
    },
    {
      path: '/connexion',
      name: 'Login',
      component: Login,
    },
    {
      path: '/inscription',
      name: 'Register',
      component: Register,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'Not Found',
      component: '<h1>404 Not Found</h1>',
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  
  export default router;