module.exports = ['$scope', 'paymentsService', 'userService', 'authService', '$rootScope', 'cartService', 'infoService',
function($scope, paymentsService, userService, authService, $rootScope, cartService, infoService) {
    $scope.user = {};
    $scope.user.country = userService.user.country || 'Israel';
    infoService.getPolicy().then(function(res) {
        $scope.policies = res.data.data;
    });
    infoService.getTerms().then(function(res) {
        $scope.terms = res.data.data;
    });


    infoService.getStates().then(function(res) {
        $scope.states = res.data;
    });
    $scope.expiration = {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        year: _.range(2014, 2026)
    };
    $scope.form = {};
    $scope.addPayment = function() {
        $scope.submitted = true;
        if ($scope.form.paymentForm.$valid) {
            $scope.user.card.expiration = $scope.user.card.month + '-' + $scope.user.card.year;
            $scope.user.card.defaultP = true;
            paymentsService.addPayment($scope.user.card).then(function() {
                $scope.paymentRecived = true;
                $rootScope.cartLen = 0;
                cartService.clearItems();
            });
        }
    }
    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }
}
]