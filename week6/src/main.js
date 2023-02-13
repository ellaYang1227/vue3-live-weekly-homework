import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App.vue";
import router from "./router";

import SweetalertComponent from "./components/SweetalertComponent.vue";
import "./assets/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.component("LoadingComponent", Loading);

app.component("SweetalertComponent", SweetalertComponent);
app.mount("#app");
