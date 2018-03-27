
/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('versionUpdateCtrl', function($scope,$http,$cookieStore,$location,Notify,$timeout,ModalService,versionUpdateFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        //更改业务状态
        $scope.updateClearingCallback=function(data){
            $scope.fetchData();
            Notify.alert();
        }
        $scope.operate=function(id,status,version){
            var status=status;
            var version=version;
            $scope.id=id;
            $scope.type=status;
            $scope.version=version;
            $scope.confirm=function(data,version){
                console.log(data);
                $scope.getParams2 = function(){
                    return {
                        id:id,
                        version:version,
                        status:  data
                    }
                };
                $scope.fetchData2();
                $scope.id=-1000;
            }
        }
        //更改业务状态
        $scope.fetchData2 = function(){
            console.log($scope.getParams2());
            //return;
            versionUpdateFactory.updateApp(
                $scope.getParams2(),
                $scope.updateClearingCallback
            );
        };
        $scope.hide=function(){
            $scope.id=-1000;
        }
        $scope.getUpdateListCallback = function(data){
            console.log(data);
            $scope.loading = false;
            $scope.appInfoList 	   = data.appInfoList;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.update.searches',$scope.getParams());
        };

        $scope.getUpdateInfoCallback = function (data) {
            $scope.updateUrl 	   = data.updateUrl;
            $scope.updateTips 	   = data.updateTips;
        };

        $scope.setModiUpdateInfoCallblack = function () {
            Notify.alert();
            $scope.fetchData();
            $scope.updateInfo();
        };

        $scope.setModiUpdateVersionInfoCallblack = function () {
            Notify.alert();
            $scope.fetchData();
            $scope.updateInfo();
        };

        /* board title set */
        $scope.title = "用户列表";
        $scope.uodateNum="版本号";
        $scope.SelectName="系统";
        $scope.searchplaceholder="关键字";
        $scope.updateTypes = [
            {"_index_":0,"_value_":"android","plat":1},
            {"_index_":1,"_value_":"ios","plat":2}
        ];


        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        if ($cookieStore.get('myapp.update.searches')) {
            $scope.turnPage.currentPage = $cookieStore.get('myapp.update.searches').page;
            $scope.updateSelectValue = $scope.updateTypes[$cookieStore.get('myapp.update.searches')._index_];
            $scope.searchKey = $cookieStore.get('myapp.update.searches').searchKey;
        } else{
            $scope.searchKey = "";
            $scope.updateSelectValue = $scope.updateTypes[0]
        };

        /* 参数对象  */
        $scope.getParams = function(){
            return {

            };
        };


        /* 获取update List */
        $scope.fetchData = function(){
            $scope.loading = true;
            versionUpdateFactory.getUpdateList(
                $scope.getParams(),
                $scope.getUpdateListCallback
            );
        };
        $scope.fetchData();


        $scope.updateInfo = function(){
            versionUpdateFactory.getUpdateInfo(
                {},
                $scope.getUpdateInfoCallback
            );
        };
        $scope.updateInfo();

        ///* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        //$scope.dataChange = function(){
        //    $scope.fetchData();
        //    $scope.updateInfo();
        //    $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
        //        $scope.numPages,
        //        $scope.turnPage.itemsPerPage,
        //        $scope.turnPage.totalItems);
        //};
        //$scope.dataEvent = function(e){
        //    var keycode = window.event?e.keyCode:e.which;
        //    if(keycode==13){
        //        $scope.fetchData();
        //        $scope.updateInfo();
        //        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
        //            $scope.numPages,
        //            $scope.turnPage.itemsPerPage,
        //            $scope.turnPage.totalItems);
        //    }
        //};
        /* 修改 */
        $scope.fnChange = function () {
            $scope.alterTitle = "确认操作";
            var alertHtml = 'app/views/versionUpdate/changeVersionUpdate.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function (_tips_,_url_) {
                ModalService.modalHide();
                versionUpdateFactory.setModiUpdateInfo(
                    {
                        updateUrl: _url_,
                        updateTips: _tips_
                    },
                    $scope.setModiUpdateInfoCallblack
                )
            };
        };

        ///* 置为是否可用 */
        //$scope.cantuse = function (_id_,_b_) {
        //    $scope.alterTitle = "确认操作";
        //    $scope.alertInformation = "确认进行该操作么?";
        //    var alertHtml = 'app/views/alert/alert.html';
        //    ModalService.modalSet($scope,alertHtml);
        //    $scope.doTrue = function () {
        //        ModalService.modalHide();
        //        versionUpdateFactory.setModiUpdateVersionInfo(
        //            {
        //                appInfoId: _id_,
        //                canUser: !_b_
        //            },
        //            $scope.setModiUpdateVersionInfoCallblack
        //        )
        //    };
        //}
    });