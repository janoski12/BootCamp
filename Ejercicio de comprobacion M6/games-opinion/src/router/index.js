import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OpinionView from '../views/OpinionView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/opinions/gameId', 
    name: 'Opinions', 
    component: OpinionView 
  },
  { path: '/:catchAll(.*)', 
    name: 'NotFound', 
    component: () => import('../views/NotFound.vue') 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
