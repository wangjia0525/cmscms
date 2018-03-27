App.factory('CodeFactory', function (SessionService) {
    //使用记录列表
    var getcdkey = function (params, callback, failCallback) {
        return SessionService.requestPost("cdkey/getcdkey", params, callback, failCallback);
    };
    //兑换码冻结/解冻
    var updatecdkeyInfo = function (params, callback, failCallback) {
        return SessionService.requestPost("cdkey/updatecdkeyInfo", params, callback, failCallback);
    };
    //兑换码记录列表导出（Excel）
    var getExcel = function (params, callback, failCallback) {
        return SessionService.requestPost("cdkey/getExcel", params, callback, failCallback);
    };
    //兑换码详情列表
    var getcdkeyListByinfoNO = function (params, callback, failCallback) {
        return SessionService.requestPost("cdkey/getcdkeyListByinfoNO", params, callback, failCallback);
    };
    //生成兑换码接口
    var creatcdkey = function (params, callback, failCallback) {
        return SessionService.requestPostQ("cdkey/creatcdkey", params, callback, failCallback);
    };
    //生成记录列表
    var cdkeyInfo = function (params, callback, failCallback) {
        return SessionService.requestPost("cdkey/cdkeyInfo", params, callback, failCallback);
    };

    return {
        getcdkey: getcdkey,
        updatecdkeyInfo: updatecdkeyInfo,
        getExcel: getExcel,
        getcdkeyListByinfoNO: getcdkeyListByinfoNO,
        creatcdkey: creatcdkey,
        cdkeyInfo: cdkeyInfo
    };

});