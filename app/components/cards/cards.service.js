(function(){

	angular
		.module("cardsModule")
		.factory("cardsService", cardsService);


		function cardsService($resource){
			var url = "http://localhost:3000/api/cards/:id/:comments";
			return $resource(url, {id:"@_id"}, {update : {method :"PUT"}});
		}




})();



