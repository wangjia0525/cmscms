/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils','ColumnFactory',
	function($rootScope, $scope, $state, $http, $timeout, Utils,ColumnFactory) {
		/* 展示user 的属性 */
		$rootScope.user = {
			name: $rootScope.$session.getItem('loginName'),
			role: $rootScope.$session.getItem('roleName'),
			picture: 'app/img/error-err.png'
		};

		var collapseList = [];

		// demo: when switch from collapse to hover, close all items
		$rootScope.$watch('app.layout.asideHover', function(oldVal, newVal) {
			if (newVal === false && oldVal === true) {
				closeAllBut(-1);
			}
		});

		// Check item and children active state
		var isActive = function(item) {

			if (!item) return;

			if (!item.url || item.url == '#') {
				var foundActive = false;
				angular.forEach(item.children, function(value, key) {
					if (isActive(value)) foundActive = true;
				});
				return foundActive;
			} else
				return $state.is(item.url) || $state.includes(item.url);
		};

		// Load menu from json file
		// ----------------------------------- 

		$scope.getMenuItemPropClasses = function(item) {
			return (item.heading ? 'nav-heading' : '') +
				(isActive(item) ? ' active' : '');
		};

		$scope.loadSidebarMenu = function() {
			
			
			$scope.getColumnListCallback = function(data){
  				$scope.menuItems = data.columnList[0].children;
  			};
  			
  			ColumnFactory.getColumnList(
  				{
  					selectUserId:$rootScope.$session.getItem('cmsuserId')
  				},
  				$scope.getColumnListCallback
  			);
			/*var menuJson = 'data/getcolumnlist.json',
				menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache
			$http.get(menuURL)
				.success(function(items) {
					$scope.menuItems = items.columnList[0].children;
				})
				.error(function(data, status, headers, config) {
					alert('Failure loading menu');
				});*/
		};

		$scope.loadSidebarMenu();

		// Handle sidebar collapse items
		// ----------------------------------- 

		$scope.addCollapse = function($index, item) {
			collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
		};

		$scope.isCollapse = function($index) {
			return (collapseList[$index]);
		};

		$scope.toggleCollapse = function($index, isParentItem) {

			// collapsed sidebar doesn't toggle drodopwn
			if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

			// make sure the item index exists
			if (angular.isDefined(collapseList[$index])) {
				if (!$scope.lastEventFromChild) {
					collapseList[$index] = !collapseList[$index];
					closeAllBut($index);
				}
			} else if (isParentItem) {
				closeAllBut(-1);
			}

			$scope.lastEventFromChild = isChild($index);

			return true;

		};

		function closeAllBut(index) {
			index += '';
			for (var i in collapseList) {
				if (index < 0 || index.indexOf(i) < 0)
					collapseList[i] = true;
			}
		};

		function isChild($index) {
			return (typeof $index === 'string') && !($index.indexOf('-') < 0);
		};
	}
]);