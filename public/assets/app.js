var app = angular.module("app", ['ngRoute', 'geolocation', 'addCtrl',  'ngFileUpload','ui.bootstrap']);
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
    controller: 'adminController'
  })
  .when('/dispensaries',{
   templateUrl: 'assets/partials/dispensary.html',
   controller: 'dispensaryController'
  })
  .when('/login',{
   templateUrl: 'assets/partials/login.html',
   controller: 'loginController'
  })
  .when('/delivery/:id', {
   templateUrl: 'assets/partials/delivery.html',
   controller: 'deliveryController'
  })
  .when('/deliveries', {
    templateUrl: 'assets/partials/deliveries.html',
    controller:  'addCtrl'
  })
  .when('/articles', {
    templateUrl: 'assets/partials/article.html',
    controller:  'ArticlesController'
  })
  .when('/register', {
    templateUrl: 'assets/partials/register.html',
    controller:  'addCtrl'
  })
  .when('/register/user', {
    templateUrl: 'assets/partials/userregister.html',
    controller:  'addCtrl'
  })
  .when('/register/business', {
    templateUrl: 'assets/partials/businessregister.html',
    controller:  'addCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
    // $locationProvider.html5Mode(true);
});
