import{d as a,e as u}from"./Sweetalert2-options-0dfba4d8.js";import{R as d}from"./vue-router-0d72b5b6.js";import{N as _}from"./NavbarComponent-1af701ec.js";import{A as l}from"./AuthStore-fb4a3b8d.js";import{L as f}from"./LoadingStore-344bc819.js";import{b9 as h,m as v,u as n,n as k,F as w,aw as s,ak as A}from"./plugin-vueexport-helper-6502c603.js";import"./index-c9864ea1.js";const{VITE_API_URL:R}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"ella-diving",BASE_URL:"/vue3-live-weekly-homework/week6/dist/",MODE:"production",DEV:!1,PROD:!0},V={data(){return{}},components:{RouterView:d,NavbarComponent:_},beforeRouteEnter(i,c,o){const{getToken:e,removeToken:t}=l();a.defaults.headers.common.Authorization=e(),a.post(`${R}/api/user/check`).then(()=>{o()}).catch(()=>{t();const{hideLoading:r}=f();r(),u("popup","error","驗證失敗","您的身分驗證失敗，請重新登入").then(()=>{o("/login")})})}},E={class:"py-5 fixed-top-margin-top"};function g(i,c,o,e,t,r){const m=s("NavbarComponent"),p=s("RouterView");return A(),v(w,null,[n(m,{layout:"admin"}),k("div",E,[n(p)])],64)}const $=h(V,[["render",g]]);export{$ as default};
