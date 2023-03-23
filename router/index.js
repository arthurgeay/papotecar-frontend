import { createWebHistory, createRouter } from 'vue-router';
import SearchTrip from '../src/views/SearchTrip.vue';
import LoginView from '../src/views/LoginView.vue';
import RegisterView from '../src/views/RegisterView.vue';
import CreateTrip from '../src/views/CreateTrip.vue';

const routes = [
    {
      path: '/',
      name: 'Search Trip',
      component: SearchTrip,
    },
    {
      path: '/connexion',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/inscription',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'Not Found',
      component: '<h1>404 Not Found</h1>',
    },
    {
      path: '/new-trip',
      name: 'New trip',
      component: CreateTrip,
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  
  export default router;