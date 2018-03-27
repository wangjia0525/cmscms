'use strict';
App
.service('SessionService', ['DataService','$location','$rootScope','Notify', function (DataService,$location,$rootScope,Notify) {

		var SessionService = {
			defaultSuccessHandler : function(data,header,config,status,callback){

				if(data.err.code == -100){
					$location.replace().path("/page/login");
				}else if(data.err.code == 0){
					return callback(data);
				}else {
					Notify.alert(
						'<i class="fa fa-times fa-2"></i> ['+data.err.code+'] : '+data.err.msg, {
							status 	: 'danger'
						}
					);
				}
			},
			defaultFailHandler : function(data,header,config,status,failCallback){
				if (failCallback != undefined){
					return failCallback(status);
				}else if( header == 404) {
						Notify.alert(
							'<i class="fa fa-times fa-2"></i> [404] : '+'所请求页面不存在！', {
								status 	: 'danger'
							}
						);
					/*$location.replace().path("/404page");*/
				}else if( header == 500){
					Notify.alert(
						'<i class="fa fa-times fa-2"></i> [500] : '+'服务器错误！', {
							status 	: 'danger'
						}
					);
					/*$location.replace().path("/500page");*/
				}
			},
			requestGet : function(url,params, callback, failCallback) {
				
				if (url != "login") {
					var $token = $rootScope.$session.getItem('token');
					var $userId = $rootScope.$session.getItem('cmsuserId');
					var $sectionId = $rootScope.$session.getItem('sectionId');
					var _time = Date.parse(new Date());
					if(typeof($token)!="undefined"){
						params.token = $token;
						params.cmsuserId = $userId;
					}
					if(!params.sectionId){
						params.sectionId = $sectionId;
					}
					params._time = _time;
				}
				return DataService.get(url,params)
				.success(function (data,header,config,status){
					return SessionService.defaultSuccessHandler(data,header,config,status,callback);
				}).error(function (data,header,config,status){
					return SessionService.defaultFailHandler(data,header,config,status,failCallback);
				});
			},
			requestPost : function(url,datas,callback, failCallback) {
				if (url != "login") {
					var $token = $rootScope.$session.getItem('token');
					var $userId = $rootScope.$session.getItem('cmsuserId');
					var $sectionId = $rootScope.$session.getItem('sectionId');
					var _time = Date.parse(new Date());
					if(typeof($token)!="undefined"){
						datas.token = $token;
						datas.cmsuserId = $userId;
					}
					if(!datas.sectionId){
						datas.sectionId = $sectionId;
					}
					datas._time = _time;
				}
				return DataService.post(url,datas)
				.success(function (data,header,config,status){
					return SessionService.defaultSuccessHandler(data,header,config,status,callback);
				}).error(function (data,header,config,status){
					return SessionService.defaultFailHandler(data,header,config,status,failCallback);
				});
			},
			requestUpload : function(url,params,callback, failCallback) {
				if (url != "login") {
					var $token = $rootScope.$session.getItem('token');
					var $userId = $rootScope.$session.getItem('cmsuserId');
					var $sectionId = $rootScope.$session.getItem('sectionId');
					var _time = Date.parse(new Date());
					if(typeof($token)!="undefined"){
						params.token = $token;
						params.cmsuserId = $userId;
					}
					if(!params.sectionId){
						params.sectionId = $sectionId;
					}
					params._time = _time;
				}
				return DataService.upload(url,params)
				.success(function (data,header,config,status){
					return SessionService.defaultSuccessHandler(data,header,config,status,callback);
				}).error(function (data,header,config,status){
					return SessionService.defaultFailHandler(data,header,config,status,failCallback);
				});
			},
			requestPostQ : function(url,datas,callback, failCallback) {
				if (url != "login") {
					var $token = $rootScope.$session.getItem('token');
					var $userId = $rootScope.$session.getItem('cmsuserId');
					var $sectionId = $rootScope.$session.getItem('sectionId');
					var _time = Date.parse(new Date());
					if(typeof($token)!="undefined"){
						datas.token = $token;
						datas.cmsuserId = $userId;
					}
					if(!datas.sectionId){
						datas.sectionId = $sectionId;
					}
					datas._time = _time;
				}
				return DataService.postQ(url,datas)
					.success(function (data,header,config,status){
						return SessionService.defaultSuccessHandler(data,header,config,status,callback);
					}).error(function (data,header,config,status){
						return SessionService.defaultFailHandler(data,header,config,status,failCallback);
					});
			},
			requestPostD : function(url,datas,callback, failCallback) {
                if (url != "login") {
                    var $token = $rootScope.$session.getItem('token');
                    var $userId = $rootScope.$session.getItem('cmsuserId');
                    var $sectionId = $rootScope.$session.getItem('sectionId');
                    var _time = Date.parse(new Date());
                    if(typeof($token)!="undefined"){
                        datas.token = $token;
                        datas.cmsuserId = $userId;
                    }
                    if(!datas.sectionId){
                        datas.sectionId = $sectionId;
                    }
                    datas._time = _time;
                }
                return DataService.postD(url,{
                    _time : _time,
                    token : $token,
                    cmsuserId : $userId,
                    sectionId : $sectionId
                },datas)
                    .success(function (data,header,config,status){
                        return SessionService.defaultSuccessHandler(data,header,config,status,callback);
                    }).error(function (data,header,config,status){
                        return SessionService.defaultFailHandler(data,header,config,status,failCallback);
                    });
            }
		};
		return SessionService;
	}]);
