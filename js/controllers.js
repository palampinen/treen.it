angular.module('starter.controllers', [])



// INTRO 
.controller('IntroCtrl', function($scope, $state) {
 
  // Called to navigate to the main app
  var startApp = function() {
    $state.go('tab');

    // Set a flag that we finished the tutorial
    window.localStorage['didTutorial'] = true;
  };

  //No this is silly
  // Check if the user already did the tutorial and skip it if so
if(window.localStorage['didTutorial'] === "true") {
    console.log('Skip intro');
    startApp();
  }
  else{
	/*
	setTimeout(function () {
		navigator.splashscreen.hide();
	}, 750);
	*/
  }
  


  // Move to the next slide
  $scope.next = function() {
    $scope.$broadcast('slideBox.nextSlide');
  };

  // Our initial right buttons
  var rightButtons = [
    {
      content: 'Seuraava',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Go to the next slide on tap
        $scope.next();
      }
    }
  ];
  
  // Our initial left buttons
  var leftButtons = [
    {
      content: 'Ohita',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Start the app on tap
        startApp();
      }
    }
  ];

  // Bind the left and right buttons to the scope
  $scope.leftButtons = leftButtons;
  $scope.rightButtons = rightButtons;


  // Called each time the slide changes
  $scope.slideChanged = function(index) {

    // Check if we should update the left buttons || TODO
    if(index > 0) {
      // If this is not the first slide, give it a back button
      $scope.leftButtons = [
        {
          content: 'Takaisin',
          type: 'button-positive button-clear',
          tap: function(e) {
            // Move to the previous slide
            $scope.$broadcast('slideBox.prevSlide');
          }
        }
      ];
    } else {
      // This is the first slide, use the default left buttons
      $scope.leftButtons = leftButtons;
    }
    
    // If this is the last slide, set the right button to || TODO
    // move to the app
    if(index == 1) {
      $scope.rightButtons = [
        {
          content: 'Käynnistä TREENIT',
          type: 'button-positive button-clear',
          tap: function(e) {
            startApp();
          }
        }
      ];
    } else {
      // Otherwise, use the default buttons
      $scope.rightButtons = rightButtons;
    }
  };
})


.controller('DashCtrl', ['Trainings', '$scope', function (Trainings, $scope) {
	
	
	$scope.trainings = []; 
	
	Trainings.all()
        .then(function(data) {
            // call was successful
            $scope.trainings = data;
        }, function(data) {
            // call returned an error
            alert('fail');
        });
	
	
 // $scope.trainings = Trainings.all();
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', ['MonthActivity', '$scope', function (MonthActivity, $scope) {

	
	var options = {
		title: 'kk treenit',
		curveType: 'function',
		colors: ['#333'],
		legend: 'none',
		lineWidth: 2,
        pointSize: 10,
		pointShape: 'circle',
		crosshair: { trigger: 'vertical' }
		
	};

	
	var g = new JustGage({
		id: "myGauge",
		value: 3,
		min: 0,
		max: 7,
		title: "Tämän viikon treenit",
		levelColorsGradient:false,
		shadowSize:0,
		shadowOpacity :0,
		showInnerShadow :false,
		levelColors: new Array('#000'),
		gaugeWidthScale:0.2,
		showMinMax: false
		
	}); 
	
	
	
	$scope.monthactivity = []; 
	
	MonthActivity.all()
        .then(function(data) {
            // call was successful

			
			var gData = new google.visualization.DataTable(data);
			var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
			chart.draw(gData, options);
			
            $scope.monthactivity = data;
			
        }, function(data) {
            // call returned an error
			alert('fail');
        });
	
	
	

}]);
