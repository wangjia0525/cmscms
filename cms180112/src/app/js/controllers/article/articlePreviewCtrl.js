/**
 * Created by Administrator on 2017/10/31.
 */
App.controller('articlePreviewCtrl',function($scope, $http,Notify,$timeout,$location,$stateParams, $cookieStore, ModalService,articleFactory,mdFactory){
    $scope.articleId=$stateParams.articleId;
//    预览文章
    $scope.getArticleCallback=function(data){
        console.log(data);
        $scope.articlePreview=data.article;

    }
    $scope.getParams1=function(){
        return {
            articleId:$scope.articleId
        }
    }
    $scope.fetchdata1=function(articleId){
        articleFactory.getArticle(
            $scope.getParams1(),
            $scope.getArticleCallback
        )
    }
    $scope.fetchdata1();
    $scope.close=function(){
        $scope.preshow='';
    }
})