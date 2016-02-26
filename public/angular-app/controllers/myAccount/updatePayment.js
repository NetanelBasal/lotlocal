module.exports = ['$scope', 'payment', '$modalInstance', 'paymentsService', '$timeout', 'paymentsLen',
function($scope, payment, $modalInstance, paymentsService, $timeout, paymentsLen) {

    $scope.expiration = {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        year: _.range(2014, 2026)
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }

    $scope.paymentCopy = payment;
    // $scope.paymentCopy.number = 'xxxxxxxxxxxxx2478';
    $scope.form = {};
    $scope.update = function() {
        if (paymentsLen == 1) {
            $scope.paymentCopy.defaultP = true;
        }
        $scope.submitted = true;
        if($scope.form.updateCard.$valid) {
            $scope.paymentCopy.expiration = $scope.paymentCopy.month + '-' + $scope.paymentCopy.year;
            paymentsService
            .updatePayment($scope.paymentCopy.id, $scope.paymentCopy)
            .then(function(res) {
                if (res.data.update) {
                    $scope.updateMe = true;
                    $timeout(function() {
                        $scope.updateMe = false;
                        $modalInstance.close(res.data.payment);
                    }, 1000);
                }
            });
        }

    }
}
]