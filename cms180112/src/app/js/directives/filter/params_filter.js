



App
	.filter('params_type',function(){
  		return function(_type_){
  			var params_type_list = ["","参数","文案"];
  				return params_type_list[_type_];
  		}
  	});