/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('invoiceCtrl',function($scope, $http,Notify, $cookieStore, accountFactory,mdFactory){
    //更改业务状态
    $scope.updateClearingCallback=function(data){
        $scope.fetchData();
        Notify.alert();
    }
    $scope.operate=function(orderInvoiceId,status){
        var status=status;
        $scope.orderInvoiceId=orderInvoiceId;
        $scope.type=status;
        $scope.confirm=function(data){
            console.log(data);
            $scope.getParams2 = function(){
                return {
                    orderInvoiceId:orderInvoiceId,
                    status:  data
                }
            };
            $scope.fetchData2();
            $scope.orderInvoiceId=-1000;
        }
    }
    //更改业务状态
    $scope.fetchData2 = function(){
        accountFactory.updateOrderInvoiceStatus(
            $scope.getParams2(),
            $scope.updateClearingCallback
        );
    };
    $scope.hide=function(){
        $scope.orderInvoiceId=-1000;
    }
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.getOrderInvoiceListCallback = function(data){
        console.log(data);
        $scope.loading = false;
        $scope.orderInvoices = data.orderInvoices;
        $scope.turnPage.totalItems = data.totalCount;
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
    /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
    $scope.dataChange = function(){
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        $scope.fetchData();
    };
    /* 参数对象  */
    $scope.getParams = function(){
        return {
            size		:	$scope.turnPage.itemsPerPage,
            page		:	$scope.turnPage.currentPage
        }
    };

    /* 获取topicList */
    $scope.fetchData = function(){
        console.log( $scope.getParams());
        //return;
        $scope.loading = true;
        accountFactory.getOrderInvoiceList(
            $scope.getParams(),
            $scope.getOrderInvoiceListCallback
        );
    };
    $scope.fetchData();

})