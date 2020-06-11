<template>
	<view class="">
		<view class="fz16 ml10 mt10">提现记录</view>
		<view style="position:relative;width: 100vw;height:100vh;overflow: hidden;" v-if="list!==''">
			<!-- <view class="fz14 listItem clearfix"  v-for="item in list" :key="item.id">
				<text class="fl fz12" >{{formatDate(item.payment_time*1000)}}</text>
				<text class="fr" style="color:#DFB67E">{{item.amount}}</text>
			</view> -->
			
			 	<view class="box1">
			 		<!-- <view class="title fz16" style="color:#222221;padding-top: 33upx ;padding-bottom: 33upx ;padding-left: 33upx;font-weight: 700;">直推数</view> -->
			 		<t-table @change="change">
			 			<t-tr>
			 				<!-- <t-th class="fz16">注册时间</t-th> -->
			 				<t-th class="fz16" style="flex:1.5">时间</t-th>
							<t-th class="fz16">金额</t-th>
			 				<t-th class="fz16">状态</t-th>
			 			</t-tr>
			 			<t-tr v-for="item in list" :key="item.id" >
			 				<!-- <t-td style="font-size:14px;">{{formatDate(item.create_time*1000)}}</t-td> -->
			 				<t-td style="font-size:14px;flex:1.5">{{formatDate(item.create_time*1000)}}</t-td>
			 				<t-td style="font-size:14px;" class="color1">{{item.amount}}</t-td>
							<t-td style="font-size:14px;" v-if="item.status==1">提现成功</t-td>
							<t-td style="font-size:14px;" v-else>审核中</t-td>
			 				
			 			</t-tr>
			 		</t-table>
			 	</view>
			  <view class="loading fz14" >{{loadingText}}</view>
		</view>
		<view class="fz14 tac" style="margin-top: 360upx;" v-else>
			暂无提现记录
		</view>
	</view>
</template> 

<script>
	var request = require("@/common/service.js");
	var formatter=require("@/common/formatter.js");
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	var _self, timer = null;
	export default{
		data(){
			return{
			  list:{},
			  loadingText:'加载中...',
			  page:1
			}
		  },
		  components: {
		      tTable,
		      tTh,
		      tTr,
		      tTd
		  },
		  onLoad(option){
		    _self = this;
		    _self.order_sn=option.order_sn;
		    _self.result = uni.getStorageSync('RESULT');
		    request.setHToken(_self.result)
			_self.getInfo()
		  },
		  onPullDownRefresh:function(){
		    this.getInfo();
		   },
		  onReachBottom:function(){
		    if(timer != null){
		     clearTimeout(timer);
		    }
		  timer = setTimeout(function(){
		     _self.getmorenews(); 
		    }, 1000);
		   },
		  methods: {
			  getmorenews : function(){
				  let data={
				  	page:_self.page
				  }
			     if(_self.loadingText != '' && _self.loadingText != '加载更多'){
			      return false;
			     }
			     _self.loadingText = '加载中...';
			     uni.showNavigationBarLoading();
				 request.hascashoutlist(data,function(res){
					 _self.loadingText = '';
				 		if(res.data.length==0){
				 			uni.hideNavigationBarLoading();
						  _self.loadingText = '已加载全部';
						  return false;
				 		}else{
				 		page++;
						 _self.list = _self.list.concat(res.data);
						 _self.loadingText = '加载更多';
						 uni.hideNavigationBarLoading();
				 		}
				 	},function(err){
				 	 uni.hideLoading();
				 	 uni.showToast({
				 		 icon: 'none',
				 		 title: err.errmsg,
				 	 });
				 })
			    },
			  getInfo(){
					_self = this;
					  uni.showNavigationBarLoading();
					request.hascashoutlist({page:1},function(res){
						console.log(res)
						if(	res.code==1){
								if(res.data.length==0){
									uni.hideNavigationBarLoading();
									 uni.stopPullDownRefresh();
									_self.loadingText = '已加载全部';
									return false;
								}else{
									_self.page++;
									_self.list=res.data;
									 uni.hideNavigationBarLoading();
									 uni.stopPullDownRefresh();
									 _self.loadingText = '加载更多';
								}
							}else{
								uni.showToast({
								 icon: 'none',
								 title: err.msg,
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
			  formatDate(payDate) {
					return formatter.formatDate(payDate, 'yyyy-MM-dd hh:mm')
				},
			  getList(e) {
				  console.log(e.detail);
			  },	
			  edit(item) {
				  uni.showToast({
					  title: item.name,
					  icon: 'none'
				  });
				}
		}
	}
</script>

<style>
	page{
		background-color: #ffffff;
	}
	.listItem{
		margin: 20upx;
		padding-bottom: 20rpx;
		padding-top:20upx;
		border-bottom: 1px solid #EFEFEF;
	}
	.box1{
		margin: 30upx 22upx;
		border-radius: 10upx;
		background-color: #fff;
		/* box-shadow:0 0 10px #F1F1F1; */
		padding-left: 10upx;
		padding-bottom: 20upx;
		
	}
	.color1 .t-td{
		color:#DFB67E!important ;
	}
	.box1 .t-td{border-left: 1px #d0dee5 solid!important}	
	.loading{text-align:center; line-height:60px;}
</style>
