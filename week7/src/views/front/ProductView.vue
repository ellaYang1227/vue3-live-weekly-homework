<script>
import { mapActions } from "pinia";
import { LoadingStore } from "../../stores/LoadingStore.js";
import { CartStore } from "../../stores/CartStore.js";
import { getHowPriceLess } from "../../data/functions.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            product: {},
            qty: 1,
            getHowPriceLess
        };
    },
    components: {},
    mounted() {
        this.getProduct();
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"]),
        ...mapActions(CartStore, ["addCart"]),
        getProduct() {
            const { id } = this.$route.params;
            this.$http
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`)
                .then(res => {
                    this.hideLoading();
                    this.product = res.data.product;
                })
                .catch(error => {
                    // console.dir(error);
                    this.hideLoading();
                    this.$refs.sweetalert.showSwal("popup", "error", error.response.data.message).then(() => {
                        this.$router.go(-1);
                    });
                });
        }
    }
};
</script>

<template>
    <SweetalertComponent ref="sweetalert" />
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <img :src="product.imageUrl" :alt="product.title" class="img-thumbnail" />
            </div>
            <div class="col-md">
                <span class="badge rounded-pill bg-transparent border border-primary text-primary">{{ product.category }}</span>
                <h5 class="modal-title fw-bold fs-3">{{ product.title }}</h5>
                <span class="text-danger fw-bold fs-4 mb-4">$ {{ product.price }}</span>
                <small class="text-muted" v-if="getHowPriceLess(product.origin_price, product.price)">
                    現省 $ {{ getHowPriceLess(product.origin_price, product.price) }}</small
                >
                <p class="white-space-pre-wrap text-muted mt-3">{{ product.description }}</p>
                <p class="white-space-pre-wrap text-muted my-3">{{ product.content }}</p>
                <div class="d-flex align-items-center flex-nowrap">
                    <select class="form-select me-1 flex-grow-0 w-auto" v-model="qty">
                        <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                    </select>
                    <button type="button" class="btn btn-outline-danger ms-1 flex-shrink-0" @click="addCart(product.id, qty)">加入購物車</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
