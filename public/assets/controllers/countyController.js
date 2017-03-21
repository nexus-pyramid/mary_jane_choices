app.controller('countyController', function($scope, deliveryFactory, $location){
  function getcounties(){
    countyFactory.getcounties(function(data){
      $scope.counties = data
    })
  }getDeliveries();
  function getFlowers(){
    deliveryFactory.getFlowers(function(data){
      $scope.flowers = data;
      console.log(data);
    })
  }getFlowers();
});
