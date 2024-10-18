<template>
    <div class="home">
        <h1>Cursos Disponibles</h1>
        <div class="card-container">
            <div v-for="curso in cursos" :key="curso.id" class="card">
                <img :src="curso.img" alt="curso imagen" />
                <h2>{{ curso.nombre }}</h2>
                <p>{{ curso.descripcion }}</p>
                <p>Costo: {{ curso.costo }}</p>
                <p>Duracion: {{ curso.duracion }}</p>
                <p>Inscritos: {{ curso.inscritos }} / {{ curso.cupos }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        cursos() {
            return this.$store.state.cursos;
        }
    }
}
</script>

<style>
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card {
    border: 1px solid #ccc;
    padding: 10px;
    width: 300px;
}
</style>