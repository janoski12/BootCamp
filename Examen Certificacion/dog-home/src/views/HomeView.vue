<template>
    <div class="home">
        <!-- Navbar -->
        <Navbar />

        <!-- Hero Section -->
        <section class="hero-section text-center">
            <div class="hero-overlay"></div>
            <div class="container hero-content">
                <h1 class="hero-title">
                    <font-awesome-icon :icon="['fas', 'paw']" class="paw-icon" /> ¡Bienvenido a Dog Home!
                </h1>
                <p class="hero-subtitle">
                    Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at via ad.
                </p>
                <div class="hero-image-placeholder">
                    <img src="https://via.placeholder.com/400x300" alt="Dog Home Hero" />
                </div>
                <div class="buttons">
                    <router-link to="/buscan-hogar" class="btn btn-primary btn-lg hero-btn">Buscan hogar</router-link>
                    <router-link to="/nuestros-centros" class="btn btn-secondary btn-lg hero-btn">Nuestros centros</router-link>
                </div>
            </div>
        </section>

        
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch('loadDogs');
            store.dispatch('loadCenters');
            store.dispatch('loadComunas');
        });

    },
};
</script>

<style scoped>
/* Fondo con imagen y superposición */
.hero-section {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1556228453-0e6b18eae32b?crop=entropy&fit=crop&w=1920&h=1080&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  border-bottom: 5px solid #f8b400; /* Agrega una línea inferior llamativa */
}

/* Superposición para oscurecer la imagen de fondo */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Oscurecemos la imagen para hacer el texto más legible */
}

/* Contenido del hero */
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

/* Título y subtítulo */
.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in-out;
  color: #ffdd57; /* Amarillo brillante para el título */
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #ffffff;
  animation: fadeIn 2s ease-in-out;
}

/* Imagen de los perros */
.hero-image-placeholder img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  animation: fadeIn 3s ease-in-out;
}

/* Icono de la huella */
.paw-icon {
  font-size: 1.5rem;
  color: #ffdd57;
  margin-right: 10px;
}

/* Botones */
.buttons .hero-btn {
  margin: 0 10px;
  font-size: 1.2rem;
  background-color: #4caf50; /* Verde agradable */
  border-color: #4caf50;
  transition: transform 0.3s, background-color 0.3s;
}

.buttons .hero-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>