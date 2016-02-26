module.exports = ['$scope', 'paymentsService', '$timeout', '$modal',
function($scope, paymentsService, $timeout, $modal) {

    paymentsService.getPayments().then(function(res) {
        $scope.payments = res.data;
    });
        // $scope.paginationConfig = {
        //     currentPage: payments.current_page,
        //     lastPage: payments.last_page
        // }
        // $scope.$on('pageChange', function(e, data) {
        //     var method = data.method || '';
        //     paymentsService.getPayments(data.page, method).then(function(res) {
        //         $scope.payments = res.data;
        //         var data = {
        //             currentPage: res.current_page,
        //             lastPage: res.last_page
        //         }
        //         if (method !== '') {
        //             data.method = method;
        //         }
        //         $scope.$broadcast('dataChange', data);
        //     });
        // });
$scope.card = {};
paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
    $scope.hasPayment = res.data.hasPayment;
});
$scope.addPayment = function() {
    var addPaymentModal = $modal.open({
        templateUrl: 'views/myAccount/payments/add.html',
        controller: 'addPaymentController',
        resolve: {
            hasPayment: function() {
                return $scope.hasPayment;
            }
        },
        size: 'sm'
    });
    addPaymentModal.result.then(function(payment) {
        if (payment.isDefault) {
            _($scope.payments).forEach(function(payment) {
                payment.isDefault = false;
            });
        }
        $scope.payments.push(payment);
    });
}
$scope.del = function(payment) {
    $scope.payment = payment;
    var deleteModal = $modal.open({
        templateUrl: 'views/myAccount/payments/delete.html',
        controller: 'deletePaymentController',
        resolve: {
            payment: function() {
                return $scope.payment;
            }
        },
        size: 'sm'
    });
    deleteModal.result.then(function(data) {
        if (data) {
            $scope.payments.splice($scope.payments.indexOf(payment), 1);
        }
    });
}
$scope.paymentCopy = {};
$scope.updatePayment = function(payment) {
    $scope.paymentCopy = angular.copy(payment);
    $scope.payment = payment;
    $scope.paymentCopy.month = $scope.paymentCopy.expiration.substr(0, 2);
    $scope.paymentCopy.year = Number($scope.paymentCopy.expiration.substr(3));
    var updateModal = $modal.open({
        templateUrl: 'views/myAccount/payments/update.html',
        controller: 'updatePaymentController',
        resolve: {
            payment: function() {
                return $scope.paymentCopy;
            },
            paymentsLen: function() {
                return $scope.payments.length;
            }
        },
        size: 'sm'
    });
    updateModal.result.then(function(selectedPayment) {
        var index = $scope.payments.indexOf($scope.payment);
        if (selectedPayment.isDefault) {
            _($scope.payments).forEach(function(payment) {
                payment.isDefault = false;
            });
        }
        if (index !== -1) {
            $scope.payments[index] = selectedPayment;
        }
    });
};
$scope.methodFilter = function() {
    var data = {
        method: $scope.payment.method
    }
    $scope.$emit('pageChange', data);
}
}
];