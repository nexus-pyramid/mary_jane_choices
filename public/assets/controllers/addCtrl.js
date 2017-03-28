var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice, deliveryFactory, UserFactory, $location, $routeParams, Upload){
  // $scope.formData = {};


////////////////////////////////////////
// Global variables
////////////////////////////////////////
  $scope.errors = [];
  var coords = {};
  var lat = 0;
  var long = 0;
  var address = '';
// END Global Variables
////////////////////////////////////////




////////////////////////////////////////
// Google Maps API
////////////////////////////////////////
function getLocation() {

  geolocation.getLocation().then(function(data){
    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};
    // Display coordinates in location textboxes rounded to three decimal points
    // $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    // $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    //
    // // Display message confirming that the coordinates verified.
    // $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
    // gservice.initialize(coords.lat, coords.long);
    gservice.refresh(coords.lat, coords.long);

    ////////////////////////////////////////
    // Geolocation
    ////////////////////////////////////////
    function displayLocation(){
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(coords.lat, coords.long);
      geocoder.geocode({'location': latlng}, function(results, status){
        $scope.address = results[2];
        if( status === 'Ok'){
          if(results[1]){
            address = results;
            $scope.address = address;
          } else {
            console.log('no results found');
          }
        }
      })
    }displayLocation()
  });
    // END Geolocation
    ////////////////////////////////////////

};


////////////////////////////////////////
// CONSTRUCTORS
////////////////////////////////////////

////////////////////////////////////////
// Deliveries Constructor
$scope.deliveriesView = function(){
  getLocation();
  getDeliveries();
}
// END Deliveries Constructor
////////////////////////////////////////

////////////////////////////////////////
// Admin Constructor
$scope.adminView = function(){
  getCities();
  getDeliveries();
  getFlowers();
}
// END Admin Constructor
////////////////////////////////////////

$scope.deliveryView = function(){
  getdelivery()
}

// END CONSTRUCTORS
////////////////////////////////////////





////////////////////////////////////////
// Geocode Address
////////////////////////////////////////
function geocodeAddress(){
  var geocoder = new google.maps.Geocoder();
  var address = $scope.address;
  geocoder.deocode({'address': address}, function(results, status){

  })
}
// Geocode Address
////////////////////////////////////////

////////////////////////////////////////
// Get Cities
////////////////////////////////////////
function getCities(){
  deliveryFactory.getCities(function(data){
    $scope.cities = data;
    console.log(data);
  })
};
// END Get Cities
////////////////////////////////////////


////////////////////////////////////////
// Get Deliveries
////////////////////////////////////////
function getDeliveries(){
  deliveryFactory.getDeliveries(function(data){
    $scope.deliveries = data;
  })
};
// END Get Deliveries
////////////////////////////////////////


////////////////////////////////////////
// Get Flowers
//// get all flowers from db
////////////////////////////////////////
function getFlowers(){
  deliveryFactory.getFlowers(function(data){
    $scope.flowers = data;
  })
};
// END Get Flowers
////////////////////////////////////////

////////////////////////////////////////
// Add Flower
////////////////////////////////////////
$scope.addFlower = function(file, errFiles){
  $scope.h = file;
  $scope.errFile = errFiles && errFiles[0];
  if (file) {
      file.upload = Upload.upload({
          url: '/flowerUpload',
          data: {
              file: file,
              name: $scope.name,
              type: $scope.type,
              content: $scope.thc,
              description: $scope.description,
              one_gram: $scope.one_gram,
              two_gram: $scope.two_gram,
              eigth: $scope.eigth,
              half: $scope.half,
              ounce: $scope.ounce
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
  }
}
// END Add Flower
////////////////////////////////////////



////////////////////////////////////////
// Get Delivery
//// get one delivery
////////////////////////////////////////
function getdelivery(){
  deliveryFactory.show($routeParams.id, function(data){
    $scope.delivery = data;
  });
};
// END Get Delivery
////////////////////////////////////////
// Show
//// ng-click to show one delivery 
////////////////////////////////////////
$scope.show = function(){
  deliveryFactory.show($scope.delivery._id, $scope.delivery, function(data){
    if(data['errors']){
      $scope.errors.push(data['errors']);
    } else{
      $location.url('/show/'+deliveryId);
    }
  });
}
// END Show
////////////////////////////////////////


////////////////////////////////////////
// Log in
//// only for logging in deliveries
////////////////////////////////////////
$scope.login = function(){
  deliveryFactory.login($scope.delivery_serviceInfo, function(data){
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
// END Log in
////////////////////////////////////////

////////////////////////////////////////
// Add Review
//// for adding reviews
////////////////////////////////////////
$scope.addReview = function(newReview, deliveryId){
 deliveryFactory.addReview(newReview, deliveryId, function(data){
   if(data['errors']){
     $scope.errors.push(data['errors']);
   } else {

     getReviews();
   }
 })
}
// END Review
////////////////////////////////////////

////////////////////////////////////////
// DELETE Visit Delivery
////////////////////////////////////////
// $scope.visitDelivery = function(delivery, deliveryId){
//  deliveryFactory.visit(deliveryId, function(data){
//    if(data['errors']){
//      $scope.errors.push(data['errors'])
//    } else {
//      $scope.delivery = data;
//      $location.url('/delivery/'+deliveryId);
//    }
//  });
// }
// DELETE END Visit Delivery
////////////////////////////////////////

////////////////////////////////////////
// Add User
////////////////////////////////////////
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
//END Add User
////////////////////////////////////////

////////////////////////////////////////
// Create Delivery
////////////////////////////////////////
$scope.createDelivery = function(file) {
  function geocodeAddress(){
    var geocoder = new google.maps.Geocoder();
    var address = $scope.street_address;
    var loc = [];
    geocoder.geocode({'address': address}, function(results, status){
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
        // We can use this to show progress and thumbnail 
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
// END Create Delivery
////////////////////////////////////////

})
// END addCtrl
////////////////////////////////////////