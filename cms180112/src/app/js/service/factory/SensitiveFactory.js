App.factory('SensitiveFactory',function(SessionService){
    var getModiAllDirtywords = function(params, callback, failCallback) {
        return SessionService.requestGet("dirtywordsList",params, callback, failCallback);
    };

    var getDirtywordsList = function(params, callback, failCallback) {
        return SessionService.requestGet("modiAllDirtywords",params, callback, failCallback);
    };



    return {
        getModiAllDirtywords 	     : getModiAllDirtywords,
        getDirtywordsList             : getDirtywordsList
    };

});