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



