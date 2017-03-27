var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice, deliveryFactory, UserFactory, $location, $routeParams, Upload){
  // $scope.formData = {};

  var coords = {};
  var lat = 0;
  var long = 0;
  var address = '';
  geolocation.getLocation().then(function(data){

// Set the latitude and longitude equal to the HTML5 coordinates
coords = {lat:data.coords.latitude, long:data.coords.longitude};
console.log(coords);
// Display coordinates in location textboxes rounded to three decimal points
// $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
// $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
//
// // Display message confirming that the coordinates verified.
// $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
// gservice.initialize(coords.lat, coords.long);
gservice.refresh(coords.lat, coords.long);
function displayLocation(){
  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(coords.lat, coords.long);
  console.log(latlng);
  geocoder.geocode({'location': latlng}, function(results, status){
    console.log(results)
    $scope.address = results[0];
    console.log($scope.address);
    if( status === 'Ok'){
      if(results[1]){
        console.log(results);
        address = results;
        console.log(address);
        $scope.address = address;
        console.log($scope.address)
      } else {
        console.log('no results found');
      }
    }
  })
}displayLocation()
});

function geocodeAddress(){
  var geocoder = new google.maps.Geocoder();
  var address = $scope.address;
  geocoder.deocode({'address': address}, function(results, status){

  })
}
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
  $scope.createDelivery = function(file) {
    function geocodeAddress(){
      var geocoder = new google.maps.Geocoder();
      var address = $scope.street_address;
      console.log(address);
      var loc = [];
      geocoder.geocode({'address': address}, function(results, status){

        // $scope.loc = results[0].geometry.location;
        // console.log(results[0].geometry.location);
        $scope.loc = {};
        $scope.loc.lng = results[0].geometry.location.lng();
        $scope.loc.lat = results[0].geometry.location.lat();
        console.log($scope.loc);
        file.upload = Upload.upload({
          url:'/addDelivery',
          data: {
          file: file,
          name: $scope.name,
          _city: $scope.city._id,
          phone: $scope.phone,
          bio: $scope.bio,
          email: $scope.email,
          password: $scope.password,
          address: $scope.street_address,
          location: [$scope.loc.lng, $scope.loc.lat]
        }
      });
      file.upload.then(function (response) {
          $timeout(function () {
              file.result = response.data;
          });
      }, function (response) {
          if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 *
                                   evt.loaded / evt.total));
      });
        if( status === 'Ok'){
          console.log('status ok');
        }
        else {
         alert("Geocode was not successful for the following reason: " + status);
       }
     });
   }geocodeAddress();
  }
})
