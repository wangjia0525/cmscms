/**
 *@description CMS部门管理的controller
 */
App
    .controller('cmsSectionManageCtrl', function ($scope, $http, $cookieStore, CmsSectionFactory, ModalService, mdFactory,Notify) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.cmsSectionListCallback = function (data) {
            $scope.loading = false;
            $scope.cmsSectionList = data.sectionList;
            $scope.dataLength = data.totalCount;
            $scope.turnPage.totalItems = data.totalCount;
            $cookieStore.put('myapp.cmsSectionList.searches', $scope.getParams());
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };
        $scope.delCmsSectionCallback = function () {
        	Notify.alert();
            $scope.fetchData();
        };
        $scope.addCmsSectionCallback = function () {
        	Notify.alert();
            $scope.fetchData();
        };
        $scope.updateCmsSectionCallback = function () {
        	Notify.alert();
            $scope.fetchData();
        };

        /* board title set */
        $scope.title = "CMS用户列表";
        $scope.searchplaceholder = "用户名、ID";
        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();

        /* 参数对象  */
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.cmsSectionList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.cmsSectionList.searches').page;
            $scope.searchKey = $cookieStore.get('myapp.cmsSectionList.searches').searchKey;
        } else {
            $scope.searchKey = "";
            
        }

        $scope.getParams = function () {
            return {
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                searchKey: $scope.searchKey
            }
        };

        /* 获取sectionList */
        $scope.fetchData = function () {
            $scope.loading = true;
            CmsSectionFactory.getCmsSectionList(
                $scope.getParams(),
                $scope.cmsSectionListCallback
            );
        };
        $scope.fetchData();

        /* 添加一个section */
        $scope.addCmsSectionModal = function () {
            $scope.addSectionTitle = "添加一个部门";
            var templateUrl = 'app/views/cmsSection/addCmsSection.html';
            ModalService.modalSet($scope, templateUrl);
            $scope.addCmsSection = function (_cmsSectionName_, _sectionInfo_) {
                ModalService.modalHide();
                CmsSectionFactory.setAddCmsSection({
                    name		: _cmsSectionName_,
                    introduce	: _sectionInfo_
                }, $scope.addCmsSectionCallback);
            };
        };
        /* update一个section */
        $scope.updateCmsSectionModal = function (_cmsSectionId_, _cmsSectionName_,_sectionInfo_) {
            $scope.updateCmsSectionTitle = "更改一个部门信息";
            var templateUrl = 'app/views/cmsSection/updateCmsSection.html';
            ModalService.modalSet($scope, templateUrl);

            $scope.updateSectionName = _cmsSectionName_;
            $scope.updateSectionInfo = _sectionInfo_;
            $scope.updateCmsSection = function (_updateSectionName_, _updateSectionInfo_) {

                ModalService.modalHide();

                CmsSectionFactory.setUpdateCmsSection({
                    sectionId: _cmsSectionId_,
                    name: _updateSectionName_,
                    introduce: _updateSectionInfo_
                }, $scope.updateCmsSectionCallback);
            };
        };
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function () {
            $scope.fetchData();
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.fetchData();
            }
        };
    });