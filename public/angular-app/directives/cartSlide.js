'use strict'
module.exports = function() {
    return {
        restrict: 'A',
        link: function($scope, element) {
            $(element).on('click', function() {
                var cart = $('.content-cart');
                if (!cart.data('open')) {
                    cart.animate({
                        'right': 0,
                        'top': '-140px'
                    }, function() {
                        $(this).data('open', true);
                    });
                } else {
                    cart.animate({
                        'right': '-1000px',
                        'top': '-41px'
                    }, function() {
                        $(this).data('open', false);
                    });
                }
            });
        }
    }
}