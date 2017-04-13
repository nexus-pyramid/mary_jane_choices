app.factory('UserFactory', ['$http', function($http){

	function UserFactory(){

		this.register = function(userInfo, callback){
			$http.post('/register', userInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.addUser = function(userData, cityId, callback){
			$http.post('/user/'+cityId, userData, cityId).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.userLogin  = function(userInfo, callback){
			$http.post('/user', userInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			})
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
		this.logout = function(callback){
			$http.get('/logout').then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			})
		}
	}
	return new UserFactory();
}]);
