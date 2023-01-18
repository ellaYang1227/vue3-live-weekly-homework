import { url, path } from '../../data/data.js';
import { formsSchema } from '../../data/forms-schema.js';
import { swalWithBootstrapButtons } from '../../data/sweetalert2.js';

export default {
    data() {
        return {
            formsSchema,
            uploadImgUrl: '',
            errMsgs: [],
            isLoading: false
        }
    },
    watch:{
        imageUrl(){
            console.log(this.imageUrl)
            this.uploadImgUrl = this.imageUrl;
            console.log(this.uploadImgUrl)
        }
    },
    methods: {
        validatesUploadfile(event){
            this.isLoading = true;
            this.errMsgs = [];
            const { data, type, size } = this.formsSchema.upload_img.validates;
            const file = event.target.files[0];

            if(!file){
                this.errMsgs.push(data);
            }else{
                // 檢查格式
                const regex = new RegExp('^image\/(png|jpg|jpeg)$');
                if(!regex.test(file.type)){
                    this.errMsgs.push(type);
                }
    
                // 檢查檔案大小 小於等於 1 mb
                if(file.size / 1024 / 1024 > 1){
                    this.errMsgs.push(size);
                }
            }
            
            if(!this.errMsgs.length){ 
                this.upload(file); 
            }else{
                this.setSwalError();
            }
        },
        upload(file){
            const formData = new FormData();
            formData.append('file-to-upload', file);

            axios
                .post(`${url}/api/${path}/admin/upload`, formData)
                .then(res => {
                    console.log(res)
                    const { success, imageUrl } = res.data;
                    if(success){
                        this.uploadImgUrl = imageUrl;
                        this.emitData();
                    }else{
                        this.setSwalError();
                    }
                })
                .catch(error => {
                    console.dir(error);
                    this.setSwalError(error.response.data.message);
                });
        },
        emitData(){
            const data = {
                dataKey: this.dataKey,
                uploadImgUrl: this.uploadImgUrl,
                isInputErr: this.errMsgs.length || this.isRequired && !this.uploadImgUrl ? true : false
            };

            console.log(data)
            this.isLoading = false;
            this.$emit('update-image', data);
        },
        setSwalError(error){
            let html = error;
            if(this.errMsgs.length){
                html = this.errMsgs.reduce((accumulator, currentValue) => {
                    return accumulator + `<li>${currentValue}</li>`
                }, '');

                html = `<ul class="list-unstyled">${html}</ul>`;
            }
            swalWithBootstrapButtons.fire({
                icon: 'error',
                title: '上傳失敗',
                html,
                timer: null
            });

            this.uploadImgUrl = '';
            this.emitData();
        }
    },
    props:{
        imageUrl: String,
        dataKey: {
            type: String,
            required: true,
        },
        isRequired:{
            type: Boolean,
            default: false
        }
    },
    template: `<label class="file-img rounded p-1" :class="{ 'border-danger': errMsgs.length || isRequired && !uploadImgUrl }">
                <input class="form-control d-none" :type="formsSchema.upload_img.type" :accept="formsSchema.upload_img.accept" @change="validatesUploadfile($event)">
                <div class="bg-light w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    圖{{ uploadImgUrl }}<br/>imageUrl: {{ imageUrl }}<br/>dataKey: {{ dataKey }}
                    <template v-if="!isLoading">
                        <img :src="uploadImgUrl" v-if="uploadImgUrl">
                        <i v-else class="fa-solid fa-arrow-up-from-bracket fa-2x text-muted opacity-50"></i>
                    </template>
                    <div v-else class="d-flex flex-column align-items-center justify-content-center opacity-50 text-secondary">
                        <div class="spinner-border" role="status" aria-hidden="true"></div>
                        <small class="pt-1">Loading...</small>
                    </div>
                </div>
            </label>`
}