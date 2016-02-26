'use strict'
module.exports = ['$interval',function($interval) {
  return {
    restrict: 'A',
    templateUrl:'views/directives/mbSlider.html',
    scope: {
      imgWidth: '@',
      galleryData: '='
    },
    link: function($scope, element) {

      $scope.selected = $scope.galleryData[0];

      $scope.scrollTo = function(image, ind) {
        $scope.listPosition = {
          left: (parseInt($scope.imgWidth) * ind * -1) + "px"
        };
        $scope.selected = image;
      }

      var i = 0;
      var autoSlide = function() {
        $scope.scrollTo($scope.galleryData[i], i);
        if (i + 1 == $scope.galleryData.length) {
          i = 0;
        } else {
          i++;
        }
      }
      var autoSlideInterval = $interval(autoSlide, 5000);
      $scope.startAutoSlide = function() {
        autoSlideInterval = $interval(autoSlide, 5000);
      }
      $scope.stopAutoSlide = function() {
        $interval.cancel(autoSlideInterval);
      }
    }
  }
}]