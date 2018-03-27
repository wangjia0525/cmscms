App
    .controller('useCodeListCtrl', function($scope,$http,Notify,$cookieStore,ModalService,TopicFactory,mdFactory,CodeFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getcdkeyCallback = function(data){
            $scope.loading = false;
            $scope.result 		   = data.result;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.useCodeList.searches',$scope.getParams());
        };

        /* select set */
        $scope.searchplaceholder = "兑换码、兑换人手机";

        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.useCodeList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.useCodeList.searches').page;
            $scope.search = $cookieStore.get('myapp.useCodeList.searches').search;
        } else{
            $scope.search = '';
        }

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage,
                search		:   $scope.search
            }
        };

        /* 获取createCode List */
        $scope.fetchData = function(){
            $scope.loading = true;
            CodeFactory.getcdkey(
                $scope.getParams(),
                $scope.getcdkeyCallback
            );
        };
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