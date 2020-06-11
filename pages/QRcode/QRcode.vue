<template  xlang="wxml">
		<view class="container post">
			<image src="/static/ewm_img.png" class="ewm_img" ></image>
			<view class="qrimg" style="z-index: 999;position: absolute;">
				<view class="pc-container qrimg-i">
					<!-- 有权限 通过level！=0 -->
					<image :src="urlImg+img" class="qrcode1" v-if="level!=0" mode="aspectFill" @longpress="saveImage"></image>
					<!-- 没有权限 -->
					<image src="../../static/zwqx.png" class="qrcode1" v-else mode="aspectFill" @longpress="saveImage"></image>
					<!-- <canvas canvas-id="mycanvas" style="width: 750upx;height: 998rpx;" v-show="canvasShow"></canvas>  -->
					
				</view>
				<view class="wrapper">
					<!-- <canvas style="height: 100%;width: 100%;backgroundColor: #FFFFFF"
					 canvas-id="firstCanvas" id="sss"></canvas> -->
					 <canvas canvas-id="myCanvas" style="width:750upx;height:999upx;opacity:0;"/>
				</view>
			</view>
			<view class="canvasContent" v-if="canvasShow">
			    <canvas canvas-id="shareCanvas" class="canvasName" style="opacity:0;"></canvas>
			    <!-- <view class="canvasText">图片已保存到相册，可分享给好友</view> -->
				<!-- <text class="errorImage iconfont">&#xe658;</text> -->
			    <image src="../../static/icon_error.png"  class="errorImage"  @click="canvasShow = false"></image>
			</view>
			<view class="uni-padding-wrap">
				<view class="btns">
					<button  @tap="shareClick" class="font_orange bcbtn">保存海报</button>
				</view>
			</view>
		</view>
	<!-- </view> -->
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	var request= require("@/common/service.js");
	var _self;
	export default{
	data(){
		return{
		  codes:'',
		  ifShow: true,
		  urlImg : 'https://fenxiao.99zhifukeji.com/public/static/',
		  img:'',
		  level:'',
		  canvasShow: false
		}
	  },
	onLoad(options){
	  	_self = this;
		console.log(options)
		_self.level=options.level;
	  	_self.result = uni.getStorageSync('RESULT');
	  	request.setHToken(_self.result)
		
	},
	onShow() {
		_self = this;
		_self.extensionCode();
	},
	onHide() {
	    uni.removeStorageSync('person-card');
	},
	methods:{
		extensionCode:function(){
			request.mpcode(function(res){
				if(res.code==1){
					console.log(res.data)
					_self.img=res.data;
				  }
			})
		},
		//这是一个封装好的方法
		promisify: api => {
			return (options, ...params) => {
				return new Promise((resolve, reject) => {
					const extras = {
						success: resolve,
						fail: reject
					}
					api({ ...options, ...extras }, ...params)
				})
			}
		},
		shareClick() {
		    const wxGetImageInfo = this.promisify(uni.getImageInfo)
			console.log(this.level)
			if(this.level==0){
				Promise.all([
				        // 图片目前只随机找了几张图片，后期可自行替换
				        wxGetImageInfo({
				                src: 'https://fenxiao.99zhifukeji.com/niumengqi.png'   // 背景图片
				        }),
						wxGetImageInfo({
								src: 'https://fenxiao.99zhifukeji.com/niumengqi1.png'   // 二维码图片，二维码图片如需要携带参数，可根据接口将需要扫码进入页面的路径+参数传入后端，后端可根据生产小程序二维码路径，将路径放入这里就ok了,<a href="https://www.jianshu.com/p/5f96a4f91b9c" target="_blank">可参考</a>     
						})
				       
				]).then(res => {
				        const ctx = wx.createCanvasContext('shareCanvas')
				        console.log(ctx)
				        // 底图
				        ctx.drawImage(res[0].path, 0, 0, 400, 500)
				        // 作者名称
				        ctx.setTextAlign('center')    // 文字居中
				        ctx.setFillStyle('#000000')  // 文字颜色：黑色
				        ctx.setFontSize(22)         // 文字字号：22px
				        // 小程序码
				        const qrImgSize = 150;
				        ctx.drawImage(res[1].path, (390- qrImgSize) / 2, 205, qrImgSize, qrImgSize)
				        ctx.stroke()
				        // 绘图生成临时图片
				        console.log('res', res)
				        ctx.draw(false,() => {
				            this.tempFileImage()
				        })
				        this.canvasShow = true
				})
			}else{
				Promise.all([
				        // 图片目前只随机找了几张图片，后期可自行替换
				        wxGetImageInfo({
				                src: 'https://fenxiao.99zhifukeji.com/niumengqi.png'   // 背景图片
				        }),
						wxGetImageInfo({
								src: this.urlImg+this.img   // 二维码图片，二维码图片如需要携带参数，可根据接口将需要扫码进入页面的路径+参数传入后端，后端可根据生产小程序二维码路径，将路径放入这里就ok了,<a href="https://www.jianshu.com/p/5f96a4f91b9c" target="_blank">可参考</a>     
						})
				       
				]).then(res => {
				        const ctx = wx.createCanvasContext('shareCanvas')
				        console.log(ctx)
				        // 底图
				        ctx.drawImage(res[0].path, 0, 0, 400, 500)
				        // 作者名称
				        ctx.setTextAlign('center')    // 文字居中
				        ctx.setFillStyle('#000000')  // 文字颜色：黑色
				        ctx.setFontSize(22)         // 文字字号：22px
				        // 小程序码
				        const qrImgSize = 150;
				        ctx.drawImage(res[1].path, (390- qrImgSize) / 2, 205, qrImgSize, qrImgSize)
				        ctx.stroke()
				        // 绘图生成临时图片
				        console.log('res', res)
				        ctx.draw(false,() => {
				            this.tempFileImage()
				        })
				        this.canvasShow = true
				})
			}
		    
		},
		tempFileImage() {
		    let that = this
		    uni.canvasToTempFilePath({
		            canvasId: 'shareCanvas',
		            success: (res) => {
		                    uni.hideLoading()
		                    that.savePic(res.tempFilePath)
		            },
		            fail:function () {
		                    //TODO
		            }
		    })
		},
		//保存
		savePic (filePath) {
		    console.log('filePath', filePath)
		    uni.showLoading({
		            title: '正在保存'
		    });
		    uni.saveImageToPhotosAlbum({
		            filePath: filePath,
		            success: function () {
		                    uni.showToast({
		                            title: '图片保存成功～'
		                    });
		            },
		            fail: function (e) {
		                    //TODO
		            },
		            complete: function (){
		                    uni.hideLoading()
		            }
		    });
		}
		
	}
	
	}

</script>

<style>

page{
	background-color: #27282D;
	/* height: 100%; */
}
.ewm_img {
	width: 100%;
	z-index: 999;
	position: absolute;
	top: 0;
	height: 960upx;
}
.bcbtn {
	background-color: #e9b47a;
	border: 1px solid #e9b47a;
	border-radius: 100px;
	width: 706upx;
	color: #212121;
	position: absolute;
	top: 1050upx;
	left: 50%;
	margin-left: -350upx;

}
.qrcode1{
	width:300upx;
	height:300upx;
	position: absolute;
	left: 227upx;
	top:404upx;
}
.qrimg-i{
	display:flex;
	justify-content: center;
}
	.canvasContent{
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    top: 0;
	    background: rgba(0,0,0,0.5);
	    display: flex;
	    align-items: center;
	    flex-direction: column;
	    padding-top: 50upx; 
		 z-index: 99999;
	}
	.canvasName{
	    width: 100%;
	    height: calc(100vh - 300upx);
	}
	.canvasText{
	    margin: 30upx 0 20upx;
	    color: #FFFFFF;
	}
	.errorImage{
		margin-top: 20upx;
	    width: 80upx;
	    height: 80upx;
	}
</style>
