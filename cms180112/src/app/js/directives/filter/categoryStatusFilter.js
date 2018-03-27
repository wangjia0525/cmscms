




angular.module('app').filter('category_status_filter',function(){
  		return function(_value_){
  			var type_list = ["--","普通","在首页显示"];
    		return type_list[_value_];
  		}
  	});