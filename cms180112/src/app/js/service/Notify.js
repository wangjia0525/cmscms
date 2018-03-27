
/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

App.service('Notify', ["$timeout", function($timeout) {
	this.alert = alert;

	function alert(msg, opts) {
		if (!msg) {
			msg = '<i class="fa fa-check fa-2"></i>  操作成功！'
		}
		$.notify(msg, opts || {
			status 	: 'success',
			timeout : 1000,
			pos		: 'top-right'
		}).show();
	}
	this.copy = copy;

	function copy(msg, opts) {
		if (!msg) {
			msg = '<i class="fa fa-check fa-2"></i>  复制成功！'
		}
		$.notify(msg, opts || {
			status 	: 'success',
			timeout : 1000,
			pos		: 'top-right'
		}).show();
	}
}]);