module.exports = ['$scope', '$modalInstance','promo',

    function($scope, $modalInstance,promo) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.promo = promo;

        $scope.deletePromo = function() {
            $scope.promo.deleted = true;
            $modalInstance.close($scope.promo);
        }

    }
]