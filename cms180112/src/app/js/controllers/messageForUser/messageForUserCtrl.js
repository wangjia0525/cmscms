/**
 * Created by Administrator on 2017/9/6.
 */
/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('messageForUserCtrl',function($scope, $http, $cookieStore,Notify, ModalService,homePageFactory){
    "use strict";
    //获取列表数据
    $scope.getEmailListCallback=function(data){
        console.log(data);
        $scope.sendEmails=data.sendEmails;
        $scope.copyForAssistant=$scope.sendEmails[0].text;//成长小助手
        $scope.copyForComplaints=$scope.sendEmails[1].text;//举报投诉管理
        $scope.copyForAccount=$scope.sendEmails[2].text;//结算管理
        $scope.copyForInvoice=$scope.sendEmails[3].text;//发票管理
        $scope.copyForNot=$scope.sendEmails[4].text;//未审核文章
        $scope.emailForAssistant=$scope.sendEmails[0].email;//成长小助手
        $scope.emailForComplaints=$scope.sendEmails[1].email;//举报投诉管理
        $scope.emailForAccount=$scope.sendEmails[2].email;//结算管理
        $scope.emailForInvoice=$scope.sendEmails[3].email;//发票管理
        $scope.emailForNot=$scope.sendEmails[4].email;//未审核文章
    }
    $scope.fetchData=function(){
        homePageFactory.getEmailList(
            {},
            $scope.getEmailListCallback
        )
    }
    $scope.fetchData();
    //成长助手
    $scope.getParams1=function(){
        return {
            sendEmailId:1,
            text:$scope.copyForAssistant,
            email:$scope.emailForAssistant
        }
    }
    $scope.submitForm1=function(isValid){
        if (!isValid) {
            $scope.onOff1=true;
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';
            ModalService.modalSet($scope, templateUrl_1);
        } else {
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                ModalService.modalHide();
                console.log(  $scope.getParams1());
                homePageFactory.updateEmail(
                    $scope.getParams1(),
                   function(data){
                       console.log(data)
                   }
                )
            };
        }
    }
    //举报投诉
    $scope.getParams2=function(){
        return {
            sendEmailId:2,
            text:$scope.copyForComplaints,
            email:$scope.emailForComplaints
        }
    }
    $scope.submitForm2=function(isValid){
        if (!isValid) {
            $scope.onOff2=true;
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';

            ModalService.modalSet($scope, templateUrl_1);
        } else {
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                ModalService.modalHide();
                console.log(  $scope.getParams2());
                homePageFactory.updateEmail(
                    $scope.getParams2(),
                    function(data){
                        console.log(data)
                    }
                )
            };
        }
    }
    //结算管理
    $scope.getParams3=function(){
        return {
            sendEmailId:3,
            text:$scope.copyForAccount,
            email:$scope.emailForAccount
        }
    }
    $scope.submitForm3=function(isValid){
        if (!isValid) {
            $scope.onOff3=true;
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';

            ModalService.modalSet($scope, templateUrl_1);
        } else {
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                ModalService.modalHide();
                console.log(  $scope.getParams3());
                homePageFactory.updateEmail(
                    $scope.getParams3(),
                    function(data){
                        console.log(data)
                    }
                )
            };
        }
    }
    //发票管理
    $scope.getParams4=function(){
        return {
            sendEmailId:4,
            text:$scope.copyForInvoice,
            email:$scope.emailForInvoice
        }
    }
    $scope.submitForm4=function(isValid){
        if (!isValid) {
            $scope.onOff4=true;
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';

            ModalService.modalSet($scope, templateUrl_1);
        } else {
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                ModalService.modalHide();
                console.log(  $scope.getParams4());
                homePageFactory.updateEmail(
                    $scope.getParams4(),
                    function(data){
                        console.log(data)
                    }
                )
            };
        }
    }
    //未审核文章
    $scope.getParams5=function(){
        return {
            sendEmailId:5,
            text:$scope.copyForNot,
            email:$scope.emailForNot
        }
    }
    $scope.submitForm5=function(isValid){
        if (!isValid) {
            $scope.onOff5=true;
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';

            ModalService.modalSet($scope, templateUrl_1);
        } else {
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                ModalService.modalHide();
                console.log(  $scope.getParams5());
                homePageFactory.updateEmail(
                    $scope.getParams5(),
                    function(data){
                        console.log(data)
                    }
                )
            };
        }
    }
})
