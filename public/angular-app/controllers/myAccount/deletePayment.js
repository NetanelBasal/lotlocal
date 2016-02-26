module.exports = ['$scope', '$modalInstance', 'paymentsService', 'payment',
    function($scope,$modalInstance, paymentsService, payment) {

        $scope.payment = payment;
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');

        };

    $scope.deletePayment = function() {
            paymentsService.deletePayment($scope.payment.id).then(function(res) {
                if (res.data.delete) {
                    $modalInstance.close(res.data.delete);
                }
            });

        }

    }
]