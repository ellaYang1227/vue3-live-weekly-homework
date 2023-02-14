<script>
import { mapActions, mapState } from "pinia";
import * as bootstrap from "bootstrap";
import { CartStore } from "../../stores/CartStore.js";
import BuyFormComponent from "../../components/BuyFormComponent.vue";

export default {
    data() {
        return {
            buyFormCollapse2: null,
            showBuyFormCollapse: false,
            cartItemsMaxHeight: {
                maxHeight: ""
            }
        };
    },
    computed: {
        ...mapState(CartStore, ["cart"])
    },
    components: {
        BuyFormComponent
    },
    mounted() {
        this.buyFormCollapse = new bootstrap.Collapse(this.$refs.buyFormCollapse, { toggle: false });
        this.getCart();
    },
    methods: {
        ...mapActions(CartStore, ["getCart", "delCart", "changeCartItem"]),
        toggleBuyFormCollapse() {
            this.buyFormCollapse.toggle();
            this.showBuyFormCollapse = !this.showBuyFormCollapse;
            this.cartItemsMaxHeight.maxHeight = this.showBuyFormCollapse ? "30vh" : "";
        }
    }
};
</script>

<template>
    <div class="container">
        <ul class="list-group">
            <li class="list-group-item py-3">
                <h5 class="card-title border-bottom bg-white pb-3 mb-0 d-flex align-items-center">
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
                                        <font-awesome-icon icon="fa-solid fa-trash-can" @click="delCart(cartItem.id)" />
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
            </li>
            <li class="list-group-item py-4 bg-light" :class="{ 'd-none': !showBuyFormCollapse }">
                <div class="collapse" ref="buyFormCollapse">
                    <BuyFormComponent
                        @get-cart="
                            getCart();
                            toggleBuyFormCollapse();
                        "
                    ></BuyFormComponent>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss"></style>
