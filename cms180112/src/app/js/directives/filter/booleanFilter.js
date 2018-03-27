
App.filter('boolean_nameType', function() {
    return function(boolean) {
        if(boolean){
            return "匿名"
        }else{
            return "实名"
        }
    };
});


App.filter('banner_type', function() {
    return function(_type_){
        var params_type_list = ["","图片","话题","擂台","广告","产品","动态","网页","网页",'文章'];
        return params_type_list[_type_];
    }
});


App.filter('boolean_status', function() {
    return function(_type_) {
        if(_type_==2){
            return "强制更新"
        }else if(_type_==1){
            return "建议更新"
        }else{
            return "不提示"
        }
    };
});
App.filter('is_HomePage', function() {
    return function(isHomePage) {
        if(1==isHomePage){
            return "是"
        }else{
            return "否"
        }
    };
});
/* 举报列表 */
App.filter('boolean_handleStatus', function() {
    return function(_type_){
        var params_type_list = ["待处理","已处理","已处理"];
        return params_type_list[_type_];
    }
});

App.filter('boolean_fieldStatus', function() {
    return function(_type_){
        var params_type_list = ["","聊天","动态","话题/擂台","评论","用户"];
        return params_type_list[_type_];
    }
});

App.filter('boolean_adviceStatus', function() {
    return function(_type_){
        var params_type_list = ["","未解决","已解决"];
        return params_type_list[_type_];
    }
});

/* 课程列表 */
App.filter('coursesType_status', function() {
    return function(_type_){
        var params_type_list = ["","上架","下架"];
        return params_type_list[_type_];
    }
});

/* 激活冻结 */
App.filter('createCode_status', function() {
    return function(_type_){
        var params_type_list = ["","激活","冻结"];
        return params_type_list[_type_];
    }
});

/* 使用状态 */
App.filter('codeUse_status', function() {
    return function(_type_){
        var params_type_list = ["","未兑换","已兑换"];
        return params_type_list[_type_];
    }
});

/* 方向 */
App.filter('function_type', function() {
    return function (_type_) {
        if(_type_==101){
            return "充值"
        }else if(_type_==102) {
            return "充值"
        }else if(_type_==201) {
            return "充值"
        }else if(_type_==301) {
            return "支出"
        }else if (_type_==103){
            return "充值"
        }else if (_type_==309){
            return "支出"
        }else if (_type_==310){
            return "支出"
        }else if (_type_==104){
            return "充值"
        }else if (_type_==106){
            return "充值"
        }else if (_type_==108){
            return "充值"
        }else {
            return "未知类型"
        }
    }
});

/* 事件类型 */
App.filter('function_status', function() {
    return function (_type_) {
        if(_type_==101){
            return "支付宝充值"
        }else if(_type_==102) {
            return "微信充值"
        }else if(_type_==201) {
            return "兑换余额"
        }else if(_type_==301) {
            return "购买课程"
        }else if (_type_==103){
            return "ios内购"
        }else if (_type_==309){
            return "微咨询"
        }else if (_type_==310){
            return "偷看"
        }else if (_type_==106){
            return "任务墙领取"
        }else if (_type_==108){
            return "分享会员注册奖励"
        }else if (_type_==104){
            return "收益转入"
        } else {
            return "未知类型"
        }
    }


});
/* class */
App.filter('function_class', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "li1"
        } else if (_type_ == 1) {
            return "li2"
        }
    }
});

//jumpType
App.filter('function_jumpType', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "问答/擂台"
        } else if (_type_ == 4) {
            return "日课"
        }else if (_type_ == 6) {
            return "文本"
        }else if (_type_ == 5) {
            return "超链接"
        }else{
            return "文本"
        }
    }
});

//function_isTiming
App.filter('function_isTiming', function() {
    return function (_type_) {
        if (_type_=="1,0") {
            return "已发送"
        } else if(_type_=="1,1"){
            return "已发送"
        }else if(_type_=="0,1"){
            return "已定时"
        }else{
            return "未处理"
        }
    }
});
//function_color
App.filter('function_color', function() {
    return function (_type_) {
        if (_type_=="1,0") {
            return ""
        } else if(_type_=="1,1"){
            return ""
        }else if(_type_=="0,1"){
            return "addColor"
        }else{
            return ""
        }
    }
});
//function_isRead
App.filter('function_isRead', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return ""
        } else if (_type_ == 1) {
            return "isRead"
        }
    }
});
//结算管理
//invoiceType发票类型
App.filter('invoiceType', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "--"
        } else if (_type_ == 1) {
            return "企业"
        }else{
            return "个人"
        }
    }
});

//clearingType计算类型
App.filter('clearingType', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "日课收入"
        } else if (_type_ == 2) {
            return "分享收入"
        }else if(_type_ == 3){
            return "分享收入"
        }
    }
});
//clearingTypeType计算类型
App.filter('clearingTypeType', function() {
    return function (_type_) {
        if (_type_ == 2) {
            return "现金"
        }else if(_type_ == 3){
            return "幸会币"
        }
    }
});
//state订单状态
App.filter('state', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "待处理"
        } else if (_type_ == 2) {
            return "处理中"
        }else if(_type_ == 3){
            return "已处理"
        }
    }
});
//state订单状态
App.filter('states', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "待处理"
        } else if (_type_ == 1) {
            return "处理中"
        }else if(_type_ == 2){
            return "已寄出"
        }
    }
});
//isPlatform平台用户
App.filter('isPlatform', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "平台用户"
        } else{
            return "非平台用户"
        }
    }
});
//isShow平台用户
App.filter('isShow', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "列表展示"
        } else{
            return "非列表展示"
        }
    }
});

//isPlatform_status平台用户
App.filter('isPlatform_status', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "草稿"
        } else if (_type_ == 1) {
            return "发布"
        } else if (_type_ == 3) {
            return "定时"
        } else if(_type_ == 2){
            return "删除"
        }
    }
});
App.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
//发票类别
App.filter('invoiceTypes', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "教育培训"
        } else if (_type_ == 2) {
            return "服务费"
        }
    }
});
//发票
App.filter('isInvoice', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "未收到"
        } else if (_type_ == 1) {
            return "已收到"
        }
    }
});
//发票类型//InvoiceCategory
App.filter('InvoiceCategory', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "增值税普通发票"
        } else if (_type_ == 2) {
            return "增值税专用发票"
        }
    }
});

//发票类型//IsCashWithdrawal
App.filter('IsCashWithdrawal', function() {
    return function (_type_) {
        if (_type_ == undefined) {
            return "未提现"
        } else{
            return "已提现"
        }
    }
});
//发票类型//subject
App.filter('subject', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "微课"
        } else if (_type_ == 2){
            return "精品课"
        }else{
            return "系统课"
        }
    }
});

//上新标识//isNew
App.filter('isNew', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "无"
        } else{
            return "有"
        }
    }
});
//下取整数
App.filter('underNum', function() {
    return function(type){
        return parseInt(type)
    }
});

//启用停用
App.filter('state_s', function() {
    return function (_type_) {
        if (_type_ == 0) {
            return "停用"
        } else{
            return "启用"
        }
    }
});
//上传
App.filter('state_post', function() {
    return function (_type_) {
        if (_type_) {
            return "上传成功"
        } else{
            return "--"
        }
    }
});
//文章 boolean_reviewStatus
App.filter('boolean_reviewStatus', function() {
    return function (_type_) {
        if (_type_ == 1) {
            return "未审核"
        } else if (_type_ == 2){
            return "审核通过"
        }else{
            return "审核未通过"
        }
    }
});
//文章审核说明boolean_instructions
App.filter('boolean_instructions', function() {
    return function (_type_) {
        if (_type_ == " ") {
            return "--"
        } else if (_type_ == undefined){
            return "--"
        }else{
            return _type_.length>10?_type_.slice(0,14)+'...':_type_
        }
    }
});
App.filter('boolean_instructionss', function() {
    return function (_type_) {
        if (_type_ == " ") {
            return "--"
        } else if (_type_ == undefined){
            return "--"
        }else{
            return _type_
        }
    }
});