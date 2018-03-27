/**
 * Created by Administrator on 2017/8/7.
 */
App.factory('userMessageFactory',function(SessionService){
    //getMessageList
    var getUserMessageList = function(datas, callback, failCallback) {
        return  SessionService.requestGet("getMessageList",datas, callback, failCallback);
    };

    //getMessage
    var getUserMessage = function(datas, callback, failCallback) {
        return SessionService.requestGet("getMessage",datas, callback, failCallback);
    };

    //insertMessage
    var putInsertMessage = function(datas, callback, failCallback) {
        return SessionService.requestUpload("insertMessage",datas, callback, failCallback);
    };

    return {
        getUserMessageList : getUserMessageList,
        getUserMessage : getUserMessage,
        putInsertMessage:putInsertMessage
    };
})
