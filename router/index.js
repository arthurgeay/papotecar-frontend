import { createWebHistory, createRouter } from 'vue-router';
import SearchTrip from '../src/views/SearchTrip.vue';
import UpdateTrip from '../src/views/UpdateTrip.vue'

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
      path: '/my-trips/:id',
      name: 'Update Trip',
      component: UpdateTrip
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  
  export default router;