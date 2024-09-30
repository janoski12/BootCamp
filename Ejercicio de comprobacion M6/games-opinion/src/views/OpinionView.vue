<template>
  <div class="container mt-4">

    <h2 class="text-center">Escribe tu opinión para el juego: {{ game.name }}</h2>

    <div class="card p-4 mb-4">
      <div class="mb-3">
        <label for="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          class="form-control"
          v-model="author"
          placeholder="nombre"
        />
      </div>

      <div class="mb-3">
        <label for="opinion" class="form-label">Opinion</label>
        <textarea 
          id="opnion"
          class="form-control"
          v-model="newOpinion"
          placeholder="Tu opinon debe ir aqui"
          rows="3"
        ></textarea>
      </div>

      <button 
        class="btn btn-primary"
        @click="isEditing ? updateOpinion() : addOpinion()"
        >
          {{ isEditing ? "Actualizar" : "Agregar" }}
      </button>
    </div>

    <h3 class="text-center">A continuación podras ver tus opiniones</h3>

    <div v-for="opinion in opinions" :key="opinion.id" class="card mb-2">
      <div class="card-header">
        Opinion creada por: <strong>{{ opinion.author }}</strong>
      </div>
      <div class="card-body">
        <p class="card-text"><strong>Opinion:</strong>{{ opinion.text }}</p>
        <button
          class="btn btn-danger me-2"
          @click="deleteOpinion(opinion.id)"
          >
            Eliminar
        </button>
        <button
          class="btn btn-warning"
          @click="preparEditOpinion(opinion)"
          >
            Editar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: {},
      opinions: [],
      newOpinion: '',
      author: '',
      isEditing: false,
      opinionToEdit: null,
    };
  },
  mounted() {
    // Obtener el ID del juego desde la URL
    const gameId = this.$route.params.gameId;
    
    // Hacer una solicitud a la API para obtener la información del juego
    fetch(`https://api.rawg.io/api/games/${gameId}?key=8ec9709e7dc945178492aaa508b29fdf`)
      .then(response => response.json())
      .then(data => {
        this.game = data; // Guardar los datos del juego en el estado
      })
      .catch(error => {
        console.error("Error al obtener el juego:", error);
      });
  },
  methods: {
    addOpinion() {
      if (this.newOpinion && this.author) {
        this.opinions.push({
          id: Date.now(),
          text: this.newOpinion,
          author: this.author,
        });
        this.newOpinion = '';
        this.author = '';
      }
    },
    preparEditOpinion(opinion) {
      this.isEditing = true;
      this.newOpinion = opinion.text;
      this.author = opinion.author;
      this.opinionToEdit = opinion;
    },
    updateOpinion() {
      if (this.newOpinion && this.opinionToEdit) {
        this.opinionToEdit.text = this.newOpinion;
        this.opinionToEdit.author = this.author;
        this.isEditing = false;
        this.newOpinion = '';
        this.author = '';
        this.opinionToEdit = null;
      }
    },
    deleteOpinion(id) {
      this.opinions = this.opinions.filter(op => op.id !== id);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
  