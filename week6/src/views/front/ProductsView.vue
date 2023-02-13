<script>
import { LoadingStore } from "../../stores/LoadingStore.js";
import { mapActions } from "pinia";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            products: []
        };
    },
    components: {},
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
        getProducts() {
            //this.isLoading = true;
            this.$http
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
                .then(res => {
                    console.error('未安裝 Swal 套件')
                    this.hideLoading();
                    this.products = res.data.products;
                })
                .catch(error => {
                    // console.dir(error);

                    this.hideLoading();
                    this.showSwalErr(error.response.data.message);
                });
        },
        getHowPriceLess(origin_price, price) {
            return origin_price - price;
        }
    }
};
</script>

<template>
    <div class="container" v-for="item in handleProducts" :key="item.category">
        <h1 class="h5 fw-bold bg-light px-2 py-3">{{ item.category }}</h1>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col" v-for="product in item.products" :key="product.id">
                <div class="card">
                    <img :src="product.imageUrl" :alt="`${product.category} - ${product.title}`" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title fw-bold">{{ product.title }}</h5>
                        <p class="card-text">{{ product.price }}</p>
                        <div class="text-danger fw-bold">
                            ${{ product.price
                            }}<small class="d-block text-black-50" v-if="getHowPriceLess(product.origin_price, product.price)"
                                >現省 ${{ getHowPriceLess(product.origin_price, product.price) }}</small
                            >
                        </div>
                        <div class="d-grid gap-2 d-md-block">
                            <button type="button" class="btn btn-outline-primary btn-sm" @click="openProductModal(product)">產品詳情</button>
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="addCart(product.id)">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
