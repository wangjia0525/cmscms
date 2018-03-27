/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('accountCtrl',function($scope, $http,Notify, $cookieStore,ModalService, accountFactory,mdFactory){
    $scope.updateClearingCallback=function(data){
        $scope.fetchData();
        Notify.alert();
    }
    //更改业务状态
    $scope.operate=function(clearingId,state){
        var state=state;
        $scope.clearingId=clearingId;
        $scope.type=state;
        $scope.confirm=function(data){
            console.log(data);
            $scope.getParams2 = function(){
                return {
                    clearingId:clearingId,
                    state:  data
                }
            };
            $scope.fetchData2();
            $scope.clearingId=-1000;
        }
    }
    //更改业务状态
    $scope.fetchData2 = function(){
        accountFactory.updateClearing(
            $scope.getParams2(),
            $scope.updateClearingCallback
        );
    };
    $scope.hide=function(){
        $scope.clearingId=-1000;
    }
    $scope.getClearingCallback=function(data){
        console.log(data);
        $scope.loading = false;
        $scope.clearingList = data.clearingList;
        $scope.turnPage.totalItems = data.totalCount;
        $cookieStore.put('myapp.getClearing.searches', $scope.getParams());
    }
    //票的状态
    $scope.updateClearingIsInvoiceCallback=function(data){
        $scope.fetchData();
    }
    $scope.piao=function(_id_){
        $scope.successAlert = "提交信息";
        var templateUrl_2 = 'app/views/alert/success.html';
        ModalService.modalSet($scope, templateUrl_2);
        $scope.updateTrue = function () {
            ModalService.modalHide();
            //return;
            accountFactory.updateClearingIsInvoice(
                {
                    clearingId:_id_
                },
                $scope.updateClearingIsInvoiceCallback
            )
        };
    }
    $scope.searchplaceholder='手机号';
    $scope.accountSelect='结算类型';
    $scope.accountType = [
        {_index_: 0, _value_: "全部"},
        {_index_: 1, _value_: "日课收入"},
        {_index_: 2, _value_: "分享收入"}
    ];
    $scope.accountSelectValue = $scope.accountType[0];
    $scope.fetchData = function () {
        //console.log($scope.getParams())
        //return;
        $scope.loading = true;
        accountFactory.getClearing(
            $scope.getParams(),
            $scope.getClearingCallback
        );
    };
    /* show search condition by cookie */
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.getClearing.searches')) {
            $scope.searchKey = $cookieStore.get('myapp.getClearing.searches').searchKey;
        } else{
            $scope.searchKey = "";
        }
    };
    $scope.getParams = function () {
        return {
            size: $scope.turnPage.itemsPerPage,
            page: $scope.turnPage.currentPage,
            phoneNo: $scope.searchKey||'',
            type: $scope.accountSelectValue._index_
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
})