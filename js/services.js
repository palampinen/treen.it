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
.factory('Trainings', ['$http','$q', 'User','$ionicLoading', function ($http, $q, User, $ionicLoading) {

	
	var myUser = User.all();
	return {
		all: function() {
				
				$ionicLoading.show({
				  template: '<i class="icon ion-ios7-reloading"></i> Haetaan treenit...'
				});
				
				
				var deferred = $q.defer();
				$http({
						method: 'GET',
						url : API_URL, 
						params: {
							'command':'all', 
							'TREENI_USER'	: myUser.username, 
							'TREENI_PASS'	: myUser.password, 
							'TREENI_CENTER'	: myUser.center,
							'TREENI_LAST'	: localStorage.getItem('treenit-data-last')
						},
					})
					.success(function(data, status) {
						console.log(data);
						// Merge data
						
						
						var oldData = localStorage.getItem('treenit-data'),
							newData;
						if(oldData)
							newData= JSON.parse(oldData).concat(data);
						else 
							newData = data
						
						localStorage.setItem('treenit-data', JSON.stringify( newData) );
						
						// Update last update timestamp
						var d = new Date();
						localStorage.setItem('treenit-data-last', d.getDate()+'.'+(d.getMonth()+1) + '.' +d.getFullYear());
						localStorage.setItem('treenit-data-timestamp', d.getTime());
						
						// Hide loader
						$ionicLoading.hide();
						deferred.resolve(data)
					})
					.error(function(data, status) {
						deferred.reject(data);
						$ionicLoading.hide();
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
			console.log('getting data');
			var deferred = $q.defer();
			
			$http({method : 'GET',url : API_URL, params: {command:'month', TREENI_USER: logindata.username, TREENI_PASS:logindata.password, TREENI_CENTER:logindata.center}})
				.success(function(data, status) {
				
					localStorage.setItem("treenit-month",JSON.stringify(data));
					
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


.factory('User', function() {

//tmp
/*
  var userdata = { 
	name: 		'Pasi Lampinen', 
	sex: 		'male', 
	email:		'palampinen@gmail.com',
	username: 	'pasilampinen',
	password:	'pasipass',
	center:		'',
	centerID: 	''
  }
  */
		var treenitNameSpace = 'treenit-user-';
		/*
			//Clear User Data;
			localStorage.setItem(treenitNameSpace+'name'	, '')
			localStorage.setItem(treenitNameSpace+'center'	, '')
			localStorage.setItem(treenitNameSpace+'sex'		, '')
			localStorage.setItem(treenitNameSpace+'email'	, '')
			localStorage.setItem(treenitNameSpace+'username', '')
			localStorage.setItem(treenitNameSpace+'password', '')
			localStorage.setItem('treenit-data', '')
			localStorage.setItem('treenit-data-last', '')
			localStorage.setItem('treenit-data-timestamp', '')
		*/
	

		
		var userdata = { 
			name: 		localStorage.getItem(treenitNameSpace+'name'), 
			sex: 		localStorage.getItem(treenitNameSpace+'sex'), 
			email:		localStorage.getItem(treenitNameSpace+'email'),
			username: 	localStorage.getItem(treenitNameSpace+'username'),
			password:	localStorage.getItem(treenitNameSpace+'password'),
			center:		localStorage.getItem(treenitNameSpace+'center'),
			centerID: 	localStorage.getItem(treenitNameSpace+'centerID')
		}
		

		
	
	return {
		isAuthed: function() {
			return (localStorage.getItem(treenitNameSpace+'username') && localStorage.getItem(treenitNameSpace+'password'));
		},
		get: function (key) {
			return user;
		},
		some: function() {
			return user.name;
		},
		save: function(data) {
			if(data.name) 		localStorage.setItem(treenitNameSpace+'name'	, data.name)
			if(data.center) 	localStorage.setItem(treenitNameSpace+'center'	, data.center)
			if(data.sex) 		localStorage.setItem(treenitNameSpace+'sex'		, data.sex)
			if(data.email) 		localStorage.setItem(treenitNameSpace+'email'	, data.email)
			if(data.username) 	localStorage.setItem(treenitNameSpace+'username', data.username)
			if(data.password) 	localStorage.setItem(treenitNameSpace+'password', data.password)
			if(data.center) 	localStorage.setItem(treenitNameSpace+'center'	, data.center)
		},
		all: function() {
			return userdata;
		}
		
	};
	
	
	
	return userdata;
	
})

.factory('appAuth', ['$http','$q','$ionicLoading', function ($http, $q, $ionicLoading) {
	

	return {
		validateAuth: function(credentials) {
			if (! (credentials.username && credentials.password && credentials.center))
				return false;
			
			return true;
			
			if( localStorage.getItem('treenit-user-username') &&
				localStorage.getItem('treenit-user-username') &&
				localStorage.getItem('treenit-user-center') )
				return true;
		},
		auth: function(credentials) {

			var deferred = $q.defer();
			
			$ionicLoading.show({
			  template: '<i class="icon ion-ios7-reloading"></i> Tarkistetaan...'
			});
			
			$http({
				method: 'GET',
				url : API_URL, 
				params: {'command':'auth', 'TREENI_USER':credentials.username, 'TREENI_PASS':credentials.password, 'TREENI_CENTER':credentials.center},
			})
			.success(function(data, status) {
				
				$ionicLoading.hide();
				deferred.resolve(data)

			})
			.error(function(data, status) {
				$ionicLoading.hide();
				deferred.reject(data);
				//alert("Error");
			});
			return deferred.promise;
		},
		localAuth: function() { // This should be useless
			
			return (
				localStorage.getItem('treenit-user-username') &&
				localStorage.getItem('treenit-user-username') &&
				localStorage.getItem('treenit-user-center') 
				);
			
		}
	}


}])

.factory('Treenidata', ['User', function(User) {
	
	var treenitJSON = JSON.parse( localStorage.getItem('treenit-data'));
//	console.log(treenitJSON);
	var treeni = new Treenit(User.all().name, treenitJSON);
	return {
		count: function() {
			return treeni.count();
		},
		thisweek: function() { 
			return treeni.getThisWeekActivity();
		},
		lastvisit: function() {
			return treeni.getTimeFromLastVisit();
		},
		weeklyAverage: function() {
			return treeni.getWeeklyAverage();
		},
		favdays: function() {
			return treeni.getFavDays();
		},
		thisYearCount: function() {
			return treeni.getThisYearCount();
		},
		yearActivity: function() {
			return treeni.getYearActivity();
		},
		yearActivityChart: function() {
			return treeni.getYearActivityChart();
		},
		longestStreak: function() {
			return treeni.getLongestStreak();
		},
		latestCountByDays: function(days) {
			return treeni.getLatestCountByDays(days);
		}
	
	}
}])