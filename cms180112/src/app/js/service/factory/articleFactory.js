/**
 * Created by Administrator on 2017/7/4.
 */


App.factory('articleFactory',function(SessionService){
    var getArticleList = function(datas, callback, failCallback) {  //��ȡ�����б�����
        return SessionService.requestGet("article/getArticleList",datas, callback, failCallback);
    };
    var updateArticleStatus = function(datas, callback, failCallback) {//ɾ������
        return SessionService.requestGet("article/updateArticleStatus",datas, callback, failCallback);
    };
    var getArticleListForDel = function(datas, callback, failCallback) {//ɾ�������б�
        return SessionService.requestGet("article/getArticleListForDel",datas, callback, failCallback);
    };
    var insertArticle = function(datas, callback, failCallback) {//��������
        return SessionService.requestUpload("article/insertArticle",datas, callback, failCallback);
    };
    var getArticle = function(datas, callback, failCallback) {//���±༭
        return SessionService.requestGet("article/getArticle",datas, callback, failCallback);
    };
    var updateArticle = function(datas, callback, failCallback) {//��������
        return SessionService.requestUpload("article/updateArticle",datas, callback, failCallback);
    };
    var getArticleEvaluate = function(datas, callback, failCallback) {//���۹���
        return SessionService.requestGet("article/getArticleEvaluate",datas, callback, failCallback);
    };
    var getArticleEvaluateXq    = function(datas, callback, failCallback) {//��������
        return SessionService.requestGet("article/getArticleEvaluateXq   ",datas, callback, failCallback);
    };
    var deleteArticleEvaluate    = function(datas, callback, failCallback) {//ɾ������
        return SessionService.requestGet("article/deleteArticleEvaluate   ",datas, callback, failCallback);
    };
    var auditArticle    = function(datas, callback, failCallback) {//�������
        return SessionService.requestGet("article/auditArticle   ",datas, callback, failCallback);
    };
    return {
        insertArticle : insertArticle,//��������
        getArticle : getArticle,//���±༭
        updateArticleStatus : updateArticleStatus,//ɾ������
        getArticleListForDel : getArticleListForDel,//ɾ�������б�
        getArticleList : getArticleList,  //��ȡ�����б�����
        getArticleEvaluateXq : getArticleEvaluateXq,//��������
        getArticleEvaluate : getArticleEvaluate,//���۹���
        deleteArticleEvaluate   : deleteArticleEvaluate  ,//ɾ������
        updateArticle:updateArticle,//��������,
        auditArticle:auditArticle //�������
    };
})


