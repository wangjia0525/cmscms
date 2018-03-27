App
    .controller('systemMessageCtrl', function ($scope, $rootScope, $http, $stateParams, ModalService, $timeout, OtherFactory, $location, FieldFactory, $cookieStore, MobileUserFactory, Notify, SystemMessageFactory, TopicFactory, ContestFactory,CoursesFactory, articleFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getIndustyListCallback = function (data) {
            $scope.industyList = data.industyList;
            $scope.getSelectList($scope.industyList);
            //$scope.JobPosition();
            //$scope.positionFun();
            $scope.industyFun();
            $scope.setInt();
        };
        /*$scope.getJobPositionListCallback = function (data) {
            $scope.jobPositionList = data.jobPositionList;
            $scope.getSelectList($scope.jobPositionList);
            $scope.positionFun();
            $scope.setInt();
        };*/
        $scope.realmListCallback = function (data) {
            $scope.realmList = data.realmList;
            //console.log(data.realmList)
            for (var i = 0; i < $scope.realmList.length; i++) {
                $scope.realmList[i].fnChecked = true;
            }
            $scope.Industy();
        };

        $scope.setAddpushjobCallback = function () {
            Notify.alert();
        };

        $scope.getTopicListCallback = function (data) {
            //console.log(data);
            $scope.topicList1 = data.topicList;
            $scope.getContestList()
        };

        $scope.getContestListCallback = function (data) {
            //console.log(data);
            $scope.contextList = data.topicList;
            $scope.context = data.topicList;
            $scope.topicList = $scope.topicList1.concat($scope.context);
        };
        $scope.getCourseListCallback = function (data) {
            //console.log(data);
            $scope.courseList = data.result;
        };
        //文章
        $scope.getArticleListCallback=function(data){
            console.log(data);
            $scope.articleList = data.articleList;
        }
        $scope.userType =false;
        /* board title set */
        $scope.regionSelectName = "地区";
        $scope.industrySelectName = "行业";
        $scope.positionSelectName = "职位";
        $scope.fieldSelectName = "领域";
        $scope.setSelectName = "发送类型";
        $scope.setType = [
            {"_index_": "0", "type": "全部"},
            {"_index_": "1", "type": "push"},
            {"_index_": "2", "type": "站内信"}
        ];
        //问答、擂台、日课
        $scope.selType = [
            {"_index_": "1", "type": "问答",'index':'0'},
            {"_index_": "1", "type": "擂台",'index':'1'},
            {"_index_": "4", "type": "日课",'index':'2'},
            {"_index_": "9", "type": "文章",'index':'4'},//文章
            {"_index_": "5", "type": "超链接",'index':'3'}
        ];
        //文本或插入链接
        $scope.insert= [
            {_index_: '7', _value_: "文本", "reasonType":1},
            {_index_: '', _value_: '插入链接', "reasonType":2}
        ];
        $scope.adUrl={};
        $scope.dataChange = function () {
            $scope.adUrl.name='';
            $scope.topicId='';
        };
        $scope.select1=true;
        $scope.select2=false;
        $scope.insertSelectValue=$scope.insert[0];
        $scope.insertSelectValue.reasonType=1
        $scope.isTrue=function(){
            if($scope.insertSelectValue.reasonType==1){
                $scope.select1=true;
                $scope.select2=false;
            }else{
                $scope.select1=false;
                $scope.select2=true;
            }
        }
        /* 初始化select */
        $scope.setInt = function () {
            $scope.regionSelectValue = $scope.BigRegionArr[0][0];
            $scope.regionSelectValue_2 = "全部";
            $scope.industrySelectValue = $scope.BigIndustyArr[0][0];
            $scope.industrySelectValue_2 = "全部";
            //$scope.positionSelectValue = $scope.BigPositionArr[0][0];
            //$scope.positionSelectValue_2 = "全部";
            //$scope.insertSelectValue=$scope.insert[0];
            //$scope.selSelectValue=$scope.setType[0];
            $scope.setSelectValue = $scope.setType[0];
            $scope.insertSelectValue=$scope.insert[0];
        };

        $.ajax({
            type: "get",
            url: "data/region.json",
            async: false,
            success: function (data) {
                $scope.regionTypes = data;
                $scope.regionTypes.unshift({
                    "code": "0",
                    "name": "全部"
                    /* "cityList": [
                     {
                     "code": "0",
                     "name": "全部"
                     }
                     ]*/
                });
                /* for(var i=1;i<$scope.regionTypes.length;i++){
                 $scope.regionTypes[i].cityList.unshift(
                 {
                 "code": "0",
                 "name": "全部"
                 }
                 );
                 }*/
                for (var index in $scope.regionTypes) {
                    $scope.regionTypes[index]._index_ = index;
                    for (var _index in $scope.regionTypes[index].cityList) {
                        $scope.regionTypes[index].cityList[_index]._index_ = _index;
                    }
                }
            }
        });
        /* 行业/职位列表 */
        $scope.Industy = function () {
            OtherFactory.getIndustyList(
                {},
                $scope.getIndustyListCallback
            );
        };


        /*$scope.JobPosition = function () {
            OtherFactory.getJobPositionList(
                {},
                $scope.getJobPositionListCallback
            );
        };*/

        /* 参数对象  */
        $scope.getParams = function () {
            $scope.regionBigArr(regionArrData);
            if(typeof($scope.finalBeginDate.date) != "string") {
                $scope.finalBeginDate.date = mdFactory.getStringByDateAll($scope.finalBeginDate.date);
            }
            if($scope.insertSelectValue._index_==7){
                return {
                    realmId: $scope.addRealmIds(),
                    type: $scope.setSelectValue._index_,
                    jumpType : 7,
                    content: $scope.content,
                    topicId: $scope.topicId,
                    areaCode: $scope.regionBigArr(regionArrData),
                    industyId: $scope.industyBigArr(industyArrData),
                    Timing: $scope.Timing,
                    ReleaseTime:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date
                    //positionId: $scope.positionBigArr(positionArrData)
                };
            }
            if( $scope.selSelectValue._index_==1){
                return {
                    realmId: $scope.addRealmIds(),
                    type: $scope.setSelectValue._index_,
                    jumpType  : 1,
                    image:$scope.banner.pic,
                    synopsis: $scope.synopsis,
                    title: $scope.title,
                    topicId: $scope.topicId,
                    areaCode: $scope.regionBigArr(regionArrData),
                    industyId: $scope.industyBigArr(industyArrData),
                    Timing: $scope.Timing,
                    ReleaseTime:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date
                    //positionId: $scope.positionBigArr(positionArrData)
                };
            }
            if( $scope.selSelectValue._index_==5){
                return {
                    realmId: $scope.addRealmIds(),
                    type: $scope.setSelectValue._index_,
                    jumpType  : 5,
                    image:$scope.banner.pic,
                    synopsis: $scope.synopsis,
                    title: $scope.title,
                    topicId: $scope.topicId,
                    url:$scope.urlAdd,
                    areaCode: $scope.regionBigArr(regionArrData),
                    industyId: $scope.industyBigArr(industyArrData),
                    Timing: $scope.Timing,
                    ReleaseTime:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date
                };
            }
            if( $scope.selSelectValue._index_==4){
                return {
                    realmId: $scope.addRealmIds(),
                    type: $scope.setSelectValue._index_,
                    jumpType  : 4,
                    image:$scope.banner.pic,
                    synopsis: $scope.synopsis,
                    title: $scope.title,
                    topicId: $scope.topicId,
                    areaCode: $scope.regionBigArr(regionArrData),
                    industyId: $scope.industyBigArr(industyArrData),
                    Timing: $scope.Timing,
                    ReleaseTime:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date
                };
            }
            //文章
            if( $scope.selSelectValue._index_==9){
                return {
                    realmId: $scope.addRealmIds(),
                    type: $scope.setSelectValue._index_,
                    jumpType  : 9,
                    image:$scope.banner.pic,
                    synopsis: $scope.synopsis,
                    title: $scope.title,
                    topicId: $scope.topicId,
                    areaCode: $scope.regionBigArr(regionArrData),
                    industyId: $scope.industyBigArr(industyArrData),
                    Timing: $scope.Timing,
                    ReleaseTime:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date
                };
            }
        };


        /* 获取领域列表 */
        $scope.field = function () {
            FieldFactory.getRealmList(
                {
                    size: 1000,
                    page: 1
                },
                $scope.realmListCallback
            );
        };
        $scope.field();

        /* 返回的领域列表匹配 */
        $scope.addRealmIds = function () {

            var realmIds = '';
            for (var i = 0; i < $scope.realmList.length; i++) {
                if ($scope.realmList[i].fnChecked) {
                    realmIds+=$scope.realmList[i].realmId +",";
                }
            }
            return realmIds.substring(0,realmIds.length-1);
        };


        $scope.addMessage = function () {
            console.log($scope.getParams());
            //return;
            SystemMessageFactory.setAddpushjob(
                $scope.getParams(),
                $scope.setAddpushjobCallback
            )
        };
        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            } else {
                $scope.successAlert = "提交信息";
                var templateUrl_2 = 'app/views/alert/success.html';
                ModalService.modalSet($scope, templateUrl_2);
                $scope.updateTrue = function () {
                    ModalService.modalHide();
                    $scope.addMessage();
                };
            }
        };
        //文章
        $scope.getArticleList=function(){
            articleFactory.getArticleList(
                {
                    search: $scope.contentUrl,
                    articleType:10000,
                    reviewStatus:10001,
                    realmId:0,
                    isShow: 0,
                    page: 1,
                    size: 5
                },
                $scope.getArticleListCallback
            )
        }
        //$scope.getArticleList();
        $scope.userChange4 = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getArticleList();
        };
        /* Course list 日课*/
        $scope.getCourseList = function () {
            CoursesFactory.getCourseList(
                {
                    search: $scope.contentUrl,
                    status: 1,
                    page: 1,
                    size: 5
                },
                $scope.getCourseListCallback
            )
        };
        $scope.getCourseList();
        $scope.userChange2 = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getCourseList();
        };
        /* topic list 问答*/
        $scope.getTopicList = function () {
            TopicFactory.getTopicList(
                {
                    searchKey: $scope.contentUrl,
                    sortType: 2,
                    type: 0,
                    page: 1,
                    size: 3
                },
                $scope.getTopicListCallback
            )
        };
        $scope.getTopicList();
        $scope.userChange = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getTopicList();
        };
        $scope.changeName = function (_name_, _id_) {
            $scope.adUrl.name = _name_;
            $scope.topicId = _id_

        };

        /* contest list 擂台*/
        $scope.getContestList = function () {
            ContestFactory.getContestList(
                {
                    searchKey: $scope.contentUrl,
                    sortType: 2,
                    type: 0,
                    page: 1,
                    size: 3
                },
                $scope.getContestListCallback
            )
        };
        $scope.userChange1 = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getContestList();
        };
        $scope.hideUl = function () {
            $timeout(function () {
                $(".user-ul-style_").hide();
            }, 300);
        };
        $scope.showUl = function () {
            $(".user-ul-style_").show();
        };

        $scope.hideUl1 = function () {
            $timeout(function () {
                $(".user-ul-style__").hide();
            }, 300);
        };
        $scope.showUl1 = function () {
            $(".user-ul-style__").show();
        };
        //文章
        $scope.hideUl4 = function () {
            $timeout(function () {
                $(".user-ul-style___").hide();
            }, 300);
        };
        $scope.showUl4 = function () {
            $(".user-ul-style___").show();
        };
        $scope.hideU2 = function () {
            $timeout(function () {
                $(".user-ul-style___").hide();
            }, 300);
        };
        $scope.showU2 = function () {
            $(".user-ul-style___").show();
        };
        /* 数据列表处理 */
        $scope.getSelectList = function (_list_) {
            _list_.unshift({
                "industyId": "0",
                "name": "全部"
                /*  "children": [
                 {
                 "industyId": "0",
                 "name": "全部"
                 }
                 ]*/
            });
            /* for(var i=1;i<_list_.length;i++){
             _list_[i].children.unshift(
             {
             "industyId": "0",
             "name": "全部"
             }
             );
             }*/
            for (var index in _list_) {
                _list_[index]._index_ = index;
                for (var _index in _list_[index].children) {
                    _list_[index].children[_index]._index_ = _index;
                }
            }
        };

        /* region */
        var regionArrData = [];
        $scope.regionFun = function () {
            /* [[{}]]形式的数据处理 */
            $scope.regionHandle = function (n) {
                /* 一级菜单change,查找其id附加给数组*/
                $scope.dataChange_1 = function (_parent_, _index_) {
                    $scope.BigRegionArr[_index_][0].onOff = false;
                    regionArrData[_index_] = [];
                    $scope.BigRegionArr[_index_][0].model = "全部";
                    regionArrData[_index_].push({parent: _parent_.code});
                };
                /* 二级菜单点选操作 */
                $scope.regionCheckBox = function (_obj_) {
                    _obj_.checked = !_obj_.checked;
                    if (!_obj_.checked) {
                        $scope.remove(regionArrData[n], _obj_.code, 'code')
                    } else {
                        regionArrData[n].push(_obj_)
                    }
                    if (regionArrData[n].length == 1) {
                        $scope.BigRegionArr[n][0].model = "全部";
                    } else {
                        $scope.BigRegionArr[n][0].model = $scope.findNames(regionArrData[n]);
                    }
                    //console.log(regionArrData);
                };
            };

            /* 最终返回的数组处理 */

            $scope.regionBigArr = function (arr) {
                var regionArrTrue = '';
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].length == 1) {
                        regionArrTrue+=arr[i][0].parent+','
                    } else {
                        for (var j = 1; j < arr[i].length; j++) {
                            regionArrTrue+=arr[i][j].code+','
                        }
                    }
                }
                return regionArrTrue.substring(0,regionArrTrue.length-1);
            };
            /* 创建多个选框对象,并附加属性 */
            var n = -1;
            $scope.BigRegionArr = [];
            $scope.fnAddRegionData = function () {
                n++;
                var regionData = angular.copy($scope.regionTypes);
                $scope.BigRegionArr.push(regionData);
                //$scope.BigRegionArr[n][0].model =n;
                $scope.BigRegionArr[n][0].index = n;
                $scope.BigRegionArr[n][0].onOff = false;
                regionArrData.push([]);
                $scope.regionHandle(n);
            };
            /* 初始化 */
            $scope.fnAddRegionData();
            $scope.BigRegionArr[0][0].model = "全部";
            /* 二级选项传入所引值 */
            $scope.regionInput = function (_index_) {
                $scope.BigRegionArr[_index_][0].onOff = !$scope.BigRegionArr[_index_][0].onOff;
                if ($scope.BigRegionArr[_index_][0].onOff) {
                    $scope.regionHandle(_index_)
                }
            };
        };
        $scope.regionFun();

        /* industy */
        var industyArrData = [];
        $scope.industyFun = function () {
            /* [[{}]]形式的数据处理 */
            $scope.industyHandle = function (n) {
                /* 一级菜单change,查找其id附加给数组*/
                $scope.dataChange_2 = function (_parent_, _index_) {
                    $scope.BigIndustyArr[_index_][0].onOff = false;
                    industyArrData[_index_] = [];
                    $scope.BigIndustyArr[_index_][0].model = "全部";
                    industyArrData[_index_].push({parent: _parent_.industyId});
                };
                /* 二级菜单点选操作 */
                $scope.industyCheckBox = function (_obj_) {
                    _obj_.checked = !_obj_.checked;
                    if (!_obj_.checked) {
                        $scope.remove(industyArrData[n], _obj_.industyId, 'industyId')
                    } else {
                        industyArrData[n].push(_obj_)
                    }
                    if (industyArrData[n].length == 1) {
                        $scope.BigIndustyArr[n][0].model = "全部";
                    } else {
                        $scope.BigIndustyArr[n][0].model = $scope.findNames(industyArrData[n]);
                    }
                    //console.log(industyArrData);
                };
            };

            /* 最终返回的数组处理 */

            $scope.industyBigArr = function (arr) {
                var industyArrTrue = '';
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].length == 1) {
                        industyArrTrue+=arr[i][0].parent+','
                    } else {
                        for (var j = 1; j < arr[i].length; j++) {
                            industyArrTrue+=arr[i][j].industyId+','
                        }
                    }
                }
                return industyArrTrue.substring(0,industyArrTrue.length-1);
            };
            /* 创建多个选框对象,并附加属性 */
            var n = -1;
            $scope.BigIndustyArr = [];
            $scope.fnAddIndustyData = function () {
                n++;
                var industyData = angular.copy($scope.industyList);
                $scope.BigIndustyArr.push(industyData);
                //$scope.BigIndustyArr[n][0].model =n;
                $scope.BigIndustyArr[n][0].index = n;
                $scope.BigIndustyArr[n][0].onOff = false;
                industyArrData.push([]);
                $scope.industyHandle(n);

            };
            /* 初始化 */
            $scope.fnAddIndustyData();
            $scope.BigIndustyArr[0][0].model = "全部";
            /* 二级选项传入所引值 */
            $scope.industyInput = function (_index_) {
                $scope.BigIndustyArr[_index_][0].onOff = !$scope.BigIndustyArr[_index_][0].onOff;
                if ($scope.BigIndustyArr[_index_][0].onOff) {
                    $scope.industyHandle(_index_)
                }
            };
        };

        /* position */
        /*var positionArrData = [];
        $scope.positionFun = function () {
            /!* [[{}]]形式的数据处理 *!/
            $scope.positionHandle = function (n) {
                /!* 一级菜单change,查找其id附加给数组*!/
                $scope.dataChange_3 = function (_parent_, _index_) {
                    $scope.BigPositionArr[_index_][0].onOff = false;
                    positionArrData[_index_] = [];
                    $scope.BigPositionArr[_index_][0].model = "全部";
                    positionArrData[_index_].push({parent: _parent_.jobPositionId});
                };
                /!* 二级菜单点选操作 *!/
                $scope.positionCheckBox = function (_obj_) {
                    _obj_.checked = !_obj_.checked;
                    if (!_obj_.checked) {
                        $scope.remove(positionArrData[n], _obj_.jobPositionId, 'jobPositionId')
                    } else {
                        positionArrData[n].push(_obj_)
                    }
                    if (positionArrData[n].length == 1) {
                        $scope.BigPositionArr[n][0].model = "全部";
                    } else {
                        $scope.BigPositionArr[n][0].model = $scope.findNames(positionArrData[n]);
                    }
                    //console.log(positionArrData);
                };
            };

            /!* 最终返回的数组处理 *!/

            $scope.positionBigArr = function (arr) {
                var positionArrTrue = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].length == 1) {
                        positionArrTrue.push(arr[i][0].parent)
                    } else {
                        for (var j = 1; j < arr[i].length; j++) {
                            positionArrTrue.push(arr[i][j].jobPositionId)
                        }
                    }
                }
                return positionArrTrue;
            };
            /!* 创建多个选框对象,并附加属性 *!/
            var n = -1;
            $scope.BigPositionArr = [];
            $scope.fnAddPositionData = function () {
                n++;
                var positionData = angular.copy($scope.jobPositionList);
                $scope.BigPositionArr.push(positionData);
                //$scope.BigPositionArr[n][0].model =n;
                $scope.BigPositionArr[n][0].index = n;
                $scope.BigPositionArr[n][0].onOff = false;
                positionArrData.push([]);
                $scope.positionHandle(n);

            };
            /!* 初始化 *!/
            $scope.fnAddPositionData();
            $scope.BigPositionArr[0][0].model = "全部";
            /!* 二级选项传入所引值 *!/
            $scope.positionInput = function (_index_) {
                $scope.BigPositionArr[_index_][0].onOff = !$scope.BigPositionArr[_index_][0].onOff;
                if ($scope.BigPositionArr[_index_][0].onOff) {
                    $scope.positionHandle(_index_)
                }
            };
        };*/

        /* 查询对象返回name */
        $scope.findNames = function (_arr_) {
            var arr = [];
            for (var i = 1; i < _arr_.length; i++) {
                arr.push(_arr_[i].name)
            }
            return arr;
        };

        /* 删除数组中的指定元素 */

        $scope.remove = function (arr, id, key) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] == id) {
                    arr.splice(i, 1);
                }
            }
        };
        /* $scope.fnRemoveRegionData = function (_index_) {
         console.log(_index_);
         for(var j=0; j<$scope.BigIndustyArr.length;j++){
         $scope.BigIndustyArr[j][0].index =j;
         }
         if($scope.BigIndustyArr.length !=1) {
         for (var i = 0; i < $scope.BigIndustyArr.length; i++) {
         if ($scope.BigIndustyArr[i][0].index == _index_) {
         $scope.BigIndustyArr.splice(i, 1)
         }
         }
         }
         }*/

        /* 时间选择控制 */
        $scope.today = function() {
            $scope.dt = mdFactory.getStringByDateAll(new Date());
        };
        //console.log(mdFactory.getStringByDateAll(new Date()));
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.finalBeginDate = {
            opened: false,
            date:mdFactory.getStringByDateAll(mdFactory.addDate(new Date(),0,"day"))
        };
        $scope.finalEndDate = {
            opened: false,
            date:mdFactory.getStringByDateAll(new Date())
        };
        $scope.dateOptions = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.finalBeginDate.opened = true;
        };
        $scope.openFinalEndDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.finalEndDate.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'yyyy-MM-dd HH:mm:ss';
    });
