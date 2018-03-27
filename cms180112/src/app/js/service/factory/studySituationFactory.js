/**
 * Created by wangjia on 2017/9/6.
 */
App.factory('studySituationFactory',function(SessionService){
    //获取数据
    var getProduct = function(datas, callback, failCallback) {
        return SessionService.requestGet("getProduct",datas, callback, failCallback);
    };
    return {
        getProduct : getProduct
    };
})