<template>
    <div class="agendar-visita container my-5">
      <div class="text-center mb-4">
        <h2 class="title">Agendar una Visita</h2>
      </div>
      <form @submit.prevent="agendarVisita" class="form-container">
        <div class="form-group mb-3">
          <label for="nombre" class="form-label">Nombre Completo:</label>
          <input v-model="nombre" id="nombre" type="text" class="form-control" placeholder="Nombre Completo" required />
        </div>
        <div class="form-group mb-3">
          <label for="correo" class="form-label">Correo Electrónico:</label>
          <input v-model="correo" id="correo" type="email" class="form-control" placeholder="Correo Electrónico" required />
        </div>
        <div class="form-group mb-4">
          <label for="comuna" class="form-label">Comuna:</label>
          <select v-model="comuna" id="comuna" class="form-select" required>
            <option value="">Seleccione una comuna</option>
            <option v-for="com in comunas" :key="com.id" :value="com.comuna">
              {{ com.comuna }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-agendar">Agendar</button>
        </div>
      </form>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        // Variables para los campos del formulario
        const nombre = ref('');
        const correo = ref('');
        const comuna = ref('');

        // Llama a la acción para cargar comunas solo una vez al montar el componente
        onMounted(() => {
            if (store.state.comunas.length === 0) { // Solo carga si las comunas están vacías
                store.dispatch('loadComunas');
            }
        });

        // Obtenemos la lista de comunas de Vuex usando un getter
        const comunas = store.getters.comunas;

        const agendarVisita = () => {
            alert(`Estimado ${nombre.value}, su hora fue agendada exitosamente. Ingrese a su correo: ${correo.value} para descargar la invitación.`);
        };

        return { nombre, correo, comuna, comunas, agendarVisita };
    }
};
</script>

<style scoped>
/* Título de la Página */
.title {
  color: #4caf50;
  font-size: 2.5rem;
  font-weight: bold;
}

/* Estilo del Formulario */
.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Etiquetas del formulario */
.form-label {
  font-weight: bold;
  color: #333;
}

/* Botón de Agendar */
.btn-agendar {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-agendar:hover {
  background-color: #45a049;
}
</style>
