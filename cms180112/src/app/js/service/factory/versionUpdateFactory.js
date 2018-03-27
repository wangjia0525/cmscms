
App.factory('versionUpdateFactory',function(SessionService){
    var getUpdateList = function(params, callback, failCallback) {
        return SessionService.requestGet("getAppUpdateList",params, callback, failCallback);
    };

    var getUpdateInfo = function(params, callback, failCallback) {
        return SessionService.requestGet("getUpdateInfo",params, callback, failCallback);
    };

    var setModiUpdateInfo = function(params, callback, failCallback) {
        return SessionService.requestPost("modiUpdateInfo",params, callback, failCallback);
    };

    var setModiUpdateVersionInfo = function(params, callback, failCallback) {
        return SessionService.requestPost("modiUpdateVersionInfo",params, callback, failCallback);
    };
    var updateApp = function(params, callback, failCallback) {
        return SessionService.requestPost("updateApp",params, callback, failCallback);
    };


    return {
        getUpdateList 	           : getUpdateList,
        getUpdateInfo              : getUpdateInfo,
        setModiUpdateInfo        : setModiUpdateInfo,
        updateApp          : updateApp,
        setModiUpdateVersionInfo        : setModiUpdateVersionInfo
    };

})