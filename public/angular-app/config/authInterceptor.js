module.exports = ['$q', '$location', 'userService',
function($q, $location, userService) {
    return {
        'request': function($config) {
            // if(userService.user) {
            //     $config.headers['client_id'] = userService.user.client_id;
            //     $config.headers['client_secret'] = userService.user.client_secret;
            // }
            $config.headers['operator_name'] = 'Operator0';
            $config.headers['operator_secret'] = 'CHANGEME';
            $config.headers['client_type'] = 'web';

            return $config;
        },
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                userService.user = null;
                    //$location.url('/');
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
        };
    }
    ]