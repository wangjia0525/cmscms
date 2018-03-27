//(c) Copyright 2016 Administrator. All Rights Reserved. 2016-05-27
App.factory('StatisticsFactory',function(SessionService){
	var getStatisticsInfo = function(params, callback, failCallback) {
		return SessionService.requestGet("getStatisticsByDate",params, callback, failCallback);
	};
	var getKefuStatisticsInfo = function(params, callback, failCallback) {
		return SessionService.requestGet("getKeFuList",params, callback, failCallback);
	};
 	return {
      	getStatisticsInfo 	: getStatisticsInfo,
      	getKefuStatisticsInfo:getKefuStatisticsInfo
  	};
});
