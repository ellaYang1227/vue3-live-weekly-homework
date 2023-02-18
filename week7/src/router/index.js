import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../views/FrontLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("../views/front/LoginView.vue")
            },
            {
                path: "/products",
                component: () => import("../views/front/ProductsView.vue")
            },
            {
                path: "/product/:id",
                component: () => import("../views/front/ProductView.vue")
            },
            {
                path: "/cart",
                component: () => import("../views/front/CartView.vue")
            },
            {
                path: "/login",
                component: () => import("../views/front/LoginView.vue")
            },
            { path: ":pathMatch(.*)*", redirect: "/login" }
        ]
    },
    {
        path: "/admin",
        component: () => import("../views/AdminLayout.vue"),
        children: [
            {
                path: "products",
                component: () => import("../views/admin/AdminProductsView.vue")
            },
            {
                path: "orders",
                component: () => import("../views/admin/AdminOrdersView.vue")
            },
            { path: ":pathMatch(.*)*", redirect: "/admin/products" }
        ]
    },
    { path: "/:pathMatch(.*)*", redirect: "/login" }
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    routes
});

export default router;
