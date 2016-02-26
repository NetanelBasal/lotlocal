module.exports = ['$http','ENV',
function($http, ENV) {
    this.getLotteries = function() {
        return $http[ENV.method](ENV.apiOffer + '/draw/product');
    };
    this.getLatestResults = function() {
        return $http.get('api/latest-results');
    };
    this.getLatestResultsDetails = function() {
        return $http.get('api/lottery-results-details');
    };
    this.getLatestResultsDetailsByDate = function() {
        return $http.get('api/lottery-results-details-by-date');
    };

    this.getGroupPlay = function() {
        return $http.get('api/group');
    };

}
];