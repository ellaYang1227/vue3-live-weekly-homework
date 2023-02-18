import{b9 as v,aw as h,ak as i,m as d,u as n,b2 as x,n as e,a4 as _,l as w,t as r,F as f,b7 as k,b8 as B,a6 as $,au as y,aK as p,b4 as E}from"./plugin-vueexport-helper-6502c603.js";import{C as I}from"./bootstrap.esm-06211441.js";import{C}from"./CartStore-5e1ed282.js";import{F as S,a as L,E as U}from"./vee-validate.esm-753632ac.js";import{k as P}from"./runtime-dom.esm-bundler-8d942a76.js";import"./axios-bff3f665.js";import"./LoadingStore-344bc819.js";import"./Sweetalert2-options-02b29ef3.js";const{VITE_API_URL:T,VITE_API_PATH:A}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"ella-diving",BASE_URL:"/vue3-live-weekly-homework/week7/dist/",MODE:"production",DEV:!1,PROD:!0},M={data(){return{isLoadingBtn:!1,user:{name:"",email:"",tel:"",address:""},message:""}},components:{Form:S,Field:L,ErrorMessage:U},methods:{restoreDefault(){this.user={name:"",email:"",tel:"",address:""},this.message=""},onSubmitOrder(){this.isLoadingBtn=!0;const a={user:this.user,message:this.message};this.$http.post(`${T}/api/${A}/order`,{data:a}).then(()=>{this.isLoadingBtn=!1,this.restoreDefault(),this.$emit("getCart"),this.$refs.sweetalert.showSwal("popup","success","訂單建立成功")}).catch(s=>{this.isLoadingBtn=!1,this.$refs.sweetalert.showSwal("popup","error",s.response.data.message)})},isPhone(a){return/^(09)[0-9]{8}$/.test(a)?!0:"必填欄位。手機號碼共 9 碼，且為 09 開頭"}}},D=["disabled"],H={class:"row gy-4"},N={class:"col-md-6"},q=e("label",{for:"emailInput",class:"form-label"},[r("Email"),e("span",{class:"text-danger"},"*")],-1),O={class:"col-md-6"},R=e("label",{for:"nameInput",class:"form-label"},[r("收件人姓名"),e("span",{class:"text-danger"},"*")],-1),z={class:"col-md-6"},G=e("label",{for:"telInput",class:"form-label"},[r("收件人手機號碼"),e("span",{class:"text-danger"},"*")],-1),K={class:"col-md-6"},j=e("label",{for:"addressInput",class:"form-label"},[r("收件人地址"),e("span",{class:"text-danger"},"*")],-1),J={class:"col-12"},Q=e("label",{for:"messageTextarea",class:"form-label"},"留言",-1),W=["disabled"],X={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"};function Y(a,s,F,V,t,u){const b=h("sweetalert-component"),m=h("Field"),c=h("ErrorMessage"),g=h("Form");return i(),d(f,null,[n(b,{ref:"sweetalert"},null,512),n(g,{onSubmit:u.onSubmitOrder},{default:x(({errors:o})=>[e("fieldset",{disabled:t.isLoadingBtn},[e("div",H,[e("div",N,[q,n(m,{id:"emailInput",name:"Email",type:"email",class:_(["form-control",{"is-invalid":o.Email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:t.user.email,"onUpdate:modelValue":s[0]||(s[0]=l=>t.user.email=l)},null,8,["class","modelValue"]),n(c,{name:"Email",class:"invalid-feedback"})]),e("div",O,[R,n(m,{id:"nameInput",name:"姓名",type:"text",class:_(["form-control",{"is-invalid":o.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:t.user.name,"onUpdate:modelValue":s[1]||(s[1]=l=>t.user.name=l)},null,8,["class","modelValue"]),n(c,{name:"姓名",class:"invalid-feedback"})]),e("div",z,[G,n(m,{id:"telInput",name:"手機號碼",type:"tel",class:_(["form-control",{"is-invalid":o.手機號碼}]),placeholder:"請輸入手機號碼",rules:u.isPhone,modelValue:t.user.tel,"onUpdate:modelValue":s[2]||(s[2]=l=>t.user.tel=l)},null,8,["class","rules","modelValue"]),n(c,{name:"手機號碼",class:"invalid-feedback"})]),e("div",K,[j,n(m,{id:"addressInput",name:"地址",type:"text",class:_(["form-control",{"is-invalid":o.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:t.user.address,"onUpdate:modelValue":s[3]||(s[3]=l=>t.user.address=l)},null,8,["class","modelValue"]),n(c,{name:"地址",class:"invalid-feedback"})]),e("div",J,[Q,n(m,{modelValue:t.message,"onUpdate:modelValue":s[4]||(s[4]=l=>t.message=l),name:"留言",as:"textarea",class:"form-control",id:"messageTextarea"},null,8,["modelValue"])])]),e("button",{class:"btn btn-primary w-100 mt-4",type:"submit",disabled:t.isLoadingBtn},[t.isLoadingBtn?(i(),d("span",X)):w("",!0),r(" 送出訂單 ")],8,W)],8,D)]),_:1},8,["onSubmit"])],64)}const Z=v(M,[["render",Y]]),ee={data(){return{buyFormCollapse2:null,showBuyFormCollapse:!1,cartItemsMaxHeight:{maxHeight:""}}},computed:{...k(C,["cart"])},components:{BuyFormComponent:Z},mounted(){this.buyFormCollapse=new I(this.$refs.buyFormCollapse,{toggle:!1}),this.getCart()},methods:{...B(C,["getCart","delCart","changeCartItem"]),toggleBuyFormCollapse(){this.buyFormCollapse.toggle(),this.showBuyFormCollapse=!this.showBuyFormCollapse,this.cartItemsMaxHeight.maxHeight=this.showBuyFormCollapse?"30vh":""}}},se={class:"container"},te={class:"list-group"},oe={class:"list-group-item py-3"},le={class:"card-title border-bottom bg-white pb-3 mb-0 d-flex align-items-center"},ae=["disabled"],ne={key:0,class:"text-muted text-center mb-0 py-3"},re=e("br",null,null,-1),ie={key:1,class:"d-flex flex-column"},de={class:"row align-items-center"},me={class:"col-7 d-flex align-items-center"},ce={type:"button",class:"btn btn-link text-black-50 ps-0"},ue={class:"h6 mb-0 fw-bold"},pe={class:"col-auto d-flex align-items-center"},he=["onUpdate:modelValue","onChange"],_e=["value"],ge={class:"col text-end text-danger fw-bold"},be={class:"p-3 pb-0 mt-auto border-top d-flex align-items-center text-black-50"},fe={class:"ms-auto text-danger"},ye={class:"collapse",ref:"buyFormCollapse"};function Ce(a,s,F,V,t,u){var c,g;const b=h("font-awesome-icon"),m=h("BuyFormComponent");return i(),d("div",se,[e("ul",te,[e("li",oe,[e("h5",le,[r(" 我的購物車 "),e("button",{type:"button",class:"ms-auto btn btn-outline-danger btn-sm",disabled:!((c=a.cart.carts)!=null&&c.length),onClick:s[0]||(s[0]=o=>a.delCart())}," 清空購物車 ",8,ae)]),(g=a.cart.carts)!=null&&g.length?(i(),d("div",ie,[e("ul",{class:"list-group list-group-flush bg-transparent overflow-auto",style:$(t.cartItemsMaxHeight)},[(i(!0),d(f,null,y(a.cart.carts,o=>(i(),d("li",{class:"list-group-item py-3",key:o.id},[e("div",de,[e("div",me,[e("button",ce,[n(b,{icon:"fa-solid fa-trash-can",onClick:l=>a.delCart(o.id)},null,8,["onClick"])]),e("h3",ue,p(o.product.title),1)]),e("div",pe,[E(e("select",{class:"form-select form-select-sm me-1","onUpdate:modelValue":l=>o.qty=l,onChange:l=>a.changeCartItem(o)},[(i(),d(f,null,y(20,l=>e("option",{key:l,value:l},p(l),9,_e)),64))],40,he),[[P,o.qty]]),r(" "+p(o.product.unit),1)]),e("div",ge,"$ "+p(o.final_total),1)])]))),128))],4),e("div",be,[r(p(`共 ${a.cart.carts.length} 筆`),1),e("strong",fe,"總計 $"+p(a.cart.final_total),1)]),t.showBuyFormCollapse?w("",!0):(i(),d("button",{key:0,class:"btn btn-primary w-100 mt-3",type:"button",onClick:s[1]||(s[1]=(...o)=>u.toggleBuyFormCollapse&&u.toggleBuyFormCollapse(...o))}," 立即結帳 "))])):(i(),d("p",ne,[r("購物車是空的"),re,r("立即選購喜愛的產品")]))]),e("li",{class:_(["list-group-item py-4 bg-light",{"d-none":!t.showBuyFormCollapse}])},[e("div",ye,[n(m,{onGetCart:s[2]||(s[2]=o=>{a.getCart(),u.toggleBuyFormCollapse()})})],512)],2)])])}const Ee=v(ee,[["render",Ce]]);export{Ee as default};
