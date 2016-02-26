module.exports = ['$scope', 'accountService', 'paymentsService', 'userService', '$modal', 'promos',
function($scope, accountService, paymentsService, userService, $modal, promos) {
    $scope.promos = promos.data;
    accountService.getUserInfo().then(function(res) {
        $scope.balance = res.data.data[0].balance;
    });


    $scope.openDeposite = function() {
        var depositModal = $modal.open({
            templateUrl: 'views/myAccount/payments/deposit.html',
            controller: 'depositController',
            resolve: {
                hasPayment: function() {
                    return userService.user.hasPayment;
                }
            },
            size: 'sm',
        });
    }
}
]