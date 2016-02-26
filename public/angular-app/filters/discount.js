'use strict'

module.exports = function() {
    return function(num) {

        if (num == undefined) {
            return 'No Discount';
        } else {
            return num + '% Discount';
        }

    }
}