<script>
import { mapActions } from "pinia";
import { LoadingStore } from "../../stores/LoadingStore.js";
import SweetalertComponent from "../../components/SweetalertComponent.vue";
import PaginationComponent from "../../components/PaginationComponent.vue";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            orders: {}
        };
    },
    computed: {
        orderTotal() {
            return this.orders.data ? Object.keys(this.orders.data).length : 0;
        }
    },
    mounted() {
        this.getOrders();
    },
    components: {
        SweetalertComponent,
        PaginationComponent
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"]),
        getOrders(page = 1) {
            this.showLoading();

            this.$http
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${page}`)
                .then(res => {
                    const { orders, pagination } = res.data;
                    this.orders = {
                        data: orders,
                        pagination
                    };

                    this.hideLoading();
                })
                .catch(error => {
                    // console.dir(error);
                    this.hideLoading();
                    this.$refs.sweetalert.showSwal("popup", "error", error.response.data.message);
                });
        },
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
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="mb-0 h4 fw-bold">訂單管理</h1>
        </div>
        <table class="table table-striped table-hover text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">訂單編號</th>
                    <th scope="col">購買人</th>
                    <th scope="col">聯絡電話</th>
                    <th scope="col">訂單金額</th>
                    <th scope="col">是否付款</th>
                    <th scope="col" width="170px">留言</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders.data" :key="order.id">
                    <th class="text-start">
                        <h4 class="h6 mb-0 text-truncate fw-bold">{{ order.id }}</h4>
                        <small class="d-block text-muted">{{ handleCreate_at(order.create_at) }}</small>
                    </th>
                    <td class="text-start">
                        {{ order.user.name }}<small class="d-block text-muted">{{ order.user.email }}</small>
                    </td>
                    <td>{{ order.user.tel }}</td>
                    <td class="text-end">${{ order.total }}</td>
                    <td>
                        <strong :class="[order.is_paid ? 'text-success' : 'text-danger']">{{ order.is_paid ? "已付款" : "未付款" }}</strong>
                    </td>
                    <td class="text-break text-start">
                        {{ order.message }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col" colspan="7" class="text-start">訂單數量：{{ orderTotal }} 筆</th>
                </tr>
            </tfoot>
        </table>
        <PaginationComponent :pagination="orders.pagination" v-if="orders.pagination" @switch-page="getOrders" />
    </div>
</template>

<style lang="scss">
.btn:focus {
    box-shadow: none;
}

img.img-box {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.table thead th {
    word-break: keep-all;
}
</style>
