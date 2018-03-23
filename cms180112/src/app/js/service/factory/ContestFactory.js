




App.factory('ContestFactory',function(SessionService){
    var getContestList = function(params, callback, failCallback) {
        return SessionService.requestGet("getArenaList",params, callback, failCallback);
    };

    var setAddContest = function(params, callback, failCallback) {
        return SessionService.requestPost("addArena",params, callback, failCallback);
    };

    var setChangeContest = function(params, callback, failCallback) {
        return SessionService.requestPost("modiArena",params, callback, failCallback);
    };

    var setRemoveContest = function(params, callback, failCallback) {
        return SessionService.requestGet("deleteTopic",params, callback, failCallback);
    };

    var setContestTop = function(params, callback, failCallback) {
        return SessionService.requestGet("modiTopicTop",params, callback, failCallback);
    };

    var setContestSort = function(params, callback, failCallback) {
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

    return {
        getContestList 	   : getContestList,
        setAddContest      : setAddContest,
        setChangeContest   : setChangeContest,
        setRemoveContest   : setRemoveContest,
        setContestTop      : setContestTop,
        setContestSort     : setContestSort,
        setModiTopicToHot     : setModiTopicToHot,
        setModiTopicToNormal     : setModiTopicToNormal,
        getTopicInfo     : getTopicInfo
    };

});