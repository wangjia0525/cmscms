/**
 * Created by Administrator on 2017/8/31.
 */

var startTime = null,
    logs = function(val) {
        return console.log(val);
    },
    html = function(text, className, type) {
        if(type == "text") return $(className).text(text);
        return $(className).html(text);
    },
    remove = function(className, time) {
        if(time) {
            return $(className).fadeOut(time, function() {
                remove(this);
            });
        }
        return $(className).remove();
    },
    show = function(className, time) {
        if(time) {
            return $(className).fadeIn();
        }
        return $(className).show();
    },
    isshow = function(className) {
        return $(className).is(":visible");
    },
    tap = function(className, callback) {
        return $("body").off("click", className).on("click", className, function(event) {
            event.preventDefault();
            var element = this,
                index = $(element).index();
            callback(index, element);
        });
    },
    resize = function(className) { //自动居中层 className需要居中的层
        var cls = className || ".closeModal";
        var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var layerWidth = $(cls).width(),
            layerHeight = $(cls).height();
        $(cls).css({
            "position": "fixed",
            "top": (winHeight - layerHeight) / 2,
            "left": (winWidth - layerWidth) / 2
        });
    },
/* closeModal( [className],[time]) 关闭弹出层
 如无参数则删除所有弹出层
 */
    closeModal = function(className, time) {
        var cls = className || ".closeModal";
        if(isshow(".alertmsgbody")) $(".alertmsgbody").toggleClass("animate removeanimate");
        if(time) return remove(cls, time);
        return remove(cls);
    },
    getAjax = function(url_, method, datatype, fn, selector, target) {
        var s = selector || ".module_Slide_content";
        if(jQuery.isFunction(method)) {
            target = s;
            s = fn;
            fn = method;
            datatype = undefined;
            method = undefined;
        }
        if(jQuery.isFunction(datatype)) {
            if(method.toLowerCase() == "post" || "get") {
                target = s;
                s = fn;
                fn = datatype;
                datatype = undefined;
            } else {
                target = s;
                s = fn;
                fn = datatype;
                datatype = method;
                method = undefined;
            }
        }
        return $.ajax({
            method: method || "POST",
            url: url_,
            timeout: 5000,
            data: "",
            dataType: datatype || "html",
            beforeSend: function(d) {
                $(s).html("正在加载，请稍候...");
            }
        }).done(function(d) {
            if(target) {
                $(s).html($(d).find(target).html());
            } else {
                $(s).html(d);
            }
            if(fn) fn(d);
        }).fail(function(d) {
            $(s).html("数据请求失败，请重试一次！");
        });
    };

/* 基本弹出方法 $.alert([title], val, [fn], [callback]);
 title -> 标题 val -> 内容 fn -> 取消回调 callback -> 确定回调
 */
$.alert = function(title, val, fn, callback) {
    var arg = arguments,
        removecancel = true;
    if(typeof(title) == "undefined" || $.isFunction(title) || $.isArray(title) || $.isPlainObject(title) || title == 'null' ) {
        logs("alert插件参数错误！");
        return;
    }
    if(arg.length == 1) {
        val = title;
        title = undefined;
        fn = undefined;
        callback = undefined;
        removecancel = true;
    }
    if(arg.length == 2) {
        if($.isFunction(val)) {
            callback = val;
            val = title;
            title = undefined;
            fn = undefined;
        } else {
            fn = undefined;
            callback = undefined;
        }
    }
    if(arg.length == 3) {
        if($.isFunction(val)) {
            callback = fn;
            fn = val;
            val = title;
            title = undefined;
            removecancel = false;
        } else {
            callback = fn;
            fn = undefined;
            removecancel = true;
        }
    }
    if(arg.length == 4) {
        removecancel = false;
    }
    $(document.body).css({
        "overflow-y": "hidden",
        "height": "100%"
    }).append('<div class="closeModal alert"><div class="alertmsgcover"></div><div class="alertmsgbody"><div class="alertmsgtxt"><h2>' + title + '</h2><p>' + val + '</p></div><div class="alertmsgbtn"><div class="alertmsgcancel">取消</div><div class="alertmsgensure">确定</div></div></div></div>');
    $(".alertmsgbody").addClass("animate");
    $(".closeModal.alert").fadeIn();
    if(title == undefined) remove(".alertmsgtxt h2");
    if(removecancel == true) remove(".alertmsgcancel");
    $("body").off("click", ".closeModal.alert .alertmsgcancel").on("click", ".closeModal.alert .alertmsgcancel", function() {
        if(fn) fn();
        isshow(".closeModal.alert") ? closeModal(".closeModal.alert:eq(0)", 500) : closeModal();
        $(document.body).css({
            "overflow-y": "auto",
            "height": "auto"
        });
    });
    $("body").off("click", ".closeModal.alert .alertmsgensure").on("click", ".closeModal.alert .alertmsgensure", function() {
        if(callback) callback();
        isshow(".closeModal.alert") ? closeModal(".closeModal.alert:eq(0)", 300) : closeModal();
        $(document.body).css({
            "overflow-y": "auto",
            "height": "auto"
        });
    });
    resize(".closeModal.alert .alertmsgbody");
}
/* 加载提示 $.loading([text],[time]);
 text -> 内容 time -> 时间(会自动转换成number类型) 如果内容为数字，请加引号 如"123"，否则默认为隐藏的时间
 如果不设置时间，则不会自动关闭，需要手动调用$.removeLoading();方法关闭
 */
$.loading = function(text, time) {
    if($.type(text) === "number") {
        time = text;
        text = undefined;
    }
    var txt = (text == undefined) ? "" : text;
    $(document.body).css({
        "overflow-y": "hidden",
        "height": "100%"
    }).append('<div class="closeModal showLoading"><div class="showLoadingBody"><p style="display: inline-block;vertical-align: middle;">' + txt + '</p></div></div>');
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
                $(document.body).css({
                    "overflow-y": "auto",
                    "height": "auto"
                });
            });
        }, Number(time));
    }
}
//$.tip() 用于警告
$.tip = function(text, time) {
    time = 2000;
    this.call($.loading(text, time));
    //$(".loading_img img").attr("src", "../static/images/tip.png");
    resize(".showLoadingBody");
}
//$.error() 用于错误
$.error = function(text, time) {
    this.call($.loading(text, time));
    $(".loading_img img").attr("src", "../static/images/error.png");
    resize(".showLoadingBody");
}
/* $.removeLoading(); 关闭$.loading() 无参数 */
$.removeLoading = function() {
    remove(".showLoading");
}
/* $.slide(content,[data],[callback]); 滑动 从右侧滑入
 content -> 内容（如有data-ajax="xxx.html" 则调用xxx.html页面的内容） callback -> 回调
 */
$.slide = function(content, data, callback, flag) {
    var selector, c = $(content),
        url = c.attr("data-ajax");
    if(jQuery.isFunction(data)) {
        callback = data;
        data = undefined;
    }
    if(url) {
        if(data) {
            $.ajax({
                "url": url,
                async: false
            }).done(function(d) {
                var html = $(d).find(data).html();
                selector = html;
            });
        } else {
            selector = getAjax(url);
        };
    } else {
        if(data == true || (jQuery.isFunction(data) && callback == true)) {
            selector = content;
        } else {
            selector = c.html();
            c.empty();
        }
    }
    $(document.body).css({
        "overflow-y": "hidden",
        "height": "100%"
    }).append('<div class="closeModal module_Slide" style="display:none;"><h4><img src="../static/images/back_icon.png"> &nbsp;返回</h4><div class="module_Slide_content"></div></div>');
    $(".module_Slide:eq(-1)").addClass("animate");
    //if(callback)callback();
    $(".module_Slide:eq(-1)").fadeIn(300, function() {
        if(callback) callback();
    });
    html(selector, ".module_Slide_content:eq(-1)");
    $("body").off("click", ".module_Slide:eq(-1) h4").on("click", ".module_Slide:eq(-1) h4", function() {
        if(!url) c.html(selector);
        $(".module_Slide:eq(-1)").toggleClass("animate removeanimate");
        $(".module_Slide:eq(-1)")[0].addEventListener("webkitAnimationEnd", function() {
            remove(".module_Slide:eq(-1)");
            if(!isshow(".module_Slide")) $(document.body).css({
                "overflow-y": "auto",
                "height": "auto"
            });
        });
    });
}
//关闭提示 $.tip() $.error() $.loading()
$.closeNotice = function() {
    var start;
    start && clearTimeout(start);
    start = null;
    if(isshow(".ui_notice")) {
        $(".ui_notice").toggleClass("animate animate_remove");
        $(".ui_notice")[0].addEventListener("webkitAnimationEnd", function() {
            remove(".ui_notice", 300);
        });
    }
}

$("[data-controls]").each(function(index, element) {
    var length = $(element).data("length");
    $(element).append("<ul></ul>");
    for(var i = 0; i < length; i++) {
        $(element).find("ul").append("<li></li>");
    }

    $(element).append('<input type="password" name="password" style="display:none;">');
});;
(function($) {

    $.extend({
        //$.modal(options,[callback]); 自定义弹出层
        modal: function(options, callback) {
            var inits = {
                    "title": "",
                    "text": "",
                    "button": [] //text: "", className: "", onClick : function(){}
                },
                arg = arguments,
                init;
            if(arg.length == 0) {
                logs("modal插件参数错误！");
                return;
            }
            init = $.extend(inits, options);
            $(document.body).css({
                "overflow-y": "hidden",
                "height": "100%"
            }).append('<div class="closeModal modal"><div class="alertmsgcover" style="display:none;"></div><div class="alertmsgbody"><div class="alertmsgtxt"><h2>' + inits.title + '</h2><p>' + inits.text + '</p></div><div class="alertmsgbtn"></div></div></div>');
            $(".alertmsgbody").addClass("animate");
            $(".closeModal,.alertmsgcover").fadeIn();
            if(inits.title == "") remove(".alertmsgtxt h2");
            for(var i = 0, j = inits.button.length; i < j; i++) {
                var className = inits.button[i].className;
                var cls = (className == undefined) ? "" : inits.button[i].className
                $(".alertmsgbtn").append("<div class='" + cls + "'>" + inits.button[i].text + "</div>");
            }
            tap(".closeModal.modal .alertmsgbtn > div", function(index, element) {
                inits.button[index].onClick();
                $(".alertmsgbody").toggleClass("animate removeanimate");
                remove(".alertmsgcover", 300);
                $(".alertmsgbody")[0].addEventListener("webkitAnimationEnd", function() {
                    isshow(".closeModal.modal") ? closeModal(".closeModal.modal:eq(0)") : closeModal();
                    $(document.body).css({
                        "overflow-y": "auto",
                        "height": "auto"
                    });
                });
            });
            resize(".closeModal.modal .alertmsgbody");
            if(callback) callback();
        },
        // $.action(,[callback]); 用于交互，从底部弹出
        action: function(options, callback) {
            var ini = {
                    "button": [], //text: "", onClick : function(){}
                    "cancel": true //是否显示取消按钮 布尔值 默认显示true
                },
                set;
            set = $.extend(ini, options);
            $(document.body).css({
                "overflow-y": "hidden",
                "height": "100%"
            }).append('<div class="closeModal ui_action"><div class="alertmsgcover" style="display:none"></div><div class="actionbody"></div></div>');
            for(var i = 0, j = set.button.length; i < j; i++) {
                $(".actionbody").append('<div class="ui_action_cell">' + set.button[i].text + '</div>');
            }
            if(set.cancel) {
                $(".actionbody").append('<div class="ui_action_cell cancel">取消</div>');
            };
            tap(".actionbody .ui_action_cell:not(.cancel)", function(index, element) {
                set.button[index].onClick();
                $(".alertmsgcover").trigger("click")
            });
            tap(".actionbody .ui_action_cell.cancel", function(index, element) {
                $(".alertmsgcover").trigger("click")
            });
            $(".actionbody").addClass("animate");
            $(".actionbody,.alertmsgcover").fadeIn();
            tap(".ui_action > .alertmsgcover", function(index, element) {
                $(".actionbody").toggleClass("animate animate_remove");
                $(".actionbody")[0].addEventListener("webkitAnimationEnd", function() {
                    remove(".ui_action", 300);
                    $(document.body).css({
                        "overflow-y": "auto",
                        "height": "auto"
                    });
                });
            });
            if(callback) callback();
        },
        // $.notice(options) 顶部通知提示
        notice: function(options) {
            var param = {
                "text": "", //通知内容
                "onClick": $.noop(), //点击事件
                "time": "2000", //持续时间,如果为null，则一直显示
                "style": "", //背景样式 默认黑色半透明
                "dir": "top" //top bottom 默认从顶部下拉
            };
            options = $.extend({}, param, options);
            if(!isshow(".ui_notice")) {
                $(document.body).append('<div class="closeModal ui_notice" style="' + options.style + '"><div class="noticebody">' + options.text + '</div></div>');
            } else {
                $(".noticebody").html(options.text);
            }
            clearTimeout(startTime);
            $(".ui_notice").addClass("animate " + options.dir);
            var startTimeout = function() {
                if(startTime) {
                    clearTimeout(startTime);
                    start = null;
                }
                startTime = setTimeout(function() {
                    $.closeNotice();
                }, options.time);
            }
            if(options.time != null) startTimeout();
            tap(".noticebody", function() {
                if(options.onClick) options.onClick();
            });
        }
    });
})(jQuery);

$.support = (function() {
    var support = {
        touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
    };
    return support;
})();
$.touchEvents = {
    start: $.support.touch ? 'touchstart' : 'mousedown',
    move: $.support.touch ? 'touchmove' : 'mousemove',
    end: $.support.touch ? 'touchend' : 'mouseup'
};
$.getTouchPosition = function(e) {
    e = e.originalEvent || e;
    if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
        return {
            x: e.targetTouches[0].pageX,
            y: e.targetTouches[0].pageY
        };
    } else {
        return {
            x: e.pageX,
            y: e.pageY
        };
    }
};

;
(function($) {
    //支付
    $.fn.pay = function(options, callback) {
        var set = $.extend({
            "isAuto": false,
            "callback": function() {}, //确定回调
            "autosend": true, //是否自动提交 true false
            "point": "*", //密码样式 默认星号*
            "ischeck": true, //是否开启验证，true false
            "pwdUrl": "/user/wangjizhifumima1",
            "error": "密码长度不正确，请重新输入" //点击确定回调
        }, options);
        return this.each(function() {
            var this_ = $(this),
                pay_value = [],
                lens = $.session.get('payLength') || 0,
                maxlength = this_.attr("data-length");
            var _ = {
                init: function() {
                    var that = this;
                    if(set.isAuto != true) this_.empty();
                    var length = this_.data("length");
                    var payForm = '<div class="payUl"><ul></ul></div>';
                    var payFormAuto = '<div class="payUl"><ul></ul><a href="' + set.pwdUrl + '" class="paygridsFotgot">忘记密码</a></div>';
                    if(set.isAuto === true) {
                        if($('.paygrids').is(':visible'))return;
                        setTimeout(function() {
                            if(!$('.payUl').is(':visible')) $('.paygrids').prepend(payFormAuto);
                            for(var i = 0; i < length; i++) {
                                $(".payUl ul").append("<li></li>");
                            }
                        }, 30);
                    } else {
                        if($('.paygrids').is(':visible'))return;
                        this_.append(payForm);
                        for(var i = 0; i < length; i++) {
                            $(".payUl ul").append("<li></li>");
                        }
                    }
                    this_.append('<input type="password" id="payPassword" name="password" style="display:none;">');
                    var paypanel = '<div class="closeModal paygrids"><a href="#" id="hide_paygrids">收起</a><ul class="pay_grid"><li data-g="1">1</li><li data-g="2">2</li><li data-g="3">3</li><li data-g="4">4</li><li data-g="5">5</li><li data-g="6">6</li><li data-g="7">7</li><li data-g="8">8</li><li data-g="9">9</li><li data-event="pay_grid_ensure">确定</li><li data-g="0">0</li><li data-event="pay_grid_delete"><i class="keyboard"></i></li></ul></div>';
                    this_.off('click').on('click',function() {
                        lens = 0;
                        pay_value = [];
                        $(".payUl li").removeClass("active").removeAttr("data-num").empty();
                        $.session.set('payLength', 0);
                        var $pay = $(this).parent();
                        if(set.isAuto === true){
                            $('.payCover').remove();
                            $(this).after('<div class="payCover"></div>');
                        }
                        if($(this).attr('paypanel')) {
                            $('.paygrids').addClass('animate');
                        } else {
                            lens = 0;
                            $(this).attr('paypanel', 1);
                            $(this).after(paypanel);
                            $('.paygrids').addClass('animate');
                        }
                        that.event();
                    });
                    if(set.isAuto === true) {
                        this_.trigger('click');
                        $('[data-controls] .payUl').addClass('payAuto');
                    } else {
                        $('.payUl > p').remove();
                    }
                    if(callback) callback();
                },
                event: function() {
                    $(document.body).off('click', '.pay_grid li[data-g]').on('click', '.pay_grid li[data-g]', function(event) {
                        event.stopPropagation();
                        if(lens == maxlength) return false;
                        var num = $(this).text();
                        lens++;
                        $.session.set('payLength', lens);
                        if(lens > maxlength) {
                            lens = maxlength;
                            return false;
                        }
                        $(".payUl li").eq(lens - 1).attr("data-num", num).addClass("active").html(set.point);
                        pay_value = [];
                        pay_value = $.map($(".payUl li.active"), function(array, index) {
                            return $(array).attr("data-num");
                        });
                        if(lens == maxlength && set.autosend) {
                            if(set.callback) set.callback(pay_value.join(''));
                        }
                        return false;
                    });
                    $(document.body).off('click', '[data-event="pay_grid_ensure"]').on('click', '[data-event="pay_grid_ensure"]', function(event) {
                        event.stopPropagation();
                        var split_ = pay_value.join("");
                        $(document.body).css({
                            "height": "auto"
                        });
                        if(lens == maxlength) closeModal();
                        if(lens < maxlength && set.ischeck == true) {
                            $.tip(set.error, 2000);
                            return false;
                        };
                        set.callback(split_);
                        return false;
                    });
                    $(document.body).off('click', '.pay_grid [data-event="pay_grid_delete"]').on('click', '.pay_grid [data-event="pay_grid_delete"]', function(event) {
                        event.stopPropagation();
                        $("li.active").eq(-1).removeClass("active").removeAttr("data-num").empty();
                        lens--;
                        $.session.set('payLength', lens);
                        if(lens < 0) {
                            lens = 0;
                            pay_value = [];
                            return false;
                        }
                        pay_value = [];
                        pay_value = $.map($(".payUl li.active"), function(array, index) {
                            return $(array).attr("data-num");
                        });
                        return false;
                    });
                    $(document.body).off('click', '#hide_paygrids').on('click', '#hide_paygrids', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).parents(".paygrids").toggleClass('animate');
                        $('.payCover').remove();
                        $.session.set('payLength', 0);
                        lens = 0;
                        pay_value = [];
                        $(".payUl li").removeClass("active").removeAttr("data-num").empty();
                    });
                }
            }
            _.init();
        });
    }
    /* 拖动 整个document或div层
     $(document.body).pullToRefresh().on("pull-to-refresh", function(){
     //do something
     });
     */
    var PTR = function(el) {
        this.container = $(el);
        this.distance = 50;
        this.attachEvents();
        $(el).prepend('<div class="ui-pull-to-refresh-layer">\
			<div class="pull-to-refresh-arrow"></div>\
			<div class="pull-to-refresh-preloader"></div>\
			<div class="down">↓ 下拉刷新</div>\
			<div class="up">↑ 释放刷新</div>\
			<div class="refresh"><img src="../static/images/loading.gif" width="18"> 正在刷新...</div>\
		</div>');
    }
    PTR.prototype.touchStart = function(e) {
        if($(document).scrollTop() == 0) {
            if(isshow(".closeModal")) return;
            if(this.container.hasClass("refreshing")) return;
            var p = $.getTouchPosition(e);
            this.start = p;
            this.diffX = this.diffY = 0;
        }
    };
    PTR.prototype.touchMove = function(e) {
        if($(document).scrollTop() == 0) {
            if(this.container.hasClass("refreshing")) return;
            if(!this.start) return false;
            if(this.container.scrollTop() > 0) return;
            var p = $.getTouchPosition(e);
            this.diffX = p.x - this.start.x;
            this.diffY = p.y - this.start.y;
            if(this.diffY < 0) return;
            this.container.addClass("touching");
            e.preventDefault();
            e.stopPropagation();
            this.diffY = Math.pow(this.diffY, 0.8);
            this.container.css("transform", "translate3d(0, " + this.diffY + "px, 0)");
            if(this.diffY < this.distance) {
                this.container.removeClass("pull-up").addClass("pull-down");
            } else {
                this.container.removeClass("pull-down").addClass("pull-up");
            }
        }
    };
    PTR.prototype.touchEnd = function() {
        if($(document).scrollTop() == 0) {
            this.start = false;
            if(this.diffY <= 0 || this.container.hasClass("refreshing")) return;
            this.container.removeClass("touching");
            this.container.removeClass("pull-down pull-up");
            this.container.css("transform", "");
            if(Math.abs(this.diffY) <= this.distance) {} else {
                this.container.addClass("refreshing");
                this.container.trigger("pull-to-refresh");
            }
        }
    };
    PTR.prototype.attachEvents = function() {
        var el = this.container;
        el.addClass("ui-pull-to-refresh");
        el.on($.touchEvents.start, $.proxy(this.touchStart, this));
        el.on($.touchEvents.move, $.proxy(this.touchMove, this));
        el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
    };
    var pullToRefresh = function(el) {
        new PTR(el);
    };
    var pullToRefreshDone = function(el) {
        remove('#detail-zhuandan .ui-pull-to-refresh-layer');
        $(el).removeClass('refreshing');
        pullToRefresh(el);
        $.session.set("isLastPage", false);
        $(document.body).infinite();
    }
    $.fn.pullToRefresh = function() {
        return this.each(function() {
            pullToRefresh(this);
        });
    }
    $.fn.pullToRefreshDone = function() {
        return this.each(function() {
            pullToRefreshDone(this);
        });
    }
    //拖动End
    /* 滚动到底部加载 整个document或div层
     $(document.body).infinite().on("infinite", function(){
     //do something
     });
     */
    $.fn.scrollHeight = function() {
        return this[0].scrollHeight;
    };
    var Infinite = function(el, distance) {
        this.container = $(el);
        this.container.data("infinite", this);
        this.distance = distance || 50;
        this.attachEvents();
    }
    Infinite.prototype.scroll = function() {
        var container = this.container;
        var offset = container.scrollHeight() - ($(window).height() + container.scrollTop()) - 100;
        if(offset <= this.distance) {
            container.trigger("infinite");
        }
    }
    Infinite.prototype.attachEvents = function(off) {
        var el = this.container;
        var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
        scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
    };
    Infinite.prototype.detachEvents = function(off) {
        this.attachEvents(true);
    }
    var infinite = function(el) {
        attachEvents(el);
    }
    $.fn.infinite = function(distance) {
        return this.each(function() {
            new Infinite(this, distance);
        });
    }
    $.fn.destroyInfinite = function() {
        return this.each(function() {
            var infinite = $(this).data("infinite");
            if(infinite && infinite.detachEvents) infinite.detachEvents();
        });
    }
    //滚动到底部加载End
    //滑动选择

    //End
})(jQuery);