app.controller('navController', function($rootScope, $scope, UserService, UserFactory){

	  $scope.UserService = UserService;

	$rootScope.$on('loggedin', function () {
		console.log('ayeeeeee wereel ogging in')
  		$scope.UserService = UserService;
  		console.log($scope.UserService)
	});

	  
	$scope.logout = function(){
		$scope.UserService = '';
		UserFactory.logout(function(data){
			if(data['errors']){
				console.log('Could not log out user')
			} else {
				console.log('')
			}
		})
	}
})