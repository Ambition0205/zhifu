(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userinfo/userinfo"],{"42f7":function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t,i=o("254f"),c=function(){o.e("components/mack").then(function(){return resolve(o("e3f3"))}.bind(null,o)).catch(o.oe)},a={data:function(){return{userFeedbackHidden:!0,ankCard:!0,feedbackContent:"",bankMing:"",branchMing:"",name:"",cardNumbe:"",userinfo:[],img:"/static/missing-face.png",src:"https://fenxiao.99zhifukeji.com/"}},components:{prompt:c},onLoad:function(){t=this,t.result=n.getStorageSync("RESULT"),console.log(t.result),i.setHToken(t.result)},onShow:function(){this.getuserinfo()},methods:{getuserinfo:function(){i.user((function(e){console.log(e.data),1==e.code?t.userinfo=e.data:(n.showToast({icon:"none",title:e.msg+",请重试登录"}),n.navigateTo({url:"/pages/public/login"}))}),(function(e){n.hideLoading(),n.showToast({icon:"none",title:e.errmsg})}))},modifynickname:function(){t.userFeedbackHidden=!1},hideDiv:function(){t.userFeedbackHidden=!0},submitFeedback:function(){var e=this,o={nickname:e.feedbackContent};console.log(o),i.editnickt(o,(function(o){console.log(o.data),1==o.code?(n.showToast({icon:"none",title:o.msg}),setTimeout((function(){e.userFeedbackHidden=!0,e.getuserinfo()}),500)):n.showToast({icon:"none",title:o.msg})}),(function(e){n.hideLoading(),n.showToast({icon:"none",title:e.errmsg})}))},cancelBtn:function(){t.userFeedbackHidden=!0,n.showToast({title:"您放弃了修改",icon:"none"})},cardBinding:function(){t.ankCard=!1},hideview:function(){t.ankCard=!0},bindBtn:function(){var e=this,o={bank_name:e.bankMing,sub_bank_name:e.branchMing,realname:e.name,bank_card:e.cardNumbe};console.log(o),""==e.bankMing||""==e.branchMing||""==e.name||""==e.cardNumbe?n.showToast({title:"输入不能为空",icon:"none"}):i.bindBank(o,(function(o){console.log(o.data),1==o.code?(n.showToast({icon:"none",title:o.msg}),setTimeout((function(){e.ankCard=!0,e.getuserinfo()}),1e3)):n.showToast({icon:"none",title:o.msg})}),(function(e){n.hideLoading(),n.showToast({icon:"none",title:e.errmsg})}))},quxiaoBtn:function(){t.ankCard=!0,n.showToast({title:"您放弃了绑定",icon:"none"})},signOut:function(){n.showModal({content:"确定要退出登录么",success:function(e){console.log(e),e.confirm&&(n.removeStorageSync("RESULT"),setTimeout((function(){n.reLaunch({url:"../public/login"})}),200))}})}}};e.default=a}).call(this,o("543d")["default"])},abaf:function(n,e,o){"use strict";var t,i=function(){var n=this,e=n.$createElement,o=(n._self._c,n.userinfo.avatar.includes("https"));n.$mp.data=Object.assign({},{$root:{g0:o}})},c=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return c})),o.d(e,"a",(function(){return t}))},b52c:function(n,e,o){},bcf8:function(n,e,o){"use strict";var t=o("b52c"),i=o.n(t);i.a},e223:function(n,e,o){"use strict";o.r(e);var t=o("42f7"),i=o.n(t);for(var c in t)"default"!==c&&function(n){o.d(e,n,(function(){return t[n]}))}(c);e["default"]=i.a},e48c:function(n,e,o){"use strict";o.r(e);var t=o("abaf"),i=o("e223");for(var c in i)"default"!==c&&function(n){o.d(e,n,(function(){return i[n]}))}(c);o("bcf8");var a,u=o("f0c5"),s=Object(u["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],a);e["default"]=s.exports},f1b7:function(n,e,o){"use strict";(function(n){o("e2f8");t(o("66fd"));var e=t(o("e48c"));function t(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,o("543d")["createPage"])}},[["f1b7","common/runtime","common/vendor"]]]);