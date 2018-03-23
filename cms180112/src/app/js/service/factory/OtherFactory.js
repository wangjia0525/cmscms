App.factory('OtherFactory',function(SessionService){
    var getIndustyList = function(params, callback, failCallback) {
        return SessionService.requestPost("getIndustyList",params, callback, failCallback);
    };

    var getJobPositionList = function(params, callback, failCallback) {
        return SessionService.requestPost("getJobPositionList",params, callback, failCallback);
    };


    return {
        getIndustyList 	     : getIndustyList,
        getJobPositionList      : getJobPositionList
    };

});