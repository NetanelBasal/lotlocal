'use strict';



angular.module('lottery', [
    'ui.router',
    'timer',
    'ngAnimate',
    'webStorageModule',
    'pascalprecht.translate',
    'ui.bootstrap',
    'textAngular',
    'angularFileUpload',
    'slick'
    ])

/*==========  CONFIG BLOCK ==========*/

.config(require('./config/routes'))
.config(require('./config/translate'))
.config(require('./config/htmlEditor'))
.config(['$sceProvider', '$httpProvider',
    function($sceProvider, $httpProvider) {
        $httpProvider.interceptors.push('authIn');
        $sceProvider.enabled(false);
    }
    ])
.run(require('./config/runPhase'))

/*==========  SERVICES  ==========*/

.service('authService', require('./services/auth'))
.service('userService', require('./services/user'))
.service('adminService', require('./services/admin'))
.service('promoService', require('./services/promo'))
.service('promoLocService', require('./services/promoLoc'))
.factory('authIn', require('./config/authInterceptor'))
.service('accountService', require('./services/account'))
.service('paymentsService', require('./services/payments'))
.service('lotService', require('./services/lot'))
.service('operatorService', require('./services/operator'))
.service('cartService', require('./services/cart/cart'))
.service('contactService', require('./services/contact'))
.service('infoService', require('./services/info'))

/*==========  CONTROLLERS  ==========*/

.controller('homeController', require('./controllers/home'))
.controller('navController', require('./controllers/nav'))
.controller('authController', require('./controllers/user/login'))
.controller('signUpModalController', require('./controllers/user/signUpModal'))
.controller('promoController', require('./controllers/promo'))
.controller('contactController', require('./controllers/contact/contact'))

/*==========  admin  ==========*/
.controller('adminController', require('./controllers/admin/admin'))
.controller('editOperatorController', require('./controllers/admin/edit'))
.controller('contactsListController', require('./controllers/admin/contactsList'))


/*==========  cart  ==========*/

.controller('myCartController', require('./controllers/cart/myCart'))
.controller('cartAuthController', require('./controllers/cart/cartAuth'))
.controller('paymentAndInfoController', require('./controllers/cart/paymentAndInfo'))


/*==========  OPERATOR DASHBOARD  ==========*/

.controller('operatorDashController', require('./controllers/operatorDash/operatorDash'))
.controller('latestController', require('./controllers/operatorDash/latest'))
.controller('langsController', require('./controllers/operatorDash/langs'))
.controller('generalController', require('./controllers/operatorDash/general'))
.controller('testisController', require('./controllers/operatorDash/testis'))
.controller('productsController', require('./controllers/operatorDash/products'))


/*==========  MY ACCOUNT  ==========*/

.controller('myAccountController', require('./controllers/myAccount/myAccount'))

/*==========  MY PAYMENTS  ==========*/

.controller('myPaymentController', require('./controllers/myAccount/myPayment'))
.controller('updatePaymentController', require('./controllers/myAccount/updatePayment'))
.controller('addPaymentController', require('./controllers/myAccount/addPayment'))
.controller('depositController', require('./controllers/myAccount/deposit'))
.controller('deletePaymentController', require('./controllers/myAccount/deletePayment'))

/*==========  MY PURCHASES ==========*/

.controller('myPurchasesController', require('./controllers/myAccount/myPurchases'))
.controller('singlePurchaseController', require('./controllers/myAccount/singlePurchase'))

/*==========  MY TICKETS ==========*/

.controller('myTicketsController', require('./controllers/myAccount/myTickets'))
.controller('ticketRowController', require('./controllers/myAccount/ticketRow'))
/*==========  MY PERSONAL INFO ==========*/

.controller('personalInfoController', require('./controllers/myAccount/personalInfo'))
/*==========  MY TRANSACTIONS ==========*/

.controller('myTransactionsController', require('./controllers/myAccount/myTransactions'))

/*========== END MY ACCOUNT ==========*/


/*==========  OPERATOR PROMOS ==========*/

.controller('addPromoController', require('./controllers/promos/add'))
.controller('deletePromoController', require('./controllers/promos/delete'))
.controller('editPromoController', require('./controllers/promos/edit'))

/*==========  PROMO LOCATIONS ==========*/

.controller('promLocController', require('./controllers/promLoc/promLoc'))
.controller('promLocAddController', require('./controllers/promLoc/add'))
.controller('promLocDeleteController', require('./controllers/promLoc/delete'))


/*==========  SINGLE LOT PAGE  ==========*/

.controller('lotController', require('./controllers/singleLot/lot'))
.controller('groupController', require('./controllers/singleLot/group'))

/*==========  PLAY LOTTERIES PAGE  ==========*/

.controller('playlotController', require('./controllers/playLotteries/playlot'))
.controller('groupPlayController', require('./controllers/playLotteries/groupPlay'))
.controller('latestResultsController', require('./controllers/playLotteries/latestResults'))
.controller('latestResultsDetailsController', require('./controllers/playLotteries/latestResultsDetails'))

/*==========  hunter  ==========*/
.controller('hunterController', require('./controllers/hunter/hunter'))
.controller('huntJackpotController', require('./controllers/hunter/huntJackpot'))
.controller('periodController', require('./controllers/hunter/period'))

/*==========  INFO  ==========*/
.controller('termsController', require('./controllers/info/terms'))
.controller('faqController', require('./controllers/info/faq'))
.controller('policyController', require('./controllers/info/policy'))

/*==========  DIRECTIVES ==========*/

.directive('lotLine', require('./directives/lotLine'))
.directive('moreLessLines', require('./directives/moreLessLines'))
.directive('passwordMatch', require('./directives/passwordMatch'))
    // .directive('checkEmailExists', require('./directives/checkEmailExists'))
    .directive('changeArrow', require('./directives/changeArrow'))
    .directive('showModal', require('./directives/modal').showModal)
    // .directive('toggleTicketInfo', require('./directives/toggleTicketInfo'))
    // .directive('lotPagination', require('./directives/pagination'))
    .directive('closeModal', require('./directives/modal').closeModal)
    .directive('datePicker', require('./directives/datePicker'))
    .directive('slider', require('./directives/slider'))
    .directive('dropdownMultiselect', require('./directives/multiSelect'))
    .directive('testisSlider', require('./directives/testisSlider'))
    .directive('toggleRow', require('./directives/toggleRow'))
    .directive('cartSlide', require('./directives/cartSlide'))
    .directive('dropDown', require('./directives/dropDown'))
    .directive('scrollTo', require('./directives/scrollTo'))
    .directive('mbSlider', require('./directives/mbSlider'))
    .directive('fixedNav', require('./directives/fixedNav'))
    .directive('showInfo', require('./directives/showInfo'))
    .directive('sticky', require('./directives/sticky'))
    .directive('ticketInfo', require('./directives/ticket'))


    /*==========  FILTERS ==========*/

    .filter('moneyType', require('./filters/currency'))
    .filter('transactions', require('./filters/transactions'))
    .filter('discount', require('./filters/discount'))
    .filter('locPage', require('./filters/locPage'))
    .filter('results', require('./filters/results'))
    .filter('numberFilter', require('./filters/numberFilter'))
    .filter('dateToSec', require('./filters/dateToSec'));

    // localhost : leave empty
    // api: http://dev.lotteryclick.com:8081/
    var baseUrl = '';
    var basePath = 'api/player/';
    var fullPath = baseUrl + basePath;
    angular.module('lottery').

    constant('ENV', {
        api: 'dev',
        method: 'get',
        apiActivity: fullPath + 'activity',
        apiPaymentMethod: fullPath + 'PaymentMethod',
        apiOrder: fullPath + 'Order',
        apiOffer: fullPath + 'offer/type',
        apiAccount: fullPath + 'account',
        apiToken: baseUrl + 'oauth/token'
    })