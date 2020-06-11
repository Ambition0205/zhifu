<template>
	<view class="">
		<view class="itemList">
			<view class="zhifu_zf" v-for="(payStypeVal, index) in payStype" :key="index" @click="zhifuChange(index)">
				<text style="font-size: 28rpx;color:#282828;">{{ payStypeVal.name }}</text>
				<text style="font-size: 28rpx;margin:0 20upx;color:#282828;">:</text>
				<text style="font-size: 28rpx;color:#282828;">{{formatNumber(payStypeVal.account) || formatNumber(0.00)}}</text>
				<label><image :src="isCheckState==index?iconsel: iconNosel" class="section" :class="isCheckState==index?iconsel: iconNosel" ></image></label>                
			</view>
			
		</view>
		<view class="popup_item">
			<text style="color:#999999;font-size: 28upx;margin-left: 20upx;">提现金额</text>
			<input class="input_item" placeholder='100' v-model="amount">
			</input>
		</view>
		<view class="pl20 <pt1></pt1>0 clearfix " style="width:100%;">
			<view :class='{active:index==rSelect}'  v-for="(value,index) in cartList" :key="index" @tap="rChoose(index)" class="txBtn">{{value.name}}元</view>
		</view>
		<button class="fz18 qrtx" @tap="qrtxBtn">确认提交</button>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var formatNumber=require("@/common/formatter.js");
	var formatter=require("@/common/formatter.js");
	var _self;
	export default {
	    data(){
	        return{
				rSelect:0,
				amount:'',
				iconsel: "/static/selected.png",
				iconNosel: "/static/static.png",
				isCheckState: 0,
				payStype:[
					{ name:"流水分润",account:''},
					{ name:"分销奖金",account:''}
				],
				cartList:[{index:'0',name:'100'},{index:'1',name:'200'},{index:'2',name:'300'},{index:'3',name:'400'},{index:'4',name:'500'},{index:'5',name:'1000'}]
	        }
	    },
		onLoad(option){
		  _self = this;
		  _self.order_sn=option.order_sn;
		  _self.result = uni.getStorageSync('RESULT');
		  request.setHToken(_self.result)
		  // 提现
		  request.mycapital(function(res){
		  		console.log(res.data)
		  		 if(res.code==1){
		  			// _self.payStype[0].account=res.data.credit;
					_self.payStype[0].account=res.data.profit;
					_self.payStype[1].account=res.data.direct_income;
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
	    methods:{
			zhifuChange(index){
				this.isCheckState = index;
			},
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
			qrtxBtn(){
				_self=this;
				if(_self.amount<100){
					uni.showToast({
						icon: 'none',
						title: '提现金额需≥100元'
					});
				}else if(Number(_self.payStype[_self.isCheckState].account)<Number(_self.amount)){
					uni.showToast({
						icon: 'none',
						title: '当前提现金额不足'
					});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '本次提现金额为' + _self.amount + '元,是否提现?',
					    success: function (res) {
					        if (res.confirm) {
					           if(_self.isCheckState==0){
					           	var data={
					           		amount:_self.amount,
					           		type:'PROFIT'
					           	}	
					           }else{
					           	var data={
					           		amount:_self.amount,
					           		type:'DIRECT'
					           	}
					           }
					           console.log(data)
					           request.cashout(data,function(res){
					           		console.log(res.data)
					           		 if(res.code==1){
					           			uni.showToast({
					           				icon: 'none',
					           				title: res.msg
					           			});
					           			setTimeout(function(){
					           				uni.switchTab({
					           					url: '/pages/user/user'
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
					        } else if (res.cancel) {
								uni.showToast({
								    title: '用户点击取消'
								});
								setTimeout(function () {
								    uni.hideToast();
								}, 2000)
					        }
					    }
					});
					
					
				}
					// uni.login({
					// 	provider: 'weixin',
					// 	success: function(loginRes) {
					// 		let code = loginRes.code;
					// 		let data={
					// 			amount:_self.amount,
					// 			code:code
					// 		}
					// 		console.log(data)
					// 		request.cashout(data,function(res){
					// 			console.log(res)
					// 			if(res.code==1){
					// 				uni.showToast({
					// 					icon: 'none',
					// 					title: res.msg
					// 				});
					// 			}else{
					// 				uni.showToast({
					// 					icon: 'none',
					// 					title: res.msg
					// 				});
					// 			}
					// 		},function(err){
					// 			 uni.hideLoading();
					// 			 uni.showToast({
					// 				 icon: 'none',
					// 				 title: err.errmsg,
					// 			 });
					// 		});
											
							
					// 	},
					// });
				// }
				
			},
	        rChoose(value){ 
				 _self=this;
				_self.rSelect = value
				_self.amount=_self.cartList[value].name
			}
	    }
	}
</script>

<style  lang="scss">
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
		box-shadow:0 0 40px #EBEBEB;
		position: relative;
		.input_item{
			height: 84upx;
			line-height: 84upx;
			font-size: 28upx;
			border-radius: 100upx;
			background-color: #F6F6F6;
			position: absolute;
			width:497upx;
			top:15upx;
			right: 32upx;
			padding-left: 32upx;
		}
	}
	.txBtn{
		border:1px solid #EAB880;
		width:203upx;
		height:102upx;
		line-height: 102upx;
		border-radius: 20upx;
		text-align: center;
		color:#282828;
		font-size: 16px;
		float: left;
		margin-right: 25upx;
		margin-bottom: 32upx;
	}
	.active {
		color: #282828;
		border: 1px solid #FBD9AE;
		background-color: #FBD9AE;
	}
	.qrtx{
		margin:42upx 22upx;
		border:1px solid #FCB55A;
		background-color: #FCB55A;
		border-radius: 100upx;
		height:87upx;
		line-height: 87upx;
		&:after{
			border:1px solid #FCB55A;
		}
	}
	.itemList{
		background-color: #fff;
		width:95%;
		padding:20upx;
		padding-top:30upx;
		margin: 22upx;
		border-radius: 20upx;
		box-shadow:0 0 40px #EBEBEB;
		.zhifu_image{
			height:40upx;
		}
		.section{
			width:39upx;
			height:39upx;
			position: absolute;
			right: 10upx;
			top:10upx;
		}
	}
	.zhifu_zf {
	    margin-bottom: 10upx;
	    position: relative;
	    bottom: 10upx;
	    width: 100%;
	}
</style>
