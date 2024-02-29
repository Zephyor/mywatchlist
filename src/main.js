import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const options = {};

app.use(createPinia());
app.use(Toast, options);
app.use(router);

app.mount('#app');
