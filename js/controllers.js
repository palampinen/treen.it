angular.module('starter.controllers', [])

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
		title: 'kk treenit'
	};

	
	
	$scope.monthactivity = []; 
	
	MonthActivity.all()
        .then(function(data) {
            // call was successful

			
			var gData = new google.visualization.DataTable(data);
			var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			chart.draw(gData, options);
			
            $scope.monthactivity = data;
			
        }, function(data) {
            // call returned an error
			alert('fail');
        });
	
	
	

}]);
