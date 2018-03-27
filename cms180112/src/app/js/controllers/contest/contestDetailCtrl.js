App
    .controller('contestDetailCtrl', function($scope,$rootScope,$http,$stateParams,ModalService,Notify,$timeout,$location,FieldFactory,$cookieStore,MobileUserFactory,ContestFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getContestListCallback = function(data){
            $scope.topicList    = data.topicList;
            $scope.getTopicListDetail($scope.topicList);
            $scope.changeType($scope.topicListDetail.isAnonymous);
            $scope.matching($scope.topicListDetail.topicRealm,$scope.realmList);
            $scope.zero($scope.topicListDetail.obverseCount,$scope.topicListDetail.reverseCount)
        };

        $scope.zero = function (a,b) {
              if(a+b==0){
                  $scope.percent = $scope.percent_ =0
              }else {
                  $scope.percent = Math.round((a/(a+b))*100);
                  $scope.percent_ = 100-$scope.percent;
                  $scope.pk_true = {
                      "width": $scope.percent*10 +"px"
                  };
                  $scope.pk_false = {
                      "width": $scope.percent_*10 +"px"
                  }
              }
        };

        $scope.realmListCallback = function (data) {
            $scope.realmList 	   = data.realmList;
            $scope.fetchData();
        };

        $scope.getMobileUserListCallback = function (data) {
            $scope.userList 	   = data.userList;
        };

        $scope.setChangeContestCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/contestList');
            },500);
        };

        $scope.setRemoveContestCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/contestList');
            },500);
        };

        $scope.setContestTopCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/contestList');
            },500);
        };

        $scope.setModiTopicToHotCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/contestList');
            },500);
        };

        $scope.setModiTopicToNormalCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/contestList');
            },500);
        };

        /* board title set */

        /* 参数对象  */
        $scope.params = $stateParams;
        /* get mobilUserList */
        $scope.fetchData = function(){
            ContestFactory.getContestList(
                $scope.params,
                $scope.getContestListCallback
            );
        };

        /* 数据匹配 */
        $scope.getTopicListDetail = function(_epmtInfoList_){
            for (var i = 0; i < _epmtInfoList_.length; i++) {
                if($stateParams.topicId == _epmtInfoList_[i].topicId){
                    $scope.topicListDetail = _epmtInfoList_[i];
                    return;
                }
            }
        };

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                realmIds	     :	$scope.addRealmIds(),
                content	         :	$scope.topicListDetail.content,
                title	         :	$scope.topicListDetail.title,
                appUserId		 :  $scope.appUserId || $scope.topicListDetail.userInfo.user.userId,
                topicId			 :  $scope.topicListDetail.topicId,
                obverse			 :  $scope.topicListDetail.obverse,
                reverse			 :  $scope.topicListDetail.reverse
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

        /* 领域列表匹配 */
        $scope.matching = function(_value_,_list_){
            for(var i=0;i<_value_.length;i++){
                for(var j=0;j<_list_.length;j++){
                    if(_value_[i].realmId == _list_[j].realmId){
                        _list_[j].fnChecked = true;
                    }
                }
            }
        };

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

        $scope.changeType = function (_type_) {
            if(_type_){
                $scope.isAnonymous = 2;
            }else{
                $scope.isAnonymous = 1;
            }
        };


        $scope.setChangeContestInterface = function () {
            ContestFactory.setChangeContest(
                $scope.getParams(),
                $scope.setChangeContestCallback
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
                    $scope.setChangeContestInterface();
                };
            }
        };

        /* 屏蔽擂台 */
        $scope.removeContest = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要屏蔽该擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                ContestFactory.setRemoveContest(
                    {
                        topicId : $scope.topicListDetail.topicId,
                        type : 1
                    },
                    $scope.setRemoveContestCallblack
                )
            };
        };

        /* 删除擂台 */
        $scope.deleteContest = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要彻底删除该擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                ContestFactory.setRemoveContest(
                    {
                        topicId : $scope.topicListDetail.topicId,
                        type : 2
                    },
                    $scope.setRemoveContestCallback
                )
            };
        };

        /* 加入热门擂台 */
        $scope.addHotContest = function () {
            $scope.alterTitle = "设置热门擂台顺序 : ";
            var alertHtml = 'app/views/alert/radio.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.radioType = 1;
            $scope.updateTrue = function (_radio_) {
                ModalService.modalHide();
                ContestFactory.setContestTop(
                    {
                        topicId: $scope.topicListDetail.topicId,
                        sortType : _radio_
                    },
                    $scope.setContestTopCallback
                )
            };
        };

        /* 移除热门擂台 */
        $scope.removeHotContest = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要取消其热门擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                ContestFactory.setModiTopicToNormal(
                    {
                        topicId : $scope.topicListDetail.topicId
                    },
                    $scope.setModiTopicToNormalCallback
                )
            };
        };

        /* 加入推荐擂台 */
        $scope.addRecommend = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要推荐该擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                ContestFactory.setModiTopicToHot(
                    {
                        topicId : $scope.topicListDetail.topicId
                    },
                    $scope.setModiTopicToHotCallback
                )
            };
        };

        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey : $scope.topicListDetail.userInfo.user.name,
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
            $scope.topicListDetail.userInfo.user.name = _name_;
            $scope.appUserId = _id_

        };
        $scope.hideUl = function () {
            $timeout(function(){
                $scope.userType = false
            },100);
        }

    });