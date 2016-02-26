'use strict'
module.exports = ['$interval',
    function($interval) {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/lotLine.html',
            scope: {
                lotLineConfig: '='
            },
            link: function($scope, elem, attr) {
                var guessRange = $scope.lotLineConfig.guessRange,
                    requiredSelectedCount = $scope.lotLineConfig.requiredSelectedCount,
                    secondaryGuessRange = $scope.lotLineConfig.secondaryGuessRange,
                    secondaryRequiredSelectedCount = $scope.lotLineConfig.secondaryRequiredSelectedCount,
                    secondaryGuessRangeName = $scope.lotLineConfig.secondaryGuessRangeName,
                    stopTime;
                $scope.lineNum = Number(attr.id.substr(7, 1)) + 1;
                /* generate regular numbers */
                $scope.cells = [];
                $scope.hasExtra = !!(secondaryGuessRange);
                _(_.range(1, guessRange + 1)).forEach(function(num) {
                    $scope.cells.push({
                        num: num,
                        isSelected: false
                    });
                });
                /* generate extra numbers */
                $scope.extraNumscells = [];
                _(_.range(1, secondaryGuessRange + 1)).forEach(function(num) {
                    $scope.extraNumscells.push({
                        num: num,
                        isSelected: false
                    });
                });
                /* final numbers */
                $scope.lotLine = {
                    nums: [],
                    extra: []
                };
                $scope.$watch('lotLine', function(lotLine) {
                    var finalLotLine = {
                        valid: true,
                        id: attr.id,
                        lotLine: $scope.lotLine
                    }
                    if ((lotLine.nums.length == requiredSelectedCount) && (lotLine.extra.length == secondaryRequiredSelectedCount)) {
                        $scope.lineValid = true;
                        $scope.$emit('lotLine', finalLotLine);
                    } else {
                        $scope.lineValid = false;
                        finalLotLine.valid = false;
                        $scope.$emit('lotLine', finalLotLine);
                    }
                }, true);
                /* the user clicked on number */
                $scope.userPickNum = function(cell) {
                    if (cell.isSelected) {
                        cell.isSelected = false;
                        _.pull($scope.lotLine.nums, cell.num);
                    } else {
                        if ($scope.lotLine.nums.length < requiredSelectedCount) {
                            cell.isSelected = true;
                            $scope.lotLine.nums.push(cell.num);
                        } else {
                            console.log('no more');
                        }
                    }
                };
                /* pick extra number */
                $scope.userPickExtraNum = function(cell) {
                    if (cell.isSelected) {
                        cell.isSelected = false;
                        _.pull($scope.lotLine.extra, cell.num);
                    } else {
                        if ($scope.lotLine.extra.length < secondaryRequiredSelectedCount) {
                            cell.isSelected = true;
                            $scope.lotLine.extra.push(cell.num);
                        } else {
                            console.log('no more');
                        }
                    }
                }



                $scope.$watch('pickCount', function(newVal) {
                    if(newVal == 4) {
                      $interval.cancel(stopTime);
                    }
                })

                /* the user wants quick pick */
                $scope.quickPick = function() {
                    $scope.pickCount = 0;
                    stopTime = $interval(function() {
                        $scope.clearLot();
                        $scope.lotLine.nums = _.sample(_.range(1, guessRange + 1), requiredSelectedCount);
                        _($scope.lotLine.nums).forEach(function(num) {
                            var num = _.find($scope.cells, {
                                num: num
                            });
                            num.isSelected = true;
                        });
                        $scope.lotLine.extra = _.sample(_.range(1, secondaryGuessRange + 1), secondaryRequiredSelectedCount);
                        _($scope.lotLine.extra).forEach(function(num) {
                            var num = _.find($scope.extraNumscells, {
                                num: num
                            });
                            num.isSelected = true;
                        });
                        $scope.pickCount++;
                    }, 300);

                }
                /* clear numbers */
                $scope.clearNums = function() {
                    $scope.clearLot();
                }
                $scope.clearLot = function() {
                    _($scope.cells).forEach(function(num) {
                        num.isSelected = false;
                    });
                    _($scope.extraNumscells).forEach(function(num) {
                        num.isSelected = false;
                    });
                    $scope.lotLine.nums = [];
                    $scope.lotLine.extra = [];
                }
                $scope.$on('clearAll', function() {
                    $scope.clearLot();
                });
                $scope.$on('pickAll', function() {
                    $scope.quickPick();
                });
            }
        };
    }
]