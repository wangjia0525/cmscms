
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/


App.directive('searchOpen', ['navSearch', function(navSearch) {
	'use strict';

	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {
			$element
				.on('click', function(e) {
					e.stopPropagation();
				})
				.on('click', navSearch.toggle);
		}]
	};

}]);