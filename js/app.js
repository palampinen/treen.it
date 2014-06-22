// Ionic treenit App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'treenit' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'treenit.services' is found in services.js
// 'treenit.controllers' is found in controllers.js
angular.module('treenit', ['ionic', 'treenit.controllers', 'treenit.services'])

.run(function($ionicPlatform,User,$location, Trainings) {
  $ionicPlatform.ready(function() {
	if(!User.isAuthed())
		$location.path('/intro')
	else
	Trainings.all()
		.then(function(data) {
			//console.log(data);	
		}, function(data) {
			// call returned an error
			alert('Yhteysongelma');
		});
	
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
	
	// Intro
	.state('intro', {
		url: '/intro',
		templateUrl: 'templates/intro.html',
		controller: 'IntroCtrl'
	})
	
	
	
    // setup an abstract state for the tabs directive
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
	  controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

    .state('app.dash', {
      url: '/dash',
      views: {
        'menuContent': {
          templateUrl: 'templates/app-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
	
	.state('app.timeline', {
      url: '/timeline',
      views: {
        'menuContent': {
          templateUrl: 'templates/app-timeline.html',
          controller: 'TimelineCtrl'
        }
      }
    })
	
	.state('app.timeline-detail', {
      url: '/timeline/:date',
      views: {
        'menuContent': {
          templateUrl: 'templates/app-timeline-detail.html',
          controller: 'TimelineDetailCtrl'
        }
      }
    })

    .state('app.friends', {
      url: '/friends',
      views: {
        'menuContent': {
          templateUrl: 'templates/app-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('app.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'menuContent': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/app-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dash');

});

