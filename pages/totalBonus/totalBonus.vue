<template>
	<view class="container">
		<view class="nameTop">
			<image src="../../static/yongjin.png" style="width:100%;height:303upx;padding: 27upx;position: relative;"></image>
			<view style="position: absolute;top:72upx;left:50upx" class="fz16">
				分销奖金（元）
				<view style="font-weight: 500;font-size: 36px;margin-top: 40upx;">
					{{formatNumber(direct_income) || '0.00'}}
				</view>
			</view>
		</view>
		<!-- 切换按钮 -->
		<view>
				<view class="inv-h-w">
						<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">奖金明细</view>
						<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">服务商津贴</view>
				</view>
				<view class="" v-show="Inv == 0">
					<view class="warp"  style="position:relative;width: 100vw;height:90vh;overflow: hidden;">						<view class="box">							<!-- <view class="title fz16" style="color:#222221;padding-top: 33upx ;padding-bottom: 33upx ;padding-left: 33upx;font-weight: 700;">奖金明细</view> -->							<t-table>								<t-tr>									<t-th class="fz16">时间</t-th>									<t-th class="fz16">代理级别</t-th>									<t-th class="fz16">账号</t-th>									<t-th class="fz16">奖金总额</t-th>								</t-tr>								<t-tr v-for="item in tableList" :key="item.id" >									<!-- <t-td>{{ item.id + 1 }}</t-td> -->									<t-td class="font12">{{ formatDate(item.create_time*1000) }}</t-td>									<t-td class="fz14" v-if=" item.level==2">大区运营商</t-td>									<t-td class="fz14" v-else-if=" item.level==3">城市运营商</t-td>									<t-td class="fz14" v-else-if=" item.level==4">推广导师</t-td>									<t-td class="font12">{{ item.username }}</t-td>									<t-td class="fz14">{{formatNumber(item.direct_income)}}</t-td>								</t-tr>							</t-table>						</view>						<text class="loading-text">						  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}						</text>					</view>
				</view>
				<view class="" v-show="Inv == 1">
					<view class="warp"  style="position:relative;width: 100vw;height:90vh;overflow: hidden;">
						<view class="box">
							<!-- <view class="title fz16" style="color:#222221;padding-top: 33upx ;padding-bottom: 33upx ;padding-left: 33upx;font-weight: 700;">奖金明细</view> -->
							<t-table>
								<t-tr>
									<t-th class="fz16">时间</t-th>
									<t-th class="fz16">代理级别</t-th>
									<t-th class="fz16">账号</t-th>
									<t-th class="fz16">奖金总额</t-th>
								</t-tr>
								<t-tr v-for="item in tableList1" :key="item.id" >
									<!-- <t-td>{{ item.id + 1 }}</t-td> -->
									<t-td class="font12">{{ formatDate(item.create_time*1000) }}</t-td>
									<t-td class="fz14" v-if=" item.level==2">大区运营商</t-td>
									<t-td class="fz14" v-else-if=" item.level==3">城市运营商</t-td>
									<t-td class="fz14" v-else-if=" item.level==4">推广导师</t-td>
									<t-td class="font12">{{ item.username }}</t-td>
									<t-td class="fz14">{{formatNumber(item.provider_allowance)}}</t-td>
								</t-tr>
							</t-table>
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
		var formatter=require("@/common/formatter.js");
		var formatNumber=require("@/common/formatter.js");
		import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
		import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
		var _self;
	    export default {
	        components: {
	            tTable,
	            tTh,
	            tTr,
	            tTd
	        },
	        data() {
	            return { 
	                tableList:[],
					tableList1:[],
					direct_income:'',
					loadingType: 0,
					
					contentText: {
					    contentdown: "上拉显示更多",
					    contentrefresh: "正在加载...",
					    contentnomore: "没有更多数据了"
					},
					page:2,
					Inv:0
	            };
	        },
			onLoad(option){
			  _self = this;
			  _self.order_sn=option.order_sn;
			  _self.result = uni.getStorageSync('RESULT');
			  request.setHToken(_self.result)
			  _self.getInfo()
			  _self.getfwsInfo()
			},
			//下拉刷新
			onPullDownRefresh(){
				if(_self.Inv==0){
					_self.getInfo()
				}else{
					_self.getfwsInfo()
				}
			},
			// 上拉加载
			onReachBottom: function() {
				
				if(_self.Inv==0){
					_self.getmorenews()
				}else{
					_self.getfwsmorenews()
				}
				
				
			},
	        methods: {
				getInfo(){
					request.commission({page:1}, function(res){
							if(res.code==1){
								if(res.data.list.length==0){
									_self.loadingType = 2;//将loadingType归0重置
									uni.hideNavigationBarLoading();//关闭加载动画
									uni.stopPullDownRefresh();//得到数据后停止下拉刷新
									return false;
								}else{
									_self.tableList=res.data.list;
									uni.hideNavigationBarLoading();
									uni.stopPullDownRefresh();//得到数据后停止下拉刷新
								}
								_self.direct_income=res.data.direct_income;
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
				getfwsInfo(){
					request.providerallowance({page:1}, function(res){
							if(res.code==1){
								if(res.data.data.length==0){
									_self.loadingType = 2;//将loadingType归0重置
									uni.hideNavigationBarLoading();//关闭加载动画
									uni.stopPullDownRefresh();//得到数据后停止下拉刷新
									return false;
								}else{
									_self.tableList1=res.data.data;
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
				
				
				
				
				getmorenews:function(){
					
					if (_self.loadingType != 0) {//loadingType!=0;直接返回
						return false;
					}
					_self.loadingType = 1;
					uni.showNavigationBarLoading();//显示加载动画
					let data={
						page:_self.page
					}
					request.commission(data,function(res){
						if (_self.tableList.length==res.data.sum) {//没有数据
							_self.loadingType = 2;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							return false;
						}else{
							_self.page++;
							_self.tableList.push(...res.data.list);
							_self.loadingType = 0;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}
					})
				},
				
				getfwsmorenews:function(){
					
					if (_self.loadingType != 0) {//loadingType!=0;直接返回
						return false;
					}
					_self.loadingType = 1;
					uni.showNavigationBarLoading();//显示加载动画
					let data={
						page:_self.page
					}
					request.providerallowance(data,function(res){
						if (_self.tableList1.length==res.data.sum) {//没有数据
							_self.loadingType = 2;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							return false;
						}else{
							_self.page++;
							_self.tableList1.push(...res.data.data);
							_self.loadingType = 0;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}
					})
				},
				formatDate(payDate) {
					return formatter.formatDate(payDate, 'yyyy-MM-dd')
				},
				formatNumber(payDate) {
					return formatter.formatNumber(payDate, '0.00')
				},
				changeTab(Inv){
					_self.navIdx = Inv; 
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
		// border:none;
	}
	.font12 .t-td{
		font-size: 24rpx!important;
	}
	.box{
		margin: 30upx 22upx;
		border-radius: 10upx;
		background-color: #fff;
		box-shadow:0 0 30px #EDEBEB;
		padding-left: 10upx;
	}
	page{
		background-color: #FAFAFA;
	}
	.inv-h-w{background-color: #FFFFFF;height: 80upx;display: flex;padding: 0 60rpx}
	.inv-h{font-size: 30upx;flex: 1;text-align: center;height: 80upx;line-height: 80upx;}
	.inv-h-se{color: #F2B373;border-bottom: 4upx solid #F2B373;}
	.t-th{
		font-weight: 500;
		color:#4A4A4A;
		font-size: 16px;
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
