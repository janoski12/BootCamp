<template>
    <div class="admin-container">
        <div class="sidebar">
            <p>Bienvenid@<br>{{ fullName }}</p>
        </div>
        <div class="main-content">
            <h2>Resumen de Tu cuenta</h2>
            <p>Le diste me gusta al juego <strong>{{ game.name }}</strong></p>

            <div class="card">
                <h4>¿Deseas comprar coins para este juego?</h4>
                <button class="btn btn-warning">Agregar Coins</button>
                <p>Cantidad de coins comprados</p>
                <progress value="0" max="100"></progress>
            </div>

            <div class="stats row">
                <div class="col stat-card bg-warning">
                    <p>% de finalizacion de juego</p>
                    <h3>17%</h3>
                </div>
                <div class="col stat-card bg-success">
                    <p>Logros en el juego</p>
                    <h3>166</h3>
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
            game: {},
            fullName: ''
        };
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
</style>