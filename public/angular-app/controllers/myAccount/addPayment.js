module.exports = ['$scope','$modalInstance', 'paymentsService', '$timeout','userService',
function($scope, $modalInstance, paymentsService, $timeout,userService) {
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
    $scope.form = {};
    $scope.user = {
        card: {
            defaultP: false
        }
    };
    $scope.addPayment = function() {
        $scope.submitted = true;
        if ($scope.form.addPaymentForm.$valid) {
            if (!userService.user.hasPayment) {
                $scope.user.card.defaultP = true;
            }
            $scope.user.card.expiration = $scope.user.card.month + '-' + $scope.user.card.year;
            console.log($scope.user.card);
            paymentsService.addPayment($scope.user.card).then(function(res) {
                if (res.data.saved) {
                    userService.user.hasPayment = true;
                    $scope.saved = true;
                    $timeout(function() {
                        $modalInstance.close(res.data.payment);
                        $scope.card = {};
                        $scope.saved = false;
                    }, 1000);
                }
            });
        }
    };
}
]