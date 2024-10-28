<template>
    <div id="app">
        <AppNavbar />
        <router-view />
        <AppFooter />
    </div>
</template>

<script>
import { onMounted } from 'vue';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from  './components/AppFooter.vue';
import { useStore } from 'vuex';


export default {
    name: 'App',
    components: {
        AppNavbar,
        AppFooter,
    },

    setup() {
    const store = useStore();

    // Cargar perros solo una vez al iniciar la aplicación
    onMounted(() => {
      if (store.state.dogs.length === 0) {
        store.dispatch('loadDogs');
      }
    });

    return {};
  }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>