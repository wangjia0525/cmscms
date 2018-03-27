




App.factory('ParamsFactory',function(SessionService){
	var getParamsList = function(params, callback, failCallback) {
		return SessionService.requestGet("paramsList",params, callback, failCallback);
	};

	var setModiParams = function(params, callback, failCallback) {
		return SessionService.requestGet("updateParaValue",params, callback, failCallback);
	};

	return {
		getParamsList 	: getParamsList,
		setModiParams   : setModiParams
	};

})
