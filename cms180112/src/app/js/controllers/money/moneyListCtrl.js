/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('moneyListCtrl', function ($scope,$timeout, $http, $cookieStore, FoldFactory, Notify, mdFactory, ModalService, CoursesFactory,MoneyFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.balanceHistoryCallback = function (data) {
            //console.log(data)
            $scope.loading = false;
            $scope.result = data.result;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength = data.totalCount;
            $cookieStore.put('myapp.moneyList.searches', $scope.getParams());
        };

        $scope.updataCourseOrderCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };


        /* board title set */
        $scope.statusSelect = "方向";
        $scope.platSelect = "事件类型";
        $scope.searchName = "用户手机号";
        $scope.searchMoney = "金额";

        $scope.platType = [
            {_index_: 0, _value_: "全部",children:[
                {_index_:0,_value_:"全部",type:0}
            ]},
            {_index_: 1, _value_: "充值",children:[
                {_index_:0,_value_:"全部",type:1},
                {_index_:1,_value_:"支付宝充值",type:101},
                {_index_:2,_value_:"微信充值",type:102},
                {_index_:3,_value_:"ios内购",type:103},
                {_index_:4,_value_:"收益转入",type:104},
                {_index_:5,_value_:"兑换余额",type:201},
                {_index_:6,_value_:"任务墙领取",type:106},
                {_index_:7,_value_:"分享会员注册奖励",type:108},
            ]},
            {_index_: 2, _value_: "支出",children:[
                {_index_:0,_value_:"购买课程",type:301},
                {_index_:1,_value_:"微咨询",type:309},
                {_index_:2,_value_:"偷看",type:310}
            ]}
        ];

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
        $scope.doCokie = function () {
            if ($cookieStore.get('myapp.moneyList.searches')) {
                $scope.turnPage.currentPage = $cookieStore.get('myapp.moneyList.searches').page;
                $scope.platSelectValue = $scope.platType[$cookieStore.get('myapp.moneyList.searches')._index_];
                $scope.platSelectValue2 = $scope.platSelectValue.children[$cookieStore.get('myapp.moneyList.searches')._index_2];
                $scope.search = $cookieStore.get('myapp.moneyList.searches').phoneNo;

            } else {
                $scope.platSelectValue = $scope.platType[0];
                $scope.platSelectValue2 = $scope.platSelectValue.children[0];
                //console.log($scope.platSelectValue2);
                $scope.search = ''
            }
        };
        $scope.doCokie();
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
                _index_: $scope.platSelectValue._index_,
                _index_2: $scope.platSelectValue2._index_,
                tranType: $scope.platSelectValue2.type,
                startMoney: $scope.startMoney==='' ? null : $scope.startMoney,
                endMoney: $scope.endMoney==='' ? null : $scope.endMoney
            };
        };


        /* 获取courses List */
        $scope.fetchData = function () {
            //console.log($scope.platSelectValue2);
            $scope.loading = true;
            MoneyFactory.balanceHistory(
                $scope.getParams(),
                $scope.balanceHistoryCallback
            );
        };
        $scope.fetchData();

        $scope.dataChange = function(){
            $scope.fetchData();
        };
        $scope.dataChange1 = function(){
            $scope.platSelectValue2 = $scope.platSelectValue.children[0];
            $scope.fetchData();
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