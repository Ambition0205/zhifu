(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/list"],{"43dc":function(t,n,e){},"54b6":function(t,n,e){"use strict";e.r(n);var o=e("c7f3"),i=e("bfa9");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("b9bf");var r,u=e("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=c.exports},"85a6":function(t,n,e){"use strict";(function(t){e("e2f8"),e("921b");o(e("66fd"));var n=o(e("54b6"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},b9bf:function(t,n,e){"use strict";var o=e("43dc"),i=e.n(o);i.a},bfa9:function(t,n,e){"use strict";e.r(n);var o=e("e9ab"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},c7f3:function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",function(){return i}),e.d(n,"c",function(){return a}),e.d(n,"a",function(){return o})},e9ab:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o,i=function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"964f"))},a=e("254f"),r=1,u=null,c={components:{uniLoadMore:i},data:function(){return{cateMaskState:0,headerPosition:"fixed",headerTop:"0px",filterIndex:0,goodsList:[],goodList:[],src:"https://fenxiao.99zhifukeji.com/",loadingText:"正在加载..."}},onLoad:function(n){o=this,o.cateId=n.tid,o.result=t.getStorageSync("RESULT"),a.setHToken(o.result),this.getnewsList()},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){this.getnewsList()},onReachBottom:function(){null!=u&&clearTimeout(u),u=setTimeout(function(){o.getmorenews()},1e3)},methods:{getmorenews:function(){var n={page:r};if(""!=o.loadingText&&"加载更多"!=o.loadingText)return!1;o.loadingText="正在加载...",t.showNavigationBarLoading(),a.storeIndex(n,function(n){if(0==n.data.length)return o.loadingText="没有更多数据了",void t.hideNavigationBarLoading();r++,o.goodList=o.goodList.concat(n.data),o.loadingText="加载更多",t.hideNavigationBarLoading()},function(n){t.hideLoading(),t.showToast({icon:"none",title:n.errmsg})})},getnewsList:function(){r=1,o.loadingText="加载更多",t.showNavigationBarLoading();var n={page:r};a.storeIndex(n,function(n){if(1001==n.code||0==n.code)t.showToast({icon:"none",title:"您还没有登录,请登录"}),setTimeout(function(){t.navigateTo({url:"/pages/public/login"})},1e3);else if(1==n.code){if(0==n.data.length)return t.hideNavigationBarLoading(),t.stopPullDownRefresh(),o.loadingText="没有更多数据了",!1;r++,o.goodList=n.data,t.hideNavigationBarLoading(),t.stopPullDownRefresh()}else t.showToast({icon:"none",title:err.msg})},function(n){t.hideLoading(),t.showToast({icon:"none",title:n.errmsg})})},navToDetailPage:function(n){var e=n.id;t.navigateTo({url:"/pages/product/product?id=".concat(e)})},stopPrevent:function(){}}};n.default=c}).call(this,e("6e42")["default"])}},[["85a6","common/runtime","common/vendor"]]]);