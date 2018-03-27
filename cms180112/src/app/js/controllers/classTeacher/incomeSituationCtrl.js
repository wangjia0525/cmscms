/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('incomeSituationCtrl',function($scope, $http, $cookieStore,$stateParams, classTeacherFactory,mdFactory){
    //console.log($stateParams.userId)//上个页面传过来的userId
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.teacherRevenueCallback = function(data){
        //console.log(data)
        $scope.loading = false;
        $scope.total = data.teacherRevenueCMS[0];
        $scope.member = data.teacherRevenueCMS[1];
        $scope.single = data.teacherRevenueCMS[2];
        //console.log($scope.total,$scope.member,$scope.single)
        $cookieStore.put('myapp.teacherRevenue.searches', $scope.params);
    };
    /* 获取adviceList */
    $scope.userId=$stateParams.userId;
    //console.log($scope.userId)
    $scope.name=$stateParams.name;
    $scope.fetchData = function(){

        $scope.loading = true;
        //return;
        classTeacherFactory.getTeacherRevenue(
            {
                userId:$stateParams.userId
            },
            $scope.teacherRevenueCallback
        );
    };
    /* show search condition by cookie */
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.teacherRevenue.searches')) {
            $scope.userId = $cookieStore.get('myapp.teacherRevenue.searches').userId;
        } else{
            $scope.userId = $stateParams.userId;
        }
    };
    $scope.fetchData();
})