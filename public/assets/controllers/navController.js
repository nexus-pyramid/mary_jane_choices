app.controller('navController', function($rootScope, $scope, UserService){

	  $scope.UserService = UserService;

	  $rootScope.$on('loggedin', function () {
	  		$scope.UserService = UserService;
		});

	  $scope.logout = function(){
	  	$scope.UserService = ''
	  }
})