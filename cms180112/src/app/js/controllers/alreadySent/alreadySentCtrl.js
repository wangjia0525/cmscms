/**
 * Created by Administrator on 2017/8/7.
 */
App
    .controller('alreadySentCtrl', function ($scope, ModalService,Notify, $cookieStore, alreadySentFactory, mdFactory) {
        $scope.getOldMessageListCallback=function(data){
            $scope.loading = false;
            $scope.turnPage.totalItems = data.count;
            $scope.timing=data.timing;
            console.log(data)
        }
        $scope.setDeleteOldMessageCallblack=function(data){
            Notify.alert();
            $scope.fetchData();
        }
        /* 获取getOldMessageList */
        $scope.fetchData = function(){
            $scope.loading = true;
            alreadySentFactory.getOldMessageList(
                $scope.getParams(),
                $scope.getOldMessageListCallback
            );
        };
        $scope.getParams=function(){
                return {
                    size:$scope.turnPage.itemsPerPage,
                    page:$scope.turnPage.currentPage
                }
        }
        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        //console.log(mdFactory.getTurnPage())
        $scope.ToNum = mdFactory.getPageNum(
            $scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems
        );
        $scope.fetchData();
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.publicChange = function () {
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum(
                $scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };
        $scope.dataChange = function () {
            $scope.publicChange();
        };
        /* 删除 */
        $scope.removeMasterList = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要删除该推送消息么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope, alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                alreadySentFactory.setDeleteOldMessage(
                    {
                        id: _id_
                    },
                    $scope.setDeleteOldMessageCallblack
                )
            }
        };

    })