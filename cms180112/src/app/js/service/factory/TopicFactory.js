
App.factory('TopicFactory',function(SessionService){
    var getTopicList = function(params, callback, failCallback) {
        return SessionService.requestGet("getTopicList",params, callback, failCallback);
    };

    var setAddTopic = function(params, callback, failCallback) {
        return SessionService.requestPostD("addTopic",params, callback, failCallback);
    };

    var setChangeTopic = function(params, callback, failCallback) {
        return SessionService.requestPostD("modiTopic",params, callback, failCallback);
    };
    var insertReply = function(params, callback, failCallback) {
        return SessionService.requestPostD("insertReply",params, callback, failCallback);
    };

    var setRemoveTopic = function(params, callback, failCallback) {
        return SessionService.requestGet("deleteTopic",params, callback, failCallback);
    };

    var setTopicTop = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicTop",params, callback, failCallback);
    };

    var setTopicSort = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicSort",params, callback, failCallback);
    };

    var setModiTopicToHot = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicToHot",params, callback, failCallback);
    };

    var setModiTopicToNormal = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicToNormal",params, callback, failCallback);
    };
    //擂台/话题详情
    var getTopicInfo = function(params, callback, failCallback) {
        return SessionService.requestGet("getTopicInfo",params, callback, failCallback);
    };
    //精选问答
    var setIntervalUpdate = function(params, callback, failCallback) {
        return SessionService.requestGet("setIntervalUpdate",params, callback, failCallback);
    };
    return {
        getTopicList 	 : getTopicList,
        setAddTopic      : setAddTopic,
        setChangeTopic   : setChangeTopic,
        insertReply   : insertReply,
        setRemoveTopic   : setRemoveTopic,
        setTopicTop      : setTopicTop,
        setTopicSort     : setTopicSort,
        setModiTopicToHot     : setModiTopicToHot,
        setModiTopicToNormal     : setModiTopicToNormal,
        getTopicInfo     : getTopicInfo,
        setIntervalUpdate:setIntervalUpdate
    };

})