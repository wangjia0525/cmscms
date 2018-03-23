/**
 * Created by wangjia on 2017/8/30.
 */
;(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = 0;
            if( !/android|iPhone|SymbianOS|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent) ){
                clientWidth = 480;
                if (!clientWidth) return;
                docEl.style.fontSize = 20 * (clientWidth / 480) + 'px';
                $("footer,.nav").css("width",480);
                $("body").css({"max-width":640,"margin":"0 auto"});
                $(".nav,footer").css({"left":"50%","margin-left":"-240px"});
            }else{
                clientWidth = 320;
                if (!clientWidth) return;
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
var endpoint = "/ixinghui/app/";
var jsonpoint = "";
var re = /^\d*/;
var href = window.location.hash.replace(/$#/, '');
var url=window.location.href.split('#')[0];
//微信二次分享
var shareId = $.session.get('shareId');
var weixin='';
function getWeixin(prams,callBack){
    $.ajax({
        async: true,
        type: "get",
        data: prams,
        cache: false,
        url: endpoint + "getSignature" + jsonpoint,
        success:function(data){
            //console.log(data)
            return callBack(data);
        }
    })
}
//获取产品
$(function(){
    addData();
    function addData(){
        setShareInfo({
            title: 'i幸会2017-2018超级课表，重新定义营销',
            summary: '这是一个全民营销的时代，不断学习才能先人一步',
            pic:  'http://api.ixinghui.com:81/ixinghui-share/img/sher.png',
            url:'http://api.ixinghui.com/ixinghui-share/member/timetable.html#userId='+shareId
        });
        $('#m1').attr('content','i幸会2017-2018超级课表，重新定义营销' );
        $('#m3').attr('content','这是一个全民营销的时代，不断学习才能先人一步');
        $('#m2').attr('content','http://api.ixinghui.com:81/ixinghui-share/img/sher.png');
        var imgUrl ="";
        var lineLink ='http://api.ixinghui.com/ixinghui-share/member/timetable.html#userId='+shareId;
        var shareTitle = 'i幸会2017-2018超级课表，重新定义营销';
        var descContent ='这是一个全民营销的时代，不断学习才能先人一步';
        var appid = weixin.appId;
        getWeixin(
            {'url':url},
            function(data){
                weixin=data;
                wx.config({
                    debug:false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
                    appId:weixin.appId,// 必填，公众号的唯一标识
                    timestamp:weixin.timestamp,// 必填，生成签名的时间戳
                    nonceStr:weixin.nonceStr,// 必填，生成签名的随机串
                    signature:weixin.signature,// 必填，签名，见附录1
                    jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']//必填，需要使用的JS接口列表
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
    }
})
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
//验证规则
var regular = {
    //password密码 bank银行卡 phone手机号码 email邮箱 idcard身份证
    password : /^[a-z]+[a-zA-Z0-9_.-]{7,19}$/i,
    bank : /^(\d{16}|\d{19})$/,
    phone :  /^(13|14|15|18|17)[0-9]{9}$/,
    email : /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/,
    idcard : /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
}
var errorMsg = {
    username : "用户名不能为空",
    password : "密码不能为空",
    code : "验证码不能为空",
    code1 : "该手机号码已经注册, 请直接登录",
    bank : "银行卡不能为空",
    phone : "请输入手机号",
    email : "邮箱地址不能为空",
    idcard : "身份证号码不能为空"
}
var regularMsg = {
    password : "密码格式有误，字母开头长度8-20位",
    passwordtwice : "两次输入的密码不一致",
    bank : "银行卡格式有误！",
    phone : "手机号码格式有误",
    email : "邮箱地址格式错误",
    idcard : "身份证号码格式有误"
}
//获取短信验证码
var countdown = 60;
function settime(obj) {
    console.log(1)
    $(obj).attr('disabled','disabled');
    var flag = $(obj).attr('disabled');
    var username = $("[name='reg_username']").val();
    if( flag ){
        var _data = {
            phoneNo : username
        }
        $.ajax({
            url : '/ixinghui/SMSCode' + jsonpoint,
            data : _data,
            type:'post',
            success : function(data){
                console.log(data);
                codeId=data.codeId
                //if( data.isRegist==true){ //成功
                    var _countdown = null;
                    //$.session.set("registerNum",data.responseData.registerNum);
                    //$.session.get("registerNum");
                    $(obj).attr('disabled','disabled').css({'background':'#fff',"color":"#cdcdcd"});
                    _countdown = setInterval(function(){
                        $(obj).text(countdown +'秒重新发送');
                        if( countdown <= 0 ){
                            clearInterval(_countdown);
                            $(obj).removeAttr('disabled').css({'background':'#17dce1',"color":"#fff"});
                            $(obj).text('获取验证码');
                            countdown = 60;
                            return false;
                        }
                        countdown--;
                    },1000);
                //}
                //else if( code == 2 ){ //未登录
                //    var href = window.location.href,
                //        hostname = window.location.hostname;
                //    /*window.location.href = "/user/login.html?url="+href.split(hostname+'/')[1];*/
                //}else{ //失败
                //    $.alert(data.responseMsg,function(){
                //        $(obj).attr('disabled',false);
                //    });
                //}
            },
            error : function(data){
                $.alert(data.responseMsg,function(){
                    $(obj).attr('disabled',false);
                });
            }
        });
    }
}
