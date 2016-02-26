'use strict'

module.exports = function() {
    return function(promos,page) {
        var filterdPromos = [];
        angular.forEach(promos, function(val) {
            if(val.loc == page) {
                filterdPromos.push(val);
            }
        });
        return filterdPromos;
    }
}