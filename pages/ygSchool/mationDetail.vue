<template>
	<view class="Skeleton">
		<view class="title_con" v-clock>{{listDetail.title}}</view>
		<view class="create_time">
			发布时间：{{formatDate(listDetail.create_time*1000)}}
		</view>
		<view class="con_img">
			<image :src="urlImg+listDetail.img" style="width: 100%;margin-top: 20upx;height: auto;" mode="widthFix"></image>
		</view>
		<view class="detailCon" v-html='listDetail.content'>
			
		</view>
	</view>
</template>

<script>
var request = require("@/common/service.js");
	var formatter = require("@/common/formatter.js");
	var _self;
	export default {
		data() {
			return {
				urlImg : 'https://fenxiao.99zhifukeji.com/public/static/',
				listDetail:[]
			};
		},
		onLoad(option){
			console.log(option.id)
			var id=option.id;
			_self = this;
			_self.result = uni.getStorageSync('RESULT');
			request.setHToken(_self.result)
			var data={
				id:id
			}
			request.informationDetail(data,function(res){
				 if(res.code==1){
					 _self.listDetail=res.data;
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
		onShow() {
			_self = this;
			// _self.informationDetail()
		},
		//下拉刷新
		onPullDownRefresh(){
			
		},
		
		components: {
		},
		methods: {
			formatDate(payDate) {
				return formatter.formatDateTime(payDate, 'yyyy-MM-dd hh:mm:ss')
			}
			
		},
	}
</script>

<style>
	.Skeleton{
		background-color: #fff;
		margin:10upx 30upx;
	}
	.detailCon{
		margin-top: 20upx;
		font-size: 28upx;
		line-height: 50upx;
		font-weight: 500;
	}
	.create_time{
		margin-top: 20upx;
		font-size: 26upx;
		color:#999;
	}	
</style>
