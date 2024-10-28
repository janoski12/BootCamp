<template>
    <div class="centros-adopcion">
      <!-- Título de la página -->
      <div class="container text-center my-4">
        <h2 class="title">Centros de Adopción</h2>
      </div>
  
      <!-- Tabla de Centros de Adopción -->
      <div class="container">
        <table class="table table-hover table-bordered">
          <thead class="table-header">
            <tr>
              <th>Centro</th>
              <th>Región</th>
              <th>Comuna</th>
              <th>Dirección</th>
              <th>En Adopción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="center in centers" :key="center.id" class="table-row">
              <td>{{ center.id }}</td>
              <td>{{ center.region }}</td>
              <td>{{ center.comuna }}</td>
              <td>{{ center.direccion }}</td>
              <td>{{ center.en_adopcion }}</td>
              <td>
                <button class="btn btn-agendar" @click="$router.push('/agendar-visita')">Agendar Visita</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const centers = computed(() => store.state.centers);
        return { centers };
    },
};
</script>


<style scoped>
/* Título de la Página */
.title {
  color: #4caf50; /* Verde consistente */
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Tabla de Centros de Adopción */
.table {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.table-hover tbody tr:hover {
  background-color: #fffbeb;
}

.table-header {
  background-color: #ffdd57; /* Amarillo vibrante */
  color: #333;
  font-weight: bold;
}

.table-row td {
  padding: 15px;
  color: #333;
}

/* Botón de Agendar */
.btn-agendar {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-agendar:hover {
  background-color: #45a049;
}
</style>