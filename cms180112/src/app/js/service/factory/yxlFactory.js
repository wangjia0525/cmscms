/**
 * Created by Administrator on 2017/7/4.
 */


App.factory('yxlFactory',function(SessionService){
    //获取数据
    var getYxl = function(datas, callback, failCallback) {
        return SessionService.requestGet("getUserScore",datas, callback, failCallback);
    };
    //影响力新建
    var addYxl = function(datas, callback, failCallback) {
        return SessionService.requestGet("insertScore",datas, callback, failCallback);
    };
    //搜索管理
    var getSearchLog = function(datas, callback, failCallback) {
        return SessionService.requestGet("getSearchLog",datas, callback, failCallback);
    };
    return {
        getYxl : getYxl,
        getSearchLog : getSearchLog,//搜索管理
        addYxl : addYxl
    };
})


