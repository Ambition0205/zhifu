(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/provincialAgent/provincialAgent"],{2892:function(n,o,e){"use strict";e.r(o);var t=e("7d49"),i=e("8093");for(var a in i)"default"!==a&&function(n){e.d(o,n,(function(){return i[n]}))}(a);e("2e13");var c,r=e("f0c5"),u=Object(r["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],c);o["default"]=u.exports},"2e13":function(n,o,e){"use strict";var t=e("e19e"),i=e.n(t);i.a},"6d3b":function(n,o,e){"use strict";(function(n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t,i=e("254f"),a={data:function(){return{showUpImg:!0,id:"",order_sn:""}},onLoad:function(o){t=this,t.id=o.id,console.log(t.id),t.result=n.getStorageSync("RESULT"),i.setHToken(t.result)},onShow:function(){t.readyGo()},methods:{readyGo:function(){var o={id:t.id};console.log(o),i.agentDetail(o,(function(n){console.log(n)}),(function(o){n.hideLoading(),n.showToast({icon:"none",title:o.errmsg})}))},check:function(){this.showUpImg=!this.showUpImg},ljsqBtn:function(){var o={agentsId:t.id};this.showUpImg?i.setOrder(o,(function(o){1==o.code?(t.order_sn=o.data.order_sn,n.navigateTo({url:"/pages/choosePayMethod/choosePayMethod?order_sn="+t.order_sn})):1001==o.code||0==o.code?(n.showToast({icon:"none",title:"您还没有登录,请登录"}),setTimeout((function(){n.navigateTo({url:"/pages/public/login"})}),1e3)):n.showToast({icon:"none",title:o.msg})}),(function(o){n.hideLoading(),n.showToast({icon:"none",title:"系统繁忙"})})):n.showToast({icon:"none",title:"请阅读并勾选代理协议"})},gotodl:function(){n.navigateTo({url:"/pages/agreement/provincialAg"})}}};o.default=a}).call(this,e("543d")["default"])},"7d49":function(n,o,e){"use strict";var t,i=function(){var n=this,o=n.$createElement;n._self._c},a=[];e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return a})),e.d(o,"a",(function(){return t}))},8093:function(n,o,e){"use strict";e.r(o);var t=e("6d3b"),i=e.n(t);for(var a in t)"default"!==a&&function(n){e.d(o,n,(function(){return t[n]}))}(a);o["default"]=i.a},e19e:function(n,o,e){},e533:function(n,o,e){"use strict";(function(n){e("e2f8");t(e("66fd"));var o=t(e("2892"));function t(n){return n&&n.__esModule?n:{default:n}}n(o.default)}).call(this,e("543d")["createPage"])}},[["e533","common/runtime","common/vendor"]]]);