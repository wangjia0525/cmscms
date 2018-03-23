/**
 * Created by Administrator on 2017/7/10.
 */

var endpoint = "/ixinghui/app/";
var jsonpoint = "";

var re = /^\d*/;
var href = window.location.hash.replace(/$#/, '');
var url=window.location.href.split('#')[0];
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
        $('#m1').attr('content','测完沉默，这么多年我都埋没了自己！' );
        $('#m3').attr('content','其实我是冲着末尾的iPhone 7去的');
        $('#m2').attr('content','http://api.ixinghui.com:81/ixinghui-share/img/sher.png');
        var imgUrl ="";
        var lineLink ='http://api.ixinghui.com/ixinghui-share/raffle/index.html';
        var shareTitle = '测完沉默，这么多年我都埋没了自己！';
        var descContent ='其实我是冲着末尾的iPhone 7去的';
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
