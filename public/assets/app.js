var app = angular.module("app", ['ngRoute', 'geolocation', 'addCtrl',  'ngFileUpload', 'gservice']);
app.config( function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: 'assets/partials/dashboard.html',
    controller: 'dashboardController'
   })
  .when('/admin', {
    templateUrl: 'assets/partials/login.html',
    controller:  'loginController'
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
   controller: 'loginController'
  })
  .when('/delivery/:id', {
   templateUrl: 'assets/partials/delivery.html',
   controller: 'addCtrl'
  })
  .when('/deliveries', {
    templateUrl: 'assets/partials/deliveries.html',
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
  .otherwise({
    redirectTo: '/'
  });
    // $locationProvider.html5Mode(true);
});
