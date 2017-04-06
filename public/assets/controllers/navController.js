app.controller('navController', function($scope, UserService){

	  $scope.UserService = UserService;

	  $scope.logout = function(){
	  	$scope.UserService = ''
	  }
})