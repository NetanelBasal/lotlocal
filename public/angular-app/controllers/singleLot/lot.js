module.exports = ['$scope', '$state', '$stateParams','lotteries', 'cartService',
function($scope, $state, $stateParams,lotteries, cartService) {
    $scope.lot = _.find(lotteries.data.data.data, {
        name: $stateParams.lotName
    });


    $scope.lotLineConfig = $scope.lot.lottery.lineRules;

    $scope.bundle = $scope.lot.bundles[0];


    $scope.lotLines = [];


    $scope.$on('lotLine', function(event, lotLine) {
        if (lotLine.valid) {
            _.remove($scope.lotLines, function(line) {
                return line.id == lotLine.id;
            });
            $scope.lotLines.push(lotLine);
        } else {
            _.remove($scope.lotLines, function(line) {
                return line.id == lotLine.id;
            });
        }
        $scope.lotValid = ($scope.lotLines.length > 0);
    });

    $scope.calcTotal = function() {
        return ($scope.lotLines.length * $scope.bundle.numberOfDraws) * $scope.bundle.pricePerDraw;
    }



    $scope.setBundle = function(bundle) {
        $scope.bundle = bundle;
        $scope.calcTotal();
    }


    $scope.clearAll = function() {
        $scope.$broadcast('clearAll');
    }

    $scope.pickAll = function() {
        $scope.$broadcast('pickAll');
    }

    $scope.play = function() {
        $scope.currentLot = {
            lotLines: $scope.lotLines,
            lottery:$scope.lot.lottery,
            draw:$scope.bundle,
            type:'singles',
            price: $scope.calcTotal()
        }

        cartService.addToCart( 'singles',$scope.currentLot).then(function(res) {
            $state.go('cart.auth');
        });
    }



}
]