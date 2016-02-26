module.exports = /*@ngInject*/ function($scope, accountService) {
    $scope.purchase = {};
    accountService.getSinglePurchase(1).then(function(res) {

        $scope.purchase = res.data.data;
        $scope.purchase.open = true;
    });
}