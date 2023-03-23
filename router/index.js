import { createWebHistory, createRouter } from 'vue-router';
import SearchTrip from '../src/views/SearchTrip.vue';
import LoginView from '../src/views/LoginView.vue';
import RegisterView from '../src/views/RegisterView.vue';

const routes = [
    {
      path: '/',
      name: 'Search Trip',
      component: SearchTrip,
    },
    {
      path: '/connexion',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/inscription',
      name: 'RegisterView',
      component: RegisterView,
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