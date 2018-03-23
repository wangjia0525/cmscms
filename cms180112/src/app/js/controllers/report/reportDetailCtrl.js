

App
    .controller('reportDetailCtrl', function($scope,$rootScope,$http,Notify,$stateParams,ModalService,$cookieStore,ReportFactory,$location,$timeout,MobileUserFactory,TopicFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.userReportDetailCallback = function(data){
            $scope.userReport 	= data.userReport;
        };

        $scope.userReportStatusCallback = function(){
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/report');
            },500);
        };

        /* board title set */
        /* 获取userReportId */
        $scope.fetchData = function(){
            ReportFactory.getUserReportDetail(
                {
                    userReportId:$stateParams.userReportId
                },
                $scope.userReportDetailCallback
            );
        };
        $scope.fetchData();
        /* 举报成立与否 */
        $scope.setReportStates = function (_type_) {
            ReportFactory.setUserReportStatus(
                {
                    userReportId :$stateParams.userReportId,
                    status : _type_
                },
                $scope.userReportStatusCallback
            );
        };

        $scope.seeReportContent = function (_content_) {
            $scope.seeReportContentTitle = "详情";
            $scope.seeReportContentDetail = _content_;
            var templateUrl = 'app/views/report/seeReportContent.html';
            ModalService.modalSet($scope,templateUrl);

        }

    });