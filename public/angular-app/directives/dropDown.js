'use strict'


module.exports = function() {
    return {
        restrict: 'A',
        link:function($scope,element) {
            element.msDropDown();
        }
    }
}