import { defineStore } from "pinia";
import router from "../router/index.js";
const { VITE_API_PATH } = import.meta.env;

export const AuthStore = defineStore("AuthStore", {
    state: () => ({}),
    getters: {},
    actions: {
        logout() {
            this.removeToken();
            router.push("/login");
        },
        getToken() {
            return document.cookie.replace(/(?:(?:^|.*;\s*)ella-diving-token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        },
        removeToken() {
            document.cookie = `${VITE_API_PATH}-token=${this.getToken()}; max-age=0`;
        }
    }
});
