import { createStore } from "vuex";

export default createStore({
    state: {
        dogs: [],
        dogCount: 0,
        centers: [],
        comunas: [],
    },
    mutations: {
        setDogs(state, dogs) { state.dogs = dogs; state.dogCount =  dogs.length; },
        setCenters(state, centers) { state.centers = centers; },
        setComunas(state, comunas) { state.comunas = comunas; },
    },
    actions: {
        loadDogs({ commit }){
            fetch('/data/buscan_hogar.json')
                .then(res => res.json())
                .then(data => commit('setDogs', data))
                .catch(err => console.error('Error cargando los datos de perros:', err));
        },
        loadCenters({ commit }){
            fetch('/data/centros.json')
                .then(res => res.json())
                .then(data => commit('setCenters', data))
                .catch(err => console.error('Error cargando los datos de centros:', err));
        },
        loadComunas({ commit }){
            fetch('/data/comunas.json')
                .then(res => res.json())
                .then(data => commit('setComunas', data))
                .catch(err => console.error('Error cargando los datos de comunas:', err));
        },
    },
    getters: {
        dogs: state => state.dogs,
        dogCount: state =>  state.dogCount,
        comunas:  state => state.comunas
    },
});