App.controller('iconCaseCtrl', function($scope,$timeout,$http,$cookieStore,BannerFactory,ModalService,Notify) {
        //icon活动页面列表回调数据
        $scope.getHomePageIconCallBack=function(data){
            console.log(data);
            $scope.loading = false;
           $scope.homePageIcon=data.homePageIcon;
        }
        $scope.fetchData=function(){
            $scope.loading = true;
            BannerFactory.getHomePageIcon(
                {

                },
                $scope.getHomePageIconCallBack

            );
        }
        $scope.fetchData();
        /* 删除列表 */
        $scope.delete = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要删除么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope, alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                BannerFactory.deleteHomePageIcon(
                    {
                        homePageIconId : _id_
                    },
                    function(){
                        Notify.alert();
                        $scope.fetchData();
                    }
                )
            }
        };
        //修改状态
        $scope.modify=function(state,homePageIconId){
            console.log({
                homePageIconId:homePageIconId,
                state:state
            })
            BannerFactory.updateHomePageIconState(
                {
                    homePageIconId:homePageIconId,
                    state:state
                },
                function(){
                    Notify.alert();
                    $scope.fetchData();
                }
            )
        }
    });