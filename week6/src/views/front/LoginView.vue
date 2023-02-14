<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapActions } from "pinia";
import { LoadingStore } from "../../stores/LoadingStore.js";
import { AuthStore } from "../../stores/AuthStore.js";
import SweetalertComponent from "../../components/SweetalertComponent.vue";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
const adminProductsUrl = "/admin/products";

export default {
    data() {
        return {
            title: "登入",
            user: {
                username: "",
                password: ""
            }
        };
    },
    beforeRouteEnter(to, from, next) {
        const { getToken } = AuthStore();
        if (!getToken()) {
            next();
        } else {
            next(adminProductsUrl);
        }
    },
    mounted() {
        this.hideLoading();
    },
    components: {
        Form,
        Field,
        ErrorMessage,
        SweetalertComponent
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"]),
        signin() {
            this.showLoading();
            this.$http
                .post(`${VITE_API_URL}/admin/signin`, this.user)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `${VITE_API_PATH}-token=${token}; expires=${new Date(expired)}`;
                    this.$router.push(adminProductsUrl);
                })
                .catch(error => {
                    // console.dir(error);
                    this.hideLoading();
                    const errMsg = error.response.data.error.message;
                    let err = "";
                    if (errMsg.match("user may have been deleted")) {
                        err = "找不到此用戶";
                    } else if (errMsg.match("password")) {
                        err = "密碼錯誤";
                    }

                    this.$refs.sweetalert.showSwal("popup", "error", err);
                });
        },
        isPassword(value) {
            const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
            return pattern.test(value) ? true : "必填欄位，密碼需至少 8 碼以上，並英數混合";
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-xl-4">
                <div class="card">
                    <div class="card-body py-4">
                        <h5 class="card-title h4 mb-3 text-muted">{{ title }}</h5>
                        <Form v-slot="{ errors }" @submit="signin">
                            <div class="mb-3">
                                <label for="emailInput" class="form-label">Email<span class="text-danger">*</span></label>
                                <Field
                                    id="emailInput"
                                    name="Email"
                                    type="email"
                                    class="form-control"
                                    :class="{ 'is-invalid': errors['Email'] }"
                                    placeholder="請輸入 Email"
                                    rules="email|required"
                                    v-model="user.username"
                                ></Field>
                                <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
                            </div>
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label">密碼<span class="text-danger">*</span></label>
                                <Field
                                    id="passwordInput"
                                    name="密碼"
                                    type="password"
                                    class="form-control"
                                    :class="{ 'is-invalid': errors['密碼'] }"
                                    placeholder="請輸入密碼"
                                    :rules="isPassword"
                                    v-model="user.password"
                                ></Field>
                                <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
                                <div class="invalid-feedback d-block text-muted" v-if="!errors['密碼']">密碼需至少 8 碼以上，並英數混合</div>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mt-3">{{ title }}</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
