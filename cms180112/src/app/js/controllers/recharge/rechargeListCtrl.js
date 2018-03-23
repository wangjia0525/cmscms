/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('rechargeListCtrl', function ($scope, $http, $cookieStore, FoldFactory, Notify, mdFactory, ModalService, CoursesFactory,RechargeFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getOrderListCallback = function (data) {
            console.log(data)
            $scope.loading = false;
            $scope.result = data.result;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength = data.totalCount;
            $cookieStore.put('myapp.rechargeList.searches', $scope.getParams());
        };

        $scope.updataCourseOrderCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };


        /* board title set */
        $scope.statusSelect = "充值金额";
        $scope.platSelect = "设备类型";
        $scope.orderSelect = "订单类型";
        $scope.searchName = "用户手机号";

        $scope.platType = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "苹果"},
            {_index_: 2, _value_: "安卓"}
        ];

        //$scope.statusType = [
        //    {_index_: 0, _value_: "全部", startMoney: 0, endMoney: 0},
        //    {_index_: 1, _value_: "6", startMoney: 5, endMoney: 7},
        //    {_index_: 2, _value_: "36", startMoney: 35, endMoney: 37},
        //    {_index_: 3, _value_: "68", startMoney: 67, endMoney: 69},
        //    {_index_: 4, _value_: "108", startMoney: 107, endMoney: 109},
        //    {_index_: 5, _value_: "208", startMoney: 207, endMoney: 209},
        //    {_index_: 6, _value_: "298", startMoney: 297, endMoney: 299}
        //];
        //订单类型
        $scope.orderType = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "年会会员购买"},
            {_index_: 2, _value_: "年会会员兑换"},
            {_index_: 3, _value_: "幸会币充值"}
        ];
        //初始化
        $scope.orderSelectValue= $scope.orderType[0]
        /*
         时间框
         * */
        $scope.today = function() {
            $scope.dt = mdFactory.getStringByDate(new Date());
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.finalBeginDate = {
            opened: false,
            date:mdFactory.getStringByDate(mdFactory.addDate(new Date(),-6,"day"))
        };
        $scope.finalEndDate = {
            opened: false,
            date:mdFactory.getStringByDate(new Date())
        };
        $scope.openFinalBeginDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.finalBeginDate.opened = true;
        };
        $scope.openFinalEndDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.finalEndDate.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'yyyy-MM-dd';

        //

        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.rechargeList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.rechargeList.searches').page;
            $scope.platSelectValue = $scope.platType[$cookieStore.get('myapp.rechargeList.searches').plat];
            $scope.search = $cookieStore.get('myapp.rechargeList.searches').phoneNo;
        } else {
            $scope.platSelectValue = $scope.platType[0];
            $scope.search = ''
        }

        /* 参数对象  */
        $scope.getParams = function () {
            if (typeof($scope.finalBeginDate.date) != "string") {
                $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
            }
            if (typeof($scope.finalEndDate.date) != "string") {
                $scope.finalEndDate.date = mdFactory.getStringByDate($scope.finalEndDate.date);
            }
            return {
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                phoneNo: $scope.search,
                startDateStr: $scope.finalBeginDate.date,
                endDateStr: $scope.finalEndDate.date,
                //status: $scope.statusSelectValue._index_,
                startMoney: $scope.startMoney,
                endMoney: $scope.endMoney,
                plat: $scope.platSelectValue._index_,
                orderType:$scope.orderSelectValue._index_//订单类型
            };
        };


        /* 获取courses List */
        $scope.fetchData = function () {
            //console.log($scope.getParams());
            //return;
            $scope.loading = true;
            RechargeFactory.getOrderList(
                $scope.getParams(),
                $scope.getOrderListCallback
            );
        };
        $scope.fetchData();

        $scope.dataChange = function(){
            $scope.fetchData();
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.fetchData();
            }
        };
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function () {
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };

        /* 排序 */
        $scope.fnSort = function (_id_, _sort_) {
            CoursesFactory.updataCourseOrder(
                {
                    "productId": _id_,
                    "type": _sort_
                },
                $scope.updataCourseOrderCallback
            )
        };
    });