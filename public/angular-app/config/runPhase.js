module.exports = /*@ngInject*/ function($rootScope, userService, $state, $http, userService, cartService, authService, lotService, paymentsService) {
    lotService.getLotteries().then(function(res) {
        $rootScope.lotteries = res.data.data.data;
    });
    if (operatorConfig !== 'undefined') {
        $rootScope.operatorConfig = operatorConfig;
    }

    cartService.items = window.items || {
        singles: [],
        groups: [],
        singleGroup: []
    };
    $rootScope.defaultLang = 'en';

    authService.getUser().then(function(res) {
        if (res.data == '') {
            userService.user = null;
        } else {
            userService.user = res.data;
            paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                userService.user.hasPayment = res.data.hasPayment;
            });
          
        }
    });
      $rootScope.userService = userService;
    $rootScope.$on("$stateChangeStart", function(event, toState) {
        if (toState.admin && !userService.user.admin == 1) {
            event.preventDefault();
            $state.go("home");
        }
        // else if (toState.authenticate && !userService.user) {
        //     event.preventDefault();
        //     $state.go("home");
        // }
        if (userService.user) {
            if (toState.needPayment && userService.user.hasPayment) {
                event.preventDefault();
                $state.go("home");
            }
        }
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 200);
    })
}