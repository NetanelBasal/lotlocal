module.exports = ['$scope',
    function($scope) {
          $scope.addTestis = function() {
            console.log('dad');
            $scope.config.testis.push({
                imgUrl: '',
                txt: {}
            })
        }
        $scope.lang = $scope.config.langs[0];
    }
]