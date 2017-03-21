app.controller('deliveryController', function($scope, deliveryFactory, countyFactory, $location){
  function getDeliveries(){
    deliveryFactory.getDeliveries(function(data){
      $scope.deliveries = data
    })
  }getDeliveries();
  function getFlowers(){
    deliveryFactory.getFlowers(function(data){
      $scope.flowers = data;
      console.log(data);
    })
  }getFlowers();
  function getCities(){
    countyFactory.getCities(function(data){
      $scope.cities = data;
      console.log('in the getCities method' + data);
    })
  }
});
