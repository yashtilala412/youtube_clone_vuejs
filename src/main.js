// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import our base CSS for layout
import './assets/base.css'; // <--- This line is key for the CSS to apply

const app = createApp(App);
app.use(router);
app.mount('#app');