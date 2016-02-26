module.exports = ['$http','ENV',
function($http,ENV) {

    this.getUserInfo = function() {
        return $http.get('api/user');
    }

    this.getTransactions = function() {
        return $http[ENV.method](ENV.apiActivity + '/transactions');
    }

    this.getTickets = function() {
        return $http[ENV.method](ENV.apiActivity + '/tickets');
    }
    this.getPurchases = function() {
        return $http[ENV.method](ENV.apiActivity + '/purchases');
    };

    this.getSinglePurchase = function(id) {
        return $http.post(ENV.apiActivity + '/purchase/' + id);
    }


}
]