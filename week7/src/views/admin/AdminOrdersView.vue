<script>
import { mapActions, mapState } from "pinia";
import { OrderStore } from "../../stores/OrderStore.js";
import PaginationComponent from "../../components/PaginationComponent.vue";
import OrderModal from "../../components/OrderModal.vue";
import DelOrderModal from "../../components/DelOrderModal.vue";
import SwitchIsPaid from "../../components/SwitchIsPaid.vue";

export default {
    data() {
        return {
            currentOrder: {}
        };
    },
    computed: {
        ...mapState(OrderStore, ["orders"]),
        orderTotal() {
            return this.orders.data ? Object.keys(this.orders.data).length : 0;
        }
    },
    mounted() {
        this.getOrders();
    },
    components: {
        PaginationComponent,
        OrderModal,
        DelOrderModal,
        SwitchIsPaid
    },
    methods: {
        ...mapActions(OrderStore, ["getOrders"]),
        handleCreate_at(date) {
            date = new Date(date * 1000);
            const yesr = date.getFullYear();
            let month = date.getMonth() + 1;
            month = this.transformTwoDigits(month);
            let day = date.getDate();
            day = this.transformTwoDigits(day);
            let hours = date.getHours();
            hours = this.transformTwoDigits(hours);
            let minutes = date.getMinutes();
            minutes = this.transformTwoDigits(minutes);
            let seconds = date.getSeconds();
            seconds = this.transformTwoDigits(seconds);

            return `${yesr}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        },
        transformTwoDigits(value) {
            if (10 > value) {
                value = `0${value}`;
            }

            return value;
        },
        openModal(method, order) {
            this.currentOrder = { ...order };

            if (method === "del") {
                this.$refs.childDelOrderModal.openModal();
            } else {
                this.$refs.childOrderModal.openModal();
            }
        }
    }
};
</script>

<template>
    <SweetalertComponent ref="sweetalert" />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="mb-0 h4 fw-bold">訂單管理</h1>
        </div>
        <table class="table table-striped table-hover text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">訂單編號</th>
                    <th scope="col">購買人</th>
                    <th scope="col">購買產品</th>
                    <th scope="col">訂單金額</th>
                    <th scope="col">是否付款</th>
                    <th scope="col" width="150px">功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders.data" :key="order.id">
                    <th class="text-start">
                        <h4 class="h6 mb-0 text-truncate fw-bold">{{ order.id }}</h4>
                        <small class="d-block text-muted">{{ handleCreate_at(order.create_at) }}</small>
                    </th>
                    <td class="text-start">
                        {{ order.user.name }}
                        <small class="d-block text-muted">{{ order.user.email }}</small>
                        <small class="d-block text-muted">{{ order.user.tel }}</small>
                    </td>
                    <td class="text-start">
                        <ul class="list-unstyled mb-0">
                            <li v-for="product in order.products" :key="product.id">{{ `${product.product.title} *${product.qty}` }}</li>
                        </ul>
                    </td>
                    <td class="text-end">${{ order.total }}</td>
                    <td>
                        <SwitchIsPaid :order="order" :page="orders.pagination.current_page" />
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('check', order)">查看</button>
                        <button type="button" class="btn btn-outline-danger btn-sm ms-1" @click="openModal('del', order)">刪除</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col" colspan="6" class="text-start">訂單數量：{{ orderTotal }} 筆</th>
                </tr>
            </tfoot>
        </table>
        <PaginationComponent :pagination="orders.pagination" v-if="orders.pagination?.total_pages" @switch-page="getOrders" />
        <!-- modal 刪除 -->
        <DelOrderModal ref="childDelOrderModal" :order="currentOrder" :page="orders.pagination?.current_page" />

        <!-- modal 修改 -->
        <OrderModal ref="childOrderModal" :order="currentOrder" :handle-create_at="handleCreate_at" :page="orders.pagination?.current_page" />
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
