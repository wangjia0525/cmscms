/**
 * Created by wangjia on 2017/8/28.
 */
App.controller('homePageCtrl',function($scope,$rootScope, $http, $cookieStore, $interval,homePageFactory){
    $scope.loginName=$rootScope.$session.getItem("loginName");
    $interval(function(){
        $scope.nowTime=new Date();
    },1000);
    $scope.getIndexCallback=function(data){
        console.log(data);
        $scope.getIndex=data;
    };
    $scope.getParams=function(){
        "use strict";
        return {}
    }
    $scope.fetchData=function(){
        homePageFactory.getIndex(
            $scope.getParams(),
            $scope.getIndexCallback
        )
    }
    $scope.fetchData();
})
