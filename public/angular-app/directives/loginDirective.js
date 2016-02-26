'use strict'


module.exports = ['authService', 'userService', function(authService, userService) {
    return {
        restrict: 'A',
        templateUrl:'views/auth/login.html',
        scope: {
          loginUser: '&',
          user: '='
        },
        link:function($scope,element) {

        }
    }
}]