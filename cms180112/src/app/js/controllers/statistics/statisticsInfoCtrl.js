/**
 *@description 统计数据的controller 
 */
App
	.controller('statisticsInfoCtrl', function($scope, colors, $rootScope, StatisticsFactory, mdFactory, CmsSectionFactory) {
		/* 为service写的回调方法，保证service回传的model可以传递给controller */
		$scope.getStatisticsInfoCallback = function(data) {
			$scope.statisticsInfo = data;
			$scope.loading=false;
			//console.log(data)
			$scope.getChartData($scope.statisticsInfo);
		};
		// var cmsSectionListCallback = function(data) {
		// 		var cmsSectionList = data.sectionList
		// 		cmsSectionList.unshift({
		// 			sectionId: 0,
		// 			name: '全部'
		// 		})
		// 		$scope.rootSections = cmsSectionList;
		// 		$scope.rootSection = mdFactory.getSection($scope.rootSections, $rootScope.rootSectionId);

		// 	}
			
		// var getCmsSections = function() {
		// 	CmsSectionFactory.getCmsSectionList({},
		// 		cmsSectionListCallback
		// 	);
		// };
		//getCmsSections();
		//
		/*
		 时间框
		 * */
		$scope.today = function() {
			$scope.dt = mdFactory.getStringByDate(new Date());
		};
		$scope.today();

		$scope.clear = function() {
			$scope.dt = null;
		};

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};
		$scope.finalBeginDate = {
			opened: false,
			date:mdFactory.getStringByDate(mdFactory.addDate(new Date(),-6,"day"))
		};
		$scope.finalEndDate = {
			opened: false,
			date:mdFactory.getStringByDate(new Date())
		};
		$scope.openFinalBeginDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.finalBeginDate.opened = true;
		};
		$scope.openFinalEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.finalEndDate.opened = true;
		};
		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.format = 'yyyy-MM-dd';

		//

		/* 获取统计数据 */
		$scope.fetchData = function() {
			if (typeof($scope.finalBeginDate.date) != "string") {
				$scope.finalBeginDate.date = mdFactory.getStringByDate($scope.finalBeginDate.date);
			}
			if (typeof($scope.finalEndDate.date) != "string") {
				$scope.finalEndDate.date = mdFactory.getStringByDate($scope.finalEndDate.date);
			}
			$scope.loading=true;
			StatisticsFactory.getStatisticsInfo({
					endDate:$scope.finalBeginDate.date,
					startDate: $scope.finalEndDate.date
				},
				$scope.getStatisticsInfoCallback
			);
		};
		$scope.fetchData();
		$scope.dataChange = function() {
			$scope.fetchData();
		};

		
		$scope.getChartData = function(_statisticsInfo_) {

			// dayLoginCount	         是 int[]	每日登陆人数统计
			// dayTopicCount	         是	int[]	每日新话题数量
			// dayArenaCount	         是	int[]	每日新擂台数量
			// dayTopicFavoriteCount	 是	int[]	新话题关注数量
			// dayArenaFavoriteCount	 是	int[]	新擂台关注数量
			var date_labels = [];
			var beginDate = mdFactory.getDateByString($scope.finalBeginDate.date);
			var tmpDate = beginDate;
			var date_cha = mdFactory.DateDiff($scope.finalEndDate.date,$scope.finalBeginDate.date);
			for (var i = 0; i < date_cha+1; i++) {
				date_labels.push( (tmpDate.getMonth()-0+1)+"."+tmpDate.getDate() );
				tmpDate = mdFactory.addDate(tmpDate,1,"day");
			};

			$scope.barData_dayLoginCount_title = "每日登陆人数统计";
			$scope.barData_dayLoginCount = {
				labels: date_labels,
				datasets: [{
					fillColor: colors.byName('info'),
					strokeColor: colors.byName('info'),
					highlightFill: colors.byName('info'),
					highlightStroke: colors.byName('info'),
					data: _statisticsInfo_.dayLoginCount
				}]
			};
			$scope.barData_dayTopicCount_title = "每日新话题数量";
			$scope.barData_dayTopicCount = {
				labels: date_labels,
				datasets: [{
					fillColor: colors.byName('danger'),
					strokeColor: colors.byName('danger'),
					highlightFill: colors.byName('danger'),
					highlightStroke: colors.byName('danger'),
					data: _statisticsInfo_.dayTopicCount
				}]
			};
			$scope.barData_dayArenaCount_title = "每日新擂台数量";
			$scope.barData_dayArenaCount = {
				labels: date_labels,
				datasets: [{
					fillColor: colors.byName('pink'),
					strokeColor: colors.byName('pink'),
					highlightFill: colors.byName('pink'),
					highlightStroke: colors.byName('pink'),
					data: _statisticsInfo_.dayArenaCount
				}]
			};
			$scope.barData_dayTopicFavoriteCount_title = "新话题关注数量";
			$scope.barData_dayTopicFavoriteCount = {
				labels: date_labels,
				datasets: [{
					fillColor: colors.byName('purple'),
					strokeColor: colors.byName('purple'),
					highlightFill: colors.byName('purple'),
					highlightStroke: colors.byName('purple'),
					data: _statisticsInfo_.dayTopicFavoriteCount
				}]
			};
			$scope.barData_dayArenaFavoriteCount_title = "新擂台关注数量";
			$scope.barData_dayArenaFavoriteCount = {
				labels: date_labels,
				datasets: [{
					fillColor: colors.byName('green'),
					strokeColor: colors.byName('green'),
					highlightFill: colors.byName('green'),
					highlightStroke: colors.byName('green'),
					data: _statisticsInfo_.dayArenaFavoriteCount
				}]
			};
		};

		$scope.barOptions = {
			scaleBeginAtZero: true,
			scaleShowGridLines: true,
			scaleGridLineColor: 'rgba(0,0,0,.05)',
			scaleGridLineWidth: 1,
			barShowStroke: true,
			barStrokeWidth: 0.5,
			barValueSpacing: 20,
			barDatasetSpacing: 0.5
		};
	});