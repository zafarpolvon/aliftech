import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import './assets/css/main.css';
const app = createApp(App)

import vSelect from 'vue-select'
app.component('v-select', vSelect)




app.use(router)
app.use(store)
app.mount('#app')

