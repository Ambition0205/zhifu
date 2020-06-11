<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.receiver" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<pick-regions :default-regions="defaultRegions" @getRegions="handleGetRegions">
				
				<text v-if="type == 'edit' ">
					<text style="font-size: 28upx;color:#999;" v-if="this.addressData.regions=='' ">选择省市区</text>
					<text v-else>
						<text style="font-size: 28upx;" >{{regionsName}}</text> 
					</text>
				</text>
				<text v-else>
					<text style="font-size: 28upx;color:#999;" v-if="addressData.regions=='' ">选择省市区</text>
					<text v-else>
						<text style="font-size: 28upx;">{{regionsName}}</text> 
					</text>
				</text>
			</pick-regions>
			
			<!-- <text class="iconfont" style="font-size: 24upx;color:#818181;margin-right: 10upx;">&#xe660;</text> -->
			
		</view>
		<view class="row b-b"> 
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.status" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<button class="del-btn" @click="delBtn" v-show="type==='edit'">删除</button>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	var request = require("@/common/service.js");
	var _self;
	export default {
		components:{
		    pickRegions
		},
		data() {
			return {
				addressData: {
					receiver: '',
					phone: '',
					status: false,
					area:'',
					regions:[],
				},
				defaultRegions:['北京市','市辖区','东城区'],
				type:''
				
			}
		},
		onLoad(option){
			_self=this;
			let title = '新增收货地址';
			_self.type=option.type;
			if(option.type==='edit'){
				title = '编辑收货地址'
				_self.addressData = JSON.parse(option.data)
				
				if(_self.addressData.status=='1'){
					_self.addressData.status=true;
				}else{
					_self.addressData.status=false;
				}
				_self.addressData.phone=_self.addressData.receive_tel
				
			}
			_self.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		computed:{
		    regionsName(){
		        // 转为字符串
		        return this.addressData.regions.map(item=>item.name).join(' ')
		    }
			
		},
		methods: {
			addAddress:function(){
				
			},
			switchChange(e){
				console.log(e.detail)
				if(e.detail){
					this.addressData.status = "1";
				}else{
					this.addressData.status = "0";
				}
			},
			//提交
			confirm(){
				
				// 修改 
				if(_self.type=='edit'){
					let data={
						id:_self.addressData.id,
						status:_self.addressData.status,
						regions:_self.addressData.regions,
						area:_self.addressData.area,
						receiver:_self.addressData.receiver,
						phone:_self.addressData.phone,
					};
					if(!data.receiver){
						this.$api.msg('请填写收货人姓名');
						return;
					}
					if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
						this.$api.msg('请输入正确的手机号码');
						return;
					}
					if(data.regions.length<=0){
						console.log(data.regions)
						this.$api.msg('请在选择地址');
						return;
					}
					if(!data.area){
						this.$api.msg('请填写门牌号信息');
						return;
					}
					console.log(data)
					request.saveAddress(data,function(res){
						console.log(res.data)
						 if(res.code==1){
							uni.showToast({
								 icon: 'none',
								 title: res.msg,
							});
							setTimeout(function(){
								uni.navigateBack({
									url: `/pages/address/address`
								})
							},1000)
							
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
				}else{
					// 新增
					let data =this.addressData;
					if(!data.receiver){
						this.$api.msg('请填写收货人姓名');
						return;
					}
					if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
						this.$api.msg('请输入正确的手机号码');
						return;
					}
					if(data.regions.length<=0){
						console.log(data.regions)
						this.$api.msg('请在选择地址');
						return;
					}
					if(!data.area){
						this.$api.msg('请填写门牌号信息');
						return;
					}
				
					request.addAddress(data,function(res){
						console.log(res.data)
						 if(res.code==1){
							uni.showToast({
								 icon: 'none',
								 title: res.msg,
							});
							setTimeout(function(){
								uni.navigateBack({
									url: `/pages/address/address`
								})
							},1000)
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
				}
				
			// this.$api.prePage()
			// 	this.$api.prePage().refreshList(data, this.manageType);
			// 	this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
			// 	setTimeout(()=>{
			// 		uni.navigateBack()
			// 	}, 800)
			
			},
			delBtn:function(){
				let data={
					id:this.addressData.id
				}
				console.log(data)
				request.deleteAddress(data,function(res){
					console.log(res.data)
					 if(res.code==1){
						uni.showToast({
							 icon: 'none',
							 title: res.msg,
						});
						setTimeout(function(){ 
							uni.navigateTo({
							url: `/pages/address/address`
						})}, 1000);
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
			handleGetRegions(regions){
			    this.addressData.regions = regions;
			}
		},
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 490upx;
		height: 80upx;
		margin: 60upx auto;
		margin-bottom: 30rpx;
		font-size: $font-lg;
		color: #fff;
		background-color:$uni-color-primary;
		border-radius: 60upx;
		&::after{
			border:1px solid $uni-color-primary;
		}
	}
	.del-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 490upx;
		height: 80upx;
		margin: 30upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color:red;
		border-radius: 60upx;
		&::after{
			border:1px solid red;
		}
	}
</style>
