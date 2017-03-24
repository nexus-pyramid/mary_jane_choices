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
  function getReviews(){
    deliveryFactory.getReviews(function(data){
      console.log(data)
      $scope.reviews = data;
    });
  }getReviews();

  // deliveryFactory.show($routeParams.id, function(data){
  //   console.log($routeParams.id);
  //   console.log('hello');
  //   $scope.delivery = data;
  //   console.log(data)
  // });
  $scope.visitDelivery = function(){
    console.log('in the visitdelivery in delivery controller');
    deliveryFactory.visit(deliveryId, function(data){
      if(data['errors']){
        $scope.errors.push(data['errors'])
      } else {
        $scope.delivery = data;
        console.log('visitdelivery' + data);
        $location.url('/delivery/'+deliveryId);
      }
    })
  }
  $scope.addReview = function( deliveryId){
    console.log(deliveryId);
    console.log($scope.newReview);
    deliveryFactory.addReview(newReview, deliveryId, function(data){
      if(data['errors']){
        $scope.errors.push(data['errors']);
      } else {

        getReviews();
      }
    })
  }
  $scope.show = function(){
    deliveryFactory.show($scope.delivery._id, $scope.delivery, function(data){
      console.log(data + " helloooooo");
      if(data['errors']){
      $scope.errors.push(data['errors']);
      } else{
        // $scope.delivery = data;
        console.log(data);

        $location.url('/delivery/'+ _id);
      }
    });
  }

});
