app.controller('adminController', function($scope, deliveryFactory, countyFactory, $location, Upload){
  function getDeliveries(){
    deliveryFactory.getDeliveries(function(data){
      $scope.deliveries = data;
    })
  }getDeliveries();
  function getFlowers(){
    deliveryFactory.getFlowers(function(data){
      $scope.flowers = data;
      console.log(data);
    });
  }getFlowers();
  function getCounties(){
    countyFactory.getCounties(function(data){
      $scope.counties = data;
      console.log('in the get counties method')
      console.log(data);
    });
  }getCounties();
  function getCities(){
    countyFactory.getCities(function(data){
      $scope.cities = data;
      console.log('getting cities');
      console.log(data);
    })
  }getCities();
  // $scope.submit = function(){
  //   console.log('in thhe file upload function');
  //   if( $scope.form.file.$valid && $scope.file){
  //     $scope.upload($scope.file);
  //   }
  // };

//   $scope.upload = function (file) {
//     Upload.upload({
//         url: '/upload',
//         data: {file: file}
//     }).then(function (resp) {
//         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//     }, function (resp) {
//         console.log('Error status: ' + resp.status);
//     }, function (evt) {
//         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//     });
// };
// $scope.uploadFile = function($file) {
//    Upload.upload($file)
//      .then(function (resp) {
//        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//    }, function (resp) {
//      console.log('Error status: ' + resp.status);
//    }, function (evt) {
//      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//    });
//   };
  $scope.addCounty = function(){
    console.log('in the add county method');
    countyFactory.addCounty($scope.countyInfo, function(data){
      console.log($scope.countyInfo);
      if(data['errors']){
        if(typeof(data['errors']) == 'object'){
          for(var key in data['errors']){
            $scope.errors.push(data['errors'][key].message.replace('Path ', ''));
          }
        }else{
          $scope.errors.push(data['errors']);
        }
        }
      if($scope.errors.length == 0){
        $scope.countyInfo = '';
        $location.url('/success');
      }
    });
  }
 //  $scope.image='';
 // var image  = $scope.image;
 //
 //  $scope.uploadImage = function(e){
 //    console.log(e.target.files[0]);
 //    image = e.tagret.files[0];
 //  };
$scope.formData = {};
var coords = {};
var lat = 0;
var long = 0;
$scope.formData.latitude = 39.500;
 $scope.formData.longitude = -98.350;
  $scope.addDelivery = function(deliveryData, cityId){
      // grab alll the text box fieldss
      var deliveryData = {
      	name: $scope.formData.name,
      	phone: $scope.formData.phone,
      	bio: $scope.formData.bio,
        address: $scope.formData.address,
      	email: $scope.formData.email,
      	location: [$scope.formData.longitude, $scope.formData.latitude]
      }

    deliveryFactory.addDelivery(deliveryData, cityId, function(data){
      if(data['errors']){
        $scope.errors.push(data['errors']);
      } else{
        getCities();
      }
    })
  }
  $scope.addCity = function(newCity, countyId){
    console.log('in the add city method;')
    console.log(newCity);
    console.log(countyId);
    countyFactory.addCity(newCity, countyId, function(data){
      if(data['errors']){
				$scope.errors.push(data['errors']);
			} else{
				getCounties();
			}
    })
  }
  $scope.addFlower = function(){
  			// console.log($scope.regInfo);
  		deliveryFactory.addFlower($scope.flowerInfo, function(data){
  		 console.log($scope.flowerInfo);
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
  				$scope.flowerInfo = '';
  				$location.url('/success');
  			}
  		});
  	}
});
