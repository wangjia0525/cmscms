 




App
	.factory('ColumnFactory',['SessionService',function(SessionService){
	/* 获取栏目列表 */
	var getColumnList = function(params, callback, failCallback) {
		return SessionService.requestGet("getcolumnlist",params, callback, failCallback);
	};
	var setUpdateColumn = function(params, callback, failCallback) {
		return SessionService.requestPost("modicolumn",params, callback, failCallback);
	};
	var setDelColumn = function(params, callback, failCallback) {
		return SessionService.requestGet("deletecolumn",params, callback, failCallback);
	};
	/* */
	var setAddColumn = function(params, callback, failCallback) {
		return SessionService.requestPost("addcolumn",params, callback, failCallback);
	};
	/* 给栏目添加一个接口 */
	var setAddColumnInterface = function(params, callback, failCallback) {
		return SessionService.requestGet("addcolumninterface",params, callback, failCallback);
	};
	/* 给栏目删除一个接口 */
	var setDelColumnInterface = function(params, callback, failCallback) {
		return SessionService.requestGet("deletecolumninterface",params, callback, failCallback);
	};
 	return {
      	getColumnList 	: getColumnList,
      	setUpdateColumn : setUpdateColumn,
      	setDelColumn	: setDelColumn,
      	setAddColumn	: setAddColumn,
      	setAddColumnInterface:setAddColumnInterface,
      	setDelColumnInterface:setDelColumnInterface
  	};
	
}])
