module.exports = ['$scope', '$modalInstance', '$modal', '$state', 'hasPayment',
    function($scope, $modalInstance, $modal, $state, hasPayment) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.hasPayment = hasPayment;
        $scope.addPaymentMethod = function() {
            $modalInstance.dismiss('cancel');
            $modal.open({
                templateUrl: 'views/myAccount/payments/add.html',
                controller: 'addPaymentController',
                size: 'sm'
            });
        }
    }
]