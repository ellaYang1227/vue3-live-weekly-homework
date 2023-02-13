import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/admin",
        component: () => import("../views/AdminLayout.vue"),
        children: [
            {
                path: "/products",
                name: "產品列表",
                component: () => import("../views/admin/AdminProductsView.vue")
            },
            {
                path: "/orders",
                name: "訂單管理",
                component: () => import("../views/admin/AdminOrdersView.vue")
            },
            { path: "/:pathMatch(.*)*", redirect: "/admin/products" }
        ]
    },
    {
        path: "/",
        component: () => import("../views/FrontLayout.vue"),
        children: [
            {
                path: "/Products",
                name: "產品列表",
                component: () => import("../views/front/ProductsView.vue")
            },
            {
                path: "/product/:id",
                name: "單一產品介紹",
                component: () => import("../views/front/ProductView.vue")
            },
            {
                path: "/cart",
                name: "購物車",
                component: () => import("../views/front/CartView.vue")
            },
            {
                path: "/login",
                name: "登入",
                component: () => import("../views/front/LoginView.vue")
            },
            { path: "/:pathMatch(.*)*", redirect: "/products" }
        ]
    },
    { path: "/:pathMatch(.*)*", redirect: "/products" }
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    routes
});

export default router;
