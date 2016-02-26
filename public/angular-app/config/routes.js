module.exports = ['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        /*==========  HOME PAGE  ==========*/
        $stateProvider.state('home', {
            url: '/',
            resolve: {
                lotteries: ['$http', 'ENV',
                    function($http, ENV) {
                        return $http[ENV.method](ENV.apiOffer + '/draw/product');
                    },
                ],
                promos: ['$http',
                    function($http) {
                        return $http.get('promoLoc', {
                            params: {
                                loc: 'Home'
                            }
                        });
                    }
                ],
                promosBox: ['$http',
                    function($http) {
                        return $http.get('promoLoc', {
                            params: {
                                loc: 'promotionsBox'
                            }
                        });
                    }
                ]
            },
            templateUrl: 'views/home/index.html',
            controller: 'homeController'
        })
        /*========== ONE LOT PLAY PAGE  ==========*/
        .state('one-lot-play', {
            url: "/lottery/:lotName",
            resolve: {
                lotteries: ['$http', 'ENV',
                    function($http, ENV) {
                        return $http[ENV.method](ENV.apiOffer + '/draw/product');
                    },
                ]
            },
            controller: "lotController",
            templateUrl: "views/one-lot-play/index.html"
        }).state('one-lot-play.Personal', {
            url: "/personal",
            controller: "lotController",
            templateUrl: "views/one-lot-play/personal.html"
        }).state('one-lot-play.Group', {
            url: "/group",
            controller: "groupController",
            templateUrl: "views/one-lot-play/group.html"
        })
        /*==========  END PLAY PAGE  ==========*/
        /*==========  PLAY LOTTERIES  ==========*/
        .state('playLotteries', {
            url: "/playLotteries",
            resolve: {
                lotteries: ['$http', 'ENV',
                    function($http, ENV) {
                        return $http[ENV.method](ENV.apiOffer + '/draw/product');
                    },
                ]
            },
            controller: "playlotController",
            templateUrl: "views/playLotteries/index.html"
        }).state('playLotteries.Index', {
            url: "/play",
            controller: "playlotController",
            templateUrl: "views/playLotteries/lotteries.html"
        }).state('playLotteries.Group', {
            url: "/group",
            controller: "groupPlayController",
            templateUrl: "views/playLotteries/group.html"
        }).state('playLotteries.hunter', {
            url: "/Jackpot-Hunter",
            controller: "hunterController",
            templateUrl: "views/hunter/hunter.html"
        }).state('playLotteries.hunter.stepOne', {
            url: "/select-lottery",
            controller: "hunterController",
            templateUrl: "views/hunter/step-one.html"
        }).state('playLotteries.hunter.stepTwo', {
            url: "/hunt-jackpot",
            controller: "huntJackpotController",
            templateUrl: "views/hunter/step-two.html"
        }).state('playLotteries.hunter.stepThree', {
            url: "/hunt-jackpot",
            controller: "periodController",
            templateUrl: "views/hunter/step-three.html"
        }).state('latest-results', {
            url: "/latest-results",
            controller: "latestResultsController",
            templateUrl: "views/playLotteries/latest-results.html"
        }).state('latest-results-details', {
            url: "/latest-results-details/:id",
            resolve: {
                lot: ['lotService',
                    function(lotService) {
                        return lotService.getLatestResultsDetails();
                    }
                ]
            },
            controller: "latestResultsDetailsController",
            templateUrl: "views/playLotteries/latest-results-details.html"
        })
        /*==========  END PLAY LOTTERIES  ==========*/
        /*==========  PROMOS PANEL  ==========*/
        .state('promosPanel', {
            url: "/promos-panel",
            controller: "promoController",
            resolve: {
                operator: ['$http', '$stateParams',
                    function($http) {
                        return $http.get('operator');
                    }
                ]
            },
            templateUrl: "views/promosPanel/index.html",
            authenticate: true
        }).state('promoLoc', {
            url: '/promoLoc',
            controller: 'promLocController',
            templateUrl: 'views/promLoc/index.html',
            authenticate: true
        })
        /*========== END PROMOS PANEL  ==========*/
        /*==========  OPERATOR DASHBOARD  ==========*/
        .state('operatorDash', {
            url: '/dashboard',
            controller: 'operatorDashController',
            templateUrl: 'views/operatorDash/index.html',
            authenticate: true
        }).state('operatorDash.langs', {
            url: '/langs',
            controller: 'langsController',
            templateUrl: 'views/operatorDash/langs.html',
            authenticate: true
        }).state('operatorDash.general', {
            url: '/general',
            controller: 'generalController',
            templateUrl: 'views/operatorDash/general.html',
            authenticate: true
        }).state('operatorDash.testis', {
            url: '/testis',
            controller: 'testisController',
            templateUrl: 'views/operatorDash/testis.html',
            authenticate: true
        }).state('operatorDash.latestNews', {
            url: '/latestNews',
            controller: 'latestController',
            templateUrl: 'views/operatorDash/latestNews.html',
            authenticate: true
        }).state('operatorDash.products', {
            url: '/products',
            controller: 'productsController',
            templateUrl: 'views/operatorDash/products.html',
            authenticate: true
        })
        /*==========  END OPERATOR DAHBOARD  ==========*/
        /*==========  ADMIN PANEL  ==========*/
        .state('admin', {
            url: "/admin",
            controller: "adminController",
            templateUrl: "views/adminPanel/admin.html",
            authenticate: true
        }).state('editOperator', {
            url: "/admin/edit/:operatorId",
            resolve: {
                operator: ['$http', '$stateParams',
                    function($http, $stateParams) {
                        return $http.get('admin/' + $stateParams.operatorId);
                    }
                ]
            },
            controller: "editOperatorController",
            templateUrl: "views/adminPanel/edit.html",
            authenticate: true
        }).state('contacts-list', {
            url: "/contacts-list",
            controller: "contactsListController",
            templateUrl: "views/adminPanel/contact-list.html",
            authenticate: true
        })
        /*==========  END ADMIN PANEL  ==========*/
        /*==========  USER AUTH AND SIGN UP  ==========*/
        .state('sign-up', {
            url: "/sign-up",
            controller: "signUpController",
            templateUrl: "views/user/signUp.html"
        })
        /*==========  MY ACOUNT  ==========*/
        .state('account', {
            url: "/my-account",
            controller: "myAccountController",
            resolve: {
                promos: ['$http',
                    function($http) {
                        return $http.get('promoLoc', {
                            params: {
                                loc: 'paymentMethods'
                            }
                        });
                    }
                ]
            },
            templateUrl: "views/myAccount/myAccount.html",
            authenticate: true
        }).state('account.personalInfo', {
            url: '/personal',
            templateUrl: 'views/myAccount/personalInfo.html',
            controller: "personalInfoController",
            authenticate: true
        }).state('account.tickets', {
            url: '/tickets',
            templateUrl: 'views/myAccount/myTickets.html',
            controller: "myTicketsController",
            authenticate: true
        }).state('account.purchases', {
            url: '/purchases',
            templateUrl: 'views/myAccount/myPurchases.html',
            controller: "myPurchasesController",
            authenticate: true
        })
        .state('account.single-purchase', {
            url: '/purchases/:id',
            templateUrl: 'views/myAccount/single-purchase.html',
            controller: "singlePurchaseController",
            authenticate: true
        })
        .state('account.payments', {
            url: '/payments',
            templateUrl: 'views/myAccount/myPayment.html',
            controller: "myPaymentController",
            authenticate: true
        }).state('account.transactions', {
            url: '/transactions',
            templateUrl: 'views/myAccount/myTransactions.html',
            controller: "myTransactionsController",
            authenticate: true
        })

        /*==========  END MY ACCOUNT  ==========*/
        /*==========  CART  ==========*/
        .state('cart', {
            url: '/my-cart',
            templateUrl: 'views/cart/cart.html',
            controller: 'myCartController'
        })
        .state('cart.auth', {
            templateUrl: 'views/cart/auth.html',
            resolve: {
                loc: function($http) {
                    return $http.get('promoLoc', {
                        params: {
                            loc: 'cart'
                        }
                    })
                }
            },
            controller: 'cartAuthController'
        }).state('cart.payment', {
            url: '/payment',
            controller: 'paymentAndInfoController',
            templateUrl: 'views/cart/payment.html',
            authenticate: true,
            needPayment: true
        })
        /*==========  INFO ==========*/
        .state('contact-us', {
            url: '/contact-us',
            controller: 'contactController',
            templateUrl: 'views/contact/contact.html'
        }).state('terms', {
            url: '/terms and conditions',
            // resolve: {
            //     terms: ['$http',
            //     function($http) {
            //         return $http.get('info/terms');
            //     }
            //     ]
            // },
            controller: 'termsController',
            templateUrl: 'views/info/terms.html'
        }).state('policy', {
            url: '/privacy-policy',
            // resolve: {
            //     policy: ['$http',
            //     function($http) {
            //         return $http.get('info/policy');
            //     }
            //     ]
            // },
            controller: 'policyController',
            templateUrl: 'views/info/policy.html'
        }).state('faq', {
            url: '/faq',
            resolve: {
                faq: ['$http',
                    function($http) {
                        return $http.get('info/faq');
                    }
                ]
            },
            controller: 'faqController',
            templateUrl: 'views/info/faq.html'
        })
    }
]