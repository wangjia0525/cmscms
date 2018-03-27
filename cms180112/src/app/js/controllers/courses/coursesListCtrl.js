/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('coursesListCtrl', function ($stateParams, $scope, $http, $cookieStore, FoldFactory, Notify, mdFactory, ModalService, CoursesFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getCourseListCallback = function (data) {
            console.log(data);
            $scope.loading = false;
            $scope.result = data.result;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength = data.totalCount;
            $cookieStore.put('myapp.coursesList.searches', $scope.getParams());
        };

        $scope.updataCourseOrderCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };


        /* board title set */
        $scope.statusSelect = "课程状态";
        $scope.searchplaceholder = "课程编号、老师";

        $scope.statusType = [
            {_index_: 0, _value_: "全部"},
            {_index_: 1, _value_: "上架"},
            {_index_: 2, _value_: "下架"}
        ];
        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.coursesList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.coursesList.searches').page;
            $scope.statusSelectValue = $scope.statusType[$cookieStore.get('myapp.coursesList.searches').status];
            $scope.search = $cookieStore.get('myapp.coursesList.searches').search;
        } else {
            $scope.statusSelectValue = $scope.statusType[0];
            $scope.search = ''
        }

        $scope.params = $stateParams;
        /* 参数对象  */
        $scope.getParams = function () {
            return {
                userId: $scope.params.userId,
                size: $scope.turnPage.itemsPerPage,
                page: $scope.turnPage.currentPage,
                search: $scope.search,
                status: $scope.statusSelectValue._index_
            };
        };


        /* 获取courses List */
        $scope.fetchData = function () {
            $scope.loading = true;
            CoursesFactory.getCourseList(
                $scope.getParams(),
                $scope.getCourseListCallback
            );
        };
        $scope.fetchData();
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function () {
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
                $scope.ToNum = mdFactory.getPageNum(
                    $scope.turnPage.currentPage,
                    $scope.numPages,
                    $scope.turnPage.itemsPerPage,
                    $scope.turnPage.totalItems);
            }
        };
        /* 排序 */
        $scope.fnSort = function (_id_, _sort_) {
            CoursesFactory.updataCourseOrder(
                {
                    "productId": _id_,
                    "type": _sort_
                },
                $scope.updataCourseOrderCallback
            )
        };
    });