App.factory('BannerFactory',function(SessionService){
    //增加一个banner
    var setAddBanner = function(params, callback, failCallback) {
        return SessionService.requestUpload("addBanner",params, callback, failCallback);
    };
    //删除一个banner
    var setDeleteBanner = function(params, callback, failCallback) {
        return SessionService.requestPost("deleteBanner",params, callback, failCallback);
    };
    //查(列表)banner列表
    var getSearchBanner = function(params, callback, failCallback) {
        return SessionService.requestPost("searchBanner",params, callback, failCallback);
    };
    //banner排序
    var getSort = function(params, callback, failCallback) {
        return SessionService.requestPost("sortBanner",params, callback, failCallback);
    };
    //增加活动方案名称
    var insertHomePageIcon = function(params, callback, failCallback) {
        return SessionService.requestPost("HomePageIcon/insertHomePageIcon",params, callback, failCallback);
    };
    //上传图片
    var updateHomePageIconImage = function(params, callback, failCallback) {
        return SessionService.requestUpload("HomePageIcon/updateHomePageIconImage",params, callback, failCallback);
    };
    //获取icon方案列表
    var getHomePageIcon = function(params, callback, failCallback) {
        return SessionService.requestGet("HomePageIcon/getHomePageIcon",params, callback, failCallback);
    };
    //更新状态
    var  updateHomePageIconState = function(params, callback, failCallback) {
        return SessionService.requestPost("HomePageIcon/updateHomePageIconState",params, callback, failCallback);
    };
    //删除
    var deleteHomePageIcon = function(params, callback, failCallback) {
        return SessionService.requestPost("HomePageIcon/deleteHomePageIcon",params, callback, failCallback);
    };
    //详情
    var getHomePageIconDetail = function(params, callback, failCallback) {
        return SessionService.requestPost("HomePageIcon/getHomePageIconDetail",params, callback, failCallback);
    };
    return {
        setAddBanner 	   : setAddBanner,
        insertHomePageIcon 	   : insertHomePageIcon,//增加活动方案名称
        updateHomePageIconImage 	   : updateHomePageIconImage,//上传图片
        getHomePageIcon 	   : getHomePageIcon,//获取icon方案列表
        updateHomePageIconState 	   :  updateHomePageIconState,//更新状态
        deleteHomePageIcon 	   : deleteHomePageIcon,//删除
        getHomePageIconDetail 	   : getHomePageIconDetail,//详情
        setDeleteBanner	   : setDeleteBanner,
        getSearchBanner  : getSearchBanner,
        getSort  : getSort
    };

});