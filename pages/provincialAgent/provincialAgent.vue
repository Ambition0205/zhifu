<template>
	<view class="container">
		<view class="">
			<image src="/static/daili/sheng_img.png" class="bg_top_img"></image>
			<image src="/static/daili/shiadi.png" class="bg_btn_img"></image>
			<image src="/static/daili/shengdai_btm.png" class="bg_bow_img"></image>
		</view>
		<view  class="mt5" style="color:#252525;font-size: 28upx;margin-left:30upx;" >
			<text class="iconfont font_orange" style="margin-right:5px;font-size: 32upx;" v-show="showUpImg" @click="check">&#xe626;</text>
			<text class="iconfont font_orange" style="margin-right:5px;" v-show="!showUpImg" @click="check">&#xe63d;</text>
			<text>我已阅读并同意</text>
			<text class="font_orange" @tap="gotodl">《代理协议》</text>
		</view>	
		<view style="text-align: center;padding-bottom: 20upx;">
			<button class="font_orange sqbtn" @tap="ljsqBtn">立即申请</button>
		</view>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	var _self;
	 export default { 
		data() {
		    return {
				showUpImg:true,
				id:'',
				order_sn:''
		    };
		},
		onLoad(option) {
			_self = this;
			_self.id=option.id;
			console.log(_self.id)
			_self.result = uni.getStorageSync('RESULT');
			
			request.setHToken(_self.result)
		},
		onShow() {
			_self.readyGo()
		},
		methods: {
			readyGo:function(){
				let data={
					id:_self.id
				}
				console.log(data)
				request.agentDetail(data,function(res){
					console.log(res)
					 
				},function(err){
					 uni.hideLoading();
					 uni.showToast({
						 icon: 'none',
						 title: err.errmsg,
					 });
				})
			},
			check() {
				this.showUpImg = !this.showUpImg
			},
			//立即申请
			ljsqBtn(){
				let data={
					agentsId:_self.id
				}
				if(this.showUpImg){
					request.setOrder(data,function(res){
						 if(res.code==1){
							 _self.order_sn=res.data.order_sn;
							uni.navigateTo({
								url: '/pages/choosePayMethod/choosePayMethod?order_sn='+_self.order_sn
							})
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
							 title: '系统繁忙',
						 });
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '请阅读并勾选代理协议'
					});
				}	
			},
			gotodl:function(){
				uni.navigateTo({
					url: '/pages/agreement/provincialAg'
				})
			}
		},
			   
}
</script>

<style  lang='scss'>
	.bg_top_img{
		width: 100%;
		height: 500upx;
	}
	.bg_btn_img{
		width: 92%;
		height: 320upx;
		margin:0 32upx;
	}
	.bg_bow_img{
		width: 92%;
		height: 300upx;
		margin:0 30upx;
	}
	.sqbtn{
		background-color: #E9B47A;
		border:1px solid #E9B47A;
		border-radius: 100px;
		width:90%;
		color: #212121;
		margin-top: 42upx;
		margin-bottom: 42upx;
		&:after{
			border:1px solid #E9B47A;
		}
	}
</style>
