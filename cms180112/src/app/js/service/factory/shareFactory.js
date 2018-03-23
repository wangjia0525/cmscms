/**
 * Created by wangjia on 2017/9/6.
 */
App.factory('shareFactory',function(SessionService){
    var getSharerewards = function(datas, callback, failCallback) {
        return SessionService.requestGet("getSharerewards",datas, callback, failCallback);
    }; //分享赚币
    return {
        getSharerewards : getSharerewards //分享赚币
    };
})