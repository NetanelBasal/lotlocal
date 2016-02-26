module.exports = ['$http', 'userService', '$q', 'ENV',
function($http, userService, $q, ENV) {

    this.getPayments = function() {
        return $http[ENV.method](ENV.apiActivity + '/payments');
    }

    this.addPayment = function(payment) {
        return $http.post(ENV.apiPaymentMethod + '/create', payment);
    }

    this.deletePayment = function(paymentId) {
        return $http.delete('api/player/activity/payments/' + paymentId);
    }


    this.updatePayment = function(paymentId, paymentData) {
        return $http.put('api/player/activity/payments/' + paymentId, paymentData);
    }

    this.checkIfUserHasPaymentMethod = function() {
        return $http.get('checkIfUserHasPaymentMethod');
    }

}
]