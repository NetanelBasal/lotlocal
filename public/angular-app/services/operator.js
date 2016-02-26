module.exports = ['$http',
    function($http) {
        this.saveSettings = function(config) {
            return $http.post('saveOperatorSettings', {operatorConfig:config})
        }
    }
]