<template>
	<view class="container">
		  <view class="uni-list">
			 <view class="uni-list-one" hover-class="uni-list-cell-hover" >
				 <navigator url='../personalPortrait/personalPortrait' open-type="navigate">
					  <image v-if="userinfo.avatar.includes('https')" class="portrait"  style="width: 120upx;height:120upx;margin-top: 20upx;"  :src="userinfo.avatar"></image>
					 <image v-else class="portrait" :src="src+userinfo.avatar" style="width: 120upx;height:120upx;margin-top: 20upx;" ></image>
					 <!-- <image v-else class="portrait"  style="width: 120upx;height:120upx;margin-top: 20upx;" :src="img"></image> -->
					  <span class="iconfont fr" style="font-size: 12px;color:#818181;">&#xe660;</span>
					  <span class="fr fz14 c99 mr10">修改头像</span>
				  </navigator>
			 </view>
		 </view>
		 <view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<text class="fz16" style="color:#484848">用户名</text>
				<span class="iconfont fr" style="font-size: 12px;color:#818181;">&#xe660;</span>
				<span class="fr fz14 c99 mr10">{{userinfo.username}}</span>
			</view>
		 </view>
		 <view class="uni-list" >
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="modifynickname">
				<text class="fz16" style="color:#484848">昵称</text>
				<span class="iconfont fr" style="font-size: 12px;color:#818181;">&#xe660;</span>
				<span class="fr fz14 c99 mr10">{{userinfo.nickname}}</span>
			</view>
		 </view>
		 <view class="uni-list">
			<view class="uni-list-pas" hover-class="uni-list-cell-hover" >
				<navigator url='../changePas/changePas' open-type="navigate">
					<text class="fz16" style="color:#484848">修改密码</text>
					<span class="iconfont fr" style="font-size: 12px;color:#818181;">&#xe660;</span>
				</navigator>
			</view>
		 </view>
		 <view class="uni-list" style="border-bottom:none;" @tap="cardBinding">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
				<text class="fz16" style="color:#484848">银行卡绑定</text>
				<span class="iconfont fr" style="font-size: 12px;color:#818181;">&#xe660;</span>
			</view>
		 </view>
	
		 <!-- <view class="uni-list" style="border-bottom:none;">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
				<text class="fz16" style="color:#484848">清除缓存</text>
				<text style="" class="fz12 fr clearBtn" @tap="clearBtn">清除缓存</text>
				<text class="fr fz14 c99 mr10">0.34M</text>
			</view>
		 </view> -->
		 <view class="tac">
		 	<button class="fz16 mianBtn" @tap="signOut">退出登录</button>
		 </view>
		<!-- 修改昵称 弹窗 -->
		<view>
			<view :hidden="userFeedbackHidden" class="popup_content">
				<view class="popup_title">编辑昵称</view>
				<view class="popup_textarea_item">
					<text style="color:#999999;font-size: 28upx;float:left;margin-right: 20upx;">昵称</text>
					<input class="popup_textarea" :placeholder='userinfo.nickname+`（1-7个汉字或字母)`' v-model="feedbackContent">
					</input>
					<view style="position: relative;margin-top:90upx;">
						<button class="tjbtn" @tap="cancelBtn">取消</button>
						<button class="tjbtn" style="right:20upx;" @click="submitFeedback()">确定绑定</button>
					</view>
				</view>
			</view>
			<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
		</view>
		<!-- 绑定银行卡 弹窗 -->
		<view>
			<view :hidden="ankCard" class="popup_content" style="height:673upx;">
				<view class="popup_title">银行卡绑定</view>
				<view class="popup_input_item" style="margin-top:0upx;">
					<view class="popup_item">
						<text style="color:#999999;font-size: 28upx;float:left;margin-right: 60upx;">银行名称</text>
						<input class="input_item" placeholder='请输入银行名称' v-model="bankMing">
						</input>
					</view>
					<view class="popup_item">
						<text style="color:#999999;font-size: 28upx;float:left;margin-right: 60upx;">支行名称</text>
						<input class="input_item" placeholder='请输入支行名称' v-model="branchMing">
						</input>
					</view>
					<view class="popup_item">
						<text style="color:#999999;font-size: 28upx;float:left;margin-right: 120upx;">姓名</text>
						<input class="input_item" placeholder='请输入姓名' v-model="name">
						</input>
					</view>
					<view class="popup_item">
						<text style="color:#999999;font-size: 28upx;float:left;margin-right: 40upx;">银行卡账号</text>
						<input class="input_item" placeholder='请输入银行卡账号' v-model="cardNumbe">
						</input>
					</view>
					<view style="position: relative;margin-top:50upx;">
						<button class="tjbtn" @tap="quxiaoBtn">取消</button>
						<button class="tjbtn" style="right:20upx;" @tap="bindBtn">确定绑定</button>
					</view>
				</view>
			</view>
			<view class="popup_overlay" :hidden="ankCard" @tap="hideview"></view>
		</view>
	</view>
</template>

<script>
	var request = require("@/common/service.js");
	import prompt from '../../components/mack.vue';
	var _self;
	export default{
	  data() {
		return {
			  userFeedbackHidden: true, // 昵称隐藏
			  ankCard:true,// 银行卡隐藏
			  feedbackContent: '' ,// 用户反馈内容
			  bankMing:'',
			  branchMing:'',
			  name:'',
			  cardNumbe:'',
			  userinfo:[],
			  img:'/static/missing-face.png',
			  src:'https://fenxiao.99zhifukeji.com/',
		  }
	  },
	components: {
	  	prompt,
	},
	onLoad(){
	  _self = this;
	  _self.result = uni.getStorageSync('RESULT');
	  console.log(_self.result)
	  request.setHToken(_self.result)
	},
	onShow() {
		this.getuserinfo()
	},
	methods:{
		getuserinfo:function(){
			request.user(function(res){
				console.log(res.data)
				if(res.code==1){
					_self.userinfo=res.data;
				  }else{
					uni.showToast({
						icon: 'none',
						title: res.msg+',请重试登录'
					});
					uni.navigateTo({
						url: '/pages/public/login'
					})
				  } 
			},function(err){
				 uni.hideLoading();
				 uni.showToast({
					 icon: 'none',
					 title: err.errmsg,
				 });
			})
		},
		  //-------------------------昵称-----------------------
		modifynickname:function(){// 显示输入弹出框
			_self.userFeedbackHidden = false;
			
	    },
		hideDiv() { // 隐藏输入弹出框
			_self.userFeedbackHidden = true;
		},
		//确定按钮
		submitFeedback() { 
			var _self =this;
			let data={
				nickname:_self.feedbackContent
			}
			console.log(data)
			request.editnickt(data,function(res){
				console.log(res.data)
				if(res.code==1){
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					setTimeout( function(){
						_self.userFeedbackHidden = true;
						_self.getuserinfo()
					}, 500 );
					
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
		//取消按钮
		cancelBtn:function(){
			_self.userFeedbackHidden = true;
			uni.showToast({
			    title: '您放弃了修改',
			    icon:'none'
			});
		},
		
		//-------------------------银行卡绑定-----------------------
		cardBinding:function(){// 显示输入弹出框
			_self.ankCard = false;
		},
		hideview:function() { // 隐藏输入弹出框
			_self.ankCard = true;
		},
		//确定按钮
		bindBtn:function() { 
			var _self =this;
				let data={
					bank_name:_self.bankMing,
					sub_bank_name:_self.branchMing,
					realname:_self.name,
					bank_card:_self.cardNumbe
				}
				console.log(data)
				if(_self.bankMing==''||_self.branchMing==''||_self.name==''||_self.cardNumbe==''){
					uni.showToast({
					    title: '输入不能为空',
					    icon:'none'
					});
				}else{
					request.bindBank(data,function(res){
						console.log(res.data)
						if(res.code==1){
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							setTimeout( function(){
								_self.ankCard = true;
								_self.getuserinfo()
							}, 1000 );
						}else{
							//底部弹出层
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
					
				}
				
		},
		//取消按钮
		quxiaoBtn:function(){
			_self.ankCard = true;
			uni.showToast({
			    title: '您放弃了绑定',
			    icon:'none'
			});
		},
		
		// 退出登录 
		signOut:function(){
				uni.showModal({
					content: '确定要退出登录么',
					success: (e)=>{
						console.log(e)
						if(e.confirm){
							uni.removeStorageSync('RESULT')
							setTimeout(()=>{
								uni.reLaunch({
									url: '../public/login',
								})
							}, 200)
						}
					}
				});
		}
	}
		
}
</script>
<style lang='scss'>
	page{
		background: #F9F9F9;
	}
	.uni-list-one{
		height: 162upx;
		line-height: 162upx;
	}
	.uni-list{
		padding-left: 34upx!important;
		padding-right: 44upx!important;
		border-bottom: 0.1px solid #e5e5e5;
		background-color: #fff;
		.clearBtn{
			display: inline-block;
			border:1px solid #DEA567;
			border-radius: 100px;
			color: #DEA567;
			width:165upx;
			height: 57upx;
			line-height: 57upx;
			text-align: center;
			margin-top: 20upx;
		}
	}
	.uni-list-cell,.uni-list-pas{
		height: 108upx;
		line-height: 108upx;
	}
	.mianBtn{
		background-color: #DEA567;
		color:#FFFFFF;
		border-radius: 100px;
		border:1px solid #DEA567;
		width:302upx;
		height:65upx;
		line-height: 60upx;
		margin-top: 40upx;
		&:after{
			border:1px solid #DEA567;
		}
	}
	.custom_container{
	  width:100%;
	  height:100%;
	  display: flex;
	  align-items: center;
	  position: absolute;
	  top:0;
	  left:0;
	  z-index: 99;
	}
	.popup_overlay {
 
		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index:998;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=88);
	}
 
	.popup_content {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 675upx;
		height: 406upx;
		margin-left: -338upx;
		margin-top: -270upx;
		background-color: white;
		z-index: 999;
		overflow: auto;
		border-radius: 20upx;
		
	}
 
	.popup_title {
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		background-color: #F1B76A;
		text-align: center;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		color:#282828;
	}
 
	.popup_textarea_item {
		padding-top: 10upx;
		height: 76upx;
		width: 95%;
		margin-top: 30upx;
		margin-left: 20upx;
		border-bottom: 1px solid #E7E7E7;
		padding-left: 10upx;
	}
	.popup_input_item{
		padding-top: 10upx;
		height: 76upx;
		width: 95%;
		margin-top: 30upx;
		margin-left: 20upx;
		padding-left: 10upx;
	}
	.tjbtn{
		background-color:#F3BD75;
		color:#151515;
		width:251upx;
		height:88upx;
		line-height: 88upx;
		border-radius: 100px;
		position: absolute;
		top:0upx;
		&:after{
			border:1px solid #F3BD75;
		}
		
	}
	.popup_item{
		height: 99upx;
		line-height: 99upx;
		border-bottom: 1px solid #E7E7E7;
		.input_item{
			height: 99upx;
			font-size: 24upx;
		}
	}

</style>
