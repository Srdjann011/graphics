(function(){

	angular
		.module("cardsModule")
		.config(Config);


		function Config($stateProvider){
			$stateProvider
				.state("main.cards", {
					url : "/cards",
					views : {
						"content@" : {
							templateUrl : "app/components/cards/view.cards.html",
							controller : "cardsCtrl",
							controllerAs : "cc",
							resolve : {
								cardList : getCardList
							}
						} 
					}
				});

			function getCardList(cardsService){
				
				var params = {
					page : 1,
					pageSize : 5,
					sort: "grade",
					sortDirection: "desc"
				}



				return cardsService.get(params).$promise;

			}

		}


})();