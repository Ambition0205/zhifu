<template>
	<view style="height:110vh;">
		<view class="content">
			<view class="top_img">
				<image src="../../static/login/bgtop.png" style="width:100%;height:450upx"></image>
			</view>
			<view class="goods-list" style="margin-top: -120upx;">
				<view 
					v-for="(item, index) in goodList" :key="index"
					class="goods-item"  
					@click="navToDetailPage(item)"
				> 
					<view class="image-wrapper">
						<image :src="src+item.imageurl" mode="aspectFill"></image>
					</view>
					<image src="../../static/热销产品.png"  v-show="item.hotFlag==1" style="width:60rpx;height:60rpx;position: absolute;top:30rpx;right:20rpx;"></image>
					<text class="title clamp">{{item.name}}</text>
					<view class="price-box">
						<text class="price">{{item.price}}</text>
						<text>热销: {{item.saleCount + item.mockCount}}</text>
					</view>
				</view>
			</view>
			<view class="loading">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var request = require("@/common/service.js");
	var _self, page = 1, timer = null;;
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				filterIndex: 0,
				goodList:[],
				src:'https://fenxiao.99zhifukeji.com/',
				loadingText: '正在加载...',
			};
		},
		
		onLoad(options){
			_self = this;
			// #ifdef H5
			_self.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			_self.cateId = options.tid;
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
			this.getnewsList();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.getnewsList();
		},
		// 上拉加载
		onReachBottom: function() {
			if(timer != null){
			   clearTimeout(timer);
			  }
			  timer = setTimeout(function(){
				_self.getmorenews();
			  }, 1000);
			
		},
		methods: {
			//列表
			getmorenews:function(){
				let data={
					page:page
				}
				 if(_self.loadingText != '' && _self.loadingText != '加载更多'){
				    return false;
				   }
				 _self.loadingText = '正在加载...';
				uni.showNavigationBarLoading();//显示加载动画
				request.storeIndex(data,function(res){
					if (res.data.length ==0) {//没有数据
						_self.loadingText = '没有更多数据了';
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					page++;//每触底一次 page +1
					_self.goodList = _self.goodList.concat(res.data);//将数据拼接在一起
					 _self.loadingText = '加载更多';
					uni.hideNavigationBarLoading();//关闭加载动画
				},function(err){
					 uni.hideLoading();
					 uni.showToast({
						 icon: 'none',
						 title: err.errmsg,
					 });
				})
			},
			 getnewsList: function() {//第一次回去数据
				page = 1;
				  _self.loadingText = '加载更多';
				uni.showNavigationBarLoading();
				let data={
					page:page
					}
				request.storeIndex(data,function(res){
					// 未登录状态
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
						if(res.data.length == 0){
							uni.hideNavigationBarLoading();
							 uni.stopPullDownRefresh();
							_self.loadingText = '没有更多数据了';
							return false;
						}else{
							 page++;//得到数据之后page+1
							 _self.goodList = res.data;
							 uni.hideNavigationBarLoading();
							 uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}
					}else{
						uni.showToast({
						 icon: 'none',
						 title: err.msg,
						});
					}
				},function(err){
				 uni.hideLoading();
				 uni.showToast({
					 icon: 'none',
					 title: err.errmsg,
				 });
			});
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: #F3F3F3;
	}
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		position: relative;
		margin: 0 30upx;
		
		border-radius: 20upx;
		height: 100%;
		.goods-item{
			display:flex;
			flex-direction: column;
			box-shadow: 0upx 10upx 10upx rgba(0,0,0,.1);
			width: 48%;
			padding-bottom: 15upx;
			margin-bottom: 20upx;
			background-color: #fff;
			border-radius: 20upx;
			position: relative;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 340upx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 60upx;
			font-size: 28upx;
			padding:0 10upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:0 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: #E5A779;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
.loading{
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
