'use strict'

module.exports =

[

    function() {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/lot-pagination.html',
            scope: {
                paginationConfig: '='
            },

            link: function($scope, elem, attr) {

                $scope.currentPage = $scope.paginationConfig.currentPage;
                $scope.lastPage = $scope.paginationConfig.lastPage;


                $scope.nextPage = function() {
                    $scope.currentPage++;
                }

                $scope.prevPage = function() {
                    $scope.currentPage--;
                }

                $scope.isFirst = function() {
                    return $scope.currentPage == 1;
                }

                $scope.isLast = function() {
                    return $scope.currentPage == $scope.lastPage;
                }

                $scope.$watch('currentPage', function(page) {
                    var data = {
                        page: page,
                        method: $scope.method
                    }
                    $scope.$emit('pageChange', data);
                });

                $scope.$on('dataChange', function(e, data) {
                    $scope.currentPage = data.currentPage;
                    $scope.lastPage = data.lastPage;
                    $scope.method = data.method;
                });
            }
        };
    }
];