/**
 * Created by wangjia on 2017/9/6.
 */
App.factory('accountFactory',function(SessionService){
    //获取数据
    var getClearing   = function(datas, callback, failCallback) {
        return SessionService.requestGet("getClearing",datas, callback, failCallback);
    };
    var updateClearing   = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateClearing",datas, callback, failCallback);
    };
    var getClearingLog   = function(datas, callback, failCallback) {
        return SessionService.requestGet("getClearingLog",datas, callback, failCallback);
    };
    var getClearingLogForShare   = function(datas, callback, failCallback) {
        return SessionService.requestGet("getClearingLogForShare",datas, callback, failCallback);
    };
    var getOrderInvoiceList   = function(datas, callback, failCallback) {
        return SessionService.requestGet("getOrderInvoiceList",datas, callback, failCallback);
    };//发票管理
    var updateOrderInvoiceStatus   = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateOrderInvoiceStatus",datas, callback, failCallback);
    };//发票状态
    var getOrderInvoice   = function(datas, callback, failCallback) {
        return SessionService.requestGet("getOrderInvoice",datas, callback, failCallback);
    };//发票详情
    var updateOrderinvoiceCms   = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateOrderinvoiceCms",datas, callback, failCallback);
    };//发票详情修改
    var updateClearingIsInvoice     = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateClearingIsInvoice",datas, callback, failCallback);
    };//票收没收到
    return {
        getClearingLog:getClearingLog,
        getClearingLogForShare:getClearingLogForShare,
        updateClearing:updateClearing,
        getOrderInvoiceList:getOrderInvoiceList,//发票管理
        updateOrderInvoiceStatus:updateOrderInvoiceStatus,//发票状态
        getOrderInvoice:getOrderInvoice,//发票详情
        updateOrderinvoiceCms:updateOrderinvoiceCms,//发票详情修改
        updateClearingIsInvoice:updateClearingIsInvoice,//票收没收到
        getClearing   : getClearing
    };
})