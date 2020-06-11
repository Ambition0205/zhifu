
var graceRequest = require("@/common/service.js");
let wxAuth={
	/**
	 * @param {Object} code 微信的code
	 * @param {Object} fun 函数返回用户信息
	 */
	getToken:function(code,callback){
		let param={
			code
		}
		graceRequest.getToken(param,function(res){
			 console.log("--wx--",res); 
			if(res.code==0 && res.data!=null){
				let obj=res.data; 
				let userInfo=obj.memberList;
				console.log("user:",userInfo);
				callback(userInfo); 
				console.log("callback:",callback);
				
			}else{ 
				//登录失败
				uni.showToast({
					title:'登录失败',
					icon:'none'
				})
				callback(null);
			} 
		});
	}
};

module.exports = {
	wxAuth:wxAuth
}

 