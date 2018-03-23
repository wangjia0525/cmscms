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
    //获取擂台详情
    function getTopicInfo(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            cache: false,
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

    //获取擂台评论列表
    function getTopicEvaluateList(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            url: endpoint + "getArenaEvaluateListNoToken" + jsonpoint,
            success: function (data) {
                if (data.err.code == 0) {
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
			$('#m1').attr('content',DATA.title);
$('#m3').attr('content',DATA.content);
var imgUrl ="";
var lineLink =window.location.href;
var descContent =DATA.content;
var shareTitle = DATA.title;
var appid = weixin.appId;
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
                imgUrl:'http://api.ixinghui.com:81/ixinghui-share/img/sher.png' // 分享图标
            });
            wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                desc: descContent, // 分享说明
                link: lineLink, // 分享链接
                imgUrl:'http://api.ixinghui.com:81/ixinghui-share/img/sher.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl:'http://api.ixinghui.com:81/ixinghui-share/img/sher.png', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (msg) {

                }
            });
            //qq好友
            wx.onMenuShareQQ({
                title: shareTitle, // 分享标题
                desc: descContent, // 分享说明
                link: lineLink, // 分享链接
                imgUrl:'http://api.ixinghui.com:81/ixinghui-share/img/sher.png' // 分享图标
            });
            //qq空间
            wx.onMenuShareQZone({
                title: shareTitle, // 分享标题
                desc: descContent, // 分享说明
                link: lineLink, // 分享链接
                imgUrl:'http://api.ixinghui.com:81/ixinghui-share/img/sher.png' // 分享图标
            });
         });
		})
            if (DATA.status == 1) {
                $(".remove").show();
                $(".add").hide();
            } else {
                $(".remove").hide();
                $(".add").show();
                //擂台详情
                addData();
                //初始化反方评论数量
                //findFanNum();
                //初始化评论列表
                getTopicEvaluateList(
                    {
                        "arenaType": 1,
                        "topicId": topicId,
                        "userId": userId,
                        "type": 1,
                        "page": num,
                        "size": 10
                    },
                    function (data) {
                        COMMENT = data.topicEvaluateList;
                        //$(".totalCount").html(data.totalCount - data.foldEvaluateCount);
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

        }
    );


    function addData() {
        var module = {
            uerInfo: '<div class="userInfo_title">{{title}}</div>\
            <div class="content1"><pre>{{content}}</pre></div>\
            <div class="userInfo_cont">\
                <div class="userInfo_cont_l">\
                    <i style="width: {{obverseCount}}%;"></i><strong>{{obverse}}</strong><span>{{obverseCount}}%</span>\
                </div>\
                <div class="userInfo_cont_r">\
                    <i style="width: {{reverseCount}}%;"></i><strong>{{reverse}}</strong><span>{{reverseCount}}%</span>\
                </div>\
            </div>\
                     <!--<div class="userInfo_user" isAnonymous="{{isAnonymous}}">\
                         <img src="{{headURL}}">\
                         <div class="userInfo_info">\
                             <i>{{realName}}</i>\
                             <em>{{positionName}}</em>\
                         </div>\
                     </div>-->\
                     '
        };

        var render = {
            uerInfo: template.compile(module.uerInfo)
        };


        var userInfo = render.uerInfo({
            title: DATA.title,
            content: DATA.content,
            obverse: DATA.obverse,
            reverse: DATA.reverse,
            obverseCount: parseInt(DATA.obverseCount * 100 / (DATA.obverseCount + DATA.reverseCount)),
            reverseCount: 100 - parseInt(DATA.obverseCount * 100 / (DATA.obverseCount + DATA.reverseCount))
            //isAnonymous: DATA.isAnonymous ? 1 : 2,
            //realName: DATA.user.user.name,
            //headURL: DATA.user.user.headURL,
            //positionName: DATA.user.positionName
        });
        $(".userInfo").html(userInfo);
        /*if ($(".userInfo_user").attr("isAnonymous") == 1) {
         $(".userInfo_user").find("img").attr("src", "img/WechatIMG1.png");
         $(".userInfo_user").find("i").html("匿名用户");
         $(".userInfo_user").find("em").html("")
         }*/
        $("title").html(DATA.title);
        $(".comment_btns").find("span").eq(0).find("i").html(DATA.obverse);
        $(".comment_btns").find("span").eq(1).find("i").html(DATA.reverse);
        $(".comment_btns").find("span").eq(0).find("em").html("（" + DATA.obverseCount + "）");
        $(".comment_btns").find("span").eq(1).find("em").html("（" + DATA.reverseCount + "）");
    }

    /*  function findFanNum() {
     getTopicEvaluateList(
     {
     "arenaType": 2,
     "topicId": topicId,
     "userId": userId,
     "type": 1,
     "page": 1,
     "size": 1
     },
     function (data) {

     $(".comment_btns").find("span").eq(1).find("em").html("（" + data.topicEvaluateList[0].upportCount + "）");
     }
     )
     }*/


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
                    <div class="comment_title_zan"><img src="img/support@3x.png">{{item.supportCount}}</div>\
                </div>\
                <div class="comment_content"><pre>{{item.content}} </pre> </div>\
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
                        "arenaType": $(".comment_btns").find(".active").attr("arenaType"),
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

    //点击事件
    $(".comment_btns").delegate("span", "click", function () {
        $(".comment_btns").find("span").removeClass("active");
        $(this).addClass("active");
        num = 1;
        $(".comment_list").html("");
        getTopicEvaluateList(
            {
                "arenaType": $(".comment_btns").find(".active").attr("arenaType"),
                "topicId": topicId,
                "userId": userId,
                "type": 1,
                "page": num,
                "size": 12
            },
            function (data) {
                COMMENT = data.topicEvaluateList;
                //$(".comment_btns").find("span").eq(0).find("em").html("（" + data.totalCount + "）");
                //$(".totalCount").html(data.totalCount - data.foldEvaluateCount);
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
            });
    });
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
                window.location.href="static.html?jumpType=1&type=0&topicId="+topicId;
            }
            if(browser.versions.android){
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    //在微信中打开
                    //打开中间页
                    window.location.href="static.html?jumpType=1&type=0&topicId="+topicId;
                    window.open("static.html?jumpType=1&type=0&topicId="+topicId);
                }
                if (ua.match(/WeiBo/i) == "weibo") {
                    localUrl="ixinghui://ixinghui.share.com?jumpType=1&type=0&topicId="+topicId;
                    window.location.href = localUrl;
                }
                if (browser.versions.MQQBrowser) {
                    //在QQ打开
                    localUrl="ixinghui://ixinghui.share.com?jumpType=1&type=0&topicId="+topicId;
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