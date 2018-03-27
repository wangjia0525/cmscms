App
    .controller('topicDetailCtrl', function($scope,$rootScope,$http,$stateParams,Notify,ModalService,$timeout,$location,FieldFactory,$cookieStore,MobileUserFactory,TopicFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getTopicListCallback = function(data){
            //console.log(data)
            $scope.topicList    = data.topicList;
            $scope.getTopicListDetail($scope.topicList);
            //$scope.name = topicListDetail.userInfo.user.name;
            $scope.changeType($scope.topicListDetail.isAnonymous);
            $scope.matching($scope.topicListDetail.topicRealm,$scope.realmList);
        };
        $scope.realmListCallback = function (data) {
            $scope.realmList 	   = data.realmList;
            $scope.fetchData();
        };

        $scope.getMobileUserListCallback = function (data) {
            $scope.userList 	   = data.userList;
        };

        $scope.setChangeTopicCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/topicList');
            },500);
        };

        $scope.setRemoveTopicCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/topicList');
            },500);
        };

        $scope.setTopicTopCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/topicList');
            },500);
        };

        $scope.setModiTopicToHotCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/topicList');
            },500);
        };

        $scope.setModiTopicToNormalCallback = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/topicList');
            },500);
        };

        /* board title set */

        /* 参数对象  */
        $scope.params = $stateParams;
        /* get mobilUserList */
        $scope.fetchData = function(){
            TopicFactory.getTopicList(
                $scope.params,
                $scope.getTopicListCallback
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
                isAnonymous	 :  $scope.changeTypes($scope.isAnonymous)
            };
        };
        /* 参数对象  */
        $scope.getParamsR = function(){
            return {
                content	         :	$scope.topicListDetail.expertsReplyOut.content,
                topicId	         :	$scope.topicListDetail.topicId,
                userId	         :	$scope.appUserId || $scope.topicListDetail.userInfo.user.userId,
                ReplyId	         :	$scope.topicListDetail.expertsReplyOut.userid,
                name	         :  $scope.topicListDetail.expertsReplyOut.name
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
        $scope.changeTypes = function (_type_) {
            if (_type_ == 1) {
                return false
            } else {
                return true
            }
        };

        $scope.setChangeTopicInterface = function () {
            TopicFactory.setChangeTopic(
                $scope.getParams(),
                $scope.setChangeTopicCallback
            )
        };
        $scope.insertReply = function () {
            TopicFactory.insertReply(
                $scope.getParamsR(),
                $scope.setChangeTopicCallback
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
                    $scope.setChangeTopicInterface();
                };
            }
        };
        /* 返回数据入口/表单验证  保存专家回复*/
        $scope.submitForms = function (isValid) {
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
                    $scope.insertReply();
                };
            }
        };
        /* 屏蔽话题 */
        $scope.removeTopic = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要屏蔽该话题么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                TopicFactory.setRemoveTopic(
                    {
                        topicId : $scope.topicListDetail.topicId,
                        type : 1
                    },
                    $scope.setRemoveTopicCallback
                )
            };
        };

        /* 删除话题 */
        $scope.deleteTopic = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要彻底删除该话题么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                TopicFactory.setRemoveTopic(
                    {
                        topicId : $scope.topicListDetail.topicId,
                        type : 2
                    },
                    $scope.setRemoveTopicCallback
                )
            };
        };

        /* 加入热门话题 */
        $scope.addHotToPic = function () {
            $scope.alterTitle = "设置热门话题顺序 : ";
            var alertHtml = 'app/views/alert/radio.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.radioType = 1;
            $scope.updateTrue = function (_radioType_) {
                    ModalService.modalHide();
                    TopicFactory.setTopicTop(
                        {
                            topicId: $scope.topicListDetail.topicId,
                            sortType : _radioType_
                        },
                        $scope.setTopicTopCallback
                    )
            };
        };

        /* 移除热门话题 */
        $scope.removeHotToPic = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要取消其热门擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                TopicFactory.setModiTopicToNormal(
                    {
                        topicId : $scope.topicListDetail.topicId
                    },
                    $scope.setModiTopicToNormalCallback
                )
            };
        };

        /* 加入推荐话题 */
        $scope.addRecommend = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要推荐该话题么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                TopicFactory.setModiTopicToHot(
                    {
                        topicId : $scope.topicListDetail.topicId
                    },
                    $scope.setModiTopicToHotCallback
                )
            };
        };
        /* 时间选择控制 */
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


        /* 选择精选话题时间 */
        $scope.choiceFeatureDate = function () {
            $scope.choiceDateTitle = "更新精选";
            var choiceDateHtml = 'app/views/topic/choiceDate.html';
            if(typeof($scope.finalBeginDate.date) != "string") {
                $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
            }
            ModalService.modalSet($scope,choiceDateHtml);
            // 定时更新
            $scope.setIntervalUpdate = function(){
                // 关闭弹出层
                ModalService.modalHide();
                TopicFactory.setIntervalUpdate(
                    {
                        topicId : $scope.topicListDetail.topicId,
                        datetime : (typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDate($scope.finalBeginDate.date):$scope.finalBeginDate.date
                    },
                    $scope.setRemoveTopicCallback
                )
            };
        }

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
        };
    });