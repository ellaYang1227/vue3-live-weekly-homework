<script>
import { formsSchema } from "../data/forms-schema.js";
import { swalPopupOptions } from "../data/Sweetalert2-options.js";
const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            formsSchema,
            uploadImgUrl: "",
            errMsgs: [],
            isLoading: false
        };
    },
    mounted() {
        this.uploadImgUrl = this.imageUrl;
    },
    watch: {
        imageUrl() {
            this.uploadImgUrl = this.imageUrl;
        }
    },
    methods: {
        validatesUploadfile(event) {
            this.isLoading = true;
            this.errMsgs = [];
            const { data, type, size } = this.formsSchema.upload_img.validates;
            const file = event.target.files[0];

            if (!file) {
                this.errMsgs.push(data);
            } else {
                // 檢查格式
                const regex = new RegExp("^image/(png|jpg|jpeg)$");
                if (!regex.test(file.type)) {
                    this.errMsgs.push(type);
                }

                // 檢查檔案大小 小於等於 1 mb
                if (file.size / 1024 / 1024 > 1) {
                    this.errMsgs.push(size);
                }
            }

            if (!this.errMsgs.length) {
                this.upload(file);
            } else {
                this.setSwalError();
            }
        },
        upload(file) {
            const formData = new FormData();
            formData.append("file-to-upload", file);

            this.$http
                .post(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/upload`, formData)
                .then(res => {
                    const { success, imageUrl } = res.data;
                    if (success) {
                        this.uploadImgUrl = imageUrl;
                        this.emitData();
                    } else {
                        this.setSwalError();
                    }
                })
                .catch(error => {
                    // console.dir(error);
                    this.setSwalError(error.response.data.message);
                });
        },
        emitData() {
            const data = {
                dataKey: this.dataKey,
                uploadImgUrl: this.uploadImgUrl,
                isInputErr: this.isRequired && (this.errMsgs.length || !this.uploadImgUrl) ? true : false
            };

            this.isLoading = false;
            this.$emit("update-image", data);
        },
        setSwalError(error) {
            let html = error;
            if (this.errMsgs.length) {
                html = this.errMsgs.reduce((accumulator, currentValue) => {
                    return accumulator + `<li>${currentValue}</li>`;
                }, "");

                html = `<ul class="list-unstyled">${html}</ul>`;
            }

            const addOptions = {
                icon: "error",
                title: "上傳失敗",
                html,
                timer: null
            };

            this.$swal({ ...swalPopupOptions, ...addOptions });

            this.uploadImgUrl = "";
            this.emitData();
        }
    },
    props: {
        imageUrl: {
            type: String,
            required: false
        },
        dataKey: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            default: false
        }
    },
    emits: ["update-image"]
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <label class="file-img rounded p-1" :class="{ 'border-danger': isRequired && (!uploadImgUrl || errMsgs.length) }">
        <input
            class="form-control d-none"
            :type="formsSchema.upload_img.type"
            :accept="formsSchema.upload_img.accept"
            @change="validatesUploadfile($event)"
        />
        <div class="bg-light w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <template v-if="!isLoading">
                <img :src="uploadImgUrl" v-if="uploadImgUrl" />
                <font-awesome-icon v-else size="2x" icon="fa-solid fa-arrow-up-from-bracket" class="text-muted opacity-50" />
            </template>
            <div v-else class="d-flex flex-column align-items-center justify-content-center opacity-50 text-secondary">
                <div class="spinner-border" role="status" aria-hidden="true"></div>
                <small class="pt-1">Loading...</small>
            </div>
        </div>
    </label>
</template>
<style lang="scss">
.file-img {
    width: 120px;
    height: 120px;
    cursor: pointer;
    border: 1px dashed #ced4da;
}

.file-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.file-img:hover {
    border-color: #0d6efd;
}
</style>
