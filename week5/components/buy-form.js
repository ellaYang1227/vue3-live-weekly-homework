import { url, path } from '../../data/data.js';
import { swalWithBootstrapButtons } from '../../data/sweetalert2.js';

/* VeeValidate 定義規則 */
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
      VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
/* 加入多國語系 */
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('../../data/zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

export default {
    data() {
        return {
          isLoadingBtn: false,
          user: {
              name: '',
              email: '',
              tel: '',
              address: ''
          },
          message: ''
        };
    },
    methods: {
      restoreDefault(){
        this.user = {
          name: '',
          email: '',
          tel: '',
          address: ''
        };

        this.message = '';
      },
      onSubmitOrder() {
          this.isLoadingBtn = true;
          const data = {
            user: this.user,
            message: this.message
          };

          axios.post(`${url}/api/${path}/order`, { data })
            .then(res => {
                swalWithBootstrapButtons.fire({
                  icon: 'success',
                  title: '訂單建立成功'
                })
                .then(res => {
                  this.isLoadingBtn = false;
                  this.restoreDefault();
                  this.$emit('getCart');
                });
            }).catch(error => {
                // console.dir(error);
                this.isLoadingBtn = false;
                swalWithBootstrapButtons.fire({
                  icon: 'error',
                  title: error.response.data.message
              });
            });
      },
      isPhone(value) {
        const phoneNumber = /^(09)[0-9]{8}$/
        return phoneNumber.test(value) ? true : '必填欄位。手機號碼共 9 碼，且為 09 開頭'
      }
    },
    template: `<v-form v-slot="{ errors }" @submit="onSubmitOrder">
    <fieldset :disabled="isLoadingBtn">
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email<span class="text-danger">*</span></label>
        <v-field id="emailInput" name="Email" type="email" class="form-control"
            :class="{ 'is-invalid': errors['Email'] }" placeholder="請輸入 Email"
            rules="email|required" v-model="user.email"></v-field>
        <error-message name="Email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="nameInput" class="form-label">收件人姓名<span class="text-danger">*</span></label>
        <v-field id="nameInput" name="姓名" type="text" class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名"
            rules="required" v-model="user.name"></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="telInput" class="form-label">收件人手機號碼<span class="text-danger">*</span></label>
        <v-field id="telInput" name="手機號碼" type="text" class="form-control"
            :class="{ 'is-invalid': errors['手機號碼'] }" placeholder="請輸入手機號碼"
            :rules="isPhone" v-model="user.tel"></v-field>
        <error-message name="手機號碼" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="addressInput" class="form-label">收件人地址<span class="text-danger">*</span></label>
        <v-field id="addressInput" name="地址" type="text" class="form-control"
            :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址"
            rules="required" v-model="user.address"></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
      <label for="messageTextarea" class="form-label">留言</label>
        <v-field v-model="message" name="留言" as="textarea" class="form-control" id="messageTextarea"></v-field>
      </div>
      <button class="btn btn-primary w-100" type="submit" :disabled="isLoadingBtn">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoadingBtn"></span>  
        送出訂單
      </button>
      </fieldset>
</v-form>`
};
