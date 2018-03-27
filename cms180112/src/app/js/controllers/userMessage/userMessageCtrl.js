/**
 * Created by Administrator on 2017/8/7.
 */
 App.controller('userMessageCtrl',function($scope, $rootScope,$http, userMessageFactory,mdFactory){
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getUserMessageListCallback = function (data) {
            console.log(data)
            $scope.loading = false;
            $scope.turnPage.totalItems = data.count;
            $scope.messageFromUsersList=data.messageFromUsersList
        };
     
        $scope.getUserMessageCallback = function(data){
            console.log(data)
            $scope.t='topic1';
            $scope.messageFromUsers=data.messageFromUsers
        };
        $scope.putInsertMessageCallback=function(data){
         //console.log(data);
         $scope.content='';
         $scope.fetchData2()
     }
        /* 获取UserMessageList */
        $scope.fetchData1 = function(){
            $scope.loading = true;
            userMessageFactory.getUserMessageList(
                $scope.getParams1(),
                $scope.getUserMessageListCallback
            );
        };

        $scope.getParams1 = function(){
            return {
                size:$scope.turnPage.itemsPerPage,
                page:$scope.turnPage.currentPage
            }
        };

        /* 获取UserMessageList */
        $scope.fetchData2 = function(){
            //console.log($scope.getParams2())
            //return;
            //$scope.loading = true;
            userMessageFactory.getUserMessage(
                $scope.getParams2(),
                $scope.getUserMessageCallback
            );
        };

        /* 获取insertMessage */
         $scope.fetchData3 = function(){
             console.log($scope.getParams3());
             //return;
             userMessageFactory.putInsertMessage(
                 $scope.getParams3(),
                 $scope.putInsertMessageCallback
             );
         };
         /* 配置分页参数  */
         $scope.turnPage = mdFactory.getTurnPage();
         //console.log(mdFactory.getTurnPage())
         $scope.ToNum = mdFactory.getPageNum(
             $scope.turnPage.currentPage,
             $scope.numPages,
             $scope.turnPage.itemsPerPage,
             $scope.turnPage.totalItems
         );

        $scope.fetchData1();
         /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
         $scope.publicChange = function () {
             $scope.fetchData1();
             $scope.ToNum = mdFactory.getPageNum(
                 $scope.turnPage.currentPage,
                 $scope.numPages,
                 $scope.turnPage.itemsPerPage,
                 $scope.turnPage.totalItems);
         };
         $scope.dataChange = function () {
             $scope.publicChange();
         };
        $scope.topic=false;
        $scope.t='';
        //打开消息窗口
        $scope.operate=function(userId){
            var userid=userId;
            //console.log(userid)
            $scope.getParams2 = function(){
                return {
                    userId:userid
                }
            };
            $scope.blur=function(){
                console.log($('#ul').height());
                $scope.pic='';
                $('#div').scrollTop($('#ul').height())
            }
            $scope.fetchData2();
            $scope.send=function(){
                if(txt.validity.valid){
                    $scope.getParams3=function(){
                        return {
                            userId:userid,
                            image:$scope.pic,
                            content:$scope.content
                        }
                    }
                    $scope.fetchData3();
                    var time=setInterval(
                        function(){
                            $('#div').scrollTop($('#ul').height())
                            clearInterval(time)
                        },2000
                    )
                }
            }
            $scope.hide=function(){
                $scope.t='';
            }
        }

    })