(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/share"],{"06da":function(t,n,r){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={data:function(){return{transform:"translateY(50vh)",timer:0,backgroundColor:"rgba(0,0,0,0)",show:!1,config:{}}},props:{contentHeight:{type:Number,default:0},hasTabbar:{type:Boolean,default:!1},shareList:{type:Array,default:function(){return[]}}},created:function(){var n=t.upx2px(this.contentHeight)+"px";this.config={height:n,transform:"translateY(".concat(n,")"),backgroundColor:"rgba(0,0,0,.4)"},this.transform=this.config.transform},methods:{toggleMask:function(){var n=this;if(1!=this.timer){if(this.timer=1,setTimeout(function(){n.timer=0},500),this.show)return this.transform=this.config.transform,this.backgroundColor="rgba(0,0,0,0)",void setTimeout(function(){n.show=!1,n.hasTabbar&&t.showTabBar()},200);this.show=!0,this.hasTabbar?t.hideTabBar({success:function(){setTimeout(function(){n.backgroundColor=n.config.backgroundColor,n.transform="translateY(0px)"},10)}}):setTimeout(function(){n.backgroundColor=n.config.backgroundColor,n.transform="translateY(0px)"},10)}},stopPrevent:function(){},shareToFriend:function(t){this.$api.msg("分享给".concat(t)),this.toggleMask()}}};n.default=r}).call(this,r("6e42")["default"])},"1d99":function(t,n,r){},"36e6":function(t,n,r){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},e=[];r.d(n,"b",function(){return a}),r.d(n,"c",function(){return e}),r.d(n,"a",function(){return o})},6878:function(t,n,r){"use strict";r.r(n);var o=r("06da"),a=r.n(o);for(var e in o)"default"!==e&&function(t){r.d(n,t,function(){return o[t]})}(e);n["default"]=a.a},a989:function(t,n,r){"use strict";var o=r("1d99"),a=r.n(o);a.a},da94:function(t,n,r){"use strict";r.r(n);var o=r("36e6"),a=r("6878");for(var e in a)"default"!==e&&function(t){r.d(n,t,function(){return a[t]})}(e);r("a989");var i,s=r("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/share-create-component',
    {
        'components/share-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("da94"))
        })
    },
    [['components/share-create-component']]
]);
