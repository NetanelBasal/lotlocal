'use strict'


module.exports = function() {
    return {
        restrict: 'A',
        templateUrl: 'views/directives/slider.html',
        link: function($scope, element) {
            var boxWidth = 140 + 32,
                sliderSize = $scope.lotteries.length,
                slider = $('.wrapSlider'),
                numBoxesToShow = slider.data('numBoxesToShow'),
                current = numBoxesToShow,
                backToStart = (sliderSize * boxWidth) - (numBoxesToShow * boxWidth),
                action;
            $('.slider').css('maxWidth', boxWidth * $scope.lotteries.length);
            $('.wrap-controls').css('maxWidth', boxWidth * $scope.lotteries.length);


//             $scope.next= function() {
//   $('#lot-list').slickNext();
// }
// $scope.prev= function() {
//   $('#lot-list').slickPrev();
// }
            $('.control-btn').on("click", function() {

                var direction = $(this).data('dir');

                if (direction == 'right') {
                    ++current;
                    action = '-=' + boxWidth;
                } else {
                    if (current == numBoxesToShow) return;
                    --current;
                    action = '+=' + boxWidth;
                }

                if (current == (sliderSize + 1)) {
                    slider.animate({
                        'marginLeft': '+=' + backToStart
                    });
                    current = numBoxesToShow;
                    return;
                }
                slider.animate({
                    'marginLeft': action
                });
            });
        }
    }
}