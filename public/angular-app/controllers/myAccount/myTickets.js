module.exports = ['$scope','accountService',
    function($scope,accountService) {
        accountService.getTickets().then(function(res) {
           $scope.tickets = res.data.data.data;
        });



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