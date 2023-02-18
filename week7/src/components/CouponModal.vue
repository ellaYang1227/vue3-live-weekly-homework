<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as bootstrap from "bootstrap";
import { mapActions } from "pinia";
import { CouponStore } from "../stores/CouponStore.js";

let couponModal = null;

export default {
    data() {
        return {
            currentCoupon: {},
            isLoading: false
        };
    },
    mounted() {
        couponModal = new bootstrap.Modal(document.getElementById("couponModal"), { keyboard: false });
        this.setDefaultCurrentCoupon();
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    watch: {
        coupon() {
            this.setDefaultCurrentCoupon();
            if (this.coupon.id) {
                this.currentCoupon = this.coupon;
                this.currentCoupon.due_date = this.handleDue_date(this.currentCoupon.due_date);
                const re = /\//gi;
                this.currentCoupon.due_date = this.currentCoupon.due_date.replace(re, "-");
            }
        }
    },
    methods: {
        ...mapActions(CouponStore, ["addCoupon", "editCoupon"]),
        setDefaultCurrentCoupon() {
            this.currentCoupon = {
                title: "",
                is_enabled: 1,
                percent: 10,
                code: "",
                due_date: ""
            };
        },
        openModal() {
            couponModal.show();
        },
        addOrEditProduct() {
            const data = { ...this.currentCoupon };
            data.due_date = new Date(data.due_date).getTime() / 1000;
            this.isLoading = true;
            if (!data.id) {
                this.addCoupon(data).then(success => {
                    this.isLoading = false;
                    if (success) {
                        couponModal.hide();
                    }
                });
            } else {
                this.editCoupon(data.id, data, this.page).then(success => {
                    this.isLoading = false;
                    if (success) {
                        couponModal.hide();
                    }
                });
            }
        },
        isDueDate(value) {
            return new Date(value) >= new Date() ? true : "必填欄位。不能小於今天";
        }
    },
    props: {
        coupon: {
            type: Object,
            required: false
        },
        handleDue_date: {
            type: Function,
            required: true
        },
        page: {
            type: Number,
            required: true
        }
    }
};
</script>

<template>
    <div
        class="modal fade"
        tabindex="-1"
        id="couponModal"
        aria-labelledby="couponModalLabel"
        :data-bs-backdrop="isLoading ? true : 'static'"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">{{ currentCoupon?.id ? "修改" : "新增" }}優惠券</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :disabled="isLoading"></button>
                </div>
                <Form v-slot="{ errors }" @submit="addOrEditProduct">
                    <fieldset :disabled="isLoading">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="titleInput" class="form-label">名稱<span class="text-danger">*</span></label>
                                <Field
                                    id="titleInput"
                                    name="名稱"
                                    type="text"
                                    class="form-control"
                                    :class="{ 'is-invalid': errors['名稱'] }"
                                    placeholder="請輸入名稱"
                                    rules="required"
                                    v-model="currentCoupon.title"
                                ></Field>
                                <ErrorMessage name="名稱" class="invalid-feedback"></ErrorMessage>
                            </div>
                            <div class="mb-3">
                                <label for="codeInput" class="form-label">優惠碼<span class="text-danger">*</span></label>
                                <Field
                                    id="codeInput"
                                    name="優惠碼"
                                    type="text"
                                    class="form-control"
                                    :class="{ 'is-invalid': errors['優惠碼'] }"
                                    placeholder="請輸入優惠碼"
                                    rules="required"
                                    v-model="currentCoupon.code"
                                ></Field>
                                <ErrorMessage name="優惠碼" class="invalid-feedback"></ErrorMessage>
                            </div>
                            <div class="mb-3">
                                <label for="due_dateInput" class="form-label">到期日<span class="text-danger">*</span></label>
                                <Field
                                    id="due_dateInput"
                                    name="到期日"
                                    type="date"
                                    class="form-control"
                                    :class="{ 'is-invalid': errors['到期日'] }"
                                    placeholder="請輸入到期日"
                                    :rules="isDueDate"
                                    v-model="currentCoupon.due_date"
                                ></Field>
                                <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                            </div>
                            <div class="mb-3">
                                <label for="codeInput" class="form-label">折扣(%)<span class="text-danger">*</span></label>
                                <Field
                                    id="codeInput"
                                    name="折扣"
                                    type="number"
                                    class="form-control"
                                    :class="{ 'is-invalid': errors['折扣'] }"
                                    placeholder="請輸入折扣(%)"
                                    rules="required|min_value:0|max_value:100|integer"
                                    v-model.number="currentCoupon.percent"
                                ></Field>
                                <ErrorMessage name="折扣" class="invalid-feedback"></ErrorMessage>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        :true-value="1"
                                        :false-value="0"
                                        v-model="currentCoupon.is_enabled"
                                        id="is_enabledCheckbox"
                                    />
                                    <label class="form-check-label ms-1" for="is_enabledCheckbox"> 是否啟用</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal" :disabled="isLoading">取消</button>
                            <button type="submit" class="btn btn-primary" :disabled="isLoading || Object.keys(errors).length">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
                                {{ currentCoupon?.id ? "修改" : "新增" }}
                            </button>
                        </div>
                    </fieldset>
                </Form>
            </div>
        </div>
    </div>
</template>
