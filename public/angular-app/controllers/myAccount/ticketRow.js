module.exports = ['$scope',
    function($scope) {
        $scope.toggleSelected = function() {

            $scope.selected = !$scope.selected;
        };
        $scope.isSelected = function() {
            return $scope.selected;
        };
    }
]