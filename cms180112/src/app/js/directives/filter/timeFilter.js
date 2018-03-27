



angular.module('app').filter('timefilter',function(){
  		return function(_value_){
			if (_value_ < 10) {
				_value_ = "0"+_value_;
			};
			return _value_+":00";
  		}
  	});