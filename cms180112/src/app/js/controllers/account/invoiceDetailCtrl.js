/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('invoiceDetailCtrl',function($scope, $http,Notify,$stateParams,$cookieStore,$timeout,$location,ModalService,accountFactory,mdFactory){
    $scope.orderInvoiceId=$stateParams.orderInvoiceId;
    /* 获取topicList */
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    //发票类别invoiceType
    $scope.invoiceType= [
        {_index_: 1, _value_: "咨询费"}
    ];
    //发票类型invoiceType
    $scope.invoiceCategory= [
        {_index_: 1, _value_: "增值税普通发票"},
        {_index_: 2, _value_: "增值税专用发票"}
    ];
    //发票类型invoiceType
    $scope.status= [
        {_index_: 0, _value_: "待处理"},
        {_index_: 1, _value_: "处理中"},
        {_index_: 2, _value_: "已寄出"}
    ];
    $scope.getOrderInvoiceCallback = function(data){
        console.log(data);
        $scope.orderInvoices=data.orderInvoices;
        $scope.orderInvoiceDetails=data.orderInvoiceDetails;
        $scope.invoiceSelectValue=$scope.orderInvoices.invoiceType;
        $scope.invoiceCategorySelectValue=$scope.orderInvoices.invoiceCategory;
        $scope.statusSelectValue=$scope.orderInvoices.status;
        $scope.orderInvoiceDetailsCount=data.orderInvoiceDetails.length;
    };
    $scope.getParams = function(){
        return {
            orderInvoiceId	: $scope.orderInvoiceId
        }
    };
    $scope.fetchData = function(){
        //return;
        accountFactory.getOrderInvoice(
            $scope.getParams(),
            $scope.getOrderInvoiceCallback
        );
    };
    $scope.fetchData();

    $scope.getParams1=function(){
        return {
            invoiceTitle:$scope.orderInvoices.invoiceTitle,
            orderInvoiceId:$scope.orderInvoices.orderInvoiceId,
            invoiceType:$scope.invoiceSelectValue,
            invoiceCategory:$scope.invoiceCategorySelectValue,
            status:$scope.statusSelectValue,
            taxpayerNumber:$scope.orderInvoices.taxpayerNumber,
            registrationArea:$scope.orderInvoices.registrationArea,
            registrationPhoneNo:$scope.orderInvoices.registrationPhoneNo,
            depositBank:$scope.orderInvoices.depositBank,
            bankAccount:$scope.orderInvoices.bankAccount,
            addressee:$scope.orderInvoices.addressee,
            receiveCall:$scope.orderInvoices.receiveCall,
            area:$scope.orderInvoices.area,
            bz:$scope.orderInvoices.bz
        }
    }
    $scope.articleCallback=function(data){
        Notify.alert();//提示操作成功
        $timeout(function(){
            $location.replace().path('/cms/invoiceDetail');
        },1000);
    }
    $scope.submitForm = function (isValid) {
        if (!isValid) {
            console.log(isValid)
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
                //return;
                accountFactory.updateOrderinvoiceCms(
                    $scope.getParams1(),
                    $scope.articleCallback
                )
            };
        }
    };
})