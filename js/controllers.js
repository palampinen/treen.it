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


.controller('AppCtrl', function($scope) {

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

	
	/* Google Chart */
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

	
	/* gauge.js */
	
	var opts = {
	  lines: 12, // The number of lines to draw
	  angle: 0.24, // The length of each line
	  lineWidth: 0.05, // The line thickness
	  pointer: {
		length: 0.9, // The radius of the inner circle
		strokeWidth: 0.035, // The rotation offset
		color: '#000000' // Fill color
	  },
	  limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
	  colorStart: '#000',   // Colors
	  colorStop: '#000',    // just experiment with them
	  strokeColor: '#E0E0E0',   // to see which ones work best for you
	  generateGradient: false
	};
	var target = document.getElementById('gauge1'); // your canvas element
	var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 7; // set max gauge value
	gauge.animationSpeed = 32; // set animation speed (32 is default value)
	gauge.set(3);
	
	
	var target = document.getElementById('gauge2'); // your canvas element
	var gauge2 = new Donut(target).setOptions(opts); // create sexy gauge!
	gauge2.maxValue = 30; // set max gauge value
	gauge2.animationSpeed = 32; // set animation speed (32 is default value)
	gauge2.set(23);
	
	var target = document.getElementById('gauge3'); // your canvas element
	var gauge3 = new Donut(target).setOptions(opts); // create sexy gauge!
	gauge3.maxValue = 365; // set max gauge value
	gauge3.animationSpeed = 32; // set animation speed (32 is default value)
	gauge3.set(56);
	
	
	

}]);
