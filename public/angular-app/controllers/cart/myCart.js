module.exports = ['$scope', 'cartService', 'authService', 'userService', 'paymentsService', '$rootScope', '$modal',
    function($scope, cartService, authService, userService, paymentsService, $rootScope, $modal) {
        $scope.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.cart = cartService;
        $rootScope.cartLen = $scope.cart.getItemsInCart().length;
        $scope.setPayment = function(payment) {
            $scope.payment = payment;
        }
        var getUserPayments = function() {
            paymentsService.getPayments().then(function(res) {
                $scope.payments = res.data;
                $scope.payment = res.data[0];
            });
        }
        if (userService.user) {
            paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                userService.user.hasPayment = res.data.hasPayment;
            });
            getUserPayments();
        }
        $scope.$on('userLoggenIn', getUserPayments);
        $scope.getTotal = function() {
            var total = 0;
            angular.forEach($scope.cart.getItemsInCart(), function(item) {
                total += item.common.price;
            });
            return total;
        }
        $scope.delItem = function(item, type) {
            $scope.cart.delItem(item, type);
            $rootScope.cartLen--;
            $scope.cart.saveItemsToSession(cartService.items);
        }
        $scope.submitOrder = function() {
            $rootScope.cartLen = 0;
            cartService.clearItems();
            $scope.paymentRecived = true;
        }
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
                $scope.payments.push(payment);
            });
        }
    }
]