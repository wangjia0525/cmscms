/**
 * Created by Administrator on 2017/7/4.
 */


App.factory('articleFactory',function(SessionService){
    var getArticleList = function(datas, callback, failCallback) {  //获取文章列表数据
        return SessionService.requestGet("article/getArticleList",datas, callback, failCallback);
    };
    var updateArticleStatus = function(datas, callback, failCallback) {//删除文章
        return SessionService.requestGet("article/updateArticleStatus",datas, callback, failCallback);
    };
    var getArticleListForDel = function(datas, callback, failCallback) {//删除文章列表
        return SessionService.requestGet("article/getArticleListForDel",datas, callback, failCallback);
    };
    var insertArticle = function(datas, callback, failCallback) {//保存文章
        return SessionService.requestUpload("article/insertArticle",datas, callback, failCallback);
    };
    var getArticle = function(datas, callback, failCallback) {//文章编辑
        return SessionService.requestGet("article/getArticle",datas, callback, failCallback);
    };
    var updateArticle = function(datas, callback, failCallback) {//更新文章
        return SessionService.requestUpload("article/updateArticle",datas, callback, failCallback);
    };
    var getArticleEvaluate = function(datas, callback, failCallback) {//评论管理
        return SessionService.requestGet("article/getArticleEvaluate",datas, callback, failCallback);
    };
    var getArticleEvaluateXq    = function(datas, callback, failCallback) {//评论详情
        return SessionService.requestGet("article/getArticleEvaluateXq   ",datas, callback, failCallback);
    };
    var deleteArticleEvaluate    = function(datas, callback, failCallback) {//删除评论
        return SessionService.requestGet("article/deleteArticleEvaluate   ",datas, callback, failCallback);
    };
    var auditArticle    = function(datas, callback, failCallback) {//审核文章
        return SessionService.requestGet("article/auditArticle   ",datas, callback, failCallback);
    };
    return {
        insertArticle : insertArticle,//保存文章
        getArticle : getArticle,//文章编辑
        updateArticleStatus : updateArticleStatus,//删除文章
        getArticleListForDel : getArticleListForDel,//删除文章列表
        getArticleList : getArticleList,  //获取文章列表数据
        getArticleEvaluateXq : getArticleEvaluateXq,//评论详情
        getArticleEvaluate : getArticleEvaluate,//评论管理
        deleteArticleEvaluate   : deleteArticleEvaluate  ,//删除评论
        updateArticle:updateArticle,//更新文章,
        auditArticle:auditArticle //审核文章
    };
})


