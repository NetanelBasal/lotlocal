module.exports = ['$scope', 'operator','adminService',
    function($scope, operator,adminService) {
      $scope.operator = operator.data[0];

      $scope.updateOperator = function() {
          adminService.updateOperator($scope.operator.id, $scope.operator).then(function(res) {
              $scope.updated = true;
          });
      }
    }
]