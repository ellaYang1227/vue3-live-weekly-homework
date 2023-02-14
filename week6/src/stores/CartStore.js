import { defineStore } from "pinia";
import axios from "axios";
import { LoadingStore } from "./LoadingStore.js";
import { showSwal } from "../data/Sweetalert2-options.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
const { showLoading, hideLoading } = LoadingStore();

export const CartStore = defineStore("CartStore", {
    state: () => ({
        cart: {}
    }),
    actions: {
        addCart(product_id, qty = 1) {
            if (product_id) {
                showLoading();
                const data = {
                    product_id,
                    qty
                };

                axios
                    .post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data })
                    .then(() => {
                        hideLoading();
                        showSwal("toast", "success", "已加入購物車");
                    })
                    .catch(() => {
                        // console.dir(error);
                        hideLoading();
                        showSwal("toast", "error", "加入購物車失敗");
                    });
            }
        },
        getCart() {
            showLoading();
            axios
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
                .then(res => {
                    hideLoading();
                    this.cart = res.data.data;
                })
                .catch(error => {
                    // console.dir(error);
                    hideLoading();
                    showSwal("popup", "error", error.response.data.message);
                });
        },
        delCart(id) {
            showLoading();
            if (id) {
                axios
                    .delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
                    .then(() => {
                        this.getCart();
                        showSwal("toast", "success", "已刪除購物車品項");
                    })
                    .catch(() => {
                        // console.dir(error);
                        hideLoading();
                        showSwal("toast", "error", "刪除購物車品項失敗");
                    });
            } else {
                axios
                    .delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
                    .then(() => {
                        this.getCart();
                        showSwal("toast", "success", "購物車已全部清空");
                    })
                    .catch(() => {
                        // console.dir(error);
                        hideLoading();
                        showSwal("toast", "error", "清空購物車失敗");
                    });
            }
        },
        changeCartItem(cartItem) {
            showLoading();
            const { id, qty, product } = cartItem;
            const data = {
                product_id: product.id,
                qty
            };

            axios
                .put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`, { data })
                .then(() => {
                    this.getCart();
                })
                .catch(() => {
                    // console.dir(error);
                    hideLoading();
                    showSwal("toast", "error", "購物車更新失敗");
                });
        }
    }
});
