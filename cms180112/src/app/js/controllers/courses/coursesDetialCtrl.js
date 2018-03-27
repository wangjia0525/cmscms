App
    .controller('coursesDetailCtrl', function ($scope, $rootScope, $http, $stateParams, Notify, ModalService, $timeout, $location, FieldFactory, $cookieStore, MobileUserFactory, ContestFactory, mdFactory, CoursesFactory) {

        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.getLessonListCallback = function (data) {
            console.log(data);
            $scope.loading = false;
            $scope.lessonList = data.result;
            /* 绑定七牛 */
            $timeout(
                function () {
                    for (var i = 0; i < $scope.lessonList.length; i++) {
                        var item = $scope.lessonList[i];
                        $scope.updateMp3(item.lessonId, "a" + item.lessonId, "b" + item.lessonId, "c" + item.lessonId)
                    }
                }, 20
            )
        };

        ///********************************************/
        $scope.courseClassificationSelectName='课程分类';
        $scope.classLabelSelectName='课程标签';
        $scope.signSelectName='上新标识';
        //课程分类
        $scope.courseClassificationType = [
            //{_index_: -1, _value_: "课程分类"},
            {_index_: 1, _value_: "微课"},
            {_index_: 2, _value_: "精品课"},
            {_index_: 3, _value_: "系统课"}
        ];
        $scope.realmListCallback = function (data) {
            $scope.realmList = data.realmList;
            console.log(data)
        };
        /* 获取领域列表 */
        $scope.field = function () {
            FieldFactory.getRealmList(
                {
                    size: 1000,
                    page: 1
                },
                $scope.realmListCallback
            );
        };
        $scope.field();
        //$scope.courseClassificationSelectValue = $scope.courseClassificationType[0];
        //课程标签
        //$scope.classLabelType = [
        //    //{_index_: -1, _value_: "课程标签"},
        //    {_index_: 1, _value_: "消费者画像"},
        //    {_index_: 2, _value_: "引爆营销"},
        //    {_index_: 3, _value_: "品牌突围"},
        //    {_index_: 4, _value_: "渠道开拓"},
        //    {_index_: 5, _value_: "开启新零售"},
        //    {_index_: 6, _value_: "销量破局"}
        //];
        //$scope.classLabelSelectValue = $scope.classLabelType[0];
        //上新标识
        $scope.signType = [
            //{_index_: -1, _value_: "上新标识"},
            {_index_: 0, _value_: "无"},
            {_index_: 1, _value_: "有"}
        ];
        //计费方式
        $scope.billingWayType=[
            {_index_: 1, _value_: "会员领取和单独购买计费"},
            {_index_: 2, _value_: "单独购买计费"},
            {_index_: 3, _value_: "都不计费"}
        ]
        //$scope.signSelectValue = $scope.signType[0];
        ///********************************************/
        $scope.getMobileUserListCallback = function (data) {
            console.log(data)
            if(data.userList.length != 0) {
                $scope.product.user.name = data.userList[0].user.name;
                $scope.product.userId = data.userList[0].user.userId;
            }else {
                $scope.product.user.name = "";
                $scope.product.userId = "";
            }
        };

        $scope.getCourseCallback = function (data) {
            console.log(data)
            $scope.product = data.result;
            //console.log( $scope.product,$scope.product.subject,$scope.product.classLabelOne,$scope.product.isNew)
            $scope.courseClassificationSelectValue = $scope.product.subject;
            $scope.realmListSelectValue =$scope.product.classLabelOne;
            $scope.signSelectValue = $scope.product.isNew;
            $scope.billingWaySelectValue = $scope.product.billingWay;//计费方式
            $scope.updateTitleImg($scope.product.productId);
            $scope.updateContImg($scope.product.productId);
            $scope.getClassList()
        };

        $scope.updateCourseCallback = function () {
            Notify.alert()
        };

        $scope.insertLessonCallback = function (data) {
            $scope.lessonList.push({
                disa: true,
                lessonId: data.lessonId,
                title: "标题",
                isPublic: 2,
                sequence: $scope.lessonList.length + 1
            });
            /* 绑定七牛 */
            $timeout(
                function () {
                    var item = $scope.lessonList[$scope.lessonList.length - 1];
                    $scope.updateMp3(item.lessonId, "a" + item.lessonId, "b" + item.lessonId)
                }, 1000
            )
        };

        $scope.updateLessonCallback = function () {
            Notify.alert()
        };

        $scope.params = $stateParams;
        //console.log($scope.params)
        /* 获取课程详情 */
        $scope.fetchData = function () {
            CoursesFactory.getCourse(
                $scope.params,
                $scope.getCourseCallback
            )
        };
        $scope.fetchData();
        /* 获取课时列表 */
        $scope.getClassList = function () {
            $scope.loading = true;
            CoursesFactory.getLessonList(
                $scope.params,
                $scope.getLessonListCallback
            )
        };
        /* 修改课程 */
        $scope.modifyContest = function () {
            CoursesFactory.updateCourse(
                {
                    "subject":$scope.courseClassificationSelectValue, //课程分类
                    "classLabelOne":$scope.realmListSelectValue,//课程标签classLabelTwo
                    "isNew":$scope.signSelectValue,//上新标识
                    "billingWay":$scope.billingWaySelectValue,//计费方式
                    "productId": $scope.product.productId,
                    "name": $scope.product.name,
                    "userId": $scope.product.userId,
                    "label": $scope.product.label,
                    "digest": $scope.product.digest,
                    "synopsis": $scope.product.synopsis,
                    "authorInfo": $scope.product.authorInfo,
                    "price": $scope.product.price,
                    "basisData": $scope.product.basisData,
                    "status": $scope.product.status,
                    "updstatus": $scope.product.updstatus,//新增是否完结状态
                    "targeTusers": $scope.product.targeTusers
                },
                $scope.updateCourseCallback
            )
        };
        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            } else {
                $scope.alterTitle = "确认操作";
                $scope.alertInformation = "确认要修改该课程么?";
                var alertHtml = 'app/views/alert/alert.html';
                ModalService.modalSet($scope, alertHtml);
                $scope.doTrue = function () {
                    ModalService.modalHide();
                    $scope.modifyContest();
                }

            }
        };

        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey: $scope.product.user.phoneNo,
                    page: 1,
                    size: 1
                },
                $scope.getMobileUserListCallback
            )
        };
        $scope.userChange = function () {
            if($scope.product.user.phoneNo.length == 11) {
                $scope.getUserList();
            }
        };

        /* 添加课时 */
        $scope.addLesson = function () {
            CoursesFactory.insertLesson(
                {
                    "productId": $scope.product.productId,
                    "title": "",
                    "isPublic": 2,
                    "sequence": $scope.lessonList.length + 1
                },
                $scope.insertLessonCallback
            )
        };

        /* 删除课时 */
        $scope.removeLesson = function (_id_, _index_) {
            //删除课程时
            $scope.modal_title_with_btn="<i class='icon-warning-sign' ></i> 课程删除确认！";
            $scope.modal_content_with_btn="确认删除这个课程？";
            var  templateUrl='app/js/directives/modal/modal_btn.html';
            ModalService.modalSet($scope,templateUrl);
            $scope.sure=function () {
                CoursesFactory.delLesson(
                    {
                        lessonId: _id_
                    },
                    function () {
                        Notify.alert();
                        $scope.lessonList.splice(_index_, 1)
                    }
                )
                ModalService.modalHide();
            };
        };

        /* 编辑课时 */
        $scope.saveLesson = function (_id_, _title_, _isPublic_,_online_) {
            CoursesFactory.updateLesson(
                {
                    productId: $scope.product.productId,
                    lessonId: _id_,
                    title: _title_,
                    isPublic: _isPublic_,
                    online:_online_
                },
                $scope.updateLessonCallback
            )
        };
        /* 编辑课时 针对上线。*/
        $scope.updLesson = function (_id_, _title_, _isPublic_,_online_) {
            //编辑课时
            $scope.modal_title_with_btn="<i class='icon-warning-sign' ></i> 上线状态确认！";
            $scope.modal_content_with_btn="确认修改上线状态？勾选后会重新通知用户！！！";
            var  templateUrl='app/js/directives/modal/modal_btn.html';
            ModalService.modalSet($scope,templateUrl);
            $scope.sure=function () {
                CoursesFactory.updateLesson(
                    {
                        productId: $scope.product.productId,
                        lessonId: _id_,
                        title: _title_,
                        isPublic: _isPublic_,
                        online:_online_
                    },
                    $scope.updateLessonCallback
                )
                ModalService.modalHide();
            };

        };
        /* 课程排序 */
        $scope.fnSort = function (id, type, index,productId) {
            CoursesFactory.updateLessonOrder(
                {
                    lessonId: id,
                    type: type,
                    productId:productId
                },
                function () {
                    if (type == 1) {
                        $scope.lessonList.splice(index - 1, 0, $scope.lessonList[index]);
                        $scope.lessonList.splice(index + 1, 1);
                    } else {
                        $scope.lessonList.splice(index + 2, 0, $scope.lessonList[index]);
                        $scope.lessonList.splice(index, 1);
                        //$scope.lessonList.splice(index-1,1);
                    }
                    Notify.alert()
                }
            )
        };
        $scope.updateLessonOrderTopCallback = function () {
            Notify.alert();
            $scope.fetchData();
        };
        /* 置顶 */
        $scope.fnToTop = function (lessonId,productId) {
            CoursesFactory.updateLessonOrderTop(
                {
                    lessonId:lessonId,
                    productId:productId
                },
                $scope.updateLessonOrderTopCallback
            );
        };
        $scope.updateTitleImg = function (_id_) {
            //var endpoint = "data/";
            //var jsonpoint = ".json";
            var endpoint = "/ixinghui/cms/";
            var jsonpoint = "";
            var $token = $rootScope.$session.getItem('token');
            var $userId = $rootScope.$session.getItem('cmsuserId');
            var $sectionId = $rootScope.$session.getItem('sectionId');
            var _time = Date.parse(new Date());
            var Qiniu1 = new QiniuJsSDK();
            var uploader1 = Qiniu1.uploader({
                runtimes: 'html5,flash,html4', //上传模式,依次退化
                browse_button: 'titleBtn', //上传选择的点选按钮，**必需**
                /* uptoken_url: '/token',*/
                //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                uptoken_func: function () {
                    var res = $.ajax({
                        type: "get",
                        data: {
                            "token": $token,
                            "type": 1,
                            "productId": _id_,
                            "cmsuserId": $userId,
                            "sectionId": $sectionId,
                            "_time": _time
                        },
                        url: endpoint + "course/getImageToken" + jsonpoint,
                        async: false
                    });
                    return res.responseJSON.token;
                },
                get_new_uptoken: true, //获取新token
                //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                // unique_names: true,
                // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                save_key: true,
                // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                /* 为了动态的取domain自己写的一个方法！ */
                domain_func: function () {
                    return '';
                },
                multi_selection: false,
                //bucket 域名，下载资源时用到，**必需**
                //container: 'uploadWrap', //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb', //最大文件体积限制
                flash_swf_url: 'app/js/qiniu/Moxie.swf', //引入flash,相对路径
                max_retries: 0, //上传失败最大重试次数
                dragdrop: false, //开启可拖曳上传
                drop_element: 'pictrue_preview_box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', //分块上传时，每片的体积
                auto_start: true,
                //views: {
                //	list: true,
                //	thumbs: true, // Show thumbs
                //	active: 'thumbs'
                //},
                //resize: {
                //	width: 200,
                //	height: 200,
                //	quality: 90,
                //	crop: true // crop to exact dimensions
                //},
                //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            // 预览 图片
                            (function () {
                                previewImage(file, function (imgsrc) {
                                    $("#titleImg").attr("src", imgsrc);
                                })
                            })();

                            function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
                                if (!file || !/image\//.test(file.type)) return; //确保文件是图片
                                if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
                                    var fr = new mOxie.FileReader();
                                    fr.onload = function () {
                                        callback(fr.result);
                                        fr.destroy();
                                        fr = null;
                                    };
                                    fr.readAsDataURL(file.getSource());
                                } else {
                                    var preloader = new mOxie.Image();
                                    preloader.onload = function () {
                                        preloader.downsize(300, 300); //先压缩一下要预览的图片,宽300，高300
                                        var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                                        callback && callback(imgsrc); //callback传入的参数为预览图片的url
                                        preloader.destroy();
                                        preloader = null;
                                    };
                                    preloader.load(file.getSource());
                                }
                            }
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时,处理相关的事情

                    },
                    'FileUploaded': function (up, file, info) {
                        Notify.alert();
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                        Notify.alert(
                            '<i class="fa fa-times fa-2"></i>封面图片上传失败请重新上传', {
                                status: 'danger'
                            }
                        );
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function (up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效
                        //var key = "";
                        // do something with key here
                        //return key
                    }
                }
            });
        };

        $scope.updateContImg = function (_id_) {
            //var endpoint = "data/";
            //var jsonpoint = ".json";
            var endpoint = "/ixinghui/cms/";
            var jsonpoint = "";
            var $token = $rootScope.$session.getItem('token');
            var $userId = $rootScope.$session.getItem('cmsuserId');
            var $sectionId = $rootScope.$session.getItem('sectionId');
            var _time = Date.parse(new Date());
            var Qiniu2 = new QiniuJsSDK();
            var uploader2 = Qiniu2.uploader({
                runtimes: 'html5,flash,html4', //上传模式,依次退化
                browse_button: 'contBtn', //上传选择的点选按钮，**必需**
                /* uptoken_url: '/token',*/
                //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                uptoken_func: function () {
                    var res = $.ajax({
                        type: "get",
                        data: {
                            "token": $token,
                            "type": 2,
                            "productId": _id_,
                            "cmsuserId": $userId,
                            "sectionId": $sectionId,
                            "_time": _time
                        },
                        url: endpoint + "course/getImageToken" + jsonpoint,
                        async: false
                    });
                    return res.responseJSON.token;
                },
                get_new_uptoken: true, //获取新token
                //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                // unique_names: true,
                // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                save_key: true,
                // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                /* 为了动态的取domain自己写的一个方法！ */
                domain_func: function () {
                    return '';
                },
                multi_selection: false,
                //bucket 域名，下载资源时用到，**必需**
                //container: 'uploadWrap', //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb', //最大文件体积限制
                flash_swf_url: 'app/js/qiniu/Moxie.swf', //引入flash,相对路径
                max_retries: 0, //上传失败最大重试次数
                dragdrop: false, //开启可拖曳上传
                drop_element: 'pictrue_preview_box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', //分块上传时，每片的体积
                auto_start: true,
                //views: {
                //	list: true,
                //	thumbs: true, // Show thumbs
                //	active: 'thumbs'
                //},
                //resize: {
                //	width: 200,
                //	height: 200,
                //	quality: 90,
                //	crop: true // crop to exact dimensions
                //},
                //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {

                        plupload.each(files, function (file) {
                            // 预览 图片
                            (function () {
                                previewImage(file, function (imgsrc) {
                                    $("#contImg").attr("src", imgsrc);
                                })
                            })();

                            function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
                                if (!file || !/image\//.test(file.type)) return; //确保文件是图片
                                if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
                                    var fr = new mOxie.FileReader();
                                    fr.onload = function () {
                                        callback(fr.result);
                                        fr.destroy();
                                        fr = null;
                                    };
                                    fr.readAsDataURL(file.getSource());
                                } else {
                                    var preloader = new mOxie.Image();
                                    preloader.onload = function () {
                                        preloader.downsize(300, 300); //先压缩一下要预览的图片,宽300，高300
                                        var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                                        callback && callback(imgsrc); //callback传入的参数为预览图片的url
                                        preloader.destroy();
                                        preloader = null;
                                    };
                                    preloader.load(file.getSource());
                                }
                            }
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时,处理相关的事情

                    },
                    'FileUploaded': function (up, file, info) {
                        Notify.alert();
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                        Notify.alert(
                            '<i class="fa fa-times fa-2"></i>配图上传失败请重新上传', {
                                status: 'danger'
                            }
                        );
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function (up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效
                        //var key = "";
                        // do something with key here
                        //return key
                    }
                }
            });
        };


        $scope.updateMp3 = function (_id_, _btn_, _space_, _suc_) {
            //var endpoint = "data/";
            //var jsonpoint = ".json";
            var endpoint = "/ixinghui/cms/";
            var jsonpoint = "";
            var $token = $rootScope.$session.getItem('token');
            var $userId = $rootScope.$session.getItem('cmsuserId');
            var $sectionId = $rootScope.$session.getItem('sectionId');
            var name = "";
            var _time = Date.parse(new Date());
            var Qiniu = new QiniuJsSDK();
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4', //上传模式,依次退化
                browse_button: _btn_, //上传选择的点选按钮，**必需**
                /* uptoken_url: '/token',*/
                //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                uptoken_func: function () {
                    var res = $.ajax({
                        type: "get",
                        data: {
                            "token": $token,
                            "lessonId": _id_,
                            "cmsuserId": $userId,
                            "sectionId": $sectionId,
                            "_time": _time,
                            "audioName": name
                        },
                        url: endpoint + "course/getmp3Token" + jsonpoint,
                        async: false
                    });
                    return res.responseJSON.token;
                },
                get_new_uptoken: true, //获取新token
                //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                // unique_names: true,
                // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                save_key: true,
                // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                /* 为了动态的取domain自己写的一个方法！ */
                domain_func: function () {
                    return '';
                },
                multi_selection: false,
                filters: {
                    mime_types: [
                        {title: "Audio files", extensions: "mp3,wav,aac"}
                    ]
                },
                //bucket 域名，下载资源时用到，**必需**
                //container: 'uploadWrap', //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb', //最大文件体积限制
                flash_swf_url: 'app/js/qiniu/Moxie.swf', //引入flash,相对路径
                max_retries: 0, //上传失败最大重试次数
                dragdrop: false, //开启可拖曳上传
                drop_element: 'pictrue_preview_box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', //分块上传时，每片的体积
                auto_start: false,
                //views: {
                //	list: true,
                //	thumbs: true, // Show thumbs
                //	active: 'thumbs'
                //},
                //resize: {
                //	width: 200,
                //	height: 200,
                //	quality: 90,
                //	crop: true // crop to exact dimensions
                //},
                //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            $("#" + _btn_).next().html(file.name);
                            name = file.name
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时,处理相关的事情
                        console.log(file)
                        $("#" + _suc_).html("上传中");
                        $("#" + _space_).next().html(file.percent+'%');
                    },
                    'FileUploaded': function (up, file, info) {
                        Notify.alert();
                        $("#" + _suc_).html("上传成功");
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                        $("#" + _suc_).html("上传失败");
                        Notify.alert(
                            '<i class="fa fa-times fa-2"></i>音频上传失败请重新上传', {
                                status: 'danger'
                            }
                        );
                        console.log(err)
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function (up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效
                        //var key = "";
                        // do something with key here
                        //return key
                    }
                }
            });
            $("#" + _space_).on("click", function () {
                uploader.start()
            })
        };
    });