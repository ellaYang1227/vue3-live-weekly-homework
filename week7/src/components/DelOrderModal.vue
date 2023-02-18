<script>
import * as bootstrap from "bootstrap";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

let delOrderModal = null;

export default {
    data() {
        return {
            isLoading: false
        };
    },
    mounted() {
        delOrderModal = new bootstrap.Modal(document.getElementById("delOrderModal"), { keyboard: false });
    },
    methods: {
        openModal() {
            delOrderModal.show();
        },
        closeModal(state, message) {
            this.isLoading = false;
            delOrderModal.hide();

            if (state === "success") {
                this.$emit("get-orders");
            }

            setTimeout(() => {
                const title = `刪除${state === "success" ? "成功" : "失敗"}`;
                this.$refs.sweetalert.showSwal("popup", "error", title, message);
            }, 500);
        },
        delOrder() {
            this.isLoading = true;
            this.$http
                .delete(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/order/${this.order.id}`)
                .then(res => {
                    this.closeModal("success", res.data.message);
                })
                .catch(error => {
                    // console.dir(error);
                    this.closeModal("error", error.response.data.message);
                });
        }
    },
    props: {
        order: {
            type: Object,
            required: true
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div
        class="modal fade"
        tabindex="-1"
        id="delOrderModal"
        aria-labelledby="delOrderModalLabel"
        :data-bs-backdrop="isLoading ? true : 'static'"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">刪除訂單</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" :disabled="isLoading"></button>
                </div>
                <div class="modal-body">
                    <p>
                        請確認是否<strong>刪除「{{ order?.id }}」訂單</strong>，刪除後您再也無法復原？
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="isLoading">否</button>
                    <button type="button" class="btn btn-danger" @click="delOrder" :disabled="isLoading">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
                        是，確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
