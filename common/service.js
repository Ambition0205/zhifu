/**
 * 此文件管理项目所有接口
 */
import { get, post,put,upload} from '../jsTools/request';
export const apiServer = 'https://fenxiao.99zhifukeji.com/api'; //api 基础路径地址, 在项目中使用组合的方式组合出 api 路径，便于后期 api 的接口更换及维护
// var openApi = require("./openApi.js");
// fenxiao.99zhifukeji.com
 var header={};
 let mDict={}
module.exports = {  
	setHToken:function(token){
		header = {"token":token}
	},
	setDict:function(dict){
		 mDict = dict
	}, 
	getDict:function(){
		return mDict
	},
	//登录
	login :(data,callback,err ) => post(`${apiServer}/wechat/login`,data,"",null,callback,err),
	userInfo:(callback,err ) => post(`${apiServer}/zv/common/info`,{},"",header,callback,err),
	// 个人中心
	user:(callback,err ) => post(`${apiServer}/user/index`,{},"",header,callback,err), 
	// 提现界面	
	mycapital:(callback,err ) => post(`${apiServer}/user/mycapital`,{},"",header,callback,err),
	//资讯
	Information:(data,callback,err ) => put(`${apiServer}/information/index`,data,"",header,callback,err), 
	//资讯详情页
	informationDetail:(data,callback,err ) => post(`${apiServer}/information/detail`,data,"",header,callback,err),  
	//获取验证码
	sendcode:(data,callback,err ) => post(`${apiServer}/sms/sendcode`,data,"",header,callback,err),
	//注册
	register:(data,callback,err ) => post(`${apiServer}/wechat/register`,data,"",header,callback,err),
	//推广二维码
	// extensionCode:(callback,err ) => post(`${apiServer}/user/extensionCode`,{},"",header,callback,err),
	//推广二维码
	mpcode:(callback,err ) => post(`${apiServer}/spreadcode/mpcode`,{},"",header,callback,err),
	// 修改密码
	modifyPassword:(data,callback,err ) => post(`${apiServer}/user/modifyPassword`,data,"",header,callback,err),
	// 忘记密码
	forgetPassword:(data,callback,err ) => post(`${apiServer}/wechat/forgetPassword`,data,"",header,callback,err), 
	//编辑昵称
	editnickt :(data,callback,err ) => post(`${apiServer}/user/editnick`,data,"",header,callback,err),
	// 我的市场
	mymarket :(data,callback,err ) => post(`${apiServer}/user/mymarket`,data,"",header,callback,err),
	//佣金明细
	commission :(data,callback,err ) => post(`${apiServer}/user/commission`,data,"",header,callback,err),
	//提现记录
	hascashoutlist :(data,callback,err ) => post(`${apiServer}/user/hascashoutlist`,data,"",header,callback,err),
	//绑定银行卡
	bindBank :(data,callback,err ) => post(`${apiServer}/user/bindBank`,data,"",header,callback,err),
	//交易查询
	transflow :(callback,err ) => post(`${apiServer}/user/transflow`,{},"",header,callback,err),
	//发起支付
	rechargePay :(callback,err ) => post(`${apiServer}/recharge/pay`,{},"",header,callback,err),
	
	//发起微信支付
	wechatPay :(data,callback,err ) => post(`${apiServer}/wechat/pay`,data,"",header,callback,err),
	// 发起余额支付
	wechatBalan :(data,callback,err ) => post(`${apiServer}/wechat/balancepay`,data,"",header,callback,err),
	
	//代理专栏
	agentIndex :(callback,err ) => post(`${apiServer}/agent/index`,{},"",header,callback,err),
	//代理详情
	agentDetail :(data,callback,err ) => post(`${apiServer}/agent/detail`,data,"",header,callback,err),
	//创建订单
	setOrder :(data,callback,err ) => post(`${apiServer}/order/setOrder`,data,"",header,callback,err),
	//充值  创建订单
	rechargeSetOrder :(data,callback,err ) => post(`${apiServer}/recharge/setOrder`,data,"",header,callback,err),
	//提现
	cashout :(data,callback,err ) => post(`${apiServer}/wechat/cashout`,data,"",header,callback,err),
	//获取字典 
	dict :(callback,err ) => post(`${apiServer}/zv/common/dict`,{},"",header,callback,err),
	//获取 省市区 地址 数据码
	province :(data,callback,err ) => post(`${apiServer}/zv/common/province`,data,"",header,callback,err),
	city :(data,callback,err ) => post(`${apiServer}/zv/common/city`, data,"form",header,callback,err),
	district :(data,callback,err ) => post(`${apiServer}/zv/common/district`,data,"form",header,callback,err),
	address :(data,callback,err ) => post(`${apiServer}/zv/common/address`,data,"form",header,callback,err),
	 
	// 服务商津贴 
	providerallowance :(data,callback,err ) => post(`${apiServer}/user/providerallowance`,data,"form",header,callback,err),
	
	//修改密码
	updatePassword:(data,callback,err ) => put(`${apiServer}/sys/user/updatePassword`,data,"",header,callback,err), 
	
	//员工收款码
	staffCode:(data,callback,err ) => post(`${apiServer}/zv/shop/qrcode1`,data,"form",header,callback,err), 
	//上传文件
	uploadFile:(filePath,name,fileType,formData, callback,err,onProgress)  => upload(`${apiServer}/user/uploadImg1`, filePath,name , "", header,fileType,formData, callback,err,onProgress),
	
	// 商城模块
	// 商品列表
	storeIndex:(data,callback,err ) => post(`${apiServer}/store/index`,data,"",header,callback,err),
	// 商品详情
	storeDetail:(data,callback,err ) => post(`${apiServer}/store/detail`,data,"",header,callback,err),
	// 地址列表
	storeGetAddress:(callback,err ) => post(`${apiServer}/store/getAddress`,{},"",header,callback,err),
	// 添加地址
	addAddress:(data,callback,err ) => post(`${apiServer}/store/addAddress`,data,"",header,callback,err),
	// 获取默认地址
	getDefaultAddress:(callback,err ) => post(`${apiServer}/store/getDefaultAddress`,{},"",header,callback,err),
	// 删除地址
	deleteAddress:(data,callback,err ) => post(`${apiServer}/store/deleteAddress`,data,"",header,callback,err),
	// 提交订单
	storeSetOrder:(data,callback,err ) => post(`${apiServer}/store/setOrder`,data,"",header,callback,err),
	// 余额支付
	balancepay:(data,callback,err ) => post(`${apiServer}/store/balancepay`,data,"",header,callback,err),
	// 修改地址
	saveAddress:(data,callback,err ) => post(`${apiServer}/store/saveAddress`,data,"",header,callback,err),
	//微信支付
	storePay:(data,callback,err ) => post(`${apiServer}/store/pay`,data,"",header,callback,err),
	
	// 代理分润
	rateshare:(data,callback,err ) => post(`${apiServer}/user/rateshare`,data,"",header,callback,err),
	// 商城发起app支付
	storeApppay:(data,callback,err ) => post(`${apiServer}/store/apppay`,data,"",header,callback,err),
	
	// 订单列表
	getGoodsOrderList:(data,callback,err ) => post(`${apiServer}/store/getGoodsOrderList`,data,"",header,callback,err),
	// 取消/删除订单
	deleteGoodsOrder:(data,callback,err ) => post(`${apiServer}/store/deleteGoodsOrder`,data,"",header,callback,err),
	// 确认收货
	confirmReceipt:(data,callback,err ) => post(`${apiServer}/store/confirmReceipt`,data,"",header,callback,err),
	// 订单详情
	goodsOrderDetail:(data,callback,err ) => post(`${apiServer}/store/goodsOrderDetail`,data,"",header,callback,err),
	// app注册
	appregister:(data,callback,err ) => post(`${apiServer}/wechat/appregister`,data,"",header,callback,err),
	// appdenglu
	applogin:(data,callback,err ) => post(`${apiServer}/wechat/applogin`,data,"",header,callback,err),
	
}
  



 