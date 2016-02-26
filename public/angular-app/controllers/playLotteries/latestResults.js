module.exports = ['$scope','lotService','$filter',
function($scope,lotService,$filter) {

    lotService.getLatestResults().then(function(res) {
        $scope.lotteries = res.data.data;
    });

    $scope.reverse = '';
    $scope.predicate = '';

    $scope.sort = function(fieldName) {
        if ($scope.predicate === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.predicate = fieldName;
            $scope.reverse = true;
        }
    };


}
]