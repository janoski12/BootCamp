import { createRouter, createWebHistory } from 'vue-router';
import Home from   '../views/HomeView.vue';
import Admin from '../views/AdminView.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component:  Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component:  Admin
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;