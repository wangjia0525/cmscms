/**
 * Created by wangjia on 2017/9/6.
 */
App.controller('classListCtrl',function($scope, $http, $cookieStore,$stateParams, classTeacherFactory,mdFactory){
    //console.log($stateParams.userId)//上个页面传过来的userId
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.teacherCourseCallback = function(data){
        //console.log(data)
        $scope.loading = false;
        $scope.teacherCourse = data.teacherCourses;
        $cookieStore.put('myapp.teacherCourse.searches', $scope.params);
    };
    /* 获取adviceList */
    $scope.userId=$stateParams.userId;
    $scope.name=$stateParams.name;
    $scope.fetchData = function(){
        //console.log($scope.getParams())
        $scope.loading = true;
        //return;
        classTeacherFactory.getTeacherCourse(
            {
                userId:$stateParams.userId
            },
            $scope.teacherCourseCallback
        );
    };
    /* show search condition by cookie */
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.teacherCourse.searches')) {
            $scope.userId = $cookieStore.get('myapp.teacherCourse.searches').userId;
        } else{
            $scope.userId = $stateParams.userId;
        }
    };
    $scope.fetchData();

})