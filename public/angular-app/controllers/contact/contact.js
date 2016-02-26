module.exports = ['$scope', 'contactService',
    function($scope, contactService) {
        $scope.checkErrors = function(field, err) {
            return $scope.submitted && field.$error[err];
        }
        $scope.sendMessage = function() {
            $scope.submitted = true;
            if ($scope.contactForm.$valid) {
                contactService.saveContact($scope.user).then(function(res) {
                    $scope.saved = true;
                })
            }
        }
    }
]