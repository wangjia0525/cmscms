




App.factory('FieldFactory',function(SessionService){
    var getRealmList = function(params, callback, failCallback) {
        return SessionService.requestGet("getRealmList",params, callback, failCallback);
    };

    var setAddRealm = function(params, callback, failCallback) {
        return SessionService.requestPost("addRealm",params, callback, failCallback);
    };

    var setModiRealm = function(params, callback, failCallback) {
        return SessionService.requestPost("modiRealm",params, callback, failCallback);
    };

    var setTransferAndDeleteRealm = function(params, callback, failCallback) {
        return SessionService.requestGet("transferAndDeleteRealm",params, callback, failCallback);
    };


    return {
        getRealmList 	   : getRealmList,
        setAddRealm      : setAddRealm,
        setModiRealm   : setModiRealm,
        setTransferAndDeleteRealm   : setTransferAndDeleteRealm
    };

})