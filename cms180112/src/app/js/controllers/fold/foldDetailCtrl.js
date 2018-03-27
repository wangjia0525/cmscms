

App
    .controller('foldDetailCtrl', function($scope,$rootScope,$http,$stateParams,$location,$timeout,ModalService,$cookieStore,FoldFactory,Notify,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getTopicEvaluateListCallback = function(data){
            $scope.topicEvaluateList 	= data.topicEvaluateList;
            $scope.getFoldDetail($scope.topicEvaluateList);
        };

        $scope.setModiTopicEvaluateToFoldCallback = function(){
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/fold');
            },500);
        };

        $scope.setModiTopicEvaluateToNormalCallback = function(){
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/fold');
            },500);
        };

        /* board title set */

        /* 参数对象  */
        $scope.params = $stateParams;
        /* 获取mobileUser List */
        $scope.fetchData = function(){
            FoldFactory.getTopicEvaluateList(
                $scope.params,
                $scope.getTopicEvaluateListCallback
            );
        };
        $scope.fetchData();
        /* 数据匹配 */
        $scope.getFoldDetail = function(_epmtInfoList_){
            for (var i = 0; i < _epmtInfoList_.length; i++) {
                if($stateParams.topicEvaluateId == _epmtInfoList_[i].topicEvaluateId){
                    $scope.foldDetail = _epmtInfoList_[i];
                    return;
                }
            }
        };
        /* 折叠 */
        $scope.foldTrue = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认折叠么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                FoldFactory.setModiTopicEvaluateToNormal(
                    {
                        topicEvaluateId: $scope.foldDetail.topicEvaluateId
                    },
                    $scope.setModiTopicEvaluateToNormalCallback
                )
            }
        };

        /* 不折叠 */
        $scope.foldFalse = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认不折叠么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                FoldFactory.setModiTopicEvaluateToFold(
                    {
                        topicEvaluateId: $scope.foldDetail.topicEvaluateId
                    },
                    $scope.setModiTopicEvaluateToFoldCallback
                )
            }
        }
    });