(function(){

	angular
		.module("cardsModule")
		.controller("cardsCtrl", cardsCtrl);


		function cardsCtrl(cardList, cardsService){
			var cc = this;
			cc.cardList = cardList.results;
			cc.numOfCards =  cardList.count;
			cc.next = "Next >";
			cc.prev = "< Prev";
			cc.page = 1;
			cc.pageSize = 5;
			cc.id ="";
			
			cc.sort = "grade";
			cc.sortDirection = "desc";

			cc.changeGrade = function(card, param){
				if(param == -1){
					card.grade -=1; 
				}else{
					card.grade +=1;
				}
				cardsService.update({id:card._id}, card).$promise;
			}
			cc.changePage = function(param){
				
				cc.numOfPages = Math.ceil(cc.numOfCards/cc.pageSize);

				if(param == -1 && cc.page == 1){
					cc.page = 1;
				}else if(cc.page == (cc.numOfPages) && param == 1){
					cc.page = cc.numOfPages;
				}else {
					cc.page +=param;
				}
				getCards();
			}
			cc.changePageSize = function(param){

				cc.pageSize = param;
				cc.page = 1;
				getCards();
			}
			cc.loadComments = function(id){
				cc.id = id;
				getComments();
				
			}
			cc.saveComment = function(){
				
				cardsService.save({id : cc.id , comments: "comments"}, cc.newComment).$promise;
				cc.newComment = {};
				getComments();

			
			}

			function getComments(){
				
				cardsService.get({id : cc.id , comments: "comments"}).$promise.then(function(data){
					cc.comments = data.results;
					
				});
			}


			function getCards(){

				var params = {
					page : cc.page,
					pageSize : cc.pageSize,
					sort : cc.sort,
					sortDirection : cc.sortDirection

				}

				cardsService.get(params).$promise.then(function(data){
				cc.cardList = data.results;	
				});

			}







		}

})();