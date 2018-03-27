/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('accountDetailCtrl',function($scope, $http, $cookieStore,$stateParams, accountFactory,mdFactory){
    $scope.message=$stateParams;//结算信息
    $scope.getClearingLogCallback=function(data){
        $scope.data=data;
        $scope.lists=data.clearingList;
    }
    $scope.getClearingLogForShareCallback=function(data){
        $scope.clearingLogForShareCms=data.clearingLogForShareCms;
        //$scope.lists=data.clearingList;
    }
     $scope.getParams1 = function () {
         return {
             clearingId:$scope.message.clearingId
         };
     };
    $scope.getParams2 = function () {
        return {
            clearingId:$scope.message.clearingId
        };
    };
     /* 获取courses List */
    $scope.fetchData1 = function () {
        //console.log($scope.getParams1())
        //return;
        accountFactory.getClearingLog(
            $scope.getParams1(),
            $scope.getClearingLogCallback
        );
    };
    $scope.fetchData2 = function () {
        //console.log($scope.getParams2())
        //return;
        accountFactory.getClearingLogForShare(
            $scope.getParams2(),
            $scope.getClearingLogForShareCallback
        );
    };
    if($scope.message.clearingType==1){
        $scope.isShow2=true;
        $scope.isShow1=false;
        $scope.fetchData1();
    }
    if($scope.message.clearingType==2||$scope.message.clearingType==3){
        $scope.isShow1=true;
        $scope.isShow2=false;
        $scope.fetchData2();
    }
})