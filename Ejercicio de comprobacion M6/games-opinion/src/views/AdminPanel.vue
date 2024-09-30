<template>
    <div class="admin-container">
        <div class="sidebar">
            <p>Bienvenid@<br>{{ fullName }}</p>
        </div>
        <div class="main-content">
            <h2>Resumen de Tu cuenta</h2>
            <p v-if="likedGame">Le diste me gusta al juego <strong>{{ likedGame.name }}</strong></p>

            <div class="card">
                <h4>¿Deseas comprar coins para este juego?</h4>
                <button class="btn btn-warning" @click="addCoins" :disabled="coins >= maxCoins">Agregar Coins</button>
                <p v-if="coins >= maxCoins" class="text-danger">Llegaste al maximo de tu credito</p>
                <p>Cantidad de coins comprados: {{ coins }}</p>
                <div class="progress">
                    <div
                        class="progress-bar"
                        :class="progressBarClass"
                        role="progressbar"
                        :style="{ width: progressPercentage + '%' }">
                        {{ progressPercentage }}
                    </div>
                </div>
            </div>

            <div class="stats row">
                <div class="col stat-card bg-warning">
                    <p>% de finalizacion de juego</p>
                    <h3>17%</h3>
                </div>
                <div class="col stat-card bg-success">
                    <p>Logros en el juego</p>
                    <h3>{{ achievements.length }}</h3>
                </div>
                <div class="col stat-card bg-info">
                    <p>Recompensas</p>
                    <h3>200</h3>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'AdminPanel',
    data() {
        return {
            fullName: '',
            likedGame: null,
            achievements: [],
            coins: 0,
            maxCoins: 50
        };
    },
    computed: {
        progressPercentage() {
            return (this.coins / this.maxCoins) * 100;
        },
        progressBarClass() {
            if (this.progressPercentage <= 33) {
                return "bg-success";
            } else if (this.progressPercentage <= 66) {
                return "bg-warning";
            } else {
                return "bg-danger";
            }
        }
    },
    mounted() {
        const firstName = prompt("Ingrese su nombre:");
        const lastName = prompt("Ingrese su apellido:");

        if (!firstName || !lastName) {
            alert("Debe ingresar ambos valores.");
            this.$router.push('/');
        } else {
            this.fullName = `${firstName} ${lastName}`;
        }

        // Llamada a la API para obtener el juego al que el usuario le dio "me gusta"
        fetch('https://api.rawg.io/api/games?key=8ec9709e7dc945178492aaa508b29fdf')
            .then(response => response.json())
            .then(data => {
                // Aquí simulo que el usuario selecciona el primer juego en la lista.
                // Puedes cambiar la lógica para que el usuario seleccione el juego.
                this.likedGame = data.results[0];  // Cambia esto por la lógica que necesites
                this.fetchAchievements(this.likedGame.id);
            })
            .catch(error => {
                console.error("Error al cargar los juegos:", error);
            });
    },
    methods: {
        fetchAchievements(gameId) {
            // Llamada a la API para obtener los logros del juego
            fetch(`https://api.rawg.io/api/games/${gameId}/achievements?key=8ec9709e7dc945178492aaa508b29fdf`)
              .then(response => response.json())
              .then(data => {
                  this.achievements = data.results; // Guardamos los logros en el estado
              })
              .catch(error => {
                  console.error("Error al cargar los logros:", error);
              });
        },
        addCoins() {
            if (this.coins < this.maxCoins) {
                this.coins += 10;
            }
        }
    }
};
</script>

<style scoped>
.admin-container {
    display: flex;
    flex-direction: row;
}

.sidebar {
    width: 200px;
    background-color: #343a40;
    color: white;
    padding: 20px;
}

.main-content {
    flex: 1;
    padding: 20px;
}

.card {
    margin: 20px 0;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
}

.stats {
    display: flex;
    justify-content: space-between;
}

.stat-card {
    flex: 1;
    text-align: center;
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    color: white;
}

.progress {
    height: 25px;
    margin-top: 10px;
    background-color: #e9ecef;
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    color: white;
    text-align: center;
    line-height: 25px;
}

.bg-success {
    background-color: #28a745 !important;
}

.bg-warning {
    background-color: #ffc107 !important;
}

.bg-danger {
    background-color: #dc3545 !important;
}
</style>