<script>
import { Form, Field, ErrorMessage } from "vee-validate";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            isLoadingBtn: false,
            user: {
                name: "",
                email: "",
                tel: "",
                address: ""
            },
            message: ""
        };
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    methods: {
        restoreDefault() {
            this.user = {
                name: "",
                email: "",
                tel: "",
                address: ""
            };

            this.message = "";
        },
        onSubmitOrder() {
            this.isLoadingBtn = true;
            const data = {
                user: this.user,
                message: this.message
            };

            this.$http
                .post(`${VITE_API_URL}/api/${VITE_API_PATH}/order`, { data })
                .then(() => {
                    this.isLoadingBtn = false;
                    this.restoreDefault();
                    this.$emit("getCart");
                    this.$refs.sweetalert.showSwal("popup", "success", "訂單建立成功");
                })
                .catch(error => {
                    // console.dir(error);
                    this.isLoadingBtn = false;
                    this.$refs.sweetalert.showSwal("popup", "error", error.response.data.message);
                });
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/;
            return phoneNumber.test(value) ? true : "必填欄位。手機號碼共 9 碼，且為 09 開頭";
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <Form v-slot="{ errors }" @submit="onSubmitOrder">
        <fieldset :disabled="isLoadingBtn">
            <div class="row gy-4">
                <div class="col-md-6">
                    <label for="emailInput" class="form-label">Email<span class="text-danger">*</span></label>
                    <Field
                        id="emailInput"
                        name="Email"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors['Email'] }"
                        placeholder="請輸入 Email"
                        rules="email|required"
                        v-model="user.email"
                    ></Field>
                    <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-md-6">
                    <label for="nameInput" class="form-label">收件人姓名<span class="text-danger">*</span></label>
                    <Field
                        id="nameInput"
                        name="姓名"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['姓名'] }"
                        placeholder="請輸入姓名"
                        rules="required"
                        v-model="user.name"
                    ></Field>
                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-md-6">
                    <label for="telInput" class="form-label">收件人手機號碼<span class="text-danger">*</span></label>
                    <Field
                        id="telInput"
                        name="手機號碼"
                        type="tel"
                        class="form-control"
                        :class="{ 'is-invalid': errors['手機號碼'] }"
                        placeholder="請輸入手機號碼"
                        :rules="isPhone"
                        v-model="user.tel"
                    ></Field>
                    <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-md-6">
                    <label for="addressInput" class="form-label">收件人地址<span class="text-danger">*</span></label>
                    <Field
                        id="addressInput"
                        name="地址"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址"
                        rules="required"
                        v-model="user.address"
                    ></Field>
                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-12">
                    <label for="messageTextarea" class="form-label">留言</label>
                    <Field v-model="message" name="留言" as="textarea" class="form-control" id="messageTextarea"></Field>
                </div>
            </div>
            <button class="btn btn-primary w-100 mt-4" type="submit" :disabled="isLoadingBtn">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoadingBtn"></span>
                送出訂單
            </button>
        </fieldset>
    </Form>
</template>
