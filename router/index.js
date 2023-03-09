import { createWebHistory, createRouter } from 'vue-router';
import SearchTrip from '../src/views/SearchTrip.vue';
import CreateTrip from '../src/views/CreateTrip.vue';

const routes = [
    {
      path: '/',
      name: 'Search Trip',
      component: SearchTrip,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'Not Found',
      component: '<h1>404 Not Found</h1>',
    },
    {
      path: '/new-trip',
      name: 'Not Found',
      component: CreateTrip,
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  
  export default router;