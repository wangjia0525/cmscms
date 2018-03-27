/**
 * Created by Administrator on 2017/7/4.
 */


App
    .controller('addYxlCtrl', function($scope, Notify, ModalService, $timeout, $location, $cookieStore, MobileUserFactory, yxlFactory, mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.visible=false;
        $scope.messageType=1;
        $scope.message="";
        $scope.isTrue1=function(){
            if($scope.messageType==1){
                $scope.visible=false;
            }else{
                $scope.visible=true;
            }
        }
        //$scope.isTrue2=function(){
        //    $scope.unsend=true;
        //}
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.addYxlCallback = function(data){
            $scope.loading = false;
            $scope.userScoreLogList=data.userScoreLogList;
            $cookieStore.put('myapp.addYxlList.searches',$scope.getParams());
        };
        //手机号相关
        $scope.getMobileUserListCallback = function (data) {
            $scope.userList = data.userList;
        };
        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey: $scope.name,
                    page: 1,
                    size: 5
                },
                $scope.getMobileUserListCallback
            )
        };
        $scope.userChange = function () {//手机号相关
            $scope.getUserList();
        };
        $scope.hideUl = function () {//手机号相关
            $timeout(function () {
                $scope.userType = false
            }, 300);
        };
        $scope.changeName = function (_name_, _id_) {//手机号相关
            $scope.name = _name_;
            $scope.appUserId = _id_
            //console.log($scope.appUserId)
        };
        //方向
        $scope.derection= [
            {_index_: 0, _value_: "加分", "reasonType":1},
            {_index_: 1, _value_: '减分', "reasonType":2},
        ];
        $scope.derectionSelectValue=$scope.derection[0];
        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            console.log(isValid);

            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            } else {
                $scope.successAlert = "新增影响力";
                var templateUrl_2 = 'app/views/alert/success.html';
                ModalService.modalSet($scope,templateUrl_2);
                $scope.updateTrue = function () {
                    ModalService.modalHide();
                    $scope.addScore();
                };
            }
        };
        /* 添加影响力 */
        $scope.addScore = function(){
            $scope.loading = true;
            //console.log($scope.getParams());
            yxlFactory.addYxl(
                $scope.getParams(),
                $scope.addscoreCallback
            );
        };

        /* 参数对象  */
        $scope.getParams = function () {
            return {
                userId: $scope.appUserId,
                type: $scope.derectionSelectValue.reasonType,
                score: $scope.score,
                messageType: $scope.messageType,
                message: $scope.message,
                bz : $scope.bz
            };
        };

        $scope.addscoreCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/yxl');
            },1000);
        };
    });