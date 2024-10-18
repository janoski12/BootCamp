<template>
    <div id="app">
      <v-app>
        <v-app-bar app color="purple" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
        </v-app-bar>
  
        <v-main>
          <router-view /> <!-- Aquí se mostrará HomeView.vue -->
        </v-main>
      </v-app>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
  }
  </style>
  