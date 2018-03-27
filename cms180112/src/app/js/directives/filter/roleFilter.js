App.filter('role_type_filter', function() {
	return function(_value_) {
		var roletype_list = ["", "超级管理员", "普通管理员"];
		return roletype_list[_value_];
	}
});
App.filter('role_section_filter', function(CmsSectionFactory) {
	var sections;
	var cmsSectionCallback = function(data) {
		sections = data.sectionList;
	};
	var getCmsSectionList = function() {
		CmsSectionFactory.getCmsSectionList({}, cmsSectionCallback);
	};
	getCmsSectionList();

	return function(_sectionId_) {
		for (var i = 0, l = sections.length; i < l; i++) {
			if (sections[i].sectionId == _sectionId_) {
				return sections[i].name;
			};
		};
	};
});