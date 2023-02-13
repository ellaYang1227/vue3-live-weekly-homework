import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.component("LoadingComponent", Loading);

app.mount("#app");
