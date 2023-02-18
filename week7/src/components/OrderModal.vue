<script>
import * as bootstrap from "bootstrap";
import { mapActions } from "pinia";
import { OrderStore } from "../stores/OrderStore.js";
import SwitchIsPaid from "./SwitchIsPaid.vue";

let orderModal = null;

export default {
    data() {
        return {
            isLoading: false,
            is_paid: null
        };
    },
    mounted() {
        orderModal = new bootstrap.Modal(document.getElementById("orderModal"), { keyboard: false });
    },
    components: {
        SwitchIsPaid
    },
    watch: {
        order() {
            this.is_paid = this.order.is_paid;
        }
    },
    methods: {
        ...mapActions(OrderStore, ["editOrder"]),
        openModal() {
            orderModal.show();
        },
        editOrderAPI() {
            this.isLoading = true;
            this.editOrder(this.order.id, this.is_paid, this.page).then(success => {
                this.isLoading = false;
                if (success) {
                    setTimeout(() => {
                        orderModal.hide();
                    }, 1000);
                }
            });
        },
        setIsPaid(isPaid) {
            this.is_paid = isPaid;
        }
    },
    props: {
        order: {
            type: Object,
            required: false
        },
        handleCreate_at: {
            type: Function,
            required: true
        },
        page: {
            type: Number,
            required: true
        }
    }
};
</script>

<template>
    <div
        class="modal fade"
        tabindex="-1"
        id="orderModal"
        aria-labelledby="orderModalLabel"
        :data-bs-backdrop="isLoading ? true : 'static'"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">訂單細節</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :disabled="isLoading"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <ul class="list-unstyled mb-0">
                                <li><strong>訂單編號：</strong>{{ order.id }}</li>
                                <li><strong>訂單時間：</strong>{{ handleCreate_at(order.create_at) }}</li>
                                <li class="mt-3"><strong>訂購人：</strong>{{ order.user?.name }}</li>
                                <li><strong>E-Mail： </strong>{{ order.user?.email }}</li>
                                <li><strong>聯絡電話：</strong>{{ order.user?.tel }}</li>
                                <li><strong>出貨地址：</strong>{{ order.user?.address }}</li>
                                <li v-if="order.message">
                                    <strong>留言：</strong>
                                    <p class="mb-0">{{ order.message }}</p>
                                </li>
                            </ul>
                        </li>
                        <li class="list-group-item p-0">
                            <ol class="list-group list-group-flush list-group-numbered">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-start"
                                    v-for="item in order.products"
                                    :key="item.product.id"
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">{{ item.product.title }}</div>
                                        <span class="text-muted">{{ item.product.category }}</span>
                                    </div>
                                    <div style="width: 30%" class="text-end">
                                        {{ `${item.qty} ${item.product.unit}` }}
                                        <strong class="text-danger ms-2">${{ item.product.price }}</strong>
                                    </div>
                                </li>
                            </ol>
                        </li>
                        <li class="list-group-item text-end">
                            總計 <strong class="text-danger ms-2">${{ order.total }}</strong>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <SwitchIsPaid :order="order" :isLgSize="true" updateMethod="parent" @setIsPaid="setIsPaid" />
                    <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal" :disabled="isLoading">取消</button>
                    <button type="submit" class="btn btn-primary" :disabled="isLoading || is_paid === order.is_paid" @click="editOrderAPI">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
                        修改
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
