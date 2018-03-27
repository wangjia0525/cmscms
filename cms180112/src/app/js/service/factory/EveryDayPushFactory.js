




App.factory('EveryDayPushFactory',function(SessionService){
	var getEveryDayPushList = function(params, callback, failCallback) {
		return SessionService.requestGet("selecteverydaypushlist",params, callback, failCallback);
	};
	
	var setUpdateEveryDayPush = function(params, callback, failCallback) {
		return SessionService.requestPost("updateeverydaypush",params, callback, failCallback);
	};
	
	var setUpdateEveryDayPushText = function(params, callback, failCallback) {
		return SessionService.requestPost("updateeverydaypushtext",params, callback, failCallback);
	};
	
	var setDeleteEveryDayPush = function(params, callback, failCallback) {
		return SessionService.requestGet("deleteeverydaypush",params, callback, failCallback);
	};
	
	var setDeleteEveryDayPushText = function(params, callback, failCallback) {
		return SessionService.requestGet("deleteeverydaypushtext",params, callback, failCallback);
	};
	
	var addEveryDayPush = function(params, callback, failCallback) {
		return SessionService.requestPost("addeverydaypush",params, callback, failCallback);
	};
	
	var addEveryDayPushText = function(params, callback, failCallback) {
		return SessionService.requestPost("addeverydaypushtext",params, callback, failCallback);
	};
	
	var setEveryDayPushPriority = function(params, callback, failCallback) {
		return SessionService.requestGet("moveeverydaypushpriority",params, callback, failCallback);
	};
 	return {
      	getEveryDayPushList   		: getEveryDayPushList,
      	setUpdateEveryDayPush 		: setUpdateEveryDayPush,
      	setUpdateEveryDayPushText 	: setUpdateEveryDayPushText,
      	setDeleteEveryDayPush		: setDeleteEveryDayPush,
      	setDeleteEveryDayPushText	: setDeleteEveryDayPushText,
      	addEveryDayPush		 		: addEveryDayPush,
      	addEveryDayPushText			: addEveryDayPushText,
      	setEveryDayPushPriority		: setEveryDayPushPriority
  	};
	
})
