'use strict'

module.exports = function() {
    return function(tran) {

        if (tran == '') {
            return '-';
        } else {
            return tran;
        }

    }
}