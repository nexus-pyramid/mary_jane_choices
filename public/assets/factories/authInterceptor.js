app.factory('requestInterceptor', ['$q', '$rootScope','$location', function($q, $rootScope, $location ) {  
    var requestInterceptor = {
        request: function(config) {
            console.log('yo')
           var foreignUrl = config.url.indexOf('amazonaws') > -1;
        if(foreignUrl) {
          config.headers['Authorization'] = undefined;
        }
        return config; 
        }
    };
    return requestInterceptor;
}]);