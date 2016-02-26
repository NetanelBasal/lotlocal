module.exports = ['$scope', 'lotService', 'lot','$rootScope','$stateParams',
    function($scope, lotService, lot,$rootScope,$stateParams) {
        $scope.lot = lot.data.data.lottery;
       
             $scope.currentLot = _.find($rootScope.operatorConfig.products, function(lot) {
                    return lot.id == $stateParams.id;
                });


        $scope.lot.date = $scope.lot.dates[0];
        lotService.getLatestResultsDetailsByDate().then(function(res) {
            $scope.byDateDetails = res.data.data;
        });
        $scope.changeNums = function() {
            if ($scope.lot.date == '2014-06-27T02:21:07.567') {
                $scope.byDateDetails.draw.winningNumbers.numberResults = [1,2,23,3,4,5];
                $scope.byDateDetails.draw.winningNumbers.secondaryNumberResults = [34]
            } else {
              $scope.byDateDetails.draw.winningNumbers.numberResults = [44,5,17,24,28,9];
              $scope.byDateDetails.draw.winningNumbers.secondaryNumberResults = [13]
            }
        }
    }
]