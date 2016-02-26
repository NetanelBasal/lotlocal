module.exports = ['$scope', 'promos', '$rootScope', 'promosBox','$interval','lotteries','lotService',
function($scope, promos, $rootScope, promosBox,$interval,lotteries,lotService) {

  $scope.lotteries = lotteries.data.data.data;
  $scope.mainLot = lotteries.data.data.data[0];
  $scope.promos = promos.data;

 

  $scope.galleryData = [
  'http://placehold.it/430x293&text=promo-one',
  'http://placehold.it/430x293&text=promo-two',
  'http://placehold.it/430x293&text=promo-three'


  ];
$scope.next= function() {
  $('#main-promos').slickNext();
}
$scope.prev= function() {
  $('#main-promos').slickPrev();
}

$scope.prevTestis = function() {
  $('#testis-slider').slickPrev();
}
$scope.nextTestis = function() {
  $('#testis-slider').slickNext();
}
  $scope.slides =
  [
      'images/main-slider/promo.png',
      'images/main-slider/promo2.png'
  ]





}
];