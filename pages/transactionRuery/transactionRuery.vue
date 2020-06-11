<template>
	<view class="container" >
		<!-- <view class="popup_item">
			<input class="input_item" placeholder='输入设备号后6位'></input>
			<button class="cxBtn">查询</button>
		</view> -->
		<view class="warp" style="position:relative;width: 100vw;height:110vh;overflow: hidden;">
			<view class="box" >
				<view class="title fz16" style="color:#222221;padding-top: 33upx ;padding-bottom: 33upx ;padding-left: 33upx;font-weight: 700;">直推数</view>
				<t-table @change="change">
					<t-tr>
						<t-th class="fz16">商户id</t-th>
						<t-th class="fz16">交易笔数</t-th>
						<t-th class="fz16">金额</t-th>
						<t-th class="fz16" style="flex:2">代理账号</t-th>
					</t-tr>
					<t-tr v-for="item in tableList" :key="item.id" >
						<t-td class="fz14">{{ item.tenantId }}</t-td>
						<t-td class="fz14">{{ item.deal_num }}</t-td>
						<t-td class="fz14">{{ item.total }}</t-td>
						<t-td class="fz14" style="flex:2">{{ item.agent }}</t-td>
					</t-tr>
				</t-table>
			</view>
			<text class="loading-text">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>
		
	</view >
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
	    components: {
	        tTable,
	        tTh,
	        tTr,
	        tTd
	    },
	    data() {
	        return {
				tableList:{},
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
			_self.transflow()
		},
		//下拉刷新
		onPullDownRefresh(){
			_self.transflow()
		},
		// 上拉加载
		onReachBottom: function() {
			_self.getmorenews()
		},
	    methods: {
			formatDate(payDate) {
				return formatter.formatDate(payDate, 'yyyy-MM-dd')
			},
	        change(e) {
	            console.log(e.detail);
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
			transflow:function(){
				request.transflow(function(res){
					console.log(res.data)
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
					  }else{
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					  } 
				}
				,function(err){
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

<style lang="scss">
	page{
		background-color: #FAFAFA;
	}
	.popup_item{
		background-color: #fff;
		width:95%;
		height: 114upx;
		line-height: 114upx;
		margin: 22upx;
		border-radius: 20upx;
		box-shadow:5px 0 40px #E9E9E9;
		position: relative;
		.input_item{
			height: 84upx;
			line-height: 84upx;
			font-size: 24upx;
			border-radius: 100upx;
			background-color: #F6F6F6;
			position: absolute;
			width:452upx;
			top:15upx;
			left: 20upx;
			padding-left: 32upx;
		}
		.cxBtn{
			position: absolute;
			top:20upx;
			right: 24upx;
			width: 161upx;
			height: 64upx;
			line-height:64upx;
			text-align: center;
			border-radius: 100px;
			background-color: #E9B47A;
			font-size: 16px;
			&:after{
				border:1px solid #FDBB69;
			}
		}
	}
	.t-table,.t-tr,.t-th,.t-td{
		border:none;
	}
	.box{
		margin: 30upx 22upx;
		border-radius: 10upx;
		background-color: #fff;
		box-shadow:0 0 10px #F1F1F1;
		padding-left: 10upx;
		padding-bottom: 20upx;
	}
	.t-th{
		font-weight: 500;
		color:#4A4A4A;
		font-size: 16px;
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
