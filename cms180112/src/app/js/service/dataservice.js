'use strict';
App
.service('DataService', ['$http','Upload', function ($http,Upload) {
		var DataService = {
    		endpoint: '/ixinghui/cms/',
			jsonpoint: '',
//			endpoint: 'data/',
//			jsonpoint: '.json',
			request: function (path, method, params, datas) {
				var defaults;
				defaults = {
					method	: method,
					url		: this.endpoint + path + this.jsonpoint,
					cache	: false,
					data	: datas,
					params	: params
				};
				return $http(defaults);
			},
			requestQ: function (path, method, datas) {
				var defaults;
				defaults = {
					method	: method,
					url		: this.endpoint + path + this.jsonpoint,
					cache	: false,
					data	: datas,
					async   : false
				};
				return $.ajax(defaults);
			},
			requestD: function (path, method, params ,datas) {
                var defaults;
                defaults = {
                    method	: method,
					traditional:true,
                    async : false,
                    url		: this.endpoint + path + this.jsonpoint,
                    cache	: false,
                    data	: datas
                };
                return $.ajax(defaults);
            },
			/* 图片长传专用接口 */
			requestUpload:function (path,params){
				var defaults;
				defaults = {
					url		: this.endpoint + path + this.jsonpoint,
					data	: params
				};
				return Upload.upload(defaults);
			},
			get: function (_url_path,params) {
				return this.request(_url_path, 'GET', params);
			},
			post: function (_url_path,datas) {
				return this.request(_url_path ,'POST',datas);
			},
			upload:function(_url_path,params) {
				return this.requestUpload(_url_path,params);
			},
			postQ: function (_url_path,params) {
				return this.requestQ(_url_path, 'post', params);
			},
            postD : function(_url_path,params,datas) {
                return this.requestD(_url_path, 'post' ,params,datas);
            }
		};
		return DataService;
	}
]);
