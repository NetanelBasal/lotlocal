'use strict'


module.exports =

[

    function() {
        return {
            restrict: 'A',
            template: '<input type="button" ng-value="textMoreLess" ng-click="moreLessLines()" class="btn secondry-btn btn-sm">',
            link: function($scope, elem, attr) {

                $scope.numLotLineToShow = _.range(1, 11);
                $scope.numLines = 5;
                $scope.textMoreLess = '+ More lines';
                $scope.moreLessLines = function() {
                    if ($scope.numLines > 5) {
                        $scope.numLines = 5;
                        $scope.textMoreLess = '+ More lines';
                    } else {
                        $scope.numLines = 10;
                        $scope.textMoreLess = '- Less lines';
                    }
                }
            }
        };
    }
]