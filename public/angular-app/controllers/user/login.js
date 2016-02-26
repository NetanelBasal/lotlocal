module.exports = ['$scope', '$modalInstance', '$timeout', 'authService', 'userService', 'paymentsService', '$state', '$rootScope','ENV',
    function($scope, $modalInstance, $timeout, authService, userService, paymentsService, $state, $rootScope,ENV) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.user = {};
        $scope.loginUser = function() {
            $scope.user.userName = $scope.user.email;
            authService.loginUser($scope.user).then(function(res) {
                userService.user = {userName:res.data.data.userName};
                    // userService.user.client_id = res.data.data.clientId;
                    // userService.user.client_secret = 'Bearer' + res.data.data.clientSecret;
                    var client = {
                        grant_type: 'operator',
                        client_id:'XbsuauKOEthYt2eTpfqGq7kdBFEkTPOO0ePqjvnJtZ8%253D',
                        client_secret:'rTqtRtzX8urBxI5aF5rKdkIjrfWp05flFSkfbhWpL7Y%253D',


                    }
                    if(ENV.api !== 'dev') {
                        authService.getToken(client).then(function(res) {
                    });
                    }

                paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                    userService.user.hasPayment = res.data.hasPayment;
                });
                if ($state.includes('cart')) $rootScope.$broadcast('userLoggenIn');

                $modalInstance.dismiss('cancel');
            }, function() {
                $scope.wrongCred = true;
            });
        }
    }
]