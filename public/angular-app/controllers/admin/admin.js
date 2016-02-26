module.exports = ['$scope', 'adminService',
    function($scope, adminService) {
        adminService.getOperators().then(function(res) {
            $scope.operators = res.data;
        });

        // $scope.promos = [];
        // $scope.promos.push({
        //     img: '',
        //     url: ''
        // });
        $scope.users = [{
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }];
        // $scope.addPromo = function() {
        //     $scope.promos.push({
        //         img: '',
        //         url: ''
        //     });
        // }
        $scope.addUser = function() {
            $scope.users.push({
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            })
        }
        $scope.removeUser = function() {
            $scope.users.pop();
        }
        // $scope.delPromo = function() {
        //     $scope.promos.pop();
        // }
        $scope.showNewPartner = false;
        $scope.toggleNewOperator = function() {
            $scope.showNewOperator = !$scope.showNewOperator;
        }
        // $scope.addPromos = function() {
        //     $scope.showAddPromos = !$scope.showAddPromos;
        // }
        $scope.addOperator = function() {
            adminService.newOperator($scope.operator, $scope.users).then(function(res) {
                $scope.operator = {};
                $scope.users = [{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                }];
                //$scope.promos = {};
                $scope.operatorForm.$setPristine();
                $scope.operatorAdded = true;
            }, function() {
                $scope.operatorFailed = true;
            });
        }
        $scope.deleteOperator = function(operatorId) {
            if (confirm('Are you sure?')) {
                adminService.delOperator(operatorId).then(function(res) {
                    $scope.deleted = true;
                });
            }
        }
    }
]