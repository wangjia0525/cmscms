App.factory('RechargeFactory', function (SessionService) {
    //充值列表查询
    var getOrderList = function (params, callback, failCallback) {
        return SessionService.requestPost("order/getOrderList", params, callback, failCallback);
    };

    return {
        getOrderList: getOrderList
    };

});