




App.factory('InterfaceFactory',function(SessionService){
	/* 获取接口列表 */
	var getInterfaceList = function(params, callback, failCallback) {
		return SessionService.requestGet("getinterfacelist",params, callback, failCallback);
	};
	/* 删除一个接口的请求 */
	var setDelInterface = function(params, callback, failCallback) {
		return SessionService.requestGet("deleteinterface",params, callback, failCallback);
	};
	/* 增加一个接口的请求 */
	var setAddInterface = function(params, callback, failCallback) {
		return SessionService.requestPost("addinterface",params, callback, failCallback);
	};
	/* 更新一个接口信息 */
	var setUpdateInterface = function(params, callback, failCallback) {
		return SessionService.requestPost("updateinterface",params, callback, failCallback);
	};
	/*checkUser*/
    var checkUser = function(params, callback, failCallback) {
        return SessionService.requestPost("checkUser",params, callback, failCallback);
    };
 	return {
      	getInterfaceList 	: getInterfaceList,
      	setDelInterface		: setDelInterface,
      	setAddInterface		: setAddInterface,
      	setUpdateInterface	: setUpdateInterface,
        checkUser:checkUser
  	};
	
})
