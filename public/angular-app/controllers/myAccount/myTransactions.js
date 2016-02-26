module.exports = ['$scope', 'accountService',
    function($scope, accountService) {
        accountService.getTransactions().then(function(res) {
            $scope.transactions = res.data.data;
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

        $scope.test = function() {
            alert('Not implemented yet');
        }

        $scope.openRowIf = function(transaction) {
           return transaction.type == 'Win' || transaction.type == 'Purchase' || transaction.type == 'Deposit';
        }

    }
]