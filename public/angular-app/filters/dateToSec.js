'use strict'
module.exports = function() {
    return function(date) {
        if (date) {
            var date = new date(date);
            return date.getTime();
        } else {
            return '';
        }
    }
}