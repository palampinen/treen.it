angular.module('treenit.controllers', [])



// INTRO 
.controller('IntroCtrl', function($scope, $state, $rootScope, $location, User, appAuth, Trainings, $ionicViewService) {
	
	

	var startApp = function() {

		// Set a flag that we finished the intro
		window.localStorage['didIntro'] = true;
		
		// Disable back
		$ionicViewService.nextViewOptions({
		  disableAnimate: true,
		  disableBack: true
		}); 
		
		
		Trainings.all()
		.then(function(data) {
			$state.go('app.dash');

		}, function(data) {
			// call returned an error
			alert('Treenejä ei saatu haettua');
		});
		
		
		//$state.go('app.dash');
		
	};
	
	if( User.isAuthed()){
		startApp();
		return;
	}
	
	
	$scope.user = User.all();

	$scope.tryAuth = function() {	

		var credentials = {
		  "username": $scope.user.username,
		  "password": $scope.user.password,
		  "center"	: $scope.user.center
		};
	
		if(appAuth.validateAuth(credentials)){

			appAuth.auth(credentials)
			.then(function(data) {
				// call was successful

				console.log(data);
				if(data.result == "1"){
					User.save(data);
					startApp();
				}else
					alert('Tunnukset eivät kelpaa');
				
			}, function(data) {
				// call returned an error
				alert('Yhteysongelma');

			});
		}
	}
	


})


.controller('AppCtrl', function($scope, $location, User) {

	$scope.isItemActive = function(item) {
		//console.log($location.path());
		return $location.path().indexOf(item) > -1;
	};
	
	$scope.user = User.all();

})

.controller('DashCtrl', function (Trainings, $scope, Treenidata) {
	
	var thisweek = Treenidata.thisweek();
	$scope.thisweek = thisweek;
		
	/* gauge.js */
	
	var opts = {
	  lines: 12, // The number of lines to draw
	  angle: 0.33, // The length of each line
	  lineWidth: 0.05, // The line thickness
	  limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
	  colorStart: '#45CCBE',   // Colors
	  colorStop: '#45CCBE',    // just experiment with them
	  //strokeColor: '#E7ABBB',   // to see which ones work best for you
	  strokeColor: 'rgba(235,235,235,0.4)',   // to see which ones work best for you
	  generateGradient: false
	};
	var target = document.getElementById('gauge1'); // your canvas element
	var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 7; // set max gauge value
	gauge.animationSpeed = 10; // set animation speed (32 is default value)
	gauge.set(thisweek);

/*
// 	Counters
var numCounterFlag = true;
if(numCounterFlag) {
	numCounterFlag = false;
	var e = document.getElementById("num1"),
		t=parseFloat(e.innerHTML,10),
		n=0,
		r=(t/25),
		i=setInterval(function(){
			n+=r,e.innerHTML=(Math.round(n*10) / 10).toFixed(1),n>=t&&(e.innerHTML=(Math.round(t*10) / 10).toFixed(1),window.clearInterval(i))
		},60);
}
*/
	
	
	
	$scope.weekAverage 		= Treenidata.weeklyAverage();
	$scope.total 			= Treenidata.count();
	$scope.thisYearCount 	= Treenidata.thisYearCount();
	$scope.past30Days 		= Treenidata.latestCountByDays(30);
	
	
	$scope.trainings = [];
		

})



.controller('TimelineCtrl', function($scope) {

  var d = new Date().getDate(),
	  html = 'test';

  for($i = parseInt(d);$i > 0; $i--){
	if($i%2)
		html += '<li class="hasevent">'+$i+'</li>';
	else
		html += '<li>'+$i+'</li>';
		
	//	console.log(html);
	}
  $scope.day = html;
	
})
  
  
  



.controller('FriendsCtrl', function($scope, Friends,MonthActivity) {
  $scope.friends = Friends.all();
  

    /* Google Chart */
	var options = {
		title: 'Treenit kuukausittain',
		curveType: 'function',
		colors: ['#45CCBE','#F4DB1F','#CF5777'],
		legend: 'none',
		lineWidth: 2,
        pointSize: 10,
		pointShape: 'circle',
		crosshair: { trigger: 'vertical' },
		backgroundColor: 'transparent',
		fontName:'RobotoLight',
		//width:'500',
		chartArea: {
            left: 40,
            top: 10,
            width: window.innerWidth-60,
            height: 320
        }
		
	};


	

	$scope.monthactivity = []; 
	
	
	/*
	if( localStorage.getItem('treenit-month') ) {
	
		var data = JSON.parse(localStorage.getItem('treenit-month'));
		console.log(data);
		var gData = new google.visualization.DataTable(data),
			chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
		chart.draw(gData, options);
			
        $scope.monthactivity = data;	
	
	} else
	*/
	MonthActivity.all()
        .then(function(data) {
            // call was successful
			
			var gData = new google.visualization.DataTable(data);
			var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
			chart.draw(gData, options);
			
            $scope.monthactivity = data;
			
        }, function(data) {
            // call returned an error
			alert('Tietoja ei saatu haettua.');
        });

  
  
  
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, User) {

	$scope.user = User.all();
	
	$scope.save = function() {
		$scope.User.$save();
		//$location.path('/');
	};
	
});
