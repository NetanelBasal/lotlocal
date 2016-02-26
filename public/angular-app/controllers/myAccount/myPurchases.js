module.exports = ['$scope','accountService',
function($scope, accountService) {
    accountService.getPurchases().then(function(res) {
        $scope.purchases = res.data.data.data;
    });

    $scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    $scope.reverse = '';
    $scope.predicate = '';

    $scope.sort = function(fieldName) {
        if ($scope.predicate === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.predicate = fieldName;
            $scope.reverse = false;
        }
    };
}
]