(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/choosePayMethod/choosePayMethod"],{2886:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,a=n("254f"),c={data:function(){return{iconsel:"/static/selected.png",iconNosel:"/static/static.png",isCheckState:0,payStype:[{name:"微信支付",image:n("5718"),cont:"快捷安全，支持微信支付"}],order_sn:""}},onLoad:function(e){o=this,o.order_sn=e.order_sn,o.result=t.getStorageSync("RESULT"),a.setHToken(o.result)},methods:{zhifuChange:function(t){this.isCheckState=t},czBtn:function(){console.log("小程序"),0==o.isCheckState&&t.login({provider:"weixin",success:function(e){var n=e.code;t.request({url:"https://fenxiao.99zhifukeji.com/api/wechat/pay",data:{code:n,order_sn:o.order_sn},header:{"custom-header":"application/json",token:o.result},success:function(e){console.log(),t.requestPayment({provider:"wxpay",timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:"MD5",paySign:e.data.data.sign,success:function(e){console.log(e),console.log("success:"+JSON.stringify(e)),t.showToast({icon:"none",title:e.msg}),setTimeout((function(){t.redirectTo({url:"/pages/order/paySuc"})}),1e3)},fail:function(e){console.log("fail:"+JSON.stringify(e)),t.showToast({icon:"none",title:e.errmsg})}})}})}})}}};e.default=c}).call(this,n("543d")["default"])},"2a08":function(t,e,n){"use strict";(function(t){n("e2f8");o(n("66fd"));var e=o(n("384a"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"384a":function(t,e,n){"use strict";n.r(e);var o=n("60fb"),a=n("601a");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("cb8d");var i,s=n("f0c5"),r=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=r.exports},"601a":function(t,e,n){"use strict";n.r(e);var o=n("2886"),a=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=a.a},"60fb":function(t,e,n){"use strict";var o,a=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}))},"6e02":function(t,e,n){},cb8d:function(t,e,n){"use strict";var o=n("6e02"),a=n.n(o);a.a}},[["2a08","common/runtime","common/vendor"]]]);