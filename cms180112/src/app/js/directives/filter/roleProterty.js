



App
	.filter('role_property_filter',function(){
  		return function(_type_){
  			var property_type_list = ["","管理员","客服","风控"];
  				return property_type_list[_type_];
  		}
  	});