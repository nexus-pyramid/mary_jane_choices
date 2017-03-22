app.factory('deliveryFactory', ['$http', function($http){

	function deliveryFactory(){

		this.addDelivery = function(formData, cityId,  callback){
			$http.post('/delivery/'+cityId, formData, cityId).then(function(returned_data){
				if(typeof(callback) == 'function'){
					console.log('in the register method');
					console.log(returned_data.data);
					callback(returned_data.data);
				}
			});
		}
		this.getDeliveries = function(callback){
			$http.get('/getDeliveries').then(function(returned_data){
				callback(returned_data.data);
			});
		}
		this.getCities = function(callback){
			$http.get('/getCities').then(function(returned_data){
				callback(returned_data.data);
			});
		}
		this.show = function(id, callback){
			$http.get('/show/'+id, id).then(function(returned_data){
				callback(returned_data.data);
			})
		}
		this.getFlowers = function(callback){
			$http.get('/flowers').then(function(returned_data){
				callback(returned_data.data);
			});
		}

		this.addFlower = function(flowerInfo, callback){
			$http.post('/flower', flowerInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					console.log(returned_data.data);
					callback(returned_data.data);
				}
			});
		}
		this.login = function(delivery_serviceInfo, callback){
			$http.post('/login', delivery_serviceInfo).then(function(returned_data){
				if(typeof(callback) == 'function'){
					console.log(returned_data.data);
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
	return new deliveryFactory();
}]);
