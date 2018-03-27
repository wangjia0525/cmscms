

angular.module('app')
	.filter('category_filter',function(CategoryFactory){
		/* 获取栏目列表，以备添加视频时选择 */
		var categoryTypes;
	  	var categorylistCallback = function(data){
			categoryTypes = data.categoryList;	
		};
	  	var getCategoryList = function(){
			CategoryFactory.getCategoryList(
				{},categorylistCallback
			);
		};
		getCategoryList();
  		return function(_categoryId_){
  			for (var i =0,l=categoryTypes.length;i<l;i++) {
  				if (categoryTypes[i].categoryId == _categoryId_) {
  					return categoryTypes[i].name;
  				};
  			};
  		};
  	});