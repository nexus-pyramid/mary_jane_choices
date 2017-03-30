app.factory('doctorFactory', ['$http', function($http){

	function doctorFactory(){

		this.register = function(userInfo, callback){
			$http.post('/register', userInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.getDoctors = function(callback){
			console.log('getting dispensaries');
			$http.get('/getDoctors').then(function(returned_data){
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
	return new doctorFactory();
}]);
