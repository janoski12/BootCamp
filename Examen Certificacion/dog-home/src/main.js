import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from  '@fortawesome/fontawesome-svg-core';
import { faPaw }  from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

library.add(faPaw, faFacebook, faTwitter, faInstagram);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(store);
app.mount('#app');