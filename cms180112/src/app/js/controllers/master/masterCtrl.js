/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('masterCtrl', function ($scope, $http, $cookieStore, MobileUserFactory, Notify, OtherFactory, mdFactory, ModalService, FieldFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getMarketingUserListCallback = function (data) {
            console.log(data)
            $scope.loading=false;
            $scope.mobileUserList = data.userList;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength = data.totalCount;
            $scope.endSize=($scope.turnPage.currentPage-1)*10+1;
            $cookieStore.put('myapp.MarketingUserList.searches', $scope.getParams());
        };

        $scope.realmListCallback = function (data) {
            $scope.realmList = data.realmList;
            $scope.getFieldList($scope.realmList);
            $scope.getCookie();
            $scope.fetchData();
        };

        $scope.setAddMarketingUserCallblack = function () {
            Notify.alert();
            $scope.fetchData();
        };

        $scope.setModiMarketingUserSortCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        $scope.setModiMarketingUserToTopCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        /* board title set */
        $scope.title = "用户列表";
        $scope.fieldSelectName = "领域";
        $scope.searchplaceholder = "姓名／手机号／幸会号／公司名称";

        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        $scope.getCookie = function () {
            if ($cookieStore.get('myapp.MarketingUserList.searches')) {
                $scope.turnPage.currentPage = $cookieStore.get('myapp.MarketingUserList.searches').page;
                $scope.fieldSelectValue = $scope.realmList[$cookieStore.get('myapp.MarketingUserList.searches').fieldTypes];
                $scope.searchKey = $cookieStore.get('myapp.MarketingUserList.searches').searchKey;
            } else {
                $scope.searchKey = "";
                $scope.fieldSelectValue = $scope.realmList[0];
            }
        };

        /* 参数对象  */
        $scope.getParams = function () {
            return {
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                searchKey: $scope.searchKey,
                realmId: $scope.fieldSelectValue.realmId,
                fieldTypes: $scope.fieldSelectValue._index_
            };
        };


        $scope.field = function () {
            FieldFactory.getRealmList(
                {
                    size		:	1000,
                    page		:	1
                },
                $scope.realmListCallback
            );
        };
        $scope.field();
        /* 获取mobileUser List */
        $scope.fetchData = function () {
            console.log($scope.getParams())
            $scope.loading=true;
            MobileUserFactory.getMarketingUserList(
                $scope.getParams(),
                $scope.getMarketingUserListCallback
            );
        };
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.publicChange = function () {
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };
        $scope.dataChange = function () {
            $scope.publicChange();
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.publicChange();
            }
        };
        $scope.sortEvent = function(e,sort,userId,sortTarget){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                MobileUserFactory.setModiMarketingUserSortforsortEvent(
                    {
                        appUserId: userId,
                        sort: sort,
                        sortTarget:sortTarget.sortTarget
                    },
                    $scope.setModiMarketingUserSortCallback
                );
            }
        };
        /* 领域列表的处理 */
        $scope.getFieldList = function (_list_) {
            _list_.unshift({
                "realmId": 0,
                "name": "全部",
                "type": "0"
            });
            for (var i = 0; i < _list_.length; i++) {
                _list_[i]._index_ = i;
            }
        };
        /* 删除营销达人 */
        $scope.removeMasterList = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要删除该营销达人么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope, alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                MobileUserFactory.setDeleteMarketingUser(
                    {
                        appUserId: _id_
                    },
                    $scope.setAddMarketingUserCallblack
                )
            }
        };
        /*排序*/
        $scope.fnSort = function (_id_, _num_) {
            MobileUserFactory.setModiMarketingUserSort(
                {
                    appUserId: _id_,
                    direction: _num_
                },
                $scope.setModiMarketingUserSortCallback
            );
        };
        /* 置顶 */
        $scope.fnToTop = function (_id_) {
            MobileUserFactory.setModiMarketingUserToTop(
                {
                    appUserId: _id_
                },
                $scope.setModiMarketingUserToTopCallback
            );
        };
    });