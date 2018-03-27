App
    .controller('addMemberCodeCtrl', function($location,$timeout,$scope,Notify,ModalService,mdFactory,CodeFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.creatcdkeyCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/createCodeList');
            },1000);
        };

        //会期前
        $scope.memberFrontType=[
            {_index_: 0, _value_: "0个月"},
            {_index_: 1, _value_: "1个月"},
            {_index_: 2, _value_: "2个月"},
            {_index_: 3, _value_: "3个月"},
            {_index_: 4, _value_: "4个月"},
            {_index_: 5, _value_: "5个月"},
            {_index_: 6, _value_: "6个月"},
            {_index_: 7, _value_: "7个月"},
            {_index_: 8, _value_: "8个月"},
            {_index_: 9, _value_: "9个月"},
            {_index_: 10, _value_: "10个月"},
            {_index_: 11, _value_: "11个月"},
            {_index_: 12, _value_: "12个月"},
        ];
        //会期前初始化
        $scope.memberFrontSelectValue=$scope.memberFrontType[0];
        //会期后
        $scope.memberQueenType=[
            {_index_: 0, _value_: "0个月"},
            {_index_: 1, _value_: "1个月"},
            {_index_: 2, _value_: "2个月"},
            {_index_: 3, _value_: "3个月"},
            {_index_: 4, _value_: "4个月"},
            {_index_: 5, _value_: "5个月"},
            {_index_: 6, _value_: "6个月"},
            {_index_: 7, _value_: "7个月"},
            {_index_: 8, _value_: "8个月"},
            {_index_: 9, _value_: "9个月"},
            {_index_: 10, _value_: "10个月"},
            {_index_: 11, _value_: "11个月"},
            {_index_: 12, _value_: "12个月"},
        ];
        //会期后初始化
        $scope.memberQueenSelectValue=$scope.memberQueenType[0];

        /*时间框* */
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

        /* 参数对象  */
        $scope.getParams = function () {
            if (typeof($scope.finalBeginDate.date) != "string") {
                $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
            }
            return {
                period :'12',//会员时间
                givingNumFront  :$scope.memberFrontSelectValue._index_,//会期前
                givingNumAfter:$scope.memberQueenSelectValue._index_,//会期后
                number:$scope.product.number,//数量
                remark:$scope.product.remark,//备注
                expirationTimeStr:$scope.finalBeginDate.date,
                type:3
            };
        };

        /* 创建课程兑换码 */
        $scope.creatCode = function(){
            //console.log($scope.getParams());
            $scope.loading = true;
            //return;
            CodeFactory.creatcdkey(
                $scope.getParams(),
                $scope.creatcdkeyCallback
            );
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
