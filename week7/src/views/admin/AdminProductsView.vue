<script>
import { mapActions } from "pinia";
import { LoadingStore } from "../../stores/LoadingStore.js";
import PaginationComponent from "../../components/PaginationComponent.vue";
import ProductModal from "../../components/ProductModal.vue";
import DelProductModal from "../../components/DelProductModal.vue";

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            products: {},
            currentProduct: {}
        };
    },
    computed: {
        productTotal() {
            return this.products.data ? Object.keys(this.products.data).length : 0;
        }
    },
    mounted() {
        this.getProducts();
    },
    components: {
        PaginationComponent,
        ProductModal,
        DelProductModal
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"]),
        getProducts(page) {
            this.showLoading();
            if (!page) {
                page = this.products.pagination ? this.products.pagination.current_page : 1;
            }
            this.$http
                .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/products?page=${page}`)
                .then(res => {
                    const { products, pagination } = res.data;
                    this.products = {
                        data: products,
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
        openModal(method, product) {
            this.currentProduct = { ...product };

            if (method === "del") {
                this.$refs.childDelProductModal.openModal();
            } else {
                this.$refs.childProductModal.openModal();
            }
        }
    }
};
</script>

<template>
    <SweetalertComponent ref="sweetalert" />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="mb-0 h4 fw-bold">????????????</h1>
            <button type="button" class="btn btn-primary" @click="openModal('add')">????????????</button>
        </div>
        <table class="table table-striped table-hover text-center align-middle">
            <thead>
                <tr>
                    <th scope="col" width="200px">????????????</th>
                    <th scope="col" width="120px">??????</th>
                    <th scope="col" width="120px">????????????</th>
                    <th scope="col" width="120px">??????</th>
                    <th scope="col" width="120px">??????</th>
                    <th scope="col" width="120px">????????????</th>
                    <th scope="col" width="150px">??????</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products.data" :key="product.id">
                    <th>
                        <div class="d-flex align-items-center">
                            <img
                                :src="product.imageUrl"
                                :alt="`${product.category} - ${product.title}`"
                                class="img-box flex-shrink-0 rounded border me-2"
                            />
                            <h4 class="h6 mb-0 text-truncate fw-bold">{{ product.title }}</h4>
                        </div>
                    </th>
                    <td scope="row" class="text-truncate">{{ product.category }}</td>
                    <td class="text-truncate">{{ product.AD_type ? product.AD_type : "?????????" }}</td>
                    <td class="text-end">${{ product.origin_price }}</td>
                    <td class="text-end">${{ product.price }}</td>
                    <td>
                        <strong :class="[product.is_enabled ? 'text-success' : 'text-danger']">{{ product.is_enabled ? "??????" : "??????" }}</strong>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', product)">??????</button>
                        <button type="button" class="btn btn-outline-danger btn-sm ms-1" @click="openModal('del', product)">??????</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col" colspan="7" class="text-start">???????????????{{ productTotal }} ???</th>
                </tr>
            </tfoot>
        </table>
        <PaginationComponent :pagination="products.pagination" v-if="products.pagination?.total_pages" @switch-page="getProducts" />
    </div>
    <!-- modal ?????? -->
    <DelProductModal ref="childDelProductModal" :product="currentProduct" @get-products="getProducts" />

    <!-- modal ??????????????? -->
    <ProductModal ref="childProductModal" :product="currentProduct" @get-products="getProducts" />
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

.table {
    table-layout: fixed;
}

.table thead th {
    word-break: keep-all;
}
</style>
