import { url, path } from '../../data/data.js';
import { formsSchema } from '../../data/forms-schema.js';
import { swalWithBootstrapButtons } from '../../data/sweetalert2.js';

let productModal = null;

export default {
    data() {
        return {
            formsSchema,
            initProduct: {},
            currentProduct: {},
            isLoading: false,
            isInputErr: {},
            inputHasErr: false,
            isInputChangeValue: false
        };
    },
    mounted() {
        productModal = new bootstrap.Modal(
            document.getElementById('productModal'),
            { keyboard: false }
        );
    },
    watch: {
        product: {
            handler() {
                const timestamp = this.timestamp();
                if (!this.product) {
                    this.currentProduct = {
                        title: '',
                        category: '',
                        origin_price: null,
                        price: null,
                        unit: '',
                        description: '',
                        content: '',
                        imageUrl: '',
                        imagesUrl: {
                            [timestamp]: ''
                        },
                        is_enabled: 1
                    };
                } else {
                    this.currentProduct = { ...this.product };
                    if (!this.currentProduct.imagesUrl) {
                        this.currentProduct.imagesUrl = { [timestamp]: '' };
                    } else {
                        this.currentProduct.imagesUrl =
                            this.product.imagesUrl.reduce(
                                (accumulator, currentValue, currentIndex) => {
                                    accumulator[currentIndex] = currentValue;
                                    return accumulator;
                                },
                                {}
                            );
                    }
                }

                this.initCurrentProduct = JSON.parse(
                    JSON.stringify(this.currentProduct)
                );
            }
        },
        currentProduct: {
            handler() {
                const keys = Object.keys(this.currentProduct);
                this.isInputChangeValue = false;
                keys.forEach((key) => {
                    if (key === 'imageUrl' || key === 'imagesUrl') {
                        let regex = new RegExp(
                            formsSchema.product_imageUrl.validates.pattern
                        );
                        if (key === 'imageUrl') {
                            this.isInputErr.imageUrl = !regex.test(
                                this.currentProduct.imageUrl
                            );
                        } else {
                            const imagesUrlKeys = Object.keys(
                                this.currentProduct.imagesUrl
                            );
                            imagesUrlKeys.forEach((imagesUrlKey) => {
                                const currentData =
                                    this.currentProduct.imagesUrl[imagesUrlKey];
                                const isInputErr =
                                    currentData && !regex.test(currentData)
                                        ? true
                                        : false;
                                if (!this.isInputErr.imagesUrl) {
                                    this.isInputErr.imagesUrl = {};
                                }
                                this.isInputErr.imagesUrl[imagesUrlKey] =
                                    isInputErr;
                            });
                        }
                    } else {
                        this.isInputErr[key] =
                            this.currentProduct[key] ||
                            (key === 'is_enabled' &&
                                this.currentProduct[key] === 0)
                                ? false
                                : true;
                    }
                });

                // Input 值是否修改
                this.getIsInputChangeValue();
            },
            deep: true
        },
        isInputErr: {
            handler() {
                const values = Object.values(this.isInputErr);
                this.inputHasErr = values.some((value) => {
                    if (typeof value === 'object') {
                        return Object.values(value).some(
                            (childValue) => childValue
                        );
                    } else {
                        return value;
                    }
                });
            },
            deep: true
        }
    },
    methods: {
        openModal() {
            productModal.show();
        },
        closeModal(method, state, message) {
            this.isLoading = false;
            let title = method === 'add' ? '新增' : '編輯';
            productModal.hide();

            this.$emit('get-products');
            setTimeout(() => {
                swalWithBootstrapButtons.fire({
                    icon: state,
                    title: `${title}${state === 'success' ? '成功' : '失敗'}`,
                    text: message
                });
            }, 500);
        },
        getIsInputChangeValue() {
            const keys = Object.keys(this.currentProduct);
            this.isInputChangeValue = keys.some((key) => {
                if (
                    this.currentProduct[key] &&
                    typeof this.currentProduct[key] === 'object'
                ) {
                    return Object.keys(this.currentProduct[key]).some(
                        (childKey) =>
                            this.currentProduct[key][childKey] &&
                            this.currentProduct[key][childKey] !==
                                this.initCurrentProduct[key][childKey]
                    );
                } else {
                    return (
                        this.currentProduct[key] !==
                        this.initCurrentProduct[key]
                    );
                }
            });
        },
        updateImagesUrl(method, imageUrl) {
            if (method === 'del') {
                if (this.currentProduct.imagesUrl.hasOwnProperty(imageUrl)) {
                    delete this.currentProduct.imagesUrl[imageUrl];
                    delete this.isInputErr.imagesUrl[imageUrl];
                }
            } else if (method === 'add') {
                const timestamp = this.timestamp();
                this.currentProduct.imagesUrl[timestamp] = '';
            }
        },
        addOrEditProduct(id) {
            this.isLoading = true;
            this.currentProduct.imagesUrl = Object.values(
                this.currentProduct.imagesUrl
            ).filter((value) => value);
            const data = { data: this.currentProduct };
            if (!id) {
                axios
                    .post(`${url}/api/${path}/admin/product`, data)
                    .then((res) => {
                        this.closeModal('add', 'success', res.data.message);
                    })
                    .catch((error) => {
                        console.dir(error);
                        this.closeModal(
                            'add',
                            'error',
                            error.response.data.message
                        );
                    });
            } else {
                axios
                    .put(`${url}/api/${path}/admin/product/${id}`, data)
                    .then((res) => {
                        this.closeModal('edit', 'success', res.data.message);
                    })
                    .catch((error) => {
                        console.dir(error);
                        this.closeModal(
                            'edit',
                            'error',
                            error.response.data.message
                        );
                    });
            }
        },
        timestamp() {
            return new Date().getTime();
        }
    },
    props: {
        product: {
            type: Object,
            required: false
        }
    },
    template: `<div class="modal fade" tabindex="-1" id="productModal" aria-labelledby="productModalLabel"
    :data-bs-backdrop="isLoading ? true : 'static'" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title">{{ currentProduct?.id ? '修改' : '新增' }}產品</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    :disabled="isLoading"></button>
            </div>
            <div class="modal-body">
                <form>
                    <fieldset :disabled="isLoading">
                        <div class="row g-3 pb-3">
                            <div class="col-12">
                                <label for="inputTitle" class="form-label d-flex align-items-center">{{
                                    formsSchema.product_title.name }}
                                    <font class="text-danger"
                                        v-if="formsSchema.product_title.validates.isRequired">
                                        *</font><small class="ms-auto"
                                        :class="[currentProduct?.title?.length === formsSchema.product_title.validates.maxlength ? 'text-danger' : 'text-muted']">
                                       {{ currentProduct?.title?.length }}/{{ formsSchema.product_title.validates.maxlength }}</small>
                                </label>
                                <input :type="formsSchema.product_title.type" class="form-control"
                                    id="inputTitle" aria-describedby="titleHelp"
                                    v-model.trim.lazy="currentProduct.title"
                                    :required="formsSchema.product_title.validates.isRequired"
                                    :maxlength="formsSchema.product_title.validates.maxlength"
                                    :class="{ 'is-invalid': isInputErr?.title }">
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.title }">{{
                                    formsSchema.product_title.error }}</div>
                            </div>
                            <div class="col-md-6">
                                <label for="inputCategory" class="form-label d-flex align-items-center">{{
                                    formsSchema.product_category.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_category.validates.isRequired">*
                                    </font><small class="ms-auto"
                                        :class="[currentProduct?.category?.length === formsSchema.product_category.validates.maxlength ? 'text-danger' : 'text-muted']">{{ currentProduct?.category?.length }}/{{ formsSchema.product_category.validates.maxlength }}</small>
                                </label>
                                <input :type="formsSchema.product_category.type" class="form-control"
                                    id="inputCategory" aria-describedby="categoryHelp"
                                    v-model.trim.lazy="currentProduct.category"
                                    :required="formsSchema.product_category.validates.isRequired"
                                    :class="{ 'is-invalid': isInputErr?.category }"
                                    :maxlength="formsSchema.product_category.validates.maxlength">
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.category }">{{
                                    formsSchema.product_category.error }}</div>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <label for="inputImageUrl" class="form-label">{{
                                formsSchema.product_imageUrl.name
                                }}<font class="text-danger"
                                    v-if="formsSchema.product_imageUrl.validates.isRequired">*
                                </font>
                            </label>
                            <div class="col-md-2 mt-0 text-center mb-3" v-if="currentProduct.imageUrl">
                                <div class="border rounded bg-light">
                                    <img :src="currentProduct.imageUrl" alt="主圖" class="img-fluid rounded">
                                </div>
                            </div>
                            <div class="col-12 mt-0">
                                <input :type="formsSchema.product_imageUrl.type" class="form-control"
                                    id="inputImageUrl" aria-describedby="imageUrlHelp"
                                    v-model.trim.lazy="currentProduct.imageUrl"
                                    :required="formsSchema.product_imageUrl.validates.isRequired"
                                    :class="{ 'is-invalid': isInputErr?.imageUrl }">
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.imageUrl }">{{
                                    formsSchema.product_imageUrl.error }}</div>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <label for="inputImagesUrl" class="form-label d-flex align-items-center">{{
                                formsSchema.product_imagesUrl.name
                                }}<font class="text-danger"
                                    v-if="formsSchema.product_imagesUrl.validates.isRequired">*
                                </font>
                                <button type="button" class="btn btn-link p-0 ms-auto"
                                    @click="updateImagesUrl('add')" v-if="currentProduct?.imagesUrl"
                                    :disabled="Object.keys(currentProduct.imagesUrl).length >= 5">新增</button>
                            </label>
                            <div class="col-md-2 mt-0 text-center"
                                v-for="(imageUrl, key, index) in currentProduct.imagesUrl" :key="key">
                                <div
                                    class="border rounded bg-light h-100 d-flex flex-column justify-content-center">
                                    <img :src="imageUrl" :alt="'圖' + (index + 1)" class="img-fluid rounded"
                                        v-if="imageUrl">
                                    <template v-else>圖{{ index + 1 }}<small
                                            class="d-block">沒有圖片</small></template>
                                </div>
                            </div>
                            <div class="col-12" v-for="(imageUrl, key, index) in currentProduct.imagesUrl"
                                :key="imageUrl">
                                <div class="d-flex align-items-center">
                                    <input :type="formsSchema.product_imagesUrl.type" class="form-control"
                                        :id="'inputimagesUrl-' + key" :aria-describedby="'imagesUrlHelp-' + key"
                                        v-model.trim.lazy="currentProduct.imagesUrl[key]"
                                        :required="formsSchema.product_imagesUrl.validates.isRequired"
                                        :class="{ 'is-invalid': isInputErr?.imagesUrl[key] }">
                                    <div
                                        class="d-grid gap-0 d-md-flex justify-content-md-end flex-shrink-0 ms-md-2">
                                        <button type="button" class="btn btn-link btn-sm text-danger"
                                            @click="updateImagesUrl('del', key)"
                                            v-if="Object.keys(currentProduct.imagesUrl).length > 1">刪除</button>
                                    </div>
                                </div>
                                <div class="invalid-feedback"
                                    :class="{ 'd-block': isInputErr?.imagesUrl[key] }">{{
                                    formsSchema.product_imageUrl.error }}</div>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <div class="col-12">
                                <label for="textareaDescription" class="form-label">{{
                                    formsSchema.product_description.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_description.validates.isRequired">*</font>
                                </label>
                                <textarea rows="10" class="form-control" id="textareaDescription"
                                    v-model.trim.lazy="currentProduct.description"
                                    :required="formsSchema.product_description.validates.isRequired"
                                    :class="{ 'is-invalid': isInputErr?.description }"></textarea>
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.description }">{{
                                    formsSchema.product_description.error }}</div>
                            </div>
                            <div class="col-12">
                                <label for="textareaContent" class="form-label">{{
                                    formsSchema.product_content.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_content.validates.isRequired">*</font>
                                </label>
                                <textarea rows="3" class="form-control" id="textareaContent"
                                    v-model.trim.lazy="currentProduct.content"
                                    :required="formsSchema.product_content.validates.isRequired"
                                    :class="{ 'is-invalid': isInputErr?.content }"></textarea>
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.content }">{{
                                    formsSchema.product_content.error }}</div>
                            </div>
                            <div class="col-md-4">
                                <label for="inputUnit" class="form-label">{{ formsSchema.product_unit.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_unit.validates.isRequired">*
                                    </font>
                                </label>
                                <input :type="formsSchema.product_unit.type" class="form-control" id="inputUnit"
                                    aria-describedby="unitHelp" v-model.trim.lazy="currentProduct.unit"
                                    :required="formsSchema.product_unit.validates.isRequired"
                                    :class="{ 'is-invalid': isInputErr?.unit }">
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.unit }">{{
                                    formsSchema.product_unit.error }}</div>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <div class="col-md-4">
                                <label for="inputOrigin_price" class="form-label">{{
                                    formsSchema.product_origin_price.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_origin_price.validates.isRequired">*
                                    </font>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input :type="formsSchema.product_origin_price.type" class="form-control"
                                        id="inputOrigin_price" aria-describedby="origin_priceHelp"
                                        v-model.trim.number.lazy="currentProduct.origin_price"
                                        :required="formsSchema.product_origin_price.validates.isRequired"
                                        :min="formsSchema.product_origin_price.validates.min"
                                        :class="{ 'is-invalid': isInputErr?.origin_price }">
                                </div>
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.origin_price }">
                                    {{ formsSchema.product_origin_price.error }}</div>
                            </div>
                            <div class="col-md-4">
                                <label for="inputPrice" class="form-label">{{
                                    formsSchema.product_price.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_price.validates.isRequired">*
                                    </font>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input :type="formsSchema.product_price.type" class="form-control"
                                        id="inputPrice" aria-describedby="priceHelp"
                                        v-model.trim.number.lazy="currentProduct.price"
                                        :required="formsSchema.product_price.validates.isRequired"
                                        :min="formsSchema.product_price.validates.min"
                                        :class="{ 'is-invalid': isInputErr?.price }">
                                </div>
                                <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.price }">{{
                                    formsSchema.product_price.error }}</div>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <div class="col-12">
                                <label class="form-label">{{ formsSchema.product_is_enabled.name
                                    }}<font class="text-danger"
                                        v-if="formsSchema.product_is_enabled.validates.isRequired">*</font>
                                </label>
                                <div class="form-check form-check-inline"
                                    v-for="(option, index) in formsSchema.product_is_enabled.options"
                                    :key="option.value">
                                    <input class="form-check-input" :value="option.value" type="radio"
                                        name="is_enabledRadio" :id="'is_enabledRadio-' + index"
                                        v-model="currentProduct.is_enabled">
                                    <label class="form-check-label" :for="'is_enabledRadio-' + index">
                                        {{ option.label }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    :disabled="isLoading">取消</button>
                <button type="submit" class="btn btn-primary"
                    :disabled="isLoading || !isInputChangeValue || inputHasErr"
                    @click="addOrEditProduct(currentProduct?.id)">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                        v-if="isLoading"></span>
                    {{ currentProduct?.id ? '修改' : '新增' }}</button>
            </div>
        </div>
    </div>
</div>`
};
