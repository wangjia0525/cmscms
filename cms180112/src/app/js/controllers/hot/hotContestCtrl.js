

App
    .controller('hotContestCtrl', function($scope,$http,Notify,$cookieStore,ModalService,ContestFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getContestListCallback = function(data){
            $scope.loading = false;
            $scope.topicList 		   = data.topicList;
            //noinspection JSUnresolvedVariable
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.hotContestList.searches',$scope.getParams());
        };

        $scope.setContestSortCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        $scope.setModiTopicToNormalCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };


        /* select set */
        $scope.fieldSearch = "领域";
        $scope.sortTypeSearch = "排序";
        $scope.realmList = [
            {_index_: 0, _value_: "全部领域", type:1},
            {_index_: 1, _value_: "关注领域", type:2}
        ];


        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.hotContestList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.hotContestList.searches').page;
            $scope.fieldSelectValue = $scope.realmList[$cookieStore.get('myapp.hotContestList.searches').fieldTypes];
        } else{
            $scope.fieldSelectValue = $scope.realmList[0];
        }

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage,
                type		:   $scope.fieldSelectValue.type,
                fieldTypes		:   $scope.fieldSelectValue._index_
            }
        };

        /* 获取contestList */
        $scope.fetchData = function(){
            $scope.loading = true;
            ContestFactory.getContestList(
                $scope.getParams(),
                $scope.getContestListCallback
            );
        };
        $scope.fetchData();
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function(){
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
            $scope.fetchData();
        };

        /* 排序 */
        $scope.fnSort = function (_id_,_num_) {
            ContestFactory.setContestSort(
                {
                    topicId: _id_,
                    direction: _num_.index
                },
                $scope.setContestSortCallback
            )
        };
        /* 插队 */
        $scope.fnSortNum = function (_id_,_num_,_len_) {
            $scope.sortTitle = "插队操作";
            $scope.nowSortNum = _num_;
            $scope.numSelectValue = $scope.createArr(_len_);
            var alertHtml = 'app/views/alert/sortNum.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function (num) {
                ModalService.modalHide();
                ContestFactory.setContestSort(
                    {
                        topicId : _id_,
                        sortNum : num.index
                    },
                    $scope.setContestSortCallback
                )
            };
        };
        /* 生产数组 */
        $scope.createArr = function (_n_) {
            var arr = [];
            for(var i=0;i<_n_;i++){
                arr.push({index:i+1})
            }
            return arr
        };

        /* 移除热门擂台 */
        $scope.removeHotContest = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要取消其热门擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                ContestFactory.setModiTopicToNormal(
                    {
                        topicId : _id_
                    },
                    $scope.setModiTopicToNormalCallback
                )
            };
        };
    });