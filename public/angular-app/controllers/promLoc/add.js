module.exports = ['$scope', '$modalInstance', 'promoService', '$timeout',
    function($scope, $modalInstance, promoService, $timeout) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        promoService.getPromos().then(function(res) {
            $scope.promos = res.data[0].promos;
        });

        $scope.AddPromo = function(promo,loc) {
            if(loc == 'first')  promo.first = true;

            $modalInstance.close(promo);
        }
    }
]