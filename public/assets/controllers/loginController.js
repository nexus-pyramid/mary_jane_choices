// console.log("in the loginController");
app.controller('loginController', function($scope, deliveryFactory, UserFactory, $location, geolocation){
	$scope.errors = [];
	function getCities(){
    deliveryFactory.getCities(function(data){
      $scope.cities = data;
      console.log(data);
    })
  }getCities();
	$scope.login = function(){
	  deliveryFactory.login($scope.delivery_serviceInfo, function(data){
			console.log("in the loginmethod")
	    $scope.errors = [];
	    if(data['errors']){
	    $scope.errors.push(data['errors']);
			$scope.userInfo = '';
	    }
	    else {
	       $scope.userInfo = '';
	      $location.url('/success');
	    }
	  });
	}
	$scope.userLogin = function(){
		UserFactory.userLogin($scope.userInfo, function(data){
			console.log("user login method");
			if(data['errors']){
	    $scope.errors.push(data['errors']);
	    }
	    else {
	       $scope.loginfo = '';
	      $location.url('/deliveries');
	    }
		})
	}
// Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;
		$scope.formData.latitude = 39.500;
	  $scope.formData.longitude = -98.350;
var deliveryData =  {
	name: $scope.formData.name,
	phone: $scope.formData.phone,
	bio: $scope.formData.bio,
	_city: $scope.formData.city,
	email: $scope.formData.emal,
	location: [$scope.formData.longitude, $scope.formData.latitude],
  htmlverified: $scope.formData.htmlverified

}
var coords = {};
var lat;
var long;
$scope.addDelivery = function(formData, cityId){
			// console.log($scope.regInfo);
		deliveryFactory.register(formData, cityId, function(data){
		 console.log(formData);
		 console.log(cityId);
			$scope.errors = [];
			if(data['errmsg']){
				$scope.errors.push("email is already registered")
			} if(data['errors']){
				if(typeof(data['errors']) == 'object'){
					for(var key in data['errors']){
						$scope.errors.push(data['errors'][key].message.replace('Path ', ''));
					}
				}else{
					$scope.errors.push(data['errors']);
				}
			  }
			if($scope.errors.length == 0){
				$scope.regInfo = '';
				$location.url('/success');
			}
		});
	}


});
