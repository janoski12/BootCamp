<template>
    <div class="not-found text-center mt-5">
        <h1 class="display-3">404</h1>
        <p class="lead">Lo sentimos, la pagina que buscas no existe.</p>
        <router-link to="/" class="btn btn-primary mt-3">Volver al Inicio</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound',

};
</script>

<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
}
</style>