module.exports = ['$scope', 'operator', 'promoService', '$modal','promoLocService',
function($scope, operator, promoService, $modal,promoLocService) {


    $scope.promos = operator.data[0].promos;


    $scope.addPromo = function() {
        var addPromoModal = $modal.open({
            templateUrl: 'views/promos/add.html',
            controller: 'addPromoController',
            size: 'lg'
        });
        addPromoModal.result.then(function(promo) {
            $scope.promos.push(promo);
        });


    }
    $scope.editPromo = function(promo) {
        $scope.promo = promo;
        var editPromoModal = $modal.open({
            templateUrl: 'views/promos/edit.html',
            controller: 'editPromoController',
            resolve: {
                promo: function() {
                    return $scope.promo;
                }
            },
            size: 'lg'
        });
        editPromoModal.result.then(function(promo) {
            var index = $scope.promos.indexOf($scope.promo);
            if (index !== -1) {
                $scope.promos[index] = promo;
            }
        });
    }
    $scope.delPromo = function(promo) {
        $scope.promo = promo;
        var deleteModal = $modal.open({
            templateUrl: 'views/promos/delete.html',
            controller: 'deletePromoController',
            resolve: {
                promo: function() {
                    return $scope.promo;
                }
            },
            size: 'sm'
        });
        deleteModal.result.then(function(deleted) {
            if (deleted) {
                $scope.promos.splice($scope.promos.indexOf($scope.promo), 1);
            }
        });
    }


}
]