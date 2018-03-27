

App
  	.controller('paramsListCtrl', function($scope,$http,$cookieStore,ParamsFactory,mdFactory) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.paramsListCallback = function(data){
			$scope.paramsList 		   = data.paramsList;
			$scope.turnPage.totalItems = data.totalCount;
			$scope.dataLength		   = data.totalCount;
			$cookieStore.put('myapp.paramsList.searches',$scope.getParams_());
		};
		/* board title set */
		$scope.title = "参数文案列表";
		$scope.searchplaceholder="参数名";
		/* select set */
		$scope.selectboxname = "类型";
		$scope.paramsTypes = [
			{_index_: 0, _value_: "全部"},
			{_index_: 1, _value_: "参数"},
			{_index_: 2, _value_: "文案"}
		];
    	
		
		/* 配置分页参数  */
		$scope.turnPage = mdFactory.getTurnPage();
		$scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
				$scope.numPages,
				$scope.turnPage.itemsPerPage,
				$scope.turnPage.totalItems);
		/* show search condition by cookie */
		if ($cookieStore.get('myapp.paramsList.searches')) {
			$scope.turnPage.currentPage = $cookieStore.get('myapp.paramsList.searches').page;
			$scope.selectValue = $scope.paramsTypes[$cookieStore.get('myapp.paramsList.searches').type];
			$scope.searchKey = $cookieStore.get('myapp.paramsList.searches').searchKey;
		} else{
			$scope.searchKey = "";
			$scope.selectValue = $scope.paramsTypes[0];
		}		
		
		/* 参数对象  */
		$scope.getParams_ = function(){
			return {
				size		:	$scope.turnPage.itemsPerPage,
				page		:	$scope.turnPage.currentPage,
				searchKey	:	$scope.searchKey,
				type		:   $scope.selectValue._index_
			}
		}
		
		/* 获取adviceList */
		$scope.fetchData = function(){
			ParamsFactory.getParamsList(
				$scope.getParams_(),
				$scope.paramsListCallback
			);
		}
		$scope.fetchData();
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
	});	