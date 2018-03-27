/**
 * Created by wangjia on 2017/10/31.
 */
App.controller('articleCtrl',function($scope, $http,Notify,$timeout,$location, $cookieStore,yulanService, ModalService,articleFactory,mdFactory,FieldFactory){
    //复制成功
    $scope.copy=function(){
        Notify.copy();
    }
    //$scope.articleSelect='结算类型';
    //文章类型
    $scope.articleState = [
        {_index_: -1, _value_: "全部"},
        {_index_: 0, _value_: "草稿"},
        {_index_: 1, _value_: "定时"},
        {_index_: 2, _value_: "已发布"}
    ];
    $scope.articleStateSelectValue = $scope.articleState[0];
    //文章领域
    $scope.realmList=[
        {realmId: 0, name: "全部"},
        {realmId: 34, name: "消费者研究"},
        {realmId: 33, name: "引爆营销"},
        {realmId: 32, name: "品牌突围"},
        {realmId: 31, name: "渠道开拓"},
        {realmId: 30, name: "开启新零售"},
        {realmId: 29, name: "销量破局"}
    ]
    $scope.realmListSelectValue =$scope.realmList[0];

    /*
     时间框
     * */
    $scope.today = function() {
        $scope.dt = mdFactory.getStringByDate(new Date());
    };
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
        date:''
    };
    $scope.finalEndDate = {
        opened: false,
        date:''
    };
    $scope.openFinalBeginDate = function($event) {
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

    $scope.format = 'yyyy-MM-dd';

    //
    $scope.getArticleListCallback=function(data){
        console.log(data)
        $scope.loading = false;
        $scope.articleList = data.articleList;
        $scope.turnPage.totalItems = data.totalCount;
        $cookieStore.put('myapp.getArticleList.searches', $scope.getParams());
    }
    $scope.fetchData = function () {
        console.log($scope.getParams())
        //return;
        $scope.loading = true;
        articleFactory.getArticleList(
            $scope.getParams(),
            $scope.getArticleListCallback
        );
    };
    $scope.getCookie = function () {
        if ($cookieStore.get('myapp.getArticleList.searches')) {
            $scope.searchKey = $cookieStore.get('myapp.getArticleList.searches').searchKey;
        } else{
            $scope.searchKey = "";
        }
    };
    $scope.getParams = function () {
        if (typeof($scope.finalBeginDate.date) != "string") {
            $scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
        }
        if (typeof($scope.finalEndDate.date) != "string") {
            $scope.finalEndDate.date = mdFactory.getStringByDate($scope.finalEndDate.date);
        }

        return {
            beginTime   :$scope.finalBeginDate.date,
            endTime : $scope.finalEndDate.date,
            size: $scope.turnPage.itemsPerPage,
            page: $scope.turnPage.currentPage,
            search: $scope.searchKey||'',
            isShow:0,
            reviewStatus:0,
            realmId: $scope.realmListSelectValue.realmId,
            articleType: $scope.articleStateSelectValue._index_
        };
    };

    /* 配置分页参数  */
    $scope.turnPage = mdFactory.getTurnPage();
    console.log(mdFactory.getTurnPage())
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
            $scope.turnPage.totalItems
        );
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
//    删除文章相关
    $scope.updateArticleStatusCallblack=function(data){
        Notify.alert();//提示操作成功
        $timeout(function(){
            $location.replace().path('/cms/reallyDeleteArticle');
        },1000);
    }
    $scope.removeMasterList = function (_id_,_status_) {
        $scope.alterTitle = "确认操作";
        console.log(_id_)
        $scope.alertInformation = "确认要删除该文章么?";
        var alertHtml = 'app/views/alert/alert.html';
        ModalService.modalSet($scope, alertHtml);
        $scope.doTrue = function () {
            ModalService.modalHide();
            articleFactory.updateArticleStatus(
                {
                    articleId  : _id_,
                    status: 2
                },
                $scope.updateArticleStatusCallblack
            )
        }
    };

    $scope.articlePreview=function(_articleUrl_){
        console.log(_articleUrl_);
        disabledMouseWheel();
        $("body").prepend(`<div class="outSaoMa" >
            <div class="saoMa">
                <div id="qrcode"></div>
            </div>
        </div>`);
        //二维码
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 190,
            height : 190
        });
        function makeCode () {
            //生成二维码
            qrcode.makeCode(_articleUrl_);
        }
        makeCode();
        $('.outSaoMa').css({
            width:winWidth,
            height:winHeight,
            zIndex:10000,
            left:0,
            top:0
        });
        $('.outSaoMa').click(function(){
            window.onmousewheel = document.onmousewheel = true;
            $(this).remove();
        });
    }

    init();

    function init(){
        addEvent();
    }
    /**
     * 添加事件侦听
     */
    function addEvent(){
        //添加预览功能
        addPreviewFun();

    }
    /**
     * 添加预览功能
     */
    function addPreviewFun(){
        var pre_btn = $("#btn-preview");
        var pre_layer = $(".preview-layer");
        var pre_bg = $(".preview-bg");
        $scope.articlePreview1 = function (data) {
            console.log(data)
            disabledMouseWheel();
            $scope.articleData=data;
            updatePreviewHtml();
            pre_layer.show();
            resetPrePhoneCss();
        };
        pre_bg.on("click",function(){
            window.onmousewheel = document.onmousewheel = true;
            pre_layer.hide();
        });
        //预览图片居中样式
        var css_str = {};
        var pre_phone = $(".preview-phone");
        var pos_left = 0;
        var pos_top = 0;
        $(window).resize(resetPrePhoneCss);
        //重置预览手机页面的CSS
        function resetPrePhoneCss(){
            pos_left = 100+$(window).width() / 2 - pre_phone.width() / 2;
//            pos_top = $(window).height() / 2 - pre_phone.height() / 2;
            pos_top = 20;
            css_str = {
                left:pos_left + "px",
                top:pos_top + "px"
            }
            pre_phone.css(css_str);
        }
        //初始化时设置预览手机元素位置
        resetPrePhoneCss();
    }

    /**
     * 更新预览页面显示内容
     */
    function updatePreviewHtml(){
        //return;
        var ifr_document = document.getElementById("preview-html").contentWindow.document;
        if(ifr_document){
            if( $scope.articleData.fromSource){
                $(ifr_document).find(".laiyuan").show();
            }else{
                $(ifr_document).find(".laiyuan").hide();
            }
            if( $scope.articleData.isShowAbstracts==1){
                $(ifr_document).find(".zhaiyao").show();
            }else{
                $(ifr_document).find(".zhaiyao").hide()
            }
            //设置标题
            var ifr_title = $(ifr_document).find(".article-title .title");
            ifr_title.html($scope.articleData.title );
            //设置作者 时间
            $(ifr_document).find(".article-top .article-time").html($scope.articleData.authorName);
            $(ifr_document).find(".article-top .article-yue").html($scope.articleData.postedTime);
            //设置摘要文章来源
            $(ifr_document).find(".zhaiyao").html($scope.articleData.abstracts);
            $(ifr_document).find(".laiyuan").html('文章来源:'+$scope.articleData.fromSource);

            //设置主要内容
            $(ifr_document).find(".article-content").html($scope.articleData.content);
            //var content_str = CKEDITOR.instances.TextArea1.getData();
            //var ifr_content = $(ifr_document).find(".article-content");
            //ifr_content.html(content_str);
            document.getElementById('preview-html').contentWindow.sh();
            //document.getElementById('preview-html').contentWindow.findDimensions();
        }

    }
})