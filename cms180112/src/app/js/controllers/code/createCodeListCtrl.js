

App
    .controller('createCodeListCtrl', function($scope,$http,Notify,$cookieStore,ModalService,TopicFactory,mdFactory,CodeFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.cdkeyInfoCallback = function(data){
            console.log(data)
            $scope.loading = false;
            $scope.result 		   = data.result;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.createCodeList.searches',$scope.getParams());
        };

        $scope.updatecdkeyInfoCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };

        /* select set */
        $scope.searchplaceholder = "产品编码、兑换码";

        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.createCodeList.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.createCodeList.searches').page;
            $scope.search = $cookieStore.get('myapp.createCodeList.searches').search;
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
            CodeFactory.cdkeyInfo(
                $scope.getParams(),
                $scope.cdkeyInfoCallback
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
        /* 状态 */
        $scope.findStatus = function (status,beginTime,endTime) {
            var onOff = (new Date(endTime)).valueOf() - (new Date()).valueOf() > 0;
            if(onOff){
                if(status==1){
                    return "激活"
                }else{
                    return "冻结"
                }
            }else{
                return "到期"
            }
        };


        /* 冻结、激活 */
        $scope.doCode = function (_id_,type) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要进行该操作么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                CodeFactory.updatecdkeyInfo(
                    {
                        cdkeyInfoId:_id_,
                        status:type
                    },
                    $scope.updatecdkeyInfoCallback
                )
            };
        };
    });