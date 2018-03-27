
/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('sensitiveCtrl', function($scope,$http,$cookieStore,Notify,SensitiveFactory,ModalService) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getModiAllDirtywordsCallback = function(data){
           $scope.sensitiveList=data.dirtywordsList;
            $scope.findNames($scope.sensitiveList);
        };

        $scope.getDirtywordsListCallblack = function () {
            Notify.alert();
            $scope.onOff = false;
            $scope.fetchData();
        };

        /* 获取sensitive List */
        $scope.fetchData = function(){
            SensitiveFactory.getModiAllDirtywords(
                {},
                $scope.getModiAllDirtywordsCallback
            );
        };
        $scope.fetchData();

        $scope.setPrams = function () {
            return {
                dirtywords:$scope.sensitiveList
            }
        };

        $scope.findNames = function (arr) {
            var senString="";
            for(var i =0; i<arr.length; i++){
                senString += arr[i].word+"\n"
            }
            return $scope.sensitiveList = senString;
        };

        $scope.sensitiveTrue = function () {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要变更敏感词列表么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                console.log($scope.setPrams());
                ModalService.modalHide();
                SensitiveFactory.getDirtywordsList(
                    $scope.setPrams(),
                    $scope.getDirtywordsListCallblack
                )
            }
        }
    });
