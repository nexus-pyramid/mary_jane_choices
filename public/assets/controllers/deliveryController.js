app.controller('deliveryController', function($scope, deliveryFactory, countyFactory, $location, $routeParams){
  function getDeliveries(){
    deliveryFactory.getDeliveries(function(data){
      $scope.deliveries = data;
    });
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
    })
  }getCities();
  deliveryFactory.show($routeParams._id, function(delivery){
    console.log(delivery);
    console.log($scope.delivery);
    $scope.delivery = delivery;
  });
  $scope.show = function(){
    deliveryFactory.show($scope.delivery._id, $scope.delivery, function(data){
      console.log(data + " helloooooo");
      if(data['errors']){
      $scope.errors.push(data['errors']);
      } else{
        // $scope.delivery = data;
        console.log(data);
        console.log($scope.delivery);
        $location.url('/show/'+ _id);
      }
    })
  }

});
