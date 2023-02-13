import { defineStore } from "pinia";
import axios from "axios";
import { LoadingStore } from "./LoadingStore.js";
import { showSwal } from "../data/Sweetalert2-options.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
const { showLoading, hideLoading } = LoadingStore();

// import "sweetalert2/src/sweetalert2.scss";

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
        }
    }
});
