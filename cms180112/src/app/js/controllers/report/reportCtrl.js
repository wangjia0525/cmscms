
/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('reportCtrl', function($scope,$http,$cookieStore,ReportFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.userReportListCallback = function(data){
            $scope.loading = false;
            $scope.userReportList 	   = data.userReportList;
            //console.log($scope.userReportList );
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.userReportList.searches',$scope.getParams());
        };
        /* board title set */
        $scope.title = "用户列表";
        $scope.reasonSelect="举报原因";
        $scope.typeSelect="举报类型";
        $scope.statusSelect="处理状态";
        $scope.searchplaceholder="手机号/姓名";

        $scope.reasonType = [
            {_index_: 0, _value_: "全部", reasonType:""},
            {_index_: 1, _value_: "广告", reasonType: "广告"},
            {_index_: 2, _value_: "色情", reasonType: "色情"},
            {_index_: 3, _value_: "违法/政治敏感", reasonType: "违法/政治敏感"},
            {_index_: 4, _value_: "身份作假", reasonType: "身份作假"},
            {_index_: 5, _value_: "其他(鸡汤、段子、水贴等)", reasonType: "其他(鸡汤、段子、水贴等)"}
        ];

        $scope.type = [
            {_index_: 0, _value_: "全部",type:0},
            {_index_: 1, _value_: "聊天",type:1},
            {_index_: 2, _value_: "话题/擂台",type:3},
            {_index_: 3, _value_: "评论",type:4},
            {_index_: 4, _value_: "用户",type:5}
        ];

        $scope.status = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "已处理"},
            {_index_: 2, _value_: "待处理"}
        ];
        $scope.statusSelectValue = $scope.status[0];
        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.userReportList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.userReportList.searches').page;
            $scope.reasonSelectValue = $scope.reasonType[$cookieStore.get('myapp.userReportList.searches')._index_];
            $scope.typeSelectValue = $scope.type[$cookieStore.get('myapp.userReportList.searches')._type_];
            $scope.statusSelectValue = $scope.status[$cookieStore.get('myapp.userReportList.searches').stauts];
            $scope.searchKey = $cookieStore.get('myapp.userReportList.searches').searchKey;
        } else{
            $scope.reasonSelectValue = $scope.reasonType[0];
            $scope.typeSelectValue = $scope.type[0];
            $scope.statusSelectValue = $scope.status[0];
            $scope.searchKey = "";
        };

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage,
                reasonType	:	$scope.reasonSelectValue.reasonType,
                _index_		:	$scope.reasonSelectValue._index_,
                type		:	$scope.typeSelectValue.type,
                _type_		:	$scope.typeSelectValue._index_,
                stauts		:	$scope.statusSelectValue._index_,
                searchKey	:	$scope.searchKey
            };
        };


        /* 获取mobileUser List */
        $scope.fetchData = function(){
            $scope.loading = true;
            //console.log($scope.getParams())
            ReportFactory.getUserReportList(
                $scope.getParams(),
                $scope.userReportListCallback
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