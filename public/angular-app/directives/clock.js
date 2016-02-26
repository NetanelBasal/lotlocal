'use strict'


module.exports = ['$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.tickInterval = 1000;

                var tick = function() {
                    $scope.clock = Date.now(); // get the current time
                    $timeout(tick, $scope.tickInterval); // reset the timer
                };

                // Start the timer
                $timeout(tick, $scope.tickInterval);
            }
        }
    }
]