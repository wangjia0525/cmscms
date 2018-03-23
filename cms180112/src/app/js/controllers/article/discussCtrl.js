/**
 * Created by Administrator on 2017/10/31.
 */
App.controller('discussCtrl',function($scope, $http,Notify,$stateParams,ModalService, $cookieStore, articleFactory,mdFactory){
    $scope.getArticleEvaluateCallback=function(data){
        console.log(data);
        $scope.loading = false;
        $scope.articleList = data.articleList;
        $scope.turnPage.totalItems = data.totalCount;
        $cookieStore.put('myapp.getArticleEvaluate.searches', $scope.getParams());
    }
    $scope.fetchData = function () {
        console.log($scope.getParams())
        //return;
        $scope.loading = true;
        articleFactory.getArticleEvaluate(
            $scope.getParams(),
            $scope.getArticleEvaluateCallback
        );
    };
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.getArticleEvaluate.searches')) {
            $scope.searchKey = $cookieStore.get('myapp.getArticleEvaluate.searches').searchKey;
        } else{
            $scope.searchKey = "";
        }
    };
    $scope.articleId=$stateParams.articleId;
    console.log($stateParams);
    $scope.getParams = function () {
        return {
            size: $scope.turnPage.itemsPerPage,
            page: $scope.turnPage.currentPage,
            articleId: $scope.articleId,
            name: $scope.searchKey||''
        };
    };

    /* 配置分页参数  */
    $scope.turnPage = mdFactory.getTurnPage();
    //console.log(mdFactory.getTurnPage())
    $scope.ToNum = mdFactory.getPageNum(
        $scope.turnPage.currentPage,
        $scope.numPages,
        $scope.turnPage.itemsPerPage,
        $scope.turnPage.totalItems
    );
    $scope.fetchData();
    /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
    $scope.publicChange = function () {
        $scope.fetchData();
        $scope.ToNum = mdFactory.getPageNum(
            $scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems
        );
    };
    $scope.dataEvent = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.publicChange();
        }
    };
    $scope.dataChange = function(e){
        $scope.publicChange();
    };
//    删除文章评论相关
    $scope.deleteArticleEvaluateCallblack=function(data){
        Notify.alert();//提示操作成功
        $scope.fetchData();

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