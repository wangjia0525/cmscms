/**
 *@description CMS用户管理的controller
 */
App
    .controller('cmsUserManageCtrl', function ($scope,$rootScope, $http, $cookieStore, RoleFactory, CmsUserFactory, ModalService,CmsSectionFactory, mdFactory,Notify) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.cmsUserListCallback = function (data) {
            $scope.loading = false;
            $scope.cmsUserList = data.userList;
            $scope.dataLength = data.totalCount;
            $scope.turnPage.totalItems = data.totalCount;
            $cookieStore.put('myapp.cmsUserList.searches', $scope.getParams());
            $scope.turnPage.currentPage = $scope.getParams().page;
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };
        $scope.delCmsUserCallback = function () {
        	Notify.alert();
            $scope.fetchData();
        };
        $scope.addCmsUserCallback = function () {
        	Notify.alert();
            $scope.fetchData();
        };
        $scope.updateCmsUserCallback = function () {
        	Notify.alert();
            $scope.fetchData();
        };
        $scope.addCmsUserRoleCallback = function () {
        	Notify.alert();
        };
        $scope.delCmsUserRoleCallback = function () {
			//Notify.alert();
        };

        /* board title set */
        $scope.title = "CMS用户列表";
        $scope.searchplaceholder = "用户名、ID";
        
       var cmsSectionListCallback = function(data){
            var  cmsSectionList = data.sectionList
            cmsSectionList.unshift({
            	sectionId:0,
            	name:'全部'
            })
			$scope.rootSections =cmsSectionList;
			$scope.rootSection = mdFactory.getSection($scope.rootSections,$rootScope.rootSectionId);
			$scope.fetchData();
		}
		/* 获取sectionList */
        var getCmsSections = function () {
            CmsSectionFactory.getCmsSectionList(
                {},
               cmsSectionListCallback
            );
        };
        getCmsSections();
        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();

        /* 参数对象  */
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.cmsUserList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.cmsUserList.searches').page;
            $scope.searchKey = $cookieStore.get('myapp.cmsUserList.searches').searchKey;
        } else {
            $scope.searchKey = "";
            
        }
        
        /* 为给用户配置部门，要拉取部门列表*/
		
		$scope.cmsSectionCallback = function(data) {
			$scope.sections = data.sectionList;
			$scope.getSectionBySectionId = function(_sectionId_){
				for (var i=0,l = $scope.sections.length;i<l;i++) {
					if ($scope.sections[i].sectionId == _sectionId_) {
						return $scope.sections[i];
					}
				}
			};
		};
		$scope.getCmsSectionList = function() {
			CmsSectionFactory.getCmsSectionList({}, $scope.cmsSectionCallback);
		};
		$scope.getCmsSectionList();

        $scope.getParams = function () {
            return {
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                searchKey: $scope.searchKey,
                sectionId:$scope.rootSection.sectionId
            }
        };

        /* 获取userList */
        $scope.fetchData = function () {
            $scope.loading = true;
            CmsUserFactory.getCmsUserList(
                $scope.getParams(),
                $scope.cmsUserListCallback
            );
        };

        /* 添加一个user */
        $scope.addCmsUserModal = function () {
        	$scope.sectionItem = $scope.sections[0];
            $scope.addUserTitle = "添加一个用户";
            var templateUrl = 'app/views/cmsUser/addCmsUser.html';
            ModalService.modalSet($scope, templateUrl);
            $scope.addCmsUser = function (_cmsUserName_, _userPwd_,_section_) {
                ModalService.modalHide();
                CmsUserFactory.setAddCmsUser({
                    name: _cmsUserName_,
                    password: mdFactory.setMd5(_userPwd_),
                    userSectionId:_section_.sectionId
                }, $scope.addCmsUserCallback);
            };
        };
        /* update一个user */
        $scope.updateCmsUserModal = function (_cmsUserId_, _cmsUserName_,_sectionId_) {

            $scope.updateCmsUserTitle = "更改一个用户信息";
            var templateUrl = 'app/views/cmsUser/updateCmsUser.html';
            ModalService.modalSet($scope, templateUrl);

            $scope.updateUserName = _cmsUserName_;
            $scope.sectionItem	  = $scope.getSectionBySectionId(_sectionId_);
            $scope.updateCmsUser = function (_updateUserName_, _updateUserPwd_,_section_) {

                ModalService.modalHide();

                CmsUserFactory.setUpdateCmsUser({
                    modiUserId: _cmsUserId_,
                    name: _updateUserName_,
                    password: mdFactory.setMd5(_updateUserPwd_),
                    userSectionId:_section_.sectionId
                }, $scope.updateCmsUserCallback);
            };
        };
        /* 删除一个user */
        $scope.delCmsUser = function (_cmsUserId_) {
            $scope.modal_title_with_btn = "<i class='icon-warning-sign ' ></i> 用户删除确认!";
            $scope.modal_content_with_btn = "确认删除这个用户？";
            var templateUrl = 'app/js/directives/modal/modal_btn.html';
            ModalService.modalSet($scope, templateUrl);

            $scope.sure = function () {
                ModalService.modalHide();
                CmsUserFactory.setDelCmsUser({
                    deleteUserId: _cmsUserId_
                }, $scope.delCmsUserCallback);
            };
        };
        /* config Role To User */
        $scope.configRoleToCmsUserModal = function (_cmsUserId_, _roles_) {

            /* 配置角色之前，先请求接口拿到所有的角色 */
            $scope.roleListCallback = function (data) {
                $scope.roleList = data.roleList;
                /* roleList被标记哪个是被选上的 */
                for (var i = 0, l = _roles_.length; i < l; i++) {
                    for (var j = 0, m = $scope.roleList.length; j < m; j++) {
                        if (_roles_[i].roleId == $scope.roleList[j].roleId) {
                            $scope.roleIded = $scope.roleList[j].roleId;
                            $scope.initRoleId = $scope.roleIded;
                        }
                    }
                }
                $scope.roleListed = $scope.roleList;
            };
            $scope.getRoleList = function () {
                RoleFactory.getRoleList(
                    {},
                    $scope.roleListCallback
                );
            };
            /* 请求接口获取角色列表 */
            $scope.getRoleList();

            $scope.configRoleToUserTitle = "给用户配置角色";
            var templateUrl = 'app/views/cmsUser/configRoleToCmsUser.html';
            ModalService.modalSet($scope, templateUrl);
            /*该方法的逻辑为：将最初被选中的角色先赋给intiRoleId,之后当用户选择一个角色时，
             * 将此角色ID与initRoleId比较，若相等就返回。若不相等，就执行操作，并将新的角色ID赋给initRoleId
             */

            $scope.selectTheRole = function (_roleIded_) {

                if ($scope.initRoleId == _roleIded_) {
                    return false;
                } else {
                    if ($scope.initRoleId) {

                        CmsUserFactory.setDelCmsUserRole(
                            {
                                deleteUserId: _cmsUserId_,
                                roleId: $scope.initRoleId
                            }, $scope.delCmsUserRoleCallback
                        );
                    }
                    CmsUserFactory.setAddCmsUserRole(
                        {
                            insertUserId: _cmsUserId_,
                            roleId: _roleIded_
                        }, $scope.addCmsUserRoleCallback
                    );
                    $scope.initRoleId = _roleIded_;
                }
            };

            $scope.fetchDataAHideModal = function () {
                $scope.fetchData();
                ModalService.modalHide();
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