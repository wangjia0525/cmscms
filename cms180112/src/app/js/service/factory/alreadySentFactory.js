/**
 * Created by Administrator on 2017/8/7.
 */
App.factory('alreadySentFactory',function(SessionService){
    //获取数据
    var getOldMessageList = function(datas, callback, failCallback) {
        return SessionService.requestGet("getOldMessageList",datas, callback, failCallback);
    };
    //删除
    var setDeleteOldMessage = function(datas, callback, failCallback) {
        return SessionService.requestGet("deleteOldMessage",datas, callback, failCallback);
    };
    return {
        getOldMessageList : getOldMessageList,
        setDeleteOldMessage : setDeleteOldMessage
    };
})
