





App.
	directive('errSrc',[function() {
    	return {
		    link: function(scope, element, attrs) {
		      	element.bind('error', function() {
		        	if (attrs.src != attrs.errSrc) {
			        	
			          	attrs.$set('src', attrs.errSrc);
		        	}
		      	});
		      	if (attrs.src == null || attrs.src == "") {
		          	attrs.$set('src', attrs.errSrc);
		      	};
		    }
		};
}]);