(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ygSchool/mationDetail"],{1601:function(t,n,e){"use strict";var o=e("365e"),a=e.n(o);a.a},"16aa":function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.formatDate(1e3*t.listDetail.create_time));t.$mp.data=Object.assign({},{$root:{m0:e}})},i=[];e.d(n,"b",function(){return a}),e.d(n,"c",function(){return i}),e.d(n,"a",function(){return o})},"365e":function(t,n,e){},7783:function(t,n,e){"use strict";e.r(n);var o=e("d97a"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a},d97a:function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a,i=e("254f"),u=e("3638"),c={data:function(){return{urlImg:"https://fenxiao.99zhifukeji.com/public/static/",listDetail:{}}},onLoad:function(n){console.log(t(n.id," at pages\\ygSchool\\mationDetail.vue:28"));var e=n.id;a=this,a.result=o.getStorageSync("RESULT"),i.setHToken(a.result);var u={id:e};i.informationDetail(u,function(t){1==t.code?a.listDetail=t.data:o.showToast({icon:"none",title:t.msg})},function(t){o.hideLoading(),o.showToast({icon:"none",title:t.errmsg})})},onShow:function(){a=this},onPullDownRefresh:function(){},components:{},methods:{formatDate:function(t){return u.formatDateTime(t,"yyyy-MM-dd hh:mm:ss")}}};n.default=c}).call(this,e("0de9")["default"],e("6e42")["default"])},ea201:function(t,n,e){"use strict";e.r(n);var o=e("16aa"),a=e("7783");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("1601");var u,c=e("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=r.exports},f79f:function(t,n,e){"use strict";(function(t){e("e2f8"),e("921b");o(e("66fd"));var n=o(e("ea201"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])}},[["f79f","common/runtime","common/vendor"]]]);