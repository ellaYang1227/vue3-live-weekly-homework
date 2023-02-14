<script>
import axios from "axios";
import { RouterView } from "vue-router";
import NavbarComponent from "../components/NavbarComponent.vue";
import { showSwal } from "../data/Sweetalert2-options.js";
import { AuthStore } from "../stores/AuthStore.js";
import { LoadingStore } from "../stores/LoadingStore.js";
const { VITE_API_URL } = import.meta.env;

export default {
    data() {
        return {};
    },
    components: {
        RouterView,
        NavbarComponent
    },
    beforeRouteEnter(to, from, next) {
        const { getToken, removeToken } = AuthStore();
        axios.defaults.headers.common["Authorization"] = getToken();
        axios
            .post(`${VITE_API_URL}/api/user/check`)
            .then(() => {
                next();
            })
            .catch(() => {
                //console.dir(error);
                showSwal("popup", "error", "驗證失敗", "您的身分驗證失敗，請重新登入");
                removeToken();
                const { hideLoading } = LoadingStore();
                hideLoading();

                setTimeout(() => {
                    next("/login");
                }, 1000);
            });
    }
};
</script>

<template>
    <NavbarComponent layout="admin" />
    <div class="py-5 fixed-top-margin-top">
        <RouterView />
    </div>
</template>

<style lang="scss"></style>
