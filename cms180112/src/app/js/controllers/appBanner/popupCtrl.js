App
    .controller('popupCtrl', function($scope,$timeout,$http,$cookieStore,Notify,ModalService,BannerFactory,TopicFactory,ContestFactory,CoursesFactory,articleFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getSearchBannerCallback = function(data){
            console.log(data);
            $scope.loading = false;
            $scope.bannerList = data.bannerList
        };
        $scope.getSortCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };
        $scope.setDeleteBannerCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };
        $scope.setAddBannerCallBack = function () {
            Notify.alert();
            $scope.fetchData();
        };

        $scope.getTopicListCallback = function (data) {
            $scope.topicList = data.topicList;
        };
        $scope.getCourseListListCallback = function (data) {
            console.log(data);
            $scope.courseList = data.result;
        };
        $scope.getContestListCallback = function (data) {
            $scope.contextList = data.topicList;
        };
        //文章
        $scope.getArticleListCallback=function(data){
            console.log(data);
            $scope.articleList = data.articleList;
        }

        /* 获取webappBanner List */
        $scope.fetchData = function(){
            $scope.loading = true;
            BannerFactory.getSearchBanner(
                {
                    type:2
                },
                $scope.getSearchBannerCallback
            );
        };
        $scope.fetchData();

        /* 排序 */
        $scope.fnSort = function (_id_,_sort_) {
            BannerFactory.getSort(
                {
                    "adId":_id_,
                    "direction":_sort_
                },
                $scope.getSortCallback
            )
        };

        /* 取消置顶 */
        $scope.removeBanner = function (_id_) {
            BannerFactory.setDeleteBanner(
                {
                    "adId":_id_
                },
                $scope.setDeleteBannerCallback
            )
        };

        $scope.banner={};
        $scope.adUrl={};
        /* 添加Banner */
        //$scope.addAd = function () {
        //    $scope.addBanner = "新增Banner";
        //    $scope.userType = true;
        //    $scope.typeList =[
        //        {index:1,_value_:"图片"},
        //        {index:2,_value_:"话题"},
        //        {index:3,_value_:"擂台"},
        //        {index:4,_value_:"广告"},
        //        {index:5,_value_:"产品"}
        //    ];
        //    $scope.bannerTypeValue =$scope.typeList[0];
        //    var alertHtml = 'app/views/alert/addAd.html';
        //    ModalService.modalSet($scope, alertHtml);
        //    $scope.doTrue = function (_index_) {
        //        ModalService.modalHide();
        //        BannerFactory.setAddBanner(
        //            {
        //                "adType":_index_,
        //                "url":$scope.adUrl.url,
        //                "name":$scope.adUrl.name,
        //                "image":$scope.banner.pic,
        //                "innerPicUrl":$scope.topicId,
        //                "isHomePage":0
        //            },
        //            $scope.setAddBannerCallBack
        //        )
        //    };
        //};
        /* 添加启动页广告 */
        $scope.addHome = function () {
            $scope.addBanner = "启动页广告";
            $scope.userType = true;
            $scope.typeList =[
                {index:1,_value_:"图片"},
                {index:2,_value_:"话题"},
                {index:3,_value_:"擂台"},
                {index:4,_value_:"广告"},
                {index:5,_value_:"产品"},
                {index:9,_value_:"文章"}
            ];
            $scope.bannerTypeValue =$scope.typeList[0];
            var alertHtml = 'app/views/alert/addHome.html';
            ModalService.modalSet($scope, alertHtml);
            $scope.doTrue = function (_index_) {
                ModalService.modalHide();
                BannerFactory.setAddBanner(
                    {
                        "adType":_index_,
                        "url":$scope.adUrl.url,
                        "name":$scope.adUrl.name,
                        "image":$scope.banner.pic,
                        "innerPicUrl":$scope.topicId,
                        "isHomePage":2
                    },
                    $scope.setAddBannerCallBack
                )
            };
        };
        $scope.dataChange = function () {
            $scope.adUrl.name='';
            $scope.adUrl.url='';
            $scope.topicId='';
        };

        /* topic list */
        $scope.getTopicList = function () {
            TopicFactory.getTopicList(
                {
                    searchKey: $scope.contentUrl,
                    sortType: 2,
                    type: 0,
                    page: 1,
                    size: 5
                },
                $scope.getTopicListCallback
            )
        };
        $scope.userChange = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getTopicList();
        };
        $scope.changeName = function (_name_, _id_) {
            $scope.adUrl.name = _name_;
            $scope.topicId = _id_;

        };
        $scope.hideUl = function () {
            $timeout(function () {
                $(".user-ul-style_").hide();
            }, 300);
        };
        $scope.showUl = function () {
            $(".user-ul-style_").show();
        };

        /* contest list */
        $scope.getContestList = function () {
            ContestFactory.getContestList(
                {
                    searchKey: $scope.contentUrl,
                    sortType: 2,
                    type: 0,
                    page: 1,
                    size: 5
                },
                $scope.getContestListCallback
            )
        };

        /* Course list */
        $scope.getCourseList = function () {
            CoursesFactory.getCourseList(
                {
                    search: $scope.contentUrl,
                    status: 1,
                    page: 1,
                    size: 5
                },
                $scope.getCourseListListCallback
            )
        };


        /*文章 list*/
        $scope.getArticleList=function(){
            articleFactory.getArticleList(
                {
                    search: $scope.contentUrl,
                    isShow: 0,
                    page: 1,
                    size: 5
                },
                $scope.getArticleListCallback
            )
        }
        $scope.userChange3 = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getArticleList();
        };
        //    文章
        $scope.hideU3 = function () {
            $timeout(function () {
                $(".user-ul-style___").hide();
            }, 300);
        };
        $scope.showU3 = function () {
            $(".user-ul-style___").show();
        };
        $scope.userChange1 = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getContestList();
        };

        $scope.userChange2 = function (_contentUrl_) {
            $scope.contentUrl = _contentUrl_;
            $scope.getCourseList();
        };
        $scope.changeName1 = function (_name_, _id_) {
            $scope.adUrl.name = _name_;
            $scope.topicId = _id_;

        };

        $scope.hideUl1 = function () {
            $timeout(function () {
                $(".user-ul-style__").hide();
            }, 300);
        };
        $scope.showUl1 = function () {
            $(".user-ul-style__").show();
        };
        $scope.hideU2 = function () {
            $timeout(function () {
                $(".user-ul-style___").hide();
            }, 300);
        };
        $scope.showU2 = function () {
            $(".user-ul-style___").show();
        };

    });