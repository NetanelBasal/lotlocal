module.exports = ['$scope', 'promoLocService', '$modal',
function($scope, promoLocService, $modal) {

    $scope.getPromosByLoc = function(loc) {
        $scope.saved = false;
        promoLocService.getLoc(loc).then(function(res) {
            $scope.promos = res.data;
        });
    }
    $scope.currentLoc = 'Home';

    $scope.getPromosByLoc('Home');

    $scope.addPromo = function() {
        var addPromoModal = $modal.open({
            templateUrl: 'views/promLoc/add.html',
            controller: 'promLocAddController',
            size: 'lg'
        });
        addPromoModal.result.then(function(promo) {
            if(promo.first) {
                $scope.promos.unshift(promo);
            }else {
                $scope.promos.push(promo);
            }
        });
    }

    $scope.moveTo = function(promo, direction) {
        var index = $scope.promos.indexOf(promo);
        var tmp = $scope.promos[index + direction];
        $scope.promos[index + direction] = promo;
        $scope.promos[index] = tmp;
    }

    $scope.savePromos = function() {

       _.remove($scope.promos, function(promo) { return promo.deleted == true; });

       var promosIds = _.pluck($scope.promos, 'id');
       promoLocService.updatePromLoc(promosIds,$scope.currentLoc).then(function(res) {
        alert('The Promos saved successfully!');
    });


   }

   $scope.delPromo = function(promo) {
    $scope.promo = promo;
    var deletePromoModal = $modal.open({
        templateUrl: 'views/promLoc/delete.html',
        controller: 'promLocDeleteController',
        resolve: {
            promo: function() {
                return $scope.promo;
            }
        },
        size: 'sm'
    });
    deletePromoModal.result.then(function(promo) {
        var index = $scope.promos.indexOf(promo);
        $scope.promos[index] = promo;
    });

}

$scope.returnPromo = function(promo) {
    promo.deleted = false;
    var index = $scope.promos.indexOf(promo);
    $scope.promos[index] = promo;
}
}
]