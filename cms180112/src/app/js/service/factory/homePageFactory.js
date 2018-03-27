/**
 * Created by wangjia on 2017/8/28.
 */

App.factory('homePageFactory',function(SessionService){
    //��ȡ����
    var getIndex = function(datas, callback, failCallback) {
        return SessionService.requestGet("getIndex",datas, callback, failCallback);
    };
    //��ȡ�ʼ�����
    var getEmailList = function(datas, callback, failCallback) {
        return SessionService.requestGet("getEmailList",datas, callback, failCallback);
    };
    //�����ʼ�����
    var updateEmail = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateEmail",datas, callback, failCallback);
    };
    return {
        getIndex : getIndex,
        getEmailList : getEmailList,
        updateEmail : updateEmail
    };
})