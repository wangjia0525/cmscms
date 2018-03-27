//(c) Copyright 2016 Administrator. All Rights Reserved. 2016-05-27
App.factory('productBuyFactory',function(SessionService){
    var getProductBuy = function(params, callback, failCallback) {
        return SessionService.requestGet("getProductByDate",params, callback, failCallback);
    };
    return {
        getProductBuy 	: getProductBuy
    };
});
