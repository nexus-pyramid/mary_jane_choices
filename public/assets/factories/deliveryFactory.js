app.factory('deliveryFactory', ['$http', function($http){

	function deliveryFactory(){

		this.addDelivery = function(formData, cityId,  callback){
			$http.post('/delivery/'+cityId, formData, cityId).then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.deleteDelivery = function(deliveryId, callback){
			$http.post('/deleteDelivery'+deliveryId, deliveryId).then(function(returned_data){
				if(typeof(callback) == 'function');{
					callback(returned_data.data);
				}
			})
		}

		this.getLogged = function(callback){
			$http.get('/getlogged').then(function(returned_data){
				callback(returned_data);
			});
		}
		this.showProducts = function(callback){
			$http.get('/showProducts').then(function(returned_data){
				console.log(returned_data)
				callback(returned_data.data)
			})
		}
		this.logout = function(callback){
			$http.get('/logout').then(function(returned_data){
				callback(returned_data)
			})
		}

		this.getDeliveries = function(callback){
			$http.get('/getDeliveries').then(function(returned_data){
				console.log(returned_data.data)
				callback(returned_data.data);
			});
		}
		this.getCities = function(callback){
			$http.get('/getCities').then(function(returned_data){
				callback(returned_data.data);
			});
		}
		this.show = function(deliveryId, callback){
			$http.get('/show/'+deliveryId).then(function(returned_data){
				callback(returned_data.data);
			});
		}
		this.visit = function(deliveryId, callback){
			$http.post('/visit/'+deliveryId).then(function(returned_data){
				console.log('in the visit delivery');
				callback(returned_data.data);
			})
		}
		this.getFlowers = function(callback){
			$http.get('/flowers').then(function(returned_data){
				callback(returned_data.data);
			});
		}
		this.getReviews = function(callback){
			$http.get('/getReviews').then(function(returned_data){
				callback(returned_data.data)
			})
		}
		this.addReview = function(review, deliveryId, callback){
			$http.post('/review/'+deliveryId, review).then(function(returned_data){
				callback(returned_data.data);
			})
		}

		// this.addFlower = function(flowerInfo, callback){
		// 	$http.post('/flower', flowerInfo).then(function(returned_data){
		// 		if(typeof(callback) == 'function'){
		// 			console.log(returned_data.data);
		// 			callback(returned_data.data);
		// 		}
		// 	});
		// }

		this.login = function(delivery_serviceInfo, callback){
			$http.post('/login', delivery_serviceInfo).then(function(returned_data){
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
	return new deliveryFactory();
}]);
