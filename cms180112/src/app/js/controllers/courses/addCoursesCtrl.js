App
    .controller('addCoursesCtrl', function ($scope, $rootScope, $http, $stateParams, Notify,FieldFactory, ModalService, $timeout, $location, FieldFactory, $cookieStore, MobileUserFactory, ContestFactory, mdFactory, CoursesFactory) {
        var su1 =false;
        var su2 =false;
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        $scope.insertcourseCallback = function (data) {
            $scope.productId = data.productId;
            $scope.doNext= true;
            $scope.updateTitleImg(data.productId);
            $scope.updateContImg(data.productId);
        };

        $scope.getMobileUserListCallback = function (data) {
            if(data.userList.length != 0){
                $scope.product.userName = data.userList[0].user.name;
                $scope.product.userId = data.userList[0].user.userId;
            }else {
                $scope.product.userName = "";
                $scope.product.userId = "";
            }
        };
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
        ///* 返回的领域列表匹配 */
        //$scope.addRealmIds = function () {
        //    var realmIds = '';
        //    for (var i = 0; i < $scope.realmList.length; i++) {
        //        if ($scope.realmList[i].fnChecked) {
        //            realmIds+=$scope.realmList[i].realmId +",";
        //        }
        //    }
        //    return realmIds.substring(0,realmIds.length-1);
        //};
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
        $scope.billingWaySelectValue = $scope.billingWayType[0];
        /* 参数对象  */
        $scope.getParams=function(){
            return{
                "subject":$scope.courseClassificationSelectValue._index_, //课程分类
                "classLabelOne":$scope.realmListSelectValue.realmId,//课程标签classLabelTwo
                "isNew":$scope.signSelectValue._index_,//上新标识
                "billingWay":$scope.billingWaySelectValue._index_,//上新标识
                "name": $scope.product.name,
                "userId": $scope.product.userId,
                "label": $scope.product.label,
                "digest": $scope.product.digest,
                "synopsis": $scope.product.synopsis,
                "authorInfo": $scope.product.authorInfo,
                "price": $scope.product.price,
                "basisData":  $scope.product.basisData,
                "status":  $scope.product.status,
                "updstatus":  $scope.product.updstatus,
                "targeTusers":$scope.product.targeTusers
            }
        }
        $scope.addContest = function () {
            console.log($scope.getParams())
            //return;
            CoursesFactory.insertcourse(
                $scope.getParams(),
                $scope.insertcourseCallback
            )
        };
        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            } else {
                $scope.addContest();
            }
        };

        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey: $scope.product.phone,
                    page: 1,
                    size: 1
                },
                $scope.getMobileUserListCallback
            )
        };
        $scope.userChange = function () {
            //console.log($scope.product.phone)
            if($scope.product.phone){
                if($scope.product.phone.length == 11){
                    $scope.getUserList();
                }
            }

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
                        su1 = true ;
                        if(su1&&su2){
                            Notify.alert();
                            $timeout(function(){
                                $location.replace().path('/cms/coursesDetial/'+_id_);
                            },1000);
                        }
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
            /* 上传图片 */
            $scope.createCoursesTitle = function(){
                uploader1.start();
            };
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
                        su2 = true ;
                        if(su1&&su2){
                            Notify.alert();
                            $timeout(function(){
                                $location.replace().path('/cms/coursesDetial/'+_id_);
                            },1000);
                        }
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
            /* 上传图片 */
            $scope.createCoursesCont = function(){
                uploader2.start();
            };
        };

    });