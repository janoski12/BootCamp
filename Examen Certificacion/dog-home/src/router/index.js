import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import BuscanHogar from '../views/BuscanHogar.vue';
import NuestrosCentros from '../views/NuestrosCentros.vue';
import AgendarVisita from '../views/AgendarVisita.vue';


const routes = [
    {
        path: '/',
        name:  'Home',
        component: Home
    },
    {
        path: '/buscan-hogar',
        name: 'BuscanHogar',
        component: BuscanHogar
    },
    {
        path: '/nuestros-centros',
        name: 'NuestrosCentros',
        component: NuestrosCentros
    },
    {
        path: '/agendar-visita',
        name: 'AgendarVisita',
        component: AgendarVisita
    },
    {
        path: '/:catchAll(.*)*',
        redirect: '/404'
    }
];

const  router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


export default router;