<template>
    <div class="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  .not-found h1 {
    font-size: 3em;
    color: #ff4c4c;
  }
  
  .not-found p {
    font-size: 1.2em;
    color: #666;
  }
  
  .not-found a {
    color: #42b983;
    text-decoration: none;
    font-size: 1.1em;
  }
  </style>
  