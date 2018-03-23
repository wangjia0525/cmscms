App
    .controller('addTopicCtrl', function ($scope, $rootScope, $http, $stateParams, Notify, ModalService, $timeout, $location, FieldFactory, $cookieStore, MobileUserFactory, TopicFactory, mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */

        $scope.realmListCallback = function (data) {
            $scope.realmList = data.realmList;
            $scope.isAnonymous = 2;
        };

        $scope.setAddTopicCallback = function (data) {
            /*Notify.alert();
             $timeout(function(){
             $location.replace().path('/cms/topicList');
             },500);*/
            $scope.topicId = data.topicId;
            $scope.updateHeadImg($scope.appUserId,$scope.topicId)
        };

        $scope.getMobileUserListCallback = function (data) {
            $scope.userList = data.userList;
        };


        /* board title set */
        $scope.imgList = [];
        $scope.btnshowhide = true;
        $scope.btnType = "上传图片";
        var uploader = "";

        /* 参数对象  */
        $scope.getParams = function () {
            return {
                realmIds: $scope.addRealmIds(),
                isAnonymous: $scope.changeType($scope.isAnonymous),
                content: $scope.content,
                title: $scope.title,
                appUserId: $scope.appUserId
            };
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


        /* 返回的领域列表匹配 */
        $scope.addRealmIds = function () {
            var realmIds = [];
            for (var i = 0; i < $scope.realmList.length; i++) {
                if ($scope.realmList[i].fnChecked) {
                    realmIds.push($scope.realmList[i].realmId)
                }
            }
            return realmIds;
        };

        $scope.changeType = function (_type_) {
            if (_type_ == 1) {
                return false
            } else {
                return true
            }
        };


        $scope.addTopic = function () {
            console.log($scope.getParams());
            TopicFactory.setAddTopic(
                $scope.getParams(),
                $scope.setAddTopicCallback
            )
        };
        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope, templateUrl_1);
            } else {
                $scope.successAlert = "点击''确定''话题便已创建，并可上传图片";
                var templateUrl_2 = 'app/views/alert/success.html';
                ModalService.modalSet($scope, templateUrl_2);
                $scope.updateTrue = function () {
                    ModalService.modalHide();
                    $scope.addTopic();
                };
            }
        };

        /* user list */
        $scope.getUserList = function () {
            MobileUserFactory.getMobileUserList(
                {
                    searchKey: $scope.name,
                    page: 1,
                    size: 5
                },
                $scope.getMobileUserListCallback
            )
        };
        $scope.userChange = function () {
            $scope.getUserList();
        };
        $scope.changeName = function (_name_, _id_) {
            $scope.name = _name_;
            $scope.appUserId = _id_

        };
        $scope.hideUl = function () {
            $timeout(function () {
                $scope.userType = false
            }, 300);
        };

        $scope.updateHeadImg = function (_appUserId_,_topicId_) {
            /*$scope.saveImg = function () {
             uploader.start()
             };*/
            function canUpdate() {
                if($scope.imgList.length>0){
                    $scope.btnshowhide1 = false
                }else{
                    $scope.btnshowhide1 = true
                }
            }
            canUpdate();
//            var endpoint = "data/";
//            var jsonpoint = ".json";
            var endpoint = "/ixinghui/cms/";
            var jsonpoint = "";
            var $token = $rootScope.$session.getItem('token');
            var $userId = $rootScope.$session.getItem('cmsuserId');
            var $sectionId = $rootScope.$session.getItem('sectionId');
            var _time = Date.parse(new Date());
            uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4', //上传模式,依次退化
                browse_button: 'updateImgs', //上传选择的点选按钮，**必需**
                /* uptoken_url: '/token',*/
                //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                uptoken_func: function () {
                    var res = $.ajax({
                        type: "get",
                        data: {
                            "appUserId": _appUserId_,
                            "topicId": _topicId_,
                            "token": $token,
                            "cmsuserId": $userId,
                            "sectionId": $sectionId,
                            "_time": _time
                        },
                        url: endpoint + "getTopicQiNiuUpToken" + jsonpoint,
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
                filters: {
                    max_file_size: '10mb',
                    prevent_duplicates: false,
                    // Specify what files to browse for
                    mime_types: [
                        {title: "Image files", extensions: "jpg,gif,png,jpeg,jpe,tiff,tif,bmp"} // 限定jpg,gif,png后缀上传
                    ]
                },
                multi_selection: true,
                //bucket 域名，下载资源时用到，**必需**
                //container: 'uploadWrap', //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '10mb', //最大文件体积限制
                flash_swf_url: 'app/js/qiniu/Moxie.swf', //引入flash,相对路径
                max_retries: 0, //上传失败最大重试次数
                dragdrop: false, //开启可拖曳上传
                drop_element: 'pictrue_preview_box', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '0mb', //分块上传时，每片的体积
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
                        if($scope.imgList.length+files.length>30){
                            //alert("图片总数不能超过30张");
                            //files.splice(newList-30+oldList,newList-30+oldList);
                            up.removeFile(files);
                            return
                        }
                        if($scope.imgList.length+files.length==30){
                            $scope.btnshowhide = false;
                            $scope.$apply();
                        }
                        plupload.each(files, function (file) {
                            // 预览 图片
                            (function () {
                                previewImage(file, function (imgsrc) {
                                    $scope.imgList.push({id: file.id, src: imgsrc,x:true,wrap:true,info:"等待上传"});
                                    $scope.deleteImg = function (index) {
                                        up.files.splice(index, 1);
                                        $scope.imgList.splice(index, 1);
                                        canUpdate()
                                    };
                                    canUpdate();
                                    $scope.$apply();
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
                    'QueueChanged':function (data) {
                        var oldList = $scope.imgList.length;
                        var newList = data.files.length;
                        if(oldList+newList>31) {
                            data.files.splice(oldList, newList);
                            console.log(data.files)
                        }
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前,处理相关的事情
                        /* 改变子元素状态 */
                        for(var i=0;i<$scope.imgList.length;i++){
                            $scope.imgList[i].x=false;
                            if($scope.imgList[i].id==file.id){
                                $scope.imgList[i].info="上传中";
                            }
                            $scope.$apply();
                        }
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时,处理相关的事情
                        $scope.btnshowhide = false;
                        $scope.btnType = "图片上传中";
                        $scope.$apply();
                    },
                    'FileUploaded': function (up, file, info) {
                        /* 改变子元素状态 */
                        for(var i=0;i<$scope.imgList.length;i++){
                            if($scope.imgList[i].id==file.id){
                                $scope.imgList[i].x=false;
                                $scope.imgList[i].wrap=false;
                                $scope.imgList[i].info="上传成功";
                            }
                            $scope.$apply();
                        }

                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                        /*Notify.alert(
                            '<i class="fa fa-times fa-2"></i>上传失败请重新上传', {
                                status: 'danger'
                            }
                        );*/
                        for(var i=0;i<$scope.imgList.length;i++){
                            if($scope.imgList[i].id==err.file.id){
                                $scope.imgList[i].info="上传失败";
                            }
                        }
                        $scope.$apply();
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                        $scope.btnType = "图片上传完成";
                        $scope.btnshowhide1 = true;
                        $scope.$apply();
                        Notify.alert();
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
        $("#btnOnOff").on("click", function () {
            uploader.start()
        });

    });