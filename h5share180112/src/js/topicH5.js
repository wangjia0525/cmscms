/**
 * Created by wangyingchao on 16/9/20.
 */
//var endpoint = "";
//var jsonpoint = ".json";
var endpoint = "/ixinghui/app/";
var jsonpoint = "";


var DATA = '';
var COMMENT = [];

var re = /^\d*/;

var moreMark = false;
var isLoadMark = false;
var num = 1;

var href = window.location.hash.replace(/$#/, '');
var topicId = href.split("&")[0].split("=")[1].match(re)[0];
var userId = href.split("&")[1].split("=")[1].match(re)[0];
$.session.set("shareId",userId);
$(".comment_z").hide();
$(".topicPaid").hide();

var url=window.location.href.split('#')[0];
var weixin='';
//点击打开课程表
$(".downloadApp>a").on("click", function () {
    console.log(1)
    window.location.href="member/timetable.html#userId="+userId;
})
function getWeixin(prams,callBack){
    $.ajax({
        async: true,
        type: "get",
        data: prams,
        cache: false,
        url: endpoint + "getSignature" + jsonpoint,
        success:function(data){
            return callBack(data);
        }
    })
}
$(function () {
    //获取话题详情
    function getTopicInfo(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            url: endpoint + "getTopicInfoNoToken" + jsonpoint,
            success: function (data) {
                if (data.err.code == 0) {
                    return callBack(data.topic);
                } else {

                }
            },
            error: function (data) {
                console.log(data.status)
            }
        })
    }

    //获取话题评论详情
    function getTopicEvaluateList(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            url: endpoint + "getTopicEvaluateListNoToken" + jsonpoint,
            success: function (data) {
                if (data.err.code == 0) {
					if(data.expertsReply!=null){
					var html='<li>\
                        <div class="comment_l"><img src="'+data.expertsReply.user.user.headURL+'"></div>\
                        <div class="comment_r">\
                            <div class="comment_title">\
                                <div class="comment_title_userInfo">\
                                    <em>'+data.expertsReply.user.realName+'</em>\
                                    <span></span>\
                                    <i>'+data.expertsReply.user.positionName+'</i>&nbsp;<img class="zjtb" src="img/专@2x.png">\
                                </div>\
                            </div>\
                            <div class="comment_content_zj"><a href="#top"><img src="img/图层-20-拷贝-3@2x.png"></a></div>';
					
							if(data.expertsReply.sumOnlookers>0){
								html+='<div class="comment_content_l"><i>';
								
								for(var i=0;i<data.expertsReply.onlookers.length;i++){
									html+='<img src="'+data.expertsReply.onlookers[i].user.headURL+'">&nbsp;';
								}
								html+='</i><i class="rs">&nbsp;&nbsp;'+data.expertsReply.sumOnlookers+'人看过</i>\</div>';
							}
							 html+='</div></li>';
					 $(".comment_list_zj").html(html);
					 $(".comment_z").show();
					 $(".topicPaid").show();
					}else{
						$(".comment_z").hide();
						 $(".topicPaid").hide();
					}
                    return callBack(data);
                } else {

                }
            },
            error: function (data) {
                console.log(data.status)
            }
        })
    }

    //初始化话题详情
    getTopicInfo(
        {
            "topicId": topicId,
            "userId": userId
        },
        function (data) {
            DATA = data;
            console.log(data);
            var lineLink =window.location.href;
            var descContent =DATA.content;
            var shareTitle = DATA.title;
            var imgUrl='http://api.ixinghui.com:81/ixinghui-share/img/topic.jpg';
            //var imgUrl='http://api.ixinghui.com:81/ixinghui-share/img/sher.png';
            //qq
            setShareInfo({
                title: shareTitle,
                summary:descContent,
                pic:  imgUrl,
                url:window.location.href
            });
			$('#m1').attr('content',shareTitle);
            $('#m3').attr('content',descContent);
            $('#m2').attr('content',imgUrl);//图片
            getWeixin(
                {'url':url},
                function(data){
                    weixin=data;
                    wx.config({
                        debug:false,
                        appId:weixin.appId,
                        timestamp:weixin.timestamp,
                        nonceStr:weixin.nonceStr,
                        signature:weixin.signature,
                        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']
                    });

                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: shareTitle, // 分享标题
                            desc: descContent, // 分享说明
                            link: lineLink, // 分享链接
                            imgUrl:imgUrl// 分享图标
                        });
                        wx.onMenuShareAppMessage({
                            title: shareTitle, // 分享标题
                            desc: descContent, // 分享说明
                            link: lineLink, // 分享链接
                            imgUrl:imgUrl, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl:imgUrl, // 如果type是music或video，则要提供数据链接，默认为空
                            success: function (msg) {

                            }
                        });
                        //qq好友
                        wx.onMenuShareQQ({
                            title: shareTitle, // 分享标题
                            desc: descContent, // 分享说明
                            link: lineLink, // 分享链接
                            imgUrl:imgUrl // 分享图标
                        });
                        //qq空间
                        wx.onMenuShareQZone({
                            title: shareTitle, // 分享标题
                            desc: descContent, // 分享说明
                            link: lineLink, // 分享链接
                            imgUrl:imgUrl // 分享图标
                        });
                    });
                })
            if (DATA.status == 1) {
                $(".remove").show();
                $(".add").hide();
            } else {
                $(".remove").hide();
                $(".add").show();
                addData();
                //初始化评论列表
                getTopicEvaluateList(
                    {
                        "topicId": topicId,
                        "userId": userId,
                        "type": 1,
                        "page": num,
                        "size": 10
                    },
                    function (data) {
                        COMMENT = data.topicEvaluateList;
                        $(".totalCount").html(data.totalCount - data.foldEvaluateCount);
                        //初始化评论列表
                        commentList();
                        //下拉刷新
                        refresh();
                        if (data.hasMore) {
                            moreMark = true;
                            $(".more").hide();
                        } else {
                            moreMark = false;
                            $(".more").show();
                        }
                    }
                );
            }
		$(".topicPaid").hide();
        }
    );


    function addData() {

        var module = {
            uerInfo: '<div class="userInfo_title"><img src="img/topic_paidmark.png"  class="topicPaid" \>&nbsp;{{title}}</div>\
                     <div class="userInfo_user" isAnonymous="{{isAnonymous}}">\
                         <img src="{{headURL}}">\
                         <div class="userInfo_info">\
                             <i>{{realName}}</i>\
                             <em>{{positionName}}</em>\
                         </div>\
                     </div>\
                     ',
            imgList:'<ul class="topicImg_ul">{{each imageUrlList as item}}<li class="topicImg_li"><img class="topicImg" src="{{item}}"></li>{{/each}}</ul>'
        };

        var render = {
            uerInfo: template.compile(module.uerInfo),
            imgList: template.compile(module.imgList)
        };


        var userInfo = render.uerInfo({
            title: DATA.title,
            isAnonymous: DATA.isAnonymous ? 1 : 2,
            realName: DATA.user.user.name,
            headURL: DATA.user.user.headURL,
            positionName: DATA.user.positionName
        });

        var imgList = render.imgList({
            imageUrlList:DATA.imageUrlList
        });

        $(".content").after(imgList);

        $(".userInfo").html(userInfo);
        if ($(".userInfo_user").attr("isAnonymous")==1) {
            $(".userInfo_user").find("img").attr("src", "img/WechatIMG1.png");
            $(".userInfo_user").find("em").html("匿名用户");
            $(".userInfo_user").find("i").html("")
        }

        $(".content").html(DATA.content);
        $("title").html(DATA.title);
    }


    //评论dom
    var commentItem = '{{each commentList as item i}}\
        <li>\
            <div class="comment_l"><img src={{item.isAnonymous==1 ? "img/WechatIMG1.png" : item.user.user.headURL;}} \></div>\
            <div class="comment_r">\
                <div class="comment_title">\
                    <div class="comment_title_userInfo">\
                        <em>{{item.isAnonymous==1 ? "匿名用户" : item.user.user.name;}}</em>\
                        <span></span>\
                        <i>{{item.isAnonymous==1 ? "" : item.user.positionName;}}</i>\
                    </div>\
                    <div class="comment_title_zan"><img src="img/support@3x.png"\>{{item.supportCount}}</div>\
                </div>\
                <div class="comment_content"> <pre> {{item.content}} </pre></div>\
            </div>\
        </li>\
        {{/each}}';

    //初始化评论列表
    function commentList() {
        var commentInfo = template.compile(commentItem);

        var html = commentInfo({
            commentList: COMMENT
        });
        $(".comment_list").html(html);
    }

    //下拉刷新
    function refresh() {
        $(window).on("scroll", function () {
            var $documentHeight = $(document).outerHeight();
            var $windowScrollTop = $(window).scrollTop();
            var $windowHeight = $(window).outerHeight();
            if ($windowScrollTop + $windowHeight > $documentHeight - 200 && moreMark && !isLoadMark) {
                num++;
                console.log(num);
                isLoadMark = true;
                getTopicEvaluateList(
                    {
                        "topicId": topicId,
                        "userId": userId,
                        "type": 1,
                        "page": num,
                        "size": 12
                    },
                    function (data) {

                        COMMENT = data.topicEvaluateList;
                        $(".totalCount").html(data.totalCount - data.foldEvaluateCount);

                        var commentInfo = template.compile(commentItem);

                        var html = commentInfo({
                            commentList: COMMENT
                        });
                        $(".comment_list").html($(".comment_list").html() + html);

                        if (data.hasMore) {
                            $(".more").hide();
                            moreMark = true
                        } else {
                            $(".more").show();
                            moreMark = false
                        }
                        isLoadMark = false;
                    })
            }
        });
    }
    //    打开APP

    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                MQQBrowser: u.indexOf('MQQBrowser') !== -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
//点击打开app
    $(".downloadApp>i").on("click", function () {
        if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
            var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            var localUrl="";
            var openIframe=createIframe();
            if (browser.versions.ios) {
                //打开中间页
                window.location.href="static.html?jumpType=1&type=1&topicId="+topicId;
            }
            if(browser.versions.android){
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    //在微信中打开
                    //打开中间页
                    window.location.href="static.html?jumpType=1&type=1&topicId="+topicId;
                    window.open("static.html?jumpType=4&productId="+productId);
                }
                if (ua.match(/WeiBo/i) == "weibo") {
                    localUrl="ixinghui://ixinghui.share.com?jumpType=1&type=1&topicId="+topicId;
                    window.location.href = localUrl;
                }
                if (browser.versions.MQQBrowser) {
                    //在QQ打开
                    localUrl="ixinghui://ixinghui.share.com?jumpType=1&type=1&topicId="+topicId;
                    window.location.href = localUrl;
                }
            }
        }else {
            //否则就是PC浏览器打开
            window.open("http://android.myapp.com/myapp/detail.htm?apkName=com.yunxuan.ixinghui")
        }
    })

//创建iframe
    var  createIframe=(function(){
        var iframe;
        return function(){
            if(iframe){
                return iframe;
            }else{
                iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                return iframe;
            }
        }
    })();
});
