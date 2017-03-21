app.factory('countyFactory', ['$http', function($http){

	function countyFactory(){
    this.getCounties = function(callback){
			$http.get('/getCounties').then(function(returned_data){
				console.log('in the getCounties method');
				console.log(returned_data)
				callback(returned_data.data);
			});
		}
		this.addCounty = function(countyInfo, callback){
			$http.post('/addCounty', countyInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.getCities = function(callback){
			$http.get('/getCities').then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			})
		}
		this.addCity = function(newCity, county_id, callback){
			$http.post('/county/'+county_id+'/cities', newCity).then(function(returned_data){
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
	return new countyFactory();
}]);
