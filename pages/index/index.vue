<template>
	<scroll-view scroll-y="" class="container">
		<view class="">
			<image src="/static/login/bgtop.png" class="bg_top_img"></image>
		</view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="uni-form-item uni-column column-with-btn" @tap="gotosheng" >
				<image src="/static/index/sheng.png" class="w112_h112 float_l"></image>
				<view class="float_l" style="width:50%;">
					<view style="color:#181818;font-size: 36upx;font-weight:700;line-height:50upx;">申请大区运营商</view>
					<view style="color:#BBBBBB;font-size: 28upx;line-height:50upx;">点击前往申请大区运营商</view>
				</view>
				<image src="/static/index/you.png" style="margin-right:36rpx;width:73upx;height:73upx;"></image>
			</view>   
			<view class="uni-form-item uni-column column-with-btn" @tap="gotshi">
				<image src="/static/index/shi.png" class="w112_h112 float_l"></image>
				<view class="float_l" style="width:50%;">
					<view style="color:#181818;font-size: 36upx;font-weight:700;line-height:50upx;">申请城市运营商</view>
					<view style="color:#BBBBBB;font-size: 28upx;line-height:50upx;">点击前往申请城市运营商</view>
				</view>
				
				<image src="/static/index/you.png" style="margin-right:36rpx;width:73upx;height:73upx;"></image>
			
			</view>
			<view class="uni-form-item uni-column column-with-btn" @tap="gotoqu" style="border-bottom: none;">
				<image src="/static/index/qu.png" class="w112_h112 float_l" ></image>
				<view class="float_l" style="width:50%;">
					<view style="color:#181818;font-size: 36upx;font-weight:700;line-height:50upx;">申请运营推广导师</view>
					<view style="color:#BBBBBB;font-size: 28upx;line-height:50upx;">点击前往申请运营推广导师</view>
				</view>
				<image src="/static/index/you.png" style="margin-right:36rpx;width:73upx;height:73upx;"></image>
							
				
			</view>
		</view>
	</scroll-view>
</template>

<script>
	var request = require("@/common/service.js");
	var _self;
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		onLoad(){
			_self = this;
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
		},
		onShow() {
			_self = this;
			_self.readyindex()
		},
		methods: {
			readyindex:function(){
				request.agentIndex(function(res){
					 if(res.code==1){
						_self.userinfo=res.data;
					  }else{
						uni.showToast({
							icon: 'none',
							title: res.msg+',请重试登录'
						});
						uni.navigateTo({
							url: '/pages/public/login'
						})
					  } 
				},function(err){
					 uni.hideLoading();
					 uni.showToast({
						 icon: 'none',
						 title: err.errmsg,
					 });
				})
			},
			gotosheng(){
				//省代
				uni.navigateTo({
					url: '/pages/provincialAgent/provincialAgent?id=1'
				})
			},
			gotshi(){
				uni.navigateTo({
					url: '/pages/municipalAgency/municipalAgency?id=2'
				})
			},
			gotoqu(){ 
				uni.navigateTo({
					url: '/pages/districtAgent/districtAgent?id=3'
				})
			},
		}
	}
</script>
<style lang='scss'>
	$color-primary: #b49950;
	page{
		background: #EFEFEF;
	} 
	.w112_h112{
		width: 88rpx;
		height: 88rpx;
		margin-left: 46rpx;
	}
	.float_l{
		float: left;
	}
	.bg_top_img{
		width: 100%;
		height: 450upx ; 
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
	.uni-form-item{
		height: 224rpx;
		line-height: 224rpx;
		background-color: #fff;
		margin:30upx 20upx;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.img-captcha{
		width: 150upx;
		height: 60upx;
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
	
</style>
