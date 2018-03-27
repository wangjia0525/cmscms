/**
 *@description 角色管理的controller 
 */
App
	.controller('roleManageCtrl', function($scope, $cookieStore, RoleFactory, ColumnFactory, mdFactory, ModalService,Notify,CmsSectionFactory) {
		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.roleListCallback = function(data) {
			$scope.loading = false;
			$scope.roleList = data.roleList;
			$scope.dataLength = $scope.roleList.length;
		};
		$scope.delRoleCallback = function() {
			Notify.alert();
			$scope.fetchData();
		};
		$scope.addRoleCallback = function() {
			Notify.alert();
			$scope.fetchData();
		};
		$scope.updateRoleCallback = function() {
			Notify.alert();
			$scope.fetchData();
		};
		
		$scope.addRoleColumnCallback = function() {
			
		};

		/* board title set */
		$scope.title = "角色列表";
		
		
		
		$scope.propertys = [
			{
				_index_:'1',
				property:'管理员'
			},{
				_index_:'2',
				property:'客服'
			},{
				_index_:'3',
				property:'风控'
			}
		]
		
		/* 配置分页参数  */

		/* 获取roleList */
		$scope.fetchData = function() {
			$scope.loading = true;
			RoleFactory.getRoleList(
				{},
				$scope.roleListCallback
			);
		};
		$scope.fetchData();

		/* 添加一个role */
		$scope.addRoleModal = function() {

			$scope.propertyItem = $scope.propertys[0];
			$scope.addRoleTitle = "添加一个角色"
			var templateUrl = 'app/views/role/addRole.html';
			ModalService.modalSet($scope,templateUrl);
			
			$scope.addRole = function(_roleName_, _roleInfo_,_propertyItem_) {
				$scope.getAddRoleParams = function() {
					return {
						name		: _roleName_,
						introduce	: _roleInfo_,
						property	: _propertyItem_._index_
					}
				};

				ModalService.modalHide();

				RoleFactory.setAddRole(
					$scope.getAddRoleParams(),
					$scope.addRoleCallback
				);
			};
		};
		/* update一个role */
		$scope.updateRoleModal = function(_roleId_, _roleName_, _roleInfo_,_property_) {
			
			

			$scope.updateRoleTitle = "更改一个角色"
			var templateUrl =  'app/views/role/updateRole.html';
			ModalService.modalSet($scope,templateUrl);

			$scope.updateRoleName = _roleName_;
			$scope.updateRoleInfo = _roleInfo_;
			$scope.propertyItem	  = $scope.propertys[_property_-1];
			$scope.updateRole = function(_updateRoleName_, _updateRoleInfo_,_propertyItem_) {
				ModalService.modalHide();

				RoleFactory.setUpdateRole({
					roleId:_roleId_,
					name: _updateRoleName_,
					introduce: _updateRoleInfo_,
					property: _propertyItem_._index_
				}, $scope.updateRoleCallback);
			};
		};
		/* 删除一个role */
		$scope.delRole = function(_roleId_) {
			$scope.modal_title_with_btn = "<i class='icon-warning-sign ' ></i> 角色删除确认!";
			$scope.modal_content_with_btn = "确认删除这个角色？";
			var templateUrl = 'app/js/directives/modal/modal_btn.html';
			ModalService.modalSet($scope,templateUrl);
			$scope.sure = function() {
				ModalService.modalHide();
				RoleFactory.setDelRole({
					roleId: _roleId_
				}, $scope.delRoleCallback);
			};
		};
		/* 给角色配置栏目 */
		$scope.configColumnToRoleModal = function(_roleId_) {

			/* 配置角色之前，先请求拿到所有的栏目 */
			$scope.columnListCallback = function(data) {
				var _columns_ = $scope.theRoleColumnListed;
				$scope.columnList = data.columnList;
				/* columnist被标记哪个是被选上的 */
				$scope.selectedColumn = function(_columnList_) {
					for (var i = 0, l = _columns_.length; i < l; i++) {
						for (var j = 0, m = _columnList_.length; j < m; j++) {
							if (_columns_[i].columnId == _columnList_[j].columnId) {
								_columnList_[j].selectStatus = true;
							}
							if (_columnList_[j].children) {
								$scope.selectedColumn(_columnList_[j].children);
							}
						}
					}
					return _columnList_;
				};
				$scope.columnListed = $scope.selectedColumn($scope.columnList);
				$scope.expandedNodes = [$scope.columnListed[0]];
			};
			$scope.columnListEdCallback = function(data) {
				$scope.theRoleColumnListed = data.roleColumnList;
				/* 请求接口获取栏目列表 */
				$scope.getColumnList();
			};
			/* 请求接口时加参数roleId，只请求该角色下的栏目 */
			$scope.getColumnListEd = function() {
				RoleFactory.getColumnListEd({
						roleId: _roleId_
					},
					$scope.columnListEdCallback);
			};
			
			$scope.getColumnListEd();

			$scope.getColumnList = function() {
				ColumnFactory.getColumnList({},
					$scope.columnListCallback
				);
			};
			
			$scope.showPowerSelected = function(_node_) {
				$scope.theNodeSelected = _node_;
				var flag = false;
				for (var i = 0,l = $scope.theRoleColumnListed.length;i<l; i++) {
					if (_node_.columnId == $scope.theRoleColumnListed[i].columnId) {
						$scope.powers = {
							create: $scope.theRoleColumnListed[i].createAuthority,
							delete: $scope.theRoleColumnListed[i].deleteAuthority,
							update: $scope.theRoleColumnListed[i].updateAuthority,
							select: $scope.theRoleColumnListed[i].selectAuthority,
							download: $scope.theRoleColumnListed[i].downloadAuthority
						};
						flag = true;
					};
				};
				if(!flag){
					$scope.powers = {
						create:false,
						delete: false,
						update: false,
						select:false,
						download:false
					}
				};
			};
			/* 点击修改权限 */
			$scope.changePower = function(){
				$scope.flag = false;
				for (var i = 0,l=$scope.theRoleColumnListed.length;i<l;i++) {
					if ($scope.theNodeSelected.columnId == $scope.theRoleColumnListed[i].columnId) {
						$scope.theRoleColumnListed[i].createAuthority = $scope.powers.create,
						$scope.theRoleColumnListed[i].deleteAuthority = $scope.powers.delete,
						$scope.theRoleColumnListed[i].updateAuthority = $scope.powers.update,
						$scope.theRoleColumnListed[i].selectAuthority = $scope.powers.select,
						$scope.theRoleColumnListed[i].downloadAuthority = $scope.powers.download
						$scope.flag = true;
					}
				};
				if (!$scope.flag) {
					$scope.powers.columnId = $scope.theNodeSelected.columnId;
					var nodeSelected = {
						columnId:$scope.theNodeSelected.columnId,
						createAuthority : $scope.powers.create,
						deleteAuthority : $scope.powers.delete,
						updateAuthority : $scope.powers.update,
						selectAuthority : $scope.powers.select,
						downloadAuthority : $scope.powers.download
					}
					$scope.theRoleColumnListed.push(nodeSelected);
				};
			};

			/* 配置tree	*/
			$scope.treeOptions = mdFactory.getTreeOptions();

			$scope.configColumnToRoleTitle = "给角色配置栏目权限";
			var templateUrl = 'app/views/role/configColumnToRole.html';
			ModalService.modalSet($scope,templateUrl);
			$scope.$on('selectChange', function(event, _obj_) {
				event.preventDefault();
				var _status_ = _obj_.status;
				var _columnObj_ = _obj_.obj;
				if (_status_) {
					var nodeSelected = {
						columnId:_columnObj_.columnId,
						createAuthority : false,
						deleteAuthority : false,
						updateAuthority : false,
						selectAuthority : false,
						downloadAuthority : false
					};
					$scope.theRoleColumnListed.push(nodeSelected);
				} else {
					for (var i = 0,l=$scope.theRoleColumnListed.length;i<l;i++) {
						if (_columnObj_.columnId == $scope.theRoleColumnListed[i].columnId) {
							$scope.theRoleColumnListed.splice(i,1);
							return;
						}
					};
				};
			});
			$scope.configColumnToRole = function(){
				ModalService.modalHide();
				
				var columnIdtmp = []; //一个新的临时数组
				var theRoleColumnListed = [];
				for(var i = 0; i < $scope.theRoleColumnListed.length; i++) //遍历当前数组
				{
					if (columnIdtmp.indexOf($scope.theRoleColumnListed[i].columnId) == -1){
						columnIdtmp.push($scope.theRoleColumnListed[i].columnId);
						theRoleColumnListed.push($scope.theRoleColumnListed[i]);
					}
				}
				RoleFactory.setAddRoleColumn({
					roleColumnList: JSON.stringify(theRoleColumnListed),
					roleId:_roleId_
				},
					$scope.addRoleColumnCallback
				)
			};
		};

		/* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
		$scope.dataChange = function() {
			$scope.fetchData();
		};
	});