




App.factory('AdviceFactory',function(SessionService){
	var getAdviceList = function(params, callback, failCallback) {
		return SessionService.requestGet("adviceList",params, callback, failCallback);
	};
	
	var setDoAdvice = function(params, callback, failCallback) {
		return SessionService.requestGet("doAdvice",params, callback, failCallback);
	};
 	return {
      	getAdviceList : getAdviceList,
      	setDoAdvice	  : setDoAdvice
  	};
});
