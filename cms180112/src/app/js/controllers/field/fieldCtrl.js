/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('fieldCtrl', function ($scope, $http, $cookieStore, Notify, FieldFactory, ModalService, mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.realmListCallback = function (data) {
            console.log(data)
            $scope.loading = false;
            $scope.realmList = data.realmList;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength = data.totalCount;
            $cookieStore.put('myapp.fieldList.searches', $scope.getParams());
        };

        $scope.realmListAllCallback = function (data) {
            $scope.realmListAll = data.realmList;
        };

        $scope.addFieldTrueCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };
        $scope.fieldDetailTrueCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };
        $scope.moveFieldTrueCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        /* board title set */
        $scope.title = "用户列表";
        $scope.searchplaceholder = "领域名称";
        $scope.fieldNameSearch = "领域 : ";


        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.fieldList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.fieldList.searches').page;
            $scope.searchKey = $cookieStore.get('myapp.fieldList.searches').searchKey;
        } else {
            $scope.searchKey = ''
        }

        /* 参数对象  */
        $scope.getParams = function () {
            return {
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                searchKey: $scope.searchKey
            };
        };


        /* 获取field List */
        $scope.fetchData = function () {
            $scope.loading = true;
            FieldFactory.getRealmList(
                $scope.getParams(),
                $scope.realmListCallback
            );
        };
        $scope.fetchData();

        /* 获取全部的field List */
        $scope.fetchDataAll = function () {
            $scope.loading = true;
            FieldFactory.getRealmList(
                {
                    page: 1,
                    size: 1000
                },
                $scope.realmListAllCallback
            );
        };
        $scope.fetchDataAll();
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function () {
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.fetchData();
                $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                    $scope.numPages,
                    $scope.turnPage.itemsPerPage,
                    $scope.turnPage.totalItems);
            }
        };
        /* 添加一个field */
        $scope.addFieldModal = function () {

            $scope.addFieldTitle = "添加一个领域";
            var templateUrl = 'app/views/field/addField.html';
            ModalService.modalSet($scope, templateUrl);

            $scope.addFieldTrue = function (_addFieldName_) {
                if (_addFieldName_) {
                    ModalService.modalHide();

                    FieldFactory.setAddRealm({
                        name: _addFieldName_
                    }, $scope.addFieldTrueCallback);
                } else {
                    alert("输入不能为空");
                }

            };
        };

        /* 修改field */
        $scope.FieldDetail = function (_realmId_, _name_) {

            $scope.fieldDetailTitle = "修改领域";
            var templateUrl = 'app/views/field/fieldDetail.html';
            ModalService.modalSet($scope, templateUrl);
            $scope.fieldName = _name_;
            $scope.fieldDetailTrue = function (_fieldName_) {
                if (_fieldName_) {
                    ModalService.modalHide();

                    FieldFactory.setModiRealm({
                        realmId: _realmId_,
                        name: _fieldName_
                    }, $scope.fieldDetailTrueCallback);
                } else {
                    alert("输入不能为空");
                }
            };
        };

        /* 删除field */
        $scope.closeField = function (_id_) {

            $scope.moveFieldTitle = "将该领域下的内容转移到";
            var templateUrl = 'app/views/field/moveField.html';
            ModalService.modalSet($scope, templateUrl);

            $scope.moveFieldTrue = function (_moveFieldName_) {
                ModalService.modalHide();

                FieldFactory.setTransferAndDeleteRealm({
                    realmId: _id_,
                    transferRealmId: _moveFieldName_
                }, $scope.moveFieldTrueCallback);
            };
        };
    });