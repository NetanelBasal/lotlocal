module.exports = ['$http',
    function($http) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                elem.on('blur', function() {
                    if (elem.val().length > 5) {
                        scope.$apply(function() {
                            var checkemail = $http.post('check-email-exists', {
                                email: elem.val()
                            });
                            checkemail.success(function(response) {
                                ctrl.$setValidity('checkemailexists', response.email);
                            });
                        });
                    }

                });
            }
        }
    }
]