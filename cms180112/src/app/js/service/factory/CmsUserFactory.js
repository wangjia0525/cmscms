


App.factory('CmsUserFactory',function(SessionService){
	/* 获取用户列表 */
	var getCmsUserList = function(params, callback, failCallback) {
		return SessionService.requestGet("getcmsuserlist",params, callback, failCallback);
	};
	/* 删除一个用户的请求 */
	var setDelCmsUser = function(params, callback, failCallback) {
		return SessionService.requestGet("deletecmsuser",params, callback, failCallback);
	};
	/* 增加一个用户的请求 */
	var setAddCmsUser = function(params, callback, failCallback) {
		return SessionService.requestGet("addcmsuser",params, callback, failCallback);
	};
	/* 更新一个用户信息 */
	var setUpdateCmsUser = function(params, callback, failCallback) {
		return SessionService.requestGet("modicmsuser",params, callback, failCallback);
	};
	/* 给一个用户增加一个角色 */
	var setAddCmsUserRole = function(params, callback, failCallback) {
		return SessionService.requestGet("addcmsuserrole",params, callback, failCallback);
	};
	/* 给一个用户删除一个角色 */
	var setDelCmsUserRole = function(params, callback, failCallback) {
		return SessionService.requestGet("deletecmsuserrole",params, callback, failCallback);
	};
	/* 更新密码*/
	var setUpdateCmsUserPassWord = function(params, callback, failCallback) {
		return SessionService.requestGet("modiCmsUserPwd",params, callback, failCallback);
	};
 	return {
      	getCmsUserList 		: getCmsUserList,
      	setDelCmsUser		: setDelCmsUser,
      	setAddCmsUser		: setAddCmsUser,
      	setUpdateCmsUser	: setUpdateCmsUser,
      	setAddCmsUserRole	: setAddCmsUserRole,
      	setDelCmsUserRole	: setDelCmsUserRole,
      	setUpdateCmsUserPassWord:setUpdateCmsUserPassWord
  	};
	
})
