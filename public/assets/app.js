var app = angular.module("app", ['ngRoute', 'geolocation', 'addCtrl',  'ngFileUpload', 'gservice']);
app.config( function ($routeProvider, $locationProvider, $httpProvider) {
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
  .when('/brands',{
   templateUrl: 'assets/partials/brands.html',
   controller: 'addCtrl'
  })
  .when('/allbrands', {
    templateUrl: 'assets/partials/allbrands.html',
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
   .when('/mjc',{
   templateUrl: 'assets/partials/check-admin.html',
   controller: 'addCtrl'
  })
   .when('/visitShop',{
   templateUrl: 'assets/partials/visitAdmin.html',
   controller: 'addCtrl'
  })
  .when('/admin-dash',{
   templateUrl: 'assets/partials/admin-dash.html',
   controller: 'addCtrl'
  })
  .when('/brand/:id', {
    templateUrl: '/assets/partials/brand.html',
    controller: 'addCtrl'
  })
  .when('/edit/:id', {
    templateUrl: '/assets/partials/edit.html',
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
  .when('/addshop', {
    templateUrl: 'assets/partials/addshop.html',
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
    $httpProvider.interceptors.push('authInterceptor');
});

 angular
    .module('app')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location'];

  function authInterceptor($rootScope, $q, $location) {

    return {

      // intercept every request
      request: function(config) {
        var foreignUrl = config.url.indexOf('amazonaws') > -1;
        if(foreignUrl) {
          console.log('yah im fuckde')
          config.headers['Authorization'] = undefined;
        }
        return config;
      }
    };
  }
