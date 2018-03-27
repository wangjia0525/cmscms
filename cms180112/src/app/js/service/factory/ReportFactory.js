App.factory('ReportFactory',function(SessionService){
    var getUserReportList = function(params, callback, failCallback) {
        return SessionService.requestGet("getUserReportList",params, callback, failCallback);
    };

    var setUserReportStatus = function(params, callback, failCallback) {
        return SessionService.requestGet("modiUserReportStatus",params, callback, failCallback);
    };

    var getUserReportDetail = function(params, callback, failCallback) {
        return SessionService.requestGet("getUserReportDetail",params, callback, failCallback);
    };



    return {
        getUserReportList 	     : getUserReportList,
        setUserReportStatus      : setUserReportStatus,
        getUserReportDetail      : getUserReportDetail
    };

});