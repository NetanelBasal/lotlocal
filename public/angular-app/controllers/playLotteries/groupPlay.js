module.exports = ['$scope','lotService','cartService','$state',
function($scope,lotService,cartService, $state) {
  $scope.open = {
    one:true
  };
  $scope.firstOpen = true;
  $scope.toggleAcc = function(index) {
    angular.forEach($scope.open, function(ind, val) {
      $scope.open[val] = false;
    });
    $scope.open[index] = true;
  }
  lotService.getGroupPlay().then(function(res) {
    angular.forEach(res.data.data, function(pack, index) {
      pack.numShares = 1;
      pack.month = 1;
    });
    $scope.packs = res.data.data;
  });

  $scope.userClickedPlay = false;

  $scope.closeOthers = function(pack) {
    angular.forEach($scope.packs, function(pack) {
      pack.addToCart = false;
      pack.leave = true;
    });

    pack.addToCart = !pack.addToCart;
    pack.leave = false;

  }
  $scope.toggleCart = function(pack) {
    pack.addToCart = !pack.addToCart;
  }

  $scope.month = 1;

  $scope.toggleNumShares = function(way, pack) {
    if(way == 1)  pack.numShares++;
    if(way == -1) {
      if(pack.numShares !== 1)
      {
       pack.numShares--
     }
   }
 }

 $scope.changeMonth = function(month ,pack) {
  pack.month = month;
}

$scope.calcPrice = function(pack) {
  return pack.price * pack.month * pack.numShares;
}

$scope.addToCart = function(pack) {
  pack.price= $scope.calcPrice(pack);
  pack.type = 'groups';
  cartService.addToCart( 'groups',pack).then(function(res) {
    $state.go('cart.auth');
  });
}



}
]