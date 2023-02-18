import { defineStore } from "pinia";
import axios from "axios";
import { LoadingStore } from "./LoadingStore.js";
import { showSwal } from "../data/Sweetalert2-options.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
const { showLoading, hideLoading } = LoadingStore();

export const OrderStore = defineStore("OrderStore", {
    state: () => ({
        orders: {}
    }),
    actions: {
        getOrders(page = 1) {
            showLoading();
            axios
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${page}`)
                .then(res => {
                    const { orders, pagination } = res.data;
                    this.orders = {
                        data: orders,
                        pagination
                    };

                    hideLoading();
                })
                .catch(error => {
                    // console.dir(error);
                    hideLoading();
                    showSwal("popup", "error", error.response.data.message);
                });
        },
        editOrder(id, is_paid, page) {
            const data = {
                is_paid
            };

            return axios
                .put(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/order/${id}`, { data })
                .then(res => {
                    showSwal("toast", "success", "訂單更新成功！");
                    this.getOrders(page);
                    return res.data.success;
                })
                .catch(error => {
                    console.dir(error);
                    showSwal("toast", "error", "訂單更新失敗！");
                    return error.response.data.success;
                });
        }
    }
});
