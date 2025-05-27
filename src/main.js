// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import our base CSS for layout
import './assets/base.css'; // <--- Ensure this is present and correct

const app = createApp(App);
app.use(router);
app.mount('#app');