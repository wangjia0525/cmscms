/**
 * Created by Administrator on 2017/7/4.
 */
App.controller('selectCtrl',function($scope, $http, $cookieStore, yxlFactory,mdFactory){

    $scope.getSearchLogCallback = function(data){
        console.log(data);
        $scope.loading = false;
        $scope.topicList=data.topicList;
        $scope.turnPage.totalItems = data.totalCount;
    };
    $scope.getParams=function(){
        return {
            //传进来的参数
            size:$scope.turnPage.itemsPerPage,
            page:$scope.turnPage.currentPage
        }
    }
    /* 获取adviceList */
    $scope.fetchData = function(){
        console.log( $scope.getParams());
        //return;
        $scope.loading = true;
        yxlFactory.getSearchLog(
            $scope.getParams(),
            $scope.getSearchLogCallback
        );
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
            $scope.turnPage.totalItems);
    };
    $scope.dataChange = function () {
        $scope.publicChange();
    };


})