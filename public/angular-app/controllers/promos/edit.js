module.exports = ['$scope', '$modalInstance', 'promoService', '$timeout', 'promo',
    function($scope, $modalInstance, promoService, $timeout, promo) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.promoCopy = angular.copy(promo);

        $scope.editPromo = function() {
            promoService.updatePromo($scope.promoCopy.id, $scope.promoCopy).then(function(res) {
                $scope.saved = true;
                $timeout(function() {
                    $modalInstance.close(res.data);
                    $scope.saved = false;
                }, 1000);
            })
        }
    }
]