<template>
	<view class="container">
	
		<view class="itemList">
			<view class="title fz16">
				选择付款方式
			</view>
			<view class="zhifu_zf" v-for="(payStypeVal, index) in payStype" :key="index" @click="zhifuChange(index)">
				<label for=""><image :src="payStypeVal.image" mode="" class="zhifu_image"></image></label>
				<view style="position: absolute;top:40upx;left:120upx;font-size: 32rpx;">{{ payStypeVal.name }}
					<view  style="color:#666666;padding-top: 10upx;font-size: 28rpx;">{{ payStypeVal.cont }}</view>
				</view>
				<label><image :src="isCheckState==index?iconsel: iconNosel" class="section" :class="isCheckState==index?iconsel: iconNosel" ></image></label>                
				<view class="xian"></view>
			</view>
		</view>
		<button type="primary " class="zcbtn" @tap="czBtn">充值</button>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var _self;
	export default {
	     data() {
	         return {
					iconsel: "/static/selected.png",
					iconNosel: "/static/static.png",
					 isCheckState: 0,
					 payStype:[
	                 { name:"微信支付", image:require('@/static/wximg.png'),cont:'快捷安全，支持微信支付'}
	                ],
					order_sn:''
					
				}
			},
			onLoad(option){
			  _self = this;
			  _self.order_sn=option.order_sn;
			  _self.result = uni.getStorageSync('RESULT');
			  request.setHToken(_self.result)
			},
			methods: {
				zhifuChange(index){
					this.isCheckState = index;
				},
				czBtn: function() {
					 // #ifdef APP-PLUS
						uni.request({
							url: 'https://fenxiao.99zhifukeji.com/api/wechat/apppay',
							data: {
								order_sn:_self.order_sn
							},
							header: {//自定义请求头信息
								'custom-header': 'application/json',
								 'token':_self.result
							},
							success: (res) => {
								console.log(res)
								// uni.requestPayment({
								//     provider: 'wxpay',
								//     timeStamp: String(Date.now()),
								//     nonceStr: 'A1B2C3D4E5',
								//     package: 'prepay_id=wx20180101abcdefg',
								//     signType: 'MD5',
								//     paySign: '',
								//     success: function (res) {
								//         console.log('success:' + JSON.stringify(res));
								//     },
								//     fail: function (err) {
								//         console.log('fail:' + JSON.stringify(err));
								//     }
								// });
							}
						});		
						
					// #endif
					// #ifdef MP 	
						console.log('小程序')
						if(_self.isCheckState==0){
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									let code = loginRes.code;
									// 请求后台数据 prepay_id paySign nonceStr timeStamp
									uni.request({
										url: 'https://fenxiao.99zhifukeji.com/api/wechat/pay',
										data: {
											code: code,
											order_sn:_self.order_sn
										},
										header: {//自定义请求头信息
											'custom-header': 'application/json',
											 'token':_self.result
										},
										success: (res) => { 
											console.log()
											//调起支付
											uni.requestPayment({
												provider: 'wxpay',
												timeStamp: res.data.data.timeStamp,
												nonceStr: res.data.data.nonceStr,
												package: res.data.data.package,
												signType: 'MD5',
												paySign: res.data.data.sign,
												success: function(res) {
													console.log(res)
													console.log('success:' + JSON.stringify(res));
													uni.showToast({
														 icon: 'none',
														 title: res.msg,
													 });
													 setTimeout(function(){ 
														 uni.redirectTo({
															url: '/pages/order/paySuc'
														 })
													}, 1000);	
												},
												fail: function(err) {
													console.log('fail:' + JSON.stringify(err));
													uni.showToast({
														 icon: 'none',
														 title: err.errmsg,
													}); 
												}
											});
										}
									});
								}
							});
						}else{
							
						}
					// #endif
				
			},
		}
	}
</script>

<style  lang="scss">
	page{
		background-color: #FAFAFA;
	}

	.itemList{
		background-color: #fff;
		width:95%;
		padding: 40upx;
		margin: 22upx;
		border-radius: 20upx;
		box-shadow:0 0 40px #EBEBEB;
		.zhifu_image{
			width:84upx;
			height:84upx;
			margin-left: 10upx;
			margin-top: 30upx;
			position: relative;
			top: 10upx;
		}
		.section{
			width:39upx;
			height:39upx;
			position: absolute;
			right: 10upx;
			top:60upx;
		}
	}
	.zhifu_zf {
	    margin-bottom: 10upx;
	    position: relative;
	    bottom: 10upx;
	    width: 610upx;
	}
	.zcbtn{
		border-radius: 100px;
		height: 90upx;
		line-height: 90upx;
		margin:0 75upx;
		margin-top:50upx;
		background-color: #FDBB69;
		border:1px solid #FDBB69;
		&:after{
			border:1px solid #FDBB69;
		}
	}
</style>
