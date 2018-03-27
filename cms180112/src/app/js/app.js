/*!
 * 
 * micro dream cms by angularJS.
 * 
 * Author: @yan
 * createDate:2016-04-25
 * (c) Copyright 2016 yan. All Rights Reserved. 
 * 
 */

if (typeof $ === 'undefined') {
	throw new Error('This application\'s JavaScript requires jQuery');
}

// APP START
// ----------------------------------- 

var App = angular.module('microdream', [
	'ngRoute',
	'ngAnimate',
	'ngStorage',
	'ngCookies',
	'pascalprecht.translate',
	'ui.bootstrap',
	'ui.router',
	'oc.lazyLoad',
	'cfp.loadingBar',
	'ngSanitize',
	'ngResource',
	'tmh.dynamicLocale',
	'ui.utils',
	'treeControl',
	'ngFileUpload'
]);

App.run(["$rootScope", "$state", "$stateParams", '$window', '$templateCache', function($rootScope, $state, $stateParams, $window, $templateCache) {
	// Set reference to access them from any scope
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope.$storage = $window.localStorage;
	$rootScope.$session = $window.sessionStorage;

	// Uncomment this to disable template cache
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (typeof(toState) !== 'undefined') {
			$templateCache.remove(toState.templateUrl);
		}
	});

	// Scope Globals
	// ----------------------------------- 
	$rootScope.app = {
		name: 'i幸会',
		description: 'i幸会后台管理平台',
		year: ((new Date()).getFullYear()),
		layout: {
			isFixed: true,
			isCollapsed: false,
			isBoxed: false,
			isRTL: false,
			horizontal: false,
			isFloat: false,
			asideHover: false,
			theme: null
		},
		useFullLayout: false,
		hiddenFooter: false,
		viewAnimation: 'ng-fadeInUp'
	};
}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
	function($stateProvider, $locationProvider, $urlRouterProvider, helper) {
		'use strict';
		// Set the following to true to enable the HTML5 Mode
		// You may have to set <base> tag in index and a routing configuration in your server
		$locationProvider.html5Mode(false);
		// default route
		$urlRouterProvider.otherwise('/page/login');
		// 
		// Application Routes
		// -----------------------------------   
		$stateProvider
			.state('cms', {
				url: '/cms',
				abstract: true,
				templateUrl: helper.basepath('app.html'),
				controller: 'AppController',
				resolve: helper.resolveFor('modernizr', 'icons', 'ngDialog', 'angularTreeControl', 'whirl', //插件
						'AppController', 'SidebarController', //controller
						'sidebar', 'searchOpen', 'toggleState', 'errSrc', //directives
						'filter') //filter
			})
			.state('cms.columnManage', {
				url: '/columnManage',
				title: '项目管理',
				templateUrl: helper.basepath('column/columnManage.html'),
				resolve: helper.resolveFor('columnManageCtrl')
			})
			.state('cms.interfaceManage', {
				url: '/interfaceManage',
				title: '接口管理',
				templateUrl: helper.basepath('interface/interfaceManage.html'),
				resolve: helper.resolveFor('interfaceManageCtrl')
			})
			.state('cms.roleManage', {
				url: '/roleManage',
				title: '角色管理',
				templateUrl: helper.basepath('role/roleManage.html'),
				resolve: helper.resolveFor('roleManageCtrl')
			})
			.state('cms.cmsUserManage', {
				url: '/cmsUserManage',
				title: 'cms用户管理',
				templateUrl: helper.basepath('cmsUser/cmsUserManage.html'),
				resolve: helper.resolveFor('cmsUserManageCtrl')
			})
			.state('cms.cmsSectionManage', {
				url: '/cmsSectionManage',
				title: 'cmsSectionManage',
				templateUrl: helper.basepath('cmsSection/cmsSectionManage.html'),
				resolve: helper.resolveFor('cmsSectionManageCtrl')
			})
			.state('page', {
				url: '/page',
				templateUrl: 'app/views/pages/page.html',
				resolve: helper.resolveFor('modernizr', 'icons'),
				controller: ["$rootScope", function($rootScope) {
					$rootScope.app.layout.isBoxed = false;
				}]
			})
			.state('page.login', {
				url: '/login',
				title: "Login",
				templateUrl: 'app/views/pages/login.html',
				resolve: helper.resolveFor('loginCtrl')
			})
			.state('page.register', {
				url: '/register',
				title: "Register",
				templateUrl: 'app/views/pages/register.html'
			})
			.state('page.recover', {
				url: '/recover',
				title: "Recover",
				templateUrl: 'app/views/pages/recover.html'
			})
			.state('page.lock', {
				url: '/lock',
				title: "Lock",
				templateUrl: 'app/views/pages/lock.html'
			})
			.state('page.404', {
				url: '/404',
				title: "Not Found",
				templateUrl: 'app/views/pages/404.html'
			})
			/*============================================================
			 * 
			 * 
			 * 
			 * ===========================================================
			 * */
			.state('cms.adviceList', {
				url: '/adviceList',
				title: '意见反馈',
				templateUrl: helper.basepath('advice/adviceList.html'),
				resolve: helper.resolveFor('adviceListCtrl')
			})
			.state('cms.adviceDetail', {
				url: '/adviceDetail/:adviceId/:size/:page/:searchKey',
				title: '意见反馈详情',
				templateUrl: helper.basepath('advice/adviceDetail.html'),
				resolve: helper.resolveFor('adviceDetailCtrl')
			})
			.state('cms.paramsList', {
				url: '/paramsList',
				title: '参数管理',
				templateUrl: helper.basepath('params/paramsList.html'),
				resolve: helper.resolveFor('paramsListCtrl')
			})
			.state('cms.paramsDetail', {
				url: '/paramsDetail/:paramsId/:size/:page/:searchKey/:para',
				title: '参数详情',
				templateUrl: helper.basepath('params/paramsDetail.html'),
				resolve: helper.resolveFor('paramsDetailCtrl')
			})
			.state('cms.mobileUserManage', {
				url: '/mobileUserManage',
				title: '用户管理',
				templateUrl: helper.basepath('mobileUser/mobileUserManage.html'),
				resolve: helper.resolveFor('mobileUserManageCtrl')
			})
			.state('cms.mobileUserDetail', {
				 url: '/mobileUserDetail/:userId/:areaCode/:positionId/:industyId/:realmId/:searchKey/:sortType/:page/:size',
				title: '用户详情',
				templateUrl: helper.basepath('mobileUser/mobileUserDetail.html'),
				resolve: helper.resolveFor('mobileUserDetailCtrl')
			})
			//营销达人里面
			.state('cms.userDetail', {
				url: '/userDetail/:appUserId',
				title: '用户详情',
				templateUrl: helper.basepath('mobileUser/userDetail.html'),
				resolve: helper.resolveFor('userDetailCtrl')
			})
			.state('cms.addMobileUser', {
				url: '/addMobileUser',
				title: '添加用户',
				templateUrl: helper.basepath('mobileUser/addMobileUser.html'),
				resolve: helper.resolveFor('addMobileUserCtrl')
			})
			//数据统计
			.state('cms.statisticsInfo', {
				url: '/statisticsInfo',
				title: '数据统计',
				templateUrl: helper.basepath('statistics/statisticsInfo.html'),
				resolve: helper.resolveFor('statisticsInfoCtrl','chartjs','Chart')
			})
			//产品购买统计
			.state('cms.productBuy', {
				url: '/productBuy?productId',
				title: '产品购买统计',
				templateUrl: helper.basepath('productBuy/productBuy.html'),
				resolve: helper.resolveFor('productBuyCtrl','chartjs','Chart')
			})
			.state('cms.updateCmsUserPassWord', {
				url: '/updateCmsUserPassWord',
				title: '修改密码',
				templateUrl: helper.basepath('cmsUser/updatePassWord.html'),
				resolve: helper.resolveFor('updateCmsUserPassWordCtrl')
			})
			/////////////
			.state('cms.topicList', {
				url: '/topicList',
				title: '话题管理',
				templateUrl: helper.basepath('topic/topicList.html'),
				resolve: helper.resolveFor('topicListCtrl')
			})
			.state('cms.topicDetail', {
				url: '/topicDetail/:size/:page/:sortType/:realmId/:searchKey/:type/:searchUserId/:topicId/:topicRealm/:isPay/:isPublic/:isReply',
				title: '话题详情',
				templateUrl: helper.basepath('topic/topicDetail.html'),
				resolve: helper.resolveFor('topicDetailCtrl')
			})
			.state('cms.topicDetail1', {
				url: '/topicDetail1/:topicId',
				title: '话题详情',
				templateUrl: helper.basepath('topic/topicDetail1.html'),
				resolve: helper.resolveFor('topicDetail1Ctrl')
			})
			.state('cms.addTopic', {
				url: '/addTopic',
				title: '添加话题',
				templateUrl: helper.basepath('topic/addTopic.html'),
				resolve: helper.resolveFor('addTopicCtrl')
			})
			.state('cms.contestList', {
				url: '/contestList',
				title: '擂台管理',
				templateUrl: helper.basepath('contest/contestList.html'),
				resolve: helper.resolveFor('contestListCtrl')
			})
			.state('cms.contestDetail', {
				url: '/contestDetail/:size/:page/:sortType/:realmId/:searchKey/:type/:searchUserId/:topicId/:topicRealm',
				title: '擂台详情',
				templateUrl: helper.basepath('contest/contestDetail.html'),
				resolve: helper.resolveFor('contestDetailCtrl')
			})
			.state('cms.contestDetail1', {
				url: '/contestDetail1/:topicId',
				title: '擂台详情',
				templateUrl: helper.basepath('contest/contestDetail1.html'),
				resolve: helper.resolveFor('contestDetail1Ctrl')
			})
			.state('cms.addContest', {
				url: '/addContest',
				title: '添加擂台',
				templateUrl: helper.basepath('contest/addContest.html'),
				resolve: helper.resolveFor('addContestCtrl')
			})
			.state('cms.master', {
				url: '/master',
				title: '营销达人',
				templateUrl: helper.basepath('master/master.html'),
				resolve: helper.resolveFor('masterCtrl')
			})
			//影响力管理
			.state('cms.yxl', {
				url: '/yxl',
				title: '影响力管理',
				templateUrl: helper.basepath('yxl/yxl.html'),
				resolve: helper.resolveFor('yxlCtrl')
			})
			.state('cms.addYxl', {
				url: '/addYxl',
				title: '影响力管理',
				templateUrl: helper.basepath('yxl/addYxl.html'),
				resolve: helper.resolveFor('addYxlCtrl')
			})
			//cms首页
			.state('cms.homePage', {
				url: '/homePage',
				title: 'CMS首页',
				templateUrl: helper.basepath('homePage/homePage.html'),
				resolve: helper.resolveFor('homePageCtrl')
			})
			//日课老师
			.state('cms.classTeacher', {
				url: '/classTeacher',
				title: '日课老师',
				templateUrl: helper.basepath('classTeacher/classTeacher.html'),
				resolve: helper.resolveFor('classTeacherCtrl')
			})
			//日课列表
			.state('cms.classList', {
				url: '/classList?userId&name',
				title: '日课列表',
				templateUrl: helper.basepath('classTeacher/classList.html'),
				resolve: helper.resolveFor('classListCtrl')
			})
			//老师收入情况
			.state('cms.incomeSituation', {
				url: '/incomeSituation?userId&name',
				title: '日课列表',
				templateUrl: helper.basepath('classTeacher/incomeSituation.html'),
				resolve: helper.resolveFor('incomeSituationCtrl')
			})
			//学习情况统计
			.state('cms.studySituation', {
				url: '/studySituation?productId',
				title: '学习情况',
				templateUrl: helper.basepath('studySituation/studySituation.html'),
				resolve: helper.resolveFor('studySituationCtrl')
			})
			//会员管理
			.state('cms.memberManage', {
				url: '/memberManage',
				title: '会员管理',
				templateUrl: helper.basepath('memberManage/memberManage.html'),
				resolve: helper.resolveFor('memberManageCtrl')
			})
			//结算通知
			.state('cms.account', {
				url: '/account',
				title: '结算通知',
				templateUrl: helper.basepath('account/account.html'),
				resolve: helper.resolveFor('accountCtrl')
			})
			//发票管理
			.state('cms.invoice', {
				url: '/invoice',
				title: '发票管理',
				templateUrl: helper.basepath('account/invoice.html'),
				resolve: helper.resolveFor('invoiceCtrl')
			})
			//发票详情
			.state('cms.invoiceDetail', {
				url: '/invoiceDetail?orderInvoiceId',
				title: '发票详情',
				templateUrl: helper.basepath('account/invoiceDetail.html'),
				resolve: helper.resolveFor('invoiceDetailCtrl')
			})
			//列表文章管理
			.state('cms.article', {
				url: '/article',
				title: '文章管理',
				templateUrl: helper.basepath('article/article.html'),
				resolve: helper.resolveFor('articleCtrl')
			})
			//非列表文章管理
			.state('cms.articleNotList', {
				url: '/articleNotList',
				title: '非列表文章管理',
				templateUrl: helper.basepath('article/articleNotList.html'),
				resolve: helper.resolveFor('articleNotListCtrl')
			})
			//未审核投稿
			.state('cms.unauditedArticle', {
				url: '/unauditedArticle',
				title: '未审核投稿管理',
				templateUrl: helper.basepath('article/unauditedArticle.html'),
				resolve: helper.resolveFor('unauditedArticleCtrl')
			})
			//已审投稿
			.state('cms.reviewedArticle', {
				url: '/reviewedArticle',
				title: '已审投稿管理',
				templateUrl: helper.basepath('article/reviewedArticle.html'),
				resolve: helper.resolveFor('reviewedArticleCtrl')
			})
			//文章预览
			.state('cms.articlePreview', {
				url: '/articlePreview?articleId',
				title: '文章预览',
				templateUrl: helper.basepath('article/articlePreview.html'),
				resolve: helper.resolveFor('articlePreviewCtrl')
			})
			//文章编辑
			.state('cms.editorArticle', {
				url: '/editorArticle?articleNumber',
				title: '文章编辑',
				templateUrl: helper.basepath('article/editorArticle.html'),
				resolve: helper.resolveFor('editorArticleCtrl')
			})
			//文章编辑详情
			.state('cms.editorArticleDetails', {
				url: '/editorArticleDetails?articleId&articleNumber',
				title: '文章编辑详情',
				templateUrl: helper.basepath('article/editorArticleDetails.html'),
				resolve: helper.resolveFor('editorArticleDetailsCtrl')
			})
			//评论管理
			.state('cms.discuss', {
				url: '/discuss?articleId',
				title: '评论管理',
				templateUrl: helper.basepath('article/discuss.html'),
				resolve: helper.resolveFor('discussCtrl')
			})
			//文章评论详情
			.state('cms.discussDetails', {
				url: '/discussDetails?articleEvaluateId&articleId',
				title: '文章评论详情',
				templateUrl: helper.basepath('article/discussDetails.html'),
				resolve: helper.resolveFor('discussDetailsCtrl')
			})
			//结算详情
			.state('cms.accountDetail', {
				url: '/accountDetail?clearingType&createTime&auditTime&alipay&realName&phoneNo&state&invoiceType&isInvoice&clearingId',
				title: '结算通知',
				templateUrl: helper.basepath('account/accountDetail.html'),
				resolve: helper.resolveFor('accountDetailCtrl')
			})
			//分享赚币
			.state('cms.shareMakeMoney', {
				url: '/shareMakeMoney',
				title: '文章评论详情',
				templateUrl: helper.basepath('share/shareMakeMoney.html'),
				resolve: helper.resolveFor('shareMakeMoneyCtrl')
			})
			//搜索管理
			.state('cms.select', {
				url: '/select',
				title: '搜索管理',
				templateUrl: helper.basepath('select/select.html'),
				resolve: helper.resolveFor('selectCtrl')
			})
			.state('cms.blackList', {
				url: '/blackList',
				title: '黑名单',
				templateUrl: helper.basepath('blackList/blackList.html'),
				resolve: helper.resolveFor('blackListCtrl')
			})
			.state('cms.field', {
				url: '/field',
				title: '领域管理',
				templateUrl: helper.basepath('field/field.html'),
				resolve: helper.resolveFor('fieldCtrl')
			})
			.state('cms.versionUpdate', {
				url: '/versionUpdate',
				title: '版本更新',
				templateUrl: helper.basepath('versionUpdate/versionUpdate.html'),
				resolve: helper.resolveFor('versionUpdateCtrl')
			})
			.state('cms.hotContest', {
				url: '/hotContest',
				title: '热门擂台',
				templateUrl: helper.basepath('hot/hotContest.html'),
				resolve: helper.resolveFor('hotContestCtrl')
			})
			.state('cms.hotTopic', {
				url: '/hotTopic',
				title: '热门话题',
				templateUrl: helper.basepath('hot/hotTopic.html'),
				resolve: helper.resolveFor('hotTopicCtrl')
			})
			.state('cms.reallyDeleteContest', {
				url: '/reallyDeleteContest',
				title: '擂台黑名单',
				templateUrl: helper.basepath('reallyDelete/reallyDeleteContest.html'),
				resolve: helper.resolveFor('reallyDeleteContestCtrl')
			})
			.state('cms.reallyDeleteTopic', {
				url: '/reallyDeleteTopic',
				title: '话题黑名单',
				templateUrl: helper.basepath('reallyDelete/reallyDeleteTopic.html'),
				resolve: helper.resolveFor('reallyDeleteTopicCtrl')
			})
			.state('cms.reallyDeleteArticle', {
				url: '/reallyDeleteArticle',
				title: '文章删除',
				templateUrl: helper.basepath('reallyDelete/reallyDeleteArticle.html'),
				resolve: helper.resolveFor('reallyDeleteArticleCtrl')
			})
			.state('cms.fold', {
				url: '/fold',
				title: '评论管理',
				templateUrl: helper.basepath('fold/fold.html'),
				resolve: helper.resolveFor('foldCtrl')
			})
			.state('cms.foldDetail', {
				url: '/foldDetail/:page/:size/:topicEvaluateId/:type',
				title: '评论详情',
				templateUrl: helper.basepath('fold/foldDetail.html'),
				resolve: helper.resolveFor('foldDetailCtrl')
			})
			.state('cms.report', {
				url: '/report',
				title: '举报管理',
				templateUrl: helper.basepath('report/report.html'),
				resolve: helper.resolveFor('reportCtrl')
			})
			.state('cms.reportDetail', {
				url: '/reportDetail/:userReportId',
				title: '举报详情',
				templateUrl: helper.basepath('report/reportDetail.html'),
				resolve: helper.resolveFor('reportDetailCtrl')
			})
			.state('cms.systemMessage', {
				url: '/systemMessage',
				title: '成长小助手',
				templateUrl: helper.basepath('systemMessage/systemMessage.html'),
				resolve: helper.resolveFor('systemMessageCtrl')
			})
			.state('cms.alreadySent', {
				url: '/alreadySent',
				title: '已发推送',
				templateUrl: helper.basepath('alreadySent/alreadySent.html'),
				resolve: helper.resolveFor('alreadySentCtrl')
			})
			.state('cms.userMessage', {
				url: '/userMessage',
				title: '用户消息' +
				'',
				templateUrl: helper.basepath('userMessage/userMessage.html'),
				resolve: helper.resolveFor('userMessageCtrl')
			})
			.state('cms.sensitive', {
				url: '/sensitive',
				title: '敏感词',
				templateUrl: helper.basepath('sensitive/sensitive.html'),
				resolve: helper.resolveFor('sensitiveCtrl')
			})
			.state('cms.appBannerList', {
				url: '/appBannerList',
				title: 'Banner管理',
				templateUrl: helper.basepath('appBanner/appBannerList.html'),
				resolve: helper.resolveFor('appBannerListCtrl')
			})
			//启动页广告
			.state('cms.appAd', {
				url: '/appAd',
				title: '广告位管理',
				templateUrl: helper.basepath('appBanner/appAd.html'),
				resolve: helper.resolveFor('appAdCtrl')
			})
			//首页弹窗
			.state('cms.popup', {
				url: '/popup',
				title: '首页弹窗',
				templateUrl: helper.basepath('appBanner/popup.html'),
				resolve: helper.resolveFor('popupCtrl')
			})
			//首页ICON方案
			.state('cms.iconCase', {
				url: '/iconCase',
				title: '首页ICON方案',
				templateUrl: helper.basepath('appBanner/iconCase.html'),
				resolve: helper.resolveFor('iconCaseCtrl')
			})
			//编辑ICON方案
			.state('cms.iconCaseDetail', {
				url: '/iconCaseDetail',
				title: '添加ICON方案',
				templateUrl: helper.basepath('appBanner/iconCaseDetail.html'),
				resolve: helper.resolveFor('iconCaseDetailCtrl')
			})
			//查看修改ICON方案
			.state('cms.iconCaseDetails', {
				url: '/iconCaseDetails?homePageIconId&fontColor&iconName',
				title: '查看修改ICON方案',
				templateUrl: helper.basepath('appBanner/iconCaseDetails.html'),
				resolve: helper.resolveFor('iconCaseDetailCtrls')
			})
			//CMS用户通知
			.state('cms.messageForUser', {
				url: '/messageForUser',
				title: 'CMS用户通知',
				templateUrl: helper.basepath('messageForUser/messageForUser.html'),
				resolve: helper.resolveFor('messageForUserCtrl')
			})
			.state('cms.createCodeList', {
				url: '/createCodeList',
				title: '生成记录',
				templateUrl: helper.basepath('code/createCodeList.html'),
				resolve: helper.resolveFor('createCodeListCtrl')
			})
			.state('cms.useCodeList', {
				url: '/useCodeList',
				title: '使用记录',
				templateUrl: helper.basepath('code/useCodeList.html'),
				resolve: helper.resolveFor('useCodeListCtrl')
			})
			.state('cms.codeDetail', {
				url: '/codeDetail/:cdkeyInfoId',
				title: '兑换码详情',
				templateUrl: helper.basepath('code/codeDetail.html'),
				resolve: helper.resolveFor('codeDetailCtrl')
			})
			.state('cms.addCoursesCode', {
				url: '/addCoursesCode',
				title: '生成兑换码-课程',
				templateUrl: helper.basepath('code/addCoursesCode.html'),
				resolve: helper.resolveFor('addCoursesCodeCtrl')
			})
			.state('cms.addMoneyCode', {
				url: '/addMoneyCode',
				title: '生成兑换码-幸会币',
				templateUrl: helper.basepath('code/addMoneyCode.html'),
				resolve: helper.resolveFor('addMoneyCodeCtrl')
			})
			//生成兑换码-会员
			.state('cms.addMemberCode', {
				url: '/addMemberCode',
				title: '生成兑换码-幸会币',
				templateUrl: helper.basepath('code/addMemberCode.html'),
				resolve: helper.resolveFor('addMemberCodeCtrl')
			})
			.state('cms.addCourses', {
				url: '/addCourses',
				title: '添加课程',
				templateUrl: helper.basepath('courses/addCourses.html'),
				resolve: helper.resolveFor('addCoursesCtrl')
			})
			.state('cms.coursesDetial', {
				url: '/coursesDetial/:productId',
				title: '课程详情',
				templateUrl: helper.basepath('courses/coursesDetial.html'),
				resolve: helper.resolveFor('coursesDetialCtrl')
			})
			.state('cms.coursesList', {
				url: '/coursesList',
				title: '课程列表',
				templateUrl: helper.basepath('courses/coursesList.html'),
				resolve: helper.resolveFor('coursesListCtrl')
			})
			.state('cms.moneyList', {
				url: '/moneyList',
				title: '幸会币管理',
				templateUrl: helper.basepath('money/moneyList.html'),
				resolve: helper.resolveFor('moneyListCtrl')
			})
			.state('cms.rechargeList', {
				url: '/rechargeList',
				title: '充值管理',
				templateUrl: helper.basepath('recharge/rechargeList.html'),
				resolve: helper.resolveFor('rechargeListCtrl')
			})
		// CUSTOM RESOLVES
		//   Add your own resolves properties
		//   following this object extend
		//   method
		// ----------------------------------- 
		// .state('app.someroute', {
		//   url: '/some_url',
		//   templateUrl: 'path_to_template.html',
		//   controller: 'someController',
		//   resolve: angular.extend(
		//     helper.resolveFor(), {
		//     // YOUR RESOLVES GO HERE
		//     }
		//   )
		// })
		;

	}
]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function($ocLazyLoadProvider, APP_REQUIRES) {
	'use strict';
	// Lazy Load modules configuration
	$ocLazyLoadProvider.config({
		debug: false,
		events: true,
		modules: APP_REQUIRES.modules
	});
}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
	function($controllerProvider, $compileProvider, $filterProvider, $provide) {
		'use strict';
		// registering components after bootstrap
		App.controller = $controllerProvider.register;
		App.directive = $compileProvider.directive;
		App.filter = $filterProvider.register;
		App.factory = $provide.factory;
		App.service = $provide.service;
		App.constant = $provide.constant;
		App.value = $provide.value;

	}
]).config(['$translateProvider', function($translateProvider) {

	$translateProvider.useStaticFilesLoader({
		prefix: 'app/i18n/',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('zh_CN');
	$translateProvider.useLocalStorage();
	$translateProvider.usePostCompiling(true);

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.includeSpinner = false;
	cfpLoadingBarProvider.latencyThreshold = 500;
	cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}]).config(['$tooltipProvider', function($tooltipProvider) {

	$tooltipProvider.options({
		appendToBody: true
	});

}]);

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
	.constant('APP_COLORS', {
		'primary': '#5d9cec',
		'success': '#27c24c',
		'info': '#23b7e5',
		'warning': '#ff902b',
		'danger': '#f05050',
		'inverse': '#131e26',
		'green': '#37bc9b',
		'pink': '#f532e5',
		'purple': '#7266ba',
		'dark': '#3a3f51',
		'yellow': '#fad732',
		'gray-darker': '#232735',
		'gray-dark': '#3a3f51',
		'gray': '#dde6e9',
		'gray-light': '#e4eaec',
		'gray-lighter': '#edf1f2'
	})
	.constant('APP_MEDIAQUERY', {
		'desktopLG': 1200,
		'desktop': 992,
		'tablet': 768,
		'mobile': 480
	})
	.constant('APP_REQUIRES', {
		// jQuery based and standalone scripts
		scripts: {
			'modernizr': ['vendor/modernizr/modernizr.js'],
			'icons': ['vendor/fontawesome/css/font-awesome.min.css',
				'vendor/simple-line-icons/css/simple-line-icons.css'
			],
			'whirl': ['vendor/whirl/dist/whirl.css'],
			'photoZoom': [
				/* picture assets */
				'vendor/fancybox/lib/jquery.mousewheel-3.0.6.pack.js',
				'vendor/fancybox/source/jquery.fancybox.js',
				'vendor/fancybox/source/jquery.fancybox.pack.js',
				'vendor/fancybox/source/jquery.fancybox.css',
				'vendor/fancybox/source/helpers/jquery.fancybox-buttons.css',
				'vendor/fancybox/source/helpers/jquery.fancybox-buttons.js'
			],
			'chartjs': ['vendor/Chart.js/Chart.js']
		},
		// Angular based script (use the right module name)
		modules: [{
			name: 'ngDialog',
			files: ['vendor/ngDialog/js/ngDialog.min.js',
				'vendor/ngDialog/css/ngDialog.min.css',
				'vendor/ngDialog/css/ngDialog-theme-default.min.css',
				'vendor/ngDialog/css/ngDialog-theme-default-big.css']
			}, {
				name: 'angularTreeControl',
				files: [
					'vendor/angular-tree-control/tree-control.css',
					'vendor/angular-tree-control/tree-control-attribute.css'
				]
		}],
		/* controllers  */
		controllers: [{
				name: 'AppController',
				files: ['app/js/controllers/AppController.js']
			}, {
				name: 'SidebarController',
				files: ['app/js/controllers/sidebar-menu.js']
			}, {
				name: 'cmsUserManageCtrl',
				files: ['app/js/controllers/cmsUser/cmsUserManageCtrl.js']
			}, {
				name: 'interfaceManageCtrl',
				files: ['app/js/controllers/interface/interfaceManageCtrl.js']
			}, {
				name: 'roleManageCtrl',
				files: ['app/js/controllers/role/roleManageCtrl.js']
			}, {
				name: 'columnManageCtrl',
				files: ['app/js/controllers/column/columnManageCtrl.js']
			}, {
				name: 'loginCtrl',
				files: ['app/js/controllers/login/loginCtrl.js']
			}, {
				name: 'cmsSectionManageCtrl',
				files: ['app/js/controllers/cmsSection/cmsSectionManageCtrl.js']
			}, {
				/*=================================
				 * 
				 * 
				 * =================================
				 * */
				name: 'adviceListCtrl',
				files: ['app/js/controllers/advice/adviceListCtrl.js']
			}, {
				name: 'adviceDetailCtrl',
				files: ['app/js/controllers/advice/adviceDetailCtrl.js']
			}, {
				name: 'paramsListCtrl',
				files: ['app/js/controllers/params/paramsListCtrl.js']
			}, {
				name: 'paramsDetailCtrl',
				files: 　['app/js/controllers/params/paramsDetailCtrl.js']
			}, {
				name: 'mobileUserManageCtrl',
				files: 　['app/js/controllers/mobileUser/mobileUserManageCtrl.js']
			}, {
				name: 'mobileUserDetailCtrl',
				files: 　['app/js/controllers/mobileUser/mobileUserDetailCtrl.js']
			}, {
				name: 'userDetailCtrl',
				files: 　['app/js/controllers/mobileUser/userDetailCtrl.js']
			}
			, {
				name: 'addMobileUserCtrl',
				files: 　['app/js/controllers/mobileUser/addMobileUserCtrl.js']
			},
			{
				name: 'statisticsInfoCtrl',
				files: ['app/js/controllers/statistics/statisticsInfoCtrl.js']
			},
			{
				name: 'productBuyCtrl',
				files: ['app/js/controllers/productBuy/productBuyCtrl.js']
			},{
				name: 'updateCmsUserPassWordCtrl',
				files: ['app/js/controllers/cmsUser/updateCmsUserPassWordCtrl.js']
			}, {
				/*=================================
				 *
				 *
				 * =================================
				 * */
				name: 'topicListCtrl',
				files: ['app/js/controllers/topic/topicListCtrl.js']
			}, {
				name: 'topicDetailCtrl',
				files: ['app/js/controllers/topic/topicDetailCtrl.js']
			}, {
				name: 'topicDetail1Ctrl',
				files: ['app/js/controllers/topic/topicDetail1Ctrl.js']
			}
			, {
				name: 'addTopicCtrl',
				files: ['app/js/controllers/topic/addTopicCtrl.js']
			}, {
				name: 'contestListCtrl',
				files: ['app/js/controllers/contest/contestListCtrl.js']
			}, {
				name: 'contestDetailCtrl',
				files: ['app/js/controllers/contest/contestDetailCtrl.js']
			}, {
				name: 'contestDetail1Ctrl',
				files: ['app/js/controllers/contest/contestDetail1Ctrl.js']
			}
			, {
				name: 'addContestCtrl',
				files: ['app/js/controllers/contest/addContestCtrl.js']
			}, {
				name: 'masterCtrl',
				files: ['app/js/controllers/master/masterCtrl.js']
			}, {//影响力管理
				name: 'yxlCtrl',
				files: ['app/js/controllers/yxl/yxlCtrl.js']
			},{//新建影响力管理
				name: 'addYxlCtrl',
				files: ['app/js/controllers/yxl/addYxlCtrl.js']
			},
			{//cms首页
				name: 'homePageCtrl',
				files: ['app/js/controllers/homePage/homePageCtrl.js']
			},{//日课老师
				name: 'classTeacherCtrl',
				files: ['app/js/controllers/classTeacher/classTeacherCtrl.js']
			},
			{//日课列表
				name: 'classListCtrl',
				files: ['app/js/controllers/classTeacher/classListCtrl.js']
			},
			{//老师收入情况
				name: 'incomeSituationCtrl',
				files: ['app/js/controllers/classTeacher/incomeSituationCtrl.js']
			},
			{//学习情况统计
				name: 'studySituationCtrl',
				files: ['app/js/controllers/studySituation/studySituationCtrl.js']
			},{//会员管理
				name: 'memberManageCtrl',
				files: ['app/js/controllers/memberManage/memberManageCtrl.js']
			},{//结算通知
				name: 'accountCtrl',
				files: ['app/js/controllers/account/accountCtrl.js']
			},{//发票管理
				name: 'invoiceCtrl',
				files: ['app/js/controllers/account/invoiceCtrl.js']
			},{//发票详情
				name: 'invoiceDetailCtrl',
				files: ['app/js/controllers/account/invoiceDetailCtrl.js']
			},{//文章管理
				name: 'articleCtrl',
				files: ['app/js/controllers/article/articleCtrl.js']
			},{//非列表文章管理
				name: 'articleNotListCtrl',
				files: ['app/js/controllers/article/articleNotListCtrl.js']
			},{//未审文章
				name: 'unauditedArticleCtrl',
				files: ['app/js/controllers/article/unauditedArticleCtrl.js']
			},{//已审投稿
				name: 'reviewedArticleCtrl',
				files: ['app/js/controllers/article/reviewedArticleCtrl.js']
			},{//文章预览
				name: 'articlePreviewCtrl',
				files: ['app/js/controllers/article/articlePreviewCtrl.js']
			},{//文章编辑
				name: 'editorArticleCtrl',
				files: ['app/js/controllers/article/editorArticleCtrl.js']
			},{//文章编辑详情
				name: 'editorArticleDetailsCtrl',
				files: ['app/js/controllers/article/editorArticleDetailsCtrl.js']
			},{//评论管理
				name: 'discussCtrl',
				files: ['app/js/controllers/article/discussCtrl.js']
			},{//文章评论详情
				name: 'discussDetailsCtrl',
				files: ['app/js/controllers/article/discussDetailsCtrl.js']
			},{//结算详情
				name: 'accountDetailCtrl',
				files: ['app/js/controllers/account/accountDetailCtrl.js']
			},{//分享赚币
				name: 'shareMakeMoneyCtrl',
				files: ['app/js/controllers/share/shareMakeMoneyCtrl.js']
			},{//搜索管理
				name: 'selectCtrl',
				files: ['app/js/controllers/select/selectCtrl.js']
			},{
				name: 'blackListCtrl',
				files: ['app/js/controllers/blackList/blackListCtrl.js']
			}, {
				name: 'fieldCtrl',
				files: ['app/js/controllers/field/fieldCtrl.js']
			}, {
				name: 'versionUpdateCtrl',
				files: ['app/js/controllers/versionUpdate/versionUpdateCtrl.js']
			}, {
				name: 'hotContestCtrl',
				files: ['app/js/controllers/hot/hotContestCtrl.js']
			}, {
				name: 'hotTopicCtrl',
				files: ['app/js/controllers/hot/hotTopicCtrl.js']
			}, {
				name: 'reallyDeleteContestCtrl',
				files: ['app/js/controllers/reallyDelete/reallyDeleteContestCtrl.js']
			}, {
				name: 'reallyDeleteTopicCtrl',
				files: ['app/js/controllers/reallyDelete/reallyDeleteTopicCtrl.js']
			}, {//文章删除
				name: 'reallyDeleteArticleCtrl',
				files: ['app/js/controllers/reallyDelete/reallyDeleteArticleCtrl.js']
			}, {
				name: 'foldCtrl',
				files: ['app/js/controllers/fold/foldCtrl.js']
			}, {
				name: 'foldDetailCtrl',
				files: ['app/js/controllers/fold/foldDetailCtrl.js']
			}, {
				name: 'reportCtrl',
				files: ['app/js/controllers/report/reportCtrl.js']
			}, {
				name: 'reportDetailCtrl',
				files: ['app/js/controllers/report/reportDetailCtrl.js']
			}, {
				name: 'systemMessageCtrl',
				files: ['app/js/controllers/systemMessage/systemMessageCtrl.js']
			}, {
				name: 'alreadySentCtrl',
				files: ['app/js/controllers/alreadySent/alreadySentCtrl.js']
			}, {
				name: 'userMessageCtrl',
				files: ['app/js/controllers/userMessage/userMessageCtrl.js']
			}, {
				name: 'sensitiveCtrl',
				files: ['app/js/controllers/sensitive/sensitiveCtrl.js']
			}, {
				name: 'appBannerListCtrl',
				files: ['app/js/controllers/appBanner/appBannerListCtrl.js']
			},{
				name: 'appAdCtrl',
				files: ['app/js/controllers/appBanner/appAdCtrl.js']
			},
			//首页弹窗
			{
				name: 'popupCtrl',
				files: ['app/js/controllers/appBanner/popupCtrl.js']
			},
			//首页ICON方案
			{
				name: 'iconCaseCtrl',
				files: ['app/js/controllers/appBanner/iconCaseCtrl.js']
			},
			//编辑ICON方案
			{
				name: 'iconCaseDetailCtrl',
				files: ['app/js/controllers/appBanner/iconCaseDetailCtrl.js']
			},
			//查看修改ICON方案
			{
				name: 'iconCaseDetailCtrls',
				files: ['app/js/controllers/appBanner/iconCaseDetailCtrls.js']
			},
			//CMS用户通知
			{
				name: 'messageForUserCtrl',
				files: ['app/js/controllers/messageForUser/messageForUserCtrl.js']
			},
			{
				name: 'addCoursesCodeCtrl',
				files: ['app/js/controllers/code/addCoursesCodeCtrl.js']
			}, {
				name: 'addMoneyCodeCtrl',
				files: ['app/js/controllers/code/addMoneyCodeCtrl.js']
			}, {//生成兑换码-会员
				name: 'addMemberCodeCtrl',
				files: ['app/js/controllers/code/addMemberCodeCtrl.js']
			}, {
				name: 'codeDetailCtrl',
				files: ['app/js/controllers/code/codeDetailCtrl.js']
			}, {
				name: 'createCodeListCtrl',
				files: ['app/js/controllers/code/createCodeListCtrl.js']
			}, {
				name: 'useCodeListCtrl',
				files: ['app/js/controllers/code/useCodeListCtrl.js']
			}, {
				name: 'addCoursesCtrl',
				files: ['app/js/controllers/courses/addCoursesCtrl.js']
			}, {
				name: 'coursesDetialCtrl',
				files: ['app/js/controllers/courses/coursesDetialCtrl.js']
			}, {
				name: 'coursesListCtrl',
				files: ['app/js/controllers/courses/coursesListCtrl.js']
			}, {
				name: 'moneyListCtrl',
				files: ['app/js/controllers/money/moneyListCtrl.js']
			}, {
				name: 'rechargeListCtrl',
				files: ['app/js/controllers/recharge/rechargeListCtrl.js']
			}
		],



		/* directives */
		directives: [{
			name: 'sidebar',
			files: ['app/js/directives/sidebar/sidebar.js']
		}, {
			name: 'searchOpen',
			files: ['app/js/directives/search-top/searchOpen.js',
				'app/js/directives/search-top/searchDismiss.js'
			]
		}, {
			name: 'toggleState',
			files: ['app/js/directives/toggle-state/toggle-state.js']
		}, {
			name: 'errSrc',
			files: ['app/js/directives/img_error/img_error.js']
		},
		{
			name: 'Chart',
			files: ['app/js/directives/chart/chart.js']
		},
		{
			name: 'filter',
			files: ['app/js/directives/filter/interfaceFilter.js',
				'app/js/directives/filter/nullFilter.js',
				'app/js/directives/filter/params_filter.js',
				'app/js/directives/filter/roleFilter.js',
				'app/js/directives/filter/roleProterty.js',
				'app/js/directives/filter/limitToNumFilter.js',
				'app/js/directives/filter/booleanFilter.js'
			]
		}]

	});

/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

App.factory('colors', ['APP_COLORS', function(colors) {

	return {
		byName: function(name) {
			return (colors[name] || '#fff');
		}
	};

}]);

/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document) {

	var containers = {},
		messages = {},

		notify = function(options) {

			if ($.type(options) == 'string') {
				options = {
					message: options
				};
			}

			if (arguments[1]) {
				options = $.extend(options, $.type(arguments[1]) == 'string' ? {
					status: arguments[1]
				} : arguments[1]);
			}

			return (new Message(options));
		},
		closeAll = function(group, instantly) {
			if (group) {
				for (var id in messages) {
					if (group === messages[id].group) messages[id].close(instantly);
				}
			} else {
				for (var id in messages) {
					messages[id].close(instantly);
				}
			}
		};

	var Message = function(options) {

		var $this = this;

		this.options = $.extend({}, Message.defaults, options);

		this.uuid = "ID" + (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000));
		this.element = $([
			// @geedmo: alert-dismissable enables bs close icon
			'<div class="uk-notify-message alert-dismissable">',
			'<a class="close">&times;</a>',
			'<div>' + this.options.message + '</div>',
			'</div>'

		].join('')).data("notifyMessage", this);

		// status
		if (this.options.status) {
			this.element.addClass('alert alert-' + this.options.status);
			this.currentstatus = this.options.status;
		}

		this.group = this.options.group;

		messages[this.uuid] = this;

		if (!containers[this.options.pos]) {
			containers[this.options.pos] = $('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo('body').on("click", ".uk-notify-message", function() {
				$(this).data("notifyMessage").close();
			});
		}
	};

	$.extend(Message.prototype, {

		uuid: false,
		element: false,
		timout: false,
		currentstatus: "",
		group: false,

		show: function() {

			if (this.element.is(":visible")) return;

			var $this = this;

			containers[this.options.pos].show().prepend(this.element);

			var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

			this.element.css({
				"opacity": 0,
				"margin-top": -1 * this.element.outerHeight(),
				"margin-bottom": 0
			}).animate({
				"opacity": 1,
				"margin-top": 0,
				"margin-bottom": marginbottom
			}, function() {

				if ($this.options.timeout) {

					var closefn = function() {
						$this.close();
					};

					$this.timeout = setTimeout(closefn, $this.options.timeout);

					$this.element.hover(
						function() {
							clearTimeout($this.timeout);
						},
						function() {
							$this.timeout = setTimeout(closefn, $this.options.timeout);
						}
					);
				}

			});

			return this;
		},

		close: function(instantly) {

			var $this = this,
				finalize = function() {
					$this.element.remove();

					if (!containers[$this.options.pos].children().length) {
						containers[$this.options.pos].hide();
					}

					delete messages[$this.uuid];
				};

			if (this.timeout) clearTimeout(this.timeout);

			if (instantly) {
				finalize();
			} else {
				this.element.animate({
					"opacity": 0,
					"margin-top": -1 * this.element.outerHeight(),
					"margin-bottom": 0
				}, function() {
					finalize();
				});
			}
		},

		content: function(html) {

			var container = this.element.find(">div");

			if (!html) {
				return container.html();
			}

			container.html(html);

			return this;
		},

		status: function(status) {

			if (!status) {
				return this.currentstatus;
			}

			this.element.removeClass('alert alert-' + this.currentstatus).addClass('alert alert-' + status);

			this.currentstatus = status;

			return this;
		}
	});

	Message.defaults = {
		message: "",
		status: "normal",
		timeout: 20000,
		group: null,
		pos: 'top-center'
	};

	$["notify"] = notify;
	$["notify"].message = Message;
	$["notify"].closeAll = closeAll;

	return notify;

}(jQuery, window, document));
App.controller('UserBlockController', ['$scope', function($scope) {
	$scope.userBlockVisible = true;

	$scope.$on('toggleUserBlock', function(event, args) {
		$scope.userBlockVisible = !$scope.userBlockVisible;

	});

}]);