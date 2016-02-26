module.exports = ['$scope', 'paymentsService', 'userService', '$modal',
    function($scope, paymentsService, userService, $modal) {
        // $scope.birthday = {
        //     day: _.range(1, 32),
        //     month: _.range(1, 13),
        //     year: _.range(1900, 2015)
        // }

        $scope.openChangePass = function() {
            $scope.changePass = true;
        }
        $scope.closeChangePass = function() {
            $scope.changePass = false;
            $scope.user.password = '';
            $scope.user.oldPassword = '';
            $scope.confirmPassword = '';
            $scope.userInfoForm.$setPristine();
        }

        paymentsService.checkIfUserHasPaymentMethod()
            .then(function(res) {
                userService.setHasPaymentMethod(res.data.hasPayment);
            });


        $scope.user = {
            firstname: 'Yaron',
            lastname: 'Biton',
            email: 'misterBit@gmail.com',
            phoneOne: {
                area:222,
                num:547253636
            }
        }


        paymentsService.checkIfUserHasPaymentMethod()
            .then(function(res) {
                $scope.depositView = (res.data.hasPayment) ? 'hasPayment.html' : 'noPayments.html';
            });


        $scope.openDeposite = function() {

            var depositModal = $modal.open({
                templateUrl: 'views/myAccount/payments/' + $scope.depositView,
                controller: 'depositController',
                size: 'sm',
            });
        }


    }
]