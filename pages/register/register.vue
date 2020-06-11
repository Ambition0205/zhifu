<template>
	<view class="">
		<view class="">
			<image src="/static/login/bgtop.png" class="bg_top_img"></image>
		</view>
		<view class="content">
			<view class="uni-form-item uni-column">
				<span class="iconfont font_color_or font-b ml64 float_l">&#xe65f;</span>
				<input type="tel" maxlength="11" v-model="tel" class="uni-input float_l ml20" name="" placeholder-class="phClass" placeholder="请输入手机号" style=" margin-top: 22rpx;height:80upx;"/>
			</view>
			<view class="uni-form-item uni-column column-with-btn">
				<span class="iconfont font_color_or font-b ml64 float_l">&#xe62a;</span>
				<input type="number"  v-model="verification" class="uni-input float_l ml20" name="" placeholder-class="phClass" placeholder="请输入验证码" style="height:80upx;"/>
				<!-- <button :class="{active : !disableCodeBtn} " :disabled="disableCodeBtn" style="background:#E8B47A;color:#1E1D1D;border-radius: 100px;height:66rpx;line-height: 66rpx;font-size: 28rpx;width:210rpx;"  @tap="sendCodes">{{codeBtn.text}}</button> -->
				<button @tap="sendCodes" :class="{active:!disableCodeBtn}" :disabled="disableCodeBtn" class="sendCodes">{{codeBtn.text}}</button>
			</view>
			<view class="uni-form-item uni-column">
				<span class="iconfont font_color_or font-b ml64 float_l">&#xe85a;</span>
				<input type="password"  v-model="password" class="uni-input float_l ml20" name="" placeholder-class="phClass" placeholder="请输入密码" style=" margin-top: 22rpx;height:80upx;" />
			</view>
			<button form-type="submit" class="zcbtn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @tap="wxGetUserInfo">注册</button>
			<view class="links">已有账号？<view class="link-highlight" @tap="gotoLogin">点此登陆</view></view>
		</view>
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
				},
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse')||true,//默认为true
				encryptedData:'',
				iv:'',
				code:'',
				scene:''
			}
		},
		onLoad(query) {
			let _this = this;
			_this.scene = decodeURIComponent(query.scene)
			// console.log(_this.scene)
		},
		
		methods: {
			 wxGetUserInfo() {
			        let _this = this;
					console.log(123)
					console.log('_this.scene--->'+_this.scene)
					let tel =  _this.tel;
					let password =  _this.password;
					let verification= _this.verification;
					let scene=_this.scene;
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
					var userinfoDetails = {}
					 // userinfoDetails = res.detail.userInfo 
					 // #ifdef APP-PLUS
							setTimeout(function () {
								uni.hideLoading();
							}, 2000);
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(loginRes));
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log('-------获取微信用户所有-----');
											console.log(JSON.stringify(infoRes.userInfo));
											if(_this.scene=='undefined'){
												let data={
														username:_this.tel,
														password:_this.password,
														randomCode:_this.verification,
														invite_code:'',
														avatarUrl:infoRes.userInfo.avatarUrl,
														nickName:infoRes.userInfo.nickName,
														gender:infoRes.userInfo.gender,
														city:infoRes.userInfo.city,
														province:infoRes.userInfo.province,
														openId:infoRes.userInfo.openId,
												}
												console.log(data)
												uni.request({
													url: 'https://fenxiao.99zhifukeji.com/api/wechat/appregister',
													data: data,
													method:"POST",
													header : {'content-type':'application/x-www-form-urlencoded'},
													success: function (res) {
														console.log(res)
														if(res.data.code == 1){
															uni.showToast({
																icon: 'none',
																title: res.data.msg
															});
															request.setHToken(res.data.data);
															uni.setStorageSync('RESULT', res.data.data);
															let result = uni.getStorageSync('RESULT');
															console.log(result)
															setTimeout(function() {
																plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
																		console.log(JSON.stringify(wgtinfo));//客户端详情数据
																		console.log(wgtinfo.version);//应用版本号
																		if (plus.os.name == "Android") {
																			let appurl = "market://details?id=九九智付"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
																			plus.runtime.openURL(appurl);
																		}
																})
															}, 600);
															// uni.switchTab({
															// 	url: "/pages/index/index",
															// });
															
															
														}else{
															uni.hideLoading();
															setTimeout(function() {
																uni.showToast({
																	icon: 'none',
																	title: res.data.msg
																});
															}, 600);
														}
														
													}
												})
											}else{
												let data={
													username:_this.tel,
													password:_this.password,
													randomCode:_this.verification,
													invite_code:_this.scene,
													avatarUrl:infoRes.userInfo.avatarUrl,
													nickName:infoRes.userInfo.nickName,
													gender:infoRes.userInfo.gender,
													city:infoRes.userInfo.city,
													province:infoRes.userInfo.province,
													openId:infoRes.userInfo.openId,
												}
												console.log(data)
												uni.request({
													url: 'https://fenxiao.99zhifukeji.com/api/wechat/appregister',
													data: data,
													method:"POST",
													header : {'content-type':'application/x-www-form-urlencoded'},
													success: function (res) {
														console.log(res)
														if(res.data.code == 1){
															// uni.switchTab({
															// 	url: "/pages/index/index",
															// });
															uni.showToast({
																icon: 'none',
																title: res.data.msg
															});
															request.setHToken(res.data.data);
															uni.setStorageSync('RESULT', res.data.data);
															let result = uni.getStorageSync('RESULT');
															console.log(result)
															setTimeout(function() {
																plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
																		console.log(JSON.stringify(wgtinfo));//客户端详情数据
																		console.log(wgtinfo.version);//应用版本号
																		if (plus.os.name == "Android") {
																			let appurl = "market://details?id=九九智付"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
																			plus.runtime.openURL(appurl);
																		}
																})
															}, 600);
														}else{
															uni.hideLoading();
															setTimeout(function() {
																uni.showToast({
																	icon: 'none',
																	title: res.data.msg
																});
															}, 600);
														}
														
													}
												})
											}
										}
									});
								}
							});
							// }else{
							// 	// 扫码注册 成功跳应用市场
							// 	let data={
							// 		  username:_this.tel,
							// 		  password:_this.password,
							// 		  randomCode:_this.verification,
							// 		  encryptedData:encryptedData,
							// 		  iv:iv,
							// 		  code:code,
							// 		  invite_code:''
							// 	}
							// 	console.log(data)
							// 	plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
							// 			console.log(JSON.stringify(wgtinfo));//客户端详情数据
							// 			console.log(wgtinfo.version);//应用版本号
							// 			if (plus.os.name == "Android") {
							// 				let appurl = "market://details?id=九九智付"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
							// 				plus.runtime.openURL(appurl);
							// 			}
							// 	})
								
							// }
					// #endif
					// #ifdef MP 
						console.log('小程序')
						uni.login({
							success:function(res){
								console.log(res)
								var code= res.code;
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log(infoRes)
										var encryptedData= infoRes.encryptedData;
										var iv= infoRes.iv;
										uni.showLoading({
											title: '登陆中...',
											mask: false
										});
										if(_this.scene=='undefined'){
											let data={
													username:_this.tel,
													password:_this.password,
													randomCode:_this.verification,
													encryptedData:encryptedData,
													iv:iv,
													code:code,
													invite_code:''
											}
											console.log(data)
											uni.request({
												url: 'https://fenxiao.99zhifukeji.com/api/wechat/register',
												data: data,
												method:"POST",
												header : {'content-type':'application/x-www-form-urlencoded'},
												success: function (res) {
													console.log(res)
													if(res.data.code == 1){
														
														uni.switchTab({
															url: "/pages/index/index",
														});
														request.setHToken(res.data.data);
														uni.setStorageSync('RESULT', res.data.data);
														let result = uni.getStorageSync('RESULT');
														console.log(result)
													}else{
														uni.hideLoading();
														setTimeout(function() {
															uni.showToast({
																icon: 'none',
																title: res.data.msg
															});
														}, 600);
													}
													
												}
											})
										}else{
											let data={
												username:_this.tel,
												password:_this.password,
												randomCode:_this.verification,
												encryptedData:encryptedData,
												iv:iv,
												code:code,
												invite_code:_this.scene
											}
											console.log(data)
											uni.request({
												url: 'https://fenxiao.99zhifukeji.com/api/wechat/register',
												data: data,
												method:"POST",
												header : {'content-type':'application/x-www-form-urlencoded'},
												success: function (res) {
												console.log(res)
												if(res.data.code == 1){
													uni.switchTab({
														url: "/pages/index/index",
													});
													request.setHToken(res.data.data);
													uni.setStorageSync('RESULT', res.data.data);
													let result = uni.getStorageSync('RESULT');
													console.log(result)
												}else{
														uni.hideLoading();
														setTimeout(function() {
														uni.showToast({
														icon: 'none',
														title: res.data.msg
														});
														}, 600);
													}
											
												}
											})
										}
										// 结束
								
								
									}
								})
							}
							})	
					// #endif
			},
			
			sendCodes: function () {
				let tel = this.tel;
				let data={
					tel:this.tel
				}
				console.log(data)
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
			},
			gotoLogin: function () {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			}
		},
		computed: {
			disableCodeBtn: function (){
				return this.codeBtn.waitingCode;
			} 
		},
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;
	.content{
		padding: 0upx 50upx 100upx;
	}
	.ml64{
		margin-left: 32upx;
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
	.ml20{
		margin-left: 40rpx;
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
		margin-top:119upx;
		border-radius: 100px;
		height: 90upx;
		line-height: 90upx;
		background-color: #F2B373;
		border:1px solid #F8C693;
		&:after{
			border:1px solid #F8C693;
		}
	}
	.uni-form-item{
		// margin-bottom: 40upx;
		height: 128rpx;
		line-height: 128rpx;
		// padding:20upx 0;
		border-bottom: 1px solid #e3e3e3;
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
				border: none;
			}
			&.active{
				background-color: #F8C693;
				color: #333;
				
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
	.h40{
		height: 80upx;
	}
	.phClass{
		color: #999999;
	}
	.sendCodes{
		background:#E8B47A;
		color:#1E1D1D;
		border-radius: 100px;
		height:66rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		width:210rpx;
	}
</style>
