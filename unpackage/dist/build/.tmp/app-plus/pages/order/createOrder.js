(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/createOrder"],{"02f7":function(e,t,n){"use strict";var o=n("5cc1"),a=n.n(o);a.a},"1d35":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,r=n("254f"),s=function(){return n.e("components/uni-number-box/uni-number-box").then(n.bind(null,"ff7a"))},i={components:{uniNumberBox:s},data:function(){return{maskState:0,desc:"",payType:1,iconsel:"/static/selected.png",iconNosel:"/static/static.png",isCheckState:0,src:"https://fenxiao.99zhifukeji.com/",goodsDetail:{},goodsIndex:[],imgurl:"",number:1,addressData:[],payStype:[{name:"微信支付",image:n("5718"),cont:"快捷安全，支持微信支付",payType:"1"},{name:"余额",image:n("6a86"),cont:"当余额不足时，自动使用微信补足",payType:"2"}],order_sn:"",fee:"",id:""}},onLoad:function(t){a=this,console.log(e(t," at pages\\order\\createOrder.vue:122")),a.id=t.id,a.result=o.getStorageSync("RESULT"),r.setHToken(a.result),a.storeDetail(),a.getAddress()},onShow:function(){},methods:{storeDetail:function(){var e={id:a.id};r.storeDetail(e,function(e){1==e.code&&(a.goodsDetail=e.data,a.goodsIndex=e.data.index[0])},function(e){o.hideLoading(),o.showToast({icon:"none",title:e.errmsg})})},getAddress:function(){r.getDefaultAddress(function(e){1==e.code?a.addressData=e.data:o.showToast({icon:"none",title:e.msg})},function(e){o.hideLoading(),o.showToast({icon:"none",title:e.errmsg})})},numberChange:function(e){this.number=e.number},changePayType:function(e){this.payType=e},stopPrevent:function(){},zhifuChange:function(e){this.isCheckState=e},bindChange:function(e){this.number=e},submit:function(){var t={goodsId:a.id,receiver:a.addressData.receiver,phone:a.addressData.receive_tel,goods_num:a.number,address:a.addressData.province+a.addressData.city+a.addressData.district,unit_price:a.goodsDetail.marketPrice,total:a.goodsDetail.marketPrice*a.number,pay_type:a.isCheckState,remark:a.desc};console.log(e(t," at pages\\order\\createOrder.vue:197")),r.storeSetOrder(t,function(t){if(1==t.code)if(a.order_sn=t.data.order_sn,console.log(e(a.order_sn," at pages\\order\\createOrder.vue:201")),console.log(e(a.isCheckState," at pages\\order\\createOrder.vue:202")),0==a.isCheckState)o.request({url:"https://fenxiao.99zhifukeji.com/api/store/apppay",data:{order_sn:a.order_sn},header:{"custom-header":"application/json",token:a.result},success:function(t){console.log(e(t," at pages\\order\\createOrder.vue:216")),o.requestPayment({provider:"wxpay",timeStamp:t.data.data.timeStamp,nonceStr:t.data.data.nonceStr,package:t.data.data.package,signType:"MD5",paySign:t.data.data.sign,success:function(t){console.log(e(t," at pages\\order\\createOrder.vue:226")),console.log(e("success:"+JSON.stringify(t)," at pages\\order\\createOrder.vue:227"))},fail:function(t){console.log(e("fail:"+JSON.stringify(t)," at pages\\order\\createOrder.vue:230"))}})}});else{var n={order_sn:a.order_sn};r.balancepay(n,function(t){console.log(e(t," at pages\\order\\createOrder.vue:240")),1==t.code?(o.showToast({icon:"none",title:t.msg}),setTimeout(function(){o.redirectTo({url:"/pages/order/paySuc"})},1e3)):o.showToast({icon:"none",title:t.msg})},function(e){o.hideLoading(),o.showToast({icon:"none",title:e.errmsg})})}},function(e){o.hideLoading(),o.showToast({icon:"none",title:e.errmsg})})}}};t.default=i}).call(this,n("0de9")["default"],n("6e42")["default"])},"5cc1":function(e,t,n){},"5edb":function(e,t,n){"use strict";n.r(t);var o=n("1d35"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},"9ff8":function(e,t,n){"use strict";(function(e){n("e2f8"),n("921b");o(n("66fd"));var t=o(n("c819"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},c819:function(e,t,n){"use strict";n.r(t);var o=n("c9e4"),a=n("5edb");for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);n("02f7");var s,i=n("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=c.exports},c9e4:function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return o})}},[["9ff8","common/runtime","common/vendor"]]]);