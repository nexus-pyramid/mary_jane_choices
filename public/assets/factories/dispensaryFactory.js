app.factory('dispensaryFactory', ['$http', function($http){

	function dispensaryFactory(){

		this.register = function(userInfo, callback){
			$http.post('/register', userInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.getDisp = function(callback){
			console.log('getting dispensaries');
			$http.get('/getDispensaries').then(function(returned_data){
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
	return new dispensaryFactory();
}]);
