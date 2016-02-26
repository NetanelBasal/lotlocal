'use strict'
module.exports = ['$location', '$anchorScroll',
    function($location, $anchorScroll) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.scrollTo = function(section) {
                    $location.hash(section);
                    $anchorScroll();
                }
                $scope.isActive = function(info) {
                    return info.head == $location.hash();
                }
            }
        }
    }
]