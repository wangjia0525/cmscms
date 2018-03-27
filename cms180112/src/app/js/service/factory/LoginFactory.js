




App.factory('LoginFactory',function(SessionService){
	var getLoginToken = function(datas, callback, failCallback) {
		return SessionService.requestGet("login",datas, callback, failCallback);
	};
 	return {
      	getLoginToken : getLoginToken
  	};
	
})
