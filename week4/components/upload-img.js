export default {
    data() {
        return {
            imgUrl: '',
            errMsgs: []
        }
    },
    methods: {
        upload(event){
            const file = event.target.files[0];
            console.log(file)
            console.log(file.type)
            // 檢查格式
            const regex = new RegExp('^image\/(png|jpg|jpeg)$');
            if(!regex.test(file.type)){
                this.errMsgs.push('圖片檔案不符，須為 png、jpg、jpg');
            }
            

        }
    },
    template: `<div class="mb-3">
    <input class="form-control" type="file" accept="image/*" @change="upload($event)">
  </div>`
}