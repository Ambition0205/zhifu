<template>
	<view class="content b-t">
		<view v-if="addressList != '' ">
			<view class="list b-b" v-for="(item, index) in addressList" :key="index">
				<view class="wrapper" @click="checkAddress(item)">
					<view class="address-box">
						<text v-if="item.status" class="tag">默认</text>
						<text class="address">{{item.province}}-{{item.city}}-{{item.district}} {{item.area}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.receiver}}</text>
						<text class="mobile">{{item.receive_tel}}</text>
					</view> 
				</view>
				<text class="iconfont" style="font-size: 24upx;color:#818181;text-align: right; width:100rpx;height:40px;line-height: 40px;"  @click.stop="addAddress('edit', item)">&#xe660;</text>
			</view>
		</view>
		<view class="order-content"  v-else>
			<view class="cen" style=" padding-top: 100rpx;text-align: center;">
				<text style="color:#999;font-size: 28rpx;">还没有地址，点击下方按钮添加</text>
			</view>
		</view>
	<!-- 	<text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可
		</text> -->
		
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var _self;
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option){
			_self = this;
			console.log(option.source);
			this.source = option.source;
			this.getAddress()
		},
		onShow() {
			this.getAddress()
		},
		methods: {
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					// this.$api.prePage()
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			},
			// 获取地址
			getAddress:function(){
				request.storeGetAddress(function(res){
					console.log(res.data)
					 if(res.code==1){
						_self.addressList=res.data;
						console.log(_self.addressList)
					
					  }else{
						  uni.showToast({
							 icon: 'none',
							 title: res.msg,
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
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $uni-color-primary;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			padding: 4upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 490upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color:$uni-color-primary;
		border:1px solid #E7C599;
		border-radius: 60upx;
		box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);	
		&::after{
			border:1px solid $uni-color-primary;
		}
	}
</style>
