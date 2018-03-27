$('#top>div>div').mouseenter(function(){
    $('#top>div>div>div').css({'display':'block'})
}).mouseleave(function(){
    $('#top>div>div>div').css({'display':'none'})
})
$('#top>div>div>div').mouseenter(function(){
    $('#top>div>div>div').css({'display':'block'})
}).mouseleave(function(){
    $('#top>div>div>div').css({'display':'none'})
})
$('#top>div>div>div').click(function(){
    sessionStorage.removeItem('headImage');
    sessionStorage.removeItem('userId_token');
    window.location.href='../login.html?state=0'
})
//保存草稿
var status=0;
var content;
var articleId;
var articleUrl;

//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor');
//    $scope.$on('$destroy', function() {
//        ue.destroy();
//    });
$('#content_left').css({
    'height':winHeight-60
})

$('.logo').click(function(){
    window.open('../indexPc.html');
});



//            获取领域信息
var realmList;
var lis;
$.ajax({
    url :endpoint + "getRealmListForH5" + jsonpoint,
    data : {
        size: 1000,
        page: 1
    },
    type:'post',
    success : function(data){
        realmList=data.realmList;
        for(var i= 0,html='';i<realmList.length;i++){
            html+=`<li><span>${realmList[i].name}</span></li>`;
        }
        $('.field>ul').html(html);
        lis=$('.field>ul>li');
        for(var i=0;i<lis.length;i++){
            +function(i){
                $(lis[i]).click(function(){
                    if($(lis[i]).hasClass('fnChecked')){
                        $(lis[i]).removeClass('fnChecked');
                    }else{
                        $(lis[i]).addClass('fnChecked');
                    }
                })
            }(i)
        }
        //领域列表匹配
        articleId= GetQueryString('articleId');
        $.ajax({
            url :endpoint + "getArticleForPc" + jsonpoint,
            data : {
                articleId:articleId
            },
            type:'post',
            success : function(data){
                matching(data.article.articleRealm,realmList);
                articleUrl=data.article.articleUrl+'&h5=0';
                $('.titlePress>input').val(data.article.title);
                $('.abstractsPress>input').val(data.article.abstracts);
                if(data.article.coverImage==''){
                    $('#img').attr('src','../img/articlePc/peitu.png');
                }else{
                    $('#img').attr('src',data.article.coverImage);
                }
                ue.ready(function(){
                    // editor准备好之后才可以使用
                    UE.getEditor('editor').setContent(data.article.content);
                })
            }
        });

    }
})

//匹配领域
function matching(_value_,_list_){
    for(var i=0;i<_value_.length;i++){
        for(var j=0;j<_list_.length;j++){
            if(_value_[i].realmId == _list_[j].realmId){
                $(lis[j]).addClass('fnChecked');
            }
        }
    }
};
//返回给后台的领域id
function addRealmIds(){
    var realmIds='';
    for (var i = 0; i < lis.length; i++) {
        if ($(lis[i]).hasClass('fnChecked')) {
            realmIds+=realmList[i].realmId +",";
        }
    }
    return realmIds.substring(0,realmIds.length-1);
}
//title标题
var maxChars,title,curr,abstracts;
$('.titlePress>input').keyup(function(){
    maxChars = 50;//最多字符数
    title=$('.titlePress>input').val();
    curr = maxChars - title.length;
    if(curr>=0){
        curr=curr;
        $(".titlePress>span>span").html(curr.toString())
    }else{
        curr=-curr;
        $(".titlePress>span>span").html(curr.toString())
    }
});
//abstractsPress标题
$('.abstractsPress>input').keyup(function(){
    maxChars = 120;//最多字符数
    abstracts=$('.abstractsPress>input').val();
    curr = maxChars - abstracts.length;
    if(curr>=0){
        curr=curr;
        $(".abstractsPress>span>span").html(curr.toString())
    }else{
        curr=-curr;
        $(".abstractsPress>span>span").html(curr.toString())
    }
});
////发布文章
//$('.articlePublish').click(function(){
//    $('.articlePublish>span').css({
//        'color':'#fff'
//    });
//    $('.articleMy>span').css({
//        'color':'#8e8e8e'
//    })
//    $('.articlePublish').addClass('show');
//    $('.articleMy').removeClass('show');
//    $('.articlePublishContent').addClass('showContent');
//    $('.articleMyContent').removeClass('showContent');
//});

//我的文章
$('.articleMy').click(function(){
    window.location.href='myArticle.html';
});
//上传图片
function getPath(obj,fileQuery,transImg) {

    var imgSrc = '', imgArr = [], strSrc = '' ;

    if(window.navigator.userAgent.indexOf("MSIE")>=1){ // IE浏览器判断
        if(obj.select){
            obj.select();
            var path=document.selection.createRange().text;
            alert(path) ;
            obj.removeAttribute("src");
            imgSrc = fileQuery.value ;
            imgArr = imgSrc.split('.') ;
            strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
            if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
                obj.setAttribute("src",transImg);
                obj.style.filter=
                    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path+"', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
            }else{
                //try{
                throw new Error('File type Error! please image file upload..');
                //}catch(e){
                // alert('name: ' + e.name + 'message: ' + e.message) ;
                //}
            }
        }else{
            // alert(fileQuery.value) ;
            imgSrc = fileQuery.value ;
            imgArr = imgSrc.split('.') ;
            strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
            if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
                obj.src = fileQuery.value ;
            }else{
                //try{
                throw new Error('File type Error! please image file upload..') ;
                //}catch(e){
                // alert('name: ' + e.name + 'message: ' + e.message) ;
                //}
            }

        }

    } else{
        var file =fileQuery.files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            imgSrc = fileQuery.value ;
//            console.log(e.target);
//            console.log(e.target.result)
            imgArr = imgSrc.split('.') ;
            strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
            if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
                obj.setAttribute("src", e.target.result) ;
            }else{
                //try{
                throw new Error('File type Error! please image file upload..') ;
                //}catch(e){
                // alert('name: ' + e.name + 'message: ' + e.message) ;
                //}
            }
            // alert(e.target.result);
        }
        reader.readAsDataURL(file);
    }
}
function getShow(){
    //以下即为完整客户端路径
    var file_img=document.getElementById("img"), iptfileupload = document.getElementById('iptfileupload') ;
    getPath(file_img,iptfileupload,file_img) ;
}

function getParams() {
    return {
        realmId: addRealmIds(),
        abstracts:$('.abstractsPress>input').val(),//摘要
        content:encodeURIComponent(UE.getEditor('editor').getContent()),//文章内容
        status:status,
        userId:userId,
        articleId:articleId,
        title: $('.titlePress>input').val()//文章标题
    };
};
tap('#btn1',function(){
    title=$('.titlePress>input').val();
    content=UE.getEditor('editor').getContent();
    if( $.trim(title) == "" ){
        $('.fabu>span').html('文章标题不能为空').css({'color':'red'});
        return false;
    };
    if( $.trim(content) == "" ){
        $('.fabu>span').html('文章内容不能为空').css({'color':'red'});
        return false;
    };
    $('.fabu>span').html('为保证文章质量，小编可能会优化排版或修改配图。').css({'color':'#8e8e8e'});
    //console.log(getParams());
    $('#btn1').attr("disabled",true);
    if(articleId!=undefined){
        $.ajaxFileUpload({
            url :endpoint + "updateArticleForPc" + jsonpoint,
            type:'post',
            data :getParams(),
            //data :JSON.stringify(getParams()),
            fileElementId:'iptfileupload',//文件选择框的id属性
            dataType: 'json',//服务器返回的格式
            processData: true,
            contentType:"application/json; charset=UTF-8",
            success : function(data){
                $('#btn1').attr("disabled",false);
                //console.log($.parseJSON(data));
                tip('保存成功');
            }
        })
    }else{
        $.ajaxFileUpload({
            url :endpoint + "insertArticleForPc" + jsonpoint,
            processData: true,
            type:'post',
            data :getParams(),
            fileElementId:'iptfileupload',//文件选择框的id属性
            dataType: 'json',//服务器返回的格式
//            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            contentType:"application/json; charset=UTF-8",
            success : function(data){
                //console.log( $.parseJSON(data));
                $('#btn1').attr("disabled",false);
                tip('保存成功');
                articleId=$.parseJSON(data).articleId;
                articleUrl=$.parseJSON(data).articleUrl+'&h5=0';
            }
        })
    }

})

var timer=setInterval(function(){
    if(articleId!=undefined){
        $.ajaxFileUpload({
            url :endpoint + "updateArticleForPc" + jsonpoint,
            processData: false,
            type:'post',
            data :getParams(),
            fileElementId:'iptfileupload',//文件选择框的id属性
            dataType: 'JSON',//服务器返回的格式
//            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            contentType:"application/json; charset=UTF-8",
            success : function(data){
                //console.log( $.parseJSON(data));
            }
        })
    }else{
        content=UE.getEditor('editor').getContent();
        title=$('.titlePress>input').val();
        if(content!=''&&title!=''){
            $.ajaxFileUpload({
                url :endpoint + "insertArticleForPc" + jsonpoint,
                processData: false,
                type:'post',
                data :getParams(),
                fileElementId:'iptfileupload',//文件选择框的id属性
                dataType: 'json',//服务器返回的格式
//            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                contentType:"application/json; charset=UTF-8",
                success : function(data){
                    //console.log( $.parseJSON(data));
                    articleId=$.parseJSON(data).articleId;
                    articleUrl=$.parseJSON(data).articleUrl+'&h5=0';
                }
            })
        }else{
        }
    }
},3000*60);

tap('#btn2',function(){
    title=$('.titlePress>input').val();
    content=UE.getEditor('editor').getContent();
    if( $.trim(title) == "" ){
        $('.fabu>span').html('文章标题不能为空').css({'color':'red'});
        return false;
    };
    if( $.trim(content) == "" ){
        $('.fabu>span').html('文章内容不能为空').css({'color':'red'});
        return false;
    };
    $('.fabu>span').html('为保证文章质量，小编可能会优化排版或修改配图。').css({'color':'#8e8e8e'});
    $('#btn2').attr("disabled",true);
    if(articleId!=undefined){
            $('#btn2').html('提交中...');
            $.ajax({
                url:endpoint + "updateReviewStatus" + jsonpoint,
                type:'post',
                data:{
                    articleId:articleId
                },
                success:function(){
                    $('#btn2').attr("disabled",false);
                    window.location.href='myArticle.html';
                }
            })
    }else{
        $.ajaxFileUpload({
            url :endpoint + "insertArticleForPc" + jsonpoint,
            processData: false,
            type:'post',
            data :getParams(),
            fileElementId:'iptfileupload',//文件选择框的id属性
            dataType: 'json',//服务器返回的格式
            contentType:"application/json; charset=UTF-8",
            success : function(data){
                articleId=$.parseJSON(data).articleId;
                articleUrl=$.parseJSON(data).articleUrl+'&h5=0';
                $('#btn2').html('提交中...');
                $.ajax({
                    url:endpoint + "updateReviewStatus" + jsonpoint,
                    type:'post',
                    data:{
                        articleId:articleId
                    },
                    success:function(){
                        $('#btn2').attr("disabled",false);
                        window.location.href='myArticle.html';
                    }
                })
            }
        })
    }
});

tap('#btn3',function(){
    title=$('.titlePress>input').val();
    content=UE.getEditor('editor').getContent();
    if( $.trim(title) == "" ){
        $('.fabu>span').html('文章标题不能为空').css({'color':'red'});
        return false;
    };
    if( $.trim(content) == "" ){
        $('.fabu>span').html('文章内容不能为空').css({'color':'red'});
        return false;
    };

    $('.fabu>span').html('为保证文章质量，小编可能会优化排版或修改配图。').css({'color':'#8e8e8e'});
    if(articleId!=undefined){
        disabledMouseWheel()
        //return;
        $("body").prepend(`<div class="outSaoMa" >
                <div class="saoMa">
                    <div id="qrcode"></div>
                </div>
            </div>`);
        //二维码
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 190,
            height : 190
        });
        function makeCode () {
            //生成二维码
            qrcode.makeCode(articleUrl);
        }
        makeCode();
        $('.outSaoMa').css({
            width:winWidth,
            height:winHeight,
            zIndex:10000,
            left:0,
            top:0
        });
        $('.outSaoMa').click(function(){
            window.onmousewheel = document.onmousewheel = true;
           $(this).remove();
        });

    }else{
        $.ajaxFileUpload({
            url :endpoint + "insertArticleForPc" + jsonpoint,
            processData: false,
            type:'post',
            data :getParams(),
            fileElementId:'iptfileupload',//文件选择框的id属性
            dataType: 'json',//服务器返回的格式
//            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(data){
                articleId=$.parseJSON(data).articleId;
                articleUrl=$.parseJSON(data).articleUrl+'&h5=0';
                $("body").prepend(`<div class="outSaoMa" >
                <div class="saoMa">
                    <div id="qrcode"></div>
                </div>
            </div>`);
                //二维码
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width : 190,
                    height : 190
                });
                function makeCode () {
                    //生成二维码
                    qrcode.makeCode(articleUrl);
                }
                makeCode();
                $('.outSaoMa').css({
                    width:winWidth,
                    height:winHeight,
                    zIndex:10000,
                    left:0,
                    top:0
                });
                $('.outSaoMa').click(function(){
                    window.onmousewheel = document.onmousewheel = true;
                    $(this).remove();
                });
            }
        })
    }
})