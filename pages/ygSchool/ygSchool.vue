<template>
	<view class="">
		<navigator :url="'./mationDetail?id='+topMation.id"  open-type="navigate">
			<view class="gsgg" >
				<view v-cloak>{{topMation.title}}</view>
				<view class="fz14" style="color:#8F8F93;margin-top: 10upx;margin-bottom: 20upx;" v-cloak>
				<!--  -->
				{{topMation.brief}}
				</view>
				<view class="">
					<image :src="urlImg+topMation.img" style="width:100%;margin:15upx 0;height: auto;" mode="widthFix"></image>
				</view>
				<view class="zxtz fz16">最新通知</view>
			</view>
		</navigator>
	<!-- 	<view class="navbar" >
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				培训资料
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				刷脸资讯
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				代理查询
			</view>
		</view>
		<view v-if="filterIndex==0">
			0
		</view>
		<view v-elif="filterIndex==1">
			1
		</view>
		<view v-elif="filterIndex==2">
			2
		</view> -->
	<!-- 	 <view class="inv-h-w">
			<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">培训资料</view>
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">刷脸资讯</view>
			<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">代理查询</view>
		</view> -->
	<view style="margin:13px;position:relative;width: 94vw;height:45vh;">
		<!-- <view class="" v-show="Inv == 0"> -->
			
		<view class="clearfix tb_content" v-for="item in listCon" :key="item.id">
			<navigator :url="'./mationDetail?id='+item.id"  open-type="navigate">
				<image :src="urlImg+item.img" style="width:222upx;height:182upx;margin-right:40upx;"  class="fl"></image>
				<view class="fl" style="width:60%;font-size: 32rpx;">
					{{item.title}}
					<view class="conts">
						{{item.brief}}
					</view>
					<view class="create_time">
						<text>{{formatDate(item.create_time*1000)}}</text>
					</view>
				</view>
			</navigator>
		</view>
		
	<!-- 	<view class="" v-show="Inv == 1">
				我是选项卡二
		</view>
		<view class="" v-show="Inv == 2">
				我是选项卡3
		</view> -->
		<text class="loading-text">
		  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
		</text>	
	</view>
	
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var formatter = require("@/common/formatter.js");
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var _self;
	export default {
		data() {
			return {
				// Inv:0,
				topMation:{},
				listCon:[],
				urlImg : 'https://fenxiao.99zhifukeji.com/public/static/',
				loadingType: 0,
				contentText: {
				    contentdown: "上拉显示更多",
				    contentrefresh: "正在加载...",
				    contentnomore: "没有更多数据了"
				},
				page:2
			};
		},
		onLoad(){
			_self = this;
			// #ifdef H5
			_self.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
			_self.Information()
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
			_self.Information()
		},
		// 上拉加载
		onReachBottom: function() {
			_self.getmorenews()
		},
		components: {
		},
		methods: {
			formatDate(payDate) {
				return formatter.formatDateTime(payDate, 'yyyy-MM-dd hh:mm:ss')
			},
			getmorenews:function(){
				
				if (_self.loadingType != 0) {//loadingType!=0;直接返回
					return false;
				}
				_self.loadingType = 1;
				uni.showNavigationBarLoading();//显示加载动画
				console.log(_self.page)
				let data={
					page:_self.page
				}
				request.Information(data,function(res){
					console.log(res.data)
					// 未完成console.log('上拉加载')
					if (_self.listCon.length==res.data.sum) {//没有数据
						_self.loadingType = 2;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						return false;
					}else{
						_self.page++;
						_self.listCon.push(...res.data.standdata);
						_self.loadingType = 0;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				})
			},
			Information:function(){
				request.Information({page:1},function(res){
					console.log(res.data)
					 if(res.code==1){
							_self.topMation=res.data.topdata;
							if(res.data.standdata.length==0){
								_self.loadingType = 2;//将loadingType归0重置
								uni.hideNavigationBarLoading();//关闭加载动画
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
								return false;
							}else{
								_self.listCon=res.data.standdata;
								uni.hideNavigationBarLoading();
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							}
						// _self.listCon=_self.listCon.shift();
					  }else if(res.code == 1001 || res.code == 0){
						uni.showToast({
							icon: 'none',
							title: '您还没有登录,请登录'
						});
						setTimeout(function(){
								uni.navigateTo({
									url: '/pages/public/login'
								})
							},1000)
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
			//切换按钮
			// changeTab(Inv){
			// 	that.navIdx = Inv;	 
			// },
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F9F9;
	}
	// 下半部分 样式
	.tb_content{
		background-color: #fff;
		padding:15px 8px;
		border-radius: 10upx;
		.conts{
			color:#8F8F93;
			font-size: 28rpx; 
			display: -webkit-box;
			word-break: break-all;
			text-overflow: ellipsis;
			font-size: 28rpx;//自适应字体
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:2;
		}
		.create_time{
			color:#C1C1C1;font-size:24upx;
		}
	}
	// 上半部分样式
	.gsgg{
		margin:13px;
		margin-bottom: 0;
		border-radius: 10upx;
		background-color: #fff;
		padding:10upx 20upx;
		color:#333333;
		font-size: 32upx;
		.zxtz{
			margin-bottom: 10px;
		}
	}
	
	// 分类按钮样式
	.inv-h-w{
		height: 100upx;
		display: flex;
	}
	.inv-h{
		font-size: 30upx;
		flex: 1;
		text-align: center;
		color: #212121;
		height: 100upx;
		line-height: 100upx;
		margin:0 60upx;
	}
	.inv-h-se{
		color: #E6BC84;
		border-bottom: 4upx solid #E6BC84;
	
	}
	.loading-text{
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
</style>
