(function(){

	angular
		.module("sharedModule")
		.directive("showMore", showMore);


		function showMore(){

			return {
				restrict : "E",
				template : "{{short}}<a ng-hide ='showfull' ng-click='fullLength()'> Show more>></a><a ng-show ='showfull' ng-click='shortLength()'> Show les>></a>",
				scope : {
					text : "="
				},
				link : function(scope){
					if(scope.text.length > 130 ){
						scope.short = scope.text.slice(0, 130);
					}else{
						scope.short = scope.text;
					}

					scope.fullLength = function(){
						scope.short = scope.text;
						scope.showfull = true; 
					}
					scope.shortLength = function(){
						scope.short = scope.text.slice(0, 130);
						scope.showfull = false;
					}
				} 
			}
		}



})();