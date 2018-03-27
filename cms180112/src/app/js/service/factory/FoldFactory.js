

App.factory('FoldFactory',function(SessionService){
    var getTopicEvaluateList = function(params, callback, failCallback) {
        return SessionService.requestGet("getTopicEvaluateList",params, callback, failCallback);
    };

    var setModiTopicEvaluateToNormal = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicEvaluateToNormal",params, callback, failCallback);
    };

    var setModiTopicEvaluateToFold = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicEvaluateToFold",params, callback, failCallback);
    };



    return {
        getTopicEvaluateList 	          : getTopicEvaluateList,
        setModiTopicEvaluateToNormal      : setModiTopicEvaluateToNormal,
        setModiTopicEvaluateToFold        : setModiTopicEvaluateToFold
    };

})