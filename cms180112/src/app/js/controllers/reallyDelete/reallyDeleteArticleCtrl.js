

App
    .controller('reallyDeleteArticleCtrl', function($scope,$http,$cookieStore,yulanService,articleFactory,Notify,ModalService,$timeout,FieldFactory,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getArticleListForDelCallback = function(data){
            console.log(data);
            $scope.loading = false;
            $scope.articleList = data.articleList;
            $scope.turnPage.totalItems = data.totalCount;
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
        /* 通过搜索框，分页，下拉框进行的数据的更新的统一处理 */
        $scope.dataChange = function(){
            $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                $scope.numPages,
                $scope.turnPage.itemsPerPage,
                $scope.turnPage.totalItems);
            $scope.fetchData();
        };
        $scope.dataEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.ToNum = mdFactory.getPageNum($scope.turnPage.currentPage,
                    $scope.numPages,
                    $scope.turnPage.itemsPerPage,
                    $scope.turnPage.totalItems);
                $scope.fetchData();
            }
        };

        /* 参数对象  */
        $scope.getParams = function(){
            return {
                size		:	$scope.turnPage.itemsPerPage,
                page		:	$scope.turnPage.currentPage
            }
        };

        /* 获取topicList */
        $scope.fetchData = function(){
            console.log( $scope.getParams());
            //return;
            $scope.loading = true;
            articleFactory.getArticleListForDel(
                $scope.getParams(),
                $scope.getArticleListForDelCallback
            );
        };
        $scope.fetchData();
//    预览文章
        (function(){
            init();
        })();
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
            $scope.articlePreview = function (data) {
                console.log(data)
                $scope.articleData=data;
                updatePreviewHtml();
                pre_layer.show();
                resetPrePhoneCss();
            };
            pre_bg.on("click",function(){
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
                pos_top = 45;
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
                    console.log(11111)
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
            }

        }
        $scope.renew=function(articleId){
            console.log({
                articleId  :  articleId,
                status: 0
            });

            articleFactory.updateArticleStatus(
                {
                    articleId  :  articleId,
                    status: 0
                },
                function(){
                    Notify.alert();//提示操作成功
                    $scope.fetchData();
                }
            )
        }
    });