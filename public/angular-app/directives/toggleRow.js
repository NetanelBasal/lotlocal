'use strict'


module.exports = function() {
    return {
        restrict: 'A',
        scope: {
            obg: '=',
            dataLen: '='
        },
        link:function($scope,element) {
            $scope.obg.open = false;
            $(element).on("click", function() {
                $scope.$apply(function() {
                 $scope.obg.open = !$scope.obg.open;
                 $(element).next().find('.row-toggle').slideToggle();
                });
            });

            element.hover(function() {
                element.addClass('tr-selected');
            }, function() {
                if(!$scope.obg.open) {
                    element.removeClass('tr-selected');
                }

            })

        }
    }
}
