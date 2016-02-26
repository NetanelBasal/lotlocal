module.exports = ['$scope', '$modalInstance', 'promoService', 'promo',

    function($scope, $modalInstance, promoService, promo) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.deletePromo = function() {
            promoService.delPromo(promo.id).then(function(res) {
                if (res.data.delete) {
                    $modalInstance.close(res.data.delete);
                }
            });
        }
    }
]