<template>
    <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <font-awesome-icon :icon="['fas', 'paw']" class="brand-icon" />
          <span class="brand-name">Dog Home</span>
        </router-link>
        
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/buscan-hogar">Buscan Hogar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/nuestros-centros">Nuestros Centros</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/agendar-visita">Agendar Visita</router-link>
            </li>
          </ul>
          <!-- Contador de perros en adopción -->
          <span class="navbar-text badge-counter">
            <font-awesome-icon :icon="['fas', 'paw']" />
            {{ dogCount }} en adopcion!!
          </span>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
    const store = useStore();
    // Obtén el conteo directamente desde el estado sin `computed`
    const dogCount = computed(() => store.state.dogCount);
    return { dogCount };
  },
  };
  </script>
  
  <style scoped>
  /* Estilo del navbar */
  .navbar-custom {
    background-color: #ffdd57; /* Color amarillo vibrante */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
  }
  
  .navbar-custom .navbar-brand {
    font-weight: bold;
    color: #333;
  }
  
  .navbar-custom .brand-icon {
    font-size: 1.5rem;
    color: #333;
    margin-right: 10px;
  }
  
  .navbar-custom .brand-name {
    font-size: 1.5rem;
    color: #333;
    font-family: 'Poppins', sans-serif;
  }
  
  .navbar-custom .nav-link {
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .navbar-custom .nav-link:hover {
    color: #4caf50; /* Color verde para el hover */
  }
  
  .navbar-custom .badge-counter {
    background-color: #4caf50; /* Verde llamativo */
    color: white;
    padding: 10px 15px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
  }
  
  .navbar-custom .badge-counter font-awesome-icon {
    margin-right: 5px;
  }
  
  .sticky-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1030;
  }
  </style>
  