

App
  	.controller('adviceDetailCtrl', function($scope,$http,$stateParams,$location,$timeout,ModalService,AdviceFactory,Notify) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.adviceListCallback = function(data){
			$scope.adviceList 	= data.adviceList;
			$scope.getAdviceDetail ($scope.adviceList);
		};
		$scope.doAdviceCallback = function(){
			$scope.adviceStatus = true;
			/* 提示操作成功,提示完成后（默认1000ms),返回到建议列表 */
			Notify.alert();
			
			$timeout(function(){
				$location.replace().path('/cms/adviceList');
			},1500);
		};
		/* board title set */
		//$scope.adiveStatus = false;
		$scope.getAdviceDetail = function(_adviceList_){
			for (var i = 0; i < _adviceList_.length; i++) {
				if($stateParams.adviceId == _adviceList_[i].adviceId){
					$scope.adviceDetail = _adviceList_[i];
					$scope.userData =	$scope.adviceDetail;
				};
			};
		};
        /* 参数对象  */
		$scope.params = $stateParams;
		/* get adviceList */
		AdviceFactory.getAdviceList($scope.params, $scope.adviceListCallback);
		
		$scope.doAdvice = function(){
			AdviceFactory.setDoAdvice({
				adviceId : $stateParams.adviceId
			}, $scope.doAdviceCallback);
		};
	});	