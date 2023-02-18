<script>
import { mapActions, mapState } from "pinia";
import { CouponStore } from "../../stores/CouponStore.js";
import PaginationComponent from "../../components/PaginationComponent.vue";
import CouponModal from "../../components/CouponModal.vue";
import DelCouponModal from "../../components/DelCouponModal.vue";

export default {
    data() {
        return {
            currentCoupon: {}
        };
    },
    computed: {
        ...mapState(CouponStore, ["coupons"]),
        couponTotal() {
            return this.coupons.data ? Object.keys(this.coupons.data).length : 0;
        }
    },
    mounted() {
        this.getCoupons();
    },
    components: {
        PaginationComponent,
        CouponModal,
        DelCouponModal
    },
    methods: {
        ...mapActions(CouponStore, ["getCoupons"]),
        handleDue_date(date) {
            date = new Date(date * 1000);
            const yesr = date.getFullYear();
            let month = date.getMonth() + 1;
            month = this.transformTwoDigits(month);
            let day = date.getDate();
            day = this.transformTwoDigits(day);

            return `${yesr}/${month}/${day}`;
        },
        transformTwoDigits(value) {
            if (10 > value) {
                value = `0${value}`;
            }

            return value;
        },
        openModal(method, coupon) {
            this.currentCoupon = { ...coupon };

            if (method === "del") {
                this.$refs.childDelCouponModal.openModal();
            } else {
                this.$refs.childCouponModal.openModal();
            }
        }
    }
};
</script>

<template>
    <SweetalertComponent ref="sweetalert" />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="mb-0 h4 fw-bold">優惠券</h1>
            <button type="button" class="btn btn-primary" @click="openModal('add')">新增優惠券</button>
        </div>
        <table class="table table-striped table-hover text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">名稱</th>
                    <th scope="col">優惠碼</th>
                    <th scope="col">折扣(%)</th>
                    <th scope="col">到期日</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col" width="150px">功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coupon in coupons.data" :key="coupon.id">
                    <th class="text-start">
                        <h4 class="h6 mb-0 text-truncate fw-bold">{{ coupon.title }}</h4>
                    </th>
                    <td>{{ coupon.code }}</td>
                    <td>{{ coupon.percent }}%</td>
                    <td>{{ handleDue_date(coupon.due_date) }}</td>
                    <td>
                        <strong :class="[coupon.is_enabled ? 'text-success' : 'text-danger']">{{ coupon.is_enabled ? "啟用" : "停用" }}</strong>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', coupon)">編輯</button>
                        <button type="button" class="btn btn-outline-danger btn-sm ms-1" @click="openModal('del', coupon)">刪除</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col" colspan="6" class="text-start">優惠券數量：{{ couponTotal }} 筆</th>
                </tr>
            </tfoot>
        </table>
        <PaginationComponent :pagination="coupons.pagination" v-if="coupons.pagination?.total_pages" @switch-page="getCoupons" />
        <!-- modal 刪除 -->
        <DelCouponModal ref="childDelCouponModal" :coupon="currentCoupon" :page="coupons.pagination?.current_page" />

        <!-- modal 修改或新增 -->
        <CouponModal ref="childCouponModal" :coupon="currentCoupon" :handleDue_date="handleDue_date" :page="coupons.pagination?.current_page" />
    </div>
</template>

<style lang="scss">
.btn:focus {
    box-shadow: none;
}

.table thead th {
    word-break: keep-all;
}
</style>
