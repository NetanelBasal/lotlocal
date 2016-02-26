'use strict'

module.exports = function() {
    return function(moneyType) {
        switch (moneyType) {
            case 'CAD':
                return 'CAD&#36;';
            case 'EURO':
                return '&euro;';
            case 'DOLLAR':
                return '&#36;'
        }
    }
}