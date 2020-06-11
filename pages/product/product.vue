<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in goodsindex" :key="index">
					<view class="image-wrapper">
						<image
							:src="src+item.imgurl" 
							class="loaded" 
							mode="aspectFill"
							
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="introduce-section" >
			<text class="title">{{goodsDetail.name}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{goodsDetail.price}}</text>
				<!-- <text class="m-price">¥{{goodsDetail.marketPrice}}</text>
				<text class="coupon-tip">7折</text> -->
				<text class="xiaol">月销量: {{goodsDetail.saleCount}}</text>
			</view>
		</view>
		<view class="detail-desc" style="margin-bottom: 90upx;">
			<view class="d-header">
				<text>商品介绍</text>
			</view>
			<view v-for="(item,index) in goodsdesc" :key="index">
				<image
					:src="src+item.imgurl" 
					class="detail-img" 
					:style="{ width:windowWidth+'px'}"
					mode="widthFix"
					style="height:100%"
				></image>
			</view>
		</view>
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	import share from '@/components/share';
	var request = require("@/common/service.js");
	var _self;
	export default{
		components: {
			share 
		},
		data() {
			return {
				specClass: 'none',
				specSelected:[],
				goodsDetail:{},
				goodsindex:{},
				goodsdesc:{},
				windowWidth: 0,
				favorite: true,
				src:'https://fenxiao.99zhifukeji.com/',
				id:'',
			};
		},
		async onLoad(options){
			_self = this;
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			_self.id = options.id;
			// if(id){
			// 	this.$api.msg(`点击了${id}`);
			// }
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
			this.storeDetail(),
			uni.getSystemInfo({
				success: function (res) {
					_self.windowWidth=res.windowWidth;
					console.log("22："+_self.windowWidth);
				}
			});
		},
		onShow() {
			
		},
		methods:{
			//列表
			storeDetail:function(){
				let data={
					id:_self.id
				}
				request.storeDetail(data,function(res){
					 if(res.code==1){
						_self.goodsDetail=res.data;
						console.log(_self.goodsDetail)
						_self.goodsdesc=res.data.detail;
						_self.goodsindex=res.data.index;
					  }
				},function(err){
					 uni.hideLoading();
					 uni.showToast({
						 icon: 'none',
						 title: err.errmsg,
					 });
				})
			},
			buy(){
				let id = _self.id;
				uni.navigateTo({
					url: `/pages/order/createOrder?id=${id}`
				})
			},
			stopPrevent(){}
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		/* padding-bottom: 160upx; */
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 602upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 36upx;
			color: $font-color-dark;
			font-weight: 700;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
		.xiaol{
			color:#A4A4A4;
			margin-left: auto;
		}
	}
	
	

	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	

	/* 底部操作菜单 */
	.page-bottom{
		
		position:fixed;
		left: 0upx;
		bottom:0upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 90upx;
		/* margin-top: 250upx; */
		.action-btn-group{
			display: flex;
			width:100%;
			height: 90upx;
			overflow: hidden;
			background:$uni-color-primary;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: 32upx;
				padding: 0;
				border-radius: 0;
				background: transparent;
				color:#000;
				
			}
		}
	}
	
</style>
