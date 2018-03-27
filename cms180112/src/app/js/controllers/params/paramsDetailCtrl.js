

App
  	.controller('paramsDetailCtrl', function($scope,$stateParams,ParamsFactory,$timeout,$location,Notify,ModalService) {
  		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.ParamsListCallback = function(data){
			$scope.paramsList 	= data.paramsList;
			$scope.getParamsDetail ($scope.paramsList);
		};
		$scope.updateValueCallback = function(){
			Notify.alert();
			$timeout(function(){
				$location.replace().path('/cms/paramsList');
			},1500);
		};
		/* board title set */
		$scope.prevLink = "cms.paramsList";
		$scope.prevText = "参数文案列表";
		$scope.adiveStatus = false;
		$scope.getParamsDetail = function(_paramsList_){
			for (var i = 0; i < _paramsList_.length; i++) {
				if($stateParams.paramsId == _paramsList_[i].id){
					$scope.paramsDetail = _paramsList_[i];
					$scope.paramsValue 	= $scope.paramsDetail.value;
				}
			}
		}
        /* 参数对象  */
       	$scope.params = $stateParams;
		/* get paramsList */
		$scope.fetchData = function(){
			ParamsFactory.getParamsList(
				$scope.params, 
				$scope.ParamsListCallback
			);
		}
		$scope.fetchData();
		/* 弹层参数 set */
		$scope.valueChange = false;
		$scope.paramsValueChange = function(){
			if($scope.paramsValue != ""){
				$scope.valueChange = true;
			}
			$scope.modal_title_with_btn =  "<i class='icon-warning-sign ' ></i> 参数更改确认!";
			$scope.modal_content_with_btn = "确认更改参数值为:<strong> " +$scope.paramsValue +" </strong>";
			var templateUrl = 'app/js/directives/modal/modal_btn.html';
			
			$scope.paramsValueChangeModal = function(){
				/* 只有当内容改变是才允许修改。 */
				if ($scope.valueChange) {
					ModalService.modalSet($scope,templateUrl);
				};
			};
			/* 更改参数确认 */
			$scope.sure = function(){
				ModalService.modalHide();
				ParamsFactory.setModiParams({
					para 	: $stateParams.para,
					value 	: $scope.paramsValue
				}, $scope.updateValueCallback);
			}
		};
	});	