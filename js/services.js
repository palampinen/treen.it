var API_URL = 'http://minnemenna.com/dev/wp-content/plugins/omafressi/dev/api/',
	API_USER = 'pasilampinen',
	API_PASS = 'iaY25mx',
	API_CENTERURL = 'https://fressi.bypolar.fi/mobile/10/history.html';

	
// TEMP
var logindata = {};
logindata.username = API_USER;
logindata.password = API_PASS;
logindata.center = API_CENTERURL;
	
angular.module('treenit.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})


// TOTAL TRAININGS
.factory('Trainings', ['$http','$q', function ($http, $q) {



	return {
		all: function() {

			
			var deferred = $q.defer();
			$http({
					method: 'GET',
					url : API_URL, 
					params: {'command':'all', 'TREENI_USER':logindata.username, 'TREENI_PASS':logindata.password, 'TREENI_CENTER':logindata.center},
				})
				.success(function(data, status) {
					//return data;
					deferred.resolve(data)
				})
				.error(function(data, status) {
					deferred.reject(data);
					//alert("Error");
			});
			return deferred.promise;
		}
	};

  
  
}])

// MONTH ACTIVITY
.factory('MonthActivity', ['$http','$q', function ($http, $q) {

	

	return {
		all: function() {
			var deferred = $q.defer();
			
			$http({method : 'GET',url : API_URL, params: {command:'month', TREENI_USER: logindata.username, TREENI_PASS:logindata.password, TREENI_CENTER:logindata.center}})
				.success(function(data, status) {
					//return data;
					
					deferred.resolve(data)
				})
				.error(function(data, status) {
					deferred.reject(data);
					//alert("Error");
			});
			return deferred.promise;
		}
	};
	
	
  
}]);

