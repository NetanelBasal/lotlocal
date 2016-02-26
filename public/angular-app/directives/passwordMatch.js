module.exports = ['$parse',
    function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    var valid = $parse(attrs.match)(scope) === ctrl.$modelValue;
                    ctrl.$setValidity('mismatch', valid);
                });
            }
        }
    }
]