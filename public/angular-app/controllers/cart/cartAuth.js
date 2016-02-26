module.exports = ['$scope', 'authService', 'userService', 'paymentsService', '$state', 'infoService', 'userService', 'loc',
    function($scope, authService, userService, paymentsService, $state, infoService, userService, loc) {
        /*==========  login user  ==========*/
        $scope.user = {};
        $scope.promos = loc.data;
        $scope.loginUser = function() {
            authService.loginUser($scope.user).then(function(res) {
                userService.user = {userName: res.data.data.userName};
                paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                    userService.user.hasPayment = res.data.hasPayment;
                    if (!userService.user.hasPayment ) {
                        userService.user.country = 'Israel';
                        $state.go('cart.payment');
                    } else {

                        paymentsService.getPayments().then(function(res) {
                            $scope.$parent.payments = res.data;
                            $scope.$parent.payment = res.data[0];
                        });
                    }
                });
            }, function() {
                $scope.wrongCred = true;
            });
        }
        /*==========  sign up  ==========*/
        infoService.getCountries().then(function(res) {
            $scope.countries = res.data;
        });
        $scope.form = {};
        $scope.newUser = {};
        $scope.registerUser = function() {
            $scope.submitted = true;
            if ($scope.form.signUpForm.$valid) {
                authService.registerUser($scope.newUser).then(function(res) {
                    $scope.currentUser = {
                        email:$scope.newUser.email,
                        password: $scope.newUser.password
                    }
                    $scope.user.userName = $scope.user.email;
                    authService.loginUser($scope.currentUser).then(function(res) {
                        userService.user = {
                            userName: res.data.data.userName
                        };
                        userService.user.country = $scope.newUser.country.nicename;
                        $state.go('cart.payment');
                    });
                });
            }
        }
        $scope.checkErrors = function(field, err) {
            return $scope.submitted && field.$error[err];
        }
    }
]