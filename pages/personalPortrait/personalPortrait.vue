<template>
	<view class="section" style="height: 300rpx;">
		<view @tap="addImg" class="br4 grace-flex grace-flex-vcenter grace-flex-center" style="margin-top: 200rpx;line-height: 600rpx; height: 600rpx;width: 600rpx;background: #F1F1F1;display: flex;margin-left: 70upx;">
			<image class="br4" v-if="img.url && img.hasUpload" :src="`https://fenxiao.99zhifukeji.com/`+img.url" style="height: 100%;width: 100%;"></image>
		
			<image v-else src="../../static/missing-face.png" style="height: 600rpx;width: 600rpx;"></image>
	
		</view>
		<input name="headUrl" class="hide" :value="img.url" />
	</view>  
</template>

<script>
var request = require("@/common/service.js");
var _self;
export default {
	data(){
		return{
			img: {
				url: '',
				hasUpload: false,
				progress: 0
			}, 
		}
	},
	onLoad() {
		_self=this;
		_self.result = uni.getStorageSync('RESULT');
		_self.url = uni.getStorageSync('URL');
		_self.img.url=_self.url;
		if(_self.img.url){
			_self.img.hasUpload=true
		}
		request.setHToken(_self.result)
		uni.getSystemInfo({
			success: (res) => {
				console.log(res)
				_self.screenHeight=res.screenHeight
			}
		})
	},
	methods: {
		//从本地添加图片
		addImg: function(e) {
			uni.showLoading({
				title: ""
			});
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: function(res) {
					console.log("add", res);
					res.tempFilePaths.forEach(function(imgs, _) {
						_self.upload(imgs);
					});
					uni.hideLoading();
				},
				fail: function() {
					uni.hideLoading();
				}
			});
		},
		upload(url) {
			//上传头像 
			let formData = {
				file: url
			}
			request.uploadFile(url, 'file', "", formData, function(res) {
				console.log(res)
				if (res.code == 1) {
					//上传图片成功
					_self.img.url = res.data;
					uni.setStorageSync('URL', res.data);   
					_self.img.hasUpload = true;
				} else {
					_self.resetprogress(index);
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
					_self.uploadFail();
				}
			}, function(err) {
				_self.resetprogress(index);
				uni.showToast({
					title: "上传图片失败,请重试",
					icon: "none"
				});
				_self.uploadFail();
			}, function(progress) {
				console.log("p", progress);
				_self.img.progress = progress;
			})
	}
		},
		//上传失败
		uploadFail: function() {
			console.log('上传过程遇到错误');
		},
}
</script>

<style>
	page{
		background-color: #000000;
	}
</style>
