/**
 * Created by wangjia on 2017/8/30.
 */
<!-- 响应式-->
//(function(){
//    var scale = 1 / devicePixelRatio;
//    //console.log(devicePixelRatio)
//    document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
//    document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px';
//})();
////备注此处的元素的尺寸用rem标识，=x*37.5/设计稿的宽             设计稿的宽比如750 480
var endpoint = "/ixinghui/app/";
var jsonpoint = "";
var re = /^\d*/;
var href = window.location.hash.replace(/$#/, '');
var url=window.location.href.split('#')[0];
var articleId = href.split("&")[0].split("=")[1].match(re)[0];

var userId ;
if(href.split("&")[2]){
    userId=href.split("&")[2].split("=")[1].match(re)[0];
}else{
    userId=1;
    $('.downloadApp').hide();
    $('.articleH5').css({marginTop:0})
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
$.session.set("shareId",userId);

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.hash.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}





