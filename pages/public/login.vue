<template>
	<view class="container">
		<!-- <view class="left-bottom-sign"></view> -->
		<text class="back-btn iconfont" @click="navBack">&#xe618;</text>
		<view class="">
			<image src="/static/login/bgtop.png" class="bg_top_img"></image>
		</view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<!-- <view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view> -->
			<view class="input-content mt30" >
				<view class="input-item" style="margin-bottom: 60rpx;">
					<span class="iconfont font_color_or font-b ml64">&#xe65f;</span>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="手机号"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
						name="mobile"
						style="position: absolute;left:200rpx;"
					/>
				</view>
				<view class="input-item ">
					<span class="iconfont font_color_or font-b ml64">&#xe85a;</span>
					<input 
						type="mobile" 
						value="" 
						placeholder="密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password" 
						@confirm="toLogin"
						name="password"
						@input="inputChange"
						style="position: absolute;left:200rpx;"
					/>
				</view>
			</view>
			<view style="margin-top:30upx;" class="content">
				<text class="register-section"  @click="toRegist" style="float:left">注册账号</text>
				<text class="forget-section" style="float:right"  @click="toForget">忘记密码?</text>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			
		</view>
		
	</view>
</template>

<script>
	var request= require("@/common/service.js");
	 import {   mapState,mapMutations  } from 'vuex'
	var _self;
	export default {
		onLoad(ops) { 
			_self=this; 
		},
		data(){
			return {
				mobile: '',
				password: '',
				logining: false
			}
		},
		onLoad(){
		},
		computed: mapState(['forcedLogin','hasLogin','token']),
		methods: {
			...mapMutations(['login']),
			navBack(){
				uni.navigateBack();
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			toRegist(){
				// this.$api.msg('去注册');
				uni.navigateTo({
					url: `/pages/register/register`
				})
			},
			toForget(){
				uni.navigateTo({
					url: `/pages/forget/forget`
				})
			},
			toLogin: function () {
			  _self = this;
		
			  if ( _self.password.length < 6) {
			      uni.showToast({
			          icon: 'none',
			          title: '密码最短为 6 个字符'
			      });
			      return;
			  }
			 // #ifdef APP-PLUS
				let parma={
				  username:  _self.mobile,
				  password:  _self.password,
				}
				uni.showLoading({
					title: '正在登录...',
					mask: true
				})
				request.applogin(parma,function(res){
				  uni.hideLoading();
				  if(res.code==1){
					uni.showToast({
						icon: 'none',
						title: res.msg,
					});
					request.setHToken(res.data);
					console.log(res.data)
					// uni.setStorageSync('RESULT', res.result);
					uni.setStorageSync('RESULT', res.data);
					let result = uni.getStorageSync('RESULT');
					console.log(result)
					uni.reLaunch({
					  url: '../index/index' 
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
							 title: err.errmsg,
						 });
				}) 
			 // #endif
			 // #ifdef MP 
			  uni.login({
			  	success:function(res){
			  		console.log(res)
			  		var code= res.code;
					let parma={
					  username:  _self.mobile,
					  password:  _self.password,
					  code:code
					}
					uni.showLoading({
						title: '正在登录...',
						mask: true
					})
					request.login(parma,function(res){
					  uni.hideLoading();
					  if(res.code==1){
						uni.showToast({
							icon: 'none',
							title: res.msg,
						});
						request.setHToken(res.data);
						console.log(res.data)
						// uni.setStorageSync('RESULT', res.result);
						uni.setStorageSync('RESULT', res.data);
						let result = uni.getStorageSync('RESULT');
						console.log(result)
						uni.reLaunch({
						  url: '../index/index' 
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
								 title: err.errmsg,
							 });
						}) 
					},
				})
				// #endif
			 
			},
		  }  

	}
</script>
<style lang='scss'>
	page{
		background: #F9F9F9;
	}
	.white{
		color:#fff;
	}
		
	.font_color_or{
		color:#F8C693;
	}
	.font-b{
		font-size: 52rpx;
	}
	.mt30{
		margin-top: 60upx;
	}
	.float_r{
		float: right;
	}
	.float_l{
		float: left;
	}
	.bg_top_img{
		width: 100%;
		height: 520upx;
	}
	.ml64{
		margin-left: 32upx;
	}
	.container{
		/* padding-top: 115px; */
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #F9F9F9;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #F9F9F9;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: #fff;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 46upx;
	}
	.content{
		padding: 0 50upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 100upx;
		border-radius: 100px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 90upx;
		line-height: 90upx;
		border-radius: 50px;
		margin-top: 236upx;
		background: $uni-color-orange;
		color: #303030;
		border:1px solid $uni-color-orange;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
			border:1px solid $uni-color-orange;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: #666666;
		text-align: center;
		
	}
	.register-section{
		/* position:absolute;
		left: 0;
		bottom: 50upx; */
		/* width: 100%; */
		font-size: $font-sm+2upx;
		color: #666666;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
