module.exports = ['$http',
    function($http) {

        this.getOperators = function() {
            return $http.get('admin');
        }

        this.newOperator = function(operator, users) {
            return $http.post('admin', {
                operator: {
                    operator: operator,
                    users: users
                    //promos: promos
                }
            })
        }

        this.updateOperator = function(operatorId, operatorData) {
            return $http.put('admin/' + operatorId, {
                operator: operatorData
            });
        }

        this.delOperator = function(operatorId) {
            return $http.delete('admin/' + operatorId);
        }
    }
];