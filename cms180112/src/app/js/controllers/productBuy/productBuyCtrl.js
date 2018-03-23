
App
    .controller('productBuyCtrl', function($scope, colors, $rootScope,$cookieStore,$stateParams, productBuyFactory, mdFactory, CmsSectionFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        //课程编号、老师
        $scope.searchplaceholder = "课程编号、老师";
        //console.log($stateParams.productId);
        $scope.productId=$stateParams.productId;
        //购买类型
        $scope.buyType = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "单买用户"},
            {_index_: 2, _value_: "会员领取"}
        ];
        $scope.buySelectValue=$scope.buyType[0];
        $scope.getProductBuyCallback = function(data) {
            $scope.productBuy = data;
            $scope.loading=false;
            //console.log(data);
            $scope.getChartData($scope.productBuy);
            //$cookieStore.put('myapp.productBuy.searches', $scope.getParams());
        };
        //if ($cookieStore.get('myapp.productBuy.searches')) {
        //    $scope.search = $cookieStore.get('myapp.productBuy.searches').search;
        //} else {
        //    $scope.search = ''
        //}
        /* 参数对象  */
        $scope.getParams = function () {
            return {
                productId: $scope.productId,
                type: $scope.buySelectValue._index_
            };
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.fetchData();
            }
        };
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

        /* 获取统计数据 */
        $scope.fetchData = function() {
            if (typeof($scope.finalBeginDate.date) != "string") {
                $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
            }
            if (typeof($scope.finalEndDate.date) != "string") {
                $scope.finalEndDate.date = mdFactory.getStringByDate($scope.finalEndDate.date);
            }
            $scope.loading=true;
            productBuyFactory.getProductBuy({
                    endDate:$scope.finalBeginDate.date,
                    startDate: $scope.finalEndDate.date,
                    type: $scope.buySelectValue._index_,
                    productId: $scope.productId
                },
                $scope.getProductBuyCallback
            );
        };
        $scope.fetchData();
        $scope.dataChange = function() {
            $scope.fetchData();
        };


        $scope.getChartData = function(_productBuy_) {
//            console.log(_productBuy_)
            // dayLoginCount	         是 int[]	每日登陆人数统计
            // dayTopicCount	         是	int[]	每日新话题数量
            // dayArenaCount	         是	int[]	每日新擂台数量
            // dayTopicFavoriteCount	 是	int[]	新话题关注数量
            // dayArenaFavoriteCount	 是	int[]	新擂台关注数量
            var date_labels = [];
            var beginDate = mdFactory.getDateByString($scope.finalBeginDate.date);
            var tmpDate = beginDate;
            var date_cha = mdFactory.DateDiff($scope.finalEndDate.date,$scope.finalBeginDate.date);
            for (var i = 0; i < date_cha+1; i++) {
                date_labels.push( (tmpDate.getMonth()-0+1)+"."+tmpDate.getDate() );
                tmpDate = mdFactory.addDate(tmpDate,1,"day");
            };
            //地区
            var date_labels1 = [];
            var count1=[];
            for(var i = 0; i < _productBuy_.areaCount.length; i++){
                date_labels1.push(_productBuy_.areaCount[i].xname);
                count1.push(_productBuy_.areaCount[i].count)
            }
            //行业
            var date_labels2 = ["","","","","","","","","",""];
            var count2=[];
            for(var i = 0; i < _productBuy_.industyCount.length; i++){
                date_labels2[i]=_productBuy_.industyCount[i].xname;
                count2.push(_productBuy_.industyCount[i].count)
            }
            //订购日期
            var date_labels3 = [];
            var count3=[];
            for(var i = 0; i < _productBuy_.listdayBuy.length; i++) {
                date_labels3.push(_productBuy_.listdayBuy[i].xname);
                count3.push(_productBuy_.listdayBuy[i].count)
            }
            //性别
            var count4=['0','0','0'];
            var   date_labels4=['其它','男','女'];
            for(var i = 0; i < _productBuy_.sexCount.length; i++) {
                if(_productBuy_.sexCount[i].xname==0) {
                    count4[0]=_productBuy_.sexCount[i].count
                } else if(_productBuy_.sexCount[i].xname==1){
                    count4[1]=_productBuy_.sexCount[i].count
                }else if(_productBuy_.sexCount[i].xname==2){
                    count4[2]=_productBuy_.sexCount[i].count
                }
                //date_labels4.push(_productBuy_.sexCount[i].xname);

            }
            //console.log(count3,date_labels3)
            $scope.barData_dayLoginCount_title = "性别";
                $scope.barData_dayLoginCount = {
                    labels: date_labels4 ,
                    datasets: [{
                        fillColor: colors.byName('info'),
                        strokeColor: colors.byName('info'),
                        highlightFill: colors.byName('info'),
                        highlightStroke: colors.byName('info'),
                        data: count4
                    }]
                };

            $scope.barData_dayTopicCount_title = "地区";
            $scope.barData_dayTopicCount = {
                labels: date_labels1,
                datasets: [{
                    fillColor: colors.byName('danger'),
                    strokeColor: colors.byName('danger'),
                    highlightFill: colors.byName('danger'),
                    highlightStroke: colors.byName('danger'),
                    data: count1
                }]
            };
            $scope.barData_dayArenaCount_title = "行业";
            $scope.barData_dayArenaCount = {
                labels: date_labels2,
                datasets: [{
                    fillColor: colors.byName('pink'),
                    strokeColor: colors.byName('pink'),
                    highlightFill: colors.byName('pink'),
                    highlightStroke: colors.byName('pink'),
                    data: count2
                }]
            };
            $scope.barData_dayTopicFavoriteCount_title = "影响力";
            if(_productBuy_.scoreCount[0]==null){
                $scope.barData_dayTopicFavoriteCount = {
                    labels: ['0-10','11-20','21-40','40以上'],
                    datasets: [{
                        fillColor: colors.byName('purple'),
                        strokeColor: colors.byName('purple'),
                        highlightFill: colors.byName('purple'),
                        highlightStroke: colors.byName('purple'),
                        //data: [1,2,3,4]
                        data: [0,0,0,0]
                    }]
                };
            }else{
                $scope.barData_dayTopicFavoriteCount = {
                    labels: ['0-10','11-20','21-40','40以上'],
                    datasets: [{
                        fillColor: colors.byName('purple'),
                        strokeColor: colors.byName('purple'),
                        highlightFill: colors.byName('purple'),
                        highlightStroke: colors.byName('purple'),
                        //data: [1,2,3,4]
                        data: [_productBuy_.scoreCount[0].cou0_10,_productBuy_.scoreCount[0].cou11_20,_productBuy_.scoreCount[0].cou21_40,_productBuy_.scoreCount[0].cou41]
                    }]
                };
            }
            $scope.barData_dayArenaFavoriteCount_title = "订购日期";
            $scope.barData_dayArenaFavoriteCount = {
                labels:date_labels3,
                datasets: [{
                    fillColor: colors.byName('green'),
                    strokeColor: colors.byName('green'),
                    highlightFill: colors.byName('green'),
                    highlightStroke: colors.byName('green'),
                    data:count3
                }]
            };
        };
        $scope.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 0.1,
            barValueSpacing: 5,
            barDatasetSpacing: 0.5
        };
        //$scope.barOptions1 = {
        //    scaleBeginAtZero: true,
        //    scaleShowGridLines: true,
        //    scaleGridLineColor: 'rgba(0,0,0,.05)',
        //    scaleGridLineWidth: 1,
        //    barShowStroke: true,
        //    barStrokeWidth: 0.1,
        //    barValueSpacing: 70,
        //    barDatasetSpacing: 0.5
        //};
        //$scope.barOptions2 = {
        //    scaleBeginAtZero: true,
        //    scaleShowGridLines: true,
        //    scaleGridLineColor: 'rgba(0,0,0,.05)',
        //    scaleGridLineWidth: 1,
        //    barShowStroke: true,
        //    barStrokeWidth: 0.1,
        //    barValueSpacing: 10,
        //    barDatasetSpacing: 0.5
        //};
        //$scope.barOptions3 = {
        //    scaleBeginAtZero: true,
        //    scaleShowGridLines: true,
        //    scaleGridLineColor: 'rgba(0,0,0,.05)',
        //    scaleGridLineWidth: 1,
        //    barShowStroke: true,
        //    barStrokeWidth: 0.1,
        //    barValueSpacing: 30,
        //    barDatasetSpacing: 0.5
        //};
        //$scope.barOptions4 = {
        //    scaleBeginAtZero: true,
        //    scaleShowGridLines: true,
        //    scaleGridLineColor: 'rgba(0,0,0,.05)',
        //    scaleGridLineWidth: 1,
        //    barShowStroke: true,
        //    barStrokeWidth: 0.1,
        //    barValueSpacing: 50,
        //    barDatasetSpacing: 0.5
        //};
        //$scope.barOptions5 = {
        //    scaleBeginAtZero: true,
        //    scaleShowGridLines: true,
        //    scaleGridLineColor: 'rgba(0,0,0,.05)',
        //    scaleGridLineWidth: 1,
        //    barShowStroke: true,
        //    barStrokeWidth: 0.1,
        //    barValueSpacing: 10,
        //    barDatasetSpacing: 0.5
        //};
    });