<template>
  <footer>
    <div class="footer-custom">
      <div class="container text-center">
        <div class="footer-content">
          <div class="footer-logo">
            <font-awesome-icon :icon="['fas', 'paw']" class="footer-icon" />
            <span class="brand-name">Dog Home</span>
          </div>
          <p class="footer-text">© 2024 Dog Home. Todos los derechos reservados.</p>
          <div class="social-links">
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-custom {
  background-color: #ffdd57;
  padding: 20px 0;
  border-top: 3px solid #4caf50;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.footer-logo .footer-icon {
  font-size: 1.5rem;
  color: #333;
  margin-right: 10px;
}

.footer-text {
  color: #333;
  font-size: 1rem;
  margin-bottom: 15px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  color: #333;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #4caf50;
}
</style>