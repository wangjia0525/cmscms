App
    .controller('iconCaseDetailCtrl', function($scope,BannerFactory) {
        /* 返回数据入口/表单验证 */
        $scope.show=false;
        //文字颜色
        $scope.fontColor = [
            {_index_: 0, _value_: "黑色"},
            {_index_: 1, _value_: '白色'},
        ];
        $scope.fontColorSelectValue=$scope.fontColor[0];
        /* 添加icon */
        $scope.insertHomePageIconCallback=function(data){
            console.log(data);
            $scope.show=true;
            $scope.homePageIconDetail=data.homePageIconDetail;

        }

        $scope.confirm = function () {
                console.log(12345445)
            //!$scope.addIcon.$valid
            if (!$scope.addIcon.$valid) {
                $scope.show=false;
            } else {
                $scope.fetchData();
            }
        };
        $scope.fetchData = function(){
            console.log({
                "title":$scope.iconName,
                "fontColor":$scope.fontColorSelectValue._index_
            });
            BannerFactory.insertHomePageIcon(
                {
                    "title":$scope.iconName,
                    "fontColor":$scope.fontColorSelectValue._index_
                },
                $scope.insertHomePageIconCallback
            );
        };
        $scope.photo=function(photo,homePageIconDetailId){
            console.log({
                image:photo,
                homePageIconDetailId:homePageIconDetailId
            });
            $("#"+homePageIconDetailId).parent().prev().html('上传中...')

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