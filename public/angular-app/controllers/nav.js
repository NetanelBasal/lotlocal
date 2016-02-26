module.exports = ['$scope', 'authService', '$state', '$translate', 'adminService', 'lotService', '$rootScope', 'userService', '$modal', 'cartService', 'ENV',
    function($scope, authService, $state, $translate, adminService, lotService, $rootScope, userService, $modal, cartService, ENV) {
        lotService.getLotteries().then(function(res) {
            $scope.lotteries = res.data.data.data;
        });
        $scope.date = new Date;
        $scope.currentLang = 'en';
        $scope.changeLanguage = function(key) {
            $rootScope.defaultLang = key;
            $scope.currentLang = key;
            $translate.use(key);
        };
        // adminService.getOperators().then(function(res) {
        //     $scope.operators = res.data;
        // });
        $scope.openLogin = function() {
            var loginModal = $modal.open({
                templateUrl: 'views/user/login.html',
                controller: 'authController',
                size: 'sm'
            });
        }
        $scope.openSignup = function() {
            var signupModal = $modal.open({
                templateUrl: 'views/user/signUp.html',
                controller: 'signUpModalController',
                size: 'sm'
            });
        }
        /* log out */
        $scope.logOut = function() {
            function cleanUser() {
                userService.user = null;
                cartService.clearItems();
                $rootScope.cartLen = 0;
                $state.go('home');
            }
            if (ENV.api == 'dev') {
                authService.logOut().then(function() {
                    cleanUser();
                })
            } else {
                cleanUser();
            };
        }
    }
]