import { createRouter, createWebHistory } from 'vue-router';
import Home from   '../views/HomeView.vue';
import Admin from '../views/AdminView.vue';
import EditarCurso from '../views/EditarCurso.vue';


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
  },
  {
    path: '/editar/:id',
    name:  'EditarCurso',
    component: EditarCurso
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;