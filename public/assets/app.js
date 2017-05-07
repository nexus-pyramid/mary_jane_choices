var app = angular.module("app", ['ngRoute', 'geolocation', 'addCtrl',  'ngFileUpload', 'gservice']);
app.config( function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: 'assets/partials/dashboard.html',
    controller: 'addCtrl'
   })
  .when('/admin', {
    templateUrl: 'assets/partials/login.html',
    controller:  'addCtrl'
  })
  .when('/success', {
    templateUrl: 'assets/partials/admin.html',
    controller: 'addCtrl'
  })
  .when('/dispensaries',{
   templateUrl: 'assets/partials/dispensaries.html',
   controller: 'addCtrl'
  })
  .when('/doctors',{
   templateUrl: 'assets/partials/doctors.html',
   controller: 'addCtrl'
  })
  .when('/login',{
   templateUrl: 'assets/partials/login.html',
   controller: 'addCtrl'
  })
  .when('/edit_pass',{
   templateUrl: 'assets/partials/edit_pass.html',
   controller: 'addCtrl'
  })
  .when('/user/:id', {
    templateUrl: 'assets/partials/user-page.html',
    controller: 'addCtrl'
  })
  .when('/business/:id', {
   templateUrl: 'assets/partials/delivery.html',
   controller: 'addCtrl'
  })
  .when('/doctor/:id', {
   templateUrl: 'assets/partials/doctor.html',
   controller: 'addCtrl'
  })
  .when('/deliveries', {
    templateUrl: 'assets/partials/deliveries.html',
    controller:  'addCtrl'
  })
  .when('/apply', {
    templateUrl: 'assets/partials/mary.html',
    controller:  'addCtrl'
  })
  .when('/register/user', {
    templateUrl: 'assets/partials/register_user.html',
    controller:  'addCtrl'
  })
  .when('/register/business', {
    templateUrl: 'assets/partials/register_business.html',
    controller:  'addCtrl'
  })
  .when('/:id', {
    templateUrl: 'assets/partials/edit.html',
    controller:  'addCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
    // $locationProvider.html5Mode(true);
});
