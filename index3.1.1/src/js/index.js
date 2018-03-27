/**
 * Created by webjia on 2018/2/27.
 */
var endpoint = "/ixinghui/app/";
var jsonpoint = "";
var winWidth = window.Width || document.documentElement.clientWidth || document.body.clientWidth;
var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//$.tip() 用于提示
function loading(text, time) {
    if($.type(text) === "number") {
        time = text;
        text = undefined;
    }
    var txt = (text == undefined) ? "" : text;
    $(document.body).append('<div class="closeModal showLoading"><div class="showLoadingBody" style="width:100px;height:40px;line-height: 40px;">' + txt + '</div></div>');
    if($(".showLoadingBody p").is(":empty")) {
        remove(".showLoadingBody p");
        //$(".loading_img").css("margin", "2.2rem auto 0");
    }
    if($.type(text) === "number") {
        time = text;
    }
    resize(".showLoadingBody");
    if(time) {
        setTimeout(function() {
            $(".showLoading").fadeOut(300, function() {
                remove(this);
            });
        }, Number(time));
    }
}
function tip(text, time) {
    time = 1000;
    this.call(loading(text, time));
    resize(".showLoadingBody");
}
function remove (className, time) {
    if(time) {
        return $(className).fadeOut(time, function() {
            remove(this);
        });
    }
    return $(className).remove();
}
function resize(className) { //自动居中层 className需要居中的层
    var cls = className || ".closeModal";
    var layerWidth = $(cls).width(),
        layerHeight = $(cls).height();
    $(cls).css({
        "position": "fixed",
        "top": (winHeight - layerHeight) / 2,
        "left": (winWidth - layerWidth) / 2+110
    });
}

//禁用滚轮
function disabledMouseWheel() {
    if (document.addEventListener) {

        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }//W3C
    window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
}

//开启滚轮
function scrollFunc(evt) {
    evt = evt || window.event;
    if(evt.preventDefault) {
        // Firefox
        evt.preventDefault();
        evt.stopPropagation();
    } else {
        // IE
        evt.cancelBubble=true;
        evt.returnValue = false;
    }
    return false;

}
//防止页面后退
$(function() {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
})
var tap= function(className, callback) {
    return $("body").off("click", className).on("click", className, function(event) {
        event.preventDefault();
        var element = this,
            index = $(element).index();
        callback(index, element);
    });
};
$('#content_left').css({
    'height':winHeight-60
})
