/**
 *接口的类型过滤器 
 *
 */


App.filter('interface_type_filter',function(){
  		return function(_value_){
  			var interfaceType_list = ["","增","删","改","查","下载"];
    		return interfaceType_list[_value_];
  		}
  	});
App.filter('interface_sectionType_filter',function(){
	return function(_sectionType_){
		var sectionType_list = ['','不需要验证','分地区','只能超级管理员调用'];
		return sectionType_list[_sectionType_];
	}
})
