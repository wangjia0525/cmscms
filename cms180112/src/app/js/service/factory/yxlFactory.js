/**
 * Created by Administrator on 2017/7/4.
 */


App.factory('yxlFactory',function(SessionService){
    //��ȡ����
    var getYxl = function(datas, callback, failCallback) {
        return SessionService.requestGet("getUserScore",datas, callback, failCallback);
    };
    //Ӱ�����½�
    var addYxl = function(datas, callback, failCallback) {
        return SessionService.requestGet("insertScore",datas, callback, failCallback);
    };
    //��������
    var getSearchLog = function(datas, callback, failCallback) {
        return SessionService.requestGet("getSearchLog",datas, callback, failCallback);
    };
    return {
        getYxl : getYxl,
        getSearchLog : getSearchLog,//��������
        addYxl : addYxl
    };
})


