App
    .controller('addContestCtrl', function($scope,$rootScope,$http,$stateParams,Notify,ModalService,$timeout,$location,FieldFactory,$cookieStore,MobileUserFactory,ContestFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.realmListCallback = function (data) {
            $scope.realmList 	   = data.realmList;
        };

        $scope.setAddContestCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/contestList');
            },500);
        };

        $scope.getMobileUserListCallback = function (data) {
            $scope.userList 	   = data.userList;
        };



        /* 参数对象  */
        $scope.getParams = function(){
            return {
                realmIds	     :	$scope.addRealmIds(),
                content	         :	$scope.content,
                title	         :	$scope.title,
                obverse	         :	$scope.obverse,
                reverse	         :	$scope.reverse,
                appUserId		 :  $scope.appUserId
            };
        };


        /* 获取领域列表 */
        $scope.field = function(){
            FieldFactory.getRealmList(
                {
                    size		:	1000,
                    page		:	1
                },
                $scope.realmListCallback
            );
        };
        $scope.field();


        /* 返回的领域列表匹配 */
        $scope.addRealmIds = function () {
            var realmIds = [];
            for(var i=0;i<$scope.realmList.length;i++){
                if($scope.realmList[i].fnChecked){
                    realmIds.push($scope.realmList[i].realmId)
                }
            }
            return realmIds;
        };

        $scope.addContest = function () {
            ContestFactory.setAddContest(
                $scope.getParams(),
                $scope.setAddContestCallback
            )
        };
        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope,templateUrl_1);
            }else {
                $scope.successAlert = "提交信息";
                var templateUrl_2 = 'app/views/alert/success.html';
                ModalService.modalSet($scope,templateUrl_2);
                $scope.updateTrue = function () {
                    ModalService.modalHide();
                    $scope.addContest();
                };
            }
        };

        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey : $scope.name,
                    page:1,
                    size:5
                },
                $scope.getMobileUserListCallback
            )
        };
        $scope.userChange = function () {
            $scope.getUserList();
        };
        $scope.changeName = function (_name_,_id_) {
            $scope.name = _name_;
            $scope.appUserId = _id_

        };
        $scope.hideUl = function () {
            $timeout(function(){
                $scope.userType = false
            },300);
        }

    });