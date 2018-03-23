/**
 * Created by Administrator on 2017/7/10.
 */

var endpoint = "/ixinghui/app/";
var jsonpoint = "";

var  is_playFinish;
var DATA = '';
var COMMENT = [];

var re = /^\d*/;

var moreMark = false;
var isLoadMark = false;
var page = 1;

var href = window.location.hash.replace(/$#/, '');
var productId = href.split("&")[0].split("=")[1].match(re)[0];
var userId = href.split("&")[1].split("=")[1].match(re)[0];
console.log(userId);
$.session.set("shareId",userId);
var url=window.location.href.split('#')[0];
var lession='';
var weixin='';
//点击打开课程表
$(".downloadApp>a").on("click", function () {
    window.location.href="member/timetable.html#userId="+userId;
})
//获取产品
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
//获取产品
$(function(){
    function getcourseNoToken(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            cache: false,
            url: endpoint + "course/getcourseNoToken" + jsonpoint,
            success: function (data) {
                //console.log( data.err.code);
                if (data.err.code == 0) {
                    //console.log(data);
                    return callBack(data.result,data.err);
                } else {
                    console.log(data);
                }
            },
            error: function (data) {
                console.log(data.status)
            }
        })
    }
    //调用获取课程介绍
    getcourseNoToken(
        {"productId":productId},
        function(data,err){
            DATA = data;
            console.log(DATA)
            //console.log(DATA)
            if (err.code != 0) {
                $(".remove").show();
                $("#add2").hide();
                $("#add1").hide();
            } else {
                $(".remove").hide();
                $("#add1").show();
                $("#add2").show();
                addData();
                getLessonListNoToken(
                    {
                        "productId":productId,
                        "page": 1,
                        "size": 4
                    },
                    function(data){
                        lession=data;
                        if(data.length>=2){
                            for(var i=1,html2='';i<data.length;i++){
                                html2+=`
                                <li>
                                    <p><span>0${i+1}</span><span>${data[i].title}</span></p>`;
                                if(data[i].isPublic==1){
                                    html2+=`<img class="img1 music2" name="musics${i}" id="music2" src="img/bo@2x.png" alt=""/>`
                                }else{
                                    html2+=`<img class="img1" src="img/suoding@2x.png" alt=""/>`
                                }
                                if(data[i].duration>0){
                                    var t=shijian(data[i].duration)
                                    html2+=`<p>${t}</p></li>`;
                                }else{
                                    html2+=`<p>00:00:00</p></li>`;
                                }
                            }
                        }
                        $('.mokuai5>ul').html(html2);
                        var html3=`<p><span>01</span><span>${data[0].title}</span></p>
                       `;
                        //$('.mokuai3>p:first-child').html(html3);
                        $('.mokuai3').prepend(html3)
                        //音频
                        //暂停时间停留按钮

                        function audioPlay(){
                            /*判断声音是否播放完成，播放完成之后执行回调函数*/
                            is_playFinish = setInterval(function(){
                                if(audio.ended){
                                    $('.mp3>img').attr('src','img/bo@2x.png');
                                    window.clearInterval(is_playFinish);
                                }
                                if (!isNaN(audio.duration)) {
                                    //当前播放时间
                                    //var NowtimeValue = audio.currentTime;
                                    //var nowH=parseInt(NowtimeValue/3600);
                                    //var nowM=parseInt(NowtimeValue%3600/60);
                                    //var nowS=parseInt(NowtimeValue%60);
                                    //nowH<10 ? nowH="0"+nowH : nowH=nowH;
                                    //nowM<10 ? nowM="0"+nowM : nowM=nowM;
                                    //nowS<10 ? nowS="0"+nowS : nowS=nowS;
                                    //$(".mp3>div>span:last").html(nowH+":"+nowM+":"+nowS);
                                    t=shijian(audio.currentTime)
                                    $('.mp3>div>span:last').html(t);
                                    // 用时间比来获取进度条的值
                                    var w =612*(audio.currentTime/audio.duration); //
                                    $(".mp3>p>span:nth-child(3)").css('width',w);
                                    var timeRanges = audio.buffered;
                                    var w2=612*timeRanges.end(timeRanges.length - 1)/audio.duration;
                                    $(".mp3>p>span:nth-child(2)").css('width',w2);
                                    var left=586*(audio.currentTime/audio.duration)+98;
                                    $(".mp3>i").css('left',left);

                                };
                            }, 10);
                        }
                        //第一类播放按钮
                        if(data[0].isPublic==1){
                            $('.music1').click(function(){
                                //$('.xiao').css('marginBottom',120);
                                $('.click').show();
                                $('.mp3').show();
                                $('.mp3>div>span:first').html(shijian(data[0].duration));
                                $('#audio').attr('src',data[0].mp3);
                                cc(1)
                                audioPlay();
                                //$('#audio').play();
                            })
                        }
                        //第二类播放按钮
                        var lis=$('.mokuai5>ul>li');
                        for(var i=0;i<lis.length;i++){
                            +function(i){
                                if(data[i+1].isPublic==1){
                                    $(lis[i]).click(function() {
                                        //$('.xiao').css('marginBottom',120);
                                        console.log(231);
                                        $('.click').show();
                                        $('.mp3').show();
                                        $('.mp3>div>span:first').html(shijian(data[i+1].duration));
                                        if($('#audio').attr('src')==data[i+1].mp3){

                                        }else{
                                            $('#audio').attr('src',data[i+1].mp3)
                                        }
                                        cc(2);
                                        audioPlay();
                                    })
                                }
                            }(i)
                        }
                        //控制播放暂停按钮
                        $('.music').click(function(){
                            cc(3);
                            audioPlay();
                        })

                    }
                )
                getCommentListNoToken(
                    {
                        "productId":productId,
                        "page": page,
                        "size": 12
                    },
                    function(data,count,totalPages){
                        //console.log(data);
                        $('.evaluate>p').html("评论("+count+")");
                        if(data){
                            for(var i=0,html4="";i<data.length;i++){
                                html4+=`
                              <li>
                                <div>
                                    <img src="${data[i].user.headURL}" alt=""/>
                                    <div>
                                        <p>${data[i].user.name}</p>
                                        <p> ${data[i].createTime}</p>
                                    </div>
                                    <span><img src="img/zan@2x.png" alt=""/> ${data[i].favoriteCount
                                    }</span>
                                </div>
                                    <pre>${data[i].content}</pre>
                            </li>
                            `;
                            }
                        }

                        $('.evaluate>ul').html(html4);
                        if(page==totalPages){
                            $('.more1').show();
                            $('.more2').hide();
                        }else{
                            $('.more2').show();
                            $('.more1').hide();
                        }
                        $('.more2').click(function(){
                            page+=1;
                            getCommentListNoToken(
                                {
                                    "productId":productId,
                                    "page": page,
                                    "size": 12
                                },
                                function(data,count,totalPages){
                                    "use strict";
                                    for(var i=0,html4="";i<data.length;i++){
                                        html4+=`
                                          <li>
                                            <div>
                                                <img src="${data[i].user.headURL}" alt=""/>
                                                <div>
                                                    <p>${data[i].user.name}</p>
                                                    <p> ${data[i].createTime}</p>
                                                </div>
                                                <span><img src="img/zan@2x.png" alt=""/> ${data[i].favoriteCount
                                            }</span>
                                            </div>
                                            <pre>${data[i].content}</pre>
                                        </li>
                                        `;
                                    }
                                    $('.evaluate>ul').append(html4);
                                    if(page==totalPages){
                                        $('.more1').show();
                                        $('.more2').hide();
                                    }else{
                                        $('.more2').show();
                                        $('.more1').hide();
                                    }
                                })
                        })
                    }
                )

            }
        }
    )
    function addData(){
        //console.log(DATA.name);
        var html1=`<div class="pic">
                    <img src="${DATA.image}" alt=""/>
                    <img class="music1"  src="img/www.png" alt=""/>
                    <div class="mokuai3">
                        <!--<p></p>-->
                        <p>${DATA.digest}</p>
                    </div>
                </div> `;
        $('#add1').html(html1);
        var html2=`
         <p>
            <span>${DATA.name}</span>
            <img src="img/xiangshang@2x.png" alt=""/>
        </p>
        <div class="intro">
            <p>讲师介绍</p>
            <p>
                <img src="${DATA.user.headURL}" alt=""/>
                <span>${DATA.user.name}</span>
            </p>
            <pre>${DATA.authorInfo}</pre>
        </div>
        <div id="show" class="intro">
            <p>适用人群</p>
            <pre>${DATA.targeTusers}</pre>
        </div>
        <div class="intro">
            <p>课程概述</p>
            <pre>${DATA.synopsis}</pre>
        </div>
        `;
        $('.mokuai4').html(html2);
        //var imgUrl ='http://api.ixinghui.com:81/ixinghui-share/img/sher.png';
        var imgUrl =DATA.image;
        var lineLink =window.location.href;
        //var descContent =DATA.digest;
        var descContent =DATA.user.name+"·"+DATA.label;
        var shareTitle = DATA.name;
        //qq
        setShareInfo({
            title: shareTitle,
            summary:descContent,
            pic:  imgUrl,
            url:window.location.href
        });
        $('#m1').attr('content',shareTitle );
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
        if(DATA.targeTusers==undefined){
            $('#show').hide()
        }
    }
    //获取课的名字
    function getLessonListNoToken(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            url: endpoint + "course/getLessonListNoToken" + jsonpoint,
            success: function (data) {
                //console.log(data)
                if (data.err.code == 0) {
                    return callBack(data.result);
                } else {

                }
            },
            error: function (data) {
                console.log(data.status)
            }
        })
    }
    //获取评论列表
    function getCommentListNoToken(prams, callBack) {
        $.ajax({
            async: true,
            type: "get",
            data: prams,
            url: endpoint + "course/getCommentListNoToken" + jsonpoint,
            success: function (data) {
                //console.log(data);
                if (data.err.code == 0) {
                    return callBack(data.result,data.totalCount,data.totalPages);
                } else {

                }
            },
            error: function (data) {
                console.log(data.status)
            }
        })
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
                window.location.href="static.html?jumpType=4&productId="+productId;
            }
            if(browser.versions.android){
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    //在微信中打开
                    //打开中间页
                    window.location.href="static.html?jumpType=4&productId="+productId;
                    window.open("static.html?jumpType=4&productId="+productId);
                }
                if (ua.match(/WeiBo/i) == "weibo") {
                    localUrl="ixinghui://ixinghui.share.com?jumpType=4&productId="+productId;
                    window.location.href = localUrl;
                }
                if (browser.versions.MQQBrowser) {
                    //在QQ打开
                    localUrl="ixinghui://ixinghui.share.com?jumpType=4&productId="+productId;
                    window.location.href = localUrl;
                }
            }
        }else {
            //否则就是PC浏览器打开
            window.open("http://android.myapp.com/myapp/detail.htm?apkName=com.yunxuan.ixinghui")
        }
    })
    $(".more3").on("click", function () {
        if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
            var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            var localUrl="";
            var openIframe=createIframe();
            if (browser.versions.ios) {
                //打开中间页
                window.location.href="static.html?jumpType=4&productId="+productId;
            }
            if(browser.versions.android){
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    //在微信中打开
                    //打开中间页
                    window.location.href="static.html?jumpType=4&productId="+productId;
                    window.open(static.html);
                }
                if (ua.match(/WeiBo/i) == "weibo") {
                    localUrl="ixinghui://ixinghui.share.com?jumpType=4&productId="+productId;
                    window.location.href = localUrl;
                }
                if (browser.versions.MQQBrowser) {
                    //在QQ打开
                    localUrl="ixinghui://ixinghui.share.com?jumpType=4&productId="+productId;
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
    //播放器相关
    function cc(lx){
        if(lx==1){
            if(audio.paused){
                audio.play();
                $('.mp3>img').attr('src','img/ting@2x.png')
            }else{
                return ;
            }
        }else if(lx==2){

            if(audio.paused){
                audio.play();
                $('.mp3>img').attr('src','img/ting@2x.png')
            }else{

                audio.pause();
                $('.mp3>img').attr('src','img/bo@2x.png')
            }
        }else if(lx==3){
            if(audio.paused){
                audio.play();
                $('.mp3>img').attr('src','img/ting@2x.png')
            }else{
                audio.pause();
                $('.mp3>img').attr('src','img/bo@2x.png')
            }
        }
        for(var i=1;i<lession.length;i++){
            var names="musics"+i;
            if(lession[i].mp3== $('#audio').attr('src')){
                if($('.mp3>img').attr('src')=='img/ting@2x.png'){
                    $('[name='+names+']').attr('src',"img/ting@2x.png");
                }else if($('.mp3>img').attr('src')=='img/bo@2x.png'){
                    $('[name='+names+']').attr('src', "img/bo@2x.png");
                }
            }else{
                $('[name='+names+']').attr('src', "img/bo@2x.png");
            }
        }

    }
    //时分秒00:00:00
    function shijian(t){
        var NowtimeValue = t;
        var nowH=parseInt(NowtimeValue/3600);
        var nowM=parseInt(NowtimeValue%3600/60);
        var nowS=parseInt(NowtimeValue%60);
        nowH<10 ? nowH="0"+nowH : nowH=nowH;
        nowM<10 ? nowM="0"+nowM : nowM=nowM;
        nowS<10 ? nowS="0"+nowS : nowS=nowS;
        return nowH+":"+nowM+":"+nowS
    }
    //播放器相关
    $('.mp3>p').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        //console.log(e.clientX)
        //window.clearInterval(is_playFinish);
        var left=e.clientX;
        console.log(left);
        $(".mp3>i").css('left',left);
        audio.currentTime=(left-98)*audio.duration/586;
        $('.mp3>div>span:last').html(shijian(audio.currentTime));
        var w =612*(audio.currentTime/audio.duration); //
        $(".mp3>p>span:nth-child(3)").css('width',w);
    })
    ////pc端拖动
    //var isdown = false;
    //$(".mp3>i").mousedown(function(e){
    //    //console.log(1)
    //    var offset = $(".mp3").offset();
    //    var left = e.pageX - offset.left - 8;
    //    left = left>610? 610 : left;
    //    left = left<98? 98 : left;
    //    $(".mp3>i").css("left",left);
    //    audio.currentTime=(left-98)*audio.duration/586;
    //    $('.mp3>div>span:last').html(shijian(audio.currentTime));
    //    var progressValue =100*(audio.currentTime/audio.duration); //
    //    $("progress").val(progressValue);
    //    isdown = true;
    //});
    //
    //$(document).mousemove(function(e){
    //    if (isdown) {
    //        //console.log(3)
    //        var offset = $(".mp3").offset();
    //        var left = e.pageX - offset.left - 8;
    //        left = left>610? 610 : left;
    //        left = left<98? 98 : left;
    //        $(".mp3>i").css("left",left);
    //        audio.currentTime=(left-98)*audio.duration/586;
    //        $('.mp3>div>span:last').html(shijian(audio.currentTime));
    //        var progressValue =100*(audio.currentTime/audio.duration); //
    //        $("progress").val(progressValue);
    //    }
    //});
    //
    //$(document).mouseup(function(){
    //    //console.log(4)
    //    //audio.currentTime=(left-98)*audio.duration/586;
    //    $('.mp3>div>span:last').html(shijian(audio.currentTime));
    //    //var progressValue =100*(audio.currentTime/audio.duration); //
    //    //$("progress").val(progressValue);
    //    isdown = false;
    //    //alert(isdown);
    //});
    //手机拖动播放器按钮
    var isdown = false;
    document.querySelector('.mp3>i').addEventListener('touchstart',function(e){
        //console.log(1);
        var offset = $(".mp3").offset();
        var left = e.targetTouches[0].pageX - offset.left;
        left = left>684? 684 : left;
        left = left<98? 98 : left;
        //console.log(left)
        $(".mp3>i").css("left",left);
        console.log((left-98)*audio.duration/586)
        audio.currentTime=(left-98)*audio.duration/586;
        $('.mp3>div>span:last').html(shijian(audio.currentTime));
        var w =612*(audio.currentTime/audio.duration); //
        $(".mp3>p>span:nth-child(3)").css('width',w);
        isdown = true;
    })
    document.addEventListener('touchmove',function(e){
        if (isdown) {
            console.log(3)
            var offset = $(".mp3").offset();
            var left = e.targetTouches[0].pageX - offset.left;
            left = left>684? 684 : left;
            left = left<98? 98 : left;
            $(".mp3>i").css("left",left);
            audio.currentTime=(left-98)*audio.duration/586;
            $('.mp3>div>span:last').html(shijian(audio.currentTime));
            var w =612*(audio.currentTime/audio.duration); //
            $(".mp3>p>span:nth-child(3)").css('width',w);
        }
    })
    document.addEventListener('touchend',function(){
        //console.log(4)
        //audio.currentTime=(left-98)*audio.duration/586;
        $('.mp3>div>span:last').html(shijian(audio.currentTime));
        //var progressValue =100*(audio.currentTime/audio.duration); //
        //$("progress").val(progressValue);
        isdown = false;
        //alert(isdown);
    });
})
