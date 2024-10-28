<template>
    <div class="buscan-hogar">
  
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container text-center">
          <h1 class="hero-title">Perros en Adopción</h1>
          <p class="hero-subtitle">
            ¡Encuentra a tu nuevo amigo! Explora los perros disponibles para adopción y ayúdanos a darles un hogar.
          </p>
        </div>
      </section>
  
      <!-- Sección de Filtros -->
      <div class="filters container my-4">
        <div class="row">
          <!-- Filtro por ID de Centro -->
          <div class="filter col-md-5 mb-3">
            <label for="idCentro">ID Centro:</label>
            <input type="number" class="form-control" v-model="idCentro" placeholder="ID Centro" />
          </div>
  
          <!-- Filtro por Comuna -->
          <div class="filter col-md-5 mb-3">
            <label for="comuna">Comuna:</label>
            <select v-model="selectedComuna" class="form-control">
              <option value="">Todas</option>
              <option v-for="comuna in comunas" :key="comuna.id" :value="comuna.comuna">
                {{ comuna.comuna }}
              </option>
            </select>
          </div>
  
          <!-- Botones de buscar y limpiar -->
          <div class="col-md-2 d-flex align-items-center">
            <button class="btn btn-primary me-2" @click="filtrarPerros">Buscar</button>
            <button class="btn btn-secondary" @click="limpiarFiltros">Limpiar</button>
          </div>
        </div>
      </div>
  
      <!-- Listado de Perros en Adopción -->
      <section class="dogs-section">
        <div class="container">
          <div class="row">
            <div v-if="filteredDogs && filteredDogs.length > 0" class="card-container d-flex flex-wrap justify-content-center">
              <div v-for="dog in filteredDogs" :key="dog.nombre" class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card dog-card">
                <img :src="dog.imagen" alt="Dog Image" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">Nombre: {{ dog.nombre }}</h5>
                  <p class="card-text">Centro: {{ dog.centro }}</p>
                  <p class="card-text">Comuna: {{ dog.comuna }}</p>
                  <p class="card-text">Raza: {{ dog.raza }}</p>
                  <p class="card-text">Tamaño: {{ dog.tamaño }}</p>
                  <p class="card-text">Edad: {{ dog.edad }} años</p>
                </div>
              </div>
              </div>
            </div>
            <div v-else>
              <p class="text-center">No hay perros disponibles para adopción con los filtros seleccionados.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        // Variables para filtros
        const idCentro = ref('');
        const selectedComuna = ref('');

        // Llama a la acción para cargar los datos de perros y comunas al montar el componente
        onMounted(() => {
            store.dispatch('loadDogs');
            store.dispatch('loadComunas');
        });

        // Acceder a los perros y comunas desde el estado de Vuex
        const dogs = computed(() => store.getters.dogs);
        const comunas = computed(() => store.state.comunas);

        // Aplicar filtros sobre la lista de perros
        const filteredDogs = computed(() => {
            return dogs.value.filter(dog => {
                const matchesCentro = idCentro.value ? dog.centro == idCentro.value : true;
                const matchesComuna = selectedComuna.value ? dog.comuna === selectedComuna.value : true;
                return matchesCentro && matchesComuna;
            });
        });

        // Función para aplicar los filtros
        const filtrarPerros = () => {
            // Los filtros se aplican automáticamente a través del computed `filteredDogs`
        };

        // Función para limpiar los filtros
        const limpiarFiltros = () => {
            idCentro.value = '';
            selectedComuna.value = '';
        };

        return { idCentro, selectedComuna, dogs, comunas, filteredDogs, filtrarPerros, limpiarFiltros };
    }
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background-color: #ffdd57;
  padding: 50px 0;
  color: #333;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-top: 10px;
}

/* Filtros */
.filters .filter label {
  font-weight: bold;
}

.filters button {
  width: 100px;
}

/* Estilo de las Tarjetas de Perros */
.dog-card {
  width: 300px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.dog-card:hover {
  transform: scale(1.05);
}

.dog-card img {
  border-radius: 15px 15px 0 0;
  height: 200px;
  object-fit: cover;
}

.dog-card .card-body {
  text-align: left;
}

.dog-card .card-title {
  font-weight: bold;
  color: #333;
}

.dog-card .card-text {
  color: #666;
}

.dogs-section {
  padding: 40px 0;
}

.text-center {
  text-align: center;
}
</style>
