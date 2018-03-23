App
    .controller('iconCaseDetailCtrls', function($scope,BannerFactory,$stateParams) {
        //文字颜色
        $scope.fontColor = [
            {_index_: 0, _value_: "黑色"},
            {_index_: 1, _value_: '白色'},
        ];
        $scope.fontColorSelectValue=$scope.fontColor[$stateParams.fontColor];
        $scope.getHomePageIconDetailCallBack=function(data){
            console.log(data);
            $scope.loading = false;
            $scope.iconName=$stateParams.iconName;
            $scope.homePageIconDetail=data.homePageIconDetail;
        }
       $scope.fetchData=function(){
           $scope.loading = true;
           BannerFactory.getHomePageIconDetail(
               {
                   homePageIconId:$stateParams.homePageIconId
               },
               $scope.getHomePageIconDetailCallBack
           )
       }
        $scope.fetchData();
        $scope.photo=function(photo,homePageIconDetailId){
            console.log({
                image:photo,
                homePageIconDetailId:homePageIconDetailId
            });
            $("#"+homePageIconDetailId).parent().prev().html('上传中.....')
            BannerFactory.updateHomePageIconImage(
                {
                    image:photo,
                    homePageIconDetailId:homePageIconDetailId
                },
                function(data){
                    $("#"+homePageIconDetailId).parent().prev().html('上传成功')
                    console.log('上传成功')
                }
            );
        }
    });