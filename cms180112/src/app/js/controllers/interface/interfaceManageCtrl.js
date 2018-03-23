/**
 *@description 接口管理的controller 
 */
App
  	.controller('interfaceManageCtrl', function($scope,$cookieStore,InterfaceFactory, mdFactory,ModalService,Notify) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.interfaceListCallback = function(data){
			$scope.loading = false;
			$scope.interfaceList 	   = data.interfaceList;
			$scope.dataLength		   = $scope.interfaceList.length;
			$cookieStore.put('myapp.interfaceList.searches',$scope.getParams());
		};
		$scope.delInterfaceCallback = function(){
			Notify.alert();
			$scope.fetchData();
		};
		$scope.addInterfaceCallback = function(){
			Notify.alert();
			$scope.fetchData();
		};
        $scope.checkUserback = function(){
            Notify.alert();
            $scope.fetchData();
        };
		$scope.updateInterfaceCallback = function(){
			Notify.alert();
			$scope.fetchData();
		};
		
		/* board title set */
		$scope.title = "接口管理列表";
		$scope.searchplaceholder="用户名、ID";
		/* 接口类型 */
		$scope.interfaceTypes = [
			{_index_: 1, _value_: "增"},
			{_index_: 2, _value_: "删"},
			{_index_: 3, _value_: "改"},
			{_index_: 4, _value_: "查"},
			{_index_: 5, _value_: "下载"}
		];
		/* 接口部门权限 */
		$scope.sectionTypes = [
			{_index_: 1,_value_:"不需要验证"},
			{_index_: 2,_value_:"分地区"},
			{_index_: 3,_value_:"只能超级管理员调用"}
		];
		
		/* 配置分页参数  */
		
		/* 参数对象  */
		/* show search condition by cookie */
		if ($cookieStore.get('myapp.interfaceList.searches')) {
			$scope.searchKey = $cookieStore.get('myapp.interfaceList.searches').searchKey;
		} else{
			$scope.searchKey = "";
		}
		$scope.getParams = function(){
			return {
				searchKey	:	$scope.searchKey
			}
		};
		
		/* 获取interfaceList */
		$scope.fetchData = function(){
			$scope.loading = true;
			InterfaceFactory.getInterfaceList(
				$scope.getParams(),
				$scope.interfaceListCallback
			);
		};
		$scope.fetchData();
		
		/* 添加一个interface */
		$scope.addInterfaceModal = function(){
			
			$scope.addInterfaceTitle = "添加一个接口";
			$scope.interfaceTypeValue = $scope.interfaceTypes[0];
			$scope.sectionTypeItem = $scope.sectionTypes[0];
			var templateUrl = 'app/views/interface/addInterface.html';
			ModalService.modalSet($scope,templateUrl);
			
			$scope.addInterface = function(_interfaceInfo_,_interfaceUrl_,_interfaceType_,_sectionType_){
				ModalService.modalHide();
				
				InterfaceFactory.setAddInterface({
					introduce : _interfaceInfo_,
					url : _interfaceUrl_,
					type:_interfaceType_._index_,
					sectionType: _sectionType_._index_	
				}, $scope.addInterfaceCallback);
			};
		};
		/* checkUser */
        $scope.checkUser = function(){
            $scope.checkUser = function(){
                InterfaceFactory.checkUser({
                }, $scope.checkUserback);
            };
        };
		/* update一个interface */
		$scope.updateInterfaceModal = function(_interfaceId_,_interfaceInfo_,_interfaceUrl_,_interfaceType_,_sectionType_){
			
			$scope.updateInterfaceTitle = "更改一个接口信息";
			var templateUrl = 'app/views/interface/updateInterface.html';
			ModalService.modalSet($scope,templateUrl);
			
			$scope.updateInterfaceInfo = _interfaceInfo_;
			$scope.updateInterfaceUrl = _interfaceUrl_;
			$scope.updateInterfaceTypeValue = $scope.interfaceTypes[_interfaceType_-1];
			$scope.updateSectionTypeItem = $scope.sectionTypes[_sectionType_-1];
			
			$scope.updateInterface = function(_updateInterfaceInfo_,_updateInterfaceUrl_,_updateInterfaceType_,_updateSectionType_){
				ModalService.modalHide();
				
				InterfaceFactory.setUpdateInterface({
					interfaceId:_interfaceId_,
					introduce : _updateInterfaceInfo_,
					url :_updateInterfaceUrl_,
					type:_updateInterfaceType_._index_,
					sectionType:_updateSectionType_._index_
				}, $scope.updateInterfaceCallback);
			};
		};
		/* 删除一个interface */
		$scope.delInterface = function(_interfaceId_){
			$scope.modal_title_with_btn =  "<i class='icon-warning-sign ' ></i> 接口删除确认!";
			$scope.modal_content_with_btn = "确认删除这个接口？";
			var templateUrl = 'app/js/directives/modal/modal_btn.html';
			ModalService.modalSet($scope,templateUrl);
			$scope.sure = function(){
				ModalService.modalHide();
				InterfaceFactory.setDelInterface({
					interfaceId : _interfaceId_
				}, $scope.delInterfaceCallback);
			};
		};
		/* 搜索 */
		$scope.dataChange = function(){
			$scope.fetchData();
		}
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.fetchData();
            }
        };
	});	