<template>
	<view class="page"> 
		<view class="titleBox grace-space-between" style="background: #E9B47A;">
			<view class="fz14" style="padding-top:30upx;">
				
				<view v-if="goodsList.status=='1'">
					 <text class="grace-white">已支付</text> 
				</view> 
				<view v-else-if="goodsList.status=='2'">
					 <text class="grace-white">支付失败</text>  
				</view>
				<view v-else-if="goodsList.status=='3'">
					 <text class="grace-white">已发货</text>  
				</view>
				<view v-else-if="goodsList.status=='0'">
					 <text class="grace-white">待支付</text>  
				</view>
				<view v-else>
					 <text class="grace-white">已完成</text>  
				</view> 
			</view> 
				<!-- <image class="icon_bucket" src="/static/time.png" style="width:54upx;height:74upx;padding-top:40upx;"></image> -->
		</view>  
		<!-- 商品信息 -->
		<view class="grace-bg-white" style="margin:10px;border-radius:10px;position: relative;top:-100upx;">
			<view class="comm-icons pd10" style="color: #E9B47A;font-size:28upx;">
				<text>商品信息</text>
			</view>
			<view class="grace-margin pd_tb10" >
				<!-- item -->
				<view class="grace-flex mt3" style="padding:20upx 0;"> 
					<view class="grace-flex fsa ml10" style="width: calc(100% - 100px);">
						<view style="width: 160upx;height: 128upx;background: #fff;margin-right:20rpx;">
							<image v-if="goodsList.imageurl" :src="src+goodsList.imageurl" mode=" scaleToFill" style="width: 160upx;height: 64px;max-height: 128upx;" ></image>
							<image v-else src="../../../static/icon-bucket.png" mode=" scaleToFill" style="width:160upx;height: 128upx;max-height: 128upx;" ></image>
						</view>  
						<view style="flex:2">
							<view  class="grace-nowrap" v-if="goodsList.name" >
								<view class="grace-ellipsis" style="font-size: 28rpx;">{{goodsList.name}}</view>
							</view> 
							<view class="grace-flex mt20 " >
								<!-- <view class="" style="color:#333333;fon-size:24upx;">￥ {{goodsList.unit_price}}</view> -->
								<view class="" style="color:#999999;fon-size:24upx;">共 {{goodsList.goods_num}}件</view>
							</view>
						</view>
						
					</view>
				</view> 
				<!-- 金额明细 -->		
				<view class="grace-border-t pd10">
					<view class="grace-space-between" style="display: flex;">
						<view style="font-size:28upx;flex:6;">商品金额</view>
						<view style="font-size:24upx;flex:1;justify-content: space-between;">￥{{goodsList.goods_num*goodsList.unit_price}}</view>
					</view> 
				</view>	
				<!-- 总金额 -->	
				<view class="grace-space-between grace-border-t pt10 pd_lr10" style="height:50px;line-height:50px;">
					<!-- <view class="fz14">商品金额</view> -->
					<view class="fw fz16" style="color:#333333;position: absolute;right:10px;bottom:10px;">
                         实付款：<text style="color:#E9B47A;">￥{{goodsList.goods_num*goodsList.unit_price}}</text></view>
				</view>	 
			</view> 
		</view>
		<!-- 订单信息 -->
		<view class="grace-bg-white" style="margin:10px;border-radius:10px;position:relative;top:-45px;">
			<view class="comm-icons icon-dirver pd10" style="color: #E9B47A;font-size:28rpx;">订单信息</view>
			<view class="grace-margin">
			 	<!-- 订单明细 -->
				<view class="pd_lr10 pb10" v-if="goodsList.status=='0'">
					<view class="grace-flex fon28 lineHe ">
						<text class="info">创建时间：</text>
						<text>{{formatDate(goodsList.create_time*1000)}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info ">订单号：</text>
						<text>{{goodsList.order_sn}}</text>
					</view>  
					<view class="grace-flex fon28 lineHe ">
						<text class="info">备注：</text>
						<text>{{goodsList.remark}}</text>
					</view> 
				</view>	
				<view class="pd_lr10 pb10" v-else-if="goodsList.status=='2'">
					<view class="grace-flex fon28 lineHe ">
						<text class="info">创建时间：</text>
						<text>{{formatDate(goodsList.create_time*1000)}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info ">订单号：</text>
						<text>{{goodsList.order_sn}}</text>
					</view>  
					<view class="grace-flex fon28 lineHe ">
						<text class="info">备注：</text>
						<text>{{goodsList.remark}}</text>
					</view> 
				</view>	
				<view class="pd_lr10 pb10" v-else-if="goodsList.status=='1'">
					<view class="grace-flex fon28 lineHe ">
						<text class="info">创建时间：</text>
						<text>{{formatDate(goodsList.create_time*1000)}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info">收货地址：</text>
						<text>{{goodsList.receiver_address}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info ">收货电话：</text>
						<text>{{goodsList.receive_tel}}</text>
					</view>  
					<view class="grace-flex fon28 mt2 lineHe ">
						<text class="info">收货人：</text>
						<text>{{goodsList.receiver}}</text>
					</view>  
					<view class="grace-flex fon28 lineHe ">
						<text class="info ">订单号：</text>
						<text>{{goodsList.order_sn}}</text>
					</view>  
					<view class="grace-flex fon28 lineHe ">
						<text class="info">备注：</text>
						<text>{{goodsList.remark}}</text>
					</view> 
				</view>	
				<view class="pd_lr10 pb10" v-else>
					<view class="grace-flex fon28  lineHe">
						<text class="info" >快递编号：</text> 
						<text >{{goodsList.delivery_num}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info">创建时间：</text>
						<text>{{formatDate(goodsList.create_time*1000)}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info">收货地址：</text>
						<text>{{goodsList.receiver_address}}</text>
					</view>
					<view class="grace-flex fon28 lineHe ">
						<text class="info ">收货电话：</text>
						<text>{{goodsList.receive_tel}}</text>
					</view>  
					<view class="grace-flex fon28 mt2 lineHe ">
						<text class="info">收货人：</text>
						<text>{{goodsList.receiver}}</text>
					</view>  
					<view class="grace-flex fon28 lineHe ">
						<text class="info ">订单号：</text>
						<text>{{goodsList.order_sn}}</text>
					</view>  
					<view class="grace-flex fon28 lineHe ">
						<text class="info">备注：</text>
						<text>{{goodsList.remark}}</text>
					</view> 
				</view>	 
			</view> 
		</view> 
	
		<view class="action-box mt_20" v-if="goodsList.status ==0 ">
			<button class="btns1" @click="delOrder(goodsList)">取消订单</button>
			<button class="btns1 recom" @click="awayPay(goodsList)">立即支付</button>
		</view>
		<view class="action-box" v-if="goodsList.status == 2">
			<button class="btns red" @click="delOrder(goodsList)">删除订单</button>
		</view>
		<view class="action-box" v-if="goodsList.status == 3 ">
			<button class="btns" @click="cancelOrder(goodsList)">确认收货</button>
		</view>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var formatter = require("@/common/formatter.js");
	let _self;
	export default {
		onLoad(ops) {
			_self=this;
			this.ops=ops; 
			this.getDetail();
		}, 
		onUnload() {
			console.log("unload");
		},
		onShow() {
		},
		data() {
			return {
				goodsList:[],
				src:'https://fenxiao.99zhifukeji.com/',
				ops:{}
			}
		},
		methods: {
			// 时间格式化
			formatDate(payDate) {
				return formatter.formatDateTime(payDate, 'yyyy-MM-dd hh:mm:ss')
			},
			// 数据展示
			getDetail(){
				let _self=this;
				var data={
					id:this.ops.id
				};
				request.goodsOrderDetail(data,function(res){ 
					if(res.code==1){
							console.log(res.data)
							_self.goodsList=res.data;
							console.log(_self.goodsList)
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
			// 删除或取消订单
			delOrder:function(goodsList){
				console.log(goodsList.id)
				let data={
					id:goodsList.id
				}
				request.deleteGoodsOrder(data,function(res){
						if(res.code==1){
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							
							setTimeout(function(){
								uni.navigateTo({
									url: '/pages/faceOrder/faceOrder'
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
			//  确认收货
			cancelOrder:function(goodsList){
					console.log(goodsList.id)
					let data={
						id:goodsList.id
					}
					request.confirmReceipt(data,function(res){
							if(res.code==1){
								uni.showToast({
									icon: 'none',
									title: res.msg
								});
								_self.getDetail()
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
			awayPay:function(goodsList){
				_self.order_sn=goodsList.order_sn;
				uni.navigateTo({
					url: '/pages/choosePayMethod/choosePayMethod?order_sn='+_self.order_sn
				})
			}
			
			
		}
	}
</script>

<style  lang="scss">
page,html,body{
		background-color: #f8f8f8!important;
}
.titleBox{
	 color: #FFFFFF;
	 height:100px;
	 padding:20rpx 160rpx;
}
.icon_bucket{
	height: 40PX;
	width: 40PX;
} 

.grace-bg-white{
	background-color: #fff;
	.grace-flex{
		display: flex;
		justify-content: space-between; /* 横向中间自动空间 */
		align-content: space-between;  /* 竖向中间自动空间 */
		align-items: auto;
		font-size: 28upx;
		.grace-columns{
			flex:1;
			.grace-ellipsis{
				font-size: 26upx;
			}
		}
		.info{
			/* width: 460rpx; */
			flex:4;
		}
	}
}
.fon28 text{
	font-size: 24rpx;
}
.fon32{
	font-size: 32rpx;
}
.lineHe{
	line-height:45upx
}
.mt_20{
	margin-top: -60upx;
}
.action-box{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100upx;
	position: relative;
	padding-right: 30upx;
	.btns{
		border-radius: 100upx;;
		width: 90%;
		// font-size: 32upx!important;
		color: #212121;
		margin-top: 46upx;
		margin-bottom: 46upx;
		border:1px solid #E9B47A;
		background-color: #E9B47A;
		:after{
			border:1px solid #E9B47A!important;
		}
	} 
	.btns1{
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: 24upx!important;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after{
			border-radius: 100px;
		}
		&.recom{
				background: #fff;
				color: #E9B47A;
				// border:1px solid #E9B47A;
				&:after{
					// border-color: $uni-color-primary;
					border:1px solid #E9B47A;
				}
			}
	}
	
}
</style>
