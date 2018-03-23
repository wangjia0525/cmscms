/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginCtrl', ['$scope','$rootScope', '$http', '$state','ColumnFactory','mdFactory','LoginFactory',
function($scope, $rootScope,$http, $state,ColumnFactory,mdFactory,LoginFactory) {

	// bind here all data from the form
	$scope.account = {};
	// place the message if something goes wrong
	$scope.authMsg = '';
	
	/* 为service写的回调方法，保证service回传的model可以传递给controller */
	$scope.loginCallback = function(data){
		if(data.err.code == -12){
			$scope.msg = data.err.msg;
		}else if(data.err.code == 0){
			$rootScope.$session.setItem('token',data.token); 
			$rootScope.$session.setItem('cmsuserId',data.user.cmsuserId);
			$rootScope.$session.setItem('loginName',data.user.name);
			$rootScope.$session.setItem('roleName',data.role.name);
			$rootScope.$session.setItem('loginRole',data.role.roleId);
			$rootScope.$session.setItem('roleType',data.role.type);
			$rootScope.$session.setItem('sectionId',data.user.sectionId);
			$rootScope.$session.setItem('property',data.role.property);
			//$state.go('cms.homePage');
			$scope.getColumnListCallback = function(data){
				if($rootScope.$session.getItem("roleName")=='管理员'|| $rootScope.$session.getItem("roleName")=='普通管理员'|| $rootScope.$session.getItem("roleName")=='超级管理员'){
					$state.go('cms.homePage');
				}else{
					$scope.$sidebar = data.columnList[0].children;
					//刚登陆后跳转到栏目列表中的第一个栏目，如果第一个栏目时空栏目，递归。
					function firstUrl(_sideList_){
						var theUrl = _sideList_[0].url;
						var $theUrl =  theUrl.substring(4,theUrl.length);
						if ($theUrl) {
							$state.go('cms.'+$theUrl);
						} else{
							firstUrl(_sideList_[0].children);
						}
					};
					firstUrl($scope.$sidebar);
				}
			};

  			ColumnFactory.getColumnList(
  				{
  					selectUserId : $rootScope.$session.getItem('cmsuserId')
  				},
  				$scope.getColumnListCallback
  			);
  			
  			
		}
	};
	
	var oForm = document.getElementsByTagName("form")[0];
		oForm.addEventListener("keypress", function(event) {
		    if(event.charCode == 13){
		       $scope.login();
		    };
		},true);

	$scope.login = function() {
		$scope.authMsg = '';
		if ($scope.loginForm.$valid) {
			LoginFactory.getLoginToken({
				account : $scope.account.email,
				password : mdFactory.setMd5($scope.account.password)
			}, $scope.loginCallback);
		} else {
			// set as dirty if the user click directly to login so we show the validation messages
			$scope.loginForm.account_email.$dirty = true;
			$scope.loginForm.account_password.$dirty = true;
		}
	};
	//$(document).keydown(function (event) {
    //
	//		if (event.keyCode == 13) {
    //
	//			if ($scope.loginForm.$valid) {
	//				LoginFactory.getLoginToken({
	//					account : $scope.account.email,
	//					password : mdFactory.setMd5($scope.account.password)
	//				}, $scope.loginCallback);
	//			} else {
	//				// set as dirty if the user click directly to login so we show the validation messages
	//				$scope.loginForm.account_email.$dirty = true;
	//				$scope.loginForm.account_password.$dirty = true;
	//			}
	//		}
	//})
}]);