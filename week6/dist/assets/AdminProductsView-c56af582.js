import{_ as m,x as g,m as w,L as x,c as i,a as f,b as t,F as _,f as P,t as s,g as b,i as y,r as h,o as n,p as v}from"./index-c8e8d1f6.js";import{P as A}from"./PaginationComponent-b4786520.js";const{VITE_API_URL:L,VITE_API_PATH:k}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"ella-diving",BASE_URL:"/vue3-live-weekly-homework/week6/dist/",MODE:"production",DEV:!1,PROD:!0},V={data(){return{products:{}}},computed:{productTotal(){return this.products.data?Object.keys(this.products.data).length:0}},mounted(){this.getProducts()},components:{SweetalertComponent:g,PaginationComponent:A},methods:{...w(x,["showLoading","hideLoading"]),getProducts(c=1){this.showLoading(),this.$http.get(`${L}/api/${k}/admin/products?page=${c}`).then(o=>{const{products:l,pagination:r}=o.data;this.products={data:l,pagination:r},this.hideLoading()}).catch(o=>{this.hideLoading(),this.$refs.sweetalert.showSwal("popup","error",o.response.data.message)})}}},$={class:"container"},E=t("div",{class:"d-flex justify-content-between align-items-center mb-3"},[t("h1",{class:"mb-0 h4 fw-bold"},"產品管理")],-1),I={class:"table table-striped table-hover text-center align-middle"},T=t("thead",null,[t("tr",null,[t("th",{scope:"col",width:"400px"},"產品名稱"),t("th",{scope:"col",width:"170px"},"分類"),t("th",{scope:"col",width:"170px"},"廣告標籤"),t("th",{scope:"col",width:"170px"},"原價"),t("th",{scope:"col",width:"170px"},"售價"),t("th",{scope:"col",width:"170px"},"是否啟用")])],-1),C={class:"d-flex align-items-center"},S=["src","alt"],D={class:"h6 mb-0 text-truncate fw-bold"},B={scope:"row",class:"text-truncate"},R={class:"text-truncate"},U={class:"text-end"},N={class:"text-end"},O={scope:"col",colspan:"7",class:"text-start"};function j(c,o,l,r,a,d){const p=h("sweetalert-component"),u=h("PaginationComponent");return n(),i(_,null,[f(p,{ref:"sweetalert"},null,512),t("div",$,[E,t("table",I,[T,t("tbody",null,[(n(!0),i(_,null,P(a.products.data,e=>(n(),i("tr",{key:e.id},[t("th",null,[t("div",C,[t("img",{src:e.imageUrl,alt:`${e.category} - ${e.title}`,class:"img-box flex-shrink-0 rounded border me-2"},null,8,S),t("h4",D,s(e.title),1)])]),t("td",B,s(e.category),1),t("td",R,s(e.AD_type?e.AD_type:"未分類"),1),t("td",U,"$"+s(e.origin_price),1),t("td",N,"$"+s(e.price),1),t("td",null,[t("strong",{class:v([e.is_enabled?"text-success":"text-danger"])},s(e.is_enabled?"啟用":"停用"),3)])]))),128))]),t("tfoot",null,[t("tr",null,[t("th",O,"產品數量："+s(d.productTotal)+" 筆",1)])])]),a.products.pagination?(n(),b(u,{key:0,pagination:a.products.pagination,onSwitchPage:d.getProducts},null,8,["pagination","onSwitchPage"])):y("",!0)])],64)}const z=m(V,[["render",j]]);export{z as default};