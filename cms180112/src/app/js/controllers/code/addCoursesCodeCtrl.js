App
    .controller('addCoursesCodeCtrl', function($location,$timeout,$scope,$http,Notify,$cookieStore,ModalService,TopicFactory,mdFactory,CodeFactory,CoursesFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.creatcdkeyCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/createCodeList');
            },1000);
        };

        $scope.getCourseCallback = function (data) {
            if(data.result){
                $scope.product.productName = data.result.name;
            }else {
                $scope.product.productName = "";
            }

        };
        $scope.getCoursefailCallback = function() {
            $scope.product.productName =""
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
            date:""
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

        $scope.dataChange = function () {
            alert(1)
        };

        /* 参数对象  */
        $scope.getParams = function () {
          if (typeof($scope.finalBeginDate.date) != "string") {
            $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
          }
          return {
            productId:$scope.product.productId,
            number:$scope.product.number,
            remark:$scope.product.remark,
            expirationTimeStr:$scope.finalBeginDate.date,
            type:1
            };
        };

        /* 创建课程兑换码 */
        $scope.creatCode = function(){
            $scope.loading = true;
            CodeFactory.creatcdkey(
                $scope.getParams(),
                $scope.creatcdkeyCallback
            );
        };

        /* 获取课程详情 */
        $scope.dataChange = function () {
            CoursesFactory.getCourse(
                {
                    productId:$scope.product.productId
                },
                $scope.getCourseCallback,
                $scope.getCoursefailCallback
            )
        };

        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            } else {
                $scope.successAlert = "生成过程时间较长，请尽量在闲时操作";
                var templateUrl_2 = 'app/views/alert/success.html';
                ModalService.modalSet($scope,templateUrl_2);
                $scope.updateTrue = function () {
                    ModalService.modalHide();
                    $scope.creatCode();
                };
            }
        };
    });