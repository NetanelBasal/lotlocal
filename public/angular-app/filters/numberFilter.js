'use strict'

module.exports = ['$filter',function($filter) {
    return function(input) {

        if (isNaN(input)) {
            return input;
        } else {
            return $filter('number')(input, 0);
        }

    }
}]