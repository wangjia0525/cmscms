/**
 * Created by Administrator on 2017/10/31.
 */
App.controller('editorArticleCtrl',function($scope, $http,$stateParams,$timeout,$location,Notify,yulanService,$interval, $cookieStore,FieldFactory,ModalService,MobileUserFactory, articleFactory,mdFactory){
    $scope.articleNumber=$stateParams.articleNumber
    $scope.notUse=false;
    $scope.checkLen=function(obj) {
        var maxChars = 50;//最多字符数
        if(obj){
            $("#countShow").show();
            var curr = maxChars - obj.length;
            if(curr>=0){
                curr=curr;
                $("#countShow").html(' 您还可以输入'+curr.toString()+'个文字').css('color','#000');
            }else{
                curr=-curr;
                $("#countShow").html('你输入已超过'+curr.toString()+'个文字').css('color','red');
            }

        }else{
            $("#countShow").hide();
        }
    }
    $scope.checkLen1=function(obj) {
        var maxChars = 120;//最多字符数
        if(obj){
            $("#countShow1").show();
            var curr = maxChars - obj.length;
            if(curr>=0){
                curr=curr;
                $("#countShow1").html(' 您还可以输入'+curr.toString()+'个文字').css('color','#000');
            }else{
                curr=-curr;
                $("#countShow1").html('你输入已超过'+curr.toString()+'个文字').css('color','red');
            }

        }else{
            $("#countShow1").hide();
        }
    }
    $scope.articleSelect='结算类型';
    $scope.realmListCallback = function (data) {
        $scope.realmList = data.realmList;
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
    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor');
    $scope.$on('$destroy', function() {
        ue.destroy();
    });
    /* 返回的领域列表匹配 */
    $scope.addRealmIds = function () {
        var realmIds = '';
        for (var i = 0; i < $scope.realmList.length; i++) {
            if ($scope.realmList[i].fnChecked) {
                realmIds+=$scope.realmList[i].realmId +",";
            }
        }
        if(realmIds==''){
            return "34,33,32,31,30,29";
        }else{
            return realmIds.substring(0,realmIds.length-1);
        }

    };
//    文章类型
    $scope.articleType = [
        {_index_: 0, _value_: "列表展示"},
        {_index_: 1, _value_: "非列表展示"}
    ];
    if($scope.articleNumber==0){
        $scope.articleSelectValue = $scope.articleType[0];
    }else{
        $scope.articleSelectValue = $scope.articleType[1];
    }

//    摘要abstracts
    $scope.abNum=1;
//    平台用户
    $scope.type=1;
    $scope.isPlat=false;
    $scope.isNotPlat=true;
    $scope.isTrue=function(){
        $scope.isPlat=false;
        $scope.isNotPlat=true;
        $scope.uName='';
    }
    $scope.isNotTrue=function(){

        $scope.isPlat=true;
        $scope.isNotPlat=false;
        $scope.phone='';
        $scope.userId='';
        $scope.userName='';
    }
    $scope.getMobileUserListCallback = function (data) {
        if(data.userList.length != 0){
            $scope.userName = data.userList[0].user.name;
            $scope.userId = data.userList[0].user.userId;
        }else {
            $scope.userName = "";
            $scope.userId = "";
        }
        $scope.userList = data.userList;
    };
    $scope.hideUl = function () {//手机号相关
        $timeout(function () {
            $scope.userType = false
        }, 300);
    };
    $scope.changeName = function (_name_, _id_) {//手机号相关
        $scope.phone= _name_;
        $scope.userName=_name_;
        $scope.userId = _id_
        //console.log($scope.appUserId)
    };
    $scope.getUserList = function () {
        MobileUserFactory.getMobileUserList(
            {
                searchKey: $scope.phone,
                page: 1,
                size: 5
            },
            $scope.getMobileUserListCallback
        )
    };
    $scope.userChange = function () {
        //console.log($scope.product.phone)
        $scope.getUserList();

    };
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
    $scope.format = 'yyyy-MM-dd HH:mm:ss';

    //$.getScript("ckeditor/ckeditor.js");
    //CKEDITOR.replace("TextArea1",{disallowedContent:'img{width,height};img[width,height]'});
    //$( document ).ready(function() {
    //    // Handler for .ready() called.
    //    $("#TextArea1").focus();
    //    setInterval(function(){$("#TextArea1").css("top",($("#TextArea1").offset().top - $("#TextArea1").height())+"px")})
    //});
    $scope.articleId;
    $scope.articleUrl;
    $scope.articleCallback=function(data){
        Notify.alert();//提示操作成功
        console.log(data);
        $scope.articleId=data.articleId;
        $scope.articleUrl=data.articleUrl;

    }
    $scope.status=0;
    $scope.getParams = function () {
        if(typeof($scope.finalBeginDate.date) != "string") {
            $scope.finalBeginDate.date = mdFactory.getStringByDateAll($scope.finalBeginDate.date);
        }
        return {
            realmId: $scope.addRealmIds(),
            image:$scope.banner.pic,
            isShow:$scope.articleSelectValue._index_,//是否列表展示
            isPlatform:$scope.type,//是否平台用户
            userId:$scope.userId,//作者id
            authorName:$scope.uName,//作者名
            isShowAbstracts:$scope.abNum,//是否显示摘要
            abstracts:$scope.abstracts,//摘要
            fromSource:$scope.source,//文章来源
            //content:CKEDITOR.instances.TextArea1.getData(),//文章内容
            content:UE.getEditor('editor').getContent(),//文章内容
            Timing:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date,
            isTiming:$scope.Timing,
            status:$scope.status,
            articleId:$scope.articleId,
            title: $scope.title//文章标题
        };
    };
    $scope.addArticle = function () {
        console.log($scope.getParams());
        //console.log($scope.articleId);
        //return;
        if( $scope.articleId!=undefined){
            //console.log(2);
            articleFactory.updateArticle(
                $scope.getParams(),
                $scope.articleCallback
            )
        }else{
            //console.log(1)
            articleFactory.insertArticle(
                $scope.getParams(),
                $scope.articleCallback
            )
        }
    };
    //定时器

    $scope.timer=$interval(function(){
        if (!$scope.updateForm.$valid){

        }else{

            if( $scope.articleId!=undefined){
                $scope.status=0;
                articleFactory.updateArticle(
                    $scope.getParams(),
                    function(data){
                        $scope.articleId=data.articleId;
                        if( $scope.articleId){
                            console.log(123)
                        }else{
                            console.log(321)
                        }
                    }
                )
            }else{
                $scope.status=0;
                articleFactory.insertArticle(
                    $scope.getParams(),
                    function(data){
                        $scope.articleId=data.articleId;
                        if( $scope.articleId){
                            console.log(123)
                        }else{
                            console.log(321)
                        }
                    }
                )
            }
        }
    },3*60*1000);
    $scope.$on('$destroy',function(){
        console.log('解除定时器')
        $interval.cancel($scope.timer);
    })  //在控制器里，添加$on函数

    /* 返回数据入口/表单验证 */
    $scope.submitForm = function (isValid) {
        if (!isValid) {
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';
            ModalService.modalSet($scope, templateUrl_1);
        } else {
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            $scope.notUse=true;
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                $scope.status=0;
                ModalService.modalHide();
                $scope.addArticle();
            };
        }
    };


    //发布
    $scope.updateArticleStatusCallblack=function(data){
        $timeout(function(){
            if($scope.articleNumber==1){
                $location.replace().path('/cms/articleNotList')
            }else{
                $location.replace().path('/cms/article');
            }
        },1000);
    }
    $scope.fabu=function(){
        console.log($scope.updateForm.$valid)
        if (!$scope.updateForm.$valid){
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';
            ModalService.modalSet($scope, templateUrl_1);
        }else{
            $scope.successAlert = "提交信息";
            var templateUrl_2 = 'app/views/alert/success.html';
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                ModalService.modalHide();
                if( $scope.articleId!=undefined){
                    articleFactory.updateArticle(
                        $scope.getParams(),
                        function(data){
                            Notify.alert();//提示操作成功
                            $scope.articleId=data.articleId;
                            articleFactory.updateArticleStatus(
                                {
                                    articleId  :  $scope.articleId,
                                    status: 1
                                },
                                $scope.updateArticleStatusCallblack
                            )
                        }
                    )
                }else{
                    //console.log(1)
                    articleFactory.insertArticle(
                        $scope.getParams(),
                        function(data){
                            $scope.articleId=data.articleId;
                            Notify.alert();//提示操作成功
                            articleFactory.updateArticleStatus(
                                {
                                    articleId  :  $scope.articleId,
                                    status: 1
                                },
                                $scope.updateArticleStatusCallblack
                            )
                        }
                    )
                }
            };

        }


    }
    //预览
    $scope.articlePreview=function(){
        console.log(!$scope.updateForm.$valid)
        if (!$scope.updateForm.$valid) {
            $scope.errorAlert = "错误信息";
            var templateUrl_1 = 'app/views/alert/error.html';
            ModalService.modalSet($scope, templateUrl_1);
        }else{
            if( $scope.articleId!=undefined){
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
                    qrcode.makeCode($scope.articleUrl);
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
            }else{
                articleFactory.insertArticle(
                    $scope.getParams(),
                   function(data){
                       $scope.articleId=data.articleId;
                       $scope.articleUrl=data.articleUrl;
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
                           qrcode.makeCode($scope.articleUrl);
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
                )
            }

        }

    };
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
        pre_btn.on("click",function(){
            if (!$scope.updateForm.$valid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            }else{
                disabledMouseWheel();
                updatePreviewHtml();
                pre_layer.show();
                resetPrePhoneCss();
            }
        });
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
            pos_left = $(window).width() / 2 - pre_phone.width() / 2;
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
        $scope.status=0;
        $scope.addArticle();
        //return;

        var ifr_document = document.getElementById("preview-html").contentWindow.document;
        if(ifr_document){
            ////设置标题
            //var title_str = $("#article-title").val();
            //var ifr_title = $(ifr_document).find(".article-title .title");
            //ifr_title.html(title_str);
            ////设置作者
            //var author_str = $("#article-author").val();
            //var ifr_author = $(ifr_document).find(".article-top .article-time");
            //ifr_author.html(author_str);
            if( $scope.source){
                $(ifr_document).find(".laiyuan").show();
            }else{
                $(ifr_document).find(".laiyuan").hide();
            }
            if( $scope.abNum==1){
                $(ifr_document).find(".zhaiyao").show()
            }else{
                $(ifr_document).find(".zhaiyao").hide()
            }
            //设置标题
            var ifr_title = $(ifr_document).find(".article-title .title");
            ifr_title.html($scope.title);
            //设置作者 时间
            $(ifr_document).find(".article-top .article-time").html($scope.uName|| $scope.userName);
            $(ifr_document).find(".article-top .article-yue").html((typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date);
            //设置摘要文章来源
            $(ifr_document).find(".zhaiyao").html($scope.abstracts);
            $(ifr_document).find(".laiyuan").html('文章来源:'+$scope.source);
            //设置主要内容
            //var content_str = CKEDITOR.instances.TextArea1.getData();
            var content_str = UE.getEditor('editor').getContent();
            var ifr_content = $(ifr_document).find(".article-content");
            ifr_content.html(content_str);

            $scope.close=function(){
                window.onmousewheel = document.onmousewheel = true;
                $(".preview-layer").hide();
            }
            $scope.fabu=function(){
                articleFactory.updateArticleStatus(
                    {
                        articleId  :  $scope.articleId,
                        status: 1
                    },
                    $scope.updateArticleStatusCallblack
                )
            }
        }

    }

})