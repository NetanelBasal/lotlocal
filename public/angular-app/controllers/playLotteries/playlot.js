module.exports = ['$scope','lotteries','$state',
function($scope,lotteries, $state) {
  $scope.lotteries = lotteries.data.data.data;
  $scope.$state = $state;
}
]