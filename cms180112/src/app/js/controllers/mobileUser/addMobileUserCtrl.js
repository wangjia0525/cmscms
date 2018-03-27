

App
    .controller('addMobileUserCtrl', function($scope,$rootScope,$http,$stateParams,Notify,OtherFactory,ModalService,$cookieStore,MobileUserFactory,FieldFactory,$location,$timeout,mdFactory) {
        /* 为service写的回调方法，保证service回传的model可以传递给controller */
        var token = '';
        $scope.getIndustyListCallback = function(data){
            console.log(data)
            $scope.industyList =data.industyList;
            //$scope.JobPosition();
            $scope.field();
        };
        /*$scope.getJobPositionListCallback = function(data){
            $scope.jobPositionList 	   = data.jobPositionList;
            $scope.field();
        };*/
        $scope.realmListCallback = function (data) {
            $scope.realmList 	   = data.realmList;
            $scope.realmList_2 = angular.copy($scope.realmList );
        };
       /* $scope.getQiNiuUpTokenCallback = function (data) {
            token = data.token;
        };*/

        $scope.setAddAppUserCallback = function (data) {
            $scope.userId = data.userId;
            $scope.setInsertUserRealmInterface_1();
        };
        $scope.setInsertUserRealmCallback_1 = function () {
            $scope.setInsertUserRealmInterface_2();
        };
        $scope.setInsertUserRealmCallback_2 = function () {
            Notify.alert();
            $timeout(function(){
                $location.replace().path('/cms/mobileUserManage');
            },500);
        };

        $scope.regionSelectName = "工作地区";
        $scope.industrySelectName = "行业";
        //$scope.positionSelectName = "职位";
        $scope.sex = 1;

        $.ajax({
            type:"get",
            url:"data/region.json",
            async:false,
            success:function(data){
                $scope.regionTypes = data;
            }
        });

        $scope.Industy= function () {
            OtherFactory.getIndustyList(
                {},
                $scope.getIndustyListCallback
            );
        };
        $scope.Industy();

        /*$scope.JobPosition= function () {
            OtherFactory.getJobPositionList(
                {},
                $scope.getJobPositionListCallback
            );
        };*/

        $scope.field = function(){
            FieldFactory.getRealmList(
                {
                    size		:	1000,
                    page		:	1
                },
                $scope.realmListCallback
            );
        };

        /* 返回的领域列表匹配 */
        $scope.addRealmIds = function(_list_,arr){
            arr=[];
            for(var i=0;i<_list_.length;i++){
                if(_list_[i].fnChecked){
                    arr.push(_list_[i].realmId)
                }
            }
            return arr;
        };
        /* 上传的用户数据 */
        $scope.setPrams = function () {
            return {
                area	         :	$scope.regionSelectValue_2.code,
                //jobPositionId    :	$scope.positionSelectValue_2.jobPositionId,
                industyId	     :	$scope.industrySelectValue_2.industyId,
                positionName	 :  $scope.positionName,
                sex				 :  $scope.sex,
                phoneNo			 :  $scope.phoneNo,
                password		 :  mdFactory.setMd5($scope.password_1),
                imeetId			 :  $scope.imeetId,
                introduce		 :  $scope.introduce,
                realName		 :  $scope.name,
                companyName		 :  $scope.companyName
            }
        };

        /* 领域/影响力数据 */
        var realmIds_1 = [];
        var realmIds_2 = [];

        $scope.setPrams_1 = function () {
            return {
                userId     : $scope.userId,
                realmIds   : $scope.addRealmIds($scope.realmList,realmIds_1),
                type       : 1
            }
        };
        $scope.setPrams_2 = function () {
            return {
                userId     : $scope.userId,
                realmIds   : $scope.addRealmIds($scope.realmList_2,realmIds_2),
                type       : 2
            }
        };


        /* 返回数据 */
        $scope.setAddAppUserInterface = function () {
            MobileUserFactory.setAddAppUser(
                $scope.setPrams(),
                $scope.setAddAppUserCallback
            );
        };


        $scope.setInsertUserRealmInterface_1 = function () {
            MobileUserFactory.setInsertUserRealm(
                $scope.setPrams_1(),
                $scope.setInsertUserRealmCallback_1
            );
        };

        $scope.setInsertUserRealmInterface_2 = function () {
            MobileUserFactory.setInsertUserRealm(
                $scope.setPrams_2(),
                $scope.setInsertUserRealmCallback_2
            );
        };

        /* 返回数据入口/表单验证 */
        $scope.submitForm = function (isValid) {
            if (!isValid) {
                $scope.errorAlert = "错误信息";
                var templateUrl_1 = 'app/views/alert/error.html';
                ModalService.modalSet($scope,templateUrl_1);
            }else {
                $scope.successAlert = "提交信息";
                var templateUrl_2 = 'app/views/alert/success.html';
                ModalService.modalSet($scope,templateUrl_2);
                $scope.updateTrue = function () {
                    ModalService.modalHide();
                    $scope.setAddAppUserInterface()
                };
            }
        };
       /* $scope.getToken = function () {
            MobileUserFactory.getQiNiuUpToken(
                {
                    "userId":$scope.userId
                },
                $scope.getQiNiuUpTokenCallback
            )
        };*/
        /*var endpoint = "data/";
        var jsonpoint = ".json";

        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4', //上传模式,依次退化
            browse_button: 'pickfiles', //上传选择的点选按钮，**必需**
            /!* uptoken_url: '/token',*!/
            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            uptoken_func: function() {
                var res = $.ajax({
                    type: "get",
                    url: endpoint + "getQiNiuUpToken" + jsonpoint,
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
            /!* 为了动态的取domain自己写的一个方法！ *!/
            domain_func: function() {
                var res = $.ajax({
                    type: "get",
                    url: endpoint + "getQiNiuUpToken" + jsonpoint,
                    async: false
                });
                return res.responseJSON.host;
            },
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
                'FilesAdded': function(up, files) {

                    plupload.each(files, function(file) {
                        // 预览 图片
                        (function() {
                            previewImage(file, function(imgsrc) {
                               $("#headImgUrl").attr("src",imgsrc);
                            })
                        })();

                        function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
                            if (!file || !/image\//.test(file.type)) return; //确保文件是图片
                            if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
                                var fr = new mOxie.FileReader();
                                fr.onload = function() {
                                    callback(fr.result);
                                    fr.destroy();
                                    fr = null;
                                };
                                fr.readAsDataURL(file.getSource());
                            } else {
                                var preloader = new mOxie.Image();
                                preloader.onload = function() {
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
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情

                },
                'FileUploaded': function(up, file, info) {

                    //  }
                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                    // var domain = up.getOption('domain');
                    // var res = parseJSON(info);
                    // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                },
                'Error': function(up, err, errTip) {
                    var $progressNumed = $(".progressNum .progressNumed").eq(0);
                    $progressNumed.html( $progressNumed.html()-0+1 );
                    //上传出错时,处理相关的事情
                    console.log(up);
                    console.log(err);
                    console.log(errTip);
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后,处理相关的事情
                    console.log("队列处理完毕！");
                },
                'Key': function(up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    //var key = "";
                    // do something with key here
                    //return key
                }
            }
        });*/
    });