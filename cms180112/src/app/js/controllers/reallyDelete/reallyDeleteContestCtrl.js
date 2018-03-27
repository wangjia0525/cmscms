

App
    .controller('reallyDeleteContestCtrl', function($scope,$http,$cookieStore,ContestFactory,Notify,MobileUserFactory,$timeout,ModalService,FieldFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getContestListCallback = function(data){
            $scope.loading = false;
            $scope.topicList 		   = data.topicList;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $scope.newTopicCount		   = data.newTopicCount;
            $scope.newTopicFavoriteCount		   = data.newTopicFavoriteCount;
            $cookieStore.put('myapp.deleteContesecookie.searches',$scope.getParams());
        };

        $scope.realmListCallback = function (data) {
            $scope.realmList 	   = data.realmList;
            $scope.getFieldList($scope.realmList);
            $scope.getCookie();
            $scope.fetchData();
        };

        $scope.setRemoveTopicCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        $scope.getMobileUserListCallback = function (data) {
            $scope.userList 	   = data.userList;
        };
        /* board title set */
        $scope.title = "参数文案列表";
        $scope.searchplaceholder="关键字";
        /* select set */
        $scope.userSelectName = "用户名";
        $scope.titleSelectName = "标题";
        $scope.fieldSearch = "领域";
        $scope.sortTypeSearch = "排序方式";
        $scope.sortTypes = [
            {_index_: 0, _value_: "时间从远到近", "sortType":1},
            {_index_: 1, _value_: "时间从近到远", "sortType":2}
        ];


        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        $scope.getCookie = function () {
            if ($cookieStore.get('myapp.deleteContesecookie.searches')) {
                $scope.turnPage.currentPage = $cookieStore.get('myapp.deleteContesecookie.searches').page;
                $scope.fieldSelectValue = $scope.realmList[$cookieStore.get('myapp.deleteContesecookie.searches').fieldTypes];
                $scope.sortSelectValue = $scope.sortTypes[$cookieStore.get('myapp.deleteContesecookie.searches').sortTypes];
                $scope.searchKey = $cookieStore.get('myapp.deleteContesecookie.searches').searchKey;
            } else{
                $scope.searchKey = "";
                $scope.fieldSelectValue = $scope.realmList[0];
                $scope.sortSelectValue = $scope.sortTypes[0];
            }
        };


        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage,
                searchKey	:	$scope.searchKey,
                searchUserId	:	$scope.appUserId,
                sortType         :	$scope.sortSelectValue.sortType,
                sortTypes        :	$scope.sortSelectValue._index_,
                realmId          :	$scope.fieldSelectValue.realmId,
                fieldTypes       :	$scope.fieldSelectValue._index_,
                type             :  4
            }
        };

        /* 获取topicList */
        $scope.fetchData = function(){
            $scope.loading = true;
            ContestFactory.getContestList(
                $scope.getParams(),
                $scope.getContestListCallback
            );
        };
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function(){
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
            $scope.fetchData();
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                    $scope.numPages,
                    $scope.turnPage.itemsPerPage,
                    $scope.turnPage.totalItems);
                $scope.fetchData();
            }
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
        /* 领域列表的处理 */
        $scope.getFieldList = function(_list_){
            _list_.unshift({
                "realmId" : 0,
                "name"	: "全部",
                "type" : "0"
            });
            for(var i=0;i<_list_.length;i++){
                _list_[i]._index_=i;
            }
        };
        /* 删除话题 */
        $scope.deleteTopic = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要彻底删除该擂台么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                ContestFactory.setRemoveTopic(
                    {
                        topicId : _id_,
                        type : 2
                    },
                    $scope.setRemoveTopicCallback
                )
            };
        };

        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey : $scope.userSearchKey,
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
            $scope.userSearchKey = _name_;
            $scope.appUserId = _id_;
            $scope.fetchData();
        };
        $scope.hideUl = function () {
            $timeout(function(){
                $scope.userType = false
            },100);
        }
    });