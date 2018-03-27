

App
    .controller('codeDetailListCtrl', function($rootScope,$stateParams,$scope,$http,Notify,$cookieStore,ModalService,TopicFactory,mdFactory,CodeFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getcdkeyListByinfoNOCallback = function(data){
            $scope.loading = false;
            $scope.result 		   = data.result;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.codeDetail.searches',$scope.getParams());
        };

        $scope.updatecdkeyInfoCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        /* select set */
        $scope.searchplaceholder = "兑换码、兑换人手机";
        $scope.selectName = "状态：";

        $scope.type = [
            {_index_:0,_value_:"全部"},
            {_index_:1,_value_:"未兑换"},
            {_index_:2,_value_:"已兑换"}
        ];

        $scope.cdkeyInfoId = $stateParams.cdkeyInfoId;

        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.codeDetail.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.codeDetail.searches').page;
            $scope.selectValue = $scope.type[$cookieStore.get('myapp.codeDetail.searches').status];
            $scope.search = $cookieStore.get('myapp.codeDetail.searches').search;
        } else{
            $scope.selectValue = $scope.type[0];
            $scope.search = '';
        }

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage,
                status		:   $scope.selectValue._index_,
                search		:   $scope.search,
                cdkeyInfoId		:   $scope.cdkeyInfoId
            }
        };

        /* 获取codeDetail List */
        $scope.fetchData = function(){
            $scope.loading = true;
            CodeFactory.getcdkeyListByinfoNO(
                $scope.getParams(),
                $scope.getcdkeyListByinfoNOCallback
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
            $scope.downloadUrl = "token="+$rootScope.$session.getItem('token')+"&cmsuserId="+$rootScope.$session.getItem('cmsuserId')+"&sectionId="+$rootScope.$session.getItem('sectionId')+"&cdkeyInfoId="+$scope.cdkeyInfoId+"&search="+$scope.search+"&status="+$scope.selectValue._index_;
        };
        $scope.downloadUrl = "token="+$rootScope.$session.getItem('token')+"&cmsuserId="+$rootScope.$session.getItem('cmsuserId')+"&sectionId="+$rootScope.$session.getItem('sectionId')+"&cdkeyInfoId="+$scope.cdkeyInfoId+"&search="+$scope.search+"&status="+$scope.selectValue._index_;
    });