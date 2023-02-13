<script>
import { mapActions, mapState } from "pinia";
import { CartStore } from "../../stores/CartStore.js";

export default {
    data() {
        return {
            showBuyFormCollapse: false,
            cartItemsMaxHeight: {
                maxHeight: "80vh"
            }
        };
    },
    computed: {
        ...mapState(CartStore, ["cart"])
    },
    components: {},
    mounted() {
        this.getCart();
        console.error("安裝 ICON 套件");
    },
    methods: {
        ...mapActions(CartStore, ["getCart"])
    }
};
</script>

<template>
    <div class="col-md-5 position-sticky h-100" style="top: 48px">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title border-bottom pb-3 mb-0 d-flex align-items-center">
                    我的購物車
                    <button type="button" class="ms-auto btn btn-outline-danger btn-sm" :disabled="!cart.carts?.length" @click="delCart()">
                        清空購物車
                    </button>
                </h5>
                <p class="text-muted text-center mb-0 py-3" v-if="!cart.carts?.length">購物車是空的<br />立即選購喜愛的產品</p>
                <div class="d-flex flex-column" v-else>
                    <ul class="list-group list-group-flush bg-transparent overflow-auto" :style="cartItemsMaxHeight">
                        <li class="list-group-item py-3" v-for="cartItem in cart.carts" :key="cartItem.id">
                            <div class="row align-items-center">
                                <div class="col-7 d-flex align-items-center">
                                    <button type="button" class="btn btn-link text-black-50 ps-0">
                                        <i class="fa-solid fa-trash-can" @click="delCart(cartItem.id)"></i>
                                    </button>
                                    <h3 class="h6 mb-0 fw-bold">{{ cartItem.product.title }}</h3>
                                </div>
                                <div class="col-auto d-flex align-items-center">
                                    <select class="form-select form-select-sm me-1" v-model="cartItem.qty" @change="changeCartItem(cartItem)">
                                        <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                                    </select>
                                    {{ cartItem.product.unit }}
                                </div>
                                <div class="col text-end text-danger fw-bold">$ {{ cartItem.final_total }}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="p-3 pb-0 mt-auto border-top d-flex align-items-center text-black-50">
                        {{ `共 ${cart.carts.length} 筆` }}<strong class="ms-auto text-danger">總計 ${{ cart.final_total }}</strong>
                    </div>
                    <button class="btn btn-primary w-100 mt-3" type="button" @click="toggleBuyFormCollapse" v-if="!showBuyFormCollapse">
                        立即結帳
                    </button>
                </div>
            </div>
            <div class="collapse card-footer py-3" ref="buyFormCollapse">
                <buy-form
                    @get-cart="
                        getCart();
                        toggleBuyFormCollapse();
                    "
                ></buy-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
