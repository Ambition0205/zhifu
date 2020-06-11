<template>
	<view class="">
		<view class="inv-h-w">
			<text :class="['inv-h',Inv==0?'inv-h-se':'']" @click="tabClick(0)">未完成</text>
			<text :class="['inv-h',Inv==1?'inv-h-se':'']" @click="tabClick(1)">已完成</text>
		</view>
	 

	<view style="margin:13px;">
		<view class="" v-show="Inv == 0" >
			<!-- 订单列表 -->
			<view  v-for="(item,index) in uncomplete" :key="index" class="order-item">
				<view class="i-top b-b">
					<text class="time">{{(item.create_time)*1000 | timeStamp}}</text>
					<text v-if="item.status==0">待支付</text>
					<text v-if="item.status==1">已支付</text>
					<text v-if="item.status==2">支付失败</text>
					<text v-if="item.status==3">已发货</text>
				</view>
				<navigator :url="'./orderDetail?id='+item.id"  open-type="navigate">
					<view 
					class="goods-box-single">
					<image class="goods-img" :src="src+item.imageurl" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp">{{item.name}}</text>
						<text class="price">{{item.unit_price}}</text>
					</view>
				</view>
				</navigator>
				<view class="price-box">
					共
					<text class="num">{{item.goods_num}}</text>
					件商品 实付款
					<text class="price">{{item.goods_num*item.unit_price}}</text>
				</view>
				
				<view class="action-box b-t" v-if="item.status ==0 ">
					<button class="action-btn" @click="delOrder(item)">取消订单</button>
					<button class="action-btn recom" @click="awayPay(item)">立即支付</button>
				</view>
				<view class="action-box b-t" v-if="item.status == 2">
					<button class="action-btn recom" @click="delOrder(item)">删除订单</button>
				</view>
				<view class="action-box b-t" v-if="item.status == 3 ">
					<button class="action-btn recom" @click="cancelOrder(item)">确认收货</button>
				</view>
			
			</view>
			<text class="loading-text">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>	 
		
		<view class="" v-show="Inv == 1">
			<!-- 订单列表 -->
			<!-- 订单列表 -->
			<view 
				v-for="(item,index) in complete" :key="index"
				class="order-item"
			>
				<view class="i-top b-b">
					<text class="time">{{(item.create_time)*1000 | timeStamp}}</text>
					<text v-if="item.status==4">已完成</text>
				</view>
				<navigator :url="'./orderDetail?id='+item.id"  open-type="navigate">
				<view  class="goods-box-single">
					<image class="goods-img" :src="src+item.imageurl" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp">{{item.name}}</text>
						<text class="price">{{item.unit_price}}</text>
					</view>
				</view>
				</navigator>
				<view class="price-box">
					共
					<text class="num">{{item.goods_num}}</text>
					件商品 实付款
					<text class="price">{{item.goods_num*item.unit_price}}</text>
				</view>
			</view>
		
			<text class="loading-text">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>
	</view>
</view>
</view> 
</template>

<script>
	var request = require("@/common/service.js");
	var formatter = require("@/common/formatter.js");
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var _self,timer = null;
	export default {
		data() {
			return {
				Inv:0,
				topMation:{},
				listCon:[],
				complete:[],
				uncomplete:[],
				src:'https://fenxiao.99zhifukeji.com/',
				urlImg : 'https://fenxiao.99zhifukeji.com/public/static/',
				loadingType: 0,
				contentText: {
				    contentdown: "上拉显示更多",
				    contentrefresh: "正在加载...",
				    contentnomore: "没有更多数据了"
				},
				navIdx:'',
				page:2
			};
		},
		onLoad(){
			_self = this;
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
			_self.Information()
		},
		// onShow() {
		// 	_self = this;
			
		// },
		//下拉刷新
		onPullDownRefresh(){
			_self.Information()
		},
		// 上拉加载
		onReachBottom: function() {
			_self.getMore()
		},
		components: {
		},
		filters: {
			timeStamp: function(value) {
				var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var sdate = ("0" + date.getDate()).slice(-2);
				var hour = ("0" + date.getHours()).slice(-2);
				var minute = ("0" + date.getMinutes()).slice(-2);
				var second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
				// 返回
				return result;
			}
		},
		methods: {
			getMore:function(){
				if (_self.loadingType != 0) {//loadingType!=0;直接返回
					return false;
				}
				_self.loadingType = 1;
				uni.showNavigationBarLoading();//显示加载动画
				console.log(_self.page)
				let data={
					page:_self.page
				}
				request.getGoodsOrderList(data,function(res){
					// 未完成
					if (_self.uncomplete.length==res.data.uncomplete_num||res.data.uncomplete.length==0) {//没有数据
						_self.loadingType = 2;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						return false;
					}else{
						_self.page++;
						_self.uncomplete.push(...res.data.uncomplete);
						_self.loadingType = 0;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
					
					// 已完成
					if (_self.complete.length==res.data.complete_num||res.data.complete.length==0) {//没有数据
						_self.loadingType = 2;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						return false;
					}else{
						_self.page++;
						_self.complete.push(...res.data.complete);
						_self.loadingType = 0;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
					
				})
			},
			
			formatDate(payDate) {
				return formatter.formatDate(payDate, 'yyyy-MM-dd ')
			},
			// 数据渲染
			Information:function(){
					request.getGoodsOrderList({page:1},function(res){
						if(res.code==1){
							console.log(res.data.uncomplete.length)
							if(res.data.uncomplete.length==0){
								_self.loadingType = 2;//将loadingType归0重置
								uni.hideNavigationBarLoading();//关闭加载动画
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
								_self.uncomplete=[];
								return false;
							}else{
								_self.uncomplete = res.data.uncomplete;
								uni.hideNavigationBarLoading();
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							}
							// 已完成
							if(res.data.complete.length==0){
								_self.loadingType = 2;//将loadingType归0重置
								uni.hideNavigationBarLoading();//关闭加载动画
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
								_self.complete=[];
								return false;
							}else{
								_self.complete=res.data.complete;
								uni.hideNavigationBarLoading();
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						
							}	
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
			// 切换按钮
			tabClick(Inv){
				this.Inv = Inv;	
			},
			// 删除或取消订单
			delOrder:function(item){
				console.log(item.id)
				let data={
					id:item.id
				}
				request.deleteGoodsOrder(data,function(res){
					if(res.code==1){
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						_self.Information()
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
			//  确认收货
			cancelOrder:function(item){
				console.log(item.id)
				let data={
					id:item.id
				}
				request.confirmReceipt(data,function(res){
						if(res.code==1){
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							_self.Information()
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
			// 立即支付
			awayPay:function(item){
				_self.order_sn=item.order_sn;
				uni.navigateTo({
					url: '/pages/choosePayMethod/choosePayMethod?order_sn='+_self.order_sn
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F9F9;
	}
	.loading-text{
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
	// 分类按钮样式
	.inv-h-w{
		height: 80upx;
		position: flex;
		background-color: #fff;
		text-align: center;
	}
	.inv-h{
		font-size: 30upx;
		padding: 0 50upx;
		padding-bottom: 20upx;
		text-align: center;
		color: #212121;
		height: 80upx;
		line-height: 80upx;
		margin:0 60upx;
	}
	.inv-h-se{
		color: #E6BC84;
		border-bottom: 4upx solid #E6BC84;
	
	}
page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: #E7C599;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 100%;
					height: 0;
					border-bottom: 2px solid #E7C599;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					margin-top: 25upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff;
				color: $uni-color-primary;
				&:after{
					// border-color: $uni-color-primary;
					border:1px solid #E9B47A!important;
				}
			}
		}
	}
	
	
	.red{
		color:red!important;
		border:1px solid red!important;
		:after{
			border: 1px solid red!important;
		}
	}
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
