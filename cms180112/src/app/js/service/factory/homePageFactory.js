/**
 * Created by wangjia on 2017/8/28.
 */

App.factory('homePageFactory',function(SessionService){
    //获取数据
    var getIndex = function(datas, callback, failCallback) {
        return SessionService.requestGet("getIndex",datas, callback, failCallback);
    };
    //获取邮件数据
    var getEmailList = function(datas, callback, failCallback) {
        return SessionService.requestGet("getEmailList",datas, callback, failCallback);
    };
    //发送邮件数据
    var updateEmail = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateEmail",datas, callback, failCallback);
    };
    return {
        getIndex : getIndex,
        getEmailList : getEmailList,
        updateEmail : updateEmail
    };
})