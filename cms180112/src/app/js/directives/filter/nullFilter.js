


App
.filter('null_value_filter',function(){
  		return function(_value_){
  			if (_value_ == null || _value_ == "null" || _value_ == ""||typeof(_value_)=="undefined") {
  				return "--";
  			}
			else {
  				return _value_	;
  			}
  		}
  	});