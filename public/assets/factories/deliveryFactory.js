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
		this.checkAdmin = function(admin, callback){
			console.log('int the check admin function')
			$http.post('/admin', admin).then(function(returned_data){
				if(typeof(callback) == 'function');{
					callback(returned_data.data);
				}
			})
		}
		this.addLocation = function(info, callback){
			$http.post('/addLocation', info).then(function(returned_data){
				if(typeof(callback) == 'function');{
					callback(returned_data.data);
				}
			})
		}
		this.unverified = function(callback){
			$http.get('/getUnverified').then(function(returned_data){
				callback(returned_data.data);
			})
		}
		this.validate = function(delivery, callback){
			$http.post('/validate', delivery).then(function(returned_data){
				callback(returned_data.data);	
			});
		}
		this.getfeatured = function(coords, callback){
			$http.post('/getfeatured', coords).then(function(returned_data){
				callback(returned_data.data);
			})
		}
		this.apply = function(apply, callback){
			$http.post('/apply', apply).then(function(returned_data){
				if(typeof(callback) == 'function');{
					callback(returned_data.data);
				}
			});
		}
		this.getLogged = function(callback){
			$http.get('/getlogged').then(function(returned_data){
				callback(returned_data);
			});
		}
		this.editPassword = function(editbusiness, callback){
			$http.post('/password', editbusiness).then(function(returned_data){
			callback(returned_data.data);	
			});
		}
		this.sendCoords = function(coords, callback){
			$http.get('/sendCoords').then(function(returned_data){
				callback(returned_data.data);
			})
		}
		this.showProducts = function(id,callback){
			$http.get('/showProducts/'+id).then(function(returned_data){
				callback(returned_data.data)
			})
		}
		this.logout = function(callback){
			$http.get('/logout').then(function(returned_data){
				callback(returned_data)
			})
		}
		this.unfeatured = function(callback){
		$http.get('/unfeatured').then(function(returned_data){
				callback(returned_data.data)
			})	
		}
		this.getDisp = function(callback){
			$http.get('/getDisp').then(function(returned_data){
				if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}
		this.featureBusiness = function(buss, callback){
			console.log(buss)
			$http.post('/feature',buss).then(function(returned_data){
				callback(returned_data.data);
			});	
		}
		this.alldocs = function(callback){
		$http.get('/alldocs').then(function(returned_data){
		if(typeof(callback) == 'function'){
					callback(returned_data.data);
				}	
		})
		}
		this.deleteBusiness = function(businessId, callback){
		$http.post('/deleteBusiness/'+businessId).then(function(returned_data){
				callback(returned_data.data);
			});	
		}
		this.getAll = function(callback){
			$http.get('/getAll').then(function(returned_data){
				callback(returned_data.data);
			});
		}
		this.allthings = function(callback){
			$http.get('/everything').then(function(returned_data){
				console.log(returned_data)
				callback(returned_data.data);
			})
		}
		this.getDels = function(callback){
		$http.get('/getDels').then(function(returned_data){
			if(typeof(callback) == 'function'){
						callback(returned_data.data);
					}	
			})
		}
		this.getDeliveries = function( callback){
			$http.get('/getDeliveries').then(function(returned_data){
				callback(returned_data);
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
				callback(returned_data.data);
			});
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
		this.addReview = function(newReview, deliveryId, userId, callback){
			$http.post('/review/'+deliveryId, newReview, userId).then(function(returned_data){
				callback(returned_data.data);
			})
		}
		this.delete = function(product_id, callback){
			// console.log(product_id)
			$http.post('/delete/'+product_id).then(function(returned_data){
				console.log(returned_data)
				callback(returned_data.data);
			})
		}
		this.search = function(coords, callback){
			$http.post('/search', coords).then(function(returned_data){
				console.log(returned_data);
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
