import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, loadLocaleFromURL } from "@vee-validate/i18n";

/* VeeValidate 定義規則 */
Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});

/* 加入多國語系 */
// 讀取外部的資源
loadLocaleFromURL("./assets/zh_TW.json");

// Activate the locale
configure({
    generateMessage: localize("zh_TW"),
    validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
});

import App from "./App.vue";
import router from "./router";

import SweetalertComponent from "./components/SweetalertComponent.vue";
import "./assets/main.scss";

library.add(fas, far, fab);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.component("LoadingComponent", Loading);
app.component("font-awesome-icon", FontAwesomeIcon);

app.component("SweetalertComponent", SweetalertComponent);
app.mount("#app");
