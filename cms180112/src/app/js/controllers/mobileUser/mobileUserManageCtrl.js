
/*
 * 用户controller（非CMS用户）。
 */
App
  	.controller('mobileUserManageCtrl', function($scope,$http,$cookieStore,MobileUserFactory,userMessageFactory,Notify,OtherFactory,mdFactory,ModalService,FieldFactory) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.mobileUserListCallback = function(data){
			console.log(data);
			$scope.loading = false;
			$scope.mobileUserList 	   = data.userList;
			$scope.turnPage.totalItems = data.totalCount;
			$scope.dataLength		   = data.totalCount;
			$cookieStore.put('myapp.mobileUserManageList.searches',$scope.getParams());
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

		$scope.setUserBlackCallback = function () {
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
        $scope.pagecoount = "每页显示";
        $scope.userSelectName = "用户类型";
        $scope.thirdSelectName = "第三方登录";

        //影响力
		$scope.sortTypes = [
			{_index_: 0, _value_: "影响力从高到低", "sortType":1},
			{_index_: 1, _value_: "影响力从低到高", "sortType":2},
			{_index_: 2, _value_: "注册时间从近到远", "sortType":4},
			{_index_: 3, _value_: "注册时间从远到近", "sortType":3},
			{_index_: 4, _value_: "最后操作时间从近到远", "sortType":6},
			{_index_: 5, _value_: "最后操作时间从远到近", "sortType":5},
			{_index_: 6, _value_: "入会时间从近到远", "sortType":7},
			{_index_: 7, _value_: "入会时间从远到近", "sortType":8}
		];
		$scope.sortSelectValue=$scope.sortTypes[0];//初始化
		//第三方登录
		$scope.thirdTypes = [
			{_index_: 0, _value_: "不限"},
			{_index_: 1, _value_: "全部（QQ+微信）"},
			{_index_: 2, _value_: "QQ"},
			{_index_: 3, _value_: "微信"}
		];
		$scope.thirdSelectValue=$scope.thirdTypes[0];//初始化
        //显示条数
        $scope.pageTypes = [
            {_index_: 0, _value_: "10条", "pageType":10},
            {_index_: 1, _value_: "20条", "pageType":20},
            {_index_: 2, _value_: "50条", "pageType":50},
            {_index_: 3, _value_: "100条", "pageType":100}
        ];
        $scope.pageSelectValue=$scope.pageTypes[0];
		$scope.searchplaceholder="姓名／手机号／幸会号／公司名称";
		//用户类型
		$scope.userType = [
			{_index_: 0, _value_: "全部"},
			{_index_: 1, _value_: "年会会员"},
			{_index_: 2, _value_: "非年会会员"}
		];
		$scope.userSelectValue=$scope.userType[0];
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
		$scope.putInsertMessageCallback=function(data){
			//console.log(data);
			$scope.content='';
			$scope.fetchData2()
		}
		$scope.getUserMessageCallback = function(data){
			console.log(data)
			$scope.t='topic1';
			$scope.messageFromUsers=data.messageFromUsers
		};
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
		/* 配置分页参数  */
		$scope.turnPage = mdFactory.getTurnPage();
		$scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
				$scope.numPages,
				$scope.pageSelectValue.pageType,
				$scope.turnPage.totalItems);
		/* show search condition by cookie */
		$scope.getCookie = function () {
			if ($cookieStore.get('myapp.mobileUserManageList.searches')) {
				$scope.turnPage.currentPage = $cookieStore.get('myapp.mobileUserManageList.searches').page;
				$scope.regionSelectValue = $scope.regionTypes[$cookieStore.get('myapp.mobileUserManageList.searches').regionIndex];
				$scope.industrySelectValue = $scope.industyList[$cookieStore.get('myapp.mobileUserManageList.searches').industryIndex];
				$scope.regionSelectValue_2 = $scope.regionSelectValue.cityList[0];
				$scope.industrySelectValue_2 = $scope.industrySelectValue.children[0];
				$scope.fieldSelectValue = $scope.realmList[$cookieStore.get('myapp.mobileUserManageList.searches').fieldTypes];
				$scope.sortSelectValue = $scope.sortTypes[$cookieStore.get('myapp.mobileUserManageList.searches').sortTypes];
				//$scope.userSelectValue = $scope.userType[$cookieStore.get('myapp.mobileUserManageList.searches').userType];//用户类型？？？
				$scope.searchKey = $cookieStore.get('myapp.mobileUserManageList.searches').searchKey;

			} else{
				$scope.searchKey = "";
				$scope.fieldSelectValue = $scope.realmList[0];
				$scope.sortSelectValue = $scope.sortTypes[0];
				$scope.userSelectValue=$scope.userType[0];//用户类型？？？？？？？
				$scope.thirdSelectValue=$scope.thirdTypes[0];//初始化//第三方登录？？？？？？？
                $scope.pageSelectValue=$scope.pageTypes[0];
				$scope.regionSelectValue = $scope.regionTypes[0];
				$scope.regionSelectValue_2 = $scope.regionSelectValue.cityList[0];
				$scope.industrySelectValue = $scope.industyList[0];
				$scope.industrySelectValue_2 = $scope.industrySelectValue.children[0];

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
				size		     :	$scope.pageSelectValue.pageType,
				page		     :	$scope.turnPage.currentPage,
				searchKey	     :	$scope.searchKey,
				areaCode	     :	$scope.regionStatus(),
				regionIndex      :	$scope.regionSelectValue._index_,
				regionIndex_2    :	$scope.regionSelectValue_2._index_,
				industyId	     :	$scope.industryStatus(),
				industryIndex    :	$scope.industrySelectValue._index_,
				industryIndex_2  :	$scope.industrySelectValue_2._index_,
				realmId          :	$scope.fieldSelectValue.realmId,
				fieldTypes       :	$scope.fieldSelectValue._index_,
				sortType         :	$scope.sortSelectValue.sortType,
				isMember         : $scope.userSelectValue._index_,//用户类型？？？？？？？
				sortTypes        :	$scope.sortSelectValue._index_
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
			console.log($scope.getParams());
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
                $scope.pageSelectValue.pageType,
				$scope.turnPage.totalItems);
		};
		$scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.publicChange();
            }
		};
        $scope.dataChange = function(e){
                $scope.publicChange();
        };

        $scope.dataChange_page = function(e){
            $scope.publicChange_page();
        };
        $scope.publicChange_page = function () {
            $scope.fetchData();
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.pageSelectValue.pageType,
                $scope.turnPage.totalItems);
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

		/*$scope.findParentId = function(_list_,_children_,_key_,_id_,_name_){
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
		};*/
		/* 加入黑名单 */
		$scope.addBlackList = function (_id_) {
			$scope.alterTitle = "确认操作";
			$scope.alertInformation = "确认要将其加入黑名单么?";
			var alertHtml = 'app/views/alert/alert.html';
			ModalService.modalSet($scope,alertHtml);
			$scope.doTrue = function () {
				ModalService.modalHide();
				MobileUserFactory.setUserBlack(
					{
						userId: _id_,
						inBlack: true
					},
					$scope.setUserBlackCallback
				)
			}
		};

	});