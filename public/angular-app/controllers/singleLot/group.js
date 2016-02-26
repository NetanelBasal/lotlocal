module.exports = ['$scope','cartService','$state',
function($scope,cartService,$state) {
    $scope.open = {
        one:true
    };
    $scope.toggleAcc = function(index) {
        angular.forEach($scope.open, function(ind, val) {
            $scope.open[val] = false;
        })
        $scope.open[index] = !$scope.open[index];
    }
    $scope.firstOpen = true;
    $scope.lot.numShares = 1;
    $scope.toggleNumShares = function(way) {
        if (way == 1) $scope.lot.numShares++;
        if (way == -1) {
            if ($scope.lot.numShares !== 1) {
                $scope.lot.numShares--
            }
        }
    }
    $scope.calcTotal = function() {
        return ($scope.bundle.numberOfDraws * $scope.lot.numShares) * $scope.bundle.pricePerDraw;
    }
    $scope.addToCart = function() {
      $scope.currentLot = {
        lotLines: $scope.lotLines,
        lottery:$scope.lot.lottery,
        draw:$scope.bundle,
        type:'singleGroup',
        numShares: $scope.lot.numShares,
        price: $scope.calcTotal()
    }
    cartService.addToCart('singleGroup', $scope.currentLot).then(function(res) {
        $state.go('cart.auth');
    });
}
}
]