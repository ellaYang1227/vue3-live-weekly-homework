<script>
import { mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { AuthStore } from "../stores/AuthStore.js";

export default {
    data() {
        return {
            data: {
                front: {
                    brand: {
                        name: "week6 作業",
                        url: "/"
                    },
                    navLinks: [
                        // {
                        //     name: "產品列表",
                        //     url: "/products"
                        // },
                        // {
                        //     name: "購物車",
                        //     url: "/cart"
                        // },
                        {
                            name: "後台管理",
                            url: "/admin/products"
                        }
                    ]
                },
                admin: {
                    brand: {
                        name: "[後台管理] week6 作業",
                        url: "/admin/products"
                    },
                    navLinks: [
                        {
                            name: "產品列表",
                            url: "/admin/products"
                        },
                        {
                            name: "訂單管理",
                            url: "/admin/orders"
                        },
                        {
                            name: "優惠券",
                            url: "/admin/coupons"
                        }
                    ]
                }
            }
        };
    },
    props: {
        layout: {
            type: String,
            required: false,
            default: "front"
        }
    },
    components: {
        RouterLink
    },
    computed: {
        currentData() {
            const { front, admin } = this.data;
            return this.layout === "admin" ? admin : front;
        }
    },
    methods: {
        ...mapActions(AuthStore, ["logout", "getToken"])
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top navbar-height">
        <div class="container">
            <router-link :to="currentData.brand.url" class="navbar-brand">{{ currentData.brand.name }}</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
                <div class="navbar-nav ms-auto">
                    <router-link :to="navLink.url" class="nav-link" v-for="navLink in currentData.navLinks" :key="navLink.name">{{
                        navLink.name
                    }}</router-link>
                </div>
                <router-link to="/login" class="btn btn-outline-warning ms-2" v-if="!getToken()">登入</router-link>
                <button type="button" class="btn btn-outline-light ms-2" @click="logout()" v-else>登出</button>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
@import "../assets/bootstrap-variables.scss";

.navbar-height {
    height: $navbar-height;
}
</style>
