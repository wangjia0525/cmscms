/**
 *@description 角色管理的controller 
 */
App
  	.controller('columnManageCtrl', function($scope,$http,$rootScope,$cookieStore,$cookies,ColumnFactory,InterfaceFactory, mdFactory,ModalService,Notify) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.columnListCallback = function(data){
			$scope.loading = false;
			$scope.columnList  = data.columnList;
			$scope.selected = $scope.columnList[0];
			$scope.expandedNodes = [$scope.columnList[0]];
			
			$scope.showSelected($scope.selected);
		};
		$scope.updateColumnCallback = function(){
			Notify.alert();
			$scope.fetchData();
		};
		$scope.addColumnCallback = function(){
			Notify.alert();
		 	$scope.fetchData();
		};
		$scope.delColumnCallback = function(){
			Notify.alert();
		 	$scope.fetchData();
		};
		$scope.addColumnInterfaceCallback = function(){
		};
		$scope.delColumnInterfaceCallback = function(){
		};
		
		/* board title set */
		$scope.title = "栏目列表";
		$scope.treeOptions = mdFactory.getTreeOptions();
		
		
		$scope.showSelected = function(sel) {
			$scope.selectedColumn = sel;
	        $scope.columnTittle = sel.name;
	        $scope.childColumn = sel.children;
	    };
		/* 获取columnList */
		$scope.fetchData = function(){
			$scope.loading = true;
			ColumnFactory.getColumnList(
				{
					selectUserId:$rootScope.$session.getItem('cmsuserId')
				},$scope.columnListCallback
			);
		};
		$scope.fetchData();
		
		/* 添加一个column */
		$scope.addColumnModal = function(_parentId_,_parentlevel_){
			$scope.addColumnTitle = "添加一个子菜单"
			var templateUrl = 'app/views/column/addColumn.html';
			ModalService.modalSet($scope,templateUrl)
			$scope.addColumn = function(_columnName_,_columnUrl_,_columnPrompt_,_columnIcon_){
				
				ModalService.modalHide();
				
				ColumnFactory.setAddColumn({
					name:_columnName_,
					url:_columnUrl_,
					prompt:_columnPrompt_,
					icon:_columnIcon_,
					parentsId:_parentId_,
					level:_parentlevel_+1
				}, $scope.addColumnCallback);
			};
		};
		
		/* update一个column */
		$scope.updateColumnModal = function(_columnId_,_name_,_url_,_icon_,_prompt_){
			
			$scope.updateColumnTitle = "更改"+_name_+"菜单"
			var templateUrl= 'app/views/column/updateColumn.html';
			ModalService.modalSet($scope,templateUrl);
			/* update the icon  */
			$scope.updateColumnName = _name_;
			$scope.updateColumnUrl = _url_;
			$scope.updateColumnIcon = _icon_;
			$scope.updateColumnPrompt = _prompt_;
			$scope.updateColumn = function(_updateColumnName_,_updateColumnUrl_,_updateColumnIcon_,_updateColumnPrompt_){
				ModalService.modalHide();
				ColumnFactory.setUpdateColumn({
					columnId:_columnId_,
					name : _updateColumnName_,
					url : _updateColumnUrl_,
					icon	: _updateColumnIcon_,
					prompt	: _updateColumnPrompt_
				}, $scope.updateColumnCallback);
			};
		};
		/* 删除一个column */
		$scope.delColumn = function(_columnId_){
			$scope.modal_title_with_btn =  "<i class='icon-warning-sign ' ></i> 栏目删除确认!";
			$scope.modal_content_with_btn = "确认删除这个栏目？";
			var templateUrl = 'app/js/directives/modal/modal_btn.html';
			ModalService.modalSet($scope,templateUrl);
			$scope.sure = function(){
				ModalService.modalHide();
				ColumnFactory.setDelColumn({
					columnId : _columnId_
				}, $scope.delColumnCallback);
			};
		};
		/* 选择并更换一个图标  */
		$scope.updateTheIconModal = function(){
			$scope.updateTheIcon = "选择一个图标"
			var templateUrl = 'app/views/column/updateTheIcon.html';
			ModalService.modalSet($scope,templateUrl,'ngdialog-theme-big');
			$.ajax({
				type:"get",
				url:"data/JSON/icon.json",
				async:true,
				success:function(data){
					console.log(data)
					$scope.fontList = data.fontList;
				}
			});
			$scope.selectTheIcon = function(_theIcon_){
				ModalService.modalHide();
				$scope.updateColumnIcon = _theIcon_;
				$scope.columnIcon = _theIcon_;
			};
		};
		
		/* 给栏目配置接口 */
		$scope.configInterfaceToColumnModal = function(_columnId_){
			
			/* 配置接口之前，先请求拿到所有的接口 */
			$scope.interfaceListCallback = function(data){
				$scope.interfaceListEdCallback = function(_data_){
					var _interfaces_ = _data_.interfaceList;
					$scope.interfaceList = data.interfaceList;
					/* interfaceList被标记哪个是被选上的 */
					for (var i =0,l=_interfaces_.length;i<l;i++) {
						for(var j = 0,m = $scope.interfaceList.length;j<m;j++){
							if (_interfaces_[i].interfaceId == $scope.interfaceList[j].interfaceId) {
								$scope.interfaceList[j].selectStatus = true;
							};
						};
					};
					$scope.interfaceListed = $scope.interfaceList;
				};
				
				/* 请求接口时加参数columnId，只请求该栏目下的接口 */
				$scope.getinterfaceListEd = function(){
					InterfaceFactory.getInterfaceList(
						{
							columnId : _columnId_,
							searchKey: ""
						},
						$scope.interfaceListEdCallback
					);
				};
				$scope.getinterfaceListEd();
			};
			
			$scope.getInterfaceList = function(_seachkey_){
				InterfaceFactory.getInterfaceList(
					{
						searchKey:_seachkey_||""
					},
					$scope.interfaceListCallback
				);
			};
			/* 请求接口获取角色列表 */
			$scope.getInterfaceList();
			$scope.searchplaceholder = "接口介绍";
			$scope.dataChange = function(_seachkey_){
				$scope.getInterfaceList(_seachkey_);
			}
			
			/* 配置tree	*/
			$scope.treeOptions1 = mdFactory.getTreeOptions();
			
			$scope.configInterfaceToColumnTitle = "给栏目配置接口";
			var  templateUrl='app/views/column/configInterfaceToColumn.html';
			ModalService.modalSet($scope,templateUrl);
			
			$scope.selectChange = function(status,obj) {
				var _status_ = status;
				var _interfaceObj_ = obj;
				if (_status_) {
					ColumnFactory.setAddColumnInterface(
						{
							columnId : _columnId_,
							interfaceId	: _interfaceObj_.interfaceId
						},$scope.addColumnInterfaceCallback
					);
				} else{
					ColumnFactory.setDelColumnInterface(
						{
							columnId : _columnId_,
							interfaceId: _interfaceObj_.interfaceId
						},$scope.delColumnInterfaceCallback
					);
				};
			};
			
		};
	});	