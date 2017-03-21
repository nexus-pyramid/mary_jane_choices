app.factory('deliveryFactory', ['$http', function($http){

	function UserFactory(){

		this.register = function(userInfo, callback){
			$http.post('/register', userInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.login = function(userInfo, callback){
			$http.post('/login', userInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.getLoggedUser = function(callback){
			$http.get('/loggeduser').then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			})
		}
	}
	return new UserFactory();
}]);
