var app = angular.module("app", ['ngRoute', 'geolocation', 'addCtrl',  'ngFileUpload']);
app.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {
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
  .when('/show/:id', {
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
    .otherwise({
      redirectTo: '/'
    });
    // $locationProvider.html5Mode(true);
}]);
