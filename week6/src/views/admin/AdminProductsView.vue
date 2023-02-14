<script>
import { mapActions } from "pinia";
import { LoadingStore } from "../../stores/LoadingStore.js";
import SweetalertComponent from "../../components/SweetalertComponent.vue";
import PaginationComponent from "../../components/PaginationComponent.vue";

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            products: {}
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
        SweetalertComponent,
        PaginationComponent
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"]),
        getProducts(page = 1) {
            this.showLoading();
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
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="mb-0 h4 fw-bold">產品管理</h1>
        </div>
        <table class="table table-striped table-hover text-center align-middle">
            <thead>
                <tr>
                    <th scope="col" width="400px">產品名稱</th>
                    <th scope="col" width="170px">分類</th>
                    <th scope="col" width="170px">廣告標籤</th>
                    <th scope="col" width="170px">原價</th>
                    <th scope="col" width="170px">售價</th>
                    <th scope="col" width="170px">是否啟用</th>
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
                    <td class="text-truncate">{{ product.AD_type ? product.AD_type : "未分類" }}</td>
                    <td class="text-end">${{ product.origin_price }}</td>
                    <td class="text-end">${{ product.price }}</td>
                    <td>
                        <strong :class="[product.is_enabled ? 'text-success' : 'text-danger']">{{ product.is_enabled ? "啟用" : "停用" }}</strong>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col" colspan="7" class="text-start">產品數量：{{ productTotal }} 筆</th>
                </tr>
            </tfoot>
        </table>
        <PaginationComponent :pagination="products.pagination" v-if="products.pagination" @switch-page="getProducts" />
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
