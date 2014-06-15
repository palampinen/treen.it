angular.module('treenit.controllers', [])



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
          content: 'Käynnistä treenit',
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


.controller('AppCtrl', function($scope, $location, User) {

	$scope.isItemActive = function(item) {
		//console.log($location.path());
		return $location.path().indexOf(item) > -1;
	};
	
	$scope.user = User;

})

.controller('DashCtrl', ['Trainings', '$scope', function (Trainings, $scope) {
	
	
	
		
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
	gauge.set(4);

	
// 1	
	var e = document.getElementById("num1"),
		t=parseFloat(e.innerHTML,10),
		n=0,
		r=(t/25),
		i=setInterval(function(){
			n+=r,e.innerHTML=(Math.round(n*10) / 10).toFixed(1),n>=t&&(e.innerHTML=(Math.round(t*10) / 10).toFixed(1),window.clearInterval(i))
		},40);
	
	var e2 = document.getElementById("num2"),
		t2=parseInt(e2.innerHTML,10),
		n2=0,
		r2=Math.ceil(t2/25),
		i2=setInterval(function(){
			n2+=r2,e2.innerHTML=n2,n2>=t2&&(e2.innerHTML=t2,window.clearInterval(i2))
		},40);
		
	
	var e3 = document.getElementById("num3"),
		t3=parseInt(e3.innerHTML,10),
		n3=0,
		r3=Math.ceil(t3/25),
		i3=setInterval(function(){
			n3+=r3,e3.innerHTML=n3,n3>=t3&&(e3.innerHTML=t3,window.clearInterval(i3))
		},40);
		
	var e4 = document.getElementById("num4"),
		t4=parseInt(e4.innerHTML,10),
		n4=0,
		r4=Math.ceil(t4/25),
		i4=setInterval(function(){
			n4+=r4,e4.innerHTML=n4,n4>=t4&&(e4.innerHTML=t4,window.clearInterval(i4))
		},40);
	
	
	/*
		var t=parseInt(e.text(),10);
		var n=0;
		var r=Math.ceil(t/25);
		var i=setInterval(function(){
				n+=r,e.text(n),n>=t&&(e.text(t),window.clearInterval(i))
		},40);
	*/
	
	
	
	
	$scope.trainings = [];
	
	Trainings.all()
        .then(function(data) {
            // call was successful
            $scope.trainings = data;
        }, function(data) {
            // call returned an error
            alert('Treenejä ei saatu haettua');
        });
		
		

	// $scope.trainings = Trainings.all();
}])



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
  
  
  // GAUGE TEST
	/*
  	var opts = {
	  lines: 12, // The number of lines to draw
	  angle: 0.5, // The length of each line
	  lineWidth: 0.01, // The line thickness

	  limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
	  colorStart: '#fff',   // Colors
	  colorStop: '#fff',    // just experiment with them
	  strokeColor: '#666',   // to see which ones work best for you
	  generateGradient: false
	};
	var target = document.getElementById('gauge1'); // your canvas element
	var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 7; // set max gauge value
	gauge.animationSpeed = 12; // set animation speed (32 is default value)
	gauge.set(5);
	*/
  
  
    	/* Google Chart */
	var options = {
		title: 'Treenit kuukausittain',
		curveType: 'function',
		colors: ['#CF5777'],
		legend: 'none',
		lineWidth: 2,
        pointSize: 10,
		pointShape: 'circle',
		crosshair: { trigger: 'vertical' },
		backgroundColor: 'transparent',
		fontName:'RobotoLight'
		
	};

	

	$scope.monthactivity = []; 
	
	
	
	if( localStorage.getItem('treenit-month') ) {
	
		var data = JSON.parse(localStorage.getItem('treenit-month'));
		var gData = new google.visualization.DataTable(data),
			chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
		chart.draw(gData, options);
			
        $scope.monthactivity = data;	
	
	} else
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

.controller('AccountCtrl', ['MonthActivity', '$scope', function ( $scope) {

	


	

}]);
