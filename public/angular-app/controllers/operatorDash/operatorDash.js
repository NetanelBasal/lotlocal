module.exports = ['$scope', 'operatorService', '$rootScope', 'lotService',
function($scope, operatorService, $rootScope, lotService) {

    var operatorConfig = {
        langs: [],
        totalPaid: {
            amount: '',
            currency: '',
            txt: {}
        },
        testis: [{
            imgUrl: '',
            txt: {}
        }],
        why: {
            header: {},
            txt: {}
        },
        latest: [{
            date: '',
            txt: {}
        }],
        products: []
    };

    $scope.config = $rootScope.operatorConfig || operatorConfig;

    lotService.getLotteries().then(function(res) {
        $scope.lotteries = res.data.data.data;
  
        $scope.lottery = $scope.lotteries[0];

        angular.forEach($scope.lotteries, function(lot, val) {
          lot.lottery.slogan = {txt: {}}
           lot.lottery.shortDesc = {txt: {}}
           lot.lottery.fullDesc = {txt: {}}

          
        });
        
        angular.forEach($scope.lotteries, function(lot, val) {
            angular.extend(lot.lottery, $scope.config.products[val]);
        });

    });

    
    $scope.lang = $scope.config.langs[0];
    $scope.langs = [{
        "id": 'en',
        "name": "English"
    }, {
        "id": 'he',
        "name": "Hebrew"
    }, {
        "id": 'fra',
        "name": "France"
    },
    {
        "id": 'ga',
        "name": "German"
    }];
    $scope.saveSettings = function() {
        angular.forEach($scope.lotteries, function(lot) {
            operatorConfig.products.push(lot.lottery);
        });
        $scope.config.products = operatorConfig.products;
        operatorService.saveSettings($scope.config).then(function(res) {
            $scope.saved = true;
        });
    };
}
];