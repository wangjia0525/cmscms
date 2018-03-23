/**
 * Created by Administrator on 2017/7/4.
 */
App.controller('yxlCtrl',function($scope, $http, $cookieStore, yxlFactory,mdFactory){
    $scope.userName="用户名";
    $scope.projectName="项目名称";
    $scope.handles="操作者";
    $scope.telephone="手机号";
    $scope.resultSort="结果排序";
    //项目名称
    $scope.project = [
        {_index_: -1, _value_: "全部", "reasonType":0},
        {_index_: 0, _value_: "系统调整", "reasonType":1},
        {_index_: 1, _value_: '动态5个赞', "reasonType":2},
        {_index_: 2, _value_: '回复问答被赞五次-' , "reasonType":3},
        {_index_: 3, _value_:   '五十个赞', "reasonType":4},
        {_index_: 4, _value_:  '邀请好友', "reasonType":5},
        {_index_: 5, _value_: '回答被邀请的问题', "reasonType":6},
        {_index_: 6, _value_: '完善信息', "reasonType":7},
        {_index_: 7, _value_: '话题擂台关注数', "reasonType":8},
        {_index_: 8, _value_: '举报成立', "reasonType":9},
        {_index_: 9, _value_:  '被拒绝比例高', "reasonType":10},
        {_index_: 10, _value_: '课程订购超过5人', "reasonType":11},
        {_index_: 11, _value_: '课程订购超过50人', "reasonType":12},
        {_index_: 12, _value_:  '话题回复超过5条', "reasonType":13},
        {_index_: 13, _value_:  '周听课时长达到一小时', "reasonType":15},
        {_index_: 15, _value_:  '授课奖励', "reasonType":17},
        {_index_: 16, _value_:  '签到任务', "reasonType":18},
        {_index_: 17, _value_:  '邀请好友成为会员', "reasonType":19},
        {_index_: 14, _value_:  '分享问答', "reasonType":16},
        {_index_: 18, _value_:  '分享文章', "reasonType":20},
        {_index_: 19, _value_:  '分享日课', "reasonType":21},
        {_index_: 20, _value_:  '分享课程表', "reasonType":22}
    ];
    $scope.projectSelectValue=$scope.project[0];
    //操作者
    $scope.operator = [
        {_index_: -1, _value_: "全部", "reasonType":0},
        {_index_: 0, _value_: "系统", "reasonType":1},
        {_index_: 1, _value_: 'cms用户', "reasonType":2},
    ];
    $scope.operatorSelectValue=$scope.operator[0];
    //结果排序
    $scope.types = [
        {_index_: -1, _value_: "全部", "reasonType":-1},
        {_index_: 0, _value_: "加分", "reasonType":0},
        {_index_: 1, _value_: '减分', "reasonType":1},
    ];
    $scope.typesSelectValue=$scope.types[0];
    //时间排序
    $scope.order = [
        {_index_: 0, _value_: "顺序", "reasonType":1},
        {_index_: 1, _value_: '倒序', "reasonType":0},
    ];
    $scope.orderSelectValue=$scope.order[1];
    /* 为service写的回调方法，保证service回传的model可以传递给controller */
    $scope.yxlCallback = function(data){
        console.log(data);
        $scope.loading = false;
        $scope.userScoreLogList=data.userScoreLogList;
        $scope.turnPage.totalItems = data.totalCount;
        $cookieStore.put('myapp.yxlList.searches',$scope.getParams());
    };
    $scope.getParams = function(){
        return {
            //传进来的参数
            size		:	$scope.turnPage.itemsPerPage,
            page		:	$scope.turnPage.currentPage,
            reasonType :$scope.projectSelectValue.reasonType,//项目名称
            operator     : $scope.operatorSelectValue.reasonType,//操作者
            name        :$scope.name,
            phoneNo   :$scope.phoneNo,
            scoreType  :$scope.typesSelectValue.reasonType,//结果排序,
            order :$scope.orderSelectValue.reasonType//时间排序
        }
    };
    /* 获取adviceList */
    $scope.fetchData = function(){
        $scope.loading = true;
        yxlFactory.getYxl(
            $scope.getParams(),
            $scope.yxlCallback
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
    $scope.dataEvent = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.publicChange();
        }
    };
    /* show search condition by cookie */
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.yxlList.searches')) {
            $scope.searchKey = $cookieStore.get('myapp.yxlList.searches').searchKey;
            $scope.phoneNo = $cookieStore.get('myapp.yxlList.searches').phoneNo;
        } else{
            $scope.orderSelectValue=$scope.order[0];//时间排序
            $scope.typesSelectValue=$scope.types[0];//结果排序
            $scope.operatorSelectValue=$scope.operator[0];//操作者
            $scope.projectSelectValue=$scope.project[0];//项目名称
            $scope.searchKey = "";
            $scope.phoneNo = "";
        }
    };
    $scope.dataChange_page = function(e){//项目名称
        $scope.publicChange_page();
    };
    $scope.publicChange_page = function () {//项目名称
        $scope.fetchData();
    };
    //$scope.dataChange_page1 = function(e){//操作者
    //    $scope.publicChange_page1();
    //};
    //$scope.publicChange_page1 = function () {//操作者
    //    $scope.fetchData();
    //};
    //$scope.dataChange_page2 = function(e){//结果排序
    //    $scope.publicChange_page2();
    //};
    //$scope.publicChange_page2 = function () {//结果排序
    //    $scope.fetchData();
    //};
    //$scope.dataChange_page3 = function(e){//时间排序
    //    $scope.publicChange_page3();
    //};
    //$scope.publicChange_page3 = function () {//时间排序
    //    $scope.fetchData();
    //};
})