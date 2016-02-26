module.exports = ['$scope', 'authService', '$state', 'userService', '$modalInstance','infoService',
function($scope, authService, $state, userService, $modalInstance,infoService ) {
    $scope.form = {};
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
    infoService.getCountries().then(function(res) {
        $scope.countries = res.data;
    });
    $scope.newUser = {};
    $scope.registerUser = function() {
        $scope.submitted = true;
        if ($scope.form.signUpForm.$valid) {
            authService.registerUser($scope.newUser).then(function(res) {
                $scope.user = {
                    userName:$scope.newUser.email,
                    password: $scope.newUser.password,
                    email:$scope.newUser.email
                };
                authService.loginUser($scope.user).then(function(res) {
                    userService.user = {userName:res.data.data.userName};
                    $modalInstance.dismiss('cancel');
            });

            });
        }
    }
    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }
}
]