




App.factory('CmsSectionFactory',function(SessionService){
	var getCmsSectionList = function(params, callback, failCallback) {
		return SessionService.requestGet("getsectionlist",params, callback, failCallback);
	};
	var setAddCmsSection = function(params, callback, failCallback) {
		return SessionService.requestGet("addsection",params, callback, failCallback);
	};
	var setUpdateCmsSection = function(params, callback, failCallback) {
		return SessionService.requestGet("modisection",params, callback, failCallback);
	};
 	return {
      	getCmsSectionList 	: getCmsSectionList,
      	setAddCmsSection	: setAddCmsSection,
      	setUpdateCmsSection	: setUpdateCmsSection
  	};
});
