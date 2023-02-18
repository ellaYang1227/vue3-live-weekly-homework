<script>
import * as bootstrap from "bootstrap";
import { formsSchema } from "../data/forms-schema.js";
import UploadImg from "./UploadImg.vue";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

let productModal = null;

export default {
    data() {
        return {
            formsSchema,
            initCurrentProduct: {},
            currentProduct: {},
            isLoading: false,
            isInputErr: {},
            inputHasErr: false,
            isInputChangeValue: false
        };
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById("productModal"), { keyboard: false });

        this.setDefaultCurrentProduct();
    },
    computed: {
        imagesUrlHasDataTotal() {
            const imagesUrl = Object.values(this.currentProduct.imagesUrl);
            return imagesUrl.filter(imgUrl => imgUrl).length;
        }
    },
    watch: {
        product: {
            handler() {
                this.setDefaultCurrentProduct();
                if (this.product.id) {
                    const keys = Object.keys(this.product);
                    keys.forEach(key => {
                        if (key !== "imagesUrl") {
                            this.currentProduct[key] = this.product[key];
                        } else {
                            const imagesUrlKeys = Object.keys(this.currentProduct.imagesUrl);
                            imagesUrlKeys.forEach((imagesUrlKey, index) => {
                                const imageUrl = this.product.imagesUrl && this.product.imagesUrl[index] ? this.product.imagesUrl[index] : "";
                                this.currentProduct.imagesUrl[imagesUrlKey] = imageUrl;
                            });
                        }
                    });
                }

                this.initCurrentProduct = JSON.parse(JSON.stringify(this.currentProduct));
            }
        },
        currentProduct: {
            handler() {
                const keys = Object.keys(this.currentProduct);
                this.isInputChangeValue = false;
                keys.forEach(key => {
                    if (key === "AD_type") {
                        this.isInputErr.AD_type = false;
                    } else {
                        if (key === "imagesUrl") {
                            const imagesUrlKeys = Object.keys(this.currentProduct.imagesUrl);
                            imagesUrlKeys.forEach(imagesUrlKey => {
                                if (!this.isInputErr.imagesUrl) {
                                    this.isInputErr.imagesUrl = {};
                                }
                                this.isInputErr.imagesUrl[imagesUrlKey] = false;
                            });
                        } else {
                            this.isInputErr[key] =
                                this.currentProduct[key] || (key === "is_enabled" && this.currentProduct[key] === 0) ? false : true;
                        }
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
                this.inputHasErr = values.some(value => {
                    if (typeof value === "object") {
                        return Object.values(value).some(childValue => childValue);
                    } else {
                        return value;
                    }
                });
            },
            deep: true
        }
    },
    methods: {
        setDefaultCurrentProduct() {
            const imagesUrl = {};
            for (let i = 0; i < 5; i++) {
                imagesUrl[`img${i + 1}`] = "";
            }

            this.currentProduct = {
                title: "",
                category: "",
                AD_type: "",
                origin_price: null,
                price: null,
                unit: "",
                description: "",
                content: "",
                imageUrl: "",
                imagesUrl,
                is_enabled: 1
            };
        },
        openModal() {
            productModal.show();
        },
        closeModal(state, message) {
            this.isLoading = false;
            let title = this.currentProduct.id ? "編輯" : "新增";
            productModal.hide();

            this.$emit("get-products", this.currentProduct.id ? "" : 1);
            setTimeout(() => {
                title += `${state === "success" ? "成功" : "失敗"}`;
                this.$refs.sweetalert.showSwal("popup", state, title, message);
            }, 500);
        },
        getIsInputChangeValue() {
            const keys = Object.keys(this.currentProduct);
            this.isInputChangeValue = keys.some(key => {
                if (this.currentProduct[key] && typeof this.currentProduct[key] === "object") {
                    return Object.keys(this.currentProduct[key]).some(
                        childKey => this.currentProduct[key][childKey] !== this.initCurrentProduct[key][childKey]
                    );
                } else {
                    return this.currentProduct[key] !== this.initCurrentProduct[key];
                }
            });
        },
        removeImagesUrlItemData(key) {
            this.currentProduct.imagesUrl[key] = "";
            this.isInputErr.imagesUrl[key] = false;
        },
        addOrEditProduct() {
            this.isLoading = true;
            this.currentProduct.imagesUrl = Object.values(this.currentProduct.imagesUrl).filter(value => value);
            const data = { data: this.currentProduct };
            if (!this.currentProduct.id) {
                this.$http
                    .post(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/product`, data)
                    .then(res => {
                        this.closeModal("success", res.data.message);
                    })
                    .catch(error => {
                        // console.dir(error);
                        this.closeModal("error", error.response.data.message);
                    });
            } else {
                this.$http
                    .put(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${this.currentProduct.id}`, data)
                    .then(res => {
                        this.closeModal("success", res.data.message);
                    })
                    .catch(error => {
                        // console.dir(error);
                        this.closeModal("error", error.response.data.message);
                    });
            }
        },
        handleChildUploadData(data) {
            const { dataKey, isInputErr, uploadImgUrl } = data;
            if (dataKey === "imageUrl") {
                this.currentProduct.imageUrl = uploadImgUrl;
                this.isInputErr.imageUrl = isInputErr;
            } else {
                this.currentProduct.imagesUrl[dataKey] = uploadImgUrl;
                this.isInputErr.imagesUrl[dataKey] = isInputErr;
            }
        }
    },
    components: {
        UploadImg
    },
    props: {
        product: {
            type: Object,
            required: false
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div
        class="modal fade"
        tabindex="-1"
        id="productModal"
        aria-labelledby="productModalLabel"
        :data-bs-backdrop="isLoading ? true : 'static'"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">{{ currentProduct?.id ? "修改" : "新增" }}產品</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :disabled="isLoading"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <fieldset :disabled="isLoading">
                            <div class="row g-3 pb-3">
                                <div class="col-12">
                                    <label for="inputTitle" class="form-label d-flex align-items-center"
                                        >{{ formsSchema.product_title.name }}
                                        <span class="text-danger" v-if="formsSchema.product_title.validates.isRequired"> *</span
                                        ><small
                                            class="ms-auto"
                                            :class="[
                                                currentProduct?.title?.length === formsSchema.product_title.validates.maxlength
                                                    ? 'text-danger'
                                                    : 'text-muted'
                                            ]"
                                        >
                                            {{ currentProduct?.title?.length }}/{{ formsSchema.product_title.validates.maxlength }}</small
                                        >
                                    </label>
                                    <input
                                        :type="formsSchema.product_title.type"
                                        class="form-control"
                                        id="inputTitle"
                                        aria-describedby="titleHelp"
                                        v-model.trim.lazy="currentProduct.title"
                                        :required="formsSchema.product_title.validates.isRequired"
                                        :maxlength="formsSchema.product_title.validates.maxlength"
                                        :class="{ 'is-invalid': isInputErr?.title }"
                                    />
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.title }">
                                        {{ formsSchema.product_title.error }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCategory" class="form-label d-flex align-items-center"
                                        >{{ formsSchema.product_category.name
                                        }}<span class="text-danger" v-if="formsSchema.product_category.validates.isRequired">* </span
                                        ><small
                                            class="ms-auto"
                                            :class="[
                                                currentProduct?.category?.length === formsSchema.product_category.validates.maxlength
                                                    ? 'text-danger'
                                                    : 'text-muted'
                                            ]"
                                            >{{ currentProduct?.category?.length }}/{{ formsSchema.product_category.validates.maxlength }}</small
                                        >
                                    </label>
                                    <input
                                        :type="formsSchema.product_category.type"
                                        class="form-control"
                                        id="inputCategory"
                                        aria-describedby="categoryHelp"
                                        v-model.trim.lazy="currentProduct.category"
                                        :required="formsSchema.product_category.validates.isRequired"
                                        :class="{ 'is-invalid': isInputErr?.category }"
                                        :maxlength="formsSchema.product_category.validates.maxlength"
                                    />
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.category }">
                                        {{ formsSchema.product_category.error }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputAD_type" class="form-label d-flex align-items-center"
                                        >{{ formsSchema.product_AD_type.name
                                        }}<span class="text-danger" v-if="formsSchema.product_AD_type.validates.isRequired">* </span>
                                    </label>
                                    <select
                                        id="inputAD_type"
                                        class="form-select"
                                        :multiple="formsSchema.product_AD_type.isMultiple"
                                        v-model="currentProduct.AD_type"
                                    >
                                        <option selected value="">請選擇</option>
                                        <option :value="option.value" v-for="option in formsSchema.product_AD_type.options" :key="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row g-3 pb-3">
                                <label for="inputImageUrl" class="form-label"
                                    >{{ formsSchema.product_imageUrl.name
                                    }}<span class="text-danger" v-if="formsSchema.product_imageUrl.validates.isRequired">* </span>
                                </label>
                                <div class="col-auto mt-0">
                                    <UploadImg
                                        :is-required="true"
                                        data-key="imageUrl"
                                        :image-url="currentProduct.imageUrl"
                                        @update-image="handleChildUploadData"
                                    />
                                </div>
                            </div>
                            <div class="row g-3 pb-3">
                                <label for="inputImagesUrl" class="form-label"
                                    >{{ formsSchema.product_imagesUrl.name
                                    }}<span class="text-danger" v-if="formsSchema.product_imagesUrl.validates.isRequired">* </span>
                                </label>
                                <div class="col-auto mt-0 d-flex flex-column" v-for="(imageUrl, key) in currentProduct.imagesUrl" :key="key">
                                    <upload-img :data-key="key" :image-url="imageUrl" @update-image="handleChildUploadData"></upload-img>
                                    <button
                                        type="button"
                                        class="btn btn-link btn-sm text-danger text-decoration-none"
                                        @click="removeImagesUrlItemData(key)"
                                        v-if="imageUrl && imagesUrlHasDataTotal !== 0"
                                    >
                                        刪除
                                    </button>
                                </div>
                            </div>
                            <div class="row g-3 pb-3">
                                <div class="col-12">
                                    <label for="textareaDescription" class="form-label"
                                        >{{ formsSchema.product_description.name
                                        }}<span class="text-danger" v-if="formsSchema.product_description.validates.isRequired">*</span>
                                    </label>
                                    <textarea
                                        rows="10"
                                        class="form-control"
                                        id="textareaDescription"
                                        v-model.trim.lazy="currentProduct.description"
                                        :required="formsSchema.product_description.validates.isRequired"
                                        :class="{ 'is-invalid': isInputErr?.description }"
                                    ></textarea>
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.description }">
                                        {{ formsSchema.product_description.error }}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="textareaContent" class="form-label"
                                        >{{ formsSchema.product_content.name
                                        }}<span class="text-danger" v-if="formsSchema.product_content.validates.isRequired">*</span>
                                    </label>
                                    <textarea
                                        rows="3"
                                        class="form-control"
                                        id="textareaContent"
                                        v-model.trim.lazy="currentProduct.content"
                                        :required="formsSchema.product_content.validates.isRequired"
                                        :class="{ 'is-invalid': isInputErr?.content }"
                                    ></textarea>
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.content }">
                                        {{ formsSchema.product_content.error }}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputUnit" class="form-label"
                                        >{{ formsSchema.product_unit.name
                                        }}<span class="text-danger" v-if="formsSchema.product_unit.validates.isRequired">* </span>
                                    </label>
                                    <input
                                        :type="formsSchema.product_unit.type"
                                        class="form-control"
                                        id="inputUnit"
                                        aria-describedby="unitHelp"
                                        v-model.trim.lazy="currentProduct.unit"
                                        :required="formsSchema.product_unit.validates.isRequired"
                                        :class="{ 'is-invalid': isInputErr?.unit }"
                                    />
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.unit }">{{ formsSchema.product_unit.error }}</div>
                                </div>
                            </div>
                            <div class="row g-3 pb-3">
                                <div class="col-md-4">
                                    <label for="inputOrigin_price" class="form-label"
                                        >{{ formsSchema.product_origin_price.name
                                        }}<span class="text-danger" v-if="formsSchema.product_origin_price.validates.isRequired">* </span>
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input
                                            :type="formsSchema.product_origin_price.type"
                                            class="form-control"
                                            id="inputOrigin_price"
                                            aria-describedby="origin_priceHelp"
                                            v-model.trim.number.lazy="currentProduct.origin_price"
                                            :required="formsSchema.product_origin_price.validates.isRequired"
                                            :min="formsSchema.product_origin_price.validates.min"
                                            :class="{ 'is-invalid': isInputErr?.origin_price }"
                                        />
                                    </div>
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.origin_price }">
                                        {{ formsSchema.product_origin_price.error }}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputPrice" class="form-label"
                                        >{{ formsSchema.product_price.name
                                        }}<span class="text-danger" v-if="formsSchema.product_price.validates.isRequired">* </span>
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input
                                            :type="formsSchema.product_price.type"
                                            class="form-control"
                                            id="inputPrice"
                                            aria-describedby="priceHelp"
                                            v-model.trim.number.lazy="currentProduct.price"
                                            :required="formsSchema.product_price.validates.isRequired"
                                            :min="formsSchema.product_price.validates.min"
                                            :class="{ 'is-invalid': isInputErr?.price }"
                                        />
                                    </div>
                                    <div class="invalid-feedback" :class="{ 'd-block': isInputErr?.price }">
                                        {{ formsSchema.product_price.error }}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3 pb-3">
                                <div class="col-12">
                                    <label class="form-label d-block"
                                        >{{ formsSchema.product_is_enabled.name
                                        }}<span class="text-danger" v-if="formsSchema.product_is_enabled.validates.isRequired">*</span>
                                    </label>
                                    <div
                                        class="form-check form-check-inline"
                                        v-for="(option, index) in formsSchema.product_is_enabled.options"
                                        :key="option.value"
                                    >
                                        <input
                                            class="form-check-input"
                                            :value="option.value"
                                            type="radio"
                                            name="is_enabledRadio"
                                            :id="'is_enabledRadio-' + index"
                                            v-model="currentProduct.is_enabled"
                                        />
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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="isLoading">取消</button>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isLoading || !isInputChangeValue || inputHasErr"
                        @click="addOrEditProduct"
                    >
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
                        {{ currentProduct?.id ? "修改" : "新增" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
