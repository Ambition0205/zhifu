(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/QRcode/QRcode"],{"06fb":function(e,t,n){"use strict";var o=n("e627"),i=n.n(o);i.a},"082d":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;o(n("92a7"));function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u,c=n("254f"),s={data:function(){return{codes:"",ifShow:!0,urlImg:"https://fenxiao.99zhifukeji.com/public/static/",img:"",level:"",canvasShow:!1}},onLoad:function(t){u=this,console.log(t),u.level=t.level,u.result=e.getStorageSync("RESULT"),c.setHToken(u.result)},onShow:function(){u=this,u.extensionCode()},onHide:function(){e.removeStorageSync("person-card")},methods:{extensionCode:function(){c.mpcode((function(e){1==e.code&&(console.log(e.data),u.img=e.data)}))},promisify:function(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return new Promise((function(n,i){var r={success:n,fail:i};e.apply(void 0,[a({},t,{},r)].concat(o))}))}},shareClick:function(){var t=this,n=this.promisify(e.getImageInfo);console.log(this.level),0==this.level?Promise.all([n({src:"https://fenxiao.99zhifukeji.com/niumengqi.png"}),n({src:"https://fenxiao.99zhifukeji.com/niumengqi1.png"})]).then((function(e){var n=wx.createCanvasContext("shareCanvas");console.log(n),n.drawImage(e[0].path,0,0,400,500),n.setTextAlign("center"),n.setFillStyle("#000000"),n.setFontSize(22);var o=150;n.drawImage(e[1].path,(390-o)/2,205,o,o),n.stroke(),console.log("res",e),n.draw(!1,(function(){t.tempFileImage()})),t.canvasShow=!0})):Promise.all([n({src:"https://fenxiao.99zhifukeji.com/niumengqi.png"}),n({src:this.urlImg+this.img})]).then((function(e){var n=wx.createCanvasContext("shareCanvas");console.log(n),n.drawImage(e[0].path,0,0,400,500),n.setTextAlign("center"),n.setFillStyle("#000000"),n.setFontSize(22);var o=150;n.drawImage(e[1].path,(390-o)/2,205,o,o),n.stroke(),console.log("res",e),n.draw(!1,(function(){t.tempFileImage()})),t.canvasShow=!0}))},tempFileImage:function(){var t=this;e.canvasToTempFilePath({canvasId:"shareCanvas",success:function(n){e.hideLoading(),t.savePic(n.tempFilePath)},fail:function(){}})},savePic:function(t){console.log("filePath",t),e.showLoading({title:"正在保存"}),e.saveImageToPhotosAlbum({filePath:t,success:function(){e.showToast({title:"图片保存成功～"})},fail:function(e){},complete:function(){e.hideLoading()}})}}};t.default=s}).call(this,n("543d")["default"])},"0856":function(e,t,n){},"2dcf":function(e,t,n){"use strict";(function(e){n("e2f8");o(n("66fd"));var t=o(n("d27e"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},4066:function(e,t,n){"use strict";n.r(t);var o=n("6a31"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},5856:function(e,t,n){"use strict";var o=n("0856"),i=n.n(o);i.a},"6a31":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,i=a(n("57d3"));function a(e){return e&&e.__esModule?e:{default:e}}var r={name:"tki-qrcode",props:{cid:{type:String,default:"tki-qrcode-canvas"},size:{type:Number,default:200},unit:{type:String,default:"upx"},show:{type:Boolean,default:!0},val:{type:String,default:""},background:{type:String,default:"#ffffff"},foreground:{type:String,default:"#000000"},pdground:{type:String,default:"#000000"},icon:{type:String,default:""},iconSize:{type:Number,default:40},lv:{type:Number,default:3},onval:{type:Boolean,default:!1},loadMake:{type:Boolean,default:!1},usingComponents:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},loadingText:{type:String,default:"二维码生成中"}},data:function(){return{result:""}},methods:{_makeCode:function(){var t=this;this._empty(this.val)?e.showToast({title:"二维码内容不能为空",icon:"none",duration:2e3}):o=new i.default({context:t,canvasId:t.cid,usingComponents:t.usingComponents,showLoading:t.showLoading,loadingText:t.loadingText,text:t.val,size:t.cpSize,background:t.background,foreground:t.foreground,pdground:t.pdground,correctLevel:t.lv,image:t.icon,imageSize:t.iconSize,cbResult:function(e){t._result(e)}})},_clearCode:function(){this._result(""),o.clear()},_saveCode:function(){var t=this;""!=this.result&&e.saveImageToPhotosAlbum({filePath:t.result,success:function(){e.showToast({title:"二维码保存成功",icon:"success",duration:2e3})}})},_result:function(e){this.result=e,this.$emit("result",e)},_empty:function(e){var t=typeof e,n=!1;return"number"==t&&""==String(e)?n=!0:"undefined"==t?n=!0:"object"==t?"{}"!=JSON.stringify(e)&&"[]"!=JSON.stringify(e)&&null!=e||(n=!0):"string"==t?""!=e&&"undefined"!=e&&"null"!=e&&"{}"!=e&&"[]"!=e||(n=!0):"function"==t&&(n=!1),n}},watch:{size:function(e,t){var n=this;e==t||this._empty(e)||(this.cSize=e,this._empty(this.val)||setTimeout((function(){n._makeCode()}),100))},val:function(e,t){var n=this;this.onval&&(e==t||this._empty(e)||setTimeout((function(){n._makeCode()}),0))}},computed:{cpSize:function(){return"upx"==this.unit?e.upx2px(this.size):this.size}},mounted:function(){var e=this;this.loadMake&&(this._empty(this.val)||setTimeout((function(){e._makeCode()}),0))}};t.default=r}).call(this,n("543d")["default"])},"6e8d":function(e,t,n){"use strict";n.r(t);var o=n("082d"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},"92a7":function(e,t,n){"use strict";n.r(t);var o=n("9c63"),i=n("4066");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("5856");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=c.exports},"9c63":function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}))},d27e:function(e,t,n){"use strict";n.r(t);var o=n("f24e"),i=n("6e8d");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("06fb");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=c.exports},e627:function(e,t,n){},f24e:function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.canvasShow=!1})},a=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}))}},[["2dcf","common/runtime","common/vendor"]]]);