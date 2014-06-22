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
	$scope.thisweek  = 0;
	$scope.thisweek = thisweek;

	
	
	 CanvasJS.addColorSet("mainChartColors",
                [
					"#45CCBE",
					"rgba(116,217,206,.03)"      
                ]);
	
	var chart = new CanvasJS.Chart("mainChart",
	{
			backgroundColor:'transparent',
			interactivityEnabled: 'false',
			theme: "theme1",
			colorSet: 'mainChartColors',
			toolTip: {
				enabled:false
			},
			data: [
			{     
				type: "doughnut",
				indexLabelFontFamily: "Raleway",       
				indexLabelFontSize: 20,
				startAngle:-90,
				indexLabelLineColor: "#CCC", 
				toolTipContent: "{y} XYZ", 					

				dataPoints: [
				{  y: thisweek },
				{  y: 7-thisweek }
				//{  y: 4 }
				]
			}
			]
	});

	chart.render();
	
	
	
		
/* gauge.js */
/*	
	var opts = {
	  lines: 14, // The number of lines to draw
	  angle: 0.9, // The length of each line
	  lineWidth: 0.05, // The line thickness
	  limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
	  colorStart: '#45CCBE',   // Colors
	  colorStop: '#45CCBE',    // just experiment with them
	  //strokeColor: '#E7ABBB',   // to see which ones work best for you
//	  strokeColor: 'rgba(235,235,235,0.4)',   
	  strokeColor: '#ABABAB',   //
	  generateGradient: false
	};
	var target = document.getElementById('gauge1'); // your canvas element
	var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 7; // set max gauge value
	gauge.animationSpeed = 10; // set animation speed (32 is default value)
	gauge.set(thisweek);
*/


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
	
	$scope.weekAverage   = 0;
	$scope.total 		 = 0;
	$scope.thisYearCount = 0;
	$scope.past30Days 	 = 0
	
	$scope.weekAverage 		= Treenidata.weeklyAverage();
	$scope.total 			= Treenidata.count();
	$scope.thisYearCount 	= Treenidata.thisYearCount();
	$scope.past30Days 		= Treenidata.latestCountByDays(30);
	
	
	
	$scope.trainings = [];
		

})



.controller('TimelineCtrl', function($scope, Friends,Treenidata) {
	
	var months = [],
		kesaData = Treenidata.monthCalendar(2014,5);
		toukoData = Treenidata.monthCalendar(2014,4);
		huhtiData = Treenidata.monthCalendar(2014,3);
	
	
	kesaData.total = Treenidata.monthCount(2014,5);
	toukoData.total = Treenidata.monthCount(2014,4);
	huhtiData.total = Treenidata.monthCount(2014,3);
		
	months.push(kesaData);
	months.push(toukoData);
	months.push(huhtiData);
	$scope.months = months;
	

	
})
  
  
  



.controller('FriendsCtrl', function($scope,MonthActivity, Treenidata) {
  

/* Google Chart 
	var options = {
		title: 'Treenit kuukausittain',
		curveType: 'function',
		colors: ['#45CCBE','#666','#333'],
		//colors: ['#000','#555','#999'],
		legend: 'none',
		lineWidth: 2,
        pointSize: 6,
		pointShape: 'circle',
		backgroundColor: 'transparent',
		fontName:'RobotoLight',
		//width:'500',
		legend: {
			textStyle: {
				color: '#eee'
			},
			position: 'bottom' 
		},
		chartArea: {
            left: 40,
            top: 10,
            width: window.innerWidth-60,
            height: 320
        },
		vAxis: {
			viewWindow:{
				min:0,
				max:32
			},
			gridlines:{
				count:4,
				color:'#222'
			},
			titleTextStyle:{
				color:'#eee'
			},
			textStyle:{
				color:'#eee'
			}
		},
		hAxis: {
			titleTextStyle: {
				color:'#eee'
			},
			textStyle:{
				color:'#eee'
			}
		},
		titleTextStyle: {
			color:'#eee'
		}
		
		
	};
	
		google.setOnLoadCallback(function(){
		console.log('g.setOnLoadCallback');
	});
	
			
		
		var monthdata = Treenidata.yearActivityChartDT(2),
			//datatable = google.visualization.arrayToDataTable(monthdata),
			gData = new google.visualization.DataTable(monthdata),
			chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
			//chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
		chart.draw(gData, options);	
		$scope.monthactivity = monthdata;
	//	console.log(data);
	
*/

	var d = new Date();
	
	$scope.monthactivity = []; 
	
	
	
	var monthdata = Treenidata.yearActivityChartCJS(2,'spline')

	
	

	CanvasJS.addColorSet("treeniShades",
					[
					"#45CCBE",
					"#666",
					"#333",
					"#222",
					"#111"                
					]);

	var chart = new CanvasJS.Chart("chart_div",
		{
		  colorSet:  "treeniShades",
		  backgroundColor: "transparent",
		  theme:"theme1",
		  title:{
			//text: "",
			fontFamily:"RobotoLight",
			fontweight: "100"
		  },
		  axisX :{
			includeZero: false,
			labelFontFamily: "RobotoLight",
			labelFontColor:"#eee",
			labelFontSize:10,
			lineColor: "#222",
			lineThickness: 1,
			tickColor: "#000",
			gridThickness: 1,
			gridColor: '#222',
			stripLines:[
				{
				thickness:1,
				value: d.getMonth() + (d.getDate() / 32),
				color:"#CF5777"
				}
			]
		  },
		  axisY :{
			includeZero: true,
			labelFontFamily: "RobotoLight",
			labelFontColor:"#eee",
			lineColor: "#000",
			tickColor: "#000",
			gridThickness: 1,
			gridColor: '#333',
			maximum: 30
			
		  },
		  toolTip: {
			shared: "true"
		  },
		  legend:{
			fontFamily:  "RobotoThin",
			fontColor:"#eee",
			fontSize:24,
			cursor:"pointer",
			itemclick : function(e) {
			  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
				e.dataSeries.visible = false;
			  }
			  else {
				e.dataSeries.visible = true;
			  }
			  chart.render();
			}
			
		  },
		  data: monthdata,
		  
		});

		chart.render();
		
	

	
	
	var months = [
		'tammi',
		'helmi',
		'maalis',
		'huhti',
		'touko',
		'kesä',
		'heinä',
		'elo',
		'syys',
		'loka',
		'marras',
		'joulu'
	];
	
	
	
	
	$scope.thisMonthName 	= months[d.getMonth()];
	$scope.thisDay 			= d.getDate();
	$scope.thisYearCount 	= Treenidata.thisYearCount();
	$scope.lastYearCount 	= Treenidata.yearCountToDate( d.getFullYear()-1, new Date(d.getFullYear()-1, d.getMonth(),d.getDate()));

		

		
	/*
	MonthActivity.all()
        .then(function(data) {
            // call was successful
			
			console.log(data);
			
			var gData = new google.visualization.DataTable(data);
			var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
			chart.draw(gData, options);
			
            $scope.monthactivity = data;
			
	
			
			
        }, function(data) {
            // call returned an error
			alert('Tietoja ei saatu haettua.');
        });
  
  */
  
  
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
