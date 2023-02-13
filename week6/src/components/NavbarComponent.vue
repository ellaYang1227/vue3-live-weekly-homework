<script>
import { RouterLink } from "vue-router";

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
                        {
                            name: "產品列表",
                            url: "/products"
                        },
                        {
                            name: "購物車",
                            url: "/cart"
                        }
                    ]
                },
                admin: {
                    brand: {
                        name: "[後台管理] week6 作業",
                        url: "/admin/products",
                        navLinks: [
                            {
                                name: "產品列表",
                                url: "/admin/products"
                            },
                            {
                                name: "訂單管理",
                                url: "/admin/orders"
                            }
                        ]
                    },
                    navLinks: []
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
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <RouterLink :to="currentData.brand.url" class="navbar-brand">{{ currentData.brand.name }}</RouterLink>
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
                    <RouterLink :to="navLink.url" class="nav-link" v-for="navLink in currentData.navLinks" :key="navLink.name">{{
                        navLink.name
                    }}</RouterLink>
                </div>
                <RouterLink to="/login" class="btn btn-outline-warning ms-2">登入</RouterLink>
                <button type="button" class="btn btn-outline-light ms-2">登出</button>
            </div>
        </div>
    </nav>
</template>
