import { url, path } from '../../data/data.js';
import { formsSchema } from '../../data/forms-schema.js';
import { swalWithBootstrapButtons } from '../../data/sweetalert2.js';
import uploadImg from './upload-img.js';

let productModal = null;
const img = 'https://storage.googleapis.com/vue-course-api.appspot.com/ella-diving/1674041258536.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lFu5sWiDqiTpdXRnTy7JDxehQutHo%2BUiMCzUWG1YMKiBog8n%2BheIHZ%2BxK2AyImQEBroKAtGj6ATRzxT8l%2FfwN49Ztc5GqHFTnAHsuSlH07IJN9CH6h%2Bw2Q%2BbYFM%2FjmRh%2FkSZmfaK2nxyestH9FZ1xJtiecI2TS0xPiuXk%2FRncf%2BW4iBRf62tlEK6lfTQt20CytCSEnrE6wYBKQq49nGKyngZ%2FssMSHUOLcxSpQ3cedXRj7dM52podap1pM9j6flGZ1qdihTpQrkv2QcDqrSPz2DQSQDYrJ4gtVeAYrHw5fYzx%2BbQtz6kwF96cj0yjp0HzNW0ylSoCneY2We0COtnkw%3D%3D'
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
        productModal = new bootstrap.Modal(
            document.getElementById('productModal'),
            { keyboard: false }
        );

        this.isInputErr = {};
        const imagesUrl = {};
        for (let i = 0; i < 5; i++) {
            imagesUrl[`img${i + 1}`] = { 
                show: i === 0 ? true : false,
                imageUrl: ''
            };
        }
        
        this.currentProduct = {
            title: '',
            category: '',
            AD_type: '',
            origin_price: null,
            price: null,
            unit: '',
            description: '',
            content: '',
            imageUrl: '',
            imagesUrl,
            is_enabled: 1,
        };

        console.log('this.currentProduct', this.currentProduct)
    },
    watch: {
        product: {
            handler() {
                console.log('product', this.product)
                const timestamp = this.timestamp();
                // this.isInputErr = {};
                // this.currentProduct = {
                //     title: '',
                //     category: '',
                //     AD_type: '',
                //     origin_price: null,
                //     price: null,
                //     unit: '',
                //     description: '',
                //     content: '',
                //     imageUrl: '',
                //     imagesUrl: {
                //         [`${timestamp}0`]: '',
                //         [`${timestamp}1`]: '',
                //         [`${timestamp}2`]: '',
                //         [`${timestamp}3`]: '',
                //         [`${timestamp}4`]: ''
                //     },
                //     is_enabled: 1,
                // };

                if(this.product){
                    const keys = Object.keys(this.currentProduct);
                    keys.forEach(key => {
                        if(key !== 'imagesUrl'){
                            this.currentProduct[key] = this.product[key];
                        }else{
                            const imagesUrlKeys = Object.keys(this.currentProduct.imagesUrl);
                            imagesUrlKeys.forEach((imagesUrlKey, index) => {
                                const imageUrl = this.product.imagesUrl ? this.product.imagesUrl[index] : '';
                                this.currentProduct.imagesUrl[imagesUrlKey].imageUrl = imageUrl;
                                this.currentProduct.imagesUrl[imagesUrlKey].show = imageUrl ? true : false;
                            });
                        }
                    });
                    // console.log(this.currentProduct)
                    // this.currentProduct = { ...this.product };
                    // if (!this.currentProduct.imagesUrl) {
                    //     //this.currentProduct.imagesUrl = { [timestamp]: '' };
                    // } else {
                    //     console.log(this.currentProduct)
                    //     this.currentProduct.imagesUrl =
                    //         this.product.imagesUrl.reduce(
                    //             (accumulator, currentValue, currentIndex) => {
                    //                 accumulator[currentIndex] = currentValue;
                    //                 return accumulator;
                    //             },
                    //             {}
                    //         );
                    //     const imagesUrl = this.product.imagesUrl.reduce((accumulator, currentValue, currentIndex) => {
                    //         accumulator[currentIndex] = currentValue;
                    //         return accumulator;
                    //     },{});

                    //     this.currentProduct.imagesUrl = Object.assign({}, imagesUrl)
                    //     // console.log('this.currentProduct.imagesUrl', this.currentProduct.imagesUrl, 'imagesUrl', imagesUrl)
                    //     // console.log('this.currentProduct.imagesUrl', this.currentProduct.imagesUrl)
                    // }
                }

                this.currentProduct
                this.initCurrentProduct = JSON.parse(
                    JSON.stringify(this.currentProduct)
                );

                console.log('currentProduct', this.currentProduct)
            }
        },
        currentProduct: {
            handler() {
                const keys = Object.keys(this.currentProduct);
                this.isInputChangeValue = false;
                keys.forEach(key => {
                    if(key === 'AD_type'){
                        this.isInputErr.AD_type = false;
                    }else{
                        if (key === 'imagesUrl') {
                            const imagesUrlKeys = Object.keys(this.currentProduct.imagesUrl);
                            imagesUrlKeys.forEach(imagesUrlKey => {
                                if (!this.isInputErr.imagesUrl) { this.isInputErr.imagesUrl = {} }
                                this.isInputErr.imagesUrl[imagesUrlKey] = false;
                            });
                        } else {
                            this.isInputErr[key] = this.currentProduct[key] || (key === 'is_enabled' && this.currentProduct[key] === 0) ? false : true;
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
                    if (typeof value === 'object') {
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
        openModal() {
            productModal.show();
        },
        closeModal(state, message) {
            this.isLoading = false;
            let title = this.currentProduct.id ? '編輯' : '新增';
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
            this.isInputChangeValue = keys.some(key => {
                if (this.currentProduct[key] && typeof this.currentProduct[key] === 'object') {
                    return Object.keys(this.currentProduct[key]).some(childKey => this.currentProduct[key][childKey] !== this.initCurrentProduct[key][childKey]);
                } else {
                    return (this.currentProduct[key] !== this.initCurrentProduct[key]);
                }
            });
        },
        delImagesUrlItem(key) {
            if (this.currentProduct.imagesUrl.hasOwnProperty(key)) {
                delete this.currentProduct.imagesUrl[key];
                delete this.isInputErr.imagesUrl[key];
            }
        },
        addOrEditProduct() {
            this.isLoading = true;
            this.currentProduct.imagesUrl = Object.values(this.currentProduct.imagesUrl).filter((value) => value);
            const data = { data: this.currentProduct };
            if (!this.currentProduct.id) {
                axios
                    .post(`${url}/api/${path}/admin/product`, data)
                    .then(res => { this.closeModal('success', res.data.message) })
                    .catch(error => {
                        console.dir(error);
                        this.closeModal('error', error.response.data.message);
                    });
            } else {
                axios
                    .put(`${url}/api/${path}/admin/product/${this.currentProduct.id}`, data)
                    .then(res => { this.closeModal('success', res.data.message) })
                    .catch(error => {
                        console.dir(error);
                        this.closeModal('error', error.response.data.message);
                    });
            }
        },
        timestamp() {
            return new Date().getTime();
        },
        handleChildUploadData(data){
            console.log(data)
            const { dataKey, isInputErr, uploadImgUrl } = data;
            if(dataKey === 'imageUrl'){
                this.currentProduct.imageUrl = uploadImgUrl;
                this.isInputErr.imageUrl = isInputErr;
            }else{
                this.currentProduct.imagesUrl[dataKey] = uploadImgUrl;
                this.isInputErr.imagesUrl[dataKey] = isInputErr;
                
                this.addImagesUrlItem();
            }

            console.log('this.isInputErr', this.isInputErr, 'this.currentProduct', this.currentProduct)
        },
        addImagesUrlItem(){
            const allImagesUrl = Object.values(this.currentProduct.imagesUrl);
            if(5 > allImagesUrl.length){
                // 全部 imagesUrl 都有資料，再新增一個新的 imagesUrl
                const allhaveData = allImagesUrl.every(url => url);
                const allDataPass = Object.values(this.isInputErr.imagesUrl).every(isErr => !isErr);
                console.log('allhaveData', allhaveData, 'allDataPass', allDataPass)
                
                if(allhaveData && allDataPass){
                    const timestamp = this.timestamp();
                    this.currentProduct.imagesUrl[timestamp] = '';
                }
            }
        }
    },
    components:{
        uploadImg
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
                                    <span class="text-danger"
                                        v-if="formsSchema.product_title.validates.isRequired">
                                        *</span><small class="ms-auto"
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
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_category.validates.isRequired">*
                                    </span><small class="ms-auto"
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
                            <div class="col-md-6">
                                <label for="inputAD_type" class="form-label d-flex align-items-center">{{
                                    formsSchema.product_AD_type.name
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_AD_type.validates.isRequired">*
                                    </span>
                                </label>
                                <select id="inputAD_type" class="form-select" :multiple="formsSchema.product_AD_type.isMultiple" v-model="currentProduct.AD_type">
                                    <option selected value="">請選擇</option>
                                    <option :value="option.value" v-for="option in formsSchema.product_AD_type.options" :key="option.value">{{ option.label }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <label for="inputImageUrl" class="form-label">{{
                                formsSchema.product_imageUrl.name
                                }}<span class="text-danger"
                                    v-if="formsSchema.product_imageUrl.validates.isRequired">*
                                </span>
                            </label>
                            <div class="col-auto mt-0">
                                <upload-img :is-required="true" data-key="imageUrl" :image-url="currentProduct.imageUrl" @update-image="handleChildUploadData"></upload-img>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <label for="inputImagesUrl" class="form-label">{{
                                formsSchema.product_imagesUrl.name
                                }}<span class="text-danger"
                                    v-if="formsSchema.product_imagesUrl.validates.isRequired">*
                                </span>
                            </label>
                            <div class="col-auto mt-0 flex-column" v-for="(item, key) in currentProduct.imagesUrl" :key="key" :class="item.show ? 'd-flex' : 'd-none'">
                                <upload-img :data-key="key" :image-url="item.imageUrl" @update-image="handleChildUploadData"></upload-img>
                                <button type="button" class="btn btn-link btn-sm text-danger text-decoration-none" @click="delImagesUrlItem(key)" v-if="Object.keys(currentProduct.imagesUrl).length > 1 && imageUrl">刪除</button>
                            </div>
                        </div>
                        <div class="row g-3 pb-3">
                            <div class="col-12">
                                <label for="textareaDescription" class="form-label">{{
                                    formsSchema.product_description.name
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_description.validates.isRequired">*</span>
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
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_content.validates.isRequired">*</span>
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
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_unit.validates.isRequired">*
                                    </span>
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
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_origin_price.validates.isRequired">*
                                    </span>
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
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_price.validates.isRequired">*
                                    </span>
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
                                    }}<span class="text-danger"
                                        v-if="formsSchema.product_is_enabled.validates.isRequired">*</span>
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
                    @click="addOrEditProduct"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
                    {{ currentProduct?.id ? '修改' : '新增' }}</button>
            </div>
        </div>
    </div>
</div>`
};
