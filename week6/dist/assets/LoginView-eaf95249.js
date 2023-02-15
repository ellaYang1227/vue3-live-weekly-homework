import{F as E,a as V,E as k}from"./vee-validate.esm-753632ac.js";import{b9 as x,b8 as I,m as p,u as n,n as e,aK as _,b2 as y,F as A,aw as r,ak as h,a4 as f,l as L,t as b}from"./plugin-vueexport-helper-6502c603.js";import{L as P}from"./LoadingStore-344bc819.js";import{A as F}from"./AuthStore-fb4a3b8d.js";import"./index-c9864ea1.js";import"./vue-router-0d72b5b6.js";const{VITE_API_URL:S,VITE_API_PATH:T}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"ella-diving",BASE_URL:"/vue3-live-weekly-homework/week6/dist/",MODE:"production",DEV:!1,PROD:!0},w="/admin/products",C={data(){return{title:"登入",user:{username:"",password:""}}},beforeRouteEnter(o,s,t){const{getToken:d}=F();d()?t(w):t()},mounted(){this.hideLoading()},components:{Form:E,Field:V,ErrorMessage:k},methods:{...I(P,["showLoading","hideLoading"]),signin(){this.showLoading(),this.$http.post(`${S}/admin/signin`,this.user).then(o=>{const{token:s,expired:t}=o.data;document.cookie=`${T}-token=${s}; expires=${new Date(t)}`,this.$router.push(w)}).catch(o=>{this.hideLoading();const s=o.response.data.error.message;let t="";s.match("user may have been deleted")?t="找不到此用戶":s.match("password")&&(t="密碼錯誤"),this.$refs.sweetalert.showSwal("popup","error",t)})},isPassword(o){return/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(o)?!0:"必填欄位，密碼需至少 8 碼以上，並英數混合"}}},U={class:"container"},D={class:"row justify-content-center"},M={class:"col-md-6 col-xl-4"},R={class:"card"},B={class:"card-body py-4"},N={class:"card-title h4 mb-3 text-muted"},$={class:"mb-3"},z=e("label",{for:"emailInput",class:"form-label"},[b("Email"),e("span",{class:"text-danger"},"*")],-1),H={class:"mb-3"},O=e("label",{for:"passwordInput",class:"form-label"},[b("密碼"),e("span",{class:"text-danger"},"*")],-1),j={key:0,class:"invalid-feedback d-block text-muted"},q={type:"submit",class:"btn btn-primary w-100 mt-3"};function K(o,s,t,d,a,c){const g=r("SweetalertComponent"),m=r("Field"),u=r("ErrorMessage"),v=r("Form");return h(),p(A,null,[n(g,{ref:"sweetalert"},null,512),e("div",U,[e("div",D,[e("div",M,[e("div",R,[e("div",B,[e("h5",N,_(a.title),1),n(v,{onSubmit:c.signin},{default:y(({errors:i})=>[e("div",$,[z,n(m,{id:"emailInput",name:"Email",type:"email",class:f(["form-control",{"is-invalid":i.Email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:a.user.username,"onUpdate:modelValue":s[0]||(s[0]=l=>a.user.username=l)},null,8,["class","modelValue"]),n(u,{name:"Email",class:"invalid-feedback"})]),e("div",H,[O,n(m,{id:"passwordInput",name:"密碼",type:"password",class:f(["form-control",{"is-invalid":i.密碼}]),placeholder:"請輸入密碼",rules:c.isPassword,modelValue:a.user.password,"onUpdate:modelValue":s[1]||(s[1]=l=>a.user.password=l)},null,8,["class","rules","modelValue"]),n(u,{name:"密碼",class:"invalid-feedback"}),i.密碼?L("",!0):(h(),p("div",j,"密碼需至少 8 碼以上，並英數混合"))]),e("button",q,_(a.title),1)]),_:1},8,["onSubmit"])])])])])])],64)}const Y=x(C,[["render",K]]);export{Y as default};
