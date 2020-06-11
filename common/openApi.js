import {mLog} from '@/common/mLog.js' 

export const faceVerify = (res,rej) => {
   my.ix.faceVerify({
	     // certNo: '',
	     // certName: '',
	     // verifyType: 'idCard',
	   option: 'life', 
	   success: (r) => {
			mLog.log("success",r)
			res(r); 
	   },
	   fail: (r) => {
			mLog.log("fail",r)
			rej(r);
	   }
   });
}


//用户授权
export const getAuthCode = () => {
  return new Promise((res, rej) => {
    my.getAuthCode({
      scopes: 'auth_base',
      success: (data) => {
		mLog.log("success",data)
        res(data); 
      },
      fail: (data) => {
		mLog.log("fail",data)
        rej(data);
      },
    });
  });
}
//获取会员基础信息
export const getOpenUserInfo = (res, rej) => { 
    my.getOpenUserInfo({
      success: (data) => {
		mLog.log("success",data)
		 let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
        res(data); 
      },
      fail: (data) => {
		mLog.log("fail",data)
        rej(data);
      },
    }); 
} 
// 小程序唤起会员开卡授权页面 开卡授权的页面地址，从接口获取。
export const addCardAuth = (url,res, rej) => {
	mLog.log("addCardAuth url:",url)
  return new Promise((res, rej) => {
    my.addCardAuth({
	   url: url,
      success: (data) => {
		mLog.log("授权成功",data) 
        res(data); 
      },
      fail: (data) => {
		mLog.log("授权失败",data)
        rej(data);
      },
    });
  });
} 
// 打开当前用户的某张卡的详情页
export const openCardDetail = (passId) => {
  return new Promise((res, rej) => {
    my.openCardDetail({
	   passId: passId 
    });
  });
} 
// 打开支付宝卡列表
export const openCardList = () => {
  return new Promise((res, rej) => {
    my.openCardList();
  });
} 
// 打开支付宝卡列表
export const openMerchantCardList = (passId) => {
  return new Promise((res, rej) => {
    my.openMerchantCardList({partnerId:passId});
  });
}  

//获取会员手机号
export const getPhoneNumber = () => {
  return new Promise((res, rej) => {
    my.getPhoneNumber({
      success: (data) => {
		mLog.log("success",data)
        res(data.response);
      },
      fail: (data) => { 
		mLog.log("fail",data)
        rej(data);
      },
    });
  });
}


 var _keyEventListener=null
//键盘事件 
export const onKeyEventChange = (listener,isSys=false,fromPage) => {
	let str=fromPage  
	if(listener){ 
		str=str+" has listener--->" 
	
	   // #ifdef MP-ALIPAY
		my.ix.onKeyEventChange(_keyEventListener = (r)  => {
			console.log(fromPage+"key:",r);
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			console.log(fromPage+" pages",pages);
			console.log(fromPage+" page",page);
			let data={
				isPay:false,
				amount:0,
				code:r.keyCode
			}
			switch (r.keyCode ){
				case 131:
					//收款  
					data.amount = r.amount;
					if(Number(data.amount)>0){ 
						data.isPay=true; 
					}else{
						uni.showModal({
							content: '请输入正确的金额格式',
							showCancel: false
						});
					}
					break
				case 133:
					//取消  
				case 132:
					//刷脸 
					break;
				case 134:
					//设置
					if(isSys){
						my.ix.startApp({
						  appName: 'settings',
						})
					}else{
						uni.navigateTo({
							url: '/pages/setting/setting',
						});
					} 
					break;
				default:
					break;
			} 
			listener(data)
			console.log(fromPage+"key:",r);
		})
	   // #endif
   }else{
		str=str+" not listener--->" 
		if (_keyEventListener) {
		  my.ix.offKeyEventChange();
		  _keyEventListener = null;
		} 
   }
   console.log("onkeyListener--->"+str);
}
export const onKeyEventChange2 = (listener,isSys=false,fromPage) => {
	
	let str=fromPage  
	if(listener){ 
		str=str+" has listener--->" 
	   // #ifdef MP-ALIPAY
		my.ix.onKeyEventChange(_keyEventListener = (r)  => {
			console.log(fromPage+"key:",r);
			let data={
				isPay:false,
				amount:0,
				code:r.keyCode
			}
			switch (r.keyCode ){
				case 131:
					//收款  
					data.amount = r.amount;
					if(Number(data.amount)>0){ 
						data.isPay=true; 
					}else{
						uni.showModal({
							content: '请输入正确的金额格式',
							showCancel: false
						});
					}
					listener(data)
					break
				case 133:
					//取消  
				case 132:
					//刷脸
					listener(data) 
					break;
				case 134:
					//设置
					if(isSys){
						my.ix.startApp({
						  appName: 'settings',
						})
					}else{
						uni.navigateTo({
							url: '/pages/setting/setting',
						});
					} 
					break;
				default:
					break;
			} 
			console.log(fromPage+"key:",r);
		})
	   // #endif
   }else{
		str=str+" not listener--->" 
		if (_keyEventListener) {
		  my.ix.offKeyEventChange();
		  _keyEventListener = null;
		} 
   }
   console.log("onkeyListener--->"+str);
}
//打开收银台
export const startCashier = (bizNo,amount,listener) => {
   // #ifdef MP-ALIPAY
   	my.ix.startApp({
		  appName: 'cashier',
		  faceLoadingTimeout:"15", 
		  bizNo: bizNo,
		  totalAmount: amount,
		  showScanPayResult: false,
		  scanLoadingTimeout:'5',
		  success: (r) => {
			  //开启收银台监听
			   console.log("success",r);
			   registerCashier() 
			   listener(r)
			   
		  },
		  fail: (err) => { 
			   err.success=false
			   console.log("fail",err);
			   listener(err) 
		  } 
		}); 
   // #endif
}

/**
 * 开启收银台事件监听
 * 调用收银台api打开收银台页面后，用户扫码/刷脸后会在收银台api回调方法中返回barcode信息
 * 但是收银台页面并没有退出，会自动查询支付结果并显示支付结果页面。开发者在收银台api回调方法接收到barcode后
 * 可以监听收银台页面关闭事件，并执行后续逻辑处理,监听到收银台退出事件后一定要关闭监听
 */ 
export const registerCashier = () => {
   // #ifdef MP-ALIPAY
   	my.ix.onCashierEventReceive((r) => {
		switch (r.bizType){
			case 'RESULT_CLOSED':
				console.log("收银台关闭");
				 my.ix.offCashierEventReceive();
				break;
			case 'RESULT_BTN_FUNCTION':
				console.log("收银台自定义按钮按下"); 
				break;
			case 'RESULT_MEMBER':
				console.log("支付结果页会员开卡"); 
				break;
			default:
			   console.log("else RESULT:",r); 
				break;
		}  
   	});
   // #endif
}


 

