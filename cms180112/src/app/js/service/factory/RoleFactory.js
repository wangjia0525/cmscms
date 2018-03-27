




App.factory('RoleFactory',function(SessionService){
	/* 获取角色列表 */
	var getRoleList = function(params, callback, failCallback) {
		return SessionService.requestGet("getrolelist",params, callback, failCallback);
	};
	/* 删除一个角色的请求 */
	var setDelRole = function(params, callback, failCallback) {
		return SessionService.requestGet("deleterole",params, callback, failCallback);
	};
	/* 增加一个角色的请求 */
	var setAddRole = function(params, callback, failCallback) {
		return SessionService.requestPost("addrole",params, callback, failCallback);
	};
	/* 更新一个角色信息 */
	var setUpdateRole = function(params, callback, failCallback) {
		return SessionService.requestPost("modirole",params, callback, failCallback);
	};
	/* 获取该角色下的栏目列表 */
	var getColumnListEd = function(params, callback, failCallback) {
		return SessionService.requestGet("selectrolecolumn",params, callback, failCallback);
	};

	/* 添加角色下的一个栏目 附带权限*/
	// var setAddRoleColumn = function(params, callback, failCallback) {
	// 	return SessionService.requestGet("addrolecolumn",params, callback, failCallback);
	// };
	var setAddRoleColumn = function(params, callback, failCallback) {
		return SessionService.requestPostD("addrolecolumn",params, callback, failCallback);
	};

 	return {
      	getRoleList 	: getRoleList,
      	setDelRole		: setDelRole,
      	setAddRole		: setAddRole,
      	setUpdateRole	: setUpdateRole,
      	getColumnListEd	: getColumnListEd,
      	setAddRoleColumn: setAddRoleColumn
  	};
	
})
