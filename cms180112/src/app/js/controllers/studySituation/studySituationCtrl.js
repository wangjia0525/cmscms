/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('studySituationCtrl',function($scope, $http, $cookieStore,$stateParams, studySituationFactory,mdFactory){
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    //课程编号、老师
    //console.log($stateParams);
    $scope.productId=$stateParams.productId;
    $scope.searchplaceholder =$stateParams.productId;
    //购买类型
    $scope.buyType = [
        {_index_: 0, _value_: "全部"},
        {_index_: 1, _value_: "单买用户"},
        {_index_: 2, _value_: "会员领取"}
    ];
    $scope.buySelectValue=$scope.buyType[0];
    $scope.getProductCallback = function(data) {
        console.log(data);

        $scope.lists = data.statisticsForProductStudyOuts;
        $scope.avgDurations=0;
        $scope.durations=0;
        $scope.sumDurations=0;
        $scope.clickPVs=0;
        $scope.clickUVs=0;
        for(var i=0;i<$scope.lists.length;i++){
            $scope.avgDurations+=Number($scope.lists[i].avgDuration);
            $scope.durations+=Number($scope.lists[i].duration);
            $scope.sumDurations+=Number($scope.lists[i].sumDuration);
            $scope.clickPVs+=Number($scope.lists[i].clickPV);
            $scope.clickUVs+=Number($scope.lists[i].clickUV);
        }
        $scope.loading = false;
        console.log($scope.durations)
        //$cookieStore.put('myapp.studySituation.searches', $scope.getParams());
    };
    //if ($cookieStore.get('myapp.studySituation.searches')) {
    //    $scope.productId = $cookieStore.get('myapp.studySituation.searches').productId;
    //    console.log(2)
    //} else {
    //    console.log(1)
    //    $scope.productId=$stateParams.title;
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
    /* 获取统计数据 */
    $scope.fetchData = function() {
        if (typeof($scope.finalBeginDate.date) != "string") {
            $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
        }
        if (typeof($scope.finalEndDate.date) != "string") {
            $scope.finalEndDate.date = mdFactory.getStringByDate($scope.finalEndDate.date);
        }
        $scope.loading=true;
        studySituationFactory.getProduct({
                endDate:$scope.finalBeginDate.date,
                startDate: $scope.finalEndDate.date,
                type:  $scope.buySelectValue._index_,
                productId: $scope.productId
            },
            $scope.getProductCallback
        );
    };
    $scope.fetchData();
    $scope.dataChange = function() {
        $scope.fetchData();
    };
})