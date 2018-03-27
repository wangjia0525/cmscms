App.factory('MoneyFactory', function (SessionService) {
    //cms幸运币管理列表
    var balanceHistory = function (params, callback, failCallback) {
        return SessionService.requestPost("balance/balanceHistory", params, callback, failCallback);
    };

    return {
        balanceHistory: balanceHistory
    };

});