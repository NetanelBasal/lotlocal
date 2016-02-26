'use strict'
module.exports = ['$rootScope', '$interval',
function($rootScope, $interval) {
    return {
        restrict: 'A',
        link: function($scope, element) {
            $scope.currentTesti = 0;
            $scope.testi = $rootScope.operatorConfig.testis[$scope.currentTesti];
            $scope.nextTestis = function() {
                if (($scope.currentTesti + 1) == $rootScope.operatorConfig.testis.length) return;
                $scope.testi = $rootScope.operatorConfig.testis[++$scope.currentTesti];
            }
            $scope.prevTestis = function() {
                if ($scope.currentTesti == 0) return;
                $scope.testi = $rootScope.operatorConfig.testis[--$scope.currentTesti];
            }
            $interval(function() {
                if (($scope.currentTesti + 1) == $rootScope.operatorConfig.testis.length) {
                    $scope.testi = $rootScope.operatorConfig.testis[0];
                    --$scope.currentTesti;
                } else {
                   $scope.testi = $rootScope.operatorConfig.testis[++$scope.currentTesti];
               }

           }, 700000)
        }
    }
}
]