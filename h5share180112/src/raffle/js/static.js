$(function () {
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
    };
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        var localUrl="";
        if (browser.versions.ios) {
            //直接打开app
            localUrl="iXingHuiScheme://";
            window.location.href=localUrl;
        }
        if(browser.versions.android){
            localUrl="ixinghui://ixinghui.share.com";
            window.location.href = localUrl;
        }
    //直接下载
    $(".downloadApp_btn").on("click", function () {
        if (browser.versions.ios) {
            window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxuan.ixinghui")
        } else if (browser.versions.android) {
            window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxuan.ixinghui")
        } else {
            window.open("http://android.myapp.com/myapp/detail.htm?apkName=com.yunxuan.ixinghui")
        }
    });
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