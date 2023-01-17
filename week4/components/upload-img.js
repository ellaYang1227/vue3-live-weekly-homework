import { url, path } from '../../data/data.js';
import { formsSchema } from '../../data/forms-schema.js';
import { swalWithBootstrapButtons } from '../../data/sweetalert2.js';

export default {
    data() {
        return {
            formsSchema,
            uploadImgUrl: '',
            errMsgs: []
        }
    },
    watch:{
        imageUrl(){
            this.uploadImgUrl = this.imageUrl;
        }
    },
    methods: {
        validatesUploadfile(event){
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
                this.$emit('update-image-url', '');
            }
        },
        upload(file){
            this.uploadImgUrl = 'https://storage.googleapis.com/vue-course-api.appspot.com/ella-diving/1673957921444.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=S3SmQhKS35%2B6mbxqq2D7caDpurRZIAvSlnnAc1Oj2CybQEMBhmXpmGUdXwvUKADBkRy6l6BL6E8DaehachbONgbGCIXtjlUXNba%2FcMQKLI3tP3VYo2wwL091Y3HVqIRUeDhG6lwkt9YqYEO3M%2B3k9RoRwpPGdOh2ZlBQ6WHqrXYbCr2lRriamT2gRgYngSKD%2FkuPGkOOZFAbGRjZ4On5ddpFxf%2FyGdhMXqqVRkhoXE9CLgY3w8E%2BHS9mOf3mVfxTjwttxlgyPh%2B5UxZAjllIBCaibUfhFmGUf8FEYmPbVvEzxPlZmKnSJkqQ89cz0tH4i5jyEK0tSO%2BOVfNO0UCCqg%3D%3D'
            // let formData = new FormData();
            // formData.append('file-to-upload', file);

            // axios
            //     .post(`${url}/api/${path}/admin/upload`, formData)
            //     .then(res => {
            //         this.uploadImgUrl = res;
            //         this.$emit('update-image-url', this.uploadImgUrl);
            //     })
            //     .catch(error => {
            //         console.dir(error);
            //         this.$emit('update-image-url', this.uploadImgUrl);
            //         swalWithBootstrapButtons.fire({
            //             icon: 'error',
            //             title: error.response.data.message
            //         });
            //     });
            this.$emit('update-image-url', this.uploadImgUrl);
        }
    },
    props:{
        imageUrl: String,
        isRequired:{
            type: Boolean,
            default: false
        }
    },
    template: `<label class="file-img rounded p-1" :class="{ 'border-danger': errMsgs.length || isRequired && !uploadImgUrl }">
                <input class="form-control d-none" :type="formsSchema.upload_img.type" :accept="formsSchema.upload_img.accept" @change="validatesUploadfile($event)">
                <div class="bg-light w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <img :src="uploadImgUrl" v-if="uploadImgUrl">
                    <i v-else class="fa-solid fa-arrow-up-from-bracket fa-2x text-muted opacity-50"></i>
                </div>
            </label>
            <ul class="list-unstyled invalid-feedback mb-0" :class="{ 'd-block': errMsgs.length }">
              <li v-for="errMsg in errMsgs" :key="errMsg">{{ errMsg }}</li>
            </ul>`
}