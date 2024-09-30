<template>
  <div class="container">
    <h1 class="text-center my-4">Lista de Juegos Disponibles</h1>

    <div class="row">
      <div class="col-md-4" v-for="game in games" :key="game.id">
        <div class="card mb-4">
          <img :src="game.background_image" class="card-img-top" alt="Imagen del juego" v-if="game.background_image">
          <div class="card-body">
            <h5 class="card-title">{{ game.name }}</h5>
            <p class="card-text">
              Rating: {{ game.rating }}<br>
              Released: {{ game.released }}<br>
              Update: {{ game.updated }}
            </p>
            <router-link :to="{ name: 'Opinions', params: { gameId: game.id } }" class="btn btn-primary">Opinar</router-link>
            <button class="btn btn-light" @click="goToAdminPanel">
              <i class="fa fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      games: []
    };
  },
  mounted() {
    fetch('https://api.rawg.io/api/games?key=8ec9709e7dc945178492aaa508b29fdf')
      .then(response => response.json())
      .then(data => {
        this.games = data.results;
      });
  },
  methods: {
    goToAdminPanel() {
      this.$router.push('/admin/');
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.card {
  position: relative;
}
.card .btn-light {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  border: none;
}
.card .btn-light .fa-heart {
  color: red;
}
</style>
