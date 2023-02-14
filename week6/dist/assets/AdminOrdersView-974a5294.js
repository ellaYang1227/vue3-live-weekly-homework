import{_ as g,x as u,m as w,L as f,c as h,a as x,b as t,F as _,f as b,t as o,g as T,i as P,r as m,o as d,e as k,p as D}from"./index-19b92a9d.js";import{P as $}from"./PaginationComponent-982b1478.js";const{VITE_API_URL:y,VITE_API_PATH:L}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"ella-diving",BASE_URL:"/vue3-live-weekly-homework/week6/dist/",MODE:"production",DEV:!1,PROD:!0},V={data(){return{orders:{}}},computed:{orderTotal(){return this.orders.data?Object.keys(this.orders.data).length:0}},mounted(){this.getOrders()},components:{SweetalertComponent:u,PaginationComponent:$},methods:{...w(f,["showLoading","hideLoading"]),getOrders(e=1){this.showLoading(),this.$http.get(`${y}/api/${L}/admin/orders?page=${e}`).then(i=>{const{orders:r,pagination:l}=i.data;this.orders={data:r,pagination:l},this.hideLoading()}).catch(i=>{this.hideLoading(),this.$refs.sweetalert.showSwal("popup","error",i.response.data.message)})},handleCreate_at(e){e=new Date(e*1e3);const i=e.getFullYear();let r=e.getMonth()+1;r=this.transformTwoDigits(r);let l=e.getDate();l=this.transformTwoDigits(l);let n=e.getHours();n=this.transformTwoDigits(n);let a=e.getMinutes();a=this.transformTwoDigits(a);let c=e.getSeconds();return c=this.transformTwoDigits(c),`${i}/${r}/${l} ${n}:${a}:${c}`},transformTwoDigits(e){return 10>e&&(e=`0${e}`),e}}},A={class:"container"},C=t("div",{class:"d-flex justify-content-between align-items-center mb-3"},[t("h1",{class:"mb-0 h4 fw-bold"},"訂單管理")],-1),v={class:"table table-striped table-hover text-center align-middle"},E=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"訂單編號"),t("th",{scope:"col"},"購買人"),t("th",{scope:"col"},"聯絡電話"),t("th",{scope:"col"},"訂單金額"),t("th",{scope:"col"},"是否付款"),t("th",{scope:"col",width:"170px"},"留言")])],-1),I={class:"text-start"},O={class:"h6 mb-0 text-truncate fw-bold"},S={class:"d-block text-muted"},B={class:"text-start"},N={class:"d-block text-muted"},R={class:"text-end"},F={class:"text-break text-start"},H={scope:"col",colspan:"7",class:"text-start"};function M(e,i,r,l,n,a){const c=m("sweetalert-component"),p=m("PaginationComponent");return d(),h(_,null,[x(c,{ref:"sweetalert"},null,512),t("div",A,[C,t("table",v,[E,t("tbody",null,[(d(!0),h(_,null,b(n.orders.data,s=>(d(),h("tr",{key:s.id},[t("th",I,[t("h4",O,o(s.id),1),t("small",S,o(a.handleCreate_at(s.create_at)),1)]),t("td",B,[k(o(s.user.name),1),t("small",N,o(s.user.email),1)]),t("td",null,o(s.user.tel),1),t("td",R,"$"+o(s.total),1),t("td",null,[t("strong",{class:D([s.is_paid?"text-success":"text-danger"])},o(s.is_paid?"已付款":"未付款"),3)]),t("td",F,o(s.message),1)]))),128))]),t("tfoot",null,[t("tr",null,[t("th",H,"訂單數量："+o(a.orderTotal)+" 筆",1)])])]),n.orders.pagination?(d(),T(p,{key:0,pagination:n.orders.pagination,onSwitchPage:a.getOrders},null,8,["pagination","onSwitchPage"])):P("",!0)])],64)}const z=g(V,[["render",M]]);export{z as default};
