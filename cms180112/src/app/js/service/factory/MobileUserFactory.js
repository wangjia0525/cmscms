


App.factory('MobileUserFactory',function(SessionService){
	/* 获取用户列表 */
	var getMobileUserList = function(params, callback, failCallback) {
		return SessionService.requestGet("getUserList",params, callback, failCallback);
	};
	var setModiUserScore = function(params, callback, failCallback) {
		return SessionService.requestGet("modiUserScore",params, callback, failCallback);
	};
	var setModiUserProperties = function(params, callback, failCallback) {
		return SessionService.requestPost("modiUserProperties",params, callback, failCallback);
	};
	var setInsertUserRealm = function(params, callback, failCallback) {
		return SessionService.requestGet("insertUserRealm",params, callback, failCallback);
	};
	var setUserBlack = function(params, callback, failCallback) {
		return SessionService.requestGet("setBlackList",params, callback, failCallback);
	};
	var setAddMarketingUser = function(params, callback, failCallback) {
		return SessionService.requestGet("addMarketingUser",params, callback, failCallback);
	};
	var setAddAppUser = function(params, callback, failCallback) {
		return SessionService.requestPost("addAppUser",params, callback, failCallback);
	};
	var setDeleteMarketingUser= function(params, callback, failCallback) {
		return SessionService.requestGet("deleteMarketingUser",params, callback, failCallback);
	};
	var getMarketingUserList= function(params, callback, failCallback) {
		return SessionService.requestGet("getMarketingUserList",params, callback, failCallback);
	};
	var setModiMarketingUserSort= function(params, callback, failCallback) {
		return SessionService.requestGet("modiMarketingUserSort",params, callback, failCallback);
	};
    var setModiMarketingUserSortforsortEvent= function(params, callback, failCallback) {
        return SessionService.requestGet("setModiMarketingUserSortforsortEvent",params, callback, failCallback);
    };
	var setModiMarketingUserToTop= function(params, callback, failCallback) {
		return SessionService.requestGet("modiMarketingUserToTop",params, callback, failCallback);
	};
	var getQiNiuUpToken= function(params, callback, failCallback) {
		return SessionService.requestGet("getQiNiuUpToken",params, callback, failCallback);
	};
	//用户详情
	var getUser= function(params, callback, failCallback) {
		return SessionService.requestGet("getUser",params, callback, failCallback);
	};
 	return {
      	getMobileUserList 	   : getMobileUserList,
		setModiUserScore	   : setModiUserScore,
		setModiUserProperties  : setModiUserProperties,
		setInsertUserRealm     : setInsertUserRealm,
		setUserBlack           : setUserBlack,
		setAddMarketingUser    : setAddMarketingUser,
		setAddAppUser          : setAddAppUser,
		setDeleteMarketingUser : setDeleteMarketingUser,
		getMarketingUserList   : getMarketingUserList,
		setModiMarketingUserSort  : setModiMarketingUserSort,
        setModiMarketingUserSortforsortEvent  : setModiMarketingUserSortforsortEvent,
		setModiMarketingUserToTop : setModiMarketingUserToTop,
		getQiNiuUpToken : getQiNiuUpToken,
		getUser : getUser
  	};
});
