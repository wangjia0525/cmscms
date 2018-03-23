
/*
 * 用户controller（非CMS用户）。
 */
App
    .controller('blackListCtrl', function($scope,$http,$cookieStore,MobileUserFactory,Notify,OtherFactory,mdFactory,ModalService,FieldFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.mobileUserListCallback = function(data){
            $scope.loading = false;
            $scope.mobileUserList 	   = data.userList;
            $scope.turnPage.totalItems = data.totalCount;
            $scope.dataLength		   = data.totalCount;
            $cookieStore.put('myapp.mobileUserBlackList.searches',$scope.getParams());
        };
        $scope.getIndustyListCallback = function(data){
            $scope.industyList 	   = data.industyList;
            $scope.getSelectList($scope.industyList);
            //$scope.JobPosition();
            $scope.field();
        };
        /*$scope.getJobPositionListCallback = function(data){
            $scope.jobPositionList 	   = data.jobPositionList;
            $scope.getSelectList($scope.jobPositionList);
            $scope.field();
        };*/
        $scope.realmListCallback = function (data) {
            $scope.realmList 	   = data.realmList;
            $scope.getFieldList($scope.realmList);
            $scope.getCookie();
            $scope.fetchData();
        };

        $scope.setUserBlackCallblack = function () {
            Notify.alert();
            $scope.fetchData();
        };

        /* board title set */
        $scope.title = "用户列表";

        $.ajax({
            type:"get",
            url:"data/region.json",
            async:false,
            success:function(data){
                $scope.regionTypes = data;
                $scope.regionTypes.unshift({
                    "code": "0",
                    "name": "全部",
                    "cityList": [
                        {
                            "code": "0",
                            "name": "全部"
                        }
                    ]
                });
                for(var i=1;i<$scope.regionTypes.length;i++){
                    $scope.regionTypes[i].cityList.unshift(
                        {
                            "code": "0",
                            "name": "全部"
                        }
                    );
                }
                for(var index in $scope.regionTypes){
                    $scope.regionTypes[index]._index_=index;
                    for(var _index in $scope.regionTypes[index].cityList){
                        $scope.regionTypes[index].cityList[_index]._index_=_index;
                    }
                }
            }
        });

        $scope.regionSelectName = "地区";
        $scope.industrySelectName = "行业";
        $scope.positionSelectName = "职位";
        $scope.fieldSelectName = "领域";
        $scope.sortSelectName = "排序方式";



        $scope.sortTypes = [
            {_index_: 0, _value_: "影响力从高到低", "sortType":1},
            {_index_: 1, _value_: "影响力从低到高", "sortType":2}
        ];

        $scope.searchplaceholder="姓名／手机号／幸会号／公司名称";



        /* 配置分页参数  */
        $scope.turnPage = mdFactory.getTurnPage();
        $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
            $scope.numPages,
            $scope.turnPage.itemsPerPage,
            $scope.turnPage.totalItems);
        /* show search condition by cookie */
        $scope.getCookie = function () {
            if ($cookieStore.get('myapp.mobileUserBlackList.searches')) {
                $scope.turnPage.currentPage = $cookieStore.get('myapp.mobileUserBlackList.searches').page;
                $scope.regionSelectValue = $scope.regionTypes[$cookieStore.get('myapp.mobileUserBlackList.searches').regionIndex];
                $scope.industrySelectValue = $scope.industyList[$cookieStore.get('myapp.mobileUserBlackList.searches').industryIndex];
                //$scope.positionSelectValue = $scope.jobPositionList[$cookieStore.get('myapp.mobileUserBlackList.searches').positionIndex];
                $scope.regionSelectValue_2 = $scope.regionSelectValue.cityList[0];
                $scope.industrySelectValue_2 = $scope.industrySelectValue.children[0];
                //$scope.positionSelectValue_2 = $scope.positionSelectValue.children[0];
                $scope.fieldSelectValue = $scope.realmList[$cookieStore.get('myapp.mobileUserBlackList.searches').fieldTypes];
                $scope.searchKey = $cookieStore.get('myapp.mobileUserBlackList.searches').searchKey;
            } else{
                $scope.searchKey = "";
                $scope.fieldSelectValue = $scope.realmList[0];
                $scope.regionSelectValue = $scope.regionTypes[0];
                $scope.regionSelectValue_2 = $scope.regionSelectValue.cityList[0];
                $scope.industrySelectValue = $scope.industyList[0];
                $scope.industrySelectValue_2 = $scope.industrySelectValue.children[0];
                //$scope.positionSelectValue = $scope.jobPositionList[0];
                //$scope.positionSelectValue_2 = $scope.positionSelectValue.children[0];
            }
        };


        $scope.regionStatus = function () {
            if($scope.regionSelectValue_2._index_==0){
                return $scope.regionSelectValue.code
            }else{
                return $scope.regionSelectValue_2.code
            }
        };

        $scope.industryStatus = function () {
            if($scope.industrySelectValue_2._index_==0){
                return $scope.industrySelectValue.industyId
            }else{
                return $scope.industrySelectValue_2.industyId
            }
        };

        /*$scope.positionStatus = function () {
            if($scope.positionSelectValue_2._index_==0){
                return $scope.positionSelectValue.jobPositionId
            }else{
                return $scope.positionSelectValue_2.jobPositionId
            }
        };*/

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		     :	$scope.turnPage.itemsPerPage,
                page		     :	$scope.turnPage.currentPage,
                searchKey	     :	$scope.searchKey,
                areaCode	     :	$scope.regionStatus(),
                regionIndex      :	$scope.regionSelectValue._index_,
                regionIndex_2    :	$scope.regionSelectValue_2._index_,
                industyId	     :	$scope.industryStatus(),
                industryIndex    :	$scope.industrySelectValue._index_,
                industryIndex_2  :	$scope.industrySelectValue_2._index_,
                //positionId	     :	$scope.positionStatus(),
                //positionIndex    :	$scope.positionSelectValue._index_,
                //positionIndex_2  :	$scope.positionSelectValue_2._index_,
                realmId          :	$scope.fieldSelectValue.realmId,
                fieldTypes       :	$scope.fieldSelectValue._index_,
                status           :	1
            };
        };


        $scope.Industy= function () {
            OtherFactory.getIndustyList(
                {},
                $scope.getIndustyListCallback
            );
        };
        $scope.Industy();

        /*$scope.JobPosition= function () {
            OtherFactory.getJobPositionList(
                {},
                $scope.getJobPositionListCallback
            );
        };*/

        $scope.field = function(){
            FieldFactory.getRealmList(
                {
                    size		:	1000,
                    page		:	1
                },
                $scope.realmListCallback
            );
        };

        /* 获取mobileUser List */
        $scope.fetchData = function(){
            $scope.loading = true;
            MobileUserFactory.getMobileUserList(
                $scope.getParams(),
                $scope.mobileUserListCallback
            );
        };
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.publicChange = function () {
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
        };
        $scope.dataChange = function(){
            $scope.publicChange();
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.publicChange();
            }
        };
        $scope.dataChange_1 = function(){
            $scope.regionSelectValue_2 = $scope.regionSelectValue.cityList[0];
            $scope.publicChange();
        };
        $scope.dataChange_2 = function(){
            $scope.industrySelectValue_2 = $scope.industrySelectValue.children[0];
            $scope.fetchData();
            $scope.publicChange();
        };
        $scope.dataChange_3 = function(){
            $scope.positionSelectValue_2 = $scope.positionSelectValue.children[0];
            $scope.fetchData();
            $scope.publicChange();
        };
        $scope.getSelectList = function (_list_) {
            _list_.unshift({
                "industyId": "0",
                "name": "全部",
                "children": [
                    {
                        "industyId": "0",
                        "name": "全部"
                    }
                ]
            });
            for(var i=1;i<_list_.length;i++){
                _list_[i].children.unshift(
                    {
                        "industyId": "0",
                        "name": "全部"
                    }
                );
            }
            for(var index in _list_){
                _list_[index]._index_=index;
                for(var _index in _list_[index].children){
                    _list_[index].children[_index]._index_=_index;
                }
            }
        };
        $scope.getFieldList = function(_list_){
            _list_.unshift({
                "realmId" : 0,
                "name"	: "全部",
                "type" : "0"
            });
            for(var i=0;i<_list_.length;i++){
                _list_[i]._index_=i;
            }
        };
        /* 查找父级菜单 */

        $scope.findParentId = function(_list_,_children_,_key_,_id_,_name_){
            for(var i=0;i<_list_.length;i++){
                for(var j=0;j<_list_[i][_children_].length;j++){
                    if(_list_[i][_children_][j][_key_] ==_id_){
                        if(_name_){
                            return _list_[i].name+'-'+_name_
                        }else {
                            return _list_[i].name
                        }
                    }
                }
            }
        };
        /* 移除黑名单 */
        $scope.removeBlackList = function (_id_) {
            $scope.alterTitle = "确认操作";
            $scope.alertInformation = "确认要将其移除黑名单么?";
            var alertHtml = 'app/views/alert/alert.html';
            ModalService.modalSet($scope,alertHtml);
            $scope.doTrue = function () {
                ModalService.modalHide();
                MobileUserFactory.setUserBlack(
                    {
                        userId: _id_,
                        inBlack: false
                    },
                    $scope.setUserBlackCallblack
                )
            }
        };

    });