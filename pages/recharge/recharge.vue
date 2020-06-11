<template>
	<view class="container">
		<view class="popup_item">
			<text style="color:#999999;font-size: 28upx;margin-left: 20upx;">充值金额</text>
			<input class="input_item" v-model="fee" placeholder='请输入充值金额（元)'></input>
		</view>
		<view class="itemList">
			<view class="title fz16" >
				选择付款方式
			</view>
			<view class="zhifu_zf" v-for="(payStypeVal, index) in payStype" :key="index" @click="zhifuChange(index)">
				<label for=""><image :src="payStypeVal.image" mode="" class="zhifu_image"></image></label>
				<view class="fz16" style="position: absolute;top:40upx;left:120upx;">{{ payStypeVal.name }}
					<view class="fz14" style="color:#666666;padding-top: 10upx;">{{ payStypeVal.cont }}</view>
				</view>
				<label><image :src="isCheckState==index?iconsel: iconNosel" class="section" :class="isCheckState==index?iconsel: iconNosel" ></image></label>                
				<view class="xian"></view>
			</view>
		</view>
		<button type="primary " class="zcbtn" @tap="zcbtn">充值</button>
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
	                 { name:"微信支付", image:require('@/static/weixin.png'),cont:'快捷安全，支持微信支付'},
	                 // { name:"支付宝支付", image:require('@/static/weixin.png'),cont:'快捷安全，支持银行卡支付'}
					],
					order_sn:'',
					fee:''
				}
			},
			onLoad(option){
			  _self = this;
			  _self.order_sn=option.order_sn;
			  _self.result = uni.getStorageSync('RESULT');
			  request.setHToken(_self.result)
			},
			methods: {
				zcbtn: function() {
					_self = this;
					let data={
						fee:_self.fee
					}
					console.log(data)
					request.rechargeSetOrder(data,function(res){
							  if(res.code==1){
								  _self.order_sn=res.data.order_sn;
									uni.login({
										provider: 'weixin',
										success: function(loginRes) {
											let code = loginRes.code;
											// 请求后台数据 prepay_id paySign nonceStr timeStamp
											uni.request({
												url: 'https://fenxiao.99zhifukeji.com/api/recharge/pay',
												data: {
													code: code,
													order_sn:_self.order_sn
												},
												header: {//自定义请求头信息
													'custom-header': 'application/json',
													 'token':_self.result
												},
												success: (res) => {
													console.log(res)
													//调起支付
													uni.requestPayment({
														provider: 'wxpay',
														timeStamp: res.data.data.timeStamp,
														nonceStr: res.data.data.nonceStr,
														package: res.data.data.package,
														signType: 'MD5',
														paySign: res.data.data.sign,
														success: function(res) {
															console.log()
															uni.showToast({
																icon: 'none',
																title: res.msg
															});
															setTimeout(function(){
																uni.reLaunch({
																  url: '../user/user' 
																});
															 },1000)
															console.log('success:' + JSON.stringify(res));
														},
														fail: function(err) {
															console.log('fail:' + JSON.stringify(err));
														}
													});
												}
											});
										}
									});
							  }else{
								uni.showToast({
									icon: 'none',
									title: res.msg
								});
							} 
					},function(err){
						 uni.hideLoading();
						 uni.showToast({
							 icon: 'none',
							 title: err.msg,
						 });
					}) 
				
				},
				zhifuChange(index){
					this.isCheckState = index;
				}
			}
	}
</script>

<style  lang="scss">
	page{
		background-color: #FAFAFA;
	}
	.popup_item{
		background-color: #fff;
		width:95%;
		height: 114upx;
		line-height: 114upx;
		margin: 22upx;
		border-radius: 20upx;
		box-shadow:0 0 40px #EBEBEB;
		position: relative;
		.input_item{
			height: 84upx;
			line-height: 84upx;
			font-size: 24upx;
			border-radius: 100upx;
			background-color: #F6F6F6;
			position: absolute;
			width:497upx;
			top:15upx;
			right: 32upx;
			padding-left: 32upx;
		}
	}
	.itemList{
		background-color: #fff;
		width:95%;
		padding: 40upx;
		padding-top:30upx;
		margin: 20upx;
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
