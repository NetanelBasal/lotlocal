module.exports = function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.on('click', function() {
                $(this).next().slideToggle();
            });
        }
    };
};