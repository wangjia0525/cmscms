/**
 *@description cmsUser 修改密码 
 */
App
	.controller('updateCmsUserPassWordCtrl',function($scope,Notify,CmsUserFactory,mdFactory) {
		$scope.updateCmsUserPassWordCallback = function(data){
			Notify.alert();
		};
		
		$scope.updatePassWord = function(){
			if ($scope.cmsUserPassWordInfo.newPassWord1 != $scope.cmsUserPassWordInfo.newPassWord2 
				&&$scope.cmsUserPassWordInfo.newPassWord1!=''
				&&$scope.cmsUserPassWordInfo.oldPassWord != '') {
				var msg = '两次密码不一致，请重新输入！';
				Notify.alert(
					'<i class="fa fa-times fa-2"></i> : '+msg, {
						status 	: 'danger'
					}
				);
				return ;
			} else{
				$scope.cmsUserPassWordInfo.newPassWord =  mdFactory.setMd5($scope.cmsUserPassWordInfo.newPassWord1);
				$scope.cmsUserPassWordInfo.newPassWord1 =  mdFactory.setMd5($scope.cmsUserPassWordInfo.newPassWord1);
				$scope.cmsUserPassWordInfo.newPassWord2 =  mdFactory.setMd5($scope.cmsUserPassWordInfo.newPassWord2);
				$scope.cmsUserPassWordInfo.oldPassWord =  mdFactory.setMd5($scope.cmsUserPassWordInfo.oldPassWord);
				CmsUserFactory.setUpdateCmsUserPassWord(
					$scope.cmsUserPassWordInfo,
					$scope.updateCmsUserPassWordCallback
				)
			}
		};
	});