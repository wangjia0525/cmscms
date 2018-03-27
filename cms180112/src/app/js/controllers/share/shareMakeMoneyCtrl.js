
App
    .controller('shareMakeMoneyCtrl', function($scope, colors, $rootScope,$cookieStore,$stateParams,shareFactory, mdFactory) {
        $scope.getSharerewardsCallback=function(data){
            console.log(data);
            $scope.loading = false;
            $scope.List = data.sharerewardsTwo;
            $scope.turnPage.totalItems = data.totalCount;
        }
        $scope.oneIsCashWithdrawalType = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "未提现"},
            {_index_: 2, _value_: "已提现"}
        ];
        $scope.oneIsCashWithdrawalSelectValue = $scope.oneIsCashWithdrawalType[0]
        $scope.twoIsCashWithdrawalType = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "未提现"},
            {_index_: 2, _value_: "已提现"}
        ];
        $scope.twoIsCashWithdrawalSelectValue = $scope.twoIsCashWithdrawalType[0];
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

        $scope.fetchData = function () {
            console.log($scope.getParams())
            //return;
            $scope.loading = true;
            shareFactory.getSharerewards(
                $scope.getParams(),
                $scope.getSharerewardsCallback
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
            if (typeof($scope.finalBeginDate.date) != "string") {
                $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
            }
            if (typeof($scope.finalEndDate.date) != "string") {
                $scope.finalEndDate.date = mdFactory.getStringByDate($scope.finalEndDate.date);
            }
            return {
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                payTimeEnd:$scope.finalEndDate.date,
                payTimeBeg: $scope.finalBeginDate.date,
                payFeePhoneNo: $scope.payFeePhoneNo||'',
                oneDistributionPhoneNo: $scope.oneDistributionPhoneNo||'',
                twoDistributionPhoneNo: $scope.twoDistributionPhoneNo||'',
                oneIsCashWithdrawal: $scope.oneIsCashWithdrawalSelectValue._index_,
                twoIsCashWithdrawal: $scope.twoIsCashWithdrawalSelectValue._index_
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
    });