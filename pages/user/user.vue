<template>  
    <view class="container">  
		
		<view class="user-section">
			<image class="bg" src="/static/me_img.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<view v-if="userinfo.avatar=='' || userinfo.avatar==null ">
						<image  src="../../static/missing-face.png" class="portrait"></image>
					</view>
					<view v-else>
						<image v-if="userinfo.avatar.includes('https')" class="portrait" :src="userinfo.avatar"></image>
						<image v-else class="portrait" :src="src+userinfo.avatar"></image>
					</view>
					<!-- <image v-else class="portrait" :src="src+img"></image> --> 
				</view>
				<view class="info-box">
					<text class="username" v-if="userinfo.username=='' || userinfo.username==null ">游客</text>
					<text class="username" v-else>{{ userinfo.username |mobileFilter}}</text>
				</view> 
				
				<!-- <view class="info-btn">
					<navigator url='../recharge/recharge' open-type="navigate">
						<button class="chongzbtn">充值</button>
					</navigator>
				</view> -->
				<view>
					<button class="dl_btn" v-if="userinfo.level==0">角色：粉丝</button>
					<button class="dl_btn" v-else-if="userinfo.level==1">角色：国代</button>
					<button class="dl_btn" v-else-if="userinfo.level==2">角色：大区运营商</button>
					<button class="dl_btn" v-else-if="userinfo.level==3">角色：城市运营商</button>
					<button class="dl_btn" v-else>角色：推广导师</button>
				</view>
				<view class="gfsq" v-if="userinfo.level==0">
					· 授权状态：未授权
				</view>
				<view class="gfsq" v-else>
					· 授权状态：已授权
				</view>
			</view>
			
			<view class="vip-card-box">
				<view class="tj-sction">
					<view class="tj-item">
						<navigator url='../withdRecord/withdRecord' open-type="navigate">
							<view class="tj-item">
								<text class="mb5 fz14">已提现</text>
								<text class="num fz14">{{userinfo.cash_out|| '0.00'}}</text>
							</view>
						</navigator>
					</view>
					<view class="tj-item">
						<!-- <navigator url='../totalBonus/totalBonus' open-type="navigate"> -->
							<view class="tj-item">
								<text class="mb5 fz18">利润总额</text>
								<text class="num fz18">{{userinfo.allmoney|| '0.00'}}</text>
							</view>
						<!-- </navigator> -->
					</view>
					<view class="tj-item">
						<navigator url='../cashWithdrawal/cashWithdrawal' open-type="navigate">
							<view class="tj-item">
								<text class="mb5 fz14">未提现</text>
								<text class="num fz14">{{userinfo.no_cash_out|| '0.00'}}</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
		>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" :class='item.class'>
						<navigator :url=" item.src+'?level='+userinfo.level" open-type="navigate">
							<view class="uni-list-cell-navigate uni-navigate-right list-cell " >
								  <image :src='item.icon' style="width:20px;height:20px;margin-right:30rpx" class="fl"></image>
								   {{item.name}}
								   <!-- &#xe660; --> 
								   <span class="iconfont fr" style="font-size: 12px;color:#818181;">&#xe660;</span>
							</view>
						</navigator>
					 
				 </view>
				</view>
			</view>
			
		</view>
    </view>  
</template>  
<script>  
	var request= require("@/common/service.js");
	var formatNumber=require("@/common/formatter.js");
	var formatter=require("@/common/formatter.js");
	import listCell from '@/components/mix-list-cell';
    import {  
        mapState 
    } from 'vuex';  
	var _self;
    export default {
		components: {
			listCell
		},
		filters:{
		    mobileFilter(val){
		      let reg = /^(.{3}).*(.{4})$/
		      return val.replace(reg,'$1****$2')
			  }
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				pageAtTop:true,
				userinfo:[],
				img:'/static/missing-face.png',
				src:'https://fenxiao.99zhifukeji.com/',
				list:[
					{'name':'个人资料',icon:require("static/me/gerenziliao.png"),'src':'../userinfo/userinfo'
					},
					{
					'name':'推广二维码',icon:require("static/me/weibiaoti-_huabanfuben@2x.png"),'src':'../QRcode/QRcode'
					},
					{
					'name':'我的订单',icon:require("static/me/shichang@2x.png"),'src':'../faceOrder/faceOrder'
					},
					{
					'name':'我的团队',icon:require("static/me/gengxin@2x.png"),'src':'../myMarket/myMarket'
					},
					{
					'name':'商家流水分润',icon:require("static/me/zongjiaoyichaxun@2x.png"),'src':'../customerService/customerService'
					},
					{
					'name':'推广奖金',icon:require("static/me/order@2x.png"),'src':'../totalBonus/totalBonus'
					}
					]
					
					// ,{
					// 'name':'系统更新',icon:require("static/me/gengxin@2x.png"),'src':'../edition/edition'
					// }]
					
			}
		},
		onLoad(){
			_self = this;
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
			_self.aaa()
		},
		onShow() {
			_self.aaa()
		},
		methods: {
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
			aaa:function(){
				request.user(function(res){
					console.log(res.data)
					if(res.code == 1001 || res.code == 0){
						uni.showToast({
							icon: 'none',
							title: '您还没有登录,请登录'
						});
						setTimeout(function(){
								uni.navigateTo({
									url: '/pages/public/login'
								})
							},1000)
					}else if(res.code==1){
						_self.userinfo=res.data;
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
			}
		},
		
		
		
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	page{
		background-color: #fff;
	}
	
	.list-cell{
		font-size:28rpx;
		color: #484848;
		padding:36rpx 40rpx; 
		border-bottom:1px solid #D6D6D6;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
	
		/* padding: 100upx 30upx 0; */
		position:relative;
		.bg{
			height:500upx;
			width: 100%;
			position:absolute;
			left: 0;
			top: 0;
			/* z-index: 9999999; */
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 90upx;
			height: 90upx;
			/* border:5upx solid #fff; */
			border-radius: 50%;
			position: absolute;
			left:84upx;
			top:94upx;
			
		}
		.username{
			font-size: $font-lg ;
			color:#FFFFFF;
			position: absolute;
			left:200upx;
			top:114upx;
		}
		.chongzbtn{
			background-color: #E7C295;
			color:#212121;
			font-size: 16px;
			border-radius: 100px;
			width:184rpx;
			height: 32px;
			line-height: 32px;
			border:1px solid #9D5900;
			position: absolute;
			right:70upx;
			top:100upx;
		}
		.dl_btn{
			background-color: #F1B76B;
			border:1px solid #CB7B13;
			width:284rpx;
			height:52rpx;
			line-height:52rpx;
			border-radius: 100px;
			font-size: 14px;
			position: absolute;
			left:70rpx;
			top:210upx;
			
		}
		.gfsq{
			position: absolute;
			left:80rpx;
			top:280upx;
			color:#B96E0D;
			font-size: 24rpx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		 color: #f7d680; 
		height: 490upx;
		/* background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8)); */
		/* border-radius: 16upx 16upx 0 0;
		overflow: hidden;*/
		position: relative;
		.tj-sction{
			@extend %section;
			position: absolute;
			top:202rpx;
			width:100%;
			background-color: #0F0F0F;
			.tj-item{
				@extend %flex-center;
				flex-direction: column;
				height: 140upx;
				font-size: $font-sm;
				color: #FEF1C6;
				
			}
			.num{
				font-size: $font-lg;
				color: #FEF1C6;
				margin-bottom: 8upx;
			}
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		/* padding: 0 30upx; */
		position:relative;
		/* background: #f5f5f5; */
		/* padding-bottom: 20upx; */
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>