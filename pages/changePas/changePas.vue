<template>
	<view class="">
		<view class="content">
				<view class="uni-form-item uni-column">
					<span class="iconfont font_color_or font-b ml64 float_l">&#xe65f;</span>
					<input type="tel" class="uni-input float_l ml40" name="" v-model="tel" placeholder="请输入手机号" style=" margin-top: 22rpx;height:80upx;"/>
				</view>
				<view class="uni-form-item uni-column column-with-btn">
					<span class="iconfont font_color_or font-b ml64 float_l">&#xe62a;</span>
					<input type="number"  v-model="verification" class="uni-input float_l ml40" name="" placeholder="请输入验证码" style="height:80upx;"/>
					<button :class="{active : !disableCodeBtn} " :disabled="disableCodeBtn" @tap="sendCodes" style="background:#E8B47A;color:#1E1D1D;margin-right:36rpx;border-radius: 100px;height:66rpx;line-height: 66rpx;font-size: 28rpx;width:210rpx;">{{codeBtn.text}}</button>
				</view>
				<view class="uni-form-item uni-column" style="border-bottom: none;">
					<span class="iconfont font_color_or font-b ml64 float_l">&#xe85a;</span>
					<input type="password"   v-model="password" class="uni-input float_l ml40" name="" placeholder="请输入密码" style=" margin-top: 22rpx;height:80upx;"/>
				</view>
		</view>
		<button type="primary " class="zcbtn" @tap="zcbtnBtn">确认修改</button>
	</view>
</template>
 
<script>
	var request= require("@/common/service.js");
	var _self;
	export default {
		data() {
			return {
				tel:'',
				password:'',
				captchaImg: '',
				verification:'',
				seconds: 10,
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				}
			}
		},
		onLoad() {
			_self = this;
			_self.result = uni.getStorageSync('RESULT');
			console.log(_self.result)
			request.setHToken(_self.result)
		},
		methods: {
			zcbtnBtn(){
				let tel = this.tel;
				let password = this.password;
				let verification=this.verification;
				let data={
					tel:this.tel,
					password:this.password,
					randomCode:this.verification
				}
				if (tel.length < 11) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入手机号'
				    });
				    return;
				}
				if (verification.length==0) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入正确的验证码'
				    });
				    return;
				}
				if (password.length < 6) {
				    uni.showToast({
				        icon: 'none',
				        title: '密码最短为 6 个字符'
				    });
				    return;
				}
				
				uni.showLoading({
					title:'请稍后...',
					mask:true
				})
				console.log(data)
				request.modifyPassword(data,function(res){
					console.log(res)
					 if(res.code == 1){
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						uni.reLaunch({
						  url: '../index/index' 
						});
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
			sendCodes: function () {
				let tel = this.tel;
				let data={
					tel:this.tel
				}
				if (tel.length < 11) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入正确的手机号'
				    });
				    return;
				}
				
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				
				let countdown = setInterval( () => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if( this.codeBtn.count < 0 ){
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				},1000);
				request.sendcode(data,function(res){
					console.log(res)
					 if(res.code == 1){
						uni.showToast({
							title:'发送成功,注意查收',
							icon:'none'
						})
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
						 title: err.msg,
					 });
				})
			}
		},
		computed: {
			disableCodeBtn: function (){
				return this.codeBtn.waitingCode;
			} 
		}
	}
</script>
<style lang="scss" scoped>
	$color-primary: #b49950;
	.content{
		// margin: 60upx 44upx 146upx;
		// box-shadow: 0 2px 3px 5px #ECECEC;
		// border-radius:20upx;
		// border:1px solid #E4E4E4;
		padding-top: 30px;
		height:500upx;
		background: url(../../static/zc_img.png);
		background-size: 100% 100%;
		}
	.ml64{
		margin-left: 30upx;
	}
	.bg_top_img{
		width: 100%;
	}
	.font_color_or{
		color:#F8C693;
	}
	.font-b{
		font-size: 52rpx;
	}
	.ml40{
		margin-left: 30rpx;
	}
	.mt30{
		margin-top: 60upx;
	}
	.float_r{
		float: right;
	}
	.float_l{
		float: left;
	}
	.zcbtn{
		// margin-top:119upx;
		border-radius: 100px;
		width:703rpx;
		height: 90upx;
		line-height: 90upx;
		background-color: #F2B373;
		border:1px solid #F8C693;
		&:after{
			border:1px solid #F8C693;
		}
	}
	.uni-form-item{
		// margin-top: 40upx;
		height: 128rpx;
		line-height: 128rpx;
		border-bottom: 1px solid #E4E4E4;
		// background-color: red;
		margin:0 40upx;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.img-captcha{
		width: 150upx;
		height: 60upx;
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
</style>
