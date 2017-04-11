var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice, deliveryFactory, UserFactory, dispensaryFactory, doctorFactory, $location, $routeParams, Upload, UserService){
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
function get_doc() {

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
    gservice.getDocs(coords.lat, coords.long);

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
}
function get_disp() {

  geolocation.getLocation().then(function(data){
      // console.log(data);
    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};
    // Display coordinates in location textboxes rounded to three decimal points
    // $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    // $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    //
    // // Display message confirming that the coordinates verified.
    // $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
    // gservice.initialize(coords.lat, coords.long);
    gservice.getDisp(coords.lat, coords.long);

    ////////////////////////////////////////
    // Geolocation
    ////////////////////////////////////////
    function getAdress(){
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(coords.lat, coords.long);
      geocoder.geocode({'location': latlng}, function(results, status){
        $scope.address = results[2];
        console.log($scope.address)
        if( status === 'Ok'){
          if(results[1]){
            address = results;
            $scope.address = address;
          } else {
            console.log('no results found');
          }
        }
      })
    }getAdress();
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
  getLogged();
}
// END Deliveries Constructor
////////////////////////////////////////

////////////////////////////////////////
// dispensaries Constructor
$scope.dispensariesView = function(){
  get_disp();
  getDispensaries();
  getLogged();
}
// END Deliveries Constructor
////////////////////////////////////////

////////////////////////////////////////
// doctors Constructor
$scope.doctorsView = function(){
  get_doc();
  getDoctors();
  getLogged();
}
// END Deliveries Constructor
////////////////////////////////////////

////////////////////////////////////////
// Admin Constructor
$scope.adminView = function(){
  // getDeliveries();
  // getFlowers();
  getLogged();
  showProducts();
}
// END Admin Constructor
////////////////////////////////////////
// $scope.dispensaryView =
////////////////////////////////////////
// Delivery Constructor
$scope.deliveryView = function(){
  getbusiness();
  getLogged();
  $scope.page = 'menu';
}
// END Delivery Constructor
////////////////////////////////////////

// END CONSTRUCTORS
////////////////////////////////////////

////////////////////////////////////////
// show proucts to edit/delete on admin page
////////////////////////////////////////
function showProducts(){
console.log('showing products')
  deliveryFactory.showProducts(UserService._id, function(data){
    $scope.products = data.products;
    // UserService._id = data.data._id;
    
  })
}
// END Show Products
////////////////////////////////////////

////////////////////////////////////////
// Get Logged User
////////////////////////////////////////
function getLogged(){

  deliveryFactory.getLogged(function(data){
    console.log('Getting logged user vvvvv')
    console.log(data.data)
    UserService._id = data.data._id;
    UserService.name = data.data.name;
    UserService.type = data.data.type;
  })
}
// END Get Logged User
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
// END Geocode Address
////////////////////////////////////////

////////////////////////////////////////
// Get dispensaries
////////////////////////////////////////
function getDispensaries(){
  dispensaryFactory.getDispensaries(function(data){
    $scope.dispensaries = data;
  })
}
// END Get dispensaries
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
// Get Deliveries
////////////////////////////////////////
function getDoctors(){
  doctorFactory.getDoctors(function(data){
    $scope.doctors = data;
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
// Add Product
////////////////////////////////////////
$scope.addProduct = function(file){
    if (file) {
      file.upload = Upload.upload({
          url: '/productUpload',
          data: {
              file: file,
              name: $scope.name,
              type: $scope.type,
              productType: $scope.productType,
              content: $scope.thc,
              description: $scope.description,
              one_gram: $scope.one_gram,
              two_gram: $scope.two_gram,
              eigth: $scope.eigth,
              quarter: $scope.quarter,
              half: $scope.half,
              ounce: $scope.ounce,
              price: $scope.price,
              half_gram: $scope.half_gram
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
      // $scope.name = '';
      // $scope.type = '';
      // $scope.productType = '';
      // $scope.thc = '';
      // $scope.description = '';
      // $scope.one_gram = '';
      // $scope.two_gram = '';
      // $scope.eigth = '';
      // $scope.quarter = '';
      // $scope.half = '';
      // $scope.ounce = '';
      // $scope.price = '';
      // $scope.half_gram = '';
  }
}
// END Add Product
////////////////////////////////////////


////////////////////////////////////////
// Edit Product
////////////////////////////////////////
$scope.editProduct = function(id){
  console.log(id);
}
// END Edit Product
////////////////////////////////////////

////////////////////////////////////////
// Delete Product
////////////////////////////////////////
$scope.deleteProduct = function(id){
  console.log(id);
}
// END Delete Product
////////////////////////////////////////


////////////////////////////////////////
// Get Delivery
//// get one delivery
////////////////////////////////////////
function getbusiness(){
  deliveryFactory.show($routeParams.id, function(data){
    console.log(data);
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
  console.log('in the login method')
  deliveryFactory.login($scope.business_Info, function(data){
    $scope.errors = [];
    if(data['errors']){
      $scope.errors.push(data['errors']);
    }
    else {
    console.log(data);
    UserService._id = data._id;
    UserService.name = data.name;
    UserService.type = data.type;
    $rootScope.$broadcast('loggedin')
    $location.url('/success');
   }
 });
}
// END Log in
////////////////////////////////////////

////////////////////////////////////////
// Log in
//// only for logging in users
////////////////////////////////////////
$scope.userLogin = function(){
  console.log('in the scuserlogin method')
  UserFactory.userLogin($scope.userInfo, function(data){
    console.log('in the scuserlogin method')
    if(data.errors){
      $scope.errors = data.errors;
      $scope.userInfo.email = '';
      $scope.userInfo.password = '';
      }
    else {
      UserService._id = data._id;
      UserService.name = data.name;
      UserService.type = data.type
      $rootScope.$broadcast('loggedin')
      $location.path('/user/' + UserService.name);
      }
  })
}
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
        type: $scope.type,
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
       // alert("Geocode was not successful for the following reason: " + status);
     }
   });
 }geocodeAddress();
}
// END Create Delivery
////////////////////////////////////////


////////////////////////////////////////
// Create Business
////////////////////////////////////////
$scope.createBusiness = function(file) {
  console.log('in the create Business');
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
        url:'/addBusiness',
        data: {
        file: file,
        name: $scope.name,
        type: $scope.type,
        city: $scope.city,
        zip_code: $scope.zip_code,
        state: $scope.state,
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
       // alert("Geocode was not successful for the following reason: " + status);
     }
   });
 }geocodeAddress();
}
})
// END addCtrl
////////////////////////////////////////
