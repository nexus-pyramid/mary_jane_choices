// (function() {
//   'use strict';
//
//   angular
//     .module('app')
//     .controller('dashController', dashController);
//   dashController.$inject = ['$location', '$scope', 'userFactory'];
//
//   function dashController($location, $scope, userFactory){
//     function getdelivery_servs() {
//       console.log("in the delivery service function");
//       UserFactory.getdelivery_servs(function(data){
//         $scope.delivery_services = data
//         $scope.newdelivery_service = {};
//       });
//     }
//   }
//   console.log('jiodwejd')
//   console.log(dashController)
// })
// // console.log('in the dashboardController');
// // var app = angular.module('app');
// console.log(app)
// var app = angular.module('app');
app.controller('dashboardController', function($scope, deliveryFactory, $location){
  $scope.login = function(){
  deliveryFactory.login($scope.delivery_serviceInfo, function(data){
    $scope.errors = [];
    if(data['errors']){
    $scope.errors.push(data['errors']);
    }
    else {
      // $scope.loginfo = '';
      $location.url('/success');
    }
  });
}
});
// console.log('in the dashController')
// console.log(app)
