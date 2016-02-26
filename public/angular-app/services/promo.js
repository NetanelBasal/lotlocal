module.exports = ['$http',
    function($http) {
        this.getPromos = function() {
            return $http.get('promo');
        }
        this.updatePromo = function(promoId, promoData) {
            return $http.put('promo/' + promoId, {
                promo: promoData
            })
        }
        this.newPromo = function(promo) {
            return $http.post('promo', {
                promo: promo
            })
        }
        this.delPromo = function(promoId) {
            return $http.delete('promo/' + promoId);
        }



    }
]