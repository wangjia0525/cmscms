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
//关闭页面

$('.logo').click(function(){
    window.open('../indexPc.html');
});


var realmList;
var lis;
//发布文章
$('.articlePublish').click(function(){
    window.location.href='articlePc.html';

});



function delArticle(delArticle){
//        console.log(articleEvaluateId);
    $("body").prepend(`<div class="parsetcroBox" >
            <div class="deleteConfirm">
            <div class="cropperBox">确定删除吗?</div>
            <ul class="bottomBox">
             <li class="imgBoxBtn queding">确定</li>
                 <li class="quxiao">取消</li>
            </ul>
            </div>
            </div>`);

    disabledMouseWheel();
    $('.parsetcroBox').css({
        width:winWidth,
        height:winHeight,
        zIndex:10000,
        left:0,
        top:0
    });
    $(".parsetcroBox").show();
    $(".deleteConfirm").css({
        opacity:1,
        top:$(window).height() / 2-60,
        left:$(window).width() / 2-158
    });

    $(".quxiao").on("click",function(){
        window.onmousewheel = document.onmousewheel = true;
        $(".parsetcroBox").remove();
    })
    $(".queding").on("click",function(){
        $(".parsetcroBox").remove();
        $.ajax({
            url :endpoint + "deleteArticlePc" + jsonpoint,
            data : {
                articleId:delArticle
            },
            type:'post',
            success : function(data){
                window.onmousewheel = document.onmousewheel = true;
                $(".del"+delArticle).parent().parent().remove();
            }
        })
    })

}
//分页

loadPage(1);
var articleList,totalpage,pagesize,cpage,count,curcount,outstr;
function loadPage(page){
    $.ajax({
        type:'GET',
        url:endpoint + "getMyArticleListPc" + jsonpoint,
        data:{
            page:page,
            size:10,
            userId:userId
        },
        success:function(data){
            $('.load').hide();
            //console.log(data);
            articleList=data.articleList;
            if(data.articleList.length==0&&page==1){
                $('.table').prepend("<div style='width:720px;margin:30px auto;text-align: center'><img src='../img/myArticle/kong.png'/></div>");
                return;
            }
            //totalpage=1;
            totalpage=Math.ceil(data.totalCount/10);
            setpage();    //调用分页
            var html="";
            for(i=0;i<articleList.length;i++){
                var obj=articleList[i];
                html+=`
                 <tr>
                        <td  data-toggle="tooltip"  title="${obj.title}">${obj.title.length>10?obj.title.slice(0,9)+'...':obj.title}</td>`;
                if(obj.reviewStatus==2){
                    html+=`<td  data-toggle="tooltip"  title="${obj.postedTime}">${obj.postedTime.substr(0,10)}</td>`;
                }else{
                    html+=`<td> --</td>`;
                };
                html+=`<td>${obj.readNumber}</td>`;
                if(obj.reviewStatus==0){
                    html+=`<td>草稿</td>`;
                }else if(obj.reviewStatus==1){
                    html+=`<td>待审核</td>`;
                }else if(obj.reviewStatus==2){
                    if(obj.status==0){
                        html+=`<td>审核通过(待发布)</td>`;
                    }else{
                        html+=`<td>已发布</td>`;
                    }
                }else if(obj.reviewStatus==3){
                    html+=`<td>审核不通过</td>`;
                };
                if(obj.instructions==undefined||obj.instructions==" "){
                    html+=`<td> --</td>`;
                }else{
                    html+=`<td data-toggle="tooltip"  title="${obj.instructions}">${obj.instructions.length>10?obj.instructions.slice(0,9)+'...':obj.instructions}</td>`;
                };
                if(obj.reviewStatus==1||obj.reviewStatus==2){
                    html+=`<td>
                            <i data-toggle="tooltip"  title="编辑"  class="edi"></i>
                            <i data-toggle="tooltip"  title="删除" class="del"></i>
                        </td>
                    </tr>
            `;
                }else{
                    html+=`<td>
                            <i data-toggle="tooltip"  title="编辑" class="edi1" onclick="javascript:window.location.href='editorArticle.html?articleId=${obj.articleId}'"></i>
                            <i data-toggle="tooltip"  title="删除" class="del1 del${obj.articleId}" onclick="delArticle(${obj.articleId})"></i>
                        </td>
                    </tr>
            `;
                }

            }
            $('.table').html( "<thead> <tr> <td>标题</td> <td>发布时间</td> <td>阅读数</td> <td>状态</td> <td>说明</td> <td>操作</td> </tr> </thead> <tbody>"+ html+"</tbody>");
            ////衣服的颜色
            //var spans=$("#list>ul>li>div>span");
            //function rgb(){
            //    var r=Math.floor(Math.random()*255);
            //    var g=Math.floor(Math.random()*255);
            //    var b=Math.floor(Math.random()*255);
            //    return `rgb(${r},${g},${b})`;
            //}
            ////console.log(rgb())
            //for(var i=0;i<spans.length;i++){
            //    $(spans[i]).css({backgroundColor:rgb()});
            //}
        }
    })
}



//初始化
cpage = 1;
pagesize = 10;
outstr = "";
function gotopage(target)
{

    cpage = target;
    loadPage(target);//把页面计数定位到第几页
    setpage();
    //reloadpage(target);    //调用显示页面函数显示第几页,这个功能是用在页面内容用ajax载入的情况
}
function setpage()
{
    if(totalpage<=10&&totalpage>1){        //总页数小于十页
        for (count=1;count<=totalpage;count++){
            if(count!=cpage) {
                outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>";
            }else{
                outstr = outstr + "<span class='current' >"+count+"</span>";
            }
        }
    }
    if(totalpage>10){        //总页数大于十页
        if(parseInt((cpage-1)/10) == 0){
            for (count=1;count<=10;count++){
                if(count!=cpage){
                    outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>";
                }else{
                    outstr = outstr + "<span class='current'>"+count+"</span>";
                }
            }
            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'> > </a>";
        }else if(parseInt((cpage-1)/10) == parseInt(totalpage/10)){
            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+(parseInt((cpage-1)/10)*10)+")'><</a>";
            for (count=parseInt(totalpage/10)*10+1;count<=totalpage;count++){
                if(count!=cpage){
                     outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>";
                }else{
                    outstr = outstr + "<span class='current'>"+count+"</span>";
                }
            }
        }else{
            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+(parseInt((cpage-1)/10)*10)+")'><</a>";
            for (count=parseInt((cpage-1)/10)*10+1;count<=parseInt((cpage-1)/10)*10+10;count++)
            {
                if(count!=cpage)
                {
                    outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>";
                }else{
                    outstr = outstr + "<span class='current'>"+count+"</span>";
                }
            }
            if(count<totalpage)
            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'> > </a>";
        }
    }
    if(totalpage==1){

    }else{
        document.getElementById("setpage").innerHTML = "<span id='info'>共"+totalpage+"页 | 第"+cpage+"页<\/span>" + outstr ;
    }

    outstr = "";
}

