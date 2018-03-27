
/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('foldCtrl', function($scope,$http,$cookieStore,FoldFactory,Notify,mdFactory,ModalService) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getTopicEvaluateListCallback = function(data){
            $scope.loading = false;
            $scope.topicEvaluateList 	   = data.topicEvaluateList;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.foldManage.searches',$scope.getParams());
        };

        $scope.setModiTopicEvaluateToFoldCallback = function(){
            Notify.alert();
            $scope.fetchData();
        };

        $scope.setModiTopicEvaluateToNormalCallback = function(){
            Notify.alert();
            $scope.fetchData();
        };

        /* board title set */
        $scope.title = "用户列表";
        $scope.sortSelect="排序方式";

        $scope.foldType = [
            {_index_: 0, _value_: "没有帮助次数由多到少",type:1},
            {_index_: 1, _value_: "没有帮助次数由少到多",type:2}
        ];
        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.foldManage.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.foldManage.searches').page;
            $scope.foldSelectValue = $scope.foldType[$cookieStore.get('myapp.foldManage.searches').foldTypes];
        } else{
            $scope.foldSelectValue = $scope.foldType[0]
        }

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage,
                foldTypes	:	$scope.foldSelectValue._index_,
                sortType	:	$scope.foldSelectValue.type
            };
        };


        /* 获取mobileUser List */
        $scope.fetchData = function(){
            $scope.loading = true;
            FoldFactory.getTopicEvaluateList(
                $scope.getParams(),
                $scope.getTopicEvaluateListCallback
            );
        };
        $scope.fetchData();
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function(){
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };

        /* 折叠 */
        $scope.foldTrue = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认折叠么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                FoldFactory.setModiTopicEvaluateToFold(
                    {
                        topicEvaluateId: _id_
                    },
                    $scope.setModiTopicEvaluateToFoldCallback
                )

            }
        };

        /* 不折叠 */
        $scope.foldFalse = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认不折叠么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                FoldFactory.setModiTopicEvaluateToNormal(
                    {
                        topicEvaluateId: _id_
                    },
                    $scope.setModiTopicEvaluateToNormalCallback
                )
            }
        }
    });