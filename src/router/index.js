import { createWebHistory, createRouter } from 'vue-router';
import CreateTrip from '../views/CreateTrip.vue';

const routes = [
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