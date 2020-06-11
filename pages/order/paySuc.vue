<template>
	<view class="">
		<view style=" display: flex;justify-content: center;align-items: center;padding-top: 200rpx;">
			<image src="../../static/dui.png" style="width:80rpx;height:80rpx;"></image>
		</view>
		<view style="text-align: center;margin-top: 5rpx;">
			<text style="font-size: 30rpx;"> 支付成功</text>
		</view>
		<button class="fhbtn" @tap="goToList">{{time+'秒后'}}返回首页</button>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var _self;
	export default {
		data() {
			return {
				time:'5'
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
			
		},
		created(){
			this.timer()
		},
		methods: {
			timer(){
				var t = 5
					var timecount = setInterval(()=>{
					t--
					this.time = t
					if(t<=0){
						uni.switchTab({
							url: `/pages/user/user`
						})
						clearInterval(timecount)
						
					}
				},1000)
			},
			goToList:function(){
				uni.switchTab({
					url: `/pages/user/user`
				})
			}
		},
	}
</script>

<style>
	.fhbtn {
	  background-color: #E9B47A;
	  border: 1px solid #E9B47A;
	  border-radius: 100px;
	  width: 35%;
	  color: #212121;
	  margin-top: 32rpx;
	  margin-bottom: 32rpx;
	  font-size: 28rpx;
	}
	.fhbtn:after {
	    border: 1px solid #E9B47A;
	}
</style>
