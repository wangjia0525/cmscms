

App
  	.controller('adviceListCtrl', function($scope,$cookieStore,$http,AdviceFactory,mdFactory) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.adviceListCallback = function(data){
			$scope.loading = false;
			$scope.adviceList 		   = data.adviceList;
			$scope.turnPage.totalItems = data.totalCount;
			$scope.dataLength		   = data.totalCount;
			$cookieStore.put('myapp.adviceList.searches',$scope.getParams());
		};
		/* board title set */
		$scope.title = "意见反馈列表";
		$scope.SelectName = "状态";
		$scope.searchplaceholder="用户名／幸会号／手机号";

		$scope.adviceTypes = [
			{"_index_":0,"_value_":"全部"},
			{"_index_":1,"_value_":"未解决"},
			{"_index_":2,"_value_":"已解决"}
		];
		/* 配置分页参数  */
		$scope.turnPage = mdFactory.getTurnPage();
		$scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
				$scope.numPages,
				$scope.turnPage.itemsPerPage,
				$scope.turnPage.totalItems);
		/* 参数对象  */
		/* show search condition by cookie */
		if ($cookieStore.get('myapp.adviceList.searches')) {
			$scope.turnPage.currentPage = $cookieStore.get('myapp.adviceList.searches').page;
			$scope.adviceSelectValue = $scope.adviceTypes[$cookieStore.get('myapp.adviceList.searches').status];
			$scope.searchKey = $cookieStore.get('myapp.adviceList.searches').searchKey;
		} else{
			$scope.adviceSelectValue = $scope.adviceTypes[0];
			$scope.searchKey = "";
		}
		$scope.getParams = function(){
			return {
				size		:	$scope.turnPage.itemsPerPage,
				page		:	$scope.turnPage.currentPage,
				status      :   $scope.adviceSelectValue._index_,
				searchKey	:	$scope.searchKey
			}
		};
		
		/* 获取adviceList */
		$scope.fetchData = function(){
			$scope.loading = true;
			AdviceFactory.getAdviceList(
				$scope.getParams(),
				$scope.adviceListCallback
			);
		};
		$scope.fetchData();
		/* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
		$scope.dataChange = function(){
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
	});	