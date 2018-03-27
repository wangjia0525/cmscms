/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController', ['$rootScope', '$scope', '$state', '$interval', '$cookieStore', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar', 'mdFactory', 'ModalService', '$location', 'ColumnFactory',
	function($rootScope, $scope, $state, $interval, $cookieStore, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar, mdFactory, ModalService, $location, ColumnFactory) {
		"use strict";

		// Setup the layout mode
		$rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout == 'app-h');
		$rootScope.userProperty = $rootScope.$session.getItem('property');
		$rootScope.rootSectionId = $rootScope.$session.getItem('sectionId');
		$rootScope.selectboxname_section = '地区';

		$rootScope.sign_out = function() {
			$scope.modal_title_with_btn = "<i class='icon-warning-sign ' ></i> 退出登录确认!";
			$scope.modal_content_with_btn = "确认退出登录？";
			var templateUrl = 'app/js/directives/modal/modal_btn.html';
			ModalService.modalSet($scope, templateUrl);
			$scope.sure = function() {
				$rootScope.$session.setItem('token', '');
				$location.replace().path('/page/login');
			};
		}


		// Loading bar transition
		// ----------------------------------- 
		var thBar;
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if ($('.wrapper > section').length) // check if bar container exists
				thBar = $timeout(function() {
				cfpLoadingBar.start();
			}, 0); // sets a latency Threshold
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			event.targetScope.$watch("$viewContentLoaded", function() {
				$timeout.cancel(thBar);
				cfpLoadingBar.complete();
			});
		});

		// Hook not found
		$rootScope.$on('$stateNotFound',
			function(event, unfoundState, fromState, fromParams) {
				console.log(unfoundState.to); // "lazy.state"
				console.log(unfoundState.toParams); // {a:1, b:2}
				console.log(unfoundState.options); // {inherit:false} + default options
			});
		// Hook error
		$rootScope.$on('$stateChangeError',
			function(event, toState, toParams, fromState, fromParams, error) {
				console.log(error);
			});
		// 
		$rootScope.$on('$viewContentLoading',
			function(event, toState, toParams, fromState, fromParams) {
				$scope.getColumnListCallback = function(data) {
					$scope.$sidebar = data.columnList[0].children;

					//刚登陆后跳转到栏目列表中的第一个栏目，如果第一个栏目时空栏目，递归。
					var $columnO;

					function firstUrl(_sideList_) {
						for (var i = 0, l = _sideList_.length; i < l; i++) {
							if (_sideList_[i].url === $state.current.name) {
								$columnO = _sideList_[i];
								break;
							} else if (_sideList_[i].children.length != 0) {
								firstUrl(_sideList_[i].children);
							}
						}
					};
					firstUrl($scope.$sidebar);
					if($columnO){
						$rootScope.rootColumnName = $columnO.name;
						$rootScope.rootColumnPrompt = $columnO.prompt;
					}
				};
				var getColumnList = function() {
					ColumnFactory.getColumnList({
							selectUserId: $rootScope.$session.getItem('cmsuserId')
						},
						$scope.getColumnListCallback
					);
				}
				getColumnList();
			}
		)

		// Hook success
		$rootScope.$on('$stateChangeSuccess',
			function(event, toState, toParams, fromState, fromParams) {
				// display new view from top
				$window.scrollTo(0, 0);
				// Save the route title
				$rootScope.currTitle = $state.current.title;
				var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
				window.document.title = title;

			});

		$rootScope.currTitle = $state.current.title;
		/*$rootScope.pageTitle = function() {
		  var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
		  document.title = title;
		  return title; 
		};*/

		// iPad may presents ghost click issues
		// if( ! browser.ipad )
		// FastClick.attach(document.body);

		// Close submenu when sidebar change from collapsed to normal
		$rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
			if (newValue === false)
				$rootScope.$broadcast('closeSidebarMenu');
		});

		// Restore layout settings
		if (angular.isDefined($localStorage.layout))
			$scope.app.layout = $localStorage.layout;
		else
			$localStorage.layout = $scope.app.layout;
		$rootScope.$watch("app.layout", function() {
			$localStorage.layout = $scope.app.layout;
		}, true);

		// Hides/show user avatar on sidebar
		if($rootScope.$session.getItem("roleName")=='管理员'|| $rootScope.$session.getItem("roleName")=='普通管理员'|| $rootScope.$session.getItem("roleName")=='超级管理员'){
			$scope.xiaoren=true;
		}else{
			$scope.xiaoren=false;
		}
		$scope.toggleUserBlock = function() {
			$state.go('cms.homePage');
			$scope.$broadcast('toggleUserBlock');
		};

		// Allows to use branding color with interpolation
		// {{ colorByName('primary') }}
		$scope.colorByName = colors.byName;

		// Internationalization
		// ----------------------

		$scope.language = {
			// Handles language dropdown
			listIsOpen: false,
			// list of available languages
			available: {
				'en': 'English',
				'es_AR': 'Español'
			},
			// display always the current ui language
			init: function() {
				var proposedLanguage = $translate.proposedLanguage() || $translate.use();
				var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
				$scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
			},
			set: function(localeId, ev) {
				// Set the new idiom
				$translate.use(localeId);
				// save a reference for the current language
				$scope.language.selected = $scope.language.available[localeId];
				// finally toggle dropdown
				$scope.language.listIsOpen = !$scope.language.listIsOpen;
			}
		};

		$scope.language.init();

		// Restore application classes state
		toggle.restoreState($(document.body));

		// cancel click event easily
		$rootScope.cancel = function($event) {
			$event.stopPropagation();
		};
		/*photo zoom fancybox 弹层 插件 */
		$rootScope.photoZoom = function(pic_url) {
			if (pic_url) {
				console.log(pic_url)
				var png = pic_url.indexOf('.png'),
					jpg = pic_url.indexOf('.jpg'),
					jpeg = pic_url.indexOf('.jpeg'),
					gif = pic_url.indexOf('.gif'),
					svg = pic_url.indexOf('svg');
				if ((png != -1) || (jpg != -1) || (jpeg != -1) || (gif != -1) || (svg != -1)) {
					$.fancybox.open({
						href: pic_url,
						padding: 5,
						openEffect: 'elastic',
						openSpeed: 300,
						closeEffect: 'elastic',
						closeSpeed: 300,
						closeBtn  : false,
						helpers		: {
								title	: null,
								buttons:{}
							}
					});
				} else {
					$.fancybox.open({
						href: pic_url ,
						padding: 5,
						openEffect: 'elastic',
						openSpeed: 300,
						closeEffect: 'elastic',
						closeSpeed: 300,
						closeBtn  : false,
						helpers		: {
								title	: null,
								buttons:{}
							}
					});
				};
			} else {
				$.fancybox.open({
					href: "./app/img/header_err.png",
					padding: 5,
					openEffect: 'elastic',
					openSpeed: 300,
					closeEffect: 'elastic',
					closeSpeed: 300,
					closeBtn  : false,
					helpers		: {
								title	: null,
								buttons:{}
							}
				});
			}
		};
	}
]);