'use strict';
App
	.service('yulanService', ['ngDialog', function (ngDialog) {
		/* 私有属性 */
		var commonModal = "";
		var yulanService = {
			/* 设置弹窗的作用域和模板地址 */
			modalSet  : function(_scope_,_templateUrl_,theme){
				/* 当不传 _templateUrl_时，默认为没有btn的模板*/
				if (!_templateUrl_) {
					_templateUrl_ = 'app/js/directives/modal/modal_no_btn.html';
				};
				if(!theme){
					theme = "ngdialog-theme-default";
				};
				commonModal =  ngDialog.open({
					scope: _scope_,
					templateUrl: _templateUrl_,//模板
					className:theme,//CSS
					closeByNavigation:true//路由、地址改变时，关闭modal
				});
				/* 设置完成后直接将弹窗打开  */
			},
			/**
			 *@description 关闭弹窗 
			 */
			modalHide : function(){
				commonModal.close();
			}
		};
		return yulanService;
	}]);
