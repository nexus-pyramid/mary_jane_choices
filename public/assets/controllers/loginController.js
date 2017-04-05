// // console.log("in the loginController");
// app.controller('loginController', function($scope, deliveryFactory, UserFactory, $location, geolocation){
// 	$scope.errors = [];
// 	// function getCities(){
//  //    deliveryFactory.getCities(function(data){
//  //      $scope.cities = data;
//  //      console.log(data);
//  //    })
//  //  }getCities();
// 	$scope.login = function(){
// 	  deliveryFactory.login($scope.delivery_serviceInfo, function(data){
// 	    if(data.errors){
// 	    	$scope.errors = data.errors
// 	    }
// 	    else {
// 	    	// $scope.userInfo = {};
// 				console.log(data);
// 				$scope.loggedIn = data
// 				cons
// 				// $scope.loggedIn.type = "business"
// 	      	$location.url('/success');
// 	    }
// 	  });
// 	}
// 	$scope.userLogin = function(){
// 		UserFactory.userLogin($scope.userInfo, function(data){
// 			console.log(data)
// 			if(data.errors){
// 	    		$scope.errors.push(data['errors']);
// 				$scope.userInfo = {};
// 	    	}
// 	    	else {
// 	    		console.log(data)
// 	       		$scope.userInfo = data;
// 	      		$location.url('/deliveries');
// 	    	}
// 		})
// 	}
// });
