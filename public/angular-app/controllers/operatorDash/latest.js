module.exports = ['$scope',
    function($scope) {

        $scope.addNews = function() {
            $scope.config.latest.push({
                date: '',
                txt: {}
            })
        }

        $scope.lang = $scope.config.langs[0];
    }
]