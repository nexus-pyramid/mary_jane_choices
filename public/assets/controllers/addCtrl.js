var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, deliveryFactory, UserFactory, $location, $routeParams){
  // $scope.formData = {};

  var coords = {};
  var lat = 0;
  var long = 0;
  $scope.errors = [];
  function getCities(){
    deliveryFactory.getCities(function(data){
      $scope.cities = data;
      console.log(data);
    })
  }getCities();
  function getDeliveries(){
    deliveryFactory.getDeliveries(function(data){
      console.log('getting deliveries')
      $scope.deliveries = data;
      console.log(data);
    })
  }getDeliveries();
  function getFlowers(){
    deliveryFactory.getFlowers(function(data){
      $scope.flowers = data;
      console.log(data);
    })
  }getFlowers

  console.log("add controller")
  function getdelivery(){
    console.log("get delivery ran");
    console.log($routeParams.id);
    deliveryFactory.show($routeParams.id, function(data){
      console.log('helllppp')
      $scope.delivery = data;
      console.log(data)
      console.log($routeParams._id)
    });
  }getdelivery();

  $scope.show = function(){
    deliveryFactory.show($scope.delivery._id, $scope.delivery, function(data){
      console.log(data + " helloooooo");
      if(data['errors']){
      $scope.errors.push(data['errors']);
      } else{
        console.log(data);
        $location.url('/show/'+deliveryId);
      }
    });
  }
  $scope.login = function(){
    deliveryFactory.login($scope.delivery_serviceInfo, function(data){
      console.log("in the loginmethod")
      $scope.errors = [];
      if(data['errors']){
        $scope.errors.push(data['errors']);
      }
      else {
       $scope.loginfo = '';
       $location.url('/success');
     }
   });
 }
 $scope.addReview = function(newReview, deliveryId){
   console.log(deliveryId);
   console.log(newReview);
   deliveryFactory.addReview(newReview, deliveryId, function(data){
     if(data['errors']){
       $scope.errors.push(data['errors']);
     } else {

       getReviews();
     }
   })
 }
 $scope.visitDelivery = function(delivery, deliveryId){
   console.log('hey in the visit delivery');
   console.log(deliveryId)
   console.log(delivery);
   deliveryFactory.visit(deliveryId, function(data){
     if(data['errors']){
       $scope.errors.push(data['errors'])
     } else {
       $scope.delivery = data;
       console.log(data);
       $location.url('/delivery/'+deliveryId);
     }
   })
  }

$scope.createDelivery = function() {

  var deliveryData =  {
  	name: $scope.formData.name,
  	phone: $scope.formData.phone,
  	bio: $scope.formData.bio,
  	email: $scope.formData.email,
  	location: [$scope.formData.longitude, $scope.formData.latitude]
  }
  $http.post('/register', deliveryData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.name = "";
                $scope.formData.phone = "";
                $scope.formData.bio = "";
                $scope.formData.email = "";

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
  }
  $scope.addUser  = function(userData, cityId){
    UserFactory.addUser(userData, cityId, function(data){
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
        $location.url('/deliveries');
      }
    })
  }
  $scope.addDelivery = function(formData, cityId){
    // var formData =  {
    // 	name: $scope.formData.name,
    // 	phone: $scope.formData.phone,
    // 	bio: $scope.formData.bio,
    // 	email: $scope.formData.email,
    //   street_address: $scope.formData.street_address,
    //   password: $scope.formData.password,
    // 	location: [$scope.formData.longitude, $scope.formData.latitude]
    // };
  		console.log(formData, cityId);
  		deliveryFactory.addDelivery(formData, cityId, function(data){
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
    // deliveryFactory.show($routeParams.id, function(data){
    //   console.log($routeParams.id);
    //   console.log('i spy ');
    //   $scope.delivery = data;
    //   console.log(data)
    // });
    // deliveryFactory.show($routeParams._id, function(delivery){
    //   console.log(delivery);
    //   console.log($scope.delivery);
    //   $scope.delivery = delivery;
    // });
    // $scope.show = function(){
    //   deliveryFactory.show($scope.delivery._id, $scope.delivery, function(data){
    //     console.log(data + " helloooooo");
    //     if(data['errors']){
		// 		$scope.errors.push(data['errors']);
		// 		} else{
    //       console.log(data);
		// 			$location.url('/show/'+deliveryId);
		// 		}
    //   });
    // }
    // $(function(){
    //   $('#register-delivery').hide();
    //   $('#register-user').hide();
    //   $('#user-reg').click( function() {
    //     $('#register-user').show();
    //   });
    // $('#delivery-reg').click( function() {
    //   $('#register-delivery').show();
    // });
    // })
})
