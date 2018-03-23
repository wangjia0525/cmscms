/**
 * Created by Administrator on 2017/9/6.
 */
/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('memberManageCtrl',function($scope, $http, $cookieStore,Notify, ModalService,memberManageFactory,mdFactory){
    "use strict";
    $scope.onOff=false;
    $scope.isEdit=function(){
        if($scope.onOff==true){
            $scope.onOff=false;
        }else{
            $scope.onOff=true;
        }
    }
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.getMembersInstructionCallback = function(data){
        $scope.loading = false;
        $scope.member = data.members;
        $scope.memberId=data.members.memberId;
        //console.log($scope.memberId)
    };
    //获取数据
    $scope.getParams1 = function(){
        return {

        }
    };
    $scope.fetchData1 = function(){
        $scope.loading = true;
        //return;
        memberManageFactory.getMembersInstruction(
            $scope.getParams1(),
            $scope.getMembersInstructionCallback
        );
    };
    $scope.fetchData1();
    //更新数据
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.updateMembersInstructionCallback = function(data){
        //console.log(data)
        Notify.alert();
    };
    $scope.getParams = function(){
        return {
            memberId:$scope.memberId,
            instruction:$scope.member.instruction,
            givingNumAfter:$scope.member.givingNumAfter,
            givingNumFront:$scope.member.givingNumFront,
            originalPrices:$scope.member.originalPrices,
            presentPrice:$scope.member.presentPrice
        }
    };
    $scope.fetchData = function(){
        $scope.loading = true;
        //return;
        memberManageFactory.updateMembersInstruction(
            $scope.getParams(),
            $scope.updateMembersInstructionCallback
        );
    };
/* 返回数据入口/表单验证 */
$scope.submitForm = function (isValid) {
    if (!isValid) {
        $scope.errorAlert = "错误信息";
        var templateUrl_1 = 'app/views/alert/error.html';
        ModalService.modalSet($scope, templateUrl_1);
    } else {
        $scope.successAlert = "提交信息";
        var templateUrl_2 = 'app/views/alert/success.html';
        ModalService.modalSet($scope, templateUrl_2);
        $scope.updateTrue = function () {
            $scope.onOff=false;
            ModalService.modalHide();
            $scope.fetchData();
        };
    }
};
})
