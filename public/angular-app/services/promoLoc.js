module.exports = ['$http',
    function($http) {


        this.getLoc = function(loc) {
            return $http.get('promoLoc', {params:{
                loc:loc
            }});
        }

        this.updatePromLoc = function(promos,loc) {
             return $http.post('promoLoc', {
                promos: promos,
                loc: loc
            });
        }
    }
]