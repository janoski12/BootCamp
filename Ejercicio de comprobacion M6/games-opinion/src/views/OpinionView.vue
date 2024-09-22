<template>
    <div>
      <h1>Opiniones sobre {{ game.name }}</h1>
      <p v-if="opinions.length === 0">No hay opiniones para este juego.</p>
      <div v-else>
        <div v-for="opinion in opinions" :key="opinion.id">
          <p>{{ opinion.author }}: {{ opinion.text }}</p>
          <button @click="prepareEditOpinion(opinion)">Editar</button>
          <button @click="deleteOpinion(opinion.id)">Eliminar</button>
        </div>
      </div>
  
      <!-- Formulario para agregar o editar una opinión -->
      <input v-model="newOpinion" placeholder="Deja tu opinión" />
      <button @click="isEditing ? updateOpinion() : addOpinion()">
        {{ isEditing ? "Actualizar Opinión" : "Agregar Opinión" }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        game: {},
        opinions: [],
        newOpinion: '',
        isEditing: false,   // Flag para identificar si estamos editando una opinión
        opinionToEdit: null // Almacena la opinión que se está editando
      };
    },
    mounted() {
      // Cargar juego específico y opiniones
      const gameId = this.$route.params.gameId;
      this.game = { id: gameId, name: "Nombre del Juego" }; 
      this.opinions = [
        { id: 1, text: "Gran juego!", author: "Usuario1" },
        { id: 2, text: "No me gustó tanto.", author: "Usuario2" }
      ]; // Lista de opiniones simulada
    },
    methods: {
      addOpinion() {
        if (this.newOpinion) {
          this.opinions.push({
            id: Date.now(),
            text: this.newOpinion,
            author: "Usuario",
          });
          this.newOpinion = '';
        }
      },
  
      // Prepara la opinión para ser editada
      prepareEditOpinion(opinion) {
        this.isEditing = true;
        this.newOpinion = opinion.text;
        this.opinionToEdit = opinion; // Guarda la opinión actual para editarla
      },
  
      // Lógica para actualizar una opinión
      updateOpinion() {
        if (this.newOpinion && this.opinionToEdit) {
          this.opinionToEdit.text = this.newOpinion; // Actualiza el texto de la opinión
          this.isEditing = false;
          this.newOpinion = ''; // Limpia el campo de texto
          this.opinionToEdit = null; // Limpia la opinión a editar
        }
      },
  
      deleteOpinion(id) {
        this.opinions = this.opinions.filter(op => op.id !== id);
      }
    }
  };
  </script>
  