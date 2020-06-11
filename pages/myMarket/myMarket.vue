<template>
	<view class="container">
		<view class="nameTop">
			<image src="../../static/wodeshichang.png" style="width:100%;height:400upx;padding: 20upx;padding-bottom:0;position: relative;"></image>
			<view class="">
				<image v-if=" coun_agent.avatar!=null" :src="coun_agent.avatar" style="width:116upx;height:116upx;position: absolute;top:108upx;left:112upx;"></image>
				<image v-else src="../../static/missing-face.png" style="width:116upx;height:116upx;position: absolute;top:108upx;left:112upx;"></image>
				<view style="position: absolute;left:270upx;top:100upx">
					<view class="fz16 mt10" style="">
						角色：
						<text v-if="coun_agent.level==1">大区运营商</text>
						<text v-else-if="coun_agent.level==2">城市运营商</text>
						<text v-else-if="coun_agent.level==3">运营推广导师</text>
						<text v-else>粉丝</text>
					</view>
					<view class="fz16 mt5">
						昵称：<text style="color:#3C38FA;">{{coun_agent.nickname||'暂无'}}</text>
					</view>
				</view>
			</view>
			<view class="pl5" style="position: absolute;top:318upx;">
				<text class="fz16 pl20" style="color:#222221;margin-right:134upx;">
					推荐人：<text>{{recommend_data.username||'暂无'}}</text>
				</text>
				<text class="fz16" style="color:#222221;">
					团队数量：<text>{{recommend_data.team_num}}</text>
				</text>
			</view>
		</view>
		<view class="warp" style="position:relative;width: 100vw;height:100vh;">
			<view class="box">
				<view class="title fz16" style="color:#222221;padding-top: 33upx ;padding-bottom: 33upx ;padding-left: 33upx;font-weight: 700;">推荐数量</view>
				<t-table @change="change">
					<t-tr>
						<!-- <t-th class="fz16">注册时间</t-th> -->
						<t-th class="fz16" style="flex:1.5">账号</t-th>
						<t-th class="fz16" style="flex:1.5">角色</t-th>
						<t-th class="fz14" style="flex:1">团队数</t-th>
						<t-th class="fz16" style="flex:2">时间</t-th>
					</t-tr>
					<t-tr v-for="item in tableList" :key="item.id" > 
						<t-td class="font12" style="flex:1.5">{{item.username| mobileFilter}}</t-td>
						<t-td class="font12" style="flex:1.5" v-if="item.level==0">粉丝</t-td>
						<t-td class="font12" style="flex:1.5" v-if="item.level==1">国代</t-td>
						<t-td class="font12" style="flex:1.5" v-if="item.level==2">大区运营商</t-td>
						<t-td class="font12" style="flex:1.5" v-if="item.level==3">城市运营商</t-td>
						<t-td class="font12" style="flex:1.5" v-if="item.level==4">运营推广导师</t-td>
						<t-td class="font12" style="flex:1">{{item.team_num}}</t-td>
						<t-td class="font11" style="flex:2">{{formatDate(item.create_time*1000)}}</t-td>
					</t-tr>
				</t-table>
			</view>
			<text class="loading-text">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view >
		
	</view>
</template>

<script>
		var request = require("@/common/service.js");
		var formatter=require("@/common/formatter.js");
		
		import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
		var _self;
		import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
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
					coun_agent:[],
					tableList:[],
					recommend_data:[],
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
					return formatter.formatDate(payDate, 'yyyy-MM-dd hh:mm')
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
					request.mymarket(data,function(res){
						console.log(res.data)
						// 未完成console.log('上拉加载')
						if (_self.tableList.length==res.data.sum) {//没有数据
							_self.loadingType = 2;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							return false;
						}else{
							_self.page++;
							_self.tableList.push(...res.data.direct);
							_self.loadingType = 0;//将loadingType归0重置
							uni.hideNavigationBarLoading();//关闭加载动画
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}
					})
				},
	            mymarket() {
					request.mymarket({page:1},function(res){
						console.log(res.data)
						 if(res.code==1){
							 if(res.data.direct.length==0){
							 	_self.loadingType = 2;//将loadingType归0重置
							 	uni.hideNavigationBarLoading();//关闭加载动画
							 	uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 	return false;
							 }else{
							 	_self.tableList=res.data.direct;
							 	uni.hideNavigationBarLoading();
							 	uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 }
							_self.coun_agent=res.data.coun_agent;
							_self.recommend_data=res.data.recommend_data;
						
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
	.fz14 .t-th{
		font-size: 28rpx!important;
	}
	.font12 .t-td{
		font-size: 24rpx!important;
	}
	.font11 .t-td{
		font-size: 22rpx!important;
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
