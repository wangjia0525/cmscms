/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('classTeacherCtrl',function($scope, $http, $cookieStore, classTeacherFactory,mdFactory){
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.classTeacherCallback = function(data){
        //console.log(data)
        $scope.loading = false;
        $scope.userTeacherList = data.userTeacher;
        $scope.turnPage.totalItems = data.totalCount;
        $cookieStore.put('myapp.classTeacher.searches', $scope.getParams());
    };
    $scope.searchplaceholder="姓名";
    /* 获取adviceList */
    $scope.fetchData = function(){
        $scope.loading = true;
        classTeacherFactory.getUserTeacher(
            $scope.getParams(),
            $scope.classTeacherCallback
        );
    };
    /* show search condition by cookie */
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.classTeacher.searches')) {
            $scope.searchKey = $cookieStore.get('myapp.classTeacher.searches').searchKey;
        } else{
            $scope.searchKey = "";
        }
    };
    $scope.getParams = function(){
        return {
            size: $scope.turnPage.itemsPerPage,
            page: $scope.turnPage.currentPage,
            name: $scope.searchKey
        }
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
})