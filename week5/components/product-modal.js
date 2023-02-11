let productModal = null;

export default {
    data() {
        return {
            qty: 1
        };
    },
    props: {
        product: {
            type: Object,
            required: true
        },
        getHowPriceLess: {
            type: Function,
            required: true
        },
        addCart: {
            type: Function,
            required: true
        }
    },
    watch: {
        product(){
            this.qty = 1;
        }
    },
    mounted() {
        productModal = new bootstrap.Modal(this.$refs.productModal, { keyboard: false });
    },
    methods: {
        openProductModal(){
            productModal.show();
        },
        hideProductModal(){
            productModal.hide();
            this.addCart(this.product.id, this.qty);
        }
    },
    template: `<div class="modal fade" tabindex="-1" ref="productModal" aria-labelledby="productModalLabel"
    data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header border-0 bg-light">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <img :src="product.imageUrl" :alt="product.title" class="img-thumbnail" />
                    </div>
                    <div class="col-md">
                        <div class="d-flex">
                            <span class="badge rounded-pill bg-transparent border border-primary text-primary">{{ product.category }}</span>
                            <button type="button" class="btn-close btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <h5 class="modal-title fw-bold fs-3">{{ product.title }}</h5>
                        <span class="text-danger fw-bold fs-4 mb-4">$ {{ product.price }}</span>
                        <small class="text-muted" v-if="getHowPriceLess(product.origin_price, product.price)">
                        現省 $ {{ getHowPriceLess(product.origin_price, product.price) }}</small>
                    </div>
                </div>
            </div>
            <div class="modal-body text-muted">
                <p class="white-space-pre-wrap">{{ product.description }}</p>
                <p class="white-space-pre-wrap my-3">{{ product.content }}</p>
            </div>
            <div class="modal-footer align-items-center flex-nowrap bg-light">
                <select class="form-select me-1 flex-grow-0 w-auto" v-model="qty">
                    <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                </select>
                <button type="button" class="btn btn-outline-danger ms-1 flex-shrink-0" @click="hideProductModal">加入購物車</button>
            </div>
        </div>
    </div>
</div>`
};
