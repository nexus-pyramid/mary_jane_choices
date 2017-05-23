var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);

addCtrl.controller('addCtrl', function($scope, $anchorScroll, $http, $rootScope, $route, geolocation, LocationService, gservice, deliveryFactory, UserFactory, dispensaryFactory, doctorFactory, $location, $routeParams, $timeout, Upload, UserService){
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

// $scope.openModal = function (index, item){
//   if(index>-1 || index<$scope.delivery.products.length){
//     $scope.activeItem=item;
//     $scope.modalVisible=true;
//     $scope.modalIndex=index;
//     console.log(index);
//   }
  
// }
////////////////////////////////////////
// Google Maps API
////////////////////////////////////////
function getLocation() {
  if (LocationService.long == ''){
    geolocation.getLocation().then(function(data){
      console.log(data)
      // Set the latitude and longitude equal to the HTML5 coordinates
      coords = {lat:data.coords.latitude, long:data.coords.longitude};
      LocationService.lat = data.coords.latitude;
      LocationService.long = data.coords.longitude;

      console.log("THIS IS LOCATION SERVICE");
      console.log(LocationService);
      // Display coordinates in location textboxes rounded to three decimal points
      // $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
      // $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
      //
      // // Display message confirming that the coordinates verified.
      // $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
      // gservice.initialize(coords.lat, coords.long);
          gservice.refresh(LocationService.lat, LocationService.long, function(data){
            $scope.deliveries = data;
          });
      ////////////////////////////////////////
      // Geolocation
      ////////////////////////////////////////
      function displayLocation(){
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(LocationService.lat, LocationService.long);
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
  } else {
      console.log("THIS IS THE SAVED LOCATION SERVICE");
      console.log(LocationService);


        gservice.refresh(LocationService.lat, LocationService.long,function(data){
          $scope.deliveries = data;
        });

      ////////////////////////////////////////
      // Geolocation
      ////////////////////////////////////////
    function displayLocation(){
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(LocationService.lat, LocationService.long);
      geocoder.geocode({'location': latlng}, function(results, status){
        $scope.address = results[2];
        if( status === 'Ok'){
          if(results[1]){
            address = results;
            $scope.address = address;
            LocationService.address = address;
            console.log("this is after address")
            console.log(LocationService)
          } else {
            console.log('no results found');
          }
        }
      })
    }displayLocation()
  }


    // END Geolocation
    ////////////////////////////////////////
};
function get_doc() {
  if(LocationService.long == ''){
    geolocation.getLocation().then(function(data){
      // Set the latitude and longitude equal to the HTML5 coordinates
      LocationService.lat = data.coords.latitude;
      LocationService.long = data.coords.longitude;
      // Display coordinates in location textboxes rounded to three decimal points
      // $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
      // $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
      //
      // // Display message confirming that the coordinates verified.
      // $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
      // gservice.initialize(coords.lat, coords.long);



      console.log("THIS IS THE LOCATION SERVICE");
      console.log(LocationService);

      gservice.getDocs(LocationService.lat, LocationService.long,function(data){
          console.log("THIS IS DATA")
          console.log(data)
          $scope.doctors = data;
      });

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
              LocationService.address = address;
            } else {
              console.log('no results found');
            }
          }
        })
      }displayLocation()
    });
  } else {

      console.log("THIS IS THE SAVED LOCATION SERVICE");
      console.log(LocationService);

      gservice.getDocs(LocationService.lat, LocationService.long,function(data){
          console.log("THIS IS DATA")
          console.log(data)
          $scope.doctors = data;
        });

      ////////////////////////////////////////
      // Geolocation
      ////////////////////////////////////////
      function displayLocation(){
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(LocationService.lat, LocationService.long);
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
  }
}
// END Get Doctors
////////////////////////////////////////


////////////////////////////////////////
//Get Dispensaries
function get_disp() {
  if (LocationService.long == ''){
    geolocation.getLocation().then(function(data){
      // console.log(data);
    // Set the latitude and longitude equal to the HTML5 coordinates
      LocationService.lat = data.coords.latitude;
      LocationService.long = data.coords.longitude;
      // Display coordinates in location textboxes rounded to three decimal points
      // $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
      // $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
      //
      // // Display message confirming that the coordinates verified.
      // $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
      // gservice.initialize(coords.lat, coords.long);

        console.log("THIS IS THE LOCATION SERVICE");
      console.log(LocationService);


      gservice.getDisp(LocationService.lat, LocationService.long,function(data){
          $scope.dispensaries = data;
        });

      ////////////////////////////////////////
      // Geolocation
      ////////////////////////////////////////
      function getAdress(){
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(LocationService.lat, LocationService.long);
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
  } else {
      console.log("THIS IS THE SAVED LOCATION SERVICE");
      console.log(LocationService);
    geolocation.getLocation().then(function(data){
      gservice.getDisp(LocationService.lat, LocationService.long,function(data){
          $scope.dispensaries = data;
        });

      ////////////////////////////////////////
      // Geolocation
      ////////////////////////////////////////
      function getAdress(){
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(LocationService.lat, LocationService.long);
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
  
  }

  
};
// END Get Dispensaries
////////////////////////////////////////


////////////////////////////////////////
// CONSTRUCTORS
////////////////////////////////////////

////////////////////////////////////////
// Deliveries Constructor
$scope.deliveriesView = function(){
  getLocation();
  // getDeliveries();
  getLogged();
  openModal();
}
// END Deliveries Constructor
////////////////////////////////////////
// $scope.dashView = function(){
//   console.log('whats up');
//   getfeatured();
// }
////////////////////////////////////////
// dispensaries Constructor
$scope.dispensariesView = function(){
    console.log('whats up');
  get_disp();
  // getDispensaries();
  getLogged();
}
// END Deliveries Constructor
////////////////////////////////////////

$scope.admindashView = function(){
  check();
  getUnverified()
  getDisp();
  getDocs()
  getDels();
  getAll();
  unfeatured();
  $scope.page = 'deliveries';
  // getDeliveries();
  // getDoctors();
}
////////////////////////////////////////
// doctors Constructor
$scope.doctorsView = function(){
  get_doc();
  // getDoctors();
  getLogged();
}
// END Deliveries Constructor
////////////////////////////////////////
$scope.dashView = function(){
  getfeatured();
}
////////////////////////////////////////
// Admin Constructor
$scope.adminView = function(){
  // getDeliveries();
  // getFlowers();
  if (!UserService._id){
    $location.url('/');
  }
  getLogged()
  $timeout(function(){showProducts()},100)

  // $scope.mode = 'add';
  console.log("MODE IS " + $scope.mode)
    $scope.mode = "add";
    if (UserService.type == "Doctor") {
      $scope.mode = "Doctor";
    } 
    $scope.edit = "no";
  // var promise = getLoggedPromise();
  // promise.then(showProducts);
  
}

// END Admin Constructor
////////////////////////////////////////
// $scope.dispensaryView =
////////////////////////////////////////
// Delivery Constructor
$scope.deliveryView = function(){
  console.log('hey')
  getbusiness();
  getLogged();
  $scope.page = 'menu';
  $scope.searchText = '';
  $scope.searchType = '';
  $scope.modalVisible=false;
}
// END Delivery Constructor
////////////////////////////////////////

////////////////////////////////////////
// Doctor Constructor
$scope.doctorView = function(){
  console.log('hey')
  getbusiness();
  getLogged();
  $scope.page = 'menu';
  $scope.searchText = '';
  $scope.searchType = '';
  $scope.modalVisible=false;
}
// END Delivery Constructor
////////////////////////////////////////

// END CONSTRUCTOR
////////////////////////////////////////

////////////////////////////////////////
// show proucts to edit/delete on admin page
////////////////////////////////////////
function showProducts(){
console.log('showing products')
  deliveryFactory.showProducts(UserService._id, function(data){
    $scope.products = data.products;
    $scope.business = data;
    // UserService._id = data.data._id;
    
  })
}
function getUnverified(){
  deliveryFactory.unverified(function(data){
    $scope.unverified = data
  })
}
function unfeatured(){
  deliveryFactory.unfeatured(function(data){
    $scope.shops = data;
    console.log($scope.shops)
  });
}
function getAll(){
  deliveryFactory.getAll(function(data){
    $scope.busses = data
  })
}
// END Show Products
////////////////////////////////////////
// function getBusiness(){
// console.log('showing products')
//   deliveryFactory.getBusiness(UserService._id, function(data){
//     $scope.business = data;    
//   })
// }
////////////////////////////////////////
// Get Logged User
////////////////////////////////////////
function getLogged(){
  deliveryFactory.getLogged(function(data){
    UserService._id = data.data._id;
    UserService.name = data.data.name;
    UserService.type = data.data.type;
    console.log("GOT USER")
  })
}
// END Get Logged User
////////////////////////////////////////

////////////////////////////////////////
// Get Logged User with Promise
////////////////////////////////////////
function getLoggedPromise(){

  var deferred = $q.defer();
  var gotdata;
  deliveryFactory.getLogged(function(data){
    UserService._id = data.data._id;
    UserService.name = data.data.name;
    UserService.type = data.data.type;
    gotdata = data;
    console.log("GOT USER")
  })
  deferred.resolve(gotdata);

  return deferred.promise;
}





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
function getfeatured(){
    geolocation.getLocation().then(function(data){
      console.log(data)
      // Set the latitude and longitude equal to the HTML5 coordinates
      coords = [data.coords.longitude, data.coords.latitude];
      LocationService.lat = data.coords.latitude;
      LocationService.long = data.coords.longitude;

  deliveryFactory.getfeatured(coords, function(data){
    respArray = [];
    for (var i = 0; i < data.length; i++){
        respArray.push(data[i].obj)    
    }          
     $scope.featured = respArray;
  });
})
}
function getDocs(){
  deliveryFactory.getDocs(function(data){
    $scope.docs = data;
  })
}
function getDels(){
  deliveryFactory.getDels(function(data){
    $scope.dels = data;
  })
}
// var getfeatured = function(){
//   console.log('ayeee');
//  deliveryFactory.getfeatured(function(data){
//      $scope.featured = data;
//      console.log(data);
//   });
// } 
// getfeatured();
////////////////////////////////////////
// Get dispensaries
////////////////////////////////////////
// function getDispensaries(){
//   dispensaryFactory.getDispensaries(function(data){
//     $scope.dispensaries = data;
//   })
// }
// END Get dispensaries
////////////////////////////////////////
function getDisp(){
  deliveryFactory.getDisp(function(data){
    $scope.truffles = data;
  })
}
function check(){
  if(UserService.admin !== 'admin'){
      $location.url('/');
      toastr.error('you do not have access to this page', toastOpts);
  }
}
////////////////////////////////////////
// Get Deliveries
////////////////////////////////////////
function getDeliveries(){
  deliveryFactory.getDeliveries(function(data){
    $scope.deliveries = data;
    console.log('******************************')
    console.log(data)
  })
};
// END Get Deliveries
////////////////////////////////////////
////////////////////////////////////////
// Get Deliveries
////////////////////////////////////////
// function getDoctors(){
//   doctorFactory.getDoctors(function(data){
//     $scope.doctors = data;
//   })
// };
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
$scope.uploadS3 = function(file){
  console.log('in the s3 function');
  console.log(file);
  var sub = file;
  var policy = "ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogIm1hcnlqYW5lNDIwIn0sCiAgICBbInN0YXJ0cy13aXRoIiwiJGtleSIsICJpbWFnZXMvIl0sCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRzdWNjZXNzX2FjdGlvbl9zdGF0dXMiLCAiMjAxIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==";
 if (file) {
    var policy = "ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogIm1hcnlqYW5lNDIwIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiaW1hZ2VzLyJdLAogICAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0=";
     file.upload = Upload.upload({
          // console.log(file);
          url: "https://maryjane420.s3.amazonaws.com/",
          method: "POST",
          data: {
              key: "images/" + file.name,
              AWSAccessKeyId: "AKIAJVPIS263F7EXPBSA",
              acl: "public-read",
              policy : policy,
              signature: "wtNtxv8MduG7zsHqwEMtqFP4RtE=",
              "Content-Type": file.type != '' ? file.type : 'application/octet-stream',
              success_action_status: "201",
              file: sub
          }
      });
      file.upload.then(function (response) {
        console.log(response);
      if (response.status === 201) {
            var data = xml2json.parser(response.data),
            parsedData;
            parsedData = {
                location: data.response.location,
                bucket: data.response.bucket,
                key: data.response.key,
                etag: data.response.etag
            };
        } else {
            alert('Upload Failed');
        }         
    })
  }
}
$scope.editBusiness = function(){
  $scope.edit == 'business';
  console.log('in the edit business');
  console.log($scope.edit);
}

$scope.addProduct = function(file){
    if (file) {
      file.upload = Upload.upload({
          url: '/productUpload',
          data: {
              file: file,
              name: $scope.name,
              type: $scope.type,
              productType: $scope.productType,
              thc: $scope.thc,
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
        if( status === 'Ok'){
          toastr.success('Product Added', toastOpts);
      }
      else {
          toastr.success('Product Added', toastOpts);
     }
  }
}
// END Add Product
////////////////////////////////////////


////////////////////////////////////////
// Change to Edit View
////////////////////////////////////////
$scope.editView = function(product){
      console.log(product._id);
      
      $timeout(function(){
        $anchorScroll();
        $location.hash('form');
      }, 500)

      $scope._id = product._id;
      $scope.name = product.name;
      $scope.type = product.type;
      $scope.productType =product.productType;
      $scope.thc = product.thc;
      $scope.description = product.description;
      $scope.one_gram = product.one_gram;
      $scope.two_gram = product.two_gram;
      $scope.eigth = product.eigth;
      $scope.quarter = product.quarter;
      $scope.half = product.half;
      $scope.ounce = product.ounce;
      $scope.price = product.price;
      $scope.half_gram = product.half_gram;
      $scope.file = product.image;
      $scope.mode = 'edit';

 // $location.url('/edit/'+deliveryId);

}
// END Edit View
////////////////////////////////////////
$scope.editbusinessView = function(){
console.log($scope.business);
      $timeout(function(){
        $anchorScroll();
        $location.hash('form');
      }, 500)
        $scope.show = 'edit';
        $scope.name =  $scope.business.name;
        $scope.type = $scope.business.type;
        $scope.city =  $scope.business.city;
        $scope.zip_code = $scope.business.zip_code;
        $scope.state = $scope.business.state;
        $scope.phone = $scope.business.phone;
        $scope.bio = $scope.business.bio;
        $scope.email = $scope.business.email;
        $scope.file = $scope.business.image;
        $scope.monop = $scope.business.hours.monday.open;
        $scope.monco = $scope.business.hours.monday.open;
        $scope.tuop = $scope.business.hours.tuesday.open;
        $scope.tuco = $scope.business.hours.tuesday.close;
        $scope.weop = $scope.business.hours.wednesday.open;
        $scope.weco = $scope.business.hours.wednesday.close;
        $scope.thop = $scope.business.hours.thursday.open;
        $scope.thco = $scope.business.hours.thursday.close;
        $scope.friop = $scope.business.hours.friday.open;
        $scope.frico = $scope.business.hours.friday.close;
        $scope.satop = $scope.business.hours.saturday.open;
        $scope.satco = $scope.business.hours.saturday.close;
        $scope.sunop = $scope.business.hours.sunday.open;
        $scope.sunco = $scope.business.hours.sunday.close;
        // $scope.address = $scope.business.street_address;
        // $scope.location = [$scope.business.loc.lng, $scope.business.loc.lat];
 // $location.url('/edit/'+deliveryId);
}
// END Edit View
////////////////////////////////////////

////////////////////////////////////////
// Edit Product
////////////////////////////////////////
$scope.editProduct = function(file){
  console.log($scope.type);
  console.log($scope.name);
      if (file) {
      file.upload = Upload.upload({
          url: '/editProduct',
          data: {
              file: file,
              name: $scope.name,
              _id: $scope._id,
              type: $scope.type,
              productType: $scope.productType,
              thc: $scope.thc,
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
        $route.reload();
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
// END Edit Product
////////////////////////////////////////


////////////////////////////////////////
// Delete Product
////////////////////////////////////////
$scope.deleteView = function(product){
  $scope.name = '';
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
    $scope.business = data;
  });
};
// END Get Delivery
////////////////////////////////////////
// Show
//// ng-click to show one delivery
////////////////////////////////////////
$scope.show = function(){
  deliveryFactory.show($scope.business._id, function(data){
    if(data['errors']){
      $scope.errors.push(data['errors']);
    } else{
      $location.url('/show/'+deliveryId);
    }
  });
}
// END Show
////////////////////////////////////////
$scope.validate = function(delivery){
  console.log(delivery)
  delete delivery.image
  console.log(delivery)
  deliveryFactory.validate(delivery, function(data){
    if(data['errors']){
      $scope.errors.push(data['errors']);
    } else{
      $route.reload();
      toastr.success('Successfully validated business', toastOpts);
    }
  })
}

////////////////////////////////////////
// Log in
//// only for logging in deliveries
////////////////////////////////////////
$scope.login = function(){
  console.log('in the login method')
  deliveryFactory.login($scope.business_Info, function(data){
    console.log(data)
    if(data['errors']){
      // $scope.business_Info.email = '';
      // $scope.business_Info.password = '';
      // $scope.errors.push(data['errors']);
      $scope.businessErrors = data.errors;
    }
    else {
    UserService._id = data._id;
    UserService.name = data.name;
    UserService.type = data.type;
    console.log(UserService.type);
    $rootScope.$broadcast('loggedin')
    $location.url('/success');
    $scope.mode = "add";
    if (UserService.type == "Doctor") {
      $scope.mode = "Doctor";
    } 
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
  $scope.userErrors = '';
  UserFactory.userLogin($scope.userInfo, function(data){
    if(data.errors){
      // $scope.errors = data.errors;
      // $scope.userInfo.email = '';
      // $scope.userInfo.password = '';
      $scope.userErrors = data.errors
      }
    else {
      UserService._id = data._id;
      UserService.name = data.name;
      UserService.type = data.type
      $rootScope.$broadcast('loggedin')
      $location.url('/deliveries');
      }
  })
}
////////////////////////////////////////
$scope.addLocation = function(business, businessId){
    console.log(business);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': business.street_address}, function(results, status){
          console.log(results);
      console.log(status);
        if(status = 'OK') {
         // var lng = results[0].geometry.location.lng();
         // var lat = results[0].geometry.location.lat();
          // var location = [$scope.loc.lng, $scope.loc.lat];
          // _id = businessId
      $scope.loc = {};
      $scope.loc.lng = results[0].geometry.location.lng();
      $scope.loc.lat = results[0].geometry.location.lat();
      var but = [$scope.loc.lng, $scope.loc.lat];
      console.log($scope.locrs)
          info = {
            location: but,
            _id: businessId
          }
          console.log('this is the info')
          console.log(info)
          deliveryFactory.addLocation(info, function(data){
            if(data['errors']){
               $scope.errors.push(data['errors']);
            } else {
              $route.reload();
              toastr.success('Successfully added location', toastOpts);             
            }
          })
        }
    });
}
// Add Review
//// for adding reviews
////////////////////////////////////////
$scope.featureBusiness = function(businessId){
  buss = {
    _id: businessId
  }
  deliveryFactory.featureBusiness(buss, function(data){
    console.log(data)
   if(data['errors']){
     $scope.errors.push(data['errors']);
   } else {
    $route.reload();
    toastr.success('Successfully featured business', toastOpts);             
     getReviews();
   } 
  })
}

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
$scope.apply = function(apply) {
  console.log(apply)
  deliveryFactory.apply(apply, function(data){
    console.log(apply)
   if(data['errors']){
     $scope.errors.push(data['errors']);
   } else {
    console.log(data);
  console.log('its lit')
   } 
  })
}
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
$scope.editPassword = function(editbusiness){
  console.log(editbusiness)
  deliveryFactory.editPassword(editbusiness, function(data){
    if(data['errors']){
            $scope.errors.push("email is already registered")
        console.log('fck')
    } else {
            $location.url('/login');
          toastr.success('Successfully edited password', toastOpts);             
    }
  })
}
$scope.addUser  = function(userData, cityId){
  $scope.errors = []
  UserFactory.addUser(userData, cityId, function(data){
    if(data['errmsg']){
      $scope.errors.push("email is already registered")
    } 
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
      $scope.regInfo = '';
      $scope.message = "Successfully Signed Up"
      $location.url('/login');
    }
  })
}
//END Add User
////////////////////////////////////////

$scope.searchLocation = function() {
  var address = $scope.search_dels;
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address' : address}, function(results, status){
    console.log(results);
    console.log(status);
    $scope.loc = {};
     var long = results[0].geometry.location.lng();
     var lat  = results[0].geometry.location.lat(); 
    var coords = [long, lat]
    console.log(coords)

      gservice.refresh(lat, long, function(data){
            console.log(data);
            console.log('i think it worked')
            $scope.deliveries = data;
          });
  });
}
$scope.searchdisps = function() {
  var address = $scope.search_dels;
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address' : address}, function(results, status){
    console.log(results);
    console.log(status);
    $scope.loc = {};
     var long = results[0].geometry.location.lng();
     var lat  = results[0].geometry.location.lat(); 
    var coords = [long, lat]
    console.log(coords)

      gservice.getDisp(lat, long, function(data){
            console.log(data);
            console.log('i think it worked')
            $scope.dispensaries = data;
          });
  });
}
$scope.searchdocs = function() {
  var address = $scope.search_dels;
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address' : address}, function(results, status){
    console.log(results);
    console.log(status);
    $scope.loc = {};
     var long = results[0].geometry.location.lng();
     var lat  = results[0].geometry.location.lat(); 
    var coords = [long, lat]
    console.log(coords)

      gservice.getDocs(lat, long, function(data){
            console.log(data);
            console.log('i think it worked')
            $scope.doctors = data;
          });
  });
}
$scope.deleteBusiness = function(businessId){
  deliveryFactory.deleteBusiness(businessId, function(data){
    if(data['errors']){
      $scope.errors = data
     } else {
      console.log(data)
      $route.reload()
      toastr.success('Successfully deleted business', toastOpts);             
     }
  })
}
$scope.deleteProduct = function(product_id) {
  console.log(product_id)
  deliveryFactory.delete(product_id, function(data){
     if(data['errors']){
      $scope.errors = data
     } else {
      console.log(data)
      $route.reload()
     }
  })
}


////////////////////////////////////////
// Create Delivery
////////////////////////////////////////
// $scope.createDelivery = function(file) {
//   function geocodeAddress(){
//     var geocoder = new google.maps.Geocoder();
//     var address = $scope.street_address;
//     var loc = [];
//     geocoder.geocode({'address': address}, function(results, status){
//       $scope.loc = {};
//       $scope.loc.lng = results[0].geometry.location.lng();
//       $scope.loc.lat = results[0].geometry.location.lat();
//       console.log($scope.loc);
//       file.upload = Upload.upload({
//         url:'/addDelivery',
//         data: {
//         file: file,
//         name: $scope.name,
//         type: $scope.type,
//         _city: $scope.city._id,
//         phone: $scope.phone,
//         bio: $scope.bio,
//         email: $scope.email,
//         password: $scope.password,
//         address: $scope.street_address,
//         location: [$scope.loc.lng, $scope.loc.lat],
//         hours: $scope.hours
//       }
//     });
//     file.upload.then(function (response) {
//         $timeout(function () {
//             file.result = response.data;
//         });
//     }, function (response) {
//         if (response.status > 0)
//             $scope.errorMsg = response.status + ': ' + response.data;
//     }, function (evt) {
//         // We can use this to show progress and thumbnail
//         file.progress = Math.min(100, parseInt(100.0 *
//                                  evt.loaded / evt.total));
//     });
//       if( status === 'Ok'){
//         console.log('status ok');
//       }
//       else {
//         if(data['errors']){
//         $scope.errors.push(data['errors']);
//         } 
//        // alert("Geocode was not successful for the following reason: " + status);
//      }
//    });
//  }geocodeAddress();
// }
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
      // if($scope.password.length > 8){
      //   console.log("passwd to short")
      //   return;
      // } name="input"
      file.upload = Upload.upload({
        url:'/addBusiness',
        data: {
        file: file,
        name: $scope.name,
        type: $scope.type,
        city: $scope.city,
        hours: {
          monday: {open: $scope.hours.monday.open, close: $scope.hours.monday.close},
          tuesday: {open: $scope.hours.tuesday.open, close: $scope.hours.tuesday.close},
          wednesday: {open: $scope.hours.wednesday.open, close: $scope.hours.wednesday.close},
          thursday: {open: $scope.hours.thursday.open, close: $scope.hours.thursday.close},
          friday: {open: $scope.hours.friday.open, close: $scope.hours.friday.close},
          saturday: {open: $scope.hours.saturday.open, close: $scope.hours.saturday.close},
          sunday: {open: $scope.hours.sunday.open, close: $scope.hours.sunday.close}
        },
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
      console.log(file)
    file.upload.then(function (response) {
      console.log(response)
        $timeout(function () {
            file.result = response.data;
        });

      if( response.status == 200){
        console.log('status ok');
             $location.url('/login');

      }
      else { 
        console.log(response);
        if(response['err']){
        $scope.errors.push(response['err']);
        } 
     }
    }, function (response) {
        if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
        // We can use this to show progress and thumbnail
        file.progress = Math.min(100, parseInt(100.0 *
                                 evt.loaded / evt.total));
    });
   });
 }geocodeAddress();
}
$scope.editBusiness = function(file){
  console.log(file)
  console.log(UserService._id)
  console.log($scope.email)
    console.log($scope.business)
      if (file) {
        console.log('file included');
      file.upload = Upload.upload({
          url: '/editBusiness',
          data: {
              file: file,
              name: $scope.name,
              _id: UserService._id,
              name: $scope.name,
              type: $scope.type,
              city: $scope.city,
              zip_code: $scope.zip_code,
              state: $scope.state,
              phone: $scope.phone,
              bio: $scope.bio,
              email: $scope.email,
              hours: {
                monday: {open: $scope.monop, close: $scope.monco},
                tuesday: {open: $scope.tuop, close: $scope.tuco},
                wednesday: {open: $scope.weop, close: $scope.weco},
                thursday: {open: $scope.thop, close: $scope.thop},
                friday: {open: $scope.friop, close: $scope.frico},
                saturday: {open: $scope.satop, close: $scope.satco},
                sunday: {open: $scope.sunop, close: $scope.sunco}
              }
           }
      });
      $route.reload();
      toastr.success('Successfully edited business', toastOpts);    
      file.upload.then(function (response) {
          $timeout(function () {
              file.result = response.data;
          });
          if( response.status == 200){
        console.log('status ok');
            $route.reload();
            toastr.success('Successfully edited business', toastOpts);             
      }
      }, function (response) {
          if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 *
                                   evt.loaded / evt.total));
      });
    }  
}
$scope.checkAdmin = function(admin){
  console.log(admin)
  deliveryFactory.checkAdmin(admin, function(data){
    console.log(data);
    if(data['errors']){
        $scope.errors.push(data['errors']);
        $location.url('/');
      } else{
        $location.url('/admin-dash');
        UserService.admin = 'admin';
        toastr.success('Successfully Logged in as Admin', toastOpts);
      }
  })
}
$scope.addReview = function(newReview, deliveryId){
  console.log(UserService._id)
  deliveryFactory.addReview(newReview, deliveryId, UserService._id, function(data){
   if(data['errors']){
        $scope.errors.push(data['errors']);
      } else{
        $route.reload();
        toastr.success('Successfully Added Review', toastOpts);
      }
  })
}


})
// END addCtrl
////////////////////////////////////////
