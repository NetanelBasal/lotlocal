module.exports = function() {
    return function($scope, element) {
         $scope.setArrowDown = function(fieldName) {
            return $scope.predicate == fieldName && $scope.reverse;
        }
        $scope.setArrowUp = function(fieldName) {
            return $scope.predicate == fieldName && !$scope.reverse;
        }
    }
}