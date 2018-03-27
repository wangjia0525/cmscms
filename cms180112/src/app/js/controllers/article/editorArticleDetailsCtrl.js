/**
 * Created by Administrator on 2017/10/31.
 */
App.controller('editorArticleDetailsCtrl',function($scope, $http,$stateParams,Notify,$timeout,$location, $cookieStore,$interval,FieldFactory,ModalService,MobileUserFactory, articleFactory,mdFactory){
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
    $scope.articleId=$stateParams.articleId;
    $scope.articleNumber=$stateParams.articleNumber;
    $scope.getArticleCallback=function(data){
        console.log(data);
        $scope.article=data.article;
        if($scope.article.coverImage==""){

            $scope.article.pic='app/img/fengmian.png';
        }else{
            $scope.article.pic=$scope.article.coverImage;
        }
        $("#countShow").html(' 您还可以输入'+(50-data.article.title.length)+'个文字').css('color','#000');
        $("#countShow1").html(' 您还可以输入'+(120-data.article.abstracts.length)+'个文字').css('color','#000');
        if($scope.article.isPlatform==1){
            $scope.isPlat=false;
            $scope.isNotPlat=true;
            $scope.article.authorName='';
        }else{
            $scope.isPlat=true;
            $scope.isNotPlat=false;
        }
        if($scope.article.timing==undefined){
            $scope.article.isTiming=false;
        }else{
            $scope.finalBeginDate.date=$scope.article.timing;
            $scope.article.isTiming=true;
        }
        $scope.matching($scope.article.articleRealm,$scope.realmList);//领域
        //$('#TextArea1').val(data.article.content);
        //CKEDITOR.instances.TextArea1.setData($scope.article.content);
        var value=$scope.article.content;
        $scope.articleSelectValue = $scope.articleType[$scope.article.isShow];
        if($scope.article.phoneNo!=undefined){
            $scope.getUserList();
        }
        var ue = UE.getEditor('editor');

        ue.ready(function() {
            //异步回调
            UE.getEditor('editor').execCommand('insertHtml', value);
        });
        $scope.$on('$destroy', function() {
            ue.destroy();
        });
    }

    /* 获取领域列表 */
    $scope.realmListCallback = function (data) {
        $scope.realmList = data.realmList;
        $scope.addArticle();
    };

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
    /* 领域列表匹配 */
    $scope.matching = function(_value_,_list_){
        for(var i=0;i<_value_.length;i++){
            for(var j=0;j<_list_.length;j++){
                if(_value_[i].realmId == _list_[j].realmId){
                    _list_[j].fnChecked = true;
                }
            }
        }
    };
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
//    文章类型
    $scope.articleType = [
        {_index_: 0, _value_: "列表展示"},
        {_index_: 1, _value_: "非列表展示"}
    ];

////    摘要
//    $scope.abstracts1=function(){
//        $scope.abNum=0;
//    }
//    $scope.abstracts2=function(){
//        $scope.abNum=1;
//    }
//    平台用户
    $scope.isTrue=function(){
        $scope.isPlat=false;
        $scope.isNotPlat=true;
        $scope.article.authorName='';
    }
    $scope.isNotTrue=function(){
        $scope.isPlat=true;
        $scope.isNotPlat=false;
        $scope.article.phoneNo='';
        $scope.article.userId='';
        $scope.article.userName='';
    }
    $scope.getMobileUserListCallback = function (data) {
        //console.log(data)
        if(data.userList.length != 0){
            $scope.article.userName = data.userList[0].user.name;
            $scope.article.userId = data.userList[0].user.userId;
        }else {
            $scope.article.userName = "";
            $scope.article.userId = "";
        }
        $scope.userList = data.userList;
    };
    $scope.hideUl = function () {//手机号相关
        $timeout(function () {
            $scope.userType = false
        }, 300);
    };
    $scope.changeName = function (_name_, _id_) {//手机号相关
        $scope.article.phoneNo = _name_;
        $scope.article.userName=_name_;
        $scope.article.userId = _id_
        //console.log($scope.appUserId)
    };
    $scope.getUserList = function () {
        MobileUserFactory.getMobileUserList(
            {
                searchKey: $scope.article.phoneNo,
                page: 1,
                size: 5
            },
            $scope.getMobileUserListCallback
        )
    };
    $scope.userChange = function () {
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


    //CKEDITOR.replace("TextArea1",{disallowedContent:'img{width,height};img[width,height]'},{height:200});
    $scope.addArticle = function () {
        articleFactory.getArticle(
            {
                articleId:$scope.articleId
            },
            $scope.getArticleCallback
        )
    };
    $scope.getParams = function () {
        if(typeof($scope.finalBeginDate.date) != "string") {
            $scope.finalBeginDate.date = mdFactory.getStringByDateAll($scope.finalBeginDate.date);
        }
        if(!$scope.article.pic){
            $scope.article.pic=$scope.article.coverImage;
        }
        return {
            realmId: $scope.addRealmIds(),
            image:$scope.article.pic,
            isShow:$scope.articleSelectValue._index_,//是否列表展示
            isPlatform:$scope.article.isPlatform,//是否平台用户
            userId:$scope.article.userId,//作者id
            authorName:$scope.article.authorName,//作者名
            isShowAbstracts:$scope.article.isShowAbstracts,//是否显示摘要
            abstracts:$scope.article.abstracts,//摘要
            fromSource:$scope.article.fromSource,//文章来源
            //content:CKEDITOR.instances.TextArea1.getData(),//文章内容
            content:UE.getEditor('editor').getContent(),//文章内容
            Timing:(typeof($scope.finalBeginDate.date) != "string") ? mdFactory.getStringByDateAll($scope.finalBeginDate.date):$scope.finalBeginDate.date,
            isTiming:$scope.article.isTiming,
            status:$scope.article.status,
            articleId:$scope.article.articleId,
            title: $scope.article.title,//文章标题
            coverImage:$scope.article.coverImage
        };
    };
    //定时器
    $scope.timer=$interval(function(){
        $scope.article.status=0;
            articleFactory.updateArticle(
                $scope.getParams(),
                function(data){
                    console.log('定时器开始')
                }
            )
    },3*60*1000)
    $scope.$on('$destroy',function(){
        console.log('解除定时器')
        $interval.cancel($scope.timer);
    })  //在控制器里，添加$on函数

    $scope.updateArticleCallback=function(data){
        console.log(data);
        $scope.notUse=false;
        Notify.alert();//提示操作成功
    }
    $scope.updateArticle = function () {
        console.log($scope.getParams());
        //return;
        articleFactory.updateArticle(
            $scope.getParams(),
            $scope.updateArticleCallback
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
            $scope.notUse=true;
            ModalService.modalSet($scope, templateUrl_2);
            $scope.updateTrue = function () {
                $scope.article.status=0;
                ModalService.modalHide();
                $scope.updateArticle();//保存
            };
        }
    };

    //预览
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
    };
    $scope.updateArticleStatusCallblack=function(data){
        Notify.alert();//提示操作成功
        console.log(window.location.href)

        $timeout(function(){
            if($scope.articleNumber==0){
                $location.replace().path('/cms/article');
            }else if($scope.articleNumber==1){
                $location.replace().path('/cms/articleNotList')
            }else{
                $location.replace().path('/cms/reviewedArticle')
            }
        },1000);
    }
    $scope.fabu=function(){
        articleFactory.updateArticle(
            $scope.getParams(),
            function(){

            }
        )
        $scope.successAlert = "提交信息";
        var templateUrl_2 = 'app/views/alert/success.html';
        ModalService.modalSet($scope, templateUrl_2);
        $scope.updateTrue = function () {
            ModalService.modalHide();
            articleFactory.updateArticleStatus(
                {
                    articleId  :  $scope.articleId,
                    status: 1
                },
                $scope.updateArticleStatusCallblack
            )

        };

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
        $scope.article.status=0;
        $scope.updateArticle();
        //return;
        var ifr_document = document.getElementById("preview-html").contentWindow.document;
        if(ifr_document){
            if( $scope.article.fromSource){
                $(ifr_document).find(".laiyuan").show();
            }else{
                $(ifr_document).find(".laiyuan").hide();
            }
            if( $scope.article.isShowAbstracts==1){
                $(ifr_document).find(".zhaiyao").show();
            }else{
                $(ifr_document).find(".zhaiyao").hide()
            }
            //设置标题
            var ifr_title = $(ifr_document).find(".article-title .title");
            ifr_title.html($scope.article.title );
            //设置作者 时间
            $(ifr_document).find(".article-top .article-time").html($scope.article.authorName);
            $(ifr_document).find(".article-top .article-yue").html($scope.article.postedTime);
            //设置摘要文章来源
            $(ifr_document).find(".zhaiyao").html($scope.article.abstracts);
            $(ifr_document).find(".laiyuan").html('文章来源:'+$scope.article.fromSource);
            //设置主要内容
            //var content_str = CKEDITOR.instances.TextArea1.getData();
            var content_str = UE.getEditor('editor').getContent();
            var ifr_content = $(ifr_document).find(".article-content");


            ifr_content.html(content_str);
            //document.getElementById('preview-html').contentWindow.sh();
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