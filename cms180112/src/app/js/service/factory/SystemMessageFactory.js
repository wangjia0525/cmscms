
App.factory('SystemMessageFactory',function(SessionService){
    var setAddpushjob = function(params, callback, failCallback) {
        return SessionService.requestUpload("addpushjob",params, callback, failCallback);
    };
    return {
        setAddpushjob 	   : setAddpushjob
    };

});