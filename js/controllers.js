angular.module('starter.controllers', [])

.controller('DashCtrl', ['Trainings', '$scope', function (Trainings, $scope) {
	
	
	$scope.trainings = []; 
	
	Trainings.all()
        .then(function(data) {
            // call was successful
            $scope.trainings = data;
        }, function(data) {
            // call returned an error
            $scope.trainings = data;
        });
	
	
 // $scope.trainings = Trainings.all();
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
