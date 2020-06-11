<template>
	<view class="container">
		<view class="nameTop">
			<image src="../../static/wodeshichang.png" style="width:100%;height:440upx;padding: 20upx;padding-bottom:0; relative;"></image>
			<view class="">
				<!-- {{counAgent.username}} -->
				<view class="">
					<image v-if=" counAgent.avatar!=null" :src="src+counAgent.avatar" style="width:116upx;height:116upx;position: absolute;top:108upx;left:112upx;"></image>
					<image v-else src="../../static/missing-face.png" style="width:116upx;height:116upx;position: absolute;top:108upx;left:112upx;"></image>
				</view>
				<view class="fz18" style="position: absolute;left:270upx;top:98upx">
					<view class="">
						<text class="fz16 mt10" v-if="counAgent.username=='' || counAgent.username==null ">游客</text>
						<text class="fz16 mt10" v-else>{{counAgent.username|mobileFilter}}</text>
					</view>
					<view class="fz16 mt5">
						流水分润总和：<text style="color:#3C38FA;">{{formatNumber(counAgent.total)}}</text>
					</view>
				</view>
			</view>
			<view class="pl5" style="position: absolute;top:350upx;">
				<text class="fz14 pl20" style="color:#222221;margin-right:134upx;">
					已提现：<text>{{formatNumber(counAgent.hascashout)||'0.00'}}</text>
				</text>
				<text class="fz14" style="color:#222221;">
					未提现：<text>{{formatNumber(counAgent.nocashout)||'0.00'}}</text>
				</text>
				<!-- <view style="margin-top: 8upx;">
					<text class="fz14 pl20" style="color:red;margin-right:134upx;">
						活动已累计金额：<text>100.00</text>
					</text>
				</view> -->
			</view>
		</view>
		<view class="warp" style="position:relative;width: 100vw;height:100%;overflow: hidden;">
			<view class="box">
				<!-- <view class="title fz16" style="color:#222221;padding-top: 33upx ;padding-bottom: 33upx ;padding-left: 33upx;font-weight: 700;">直推数</view> -->
				<t-table >
					<t-tr>
						<t-th class="fz16">订单金额(元)</t-th>
						<t-th class="fz16">分润金额(元)</t-th>
						<t-th class="fz16" style="">交易时间</t-th>
					</t-tr>
					<t-tr v-for="item in tableLists" :key="item.id" >
						<t-td style="font-size:14px;">{{item.amount}}</t-td>
						<t-td style="font-size:14px;">{{formatNumber(item.profit)}}</t-td>
						<t-td style="font-size:14px;" >{{formatDate(item.create_time*1000)}}</t-td>
					</t-tr>
				</t-table>
			</view>
			<text class="loading-text">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>
		
	</view>
</template>

<script>
		var request = require("@/common/service.js");
		var formatter=require("@/common/formatter.js");
		import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
		var formatNumber=require("@/common/formatter.js");
		import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
		var _self;
	    export default {
			filters:{
			    mobileFilter(val){
			      let reg = /^(.{3}).*(.{4})$/
			      return val.replace(reg,'$1****$2')
				  }
			},
	        components: {
	            tTable,
	            tTh,
	            tTr,
	            tTd
	        }, 
	        data() {
	            return {
					counAgent:{},
					tableLists:[],
					loadingType: 0,
					contentText: {
					    contentdown: "上拉显示更多",
					    contentrefresh: "正在加载...",
					    contentnomore: "没有更多数据了"
					},
					page:2,
					src:'https://fenxiao.99zhifukeji.com/'
	            };
	        },
			onLoad(){
				_self = this;
				_self.result = uni.getStorageSync('RESULT');
				request.setHToken(_self.result)
				_self.mymarket()
			},
			//下拉刷新
			onPullDownRefresh(){
				_self.mymarket()
			},
			// 上拉加载
			onReachBottom: function() {
				_self.getmorenews()
			},
	        methods: {
				formatDate(payDate) {
					return formatter.formatDate(payDate, 'yyyy-MM-dd')
				},
				formatNumber(payDate) {
					return formatter.formatNumber(payDate, '0.00')
				},
				//加载更多
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
					request.rateshare(data,function(res){
						console.log(res.data)
						// 未完成console.log('上拉加载')
						if (_self.tableLists.length==res.data.sum) {//没有数据
							_self.loadingType = 2;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							return false;
						}else{
							_self.page++;
							_self.tableLists.push(...res.data.data);
							_self.loadingType = 0;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}
					})
				},
	            // 首次加载数据
				mymarket:function() {
					request.rateshare({page:1},function(res){
						console.log(res.data)
						 if(res.code==1){
							 if(res.data.data.length==0){
							 	_self.loadingType = 2;//将loadingType归0重置
							 	uni.hideNavigationBarLoading();//关闭加载动画
							 	uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 	return false;
							 }else{
							 	_self.tableLists=res.data.data;
							 	uni.hideNavigationBarLoading();
							 	uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 }
							_self.counAgent=res.data.user;
						
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
							 title: '请求超时',
						 });
					})
	            },
	            edit(item) {
	                uni.showToast({
	                    title: item.name,
	                    icon: 'none'
	                });
	            }
	        }
	    };
</script>

<style  lang="scss">
	.t-table,.t-tr,.t-th,.t-td{
		// border:none!important;
	}
	.box{
		margin: 30upx 22upx;
		border-radius: 10upx;
		background-color: #fff;
		box-shadow:0 0 10px #F1F1F1;
		padding-left: 10upx;
		padding-bottom: 20upx;
	}
	page{
		background-color: #FAFAFA;
	}
	.t-th{
		font-weight: 500;
		color:#4A4A4A;
		font-size: 16px;
	}
	.t-td{
		font-size: 14px!important;
	}
	.loading-text{
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.box .t-td{border-left: 1px #d0dee5 solid!important}	
	
</style>
