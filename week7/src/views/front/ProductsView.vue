<script>
import { RouterLink } from "vue-router";
import { mapActions } from "pinia";

import { LoadingStore } from "../../stores/LoadingStore.js";
import { CartStore } from "../../stores/CartStore.js";
import { getHowPriceLess } from "../../data/functions.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            products: [],
            getHowPriceLess
        };
    },
    components: {
        RouterLink
    },
    mounted() {
        this.getProducts();
    },
    computed: {
        handleProducts() {
            const newProducts = this.products.reduce((accumulator, currentValue) => {
                const findCategory = accumulator.find(item => item.category === currentValue.category);

                if (!findCategory) {
                    const addCategory = {
                        category: currentValue.category,
                        products: []
                    };

                    addCategory.products.push(currentValue);
                    accumulator.push(addCategory);
                } else {
                    findCategory.products.push(currentValue);
                }

                return accumulator;
            }, []);

            return newProducts;
        }
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"]),
        ...mapActions(CartStore, ["addCart"]),
        getProducts() {
            this.$http
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
                .then(res => {
                    this.hideLoading();
                    this.products = res.data.products;
                })
                .catch(error => {
                    // console.dir(error);
                    this.hideLoading();
                    this.$refs.sweetalert.showSwal("popup", "error", error.response.data.message);
                });
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div class="container">
        <div class="pb-5" v-for="item in handleProducts" :key="item.category">
            <h1 class="h5 fw-bold bg-light px-2 py-3">{{ item.category }}</h1>
            <div class="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
                <div class="col" v-for="product in item.products" :key="product.id">
                    <div class="card bg-light h-100">
                        <div class="bg-white text-center img-box p-3">
                            <img :src="product.imageUrl" :alt="`${product.category} - ${product.title}`" class="img-object-fit-cover card-img-top" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">{{ product.title }}</h5>
                            <div class="text-danger fw-bold">
                                ${{ product.price
                                }}<small class="d-block text-black-50" v-if="getHowPriceLess(product.origin_price, product.price)"
                                    >現省 ${{ getHowPriceLess(product.origin_price, product.price) }}</small
                                >
                            </div>
                        </div>
                        <div class="card-footer pb-4 d-flex bg-transparent border-0">
                            <router-link
                                :to="`/product/${product.id}`"
                                role="button"
                                class="btn btn-outline-primary btn-sm flex-grow-1 flex-shrink-0 me-2"
                                >產品詳情</router-link
                            >
                            <button type="button" class="btn btn-outline-danger btn-sm flex-grow-1 flex-shrink-0" @click="addCart(product.id)">
                                加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.img-box {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
</style>
