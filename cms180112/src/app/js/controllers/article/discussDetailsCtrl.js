/**
 * Created by Administrator on 2017/10/31.
 */
App.controller('discussDetailsCtrl',function($scope, $http,Notify,$stateParams,$location,$timeout,ModalService, articleFactory,mdFactory){
    $scope.articleEvaluateId=$stateParams.articleEvaluateId;
    console.log($stateParams)
    $scope.getArticleEvaluateXqCallback=function(data){
        console.log(data)
        $scope.articleEvaluate = data.articleEvaluate;
    };
    $scope.getParams = function () {
        return {
            articleEvaluateId: $scope.articleEvaluateId
        };
    };
    $scope.fetchData = function () {
        console.log($scope.getParams())
        //return;
        $scope.loading = true;
        articleFactory.getArticleEvaluateXq(
            $scope.getParams(),
            $scope.getArticleEvaluateXqCallback
        );
    };
    $scope.fetchData();
    //    删除文章评论相关
    $scope.deleteArticleEvaluateCallblack=function(data){
        Notify.alert();//提示操作成功
        $timeout(function(){
            $location.replace().path('/cms/discuss');
        },1000);
    }
    $scope.removeMasterList = function (_id_) {
        $scope.alterTitle = "确认操作";
        $scope.alertInformation = "确认要删除该评论么?";
        var alertHtml = 'app/views/alert/alert.html';
        ModalService.modalSet($scope, alertHtml);
        $scope.doTrue = function () {
            ModalService.modalHide();
            articleFactory.deleteArticleEvaluate(
                {
                    articleEvaluateId: _id_
                },
                $scope.deleteArticleEvaluateCallblack
            )
        }
    };
})