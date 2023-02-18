import { defineStore } from "pinia";
import axios from "axios";
import { LoadingStore } from "./LoadingStore.js";
import { showSwal } from "../data/Sweetalert2-options.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
const { showLoading, hideLoading } = LoadingStore();

export const CouponStore = defineStore("CouponStore", {
    state: () => ({
        coupons: {}
    }),
    actions: {
        getCoupons(page = 1) {
            showLoading();
            axios
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupons?page=${page}`)
                .then(res => {
                    const { coupons, pagination } = res.data;
                    this.coupons = {
                        data: coupons,
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
        addCoupon(data) {
            return axios
                .post(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon`, { data })
                .then(res => {
                    showSwal("toast", "success", "優惠券新增成功！");
                    this.getCoupons();
                    return res.data.success;
                })
                .catch(error => {
                    console.dir(error);
                    showSwal("toast", "error", "優惠券新增失敗！");
                    return error.response.data.success;
                });
        },
        editCoupon(id, data, page) {
            return axios
                .put(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon/${id}`, { data })
                .then(res => {
                    showSwal("toast", "success", "優惠券更新成功！");
                    this.getCoupons(page);
                    return res.data.success;
                })
                .catch(error => {
                    console.dir(error);
                    showSwal("toast", "error", "優惠券更新失敗！");
                    return error.response.data.success;
                });
        }
    }
});
