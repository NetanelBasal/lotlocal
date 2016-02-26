(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
module.exports = ['$provide',
    function($provide) {
        $provide.decorator('taOptions', ['$delegate',
            function(taOptions) {
                taOptions.toolbar = [
                    ['p', 'pre', 'quote'],
                    ['bold', 'italics',
                    'underline', 'ul', 'ol'
                    , 'redo', 'undo', 'clear'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight'],
                    ['insertLink']
                ];
                return taOptions;
            }])
        }];
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
module.exports = ['$translateProvider',
    function($translateProvider) {

        $translateProvider.preferredLanguage('en');

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: ''
        });
    }
];
},{}],6:[function(require,module,exports){
module.exports = ['$scope', 'adminService',
    function($scope, adminService) {
        adminService.getOperators().then(function(res) {
            $scope.operators = res.data;
        });

        // $scope.promos = [];
        // $scope.promos.push({
        //     img: '',
        //     url: ''
        // });
        $scope.users = [{
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }];
        // $scope.addPromo = function() {
        //     $scope.promos.push({
        //         img: '',
        //         url: ''
        //     });
        // }
        $scope.addUser = function() {
            $scope.users.push({
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            })
        }
        $scope.removeUser = function() {
            $scope.users.pop();
        }
        // $scope.delPromo = function() {
        //     $scope.promos.pop();
        // }
        $scope.showNewPartner = false;
        $scope.toggleNewOperator = function() {
            $scope.showNewOperator = !$scope.showNewOperator;
        }
        // $scope.addPromos = function() {
        //     $scope.showAddPromos = !$scope.showAddPromos;
        // }
        $scope.addOperator = function() {
            adminService.newOperator($scope.operator, $scope.users).then(function(res) {
                $scope.operator = {};
                $scope.users = [{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                }];
                //$scope.promos = {};
                $scope.operatorForm.$setPristine();
                $scope.operatorAdded = true;
            }, function() {
                $scope.operatorFailed = true;
            });
        }
        $scope.deleteOperator = function(operatorId) {
            if (confirm('Are you sure?')) {
                adminService.delOperator(operatorId).then(function(res) {
                    $scope.deleted = true;
                });
            }
        }
    }
]
},{}],7:[function(require,module,exports){
module.exports = ['$scope', 'contactService',
    function($scope, contactService) {
        contactService.getContacts().then(function(res) {
            $scope.contacts = res.data;
        });
        $scope.delContact = function(contact) {
            if (confirm('Are you sure?')) {
                contactService.delContact(contact.id).then(function(res) {
                    $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                })
            }
        }
    }
]
},{}],8:[function(require,module,exports){
module.exports = ['$scope', 'operator','adminService',
    function($scope, operator,adminService) {
      $scope.operator = operator.data[0];

      $scope.updateOperator = function() {
          adminService.updateOperator($scope.operator.id, $scope.operator).then(function(res) {
              $scope.updated = true;
          });
      }
    }
]
},{}],9:[function(require,module,exports){
module.exports = ['$scope', 'authService', 'userService', 'paymentsService', '$state', 'infoService', 'userService', 'loc',
    function($scope, authService, userService, paymentsService, $state, infoService, userService, loc) {
        /*==========  login user  ==========*/
        $scope.user = {};
        $scope.promos = loc.data;
        $scope.loginUser = function() {
            authService.loginUser($scope.user).then(function(res) {
                userService.user = {userName: res.data.data.userName};
                paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                    userService.user.hasPayment = res.data.hasPayment;
                    if (!userService.user.hasPayment ) {
                        userService.user.country = 'Israel';
                        $state.go('cart.payment');
                    } else {

                        paymentsService.getPayments().then(function(res) {
                            $scope.$parent.payments = res.data;
                            $scope.$parent.payment = res.data[0];
                        });
                    }
                });
            }, function() {
                $scope.wrongCred = true;
            });
        }
        /*==========  sign up  ==========*/
        infoService.getCountries().then(function(res) {
            $scope.countries = res.data;
        });
        $scope.form = {};
        $scope.newUser = {};
        $scope.registerUser = function() {
            $scope.submitted = true;
            if ($scope.form.signUpForm.$valid) {
                authService.registerUser($scope.newUser).then(function(res) {
                    $scope.currentUser = {
                        email:$scope.newUser.email,
                        password: $scope.newUser.password
                    }
                    $scope.user.userName = $scope.user.email;
                    authService.loginUser($scope.currentUser).then(function(res) {
                        userService.user = {
                            userName: res.data.data.userName
                        };
                        userService.user.country = $scope.newUser.country.nicename;
                        $state.go('cart.payment');
                    });
                });
            }
        }
        $scope.checkErrors = function(field, err) {
            return $scope.submitted && field.$error[err];
        }
    }
]
},{}],10:[function(require,module,exports){
module.exports = ['$scope', 'cartService', 'authService', 'userService', 'paymentsService', '$rootScope', '$modal',
    function($scope, cartService, authService, userService, paymentsService, $rootScope, $modal) {
        $scope.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.cart = cartService;
        $rootScope.cartLen = $scope.cart.getItemsInCart().length;
        $scope.setPayment = function(payment) {
            $scope.payment = payment;
        }
        var getUserPayments = function() {
            paymentsService.getPayments().then(function(res) {
                $scope.payments = res.data;
                $scope.payment = res.data[0];
            });
        }
        if (userService.user) {
            paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                userService.user.hasPayment = res.data.hasPayment;
            });
            getUserPayments();
        }
        $scope.$on('userLoggenIn', getUserPayments);
        $scope.getTotal = function() {
            var total = 0;
            angular.forEach($scope.cart.getItemsInCart(), function(item) {
                total += item.common.price;
            });
            return total;
        }
        $scope.delItem = function(item, type) {
            $scope.cart.delItem(item, type);
            $rootScope.cartLen--;
            $scope.cart.saveItemsToSession(cartService.items);
        }
        $scope.submitOrder = function() {
            $rootScope.cartLen = 0;
            cartService.clearItems();
            $scope.paymentRecived = true;
        }
        $scope.addPayment = function() {
            var addPaymentModal = $modal.open({
                templateUrl: 'views/myAccount/payments/add.html',
                controller: 'addPaymentController',
                resolve: {
                    hasPayment: function() {
                        return $scope.hasPayment;
                    }
                },
                size: 'sm'
            });
            addPaymentModal.result.then(function(payment) {
                $scope.payments.push(payment);
            });
        }
    }
]
},{}],11:[function(require,module,exports){
module.exports = ['$scope', 'paymentsService', 'userService', 'authService', '$rootScope', 'cartService', 'infoService',
function($scope, paymentsService, userService, authService, $rootScope, cartService, infoService) {
    $scope.user = {};
    $scope.user.country = userService.user.country || 'Israel';
    infoService.getPolicy().then(function(res) {
        $scope.policies = res.data.data;
    });
    infoService.getTerms().then(function(res) {
        $scope.terms = res.data.data;
    });


    infoService.getStates().then(function(res) {
        $scope.states = res.data;
    });
    $scope.expiration = {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        year: _.range(2014, 2026)
    };
    $scope.form = {};
    $scope.addPayment = function() {
        $scope.submitted = true;
        if ($scope.form.paymentForm.$valid) {
            $scope.user.card.expiration = $scope.user.card.month + '-' + $scope.user.card.year;
            $scope.user.card.defaultP = true;
            paymentsService.addPayment($scope.user.card).then(function() {
                $scope.paymentRecived = true;
                $rootScope.cartLen = 0;
                cartService.clearItems();
            });
        }
    }
    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }
}
]
},{}],12:[function(require,module,exports){
module.exports = ['$scope', 'contactService',
    function($scope, contactService) {
        $scope.checkErrors = function(field, err) {
            return $scope.submitted && field.$error[err];
        }
        $scope.sendMessage = function() {
            $scope.submitted = true;
            if ($scope.contactForm.$valid) {
                contactService.saveContact($scope.user).then(function(res) {
                    $scope.saved = true;
                })
            }
        }
    }
]
},{}],13:[function(require,module,exports){
module.exports = ['$scope', 'promos', '$rootScope', 'promosBox','$interval','lotteries','lotService',
function($scope, promos, $rootScope, promosBox,$interval,lotteries,lotService) {

  $scope.lotteries = lotteries.data.data.data;
  $scope.mainLot = lotteries.data.data.data[0];
  $scope.promos = promos.data;

 

  $scope.galleryData = [
  'http://placehold.it/430x293&text=promo-one',
  'http://placehold.it/430x293&text=promo-two',
  'http://placehold.it/430x293&text=promo-three'


  ];
$scope.next= function() {
  $('#main-promos').slickNext();
}
$scope.prev= function() {
  $('#main-promos').slickPrev();
}

$scope.prevTestis = function() {
  $('#testis-slider').slickPrev();
}
$scope.nextTestis = function() {
  $('#testis-slider').slickNext();
}
  $scope.slides =
  [
      'images/main-slider/promo.png',
      'images/main-slider/promo2.png'
  ]





}
];
},{}],14:[function(require,module,exports){
module.exports = ['$scope',
    function($scope) {

    }
]
},{}],15:[function(require,module,exports){
module.exports=require(14)
},{}],16:[function(require,module,exports){
module.exports=require(14)
},{}],17:[function(require,module,exports){
module.exports=require(14)
},{}],18:[function(require,module,exports){
module.exports = ['$scope',
function($scope) {

}
]
},{}],19:[function(require,module,exports){
module.exports = ['$scope',
function($scope) {
  // $scope.notSub = function(p) {
  //   return /Welcome Bonus/.test(p) == false;

  // }
}
]
},{}],20:[function(require,module,exports){
module.exports = ['$scope','$modalInstance', 'paymentsService', '$timeout','userService',
function($scope, $modalInstance, paymentsService, $timeout,userService) {
    $scope.expiration = {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        year: _.range(2014, 2026)
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }
    $scope.form = {};
    $scope.user = {
        card: {
            defaultP: false
        }
    };
    $scope.addPayment = function() {
        $scope.submitted = true;
        if ($scope.form.addPaymentForm.$valid) {
            if (!userService.user.hasPayment) {
                $scope.user.card.defaultP = true;
            }
            $scope.user.card.expiration = $scope.user.card.month + '-' + $scope.user.card.year;
            console.log($scope.user.card);
            paymentsService.addPayment($scope.user.card).then(function(res) {
                if (res.data.saved) {
                    userService.user.hasPayment = true;
                    $scope.saved = true;
                    $timeout(function() {
                        $modalInstance.close(res.data.payment);
                        $scope.card = {};
                        $scope.saved = false;
                    }, 1000);
                }
            });
        }
    };
}
]
},{}],21:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', 'paymentsService', 'payment',
    function($scope,$modalInstance, paymentsService, payment) {

        $scope.payment = payment;
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');

        };

    $scope.deletePayment = function() {
            paymentsService.deletePayment($scope.payment.id).then(function(res) {
                if (res.data.delete) {
                    $modalInstance.close(res.data.delete);
                }
            });

        }

    }
]
},{}],22:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', '$modal', '$state', 'hasPayment',
    function($scope, $modalInstance, $modal, $state, hasPayment) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.hasPayment = hasPayment;
        $scope.addPaymentMethod = function() {
            $modalInstance.dismiss('cancel');
            $modal.open({
                templateUrl: 'views/myAccount/payments/add.html',
                controller: 'addPaymentController',
                size: 'sm'
            });
        }
    }
]
},{}],23:[function(require,module,exports){
module.exports = ['$scope', 'accountService', 'paymentsService', 'userService', '$modal', 'promos',
function($scope, accountService, paymentsService, userService, $modal, promos) {
    $scope.promos = promos.data;
    accountService.getUserInfo().then(function(res) {
        $scope.balance = res.data.data[0].balance;
    });


    $scope.openDeposite = function() {
        var depositModal = $modal.open({
            templateUrl: 'views/myAccount/payments/deposit.html',
            controller: 'depositController',
            resolve: {
                hasPayment: function() {
                    return userService.user.hasPayment;
                }
            },
            size: 'sm',
        });
    }
}
]
},{}],24:[function(require,module,exports){
module.exports = ['$scope', 'paymentsService', '$timeout', '$modal',
function($scope, paymentsService, $timeout, $modal) {

    paymentsService.getPayments().then(function(res) {
        $scope.payments = res.data;
    });
        // $scope.paginationConfig = {
        //     currentPage: payments.current_page,
        //     lastPage: payments.last_page
        // }
        // $scope.$on('pageChange', function(e, data) {
        //     var method = data.method || '';
        //     paymentsService.getPayments(data.page, method).then(function(res) {
        //         $scope.payments = res.data;
        //         var data = {
        //             currentPage: res.current_page,
        //             lastPage: res.last_page
        //         }
        //         if (method !== '') {
        //             data.method = method;
        //         }
        //         $scope.$broadcast('dataChange', data);
        //     });
        // });
$scope.card = {};
paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
    $scope.hasPayment = res.data.hasPayment;
});
$scope.addPayment = function() {
    var addPaymentModal = $modal.open({
        templateUrl: 'views/myAccount/payments/add.html',
        controller: 'addPaymentController',
        resolve: {
            hasPayment: function() {
                return $scope.hasPayment;
            }
        },
        size: 'sm'
    });
    addPaymentModal.result.then(function(payment) {
        if (payment.isDefault) {
            _($scope.payments).forEach(function(payment) {
                payment.isDefault = false;
            });
        }
        $scope.payments.push(payment);
    });
}
$scope.del = function(payment) {
    $scope.payment = payment;
    var deleteModal = $modal.open({
        templateUrl: 'views/myAccount/payments/delete.html',
        controller: 'deletePaymentController',
        resolve: {
            payment: function() {
                return $scope.payment;
            }
        },
        size: 'sm'
    });
    deleteModal.result.then(function(data) {
        if (data) {
            $scope.payments.splice($scope.payments.indexOf(payment), 1);
        }
    });
}
$scope.paymentCopy = {};
$scope.updatePayment = function(payment) {
    $scope.paymentCopy = angular.copy(payment);
    $scope.payment = payment;
    $scope.paymentCopy.month = $scope.paymentCopy.expiration.substr(0, 2);
    $scope.paymentCopy.year = Number($scope.paymentCopy.expiration.substr(3));
    var updateModal = $modal.open({
        templateUrl: 'views/myAccount/payments/update.html',
        controller: 'updatePaymentController',
        resolve: {
            payment: function() {
                return $scope.paymentCopy;
            },
            paymentsLen: function() {
                return $scope.payments.length;
            }
        },
        size: 'sm'
    });
    updateModal.result.then(function(selectedPayment) {
        var index = $scope.payments.indexOf($scope.payment);
        if (selectedPayment.isDefault) {
            _($scope.payments).forEach(function(payment) {
                payment.isDefault = false;
            });
        }
        if (index !== -1) {
            $scope.payments[index] = selectedPayment;
        }
    });
};
$scope.methodFilter = function() {
    var data = {
        method: $scope.payment.method
    }
    $scope.$emit('pageChange', data);
}
}
];
},{}],25:[function(require,module,exports){
module.exports = ['$scope','accountService',
function($scope, accountService) {
    accountService.getPurchases().then(function(res) {
        $scope.purchases = res.data.data.data;
    });

    $scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    $scope.reverse = '';
    $scope.predicate = '';

    $scope.sort = function(fieldName) {
        if ($scope.predicate === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.predicate = fieldName;
            $scope.reverse = false;
        }
    };
}
]
},{}],26:[function(require,module,exports){
module.exports = ['$scope','accountService',
    function($scope,accountService) {
        accountService.getTickets().then(function(res) {
           $scope.tickets = res.data.data.data;
        });



        $scope.reverse = '';
        $scope.predicate = '';

        $scope.sort = function(fieldName) {
            if ($scope.predicate === fieldName) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.predicate = fieldName;
                $scope.reverse = false;
            }
        };


    }
]
},{}],27:[function(require,module,exports){
module.exports = ['$scope', 'accountService',
    function($scope, accountService) {
        accountService.getTransactions().then(function(res) {
            $scope.transactions = res.data.data;
        });
        $scope.reverse = '';
        $scope.predicate = '';

        $scope.sort = function(fieldName) {
            if ($scope.predicate === fieldName) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.predicate = fieldName;
                $scope.reverse = false;
            }
        };

        $scope.test = function() {
            alert('Not implemented yet');
        }

        $scope.openRowIf = function(transaction) {
           return transaction.type == 'Win' || transaction.type == 'Purchase' || transaction.type == 'Deposit';
        }

    }
]
},{}],28:[function(require,module,exports){
module.exports = ['$scope', 'paymentsService', 'userService', '$modal',
    function($scope, paymentsService, userService, $modal) {
        // $scope.birthday = {
        //     day: _.range(1, 32),
        //     month: _.range(1, 13),
        //     year: _.range(1900, 2015)
        // }

        $scope.openChangePass = function() {
            $scope.changePass = true;
        }
        $scope.closeChangePass = function() {
            $scope.changePass = false;
            $scope.user.password = '';
            $scope.user.oldPassword = '';
            $scope.confirmPassword = '';
            $scope.userInfoForm.$setPristine();
        }

        paymentsService.checkIfUserHasPaymentMethod()
            .then(function(res) {
                userService.setHasPaymentMethod(res.data.hasPayment);
            });


        $scope.user = {
            firstname: 'Yaron',
            lastname: 'Biton',
            email: 'misterBit@gmail.com',
            phoneOne: {
                area:222,
                num:547253636
            }
        }


        paymentsService.checkIfUserHasPaymentMethod()
            .then(function(res) {
                $scope.depositView = (res.data.hasPayment) ? 'hasPayment.html' : 'noPayments.html';
            });


        $scope.openDeposite = function() {

            var depositModal = $modal.open({
                templateUrl: 'views/myAccount/payments/' + $scope.depositView,
                controller: 'depositController',
                size: 'sm',
            });
        }


    }
]
},{}],29:[function(require,module,exports){
module.exports = /*@ngInject*/ function($scope, accountService) {
    $scope.purchase = {};
    accountService.getSinglePurchase(1).then(function(res) {

        $scope.purchase = res.data.data;
        $scope.purchase.open = true;
    });
}
},{}],30:[function(require,module,exports){
module.exports = ['$scope',
    function($scope) {
        $scope.toggleSelected = function() {

            $scope.selected = !$scope.selected;
        };
        $scope.isSelected = function() {
            return $scope.selected;
        };
    }
]
},{}],31:[function(require,module,exports){
module.exports = ['$scope', 'payment', '$modalInstance', 'paymentsService', '$timeout', 'paymentsLen',
function($scope, payment, $modalInstance, paymentsService, $timeout, paymentsLen) {

    $scope.expiration = {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        year: _.range(2014, 2026)
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }

    $scope.paymentCopy = payment;
    // $scope.paymentCopy.number = 'xxxxxxxxxxxxx2478';
    $scope.form = {};
    $scope.update = function() {
        if (paymentsLen == 1) {
            $scope.paymentCopy.defaultP = true;
        }
        $scope.submitted = true;
        if($scope.form.updateCard.$valid) {
            $scope.paymentCopy.expiration = $scope.paymentCopy.month + '-' + $scope.paymentCopy.year;
            paymentsService
            .updatePayment($scope.paymentCopy.id, $scope.paymentCopy)
            .then(function(res) {
                if (res.data.update) {
                    $scope.updateMe = true;
                    $timeout(function() {
                        $scope.updateMe = false;
                        $modalInstance.close(res.data.payment);
                    }, 1000);
                }
            });
        }

    }
}
]
},{}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
module.exports = ['$scope',
    function($scope) {

$scope.lang = $scope.config.langs[0];

    }
]
},{}],34:[function(require,module,exports){
module.exports = ['$scope',
    function($scope) {

        // $scope.saveOperatorLangs = function() {
        //     console.log($scope.lang);
        //     $scope.config.langs = $scope.selected_items;
        //     $scope.operator.langs = $scope.selected_items;
        // }

    }
]
},{}],35:[function(require,module,exports){
module.exports = ['$scope',
    function($scope) {

        $scope.addNews = function() {
            $scope.config.latest.push({
                date: '',
                txt: {}
            })
        }

        $scope.lang = $scope.config.langs[0];
    }
]
},{}],36:[function(require,module,exports){
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
},{}],37:[function(require,module,exports){
module.exports = ['$scope',
function($scope) {

}
];
},{}],38:[function(require,module,exports){
module.exports = ['$scope',
    function($scope) {
          $scope.addTestis = function() {
            console.log('dad');
            $scope.config.testis.push({
                imgUrl: '',
                txt: {}
            })
        }
        $scope.lang = $scope.config.langs[0];
    }
]
},{}],39:[function(require,module,exports){
module.exports = ['$scope','lotService','cartService','$state',
function($scope,lotService,cartService, $state) {
  $scope.open = {
    one:true
  };
  $scope.firstOpen = true;
  $scope.toggleAcc = function(index) {
    angular.forEach($scope.open, function(ind, val) {
      $scope.open[val] = false;
    });
    $scope.open[index] = true;
  }
  lotService.getGroupPlay().then(function(res) {
    angular.forEach(res.data.data, function(pack, index) {
      pack.numShares = 1;
      pack.month = 1;
    });
    $scope.packs = res.data.data;
  });

  $scope.userClickedPlay = false;

  $scope.closeOthers = function(pack) {
    angular.forEach($scope.packs, function(pack) {
      pack.addToCart = false;
      pack.leave = true;
    });

    pack.addToCart = !pack.addToCart;
    pack.leave = false;

  }
  $scope.toggleCart = function(pack) {
    pack.addToCart = !pack.addToCart;
  }

  $scope.month = 1;

  $scope.toggleNumShares = function(way, pack) {
    if(way == 1)  pack.numShares++;
    if(way == -1) {
      if(pack.numShares !== 1)
      {
       pack.numShares--
     }
   }
 }

 $scope.changeMonth = function(month ,pack) {
  pack.month = month;
}

$scope.calcPrice = function(pack) {
  return pack.price * pack.month * pack.numShares;
}

$scope.addToCart = function(pack) {
  pack.price= $scope.calcPrice(pack);
  pack.type = 'groups';
  cartService.addToCart( 'groups',pack).then(function(res) {
    $state.go('cart.auth');
  });
}



}
]
},{}],40:[function(require,module,exports){
module.exports = ['$scope','lotService','$filter',
function($scope,lotService,$filter) {

    lotService.getLatestResults().then(function(res) {
        $scope.lotteries = res.data.data;
    });

    $scope.reverse = '';
    $scope.predicate = '';

    $scope.sort = function(fieldName) {
        if ($scope.predicate === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.predicate = fieldName;
            $scope.reverse = true;
        }
    };


}
]
},{}],41:[function(require,module,exports){
module.exports = ['$scope', 'lotService', 'lot','$rootScope','$stateParams',
    function($scope, lotService, lot,$rootScope,$stateParams) {
        $scope.lot = lot.data.data.lottery;
       
             $scope.currentLot = _.find($rootScope.operatorConfig.products, function(lot) {
                    return lot.id == $stateParams.id;
                });


        $scope.lot.date = $scope.lot.dates[0];
        lotService.getLatestResultsDetailsByDate().then(function(res) {
            $scope.byDateDetails = res.data.data;
        });
        $scope.changeNums = function() {
            if ($scope.lot.date == '2014-06-27T02:21:07.567') {
                $scope.byDateDetails.draw.winningNumbers.numberResults = [1,2,23,3,4,5];
                $scope.byDateDetails.draw.winningNumbers.secondaryNumberResults = [34]
            } else {
              $scope.byDateDetails.draw.winningNumbers.numberResults = [44,5,17,24,28,9];
              $scope.byDateDetails.draw.winningNumbers.secondaryNumberResults = [13]
            }
        }
    }
]
},{}],42:[function(require,module,exports){
module.exports = ['$scope','lotteries','$state',
function($scope,lotteries, $state) {
  $scope.lotteries = lotteries.data.data.data;
  $scope.$state = $state;
}
]
},{}],43:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', 'promoService', '$timeout',
    function($scope, $modalInstance, promoService, $timeout) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        promoService.getPromos().then(function(res) {
            $scope.promos = res.data[0].promos;
        });

        $scope.AddPromo = function(promo,loc) {
            if(loc == 'first')  promo.first = true;

            $modalInstance.close(promo);
        }
    }
]
},{}],44:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance','promo',

    function($scope, $modalInstance,promo) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.promo = promo;

        $scope.deletePromo = function() {
            $scope.promo.deleted = true;
            $modalInstance.close($scope.promo);
        }

    }
]
},{}],45:[function(require,module,exports){
module.exports = ['$scope', 'promoLocService', '$modal',
function($scope, promoLocService, $modal) {

    $scope.getPromosByLoc = function(loc) {
        $scope.saved = false;
        promoLocService.getLoc(loc).then(function(res) {
            $scope.promos = res.data;
        });
    }
    $scope.currentLoc = 'Home';

    $scope.getPromosByLoc('Home');

    $scope.addPromo = function() {
        var addPromoModal = $modal.open({
            templateUrl: 'views/promLoc/add.html',
            controller: 'promLocAddController',
            size: 'lg'
        });
        addPromoModal.result.then(function(promo) {
            if(promo.first) {
                $scope.promos.unshift(promo);
            }else {
                $scope.promos.push(promo);
            }
        });
    }

    $scope.moveTo = function(promo, direction) {
        var index = $scope.promos.indexOf(promo);
        var tmp = $scope.promos[index + direction];
        $scope.promos[index + direction] = promo;
        $scope.promos[index] = tmp;
    }

    $scope.savePromos = function() {

       _.remove($scope.promos, function(promo) { return promo.deleted == true; });

       var promosIds = _.pluck($scope.promos, 'id');
       promoLocService.updatePromLoc(promosIds,$scope.currentLoc).then(function(res) {
        alert('The Promos saved successfully!');
    });


   }

   $scope.delPromo = function(promo) {
    $scope.promo = promo;
    var deletePromoModal = $modal.open({
        templateUrl: 'views/promLoc/delete.html',
        controller: 'promLocDeleteController',
        resolve: {
            promo: function() {
                return $scope.promo;
            }
        },
        size: 'sm'
    });
    deletePromoModal.result.then(function(promo) {
        var index = $scope.promos.indexOf(promo);
        $scope.promos[index] = promo;
    });

}

$scope.returnPromo = function(promo) {
    promo.deleted = false;
    var index = $scope.promos.indexOf(promo);
    $scope.promos[index] = promo;
}
}
]
},{}],46:[function(require,module,exports){
module.exports = ['$scope', 'operator', 'promoService', '$modal','promoLocService',
function($scope, operator, promoService, $modal,promoLocService) {


    $scope.promos = operator.data[0].promos;


    $scope.addPromo = function() {
        var addPromoModal = $modal.open({
            templateUrl: 'views/promos/add.html',
            controller: 'addPromoController',
            size: 'lg'
        });
        addPromoModal.result.then(function(promo) {
            $scope.promos.push(promo);
        });


    }
    $scope.editPromo = function(promo) {
        $scope.promo = promo;
        var editPromoModal = $modal.open({
            templateUrl: 'views/promos/edit.html',
            controller: 'editPromoController',
            resolve: {
                promo: function() {
                    return $scope.promo;
                }
            },
            size: 'lg'
        });
        editPromoModal.result.then(function(promo) {
            var index = $scope.promos.indexOf($scope.promo);
            if (index !== -1) {
                $scope.promos[index] = promo;
            }
        });
    }
    $scope.delPromo = function(promo) {
        $scope.promo = promo;
        var deleteModal = $modal.open({
            templateUrl: 'views/promos/delete.html',
            controller: 'deletePromoController',
            resolve: {
                promo: function() {
                    return $scope.promo;
                }
            },
            size: 'sm'
        });
        deleteModal.result.then(function(deleted) {
            if (deleted) {
                $scope.promos.splice($scope.promos.indexOf($scope.promo), 1);
            }
        });
    }


}
]
},{}],47:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', 'promoService', '$timeout','$upload',
function($scope, $modalInstance, promoService, $timeout,$upload) {
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.promo = {};
    $scope.file = [];
    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            $scope.file.push($files[i]);
        }
    }
    $scope.loader = '0';

    $scope.addNewPromo = function() {
        $scope.upload = $upload.upload({
            url: 'promo',
            method: 'POST',
            data: $scope.promo,
            file: $scope.file
        }).success(function(res) {
           $scope.saved = true;
           $timeout(function() {
            $modalInstance.close(res);
            $scope.promo = {};
            $scope.saved = false;
        }, 1000);

       });
    }

}
]
},{}],48:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', 'promoService', 'promo',

    function($scope, $modalInstance, promoService, promo) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.deletePromo = function() {
            promoService.delPromo(promo.id).then(function(res) {
                if (res.data.delete) {
                    $modalInstance.close(res.data.delete);
                }
            });
        }
    }
]
},{}],49:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', 'promoService', '$timeout', 'promo',
    function($scope, $modalInstance, promoService, $timeout, promo) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.promoCopy = angular.copy(promo);

        $scope.editPromo = function() {
            promoService.updatePromo($scope.promoCopy.id, $scope.promoCopy).then(function(res) {
                $scope.saved = true;
                $timeout(function() {
                    $modalInstance.close(res.data);
                    $scope.saved = false;
                }, 1000);
            })
        }
    }
]
},{}],50:[function(require,module,exports){
module.exports = ['$scope','cartService','$state',
function($scope,cartService,$state) {
    $scope.open = {
        one:true
    };
    $scope.toggleAcc = function(index) {
        angular.forEach($scope.open, function(ind, val) {
            $scope.open[val] = false;
        })
        $scope.open[index] = !$scope.open[index];
    }
    $scope.firstOpen = true;
    $scope.lot.numShares = 1;
    $scope.toggleNumShares = function(way) {
        if (way == 1) $scope.lot.numShares++;
        if (way == -1) {
            if ($scope.lot.numShares !== 1) {
                $scope.lot.numShares--
            }
        }
    }
    $scope.calcTotal = function() {
        return ($scope.bundle.numberOfDraws * $scope.lot.numShares) * $scope.bundle.pricePerDraw;
    }
    $scope.addToCart = function() {
      $scope.currentLot = {
        lotLines: $scope.lotLines,
        lottery:$scope.lot.lottery,
        draw:$scope.bundle,
        type:'singleGroup',
        numShares: $scope.lot.numShares,
        price: $scope.calcTotal()
    }
    cartService.addToCart('singleGroup', $scope.currentLot).then(function(res) {
        $state.go('cart.auth');
    });
}
}
]
},{}],51:[function(require,module,exports){
module.exports = ['$scope', '$state', '$stateParams','lotteries', 'cartService',
function($scope, $state, $stateParams,lotteries, cartService) {
    $scope.lot = _.find(lotteries.data.data.data, {
        name: $stateParams.lotName
    });


    $scope.lotLineConfig = $scope.lot.lottery.lineRules;

    $scope.bundle = $scope.lot.bundles[0];


    $scope.lotLines = [];


    $scope.$on('lotLine', function(event, lotLine) {
        if (lotLine.valid) {
            _.remove($scope.lotLines, function(line) {
                return line.id == lotLine.id;
            });
            $scope.lotLines.push(lotLine);
        } else {
            _.remove($scope.lotLines, function(line) {
                return line.id == lotLine.id;
            });
        }
        $scope.lotValid = ($scope.lotLines.length > 0);
    });

    $scope.calcTotal = function() {
        return ($scope.lotLines.length * $scope.bundle.numberOfDraws) * $scope.bundle.pricePerDraw;
    }



    $scope.setBundle = function(bundle) {
        $scope.bundle = bundle;
        $scope.calcTotal();
    }


    $scope.clearAll = function() {
        $scope.$broadcast('clearAll');
    }

    $scope.pickAll = function() {
        $scope.$broadcast('pickAll');
    }

    $scope.play = function() {
        $scope.currentLot = {
            lotLines: $scope.lotLines,
            lottery:$scope.lot.lottery,
            draw:$scope.bundle,
            type:'singles',
            price: $scope.calcTotal()
        }

        cartService.addToCart( 'singles',$scope.currentLot).then(function(res) {
            $state.go('cart.auth');
        });
    }



}
]
},{}],52:[function(require,module,exports){
module.exports = ['$scope', '$modalInstance', '$timeout', 'authService', 'userService', 'paymentsService', '$state', '$rootScope','ENV',
    function($scope, $modalInstance, $timeout, authService, userService, paymentsService, $state, $rootScope,ENV) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.user = {};
        $scope.loginUser = function() {
            $scope.user.userName = $scope.user.email;
            authService.loginUser($scope.user).then(function(res) {
                userService.user = {userName:res.data.data.userName};
                    // userService.user.client_id = res.data.data.clientId;
                    // userService.user.client_secret = 'Bearer' + res.data.data.clientSecret;
                    var client = {
                        grant_type: 'operator',
                        client_id:'XbsuauKOEthYt2eTpfqGq7kdBFEkTPOO0ePqjvnJtZ8%253D',
                        client_secret:'rTqtRtzX8urBxI5aF5rKdkIjrfWp05flFSkfbhWpL7Y%253D',


                    }
                    if(ENV.api !== 'dev') {
                        authService.getToken(client).then(function(res) {
                    });
                    }

                paymentsService.checkIfUserHasPaymentMethod().then(function(res) {
                    userService.user.hasPayment = res.data.hasPayment;
                });
                if ($state.includes('cart')) $rootScope.$broadcast('userLoggenIn');

                $modalInstance.dismiss('cancel');
            }, function() {
                $scope.wrongCred = true;
            });
        }
    }
]
},{}],53:[function(require,module,exports){
module.exports = ['$scope', 'authService', '$state', 'userService', '$modalInstance','infoService',
function($scope, authService, $state, userService, $modalInstance,infoService ) {
    $scope.form = {};
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
    infoService.getCountries().then(function(res) {
        $scope.countries = res.data;
    });
    $scope.newUser = {};
    $scope.registerUser = function() {
        $scope.submitted = true;
        if ($scope.form.signUpForm.$valid) {
            authService.registerUser($scope.newUser).then(function(res) {
                $scope.user = {
                    userName:$scope.newUser.email,
                    password: $scope.newUser.password,
                    email:$scope.newUser.email
                };
                authService.loginUser($scope.user).then(function(res) {
                    userService.user = {userName:res.data.data.userName};
                    $modalInstance.dismiss('cancel');
            });

            });
        }
    }
    $scope.checkErrors = function(field, err) {
        return $scope.submitted && field.$error[err];
    }
}
]
},{}],54:[function(require,module,exports){
'use strict'
module.exports = function() {
    return {
        restrict: 'A',
        link: function($scope, element) {
            $(element).on('click', function() {
                var cart = $('.content-cart');
                if (!cart.data('open')) {
                    cart.animate({
                        'right': 0,
                        'top': '-140px'
                    }, function() {
                        $(this).data('open', true);
                    });
                } else {
                    cart.animate({
                        'right': '-1000px',
                        'top': '-41px'
                    }, function() {
                        $(this).data('open', false);
                    });
                }
            });
        }
    }
}
},{}],55:[function(require,module,exports){
module.exports = function() {
    return function($scope, element) {
         $scope.setArrowDown = function(fieldName) {
            return $scope.predicate == fieldName && $scope.reverse;
        }
        $scope.setArrowUp = function(fieldName) {
            return $scope.predicate == fieldName && !$scope.reverse;
        }
    }
}
},{}],56:[function(require,module,exports){
'use strict'
module.exports = function() {
    return {
        restrict: 'A',
        link: function($scope, element, attr) {
            if (attr.birthday) {
                $(element).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    minDate: "-80Y",
                    maxDate: "-18Y",
                    dateFormat: "d M ,yy",
                    yearRange: "1901:1996"
                });
            } else {
                $(element).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    maxDate: "Y",
                    dateFormat: "d M ,yy"
                });
            }

        }
    }
}
},{}],57:[function(require,module,exports){
'use strict'


module.exports = function() {
    return {
        restrict: 'A',
        link:function($scope,element) {
            element.msDropDown();
        }
    }
}
},{}],58:[function(require,module,exports){
'use strict'


module.exports = function() {
  return {
    restrict: 'A',
    link:function($scope,element) {
    //  $(window).scroll(function(){
    //   console.log($(window).scrollTop());
    //   if($(window).scrollTop() > 430 ) {
    //     $(element).css('top', $(window).scrollTop() - 400);
    //   }else {
    //     $(element).css('top', 0);
    //   }
    // });
$(".info-nav").sticky({topSpacing:10, bottomSpacing:400});


}
}
}
},{}],59:[function(require,module,exports){
'use strict'
module.exports = ['$interval',
    function($interval) {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/lotLine.html',
            scope: {
                lotLineConfig: '='
            },
            link: function($scope, elem, attr) {
                var guessRange = $scope.lotLineConfig.guessRange,
                    requiredSelectedCount = $scope.lotLineConfig.requiredSelectedCount,
                    secondaryGuessRange = $scope.lotLineConfig.secondaryGuessRange,
                    secondaryRequiredSelectedCount = $scope.lotLineConfig.secondaryRequiredSelectedCount,
                    secondaryGuessRangeName = $scope.lotLineConfig.secondaryGuessRangeName,
                    stopTime;
                $scope.lineNum = Number(attr.id.substr(7, 1)) + 1;
                /* generate regular numbers */
                $scope.cells = [];
                $scope.hasExtra = !!(secondaryGuessRange);
                _(_.range(1, guessRange + 1)).forEach(function(num) {
                    $scope.cells.push({
                        num: num,
                        isSelected: false
                    });
                });
                /* generate extra numbers */
                $scope.extraNumscells = [];
                _(_.range(1, secondaryGuessRange + 1)).forEach(function(num) {
                    $scope.extraNumscells.push({
                        num: num,
                        isSelected: false
                    });
                });
                /* final numbers */
                $scope.lotLine = {
                    nums: [],
                    extra: []
                };
                $scope.$watch('lotLine', function(lotLine) {
                    var finalLotLine = {
                        valid: true,
                        id: attr.id,
                        lotLine: $scope.lotLine
                    }
                    if ((lotLine.nums.length == requiredSelectedCount) && (lotLine.extra.length == secondaryRequiredSelectedCount)) {
                        $scope.lineValid = true;
                        $scope.$emit('lotLine', finalLotLine);
                    } else {
                        $scope.lineValid = false;
                        finalLotLine.valid = false;
                        $scope.$emit('lotLine', finalLotLine);
                    }
                }, true);
                /* the user clicked on number */
                $scope.userPickNum = function(cell) {
                    if (cell.isSelected) {
                        cell.isSelected = false;
                        _.pull($scope.lotLine.nums, cell.num);
                    } else {
                        if ($scope.lotLine.nums.length < requiredSelectedCount) {
                            cell.isSelected = true;
                            $scope.lotLine.nums.push(cell.num);
                        } else {
                            console.log('no more');
                        }
                    }
                };
                /* pick extra number */
                $scope.userPickExtraNum = function(cell) {
                    if (cell.isSelected) {
                        cell.isSelected = false;
                        _.pull($scope.lotLine.extra, cell.num);
                    } else {
                        if ($scope.lotLine.extra.length < secondaryRequiredSelectedCount) {
                            cell.isSelected = true;
                            $scope.lotLine.extra.push(cell.num);
                        } else {
                            console.log('no more');
                        }
                    }
                }



                $scope.$watch('pickCount', function(newVal) {
                    if(newVal == 4) {
                      $interval.cancel(stopTime);
                    }
                })

                /* the user wants quick pick */
                $scope.quickPick = function() {
                    $scope.pickCount = 0;
                    stopTime = $interval(function() {
                        $scope.clearLot();
                        $scope.lotLine.nums = _.sample(_.range(1, guessRange + 1), requiredSelectedCount);
                        _($scope.lotLine.nums).forEach(function(num) {
                            var num = _.find($scope.cells, {
                                num: num
                            });
                            num.isSelected = true;
                        });
                        $scope.lotLine.extra = _.sample(_.range(1, secondaryGuessRange + 1), secondaryRequiredSelectedCount);
                        _($scope.lotLine.extra).forEach(function(num) {
                            var num = _.find($scope.extraNumscells, {
                                num: num
                            });
                            num.isSelected = true;
                        });
                        $scope.pickCount++;
                    }, 300);

                }
                /* clear numbers */
                $scope.clearNums = function() {
                    $scope.clearLot();
                }
                $scope.clearLot = function() {
                    _($scope.cells).forEach(function(num) {
                        num.isSelected = false;
                    });
                    _($scope.extraNumscells).forEach(function(num) {
                        num.isSelected = false;
                    });
                    $scope.lotLine.nums = [];
                    $scope.lotLine.extra = [];
                }
                $scope.$on('clearAll', function() {
                    $scope.clearLot();
                });
                $scope.$on('pickAll', function() {
                    $scope.quickPick();
                });
            }
        };
    }
]
},{}],60:[function(require,module,exports){
'use strict'
module.exports = ['$interval',function($interval) {
  return {
    restrict: 'A',
    templateUrl:'views/directives/mbSlider.html',
    scope: {
      imgWidth: '@',
      galleryData: '='
    },
    link: function($scope, element) {

      $scope.selected = $scope.galleryData[0];

      $scope.scrollTo = function(image, ind) {
        $scope.listPosition = {
          left: (parseInt($scope.imgWidth) * ind * -1) + "px"
        };
        $scope.selected = image;
      }

      var i = 0;
      var autoSlide = function() {
        $scope.scrollTo($scope.galleryData[i], i);
        if (i + 1 == $scope.galleryData.length) {
          i = 0;
        } else {
          i++;
        }
      }
      var autoSlideInterval = $interval(autoSlide, 5000);
      $scope.startAutoSlide = function() {
        autoSlideInterval = $interval(autoSlide, 5000);
      }
      $scope.stopAutoSlide = function() {
        $interval.cancel(autoSlideInterval);
      }
    }
  }
}]
},{}],61:[function(require,module,exports){
exports.showModal = function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.on('click', function() {
                $('#' + attrs.showModal).modal('show');
            });
        }
    };
};

exports.closeModal = function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.on('click', function() {
                $('#' + attrs.closeModal).modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            });
        }
    };
};
},{}],62:[function(require,module,exports){
'use strict'


module.exports =

[

    function() {
        return {
            restrict: 'A',
            template: '<input type="button" ng-value="textMoreLess" ng-click="moreLessLines()" class="btn secondry-btn btn-sm">',
            link: function($scope, elem, attr) {

                $scope.numLotLineToShow = _.range(1, 11);
                $scope.numLines = 5;
                $scope.textMoreLess = '+ More lines';
                $scope.moreLessLines = function() {
                    if ($scope.numLines > 5) {
                        $scope.numLines = 5;
                        $scope.textMoreLess = '+ More lines';
                    } else {
                        $scope.numLines = 10;
                        $scope.textMoreLess = '- Less lines';
                    }
                }
            }
        };
    }
]
},{}],63:[function(require,module,exports){
// module.exports = function() {
//     return {
//         restrict: 'AE',
//         scope: {
//             model: '=',
//             pre_selected: '=preSelected'
//         },
//         template: "<div class='btn-group' data-ng-class='{open: open}'>" + "<button class='btn btn-small'>Select Language</button>" + "<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;openDropdown()'><span class='caret'></span></button>" + "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" + "<li><a data-ng-click='selectAll()'><i class='fa fa-check-square'></i>  Check All</a></li>" + "<li><a data-ng-click='deselectAll();'><i class='fa fa-times-circle'></i>  Uncheck All</a></li>" + "<li class='divider'></li>" + "<li data-ng-repeat='option in selectedItems'> <a data-ng-click='setSelectedItem(option)'>{{option.name}}<span style='padding-left: 4px;' data-ng-class='isChecked(option)'></span> </a></li>" + "</ul>" + "</div>",
//         controller: function($scope) {
//             $scope.openDropdown = function() {
//                 $scope.selectedItems = [];
//                 for (var i = 0; i < $scope.pre_selected.length; i++) {
//                     $scope.selectedItems.push({
//                         id:$scope.pre_selected[i].id,
//                         name:$scope.pre_selected[i].name
//                     });
//                 }
//             };
//             $scope.model = [];

//             $scope.selectAll = function() {
//                 $scope.model = $scope.selectedItems;
//             };

//             $scope.deselectAll = function() {
//                 $scope.model = [];
//             };

//             $scope.setSelectedItem = function(option) {

//                 if (_.contains($scope.model, option)) {
//                     $scope.model = _.without($scope.model, option);
//                 } else {

//                     $scope.model.push(option);

//                 }
//                 console.log($scope.model);
//                 return false;
//             };

//             $scope.isChecked = function(option) {
//                 if (_.contains($scope.model, option)) {
//                     return 'fa fa-check';
//                 }
//                 return false;
//             };


//         }
//     }
// };

module.exports = function($q) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    scope: {
      selectedLabel: "@",
      availableLabel: "@",
      displayAttr: "@",
      available: "=",
      model: "=ngModel"
    },
    templateUrl:'views/operatorDash/multiple.html',
    link: function(scope, elm, attrs) {
      scope.selected = {
        available: [],
        current: []
      };

      /* Handles cases where scope data hasn't been initialized yet */
      var dataLoading = function(scopeAttr) {
        var loading = $q.defer();
        if(scope[scopeAttr]) {
          loading.resolve(scope[scopeAttr]);
        } else {
          scope.$watch(scopeAttr, function(newValue, oldValue) {
            if(newValue !== undefined)
              loading.resolve(newValue);
          });
        }
        return loading.promise;
      };

      /* Filters out items in original that are also in toFilter. Compares by reference. */
      var filterOut = function(original, toFilter) {
        var filtered = [];
        angular.forEach(original, function(entity) {
          var match = false;
          for(var i = 0; i < toFilter.length; i++) {
            if(toFilter[i][attrs.displayAttr] == entity[attrs.displayAttr]) {
              match = true;
              break;
            }
          }
          if(!match) {
            filtered.push(entity);
          }
        });
        return filtered;
      };

      scope.refreshAvailable = function() {
        scope.available = filterOut(scope.available, scope.model);
        scope.selected.available = [];
        scope.selected.current = [];
      };

      scope.add = function() {
        scope.model = scope.model.concat(scope.selected.available);
        scope.refreshAvailable();
      };
      scope.remove = function() {
        scope.available = scope.available.concat(scope.selected.current);
        scope.model = filterOut(scope.model, scope.selected.current);
        scope.refreshAvailable();
      };

      $q.all([dataLoading("model"), dataLoading("available")]).then(function(results) {
        scope.refreshAvailable();
      });
    }
  };
}
},{}],64:[function(require,module,exports){
module.exports = ['$parse',
    function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    var valid = $parse(attrs.match)(scope) === ctrl.$modelValue;
                    ctrl.$setValidity('mismatch', valid);
                });
            }
        }
    }
]
},{}],65:[function(require,module,exports){
'use strict'
module.exports = ['$location', '$anchorScroll',
    function($location, $anchorScroll) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.scrollTo = function(section) {
                    $location.hash(section);
                    $anchorScroll();
                }
                $scope.isActive = function(info) {
                    return info.head == $location.hash();
                }
            }
        }
    }
]
},{}],66:[function(require,module,exports){
'use strict'


module.exports = ['infoService','$location', function(infoService,$location) {
  return {
    restrict: 'A',
    templateUrl:'views/directives/info.html',
    scope: {
      type:'@',
      data: '='
    },
    link:function($scope,element) {

      var infoType = 'get' + $scope.type[0].toUpperCase() + $scope.type.slice(1);

      infoService[infoType]().then(function(res) {
        $scope.data  = res.data.data;
        $location.hash($scope.data[0].head);
      });
    }
  }
}]
},{}],67:[function(require,module,exports){
'use strict'


module.exports = function() {
    return {
        restrict: 'A',
        templateUrl: 'views/directives/slider.html',
        link: function($scope, element) {
            var boxWidth = 140 + 32,
                sliderSize = $scope.lotteries.length,
                slider = $('.wrapSlider'),
                numBoxesToShow = slider.data('numBoxesToShow'),
                current = numBoxesToShow,
                backToStart = (sliderSize * boxWidth) - (numBoxesToShow * boxWidth),
                action;
            $('.slider').css('maxWidth', boxWidth * $scope.lotteries.length);
            $('.wrap-controls').css('maxWidth', boxWidth * $scope.lotteries.length);


//             $scope.next= function() {
//   $('#lot-list').slickNext();
// }
// $scope.prev= function() {
//   $('#lot-list').slickPrev();
// }
            $('.control-btn').on("click", function() {

                var direction = $(this).data('dir');

                if (direction == 'right') {
                    ++current;
                    action = '-=' + boxWidth;
                } else {
                    if (current == numBoxesToShow) return;
                    --current;
                    action = '+=' + boxWidth;
                }

                if (current == (sliderSize + 1)) {
                    slider.animate({
                        'marginLeft': '+=' + backToStart
                    });
                    current = numBoxesToShow;
                    return;
                }
                slider.animate({
                    'marginLeft': action
                });
            });
        }
    }
}
},{}],68:[function(require,module,exports){
'use strict'


module.exports = function() {
  return {
    restrict: 'A',
    link:function($scope,element) {
     var element = $(element);
     var top = element.offset().top;
     $(window).on('scroll', function() {
      if($(window).scrollTop() >= top ) {
        element.addClass('sticky');
      }else {
        element.removeClass('sticky');
      }
    })
   }
 }
}
},{}],69:[function(require,module,exports){
'use strict'
module.exports = ['$rootScope', '$interval',
function($rootScope, $interval) {
    return {
        restrict: 'A',
        link: function($scope, element) {
            $scope.currentTesti = 0;
            $scope.testi = $rootScope.operatorConfig.testis[$scope.currentTesti];
            $scope.nextTestis = function() {
                if (($scope.currentTesti + 1) == $rootScope.operatorConfig.testis.length) return;
                $scope.testi = $rootScope.operatorConfig.testis[++$scope.currentTesti];
            }
            $scope.prevTestis = function() {
                if ($scope.currentTesti == 0) return;
                $scope.testi = $rootScope.operatorConfig.testis[--$scope.currentTesti];
            }
            $interval(function() {
                if (($scope.currentTesti + 1) == $rootScope.operatorConfig.testis.length) {
                    $scope.testi = $rootScope.operatorConfig.testis[0];
                    --$scope.currentTesti;
                } else {
                   $scope.testi = $rootScope.operatorConfig.testis[++$scope.currentTesti];
               }

           }, 700000)
        }
    }
}
]
},{}],70:[function(require,module,exports){
'use strict'


module.exports = /*@ngInject*/ function()
{
    return {
        restrict: 'A',
        templateUrl:'views/myAccount/transactions/ticket.html',
        scope:{
          ticket: '=',
          letters: '='
        },
        link:function($scope,element) {

          $scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
          $('.fancybox').fancybox();
        }
    }
}
},{}],71:[function(require,module,exports){
'use strict'


module.exports = function() {
    return {
        restrict: 'A',
        scope: {
            obg: '=',
            dataLen: '='
        },
        link:function($scope,element) {
            $scope.obg.open = false;
            $(element).on("click", function() {
                $scope.$apply(function() {
                 $scope.obg.open = !$scope.obg.open;
                 $(element).next().find('.row-toggle').slideToggle();
                });
            });

            element.hover(function() {
                element.addClass('tr-selected');
            }, function() {
                if(!$scope.obg.open) {
                    element.removeClass('tr-selected');
                }

            })

        }
    }
}

},{}],72:[function(require,module,exports){
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
},{"./config/authInterceptor":1,"./config/htmlEditor":2,"./config/routes":3,"./config/runPhase":4,"./config/translate":5,"./controllers/admin/admin":6,"./controllers/admin/contactsList":7,"./controllers/admin/edit":8,"./controllers/cart/cartAuth":9,"./controllers/cart/myCart":10,"./controllers/cart/paymentAndInfo":11,"./controllers/contact/contact":12,"./controllers/home":13,"./controllers/hunter/huntJackpot":14,"./controllers/hunter/hunter":15,"./controllers/hunter/period":16,"./controllers/info/faq":17,"./controllers/info/policy":18,"./controllers/info/terms":19,"./controllers/myAccount/addPayment":20,"./controllers/myAccount/deletePayment":21,"./controllers/myAccount/deposit":22,"./controllers/myAccount/myAccount":23,"./controllers/myAccount/myPayment":24,"./controllers/myAccount/myPurchases":25,"./controllers/myAccount/myTickets":26,"./controllers/myAccount/myTransactions":27,"./controllers/myAccount/personalInfo":28,"./controllers/myAccount/singlePurchase":29,"./controllers/myAccount/ticketRow":30,"./controllers/myAccount/updatePayment":31,"./controllers/nav":32,"./controllers/operatorDash/general":33,"./controllers/operatorDash/langs":34,"./controllers/operatorDash/latest":35,"./controllers/operatorDash/operatorDash":36,"./controllers/operatorDash/products":37,"./controllers/operatorDash/testis":38,"./controllers/playLotteries/groupPlay":39,"./controllers/playLotteries/latestResults":40,"./controllers/playLotteries/latestResultsDetails":41,"./controllers/playLotteries/playlot":42,"./controllers/promLoc/add":43,"./controllers/promLoc/delete":44,"./controllers/promLoc/promLoc":45,"./controllers/promo":46,"./controllers/promos/add":47,"./controllers/promos/delete":48,"./controllers/promos/edit":49,"./controllers/singleLot/group":50,"./controllers/singleLot/lot":51,"./controllers/user/login":52,"./controllers/user/signUpModal":53,"./directives/cartSlide":54,"./directives/changeArrow":55,"./directives/datePicker":56,"./directives/dropDown":57,"./directives/fixedNav":58,"./directives/lotLine":59,"./directives/mbSlider":60,"./directives/modal":61,"./directives/moreLessLines":62,"./directives/multiSelect":63,"./directives/passwordMatch":64,"./directives/scrollTo":65,"./directives/showInfo":66,"./directives/slider":67,"./directives/sticky":68,"./directives/testisSlider":69,"./directives/ticket":70,"./directives/toggleRow":71,"./filters/currency":73,"./filters/dateToSec":74,"./filters/discount":75,"./filters/locPage":76,"./filters/numberFilter":77,"./filters/results":78,"./filters/transactions":79,"./services/account":80,"./services/admin":81,"./services/auth":82,"./services/cart/cart":83,"./services/contact":84,"./services/info":85,"./services/lot":86,"./services/operator":87,"./services/payments":88,"./services/promo":89,"./services/promoLoc":90,"./services/user":91}],73:[function(require,module,exports){
'use strict'

module.exports = function() {
    return function(moneyType) {
        switch (moneyType) {
            case 'CAD':
                return 'CAD&#36;';
            case 'EURO':
                return '&euro;';
            case 'DOLLAR':
                return '&#36;'
        }
    }
}
},{}],74:[function(require,module,exports){
'use strict'
module.exports = function() {
    return function(date) {
        if (date) {
            var date = new date(date);
            return date.getTime();
        } else {
            return '';
        }
    }
}
},{}],75:[function(require,module,exports){
'use strict'

module.exports = function() {
    return function(num) {

        if (num == undefined) {
            return 'No Discount';
        } else {
            return num + '% Discount';
        }

    }
}
},{}],76:[function(require,module,exports){
'use strict'

module.exports = function() {
    return function(promos,page) {
        var filterdPromos = [];
        angular.forEach(promos, function(val) {
            if(val.loc == page) {
                filterdPromos.push(val);
            }
        });
        return filterdPromos;
    }
}
},{}],77:[function(require,module,exports){
'use strict'

module.exports = ['$filter',function($filter) {
    return function(input) {

        if (isNaN(input)) {
            return input;
        } else {
            return $filter('number')(input, 0);
        }

    }
}]
},{}],78:[function(require,module,exports){
'use strict'

module.exports = function() {
    return function(nums) {

        if (nums.length) {
            return nums;
        } else {
            return 'Pending'
        }

    }
}
},{}],79:[function(require,module,exports){
'use strict'

module.exports = function() {
    return function(tran) {

        if (tran == '') {
            return '-';
        } else {
            return tran;
        }

    }
}
},{}],80:[function(require,module,exports){
module.exports = ['$http','ENV',
function($http,ENV) {

    this.getUserInfo = function() {
        return $http.get('api/user');
    }

    this.getTransactions = function() {
        return $http[ENV.method](ENV.apiActivity + '/transactions');
    }

    this.getTickets = function() {
        return $http[ENV.method](ENV.apiActivity + '/tickets');
    }
    this.getPurchases = function() {
        return $http[ENV.method](ENV.apiActivity + '/purchases');
    };

    this.getSinglePurchase = function(id) {
        return $http.post(ENV.apiActivity + '/purchase/' + id);
    }


}
]
},{}],81:[function(require,module,exports){
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
},{}],82:[function(require,module,exports){
'use strict'

module.exports = ['$http','ENV',
function($http, ENV) {

    this.loginUser = function(cred) {
      return $http.post(ENV.apiAccount + '/login', cred);
    }

    this.registerUser = function(userDetails) {
      return $http.post(ENV.apiAccount + '/register', userDetails);
    }


    this.logOut = function() {
      return $http.post(ENV.apiAccount + '/log-out');
    }

    this.getToken = function(client) {
      //return $http.post(ENV.apiToken, client);
      return $http({
        method:'POST',
        url: ENV.apiToken,
        data: client,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        }
      });
    }

    this.getUser = function() {
      return $http.post( ENV.apiActivity + '/personal');
    }



}
];
},{}],83:[function(require,module,exports){
module.exports = ['$http',
    function($http) {
        this.items = {
            singles: [],
            groups: [],
            singleGroup: []
        };
        this.addToCart = function(type, item) {
            this.items[type].push(item);
            return this.saveItemsToSession(this.items);
        };
        this.getItemsInCart = function() {
            var itemsInCart = [];
            for (var type in this.items) {
                angular.forEach(this.items[type], function(item) {
                    item.common = {
                        price: item.price
                    }
                    if (item.type == 'singles' || item.type == 'singleGroup') {
                        item.common.name = item.lottery.name;
                        item.common.id = item.lottery.id;
                    }else {
                        item.common.id = item.id;
                        var names = _.pluck(item.lotteries, 'name');
                        item.common.name = names.join(',');
                    }
                    itemsInCart.push(item);
                });
            }
            return itemsInCart;
        }
        this.delItem = function(item, type) {
            var index = this.items[type].indexOf(item);
            this.items[type].splice(index, 1);
        }
        this.saveItemsToSession = function(items) {
            return $http.post('cart', {
                items: items
            });
        };
        this.clearItems = function() {
            this.items = {
                singles: [],
                groups: [],
                singleGroup: []
            };
            return $http.delete('cart/1');
        };
    }
]
},{}],84:[function(require,module,exports){
module.exports = ['$http',
    function($http) {
      this.getContacts = function() {
        return $http.get('contact');
      }
      this.saveContact = function(data) {
        return $http.post('contact', data);
      }
      this.delContact = function(id) {
        return $http.delete('contact/' + id);
      }
    }
]
},{}],85:[function(require,module,exports){
module.exports = ['$http',
function($http) {
  this.getPolicy = function() {
    return $http.get('info/policy');
  }

  this.getTerms = function() {
    return $http.get('info/terms');
  }

  this.getFAQ = function() {
    return $http.get('info/faq');
  }


  this.getCountries = function() {
    return $http.get('countries/names');
  }

  this.getStates = function() {
    return $http.get('countries/states');
  }
}
]
},{}],86:[function(require,module,exports){
module.exports = ['$http','ENV',
function($http, ENV) {
    this.getLotteries = function() {
        return $http[ENV.method](ENV.apiOffer + '/draw/product');
    };
    this.getLatestResults = function() {
        return $http.get('api/latest-results');
    };
    this.getLatestResultsDetails = function() {
        return $http.get('api/lottery-results-details');
    };
    this.getLatestResultsDetailsByDate = function() {
        return $http.get('api/lottery-results-details-by-date');
    };

    this.getGroupPlay = function() {
        return $http.get('api/group');
    };

}
];
},{}],87:[function(require,module,exports){
module.exports = ['$http',
    function($http) {
        this.saveSettings = function(config) {
            return $http.post('saveOperatorSettings', {operatorConfig:config})
        }
    }
]
},{}],88:[function(require,module,exports){
module.exports = ['$http', 'userService', '$q', 'ENV',
function($http, userService, $q, ENV) {

    this.getPayments = function() {
        return $http[ENV.method](ENV.apiActivity + '/payments');
    }

    this.addPayment = function(payment) {
        return $http.post(ENV.apiPaymentMethod + '/create', payment);
    }

    this.deletePayment = function(paymentId) {
        return $http.delete('api/player/activity/payments/' + paymentId);
    }


    this.updatePayment = function(paymentId, paymentData) {
        return $http.put('api/player/activity/payments/' + paymentId, paymentData);
    }

    this.checkIfUserHasPaymentMethod = function() {
        return $http.get('checkIfUserHasPaymentMethod');
    }

}
]
},{}],89:[function(require,module,exports){
module.exports = ['$http',
    function($http) {
        this.getPromos = function() {
            return $http.get('promo');
        }
        this.updatePromo = function(promoId, promoData) {
            return $http.put('promo/' + promoId, {
                promo: promoData
            })
        }
        this.newPromo = function(promo) {
            return $http.post('promo', {
                promo: promo
            })
        }
        this.delPromo = function(promoId) {
            return $http.delete('promo/' + promoId);
        }



    }
]
},{}],90:[function(require,module,exports){
module.exports = ['$http',
    function($http) {


        this.getLoc = function(loc) {
            return $http.get('promoLoc', {params:{
                loc:loc
            }});
        }

        this.updatePromLoc = function(promos,loc) {
             return $http.post('promoLoc', {
                promos: promos,
                loc: loc
            });
        }
    }
]
},{}],91:[function(require,module,exports){
module.exports = [
    function() {

        this.hasPaymentMethod = false;


        this.user = null;

        this.setHasPaymentMethod = function(payment) {
            this.hasPaymentMethod = payment;
        }

    }
];
},{}]},{},[72])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFx3YW1wXFx3d3dcXGxvdC1sb2NhbFxcbm9kZV9tb2R1bGVzXFxndWxwLWJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb25maWcvYXV0aEludGVyY2VwdG9yLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb25maWcvaHRtbEVkaXRvci5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29uZmlnL3JvdXRlcy5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29uZmlnL3J1blBoYXNlLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb25maWcvdHJhbnNsYXRlLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9hZG1pbi9hZG1pbi5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvYWRtaW4vY29udGFjdHNMaXN0LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9hZG1pbi9lZGl0LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9jYXJ0L2NhcnRBdXRoLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9jYXJ0L215Q2FydC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvY2FydC9wYXltZW50QW5kSW5mby5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvY29udGFjdC9jb250YWN0LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9ob21lLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9odW50ZXIvaHVudEphY2twb3QuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL2luZm8vcG9saWN5LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9pbmZvL3Rlcm1zLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9teUFjY291bnQvYWRkUGF5bWVudC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvbXlBY2NvdW50L2RlbGV0ZVBheW1lbnQuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL215QWNjb3VudC9kZXBvc2l0LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9teUFjY291bnQvbXlBY2NvdW50LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9teUFjY291bnQvbXlQYXltZW50LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9teUFjY291bnQvbXlQdXJjaGFzZXMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL215QWNjb3VudC9teVRpY2tldHMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL215QWNjb3VudC9teVRyYW5zYWN0aW9ucy5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvbXlBY2NvdW50L3BlcnNvbmFsSW5mby5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvbXlBY2NvdW50L3NpbmdsZVB1cmNoYXNlLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9teUFjY291bnQvdGlja2V0Um93LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9teUFjY291bnQvdXBkYXRlUGF5bWVudC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvbmF2LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9vcGVyYXRvckRhc2gvZ2VuZXJhbC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvb3BlcmF0b3JEYXNoL2xhbmdzLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9vcGVyYXRvckRhc2gvbGF0ZXN0LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9vcGVyYXRvckRhc2gvb3BlcmF0b3JEYXNoLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9vcGVyYXRvckRhc2gvcHJvZHVjdHMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL29wZXJhdG9yRGFzaC90ZXN0aXMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL3BsYXlMb3R0ZXJpZXMvZ3JvdXBQbGF5LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9wbGF5TG90dGVyaWVzL2xhdGVzdFJlc3VsdHMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL3BsYXlMb3R0ZXJpZXMvbGF0ZXN0UmVzdWx0c0RldGFpbHMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL3BsYXlMb3R0ZXJpZXMvcGxheWxvdC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvcHJvbUxvYy9hZGQuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL3Byb21Mb2MvZGVsZXRlLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9wcm9tTG9jL3Byb21Mb2MuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2NvbnRyb2xsZXJzL3Byb21vLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9wcm9tb3MvYWRkLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9wcm9tb3MvZGVsZXRlLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9wcm9tb3MvZWRpdC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvY29udHJvbGxlcnMvc2luZ2xlTG90L2dyb3VwLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy9zaW5nbGVMb3QvbG90LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy91c2VyL2xvZ2luLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9jb250cm9sbGVycy91c2VyL3NpZ25VcE1vZGFsLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL2NhcnRTbGlkZS5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZGlyZWN0aXZlcy9jaGFuZ2VBcnJvdy5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZGlyZWN0aXZlcy9kYXRlUGlja2VyLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL2Ryb3BEb3duLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL2ZpeGVkTmF2LmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL2xvdExpbmUuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2RpcmVjdGl2ZXMvbWJTbGlkZXIuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2RpcmVjdGl2ZXMvbW9kYWwuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2RpcmVjdGl2ZXMvbW9yZUxlc3NMaW5lcy5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZGlyZWN0aXZlcy9tdWx0aVNlbGVjdC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZGlyZWN0aXZlcy9wYXNzd29yZE1hdGNoLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL3Njcm9sbFRvLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL3Nob3dJbmZvLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL3NsaWRlci5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZGlyZWN0aXZlcy9zdGlja3kuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2RpcmVjdGl2ZXMvdGVzdGlzU2xpZGVyLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9kaXJlY3RpdmVzL3RpY2tldC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZGlyZWN0aXZlcy90b2dnbGVSb3cuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2Zha2VfYjg1ODkzMC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZmlsdGVycy9jdXJyZW5jeS5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZmlsdGVycy9kYXRlVG9TZWMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2ZpbHRlcnMvZGlzY291bnQuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2ZpbHRlcnMvbG9jUGFnZS5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZmlsdGVycy9udW1iZXJGaWx0ZXIuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL2ZpbHRlcnMvcmVzdWx0cy5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvZmlsdGVycy90cmFuc2FjdGlvbnMuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL2FjY291bnQuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL2FkbWluLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9zZXJ2aWNlcy9hdXRoLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9zZXJ2aWNlcy9jYXJ0L2NhcnQuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL2NvbnRhY3QuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL2luZm8uanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL2xvdC5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvc2VydmljZXMvb3BlcmF0b3IuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL3BheW1lbnRzLmpzIiwiQzovd2FtcC93d3cvbG90LWxvY2FsL3B1YmxpYy9hbmd1bGFyLWFwcC9zZXJ2aWNlcy9wcm9tby5qcyIsIkM6L3dhbXAvd3d3L2xvdC1sb2NhbC9wdWJsaWMvYW5ndWxhci1hcHAvc2VydmljZXMvcHJvbW9Mb2MuanMiLCJDOi93YW1wL3d3dy9sb3QtbG9jYWwvcHVibGljL2FuZ3VsYXItYXBwL3NlcnZpY2VzL3VzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gWyckcScsICckbG9jYXRpb24nLCAndXNlclNlcnZpY2UnLFxyXG5mdW5jdGlvbigkcSwgJGxvY2F0aW9uLCB1c2VyU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAncmVxdWVzdCc6IGZ1bmN0aW9uKCRjb25maWcpIHtcclxuICAgICAgICAgICAgLy8gaWYodXNlclNlcnZpY2UudXNlcikge1xyXG4gICAgICAgICAgICAvLyAgICAgJGNvbmZpZy5oZWFkZXJzWydjbGllbnRfaWQnXSA9IHVzZXJTZXJ2aWNlLnVzZXIuY2xpZW50X2lkO1xyXG4gICAgICAgICAgICAvLyAgICAgJGNvbmZpZy5oZWFkZXJzWydjbGllbnRfc2VjcmV0J10gPSB1c2VyU2VydmljZS51c2VyLmNsaWVudF9zZWNyZXQ7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgJGNvbmZpZy5oZWFkZXJzWydvcGVyYXRvcl9uYW1lJ10gPSAnT3BlcmF0b3IwJztcclxuICAgICAgICAgICAgJGNvbmZpZy5oZWFkZXJzWydvcGVyYXRvcl9zZWNyZXQnXSA9ICdDSEFOR0VNRSc7XHJcbiAgICAgICAgICAgICRjb25maWcuaGVhZGVyc1snY2xpZW50X3R5cGUnXSA9ICd3ZWInO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRjb25maWc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAncmVzcG9uc2VFcnJvcic6IGZ1bmN0aW9uKHJlamVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyU2VydmljZS51c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyRsb2NhdGlvbi51cmwoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXSIsIm1vZHVsZS5leHBvcnRzID0gWyckcHJvdmlkZScsXHJcbiAgICBmdW5jdGlvbigkcHJvdmlkZSkge1xyXG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcigndGFPcHRpb25zJywgWyckZGVsZWdhdGUnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbih0YU9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHRhT3B0aW9ucy50b29sYmFyID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFsncCcsICdwcmUnLCAncXVvdGUnXSxcclxuICAgICAgICAgICAgICAgICAgICBbJ2JvbGQnLCAnaXRhbGljcycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3VuZGVybGluZScsICd1bCcsICdvbCdcclxuICAgICAgICAgICAgICAgICAgICAsICdyZWRvJywgJ3VuZG8nLCAnY2xlYXInXSxcclxuICAgICAgICAgICAgICAgICAgICBbJ2p1c3RpZnlMZWZ0JywgJ2p1c3RpZnlDZW50ZXInLCAnanVzdGlmeVJpZ2h0J10sXHJcbiAgICAgICAgICAgICAgICAgICAgWydpbnNlcnRMaW5rJ11cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFPcHRpb25zO1xyXG4gICAgICAgICAgICB9XSlcclxuICAgICAgICB9XTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgJyRodHRwUHJvdmlkZXInLFxyXG4gICAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuICAgICAgICAvKj09PT09PT09PT0gIEhPTUUgUEFHRSAgPT09PT09PT09PSovXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBsb3R0ZXJpZXM6IFsnJGh0dHAnLCAnRU5WJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigkaHR0cCwgRU5WKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFtFTlYubWV0aG9kXShFTlYuYXBpT2ZmZXIgKyAnL2RyYXcvcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcHJvbW9zOiBbJyRodHRwJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdwcm9tb0xvYycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYzogJ0hvbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBwcm9tb3NCb3g6IFsnJGh0dHAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ3Byb21vTG9jJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiAncHJvbW90aW9uc0JveCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2hvbWUvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8qPT09PT09PT09PSBPTkUgTE9UIFBMQVkgUEFHRSAgPT09PT09PT09PSovXHJcbiAgICAgICAgLnN0YXRlKCdvbmUtbG90LXBsYXknLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbG90dGVyeS86bG90TmFtZVwiLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBsb3R0ZXJpZXM6IFsnJGh0dHAnLCAnRU5WJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigkaHR0cCwgRU5WKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFtFTlYubWV0aG9kXShFTlYuYXBpT2ZmZXIgKyAnL2RyYXcvcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibG90Q29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9vbmUtbG90LXBsYXkvaW5kZXguaHRtbFwiXHJcbiAgICAgICAgfSkuc3RhdGUoJ29uZS1sb3QtcGxheS5QZXJzb25hbCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wZXJzb25hbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImxvdENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvb25lLWxvdC1wbGF5L3BlcnNvbmFsLmh0bWxcIlxyXG4gICAgICAgIH0pLnN0YXRlKCdvbmUtbG90LXBsYXkuR3JvdXAnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZ3JvdXBcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJncm91cENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvb25lLWxvdC1wbGF5L2dyb3VwLmh0bWxcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLyo9PT09PT09PT09ICBFTkQgUExBWSBQQUdFICA9PT09PT09PT09Ki9cclxuICAgICAgICAvKj09PT09PT09PT0gIFBMQVkgTE9UVEVSSUVTICA9PT09PT09PT09Ki9cclxuICAgICAgICAuc3RhdGUoJ3BsYXlMb3R0ZXJpZXMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcGxheUxvdHRlcmllc1wiLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBsb3R0ZXJpZXM6IFsnJGh0dHAnLCAnRU5WJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigkaHR0cCwgRU5WKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFtFTlYubWV0aG9kXShFTlYuYXBpT2ZmZXIgKyAnL2RyYXcvcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwicGxheWxvdENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvcGxheUxvdHRlcmllcy9pbmRleC5odG1sXCJcclxuICAgICAgICB9KS5zdGF0ZSgncGxheUxvdHRlcmllcy5JbmRleCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wbGF5XCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwicGxheWxvdENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvcGxheUxvdHRlcmllcy9sb3R0ZXJpZXMuaHRtbFwiXHJcbiAgICAgICAgfSkuc3RhdGUoJ3BsYXlMb3R0ZXJpZXMuR3JvdXAnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZ3JvdXBcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJncm91cFBsYXlDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL3BsYXlMb3R0ZXJpZXMvZ3JvdXAuaHRtbFwiXHJcbiAgICAgICAgfSkuc3RhdGUoJ3BsYXlMb3R0ZXJpZXMuaHVudGVyJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL0phY2twb3QtSHVudGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiaHVudGVyQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9odW50ZXIvaHVudGVyLmh0bWxcIlxyXG4gICAgICAgIH0pLnN0YXRlKCdwbGF5TG90dGVyaWVzLmh1bnRlci5zdGVwT25lJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NlbGVjdC1sb3R0ZXJ5XCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiaHVudGVyQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9odW50ZXIvc3RlcC1vbmUuaHRtbFwiXHJcbiAgICAgICAgfSkuc3RhdGUoJ3BsYXlMb3R0ZXJpZXMuaHVudGVyLnN0ZXBUd28nLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvaHVudC1qYWNrcG90XCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiaHVudEphY2twb3RDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2h1bnRlci9zdGVwLXR3by5odG1sXCJcclxuICAgICAgICB9KS5zdGF0ZSgncGxheUxvdHRlcmllcy5odW50ZXIuc3RlcFRocmVlJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2h1bnQtamFja3BvdFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcInBlcmlvZENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvaHVudGVyL3N0ZXAtdGhyZWUuaHRtbFwiXHJcbiAgICAgICAgfSkuc3RhdGUoJ2xhdGVzdC1yZXN1bHRzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2xhdGVzdC1yZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibGF0ZXN0UmVzdWx0c0NvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvcGxheUxvdHRlcmllcy9sYXRlc3QtcmVzdWx0cy5odG1sXCJcclxuICAgICAgICB9KS5zdGF0ZSgnbGF0ZXN0LXJlc3VsdHMtZGV0YWlscycsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9sYXRlc3QtcmVzdWx0cy1kZXRhaWxzLzppZFwiLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBsb3Q6IFsnbG90U2VydmljZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24obG90U2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG90U2VydmljZS5nZXRMYXRlc3RSZXN1bHRzRGV0YWlscygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJsYXRlc3RSZXN1bHRzRGV0YWlsc0NvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvcGxheUxvdHRlcmllcy9sYXRlc3QtcmVzdWx0cy1kZXRhaWxzLmh0bWxcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLyo9PT09PT09PT09ICBFTkQgUExBWSBMT1RURVJJRVMgID09PT09PT09PT0qL1xyXG4gICAgICAgIC8qPT09PT09PT09PSAgUFJPTU9TIFBBTkVMICA9PT09PT09PT09Ki9cclxuICAgICAgICAuc3RhdGUoJ3Byb21vc1BhbmVsJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3Byb21vcy1wYW5lbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcInByb21vQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogWyckaHR0cCcsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ29wZXJhdG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9wcm9tb3NQYW5lbC9pbmRleC5odG1sXCIsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pLnN0YXRlKCdwcm9tb0xvYycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3Byb21vTG9jJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3Byb21Mb2NDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9tTG9jL2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8qPT09PT09PT09PSBFTkQgUFJPTU9TIFBBTkVMICA9PT09PT09PT09Ki9cclxuICAgICAgICAvKj09PT09PT09PT0gIE9QRVJBVE9SIERBU0hCT0FSRCAgPT09PT09PT09PSovXHJcbiAgICAgICAgLnN0YXRlKCdvcGVyYXRvckRhc2gnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnb3BlcmF0b3JEYXNoQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvb3BlcmF0b3JEYXNoL2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KS5zdGF0ZSgnb3BlcmF0b3JEYXNoLmxhbmdzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbGFuZ3MnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbGFuZ3NDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9vcGVyYXRvckRhc2gvbGFuZ3MuaHRtbCcsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pLnN0YXRlKCdvcGVyYXRvckRhc2guZ2VuZXJhbCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2dlbmVyYWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZ2VuZXJhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL29wZXJhdG9yRGFzaC9nZW5lcmFsLmh0bWwnLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KS5zdGF0ZSgnb3BlcmF0b3JEYXNoLnRlc3RpcycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3Rlc3RpcycsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0ZXN0aXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9vcGVyYXRvckRhc2gvdGVzdGlzLmh0bWwnLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KS5zdGF0ZSgnb3BlcmF0b3JEYXNoLmxhdGVzdE5ld3MnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sYXRlc3ROZXdzJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2xhdGVzdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL29wZXJhdG9yRGFzaC9sYXRlc3ROZXdzLmh0bWwnLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KS5zdGF0ZSgnb3BlcmF0b3JEYXNoLnByb2R1Y3RzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncHJvZHVjdHNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9vcGVyYXRvckRhc2gvcHJvZHVjdHMuaHRtbCcsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLyo9PT09PT09PT09ICBFTkQgT1BFUkFUT1IgREFIQk9BUkQgID09PT09PT09PT0qL1xyXG4gICAgICAgIC8qPT09PT09PT09PSAgQURNSU4gUEFORUwgID09PT09PT09PT0qL1xyXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvYWRtaW5cIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJhZG1pbkNvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvYWRtaW5QYW5lbC9hZG1pbi5odG1sXCIsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pLnN0YXRlKCdlZGl0T3BlcmF0b3InLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvYWRtaW4vZWRpdC86b3BlcmF0b3JJZFwiLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogWyckaHR0cCcsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRodHRwLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYWRtaW4vJyArICRzdGF0ZVBhcmFtcy5vcGVyYXRvcklkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiZWRpdE9wZXJhdG9yQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9hZG1pblBhbmVsL2VkaXQuaHRtbFwiLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KS5zdGF0ZSgnY29udGFjdHMtbGlzdCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jb250YWN0cy1saXN0XCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiY29udGFjdHNMaXN0Q29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9hZG1pblBhbmVsL2NvbnRhY3QtbGlzdC5odG1sXCIsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLyo9PT09PT09PT09ICBFTkQgQURNSU4gUEFORUwgID09PT09PT09PT0qL1xyXG4gICAgICAgIC8qPT09PT09PT09PSAgVVNFUiBBVVRIIEFORCBTSUdOIFVQICA9PT09PT09PT09Ki9cclxuICAgICAgICAuc3RhdGUoJ3NpZ24tdXAnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvc2lnbi11cFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcInNpZ25VcENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvdXNlci9zaWduVXAuaHRtbFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvKj09PT09PT09PT0gIE1ZIEFDT1VOVCAgPT09PT09PT09PSovXHJcbiAgICAgICAgLnN0YXRlKCdhY2NvdW50Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL215LWFjY291bnRcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJteUFjY291bnRDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIHByb21vczogWyckaHR0cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgncHJvbW9Mb2MnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2M6ICdwYXltZW50TWV0aG9kcydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9teUFjY291bnQvbXlBY2NvdW50Lmh0bWxcIixcclxuICAgICAgICAgICAgYXV0aGVudGljYXRlOiB0cnVlXHJcbiAgICAgICAgfSkuc3RhdGUoJ2FjY291bnQucGVyc29uYWxJbmZvJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvcGVyc29uYWwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL215QWNjb3VudC9wZXJzb25hbEluZm8uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwicGVyc29uYWxJbmZvQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KS5zdGF0ZSgnYWNjb3VudC50aWNrZXRzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdGlja2V0cycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbXlBY2NvdW50L215VGlja2V0cy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJteVRpY2tldHNDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pLnN0YXRlKCdhY2NvdW50LnB1cmNoYXNlcycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3B1cmNoYXNlcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbXlBY2NvdW50L215UHVyY2hhc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcIm15UHVyY2hhc2VzQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWNjb3VudC5zaW5nbGUtcHVyY2hhc2UnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9wdXJjaGFzZXMvOmlkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9teUFjY291bnQvc2luZ2xlLXB1cmNoYXNlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcInNpbmdsZVB1cmNoYXNlQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWNjb3VudC5wYXltZW50cycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3BheW1lbnRzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9teUFjY291bnQvbXlQYXltZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcIm15UGF5bWVudENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgYXV0aGVudGljYXRlOiB0cnVlXHJcbiAgICAgICAgfSkuc3RhdGUoJ2FjY291bnQudHJhbnNhY3Rpb25zJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdHJhbnNhY3Rpb25zJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9teUFjY291bnQvbXlUcmFuc2FjdGlvbnMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibXlUcmFuc2FjdGlvbnNDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8qPT09PT09PT09PSAgRU5EIE1ZIEFDQ09VTlQgID09PT09PT09PT0qL1xyXG4gICAgICAgIC8qPT09PT09PT09PSAgQ0FSVCAgPT09PT09PT09PSovXHJcbiAgICAgICAgLnN0YXRlKCdjYXJ0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbXktY2FydCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY2FydC9jYXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbXlDYXJ0Q29udHJvbGxlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY2FydC5hdXRoJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NhcnQvYXV0aC5odG1sJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgbG9jOiBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ3Byb21vTG9jJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYzogJ2NhcnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY2FydEF1dGhDb250cm9sbGVyJ1xyXG4gICAgICAgIH0pLnN0YXRlKCdjYXJ0LnBheW1lbnQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9wYXltZW50JyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BheW1lbnRBbmRJbmZvQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY2FydC9wYXltZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGU6IHRydWUsXHJcbiAgICAgICAgICAgIG5lZWRQYXltZW50OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvKj09PT09PT09PT0gIElORk8gPT09PT09PT09PSovXHJcbiAgICAgICAgLnN0YXRlKCdjb250YWN0LXVzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvY29udGFjdC11cycsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb250YWN0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY29udGFjdC9jb250YWN0Lmh0bWwnXHJcbiAgICAgICAgfSkuc3RhdGUoJ3Rlcm1zJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdGVybXMgYW5kIGNvbmRpdGlvbnMnLFxyXG4gICAgICAgICAgICAvLyByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIC8vICAgICB0ZXJtczogWyckaHR0cCcsXHJcbiAgICAgICAgICAgIC8vICAgICBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2luZm8vdGVybXMnKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIF1cclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3Rlcm1zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvaW5mby90ZXJtcy5odG1sJ1xyXG4gICAgICAgIH0pLnN0YXRlKCdwb2xpY3knLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9wcml2YWN5LXBvbGljeScsXHJcbiAgICAgICAgICAgIC8vIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgLy8gICAgIHBvbGljeTogWyckaHR0cCcsXHJcbiAgICAgICAgICAgIC8vICAgICBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2luZm8vcG9saWN5Jyk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBdXHJcbiAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwb2xpY3lDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9pbmZvL3BvbGljeS5odG1sJ1xyXG4gICAgICAgIH0pLnN0YXRlKCdmYXEnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9mYXEnLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBmYXE6IFsnJGh0dHAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2luZm8vZmFxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZmFxQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvaW5mby9mYXEuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSAvKkBuZ0luamVjdCovIGZ1bmN0aW9uKCRyb290U2NvcGUsIHVzZXJTZXJ2aWNlLCAkc3RhdGUsICRodHRwLCB1c2VyU2VydmljZSwgY2FydFNlcnZpY2UsIGF1dGhTZXJ2aWNlLCBsb3RTZXJ2aWNlLCBwYXltZW50c1NlcnZpY2UpIHtcclxuICAgIGxvdFNlcnZpY2UuZ2V0TG90dGVyaWVzKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLmxvdHRlcmllcyA9IHJlcy5kYXRhLmRhdGEuZGF0YTtcclxuICAgIH0pO1xyXG4gICAgaWYgKG9wZXJhdG9yQ29uZmlnICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICRyb290U2NvcGUub3BlcmF0b3JDb25maWcgPSBvcGVyYXRvckNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBjYXJ0U2VydmljZS5pdGVtcyA9IHdpbmRvdy5pdGVtcyB8fCB7XHJcbiAgICAgICAgc2luZ2xlczogW10sXHJcbiAgICAgICAgZ3JvdXBzOiBbXSxcclxuICAgICAgICBzaW5nbGVHcm91cDogW11cclxuICAgIH07XHJcbiAgICAkcm9vdFNjb3BlLmRlZmF1bHRMYW5nID0gJ2VuJztcclxuXHJcbiAgICBhdXRoU2VydmljZS5nZXRVc2VyKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBpZiAocmVzLmRhdGEgPT0gJycpIHtcclxuICAgICAgICAgICAgdXNlclNlcnZpY2UudXNlciA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlclNlcnZpY2UudXNlciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICBwYXltZW50c1NlcnZpY2UuY2hlY2tJZlVzZXJIYXNQYXltZW50TWV0aG9kKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJTZXJ2aWNlLnVzZXIuaGFzUGF5bWVudCA9IHJlcy5kYXRhLmhhc1BheW1lbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAgICRyb290U2NvcGUudXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcclxuICAgICRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUpIHtcclxuICAgICAgICBpZiAodG9TdGF0ZS5hZG1pbiAmJiAhdXNlclNlcnZpY2UudXNlci5hZG1pbiA9PSAxKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbyhcImhvbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKHRvU3RhdGUuYXV0aGVudGljYXRlICYmICF1c2VyU2VydmljZS51c2VyKSB7XHJcbiAgICAgICAgLy8gICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gICAgICRzdGF0ZS5nbyhcImhvbWVcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmICh1c2VyU2VydmljZS51c2VyKSB7XHJcbiAgICAgICAgICAgIGlmICh0b1N0YXRlLm5lZWRQYXltZW50ICYmIHVzZXJTZXJ2aWNlLnVzZXIuaGFzUGF5bWVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhcImhvbWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9KVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBbJyR0cmFuc2xhdGVQcm92aWRlcicsXHJcbiAgICBmdW5jdGlvbigkdHJhbnNsYXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCdlbicpO1xyXG5cclxuICAgICAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU3RhdGljRmlsZXNMb2FkZXIoe1xyXG4gICAgICAgICAgICBwcmVmaXg6ICdsYW5ndWFnZXMvJyxcclxuICAgICAgICAgICAgc3VmZml4OiAnJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5dOyIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnYWRtaW5TZXJ2aWNlJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgYWRtaW5TZXJ2aWNlKSB7XHJcbiAgICAgICAgYWRtaW5TZXJ2aWNlLmdldE9wZXJhdG9ycygpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5vcGVyYXRvcnMgPSByZXMuZGF0YTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gJHNjb3BlLnByb21vcyA9IFtdO1xyXG4gICAgICAgIC8vICRzY29wZS5wcm9tb3MucHVzaCh7XHJcbiAgICAgICAgLy8gICAgIGltZzogJycsXHJcbiAgICAgICAgLy8gICAgIHVybDogJydcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAkc2NvcGUudXNlcnMgPSBbe1xyXG4gICAgICAgICAgICBmaXJzdG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBsYXN0bmFtZTogJycsXHJcbiAgICAgICAgICAgIGVtYWlsOiAnJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnXHJcbiAgICAgICAgfV07XHJcbiAgICAgICAgLy8gJHNjb3BlLmFkZFByb21vID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICRzY29wZS5wcm9tb3MucHVzaCh7XHJcbiAgICAgICAgLy8gICAgICAgICBpbWc6ICcnLFxyXG4gICAgICAgIC8vICAgICAgICAgdXJsOiAnJ1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgJHNjb3BlLmFkZFVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmlyc3RuYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgIGxhc3RuYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiAnJyxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUucmVtb3ZlVXNlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlcnMucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vICRzY29wZS5kZWxQcm9tbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAkc2NvcGUucHJvbW9zLnBvcCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAkc2NvcGUuc2hvd05ld1BhcnRuZXIgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUudG9nZ2xlTmV3T3BlcmF0b3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dOZXdPcGVyYXRvciA9ICEkc2NvcGUuc2hvd05ld09wZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAkc2NvcGUuYWRkUHJvbW9zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICRzY29wZS5zaG93QWRkUHJvbW9zID0gISRzY29wZS5zaG93QWRkUHJvbW9zO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAkc2NvcGUuYWRkT3BlcmF0b3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWRtaW5TZXJ2aWNlLm5ld09wZXJhdG9yKCRzY29wZS5vcGVyYXRvciwgJHNjb3BlLnVzZXJzKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm9wZXJhdG9yID0ge307XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlcnMgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0bmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdG5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJydcclxuICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUucHJvbW9zID0ge307XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUub3BlcmF0b3JGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm9wZXJhdG9yQWRkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5vcGVyYXRvckZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuZGVsZXRlT3BlcmF0b3IgPSBmdW5jdGlvbihvcGVyYXRvcklkKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmU/JykpIHtcclxuICAgICAgICAgICAgICAgIGFkbWluU2VydmljZS5kZWxPcGVyYXRvcihvcGVyYXRvcklkKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsICdjb250YWN0U2VydmljZScsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsIGNvbnRhY3RTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29udGFjdFNlcnZpY2UuZ2V0Q29udGFjdHMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAkc2NvcGUuY29udGFjdHMgPSByZXMuZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuZGVsQ29udGFjdCA9IGZ1bmN0aW9uKGNvbnRhY3QpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZT8nKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFjdFNlcnZpY2UuZGVsQ29udGFjdChjb250YWN0LmlkKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jb250YWN0cy5zcGxpY2UoJHNjb3BlLmNvbnRhY3RzLmluZGV4T2YoY29udGFjdCksIDEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnb3BlcmF0b3InLCdhZG1pblNlcnZpY2UnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCBvcGVyYXRvcixhZG1pblNlcnZpY2UpIHtcclxuICAgICAgJHNjb3BlLm9wZXJhdG9yID0gb3BlcmF0b3IuZGF0YVswXTtcclxuXHJcbiAgICAgICRzY29wZS51cGRhdGVPcGVyYXRvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgYWRtaW5TZXJ2aWNlLnVwZGF0ZU9wZXJhdG9yKCRzY29wZS5vcGVyYXRvci5pZCwgJHNjb3BlLm9wZXJhdG9yKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICRzY29wZS51cGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ2F1dGhTZXJ2aWNlJywgJ3VzZXJTZXJ2aWNlJywgJ3BheW1lbnRzU2VydmljZScsICckc3RhdGUnLCAnaW5mb1NlcnZpY2UnLCAndXNlclNlcnZpY2UnLCAnbG9jJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgYXV0aFNlcnZpY2UsIHVzZXJTZXJ2aWNlLCBwYXltZW50c1NlcnZpY2UsICRzdGF0ZSwgaW5mb1NlcnZpY2UsIHVzZXJTZXJ2aWNlLCBsb2MpIHtcclxuICAgICAgICAvKj09PT09PT09PT0gIGxvZ2luIHVzZXIgID09PT09PT09PT0qL1xyXG4gICAgICAgICRzY29wZS51c2VyID0ge307XHJcbiAgICAgICAgJHNjb3BlLnByb21vcyA9IGxvYy5kYXRhO1xyXG4gICAgICAgICRzY29wZS5sb2dpblVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW5Vc2VyKCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UudXNlciA9IHt1c2VyTmFtZTogcmVzLmRhdGEuZGF0YS51c2VyTmFtZX07XHJcbiAgICAgICAgICAgICAgICBwYXltZW50c1NlcnZpY2UuY2hlY2tJZlVzZXJIYXNQYXltZW50TWV0aG9kKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyU2VydmljZS51c2VyLmhhc1BheW1lbnQgPSByZXMuZGF0YS5oYXNQYXltZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlclNlcnZpY2UudXNlci5oYXNQYXltZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyU2VydmljZS51c2VyLmNvdW50cnkgPSAnSXNyYWVsJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjYXJ0LnBheW1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudHNTZXJ2aWNlLmdldFBheW1lbnRzKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kcGFyZW50LnBheW1lbnRzID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJHBhcmVudC5wYXltZW50ID0gcmVzLmRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS53cm9uZ0NyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyo9PT09PT09PT09ICBzaWduIHVwICA9PT09PT09PT09Ki9cclxuICAgICAgICBpbmZvU2VydmljZS5nZXRDb3VudHJpZXMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291bnRyaWVzID0gcmVzLmRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLmZvcm0gPSB7fTtcclxuICAgICAgICAkc2NvcGUubmV3VXNlciA9IHt9O1xyXG4gICAgICAgICRzY29wZS5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZm9ybS5zaWduVXBGb3JtLiR2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKCRzY29wZS5uZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6JHNjb3BlLm5ld1VzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUubmV3VXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci51c2VyTmFtZSA9ICRzY29wZS51c2VyLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luVXNlcigkc2NvcGUuY3VycmVudFVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTZXJ2aWNlLnVzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTogcmVzLmRhdGEuZGF0YS51c2VyTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyU2VydmljZS51c2VyLmNvdW50cnkgPSAkc2NvcGUubmV3VXNlci5jb3VudHJ5Lm5pY2VuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NhcnQucGF5bWVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLmNoZWNrRXJyb3JzID0gZnVuY3Rpb24oZmllbGQsIGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnN1Ym1pdHRlZCAmJiBmaWVsZC4kZXJyb3JbZXJyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ2NhcnRTZXJ2aWNlJywgJ2F1dGhTZXJ2aWNlJywgJ3VzZXJTZXJ2aWNlJywgJ3BheW1lbnRzU2VydmljZScsICckcm9vdFNjb3BlJywgJyRtb2RhbCcsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsIGNhcnRTZXJ2aWNlLCBhdXRoU2VydmljZSwgdXNlclNlcnZpY2UsIHBheW1lbnRzU2VydmljZSwgJHJvb3RTY29wZSwgJG1vZGFsKSB7XHJcbiAgICAgICAgJHNjb3BlLmxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onLCAnSycsICdMJywgJ00nLCAnTicsICdPJywgJ1AnLCAnUScsICdSJywgJ1MnLCAnVCcsICdVJywgJ1YnLCAnVycsICdYJywgJ1knLCAnWiddO1xyXG4gICAgICAgICRzY29wZS5jYXJ0ID0gY2FydFNlcnZpY2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5jYXJ0TGVuID0gJHNjb3BlLmNhcnQuZ2V0SXRlbXNJbkNhcnQoKS5sZW5ndGg7XHJcbiAgICAgICAgJHNjb3BlLnNldFBheW1lbnQgPSBmdW5jdGlvbihwYXltZW50KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5wYXltZW50ID0gcGF5bWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGdldFVzZXJQYXltZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwYXltZW50c1NlcnZpY2UuZ2V0UGF5bWVudHMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBheW1lbnRzID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGF5bWVudCA9IHJlcy5kYXRhWzBdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJTZXJ2aWNlLnVzZXIpIHtcclxuICAgICAgICAgICAgcGF5bWVudHNTZXJ2aWNlLmNoZWNrSWZVc2VySGFzUGF5bWVudE1ldGhvZCgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyU2VydmljZS51c2VyLmhhc1BheW1lbnQgPSByZXMuZGF0YS5oYXNQYXltZW50O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2V0VXNlclBheW1lbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS4kb24oJ3VzZXJMb2dnZW5JbicsIGdldFVzZXJQYXltZW50cyk7XHJcbiAgICAgICAgJHNjb3BlLmdldFRvdGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuY2FydC5nZXRJdGVtc0luQ2FydCgpLCBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCArPSBpdGVtLmNvbW1vbi5wcmljZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0b3RhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLmRlbEl0ZW0gPSBmdW5jdGlvbihpdGVtLCB0eXBlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jYXJ0LmRlbEl0ZW0oaXRlbSwgdHlwZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuY2FydExlbi0tO1xyXG4gICAgICAgICAgICAkc2NvcGUuY2FydC5zYXZlSXRlbXNUb1Nlc3Npb24oY2FydFNlcnZpY2UuaXRlbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuc3VibWl0T3JkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jYXJ0TGVuID0gMDtcclxuICAgICAgICAgICAgY2FydFNlcnZpY2UuY2xlYXJJdGVtcygpO1xyXG4gICAgICAgICAgICAkc2NvcGUucGF5bWVudFJlY2l2ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuYWRkUGF5bWVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWRkUGF5bWVudE1vZGFsID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9teUFjY291bnQvcGF5bWVudHMvYWRkLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkZFBheW1lbnRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNQYXltZW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5oYXNQYXltZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnc20nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhZGRQYXltZW50TW9kYWwucmVzdWx0LnRoZW4oZnVuY3Rpb24ocGF5bWVudCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBheW1lbnRzLnB1c2gocGF5bWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAncGF5bWVudHNTZXJ2aWNlJywgJ3VzZXJTZXJ2aWNlJywgJ2F1dGhTZXJ2aWNlJywgJyRyb290U2NvcGUnLCAnY2FydFNlcnZpY2UnLCAnaW5mb1NlcnZpY2UnLFxyXG5mdW5jdGlvbigkc2NvcGUsIHBheW1lbnRzU2VydmljZSwgdXNlclNlcnZpY2UsIGF1dGhTZXJ2aWNlLCAkcm9vdFNjb3BlLCBjYXJ0U2VydmljZSwgaW5mb1NlcnZpY2UpIHtcclxuICAgICRzY29wZS51c2VyID0ge307XHJcbiAgICAkc2NvcGUudXNlci5jb3VudHJ5ID0gdXNlclNlcnZpY2UudXNlci5jb3VudHJ5IHx8ICdJc3JhZWwnO1xyXG4gICAgaW5mb1NlcnZpY2UuZ2V0UG9saWN5KCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAkc2NvcGUucG9saWNpZXMgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgfSk7XHJcbiAgICBpbmZvU2VydmljZS5nZXRUZXJtcygpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgJHNjb3BlLnRlcm1zID0gcmVzLmRhdGEuZGF0YTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBpbmZvU2VydmljZS5nZXRTdGF0ZXMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICRzY29wZS5zdGF0ZXMgPSByZXMuZGF0YTtcclxuICAgIH0pO1xyXG4gICAgJHNjb3BlLmV4cGlyYXRpb24gPSB7XHJcbiAgICAgICAgbW9udGg6IFsnMDEnLCAnMDInLCAnMDMnLCAnMDQnLCAnMDUnLCAnMDYnLCAnMDcnLCAnMDgnLCAnMDknLCAnMTAnLCAnMTEnLCAnMTInXSxcclxuICAgICAgICB5ZWFyOiBfLnJhbmdlKDIwMTQsIDIwMjYpXHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmZvcm0gPSB7fTtcclxuICAgICRzY29wZS5hZGRQYXltZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCRzY29wZS5mb3JtLnBheW1lbnRGb3JtLiR2YWxpZCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlci5jYXJkLmV4cGlyYXRpb24gPSAkc2NvcGUudXNlci5jYXJkLm1vbnRoICsgJy0nICsgJHNjb3BlLnVzZXIuY2FyZC55ZWFyO1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlci5jYXJkLmRlZmF1bHRQID0gdHJ1ZTtcclxuICAgICAgICAgICAgcGF5bWVudHNTZXJ2aWNlLmFkZFBheW1lbnQoJHNjb3BlLnVzZXIuY2FyZCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5wYXltZW50UmVjaXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmNhcnRMZW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgY2FydFNlcnZpY2UuY2xlYXJJdGVtcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuY2hlY2tFcnJvcnMgPSBmdW5jdGlvbihmaWVsZCwgZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuICRzY29wZS5zdWJtaXR0ZWQgJiYgZmllbGQuJGVycm9yW2Vycl07XHJcbiAgICB9XHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnY29udGFjdFNlcnZpY2UnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCBjb250YWN0U2VydmljZSkge1xyXG4gICAgICAgICRzY29wZS5jaGVja0Vycm9ycyA9IGZ1bmN0aW9uKGZpZWxkLCBlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zdWJtaXR0ZWQgJiYgZmllbGQuJGVycm9yW2Vycl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc3VibWl0dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5jb250YWN0Rm9ybS4kdmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RTZXJ2aWNlLnNhdmVDb250YWN0KCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zYXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsICdwcm9tb3MnLCAnJHJvb3RTY29wZScsICdwcm9tb3NCb3gnLCckaW50ZXJ2YWwnLCdsb3R0ZXJpZXMnLCdsb3RTZXJ2aWNlJyxcclxuZnVuY3Rpb24oJHNjb3BlLCBwcm9tb3MsICRyb290U2NvcGUsIHByb21vc0JveCwkaW50ZXJ2YWwsbG90dGVyaWVzLGxvdFNlcnZpY2UpIHtcclxuXHJcbiAgJHNjb3BlLmxvdHRlcmllcyA9IGxvdHRlcmllcy5kYXRhLmRhdGEuZGF0YTtcclxuICAkc2NvcGUubWFpbkxvdCA9IGxvdHRlcmllcy5kYXRhLmRhdGEuZGF0YVswXTtcclxuICAkc2NvcGUucHJvbW9zID0gcHJvbW9zLmRhdGE7XHJcblxyXG4gXHJcblxyXG4gICRzY29wZS5nYWxsZXJ5RGF0YSA9IFtcclxuICAnaHR0cDovL3BsYWNlaG9sZC5pdC80MzB4MjkzJnRleHQ9cHJvbW8tb25lJyxcclxuICAnaHR0cDovL3BsYWNlaG9sZC5pdC80MzB4MjkzJnRleHQ9cHJvbW8tdHdvJyxcclxuICAnaHR0cDovL3BsYWNlaG9sZC5pdC80MzB4MjkzJnRleHQ9cHJvbW8tdGhyZWUnXHJcblxyXG5cclxuICBdO1xyXG4kc2NvcGUubmV4dD0gZnVuY3Rpb24oKSB7XHJcbiAgJCgnI21haW4tcHJvbW9zJykuc2xpY2tOZXh0KCk7XHJcbn1cclxuJHNjb3BlLnByZXY9IGZ1bmN0aW9uKCkge1xyXG4gICQoJyNtYWluLXByb21vcycpLnNsaWNrUHJldigpO1xyXG59XHJcblxyXG4kc2NvcGUucHJldlRlc3RpcyA9IGZ1bmN0aW9uKCkge1xyXG4gICQoJyN0ZXN0aXMtc2xpZGVyJykuc2xpY2tQcmV2KCk7XHJcbn1cclxuJHNjb3BlLm5leHRUZXN0aXMgPSBmdW5jdGlvbigpIHtcclxuICAkKCcjdGVzdGlzLXNsaWRlcicpLnNsaWNrTmV4dCgpO1xyXG59XHJcbiAgJHNjb3BlLnNsaWRlcyA9XHJcbiAgW1xyXG4gICAgICAnaW1hZ2VzL21haW4tc2xpZGVyL3Byb21vLnBuZycsXHJcbiAgICAgICdpbWFnZXMvbWFpbi1zbGlkZXIvcHJvbW8yLnBuZydcclxuICBdXHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG5dOyIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsXHJcbmZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsXHJcbmZ1bmN0aW9uKCRzY29wZSkge1xyXG4gIC8vICRzY29wZS5ub3RTdWIgPSBmdW5jdGlvbihwKSB7XHJcbiAgLy8gICByZXR1cm4gL1dlbGNvbWUgQm9udXMvLnRlc3QocCkgPT0gZmFsc2U7XHJcblxyXG4gIC8vIH1cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsJyRtb2RhbEluc3RhbmNlJywgJ3BheW1lbnRzU2VydmljZScsICckdGltZW91dCcsJ3VzZXJTZXJ2aWNlJyxcclxuZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgcGF5bWVudHNTZXJ2aWNlLCAkdGltZW91dCx1c2VyU2VydmljZSkge1xyXG4gICAgJHNjb3BlLmV4cGlyYXRpb24gPSB7XHJcbiAgICAgICAgbW9udGg6IFsnMDEnLCAnMDInLCAnMDMnLCAnMDQnLCAnMDUnLCAnMDYnLCAnMDcnLCAnMDgnLCAnMDknLCAnMTAnLCAnMTEnLCAnMTInXSxcclxuICAgICAgICB5ZWFyOiBfLnJhbmdlKDIwMTQsIDIwMjYpXHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5jaGVja0Vycm9ycyA9IGZ1bmN0aW9uKGZpZWxkLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gJHNjb3BlLnN1Ym1pdHRlZCAmJiBmaWVsZC4kZXJyb3JbZXJyXTtcclxuICAgIH1cclxuICAgICRzY29wZS5mb3JtID0ge307XHJcbiAgICAkc2NvcGUudXNlciA9IHtcclxuICAgICAgICBjYXJkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRQOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAkc2NvcGUuYWRkUGF5bWVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICgkc2NvcGUuZm9ybS5hZGRQYXltZW50Rm9ybS4kdmFsaWQpIHtcclxuICAgICAgICAgICAgaWYgKCF1c2VyU2VydmljZS51c2VyLmhhc1BheW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyLmNhcmQuZGVmYXVsdFAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLmNhcmQuZXhwaXJhdGlvbiA9ICRzY29wZS51c2VyLmNhcmQubW9udGggKyAnLScgKyAkc2NvcGUudXNlci5jYXJkLnllYXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS51c2VyLmNhcmQpO1xyXG4gICAgICAgICAgICBwYXltZW50c1NlcnZpY2UuYWRkUGF5bWVudCgkc2NvcGUudXNlci5jYXJkKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnNhdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlclNlcnZpY2UudXNlci5oYXNQYXltZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2F2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZShyZXMuZGF0YS5wYXltZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNhcmQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNhdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAncGF5bWVudHNTZXJ2aWNlJywgJ3BheW1lbnQnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCRtb2RhbEluc3RhbmNlLCBwYXltZW50c1NlcnZpY2UsIHBheW1lbnQpIHtcclxuXHJcbiAgICAgICAgJHNjb3BlLnBheW1lbnQgPSBwYXltZW50O1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmRlbGV0ZVBheW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGF5bWVudHNTZXJ2aWNlLmRlbGV0ZVBheW1lbnQoJHNjb3BlLnBheW1lbnQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZGVsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UocmVzLmRhdGEuZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywgJyRtb2RhbCcsICckc3RhdGUnLCAnaGFzUGF5bWVudCcsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCAkbW9kYWwsICRzdGF0ZSwgaGFzUGF5bWVudCkge1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuaGFzUGF5bWVudCA9IGhhc1BheW1lbnQ7XHJcbiAgICAgICAgJHNjb3BlLmFkZFBheW1lbnRNZXRob2QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgICAgICRtb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbXlBY2NvdW50L3BheW1lbnRzL2FkZC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZGRQYXltZW50Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnc20nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnYWNjb3VudFNlcnZpY2UnLCAncGF5bWVudHNTZXJ2aWNlJywgJ3VzZXJTZXJ2aWNlJywgJyRtb2RhbCcsICdwcm9tb3MnLFxyXG5mdW5jdGlvbigkc2NvcGUsIGFjY291bnRTZXJ2aWNlLCBwYXltZW50c1NlcnZpY2UsIHVzZXJTZXJ2aWNlLCAkbW9kYWwsIHByb21vcykge1xyXG4gICAgJHNjb3BlLnByb21vcyA9IHByb21vcy5kYXRhO1xyXG4gICAgYWNjb3VudFNlcnZpY2UuZ2V0VXNlckluZm8oKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICRzY29wZS5iYWxhbmNlID0gcmVzLmRhdGEuZGF0YVswXS5iYWxhbmNlO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICRzY29wZS5vcGVuRGVwb3NpdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGVwb3NpdE1vZGFsID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL215QWNjb3VudC9wYXltZW50cy9kZXBvc2l0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZGVwb3NpdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBoYXNQYXltZW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclNlcnZpY2UudXNlci5oYXNQYXltZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaXplOiAnc20nLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ3BheW1lbnRzU2VydmljZScsICckdGltZW91dCcsICckbW9kYWwnLFxyXG5mdW5jdGlvbigkc2NvcGUsIHBheW1lbnRzU2VydmljZSwgJHRpbWVvdXQsICRtb2RhbCkge1xyXG5cclxuICAgIHBheW1lbnRzU2VydmljZS5nZXRQYXltZW50cygpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgJHNjb3BlLnBheW1lbnRzID0gcmVzLmRhdGE7XHJcbiAgICB9KTtcclxuICAgICAgICAvLyAkc2NvcGUucGFnaW5hdGlvbkNvbmZpZyA9IHtcclxuICAgICAgICAvLyAgICAgY3VycmVudFBhZ2U6IHBheW1lbnRzLmN1cnJlbnRfcGFnZSxcclxuICAgICAgICAvLyAgICAgbGFzdFBhZ2U6IHBheW1lbnRzLmxhc3RfcGFnZVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAkc2NvcGUuJG9uKCdwYWdlQ2hhbmdlJywgZnVuY3Rpb24oZSwgZGF0YSkge1xyXG4gICAgICAgIC8vICAgICB2YXIgbWV0aG9kID0gZGF0YS5tZXRob2QgfHwgJyc7XHJcbiAgICAgICAgLy8gICAgIHBheW1lbnRzU2VydmljZS5nZXRQYXltZW50cyhkYXRhLnBhZ2UsIG1ldGhvZCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAvLyAgICAgICAgICRzY29wZS5wYXltZW50cyA9IHJlcy5kYXRhO1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY3VycmVudFBhZ2U6IHJlcy5jdXJyZW50X3BhZ2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGFzdFBhZ2U6IHJlcy5sYXN0X3BhZ2VcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGlmIChtZXRob2QgIT09ICcnKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YS5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9KTtcclxuJHNjb3BlLmNhcmQgPSB7fTtcclxucGF5bWVudHNTZXJ2aWNlLmNoZWNrSWZVc2VySGFzUGF5bWVudE1ldGhvZCgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAkc2NvcGUuaGFzUGF5bWVudCA9IHJlcy5kYXRhLmhhc1BheW1lbnQ7XHJcbn0pO1xyXG4kc2NvcGUuYWRkUGF5bWVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFkZFBheW1lbnRNb2RhbCA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL215QWNjb3VudC9wYXltZW50cy9hZGQuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ2FkZFBheW1lbnRDb250cm9sbGVyJyxcclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIGhhc1BheW1lbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5oYXNQYXltZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaXplOiAnc20nXHJcbiAgICB9KTtcclxuICAgIGFkZFBheW1lbnRNb2RhbC5yZXN1bHQudGhlbihmdW5jdGlvbihwYXltZW50KSB7XHJcbiAgICAgICAgaWYgKHBheW1lbnQuaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIF8oJHNjb3BlLnBheW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKHBheW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHBheW1lbnQuaXNEZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUucGF5bWVudHMucHVzaChwYXltZW50KTtcclxuICAgIH0pO1xyXG59XHJcbiRzY29wZS5kZWwgPSBmdW5jdGlvbihwYXltZW50KSB7XHJcbiAgICAkc2NvcGUucGF5bWVudCA9IHBheW1lbnQ7XHJcbiAgICB2YXIgZGVsZXRlTW9kYWwgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9teUFjY291bnQvcGF5bWVudHMvZGVsZXRlLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdkZWxldGVQYXltZW50Q29udHJvbGxlcicsXHJcbiAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICBwYXltZW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUucGF5bWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2l6ZTogJ3NtJ1xyXG4gICAgfSk7XHJcbiAgICBkZWxldGVNb2RhbC5yZXN1bHQudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnBheW1lbnRzLnNwbGljZSgkc2NvcGUucGF5bWVudHMuaW5kZXhPZihwYXltZW50KSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuJHNjb3BlLnBheW1lbnRDb3B5ID0ge307XHJcbiRzY29wZS51cGRhdGVQYXltZW50ID0gZnVuY3Rpb24ocGF5bWVudCkge1xyXG4gICAgJHNjb3BlLnBheW1lbnRDb3B5ID0gYW5ndWxhci5jb3B5KHBheW1lbnQpO1xyXG4gICAgJHNjb3BlLnBheW1lbnQgPSBwYXltZW50O1xyXG4gICAgJHNjb3BlLnBheW1lbnRDb3B5Lm1vbnRoID0gJHNjb3BlLnBheW1lbnRDb3B5LmV4cGlyYXRpb24uc3Vic3RyKDAsIDIpO1xyXG4gICAgJHNjb3BlLnBheW1lbnRDb3B5LnllYXIgPSBOdW1iZXIoJHNjb3BlLnBheW1lbnRDb3B5LmV4cGlyYXRpb24uc3Vic3RyKDMpKTtcclxuICAgIHZhciB1cGRhdGVNb2RhbCA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL215QWNjb3VudC9wYXltZW50cy91cGRhdGUuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ3VwZGF0ZVBheW1lbnRDb250cm9sbGVyJyxcclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIHBheW1lbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5wYXltZW50Q29weTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGF5bWVudHNMZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5wYXltZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpemU6ICdzbSdcclxuICAgIH0pO1xyXG4gICAgdXBkYXRlTW9kYWwucmVzdWx0LnRoZW4oZnVuY3Rpb24oc2VsZWN0ZWRQYXltZW50KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnBheW1lbnRzLmluZGV4T2YoJHNjb3BlLnBheW1lbnQpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZFBheW1lbnQuaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIF8oJHNjb3BlLnBheW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKHBheW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHBheW1lbnQuaXNEZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5wYXltZW50c1tpbmRleF0gPSBzZWxlY3RlZFBheW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbiRzY29wZS5tZXRob2RGaWx0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgIG1ldGhvZDogJHNjb3BlLnBheW1lbnQubWV0aG9kXHJcbiAgICB9XHJcbiAgICAkc2NvcGUuJGVtaXQoJ3BhZ2VDaGFuZ2UnLCBkYXRhKTtcclxufVxyXG59XHJcbl07IiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsJ2FjY291bnRTZXJ2aWNlJyxcclxuZnVuY3Rpb24oJHNjb3BlLCBhY2NvdW50U2VydmljZSkge1xyXG4gICAgYWNjb3VudFNlcnZpY2UuZ2V0UHVyY2hhc2VzKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAkc2NvcGUucHVyY2hhc2VzID0gcmVzLmRhdGEuZGF0YS5kYXRhO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJHNjb3BlLmxldHRlcnMgPSBbJ0EnLCdCJywnQycsJ0QnLCdFJywnRicsJ0cnLCdIJywnSScsJ0onLCdLJywnTCcsJ00nLCdOJywnTycsJ1AnLCdRJywnUicsJ1MnLCdUJywnVScsJ1YnLCdXJywnWCcsJ1knLCdaJ107XHJcblxyXG4gICAgJHNjb3BlLnJldmVyc2UgPSAnJztcclxuICAgICRzY29wZS5wcmVkaWNhdGUgPSAnJztcclxuXHJcbiAgICAkc2NvcGUuc29ydCA9IGZ1bmN0aW9uKGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGlmICgkc2NvcGUucHJlZGljYXRlID09PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnJldmVyc2UgPSAhJHNjb3BlLnJldmVyc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNjb3BlLnByZWRpY2F0ZSA9IGZpZWxkTmFtZTtcclxuICAgICAgICAgICAgJHNjb3BlLnJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywnYWNjb3VudFNlcnZpY2UnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLGFjY291bnRTZXJ2aWNlKSB7XHJcbiAgICAgICAgYWNjb3VudFNlcnZpY2UuZ2V0VGlja2V0cygpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgJHNjb3BlLnRpY2tldHMgPSByZXMuZGF0YS5kYXRhLmRhdGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnJldmVyc2UgPSAnJztcclxuICAgICAgICAkc2NvcGUucHJlZGljYXRlID0gJyc7XHJcblxyXG4gICAgICAgICRzY29wZS5zb3J0ID0gZnVuY3Rpb24oZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUucHJlZGljYXRlID09PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5yZXZlcnNlID0gISRzY29wZS5yZXZlcnNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByZWRpY2F0ZSA9IGZpZWxkTmFtZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5yZXZlcnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ2FjY291bnRTZXJ2aWNlJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgYWNjb3VudFNlcnZpY2UpIHtcclxuICAgICAgICBhY2NvdW50U2VydmljZS5nZXRUcmFuc2FjdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAkc2NvcGUudHJhbnNhY3Rpb25zID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUucmV2ZXJzZSA9ICcnO1xyXG4gICAgICAgICRzY29wZS5wcmVkaWNhdGUgPSAnJztcclxuXHJcbiAgICAgICAgJHNjb3BlLnNvcnQgPSBmdW5jdGlvbihmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5wcmVkaWNhdGUgPT09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJldmVyc2UgPSAhJHNjb3BlLnJldmVyc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJlZGljYXRlID0gZmllbGROYW1lO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdOb3QgaW1wbGVtZW50ZWQgeWV0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub3BlblJvd0lmID0gZnVuY3Rpb24odHJhbnNhY3Rpb24pIHtcclxuICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb24udHlwZSA9PSAnV2luJyB8fCB0cmFuc2FjdGlvbi50eXBlID09ICdQdXJjaGFzZScgfHwgdHJhbnNhY3Rpb24udHlwZSA9PSAnRGVwb3NpdCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAncGF5bWVudHNTZXJ2aWNlJywgJ3VzZXJTZXJ2aWNlJywgJyRtb2RhbCcsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsIHBheW1lbnRzU2VydmljZSwgdXNlclNlcnZpY2UsICRtb2RhbCkge1xyXG4gICAgICAgIC8vICRzY29wZS5iaXJ0aGRheSA9IHtcclxuICAgICAgICAvLyAgICAgZGF5OiBfLnJhbmdlKDEsIDMyKSxcclxuICAgICAgICAvLyAgICAgbW9udGg6IF8ucmFuZ2UoMSwgMTMpLFxyXG4gICAgICAgIC8vICAgICB5ZWFyOiBfLnJhbmdlKDE5MDAsIDIwMTUpXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkNoYW5nZVBhc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNoYW5nZVBhc3MgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuY2xvc2VDaGFuZ2VQYXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jaGFuZ2VQYXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkID0gJyc7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLm9sZFBhc3N3b3JkID0gJyc7XHJcbiAgICAgICAgICAgICRzY29wZS5jb25maXJtUGFzc3dvcmQgPSAnJztcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJJbmZvRm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBheW1lbnRzU2VydmljZS5jaGVja0lmVXNlckhhc1BheW1lbnRNZXRob2QoKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJTZXJ2aWNlLnNldEhhc1BheW1lbnRNZXRob2QocmVzLmRhdGEuaGFzUGF5bWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnVzZXIgPSB7XHJcbiAgICAgICAgICAgIGZpcnN0bmFtZTogJ1lhcm9uJyxcclxuICAgICAgICAgICAgbGFzdG5hbWU6ICdCaXRvbicsXHJcbiAgICAgICAgICAgIGVtYWlsOiAnbWlzdGVyQml0QGdtYWlsLmNvbScsXHJcbiAgICAgICAgICAgIHBob25lT25lOiB7XHJcbiAgICAgICAgICAgICAgICBhcmVhOjIyMixcclxuICAgICAgICAgICAgICAgIG51bTo1NDcyNTM2MzZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHBheW1lbnRzU2VydmljZS5jaGVja0lmVXNlckhhc1BheW1lbnRNZXRob2QoKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kZXBvc2l0VmlldyA9IChyZXMuZGF0YS5oYXNQYXltZW50KSA/ICdoYXNQYXltZW50Lmh0bWwnIDogJ25vUGF5bWVudHMuaHRtbCc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5EZXBvc2l0ZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlcG9zaXRNb2RhbCA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbXlBY2NvdW50L3BheW1lbnRzLycgKyAkc2NvcGUuZGVwb3NpdFZpZXcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZGVwb3NpdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ3NtJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IC8qQG5nSW5qZWN0Ki8gZnVuY3Rpb24oJHNjb3BlLCBhY2NvdW50U2VydmljZSkge1xyXG4gICAgJHNjb3BlLnB1cmNoYXNlID0ge307XHJcbiAgICBhY2NvdW50U2VydmljZS5nZXRTaW5nbGVQdXJjaGFzZSgxKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG5cclxuICAgICAgICAkc2NvcGUucHVyY2hhc2UgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICRzY29wZS5wdXJjaGFzZS5vcGVuID0gdHJ1ZTtcclxuICAgIH0pO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICAgICAkc2NvcGUudG9nZ2xlU2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZCA9ICEkc2NvcGUuc2VsZWN0ZWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ3BheW1lbnQnLCAnJG1vZGFsSW5zdGFuY2UnLCAncGF5bWVudHNTZXJ2aWNlJywgJyR0aW1lb3V0JywgJ3BheW1lbnRzTGVuJyxcclxuZnVuY3Rpb24oJHNjb3BlLCBwYXltZW50LCAkbW9kYWxJbnN0YW5jZSwgcGF5bWVudHNTZXJ2aWNlLCAkdGltZW91dCwgcGF5bWVudHNMZW4pIHtcclxuXHJcbiAgICAkc2NvcGUuZXhwaXJhdGlvbiA9IHtcclxuICAgICAgICBtb250aDogWycwMScsICcwMicsICcwMycsICcwNCcsICcwNScsICcwNicsICcwNycsICcwOCcsICcwOScsICcxMCcsICcxMScsICcxMiddLFxyXG4gICAgICAgIHllYXI6IF8ucmFuZ2UoMjAxNCwgMjAyNilcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuY2hlY2tFcnJvcnMgPSBmdW5jdGlvbihmaWVsZCwgZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuICRzY29wZS5zdWJtaXR0ZWQgJiYgZmllbGQuJGVycm9yW2Vycl07XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLnBheW1lbnRDb3B5ID0gcGF5bWVudDtcclxuICAgIC8vICRzY29wZS5wYXltZW50Q29weS5udW1iZXIgPSAneHh4eHh4eHh4eHh4eDI0NzgnO1xyXG4gICAgJHNjb3BlLmZvcm0gPSB7fTtcclxuICAgICRzY29wZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAocGF5bWVudHNMZW4gPT0gMSkge1xyXG4gICAgICAgICAgICAkc2NvcGUucGF5bWVudENvcHkuZGVmYXVsdFAgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuc3VibWl0dGVkID0gdHJ1ZTtcclxuICAgICAgICBpZigkc2NvcGUuZm9ybS51cGRhdGVDYXJkLiR2YWxpZCkge1xyXG4gICAgICAgICAgICAkc2NvcGUucGF5bWVudENvcHkuZXhwaXJhdGlvbiA9ICRzY29wZS5wYXltZW50Q29weS5tb250aCArICctJyArICRzY29wZS5wYXltZW50Q29weS55ZWFyO1xyXG4gICAgICAgICAgICBwYXltZW50c1NlcnZpY2VcclxuICAgICAgICAgICAgLnVwZGF0ZVBheW1lbnQoJHNjb3BlLnBheW1lbnRDb3B5LmlkLCAkc2NvcGUucGF5bWVudENvcHkpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVNZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVNZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZShyZXMuZGF0YS5wYXltZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsICdhdXRoU2VydmljZScsICckc3RhdGUnLCAnJHRyYW5zbGF0ZScsICdhZG1pblNlcnZpY2UnLCAnbG90U2VydmljZScsICckcm9vdFNjb3BlJywgJ3VzZXJTZXJ2aWNlJywgJyRtb2RhbCcsICdjYXJ0U2VydmljZScsICdFTlYnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCBhdXRoU2VydmljZSwgJHN0YXRlLCAkdHJhbnNsYXRlLCBhZG1pblNlcnZpY2UsIGxvdFNlcnZpY2UsICRyb290U2NvcGUsIHVzZXJTZXJ2aWNlLCAkbW9kYWwsIGNhcnRTZXJ2aWNlLCBFTlYpIHtcclxuICAgICAgICBsb3RTZXJ2aWNlLmdldExvdHRlcmllcygpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5sb3R0ZXJpZXMgPSByZXMuZGF0YS5kYXRhLmRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLmRhdGUgPSBuZXcgRGF0ZTtcclxuICAgICAgICAkc2NvcGUuY3VycmVudExhbmcgPSAnZW4nO1xyXG4gICAgICAgICRzY29wZS5jaGFuZ2VMYW5ndWFnZSA9IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmRlZmF1bHRMYW5nID0ga2V5O1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudExhbmcgPSBrZXk7XHJcbiAgICAgICAgICAgICR0cmFuc2xhdGUudXNlKGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBhZG1pblNlcnZpY2UuZ2V0T3BlcmF0b3JzKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAvLyAgICAgJHNjb3BlLm9wZXJhdG9ycyA9IHJlcy5kYXRhO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgICRzY29wZS5vcGVuTG9naW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGxvZ2luTW9kYWwgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXIvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYXV0aENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ3NtJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLm9wZW5TaWdudXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ251cE1vZGFsID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2VyL3NpZ25VcC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWduVXBNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ3NtJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogbG9nIG91dCAqL1xyXG4gICAgICAgICRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYW5Vc2VyKCkge1xyXG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UudXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjYXJ0U2VydmljZS5jbGVhckl0ZW1zKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmNhcnRMZW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEVOVi5hcGkgPT0gJ2RldicpIHtcclxuICAgICAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ091dCgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5Vc2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYW5Vc2VyKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiRzY29wZS5sYW5nID0gJHNjb3BlLmNvbmZpZy5sYW5nc1swXTtcclxuXHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgICAgICAvLyAkc2NvcGUuc2F2ZU9wZXJhdG9yTGFuZ3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJHNjb3BlLmxhbmcpO1xyXG4gICAgICAgIC8vICAgICAkc2NvcGUuY29uZmlnLmxhbmdzID0gJHNjb3BlLnNlbGVjdGVkX2l0ZW1zO1xyXG4gICAgICAgIC8vICAgICAkc2NvcGUub3BlcmF0b3IubGFuZ3MgPSAkc2NvcGUuc2VsZWN0ZWRfaXRlbXM7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5hZGROZXdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb25maWcubGF0ZXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogJycsXHJcbiAgICAgICAgICAgICAgICB0eHQ6IHt9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUubGFuZyA9ICRzY29wZS5jb25maWcubGFuZ3NbMF07XHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ29wZXJhdG9yU2VydmljZScsICckcm9vdFNjb3BlJywgJ2xvdFNlcnZpY2UnLFxyXG5mdW5jdGlvbigkc2NvcGUsIG9wZXJhdG9yU2VydmljZSwgJHJvb3RTY29wZSwgbG90U2VydmljZSkge1xyXG5cclxuICAgIHZhciBvcGVyYXRvckNvbmZpZyA9IHtcclxuICAgICAgICBsYW5nczogW10sXHJcbiAgICAgICAgdG90YWxQYWlkOiB7XHJcbiAgICAgICAgICAgIGFtb3VudDogJycsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5OiAnJyxcclxuICAgICAgICAgICAgdHh0OiB7fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVzdGlzOiBbe1xyXG4gICAgICAgICAgICBpbWdVcmw6ICcnLFxyXG4gICAgICAgICAgICB0eHQ6IHt9XHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgd2h5OiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjoge30sXHJcbiAgICAgICAgICAgIHR4dDoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhdGVzdDogW3tcclxuICAgICAgICAgICAgZGF0ZTogJycsXHJcbiAgICAgICAgICAgIHR4dDoge31cclxuICAgICAgICB9XSxcclxuICAgICAgICBwcm9kdWN0czogW11cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9ICRyb290U2NvcGUub3BlcmF0b3JDb25maWcgfHwgb3BlcmF0b3JDb25maWc7XHJcblxyXG4gICAgbG90U2VydmljZS5nZXRMb3R0ZXJpZXMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICRzY29wZS5sb3R0ZXJpZXMgPSByZXMuZGF0YS5kYXRhLmRhdGE7XHJcbiAgXHJcbiAgICAgICAgJHNjb3BlLmxvdHRlcnkgPSAkc2NvcGUubG90dGVyaWVzWzBdO1xyXG5cclxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmxvdHRlcmllcywgZnVuY3Rpb24obG90LCB2YWwpIHtcclxuICAgICAgICAgIGxvdC5sb3R0ZXJ5LnNsb2dhbiA9IHt0eHQ6IHt9fVxyXG4gICAgICAgICAgIGxvdC5sb3R0ZXJ5LnNob3J0RGVzYyA9IHt0eHQ6IHt9fVxyXG4gICAgICAgICAgIGxvdC5sb3R0ZXJ5LmZ1bGxEZXNjID0ge3R4dDoge319XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5sb3R0ZXJpZXMsIGZ1bmN0aW9uKGxvdCwgdmFsKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGxvdC5sb3R0ZXJ5LCAkc2NvcGUuY29uZmlnLnByb2R1Y3RzW3ZhbF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgJHNjb3BlLmxhbmcgPSAkc2NvcGUuY29uZmlnLmxhbmdzWzBdO1xyXG4gICAgJHNjb3BlLmxhbmdzID0gW3tcclxuICAgICAgICBcImlkXCI6ICdlbicsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiRW5nbGlzaFwiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJpZFwiOiAnaGUnLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIkhlYnJld1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJpZFwiOiAnZnJhJyxcclxuICAgICAgICBcIm5hbWVcIjogXCJGcmFuY2VcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImlkXCI6ICdnYScsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiR2VybWFuXCJcclxuICAgIH1dO1xyXG4gICAgJHNjb3BlLnNhdmVTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUubG90dGVyaWVzLCBmdW5jdGlvbihsb3QpIHtcclxuICAgICAgICAgICAgb3BlcmF0b3JDb25maWcucHJvZHVjdHMucHVzaChsb3QubG90dGVyeSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLmNvbmZpZy5wcm9kdWN0cyA9IG9wZXJhdG9yQ29uZmlnLnByb2R1Y3RzO1xyXG4gICAgICAgIG9wZXJhdG9yU2VydmljZS5zYXZlU2V0dGluZ3MoJHNjb3BlLmNvbmZpZykudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNhdmVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJyxcclxuZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG59XHJcbl07IiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICAgICAgICRzY29wZS5hZGRUZXN0aXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhZCcpO1xyXG4gICAgICAgICAgICAkc2NvcGUuY29uZmlnLnRlc3Rpcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGltZ1VybDogJycsXHJcbiAgICAgICAgICAgICAgICB0eHQ6IHt9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5sYW5nID0gJHNjb3BlLmNvbmZpZy5sYW5nc1swXTtcclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCdsb3RTZXJ2aWNlJywnY2FydFNlcnZpY2UnLCckc3RhdGUnLFxyXG5mdW5jdGlvbigkc2NvcGUsbG90U2VydmljZSxjYXJ0U2VydmljZSwgJHN0YXRlKSB7XHJcbiAgJHNjb3BlLm9wZW4gPSB7XHJcbiAgICBvbmU6dHJ1ZVxyXG4gIH07XHJcbiAgJHNjb3BlLmZpcnN0T3BlbiA9IHRydWU7XHJcbiAgJHNjb3BlLnRvZ2dsZUFjYyA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLm9wZW4sIGZ1bmN0aW9uKGluZCwgdmFsKSB7XHJcbiAgICAgICRzY29wZS5vcGVuW3ZhbF0gPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJHNjb3BlLm9wZW5baW5kZXhdID0gdHJ1ZTtcclxuICB9XHJcbiAgbG90U2VydmljZS5nZXRHcm91cFBsYXkoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKHJlcy5kYXRhLmRhdGEsIGZ1bmN0aW9uKHBhY2ssIGluZGV4KSB7XHJcbiAgICAgIHBhY2subnVtU2hhcmVzID0gMTtcclxuICAgICAgcGFjay5tb250aCA9IDE7XHJcbiAgICB9KTtcclxuICAgICRzY29wZS5wYWNrcyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS51c2VyQ2xpY2tlZFBsYXkgPSBmYWxzZTtcclxuXHJcbiAgJHNjb3BlLmNsb3NlT3RoZXJzID0gZnVuY3Rpb24ocGFjaykge1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5wYWNrcywgZnVuY3Rpb24ocGFjaykge1xyXG4gICAgICBwYWNrLmFkZFRvQ2FydCA9IGZhbHNlO1xyXG4gICAgICBwYWNrLmxlYXZlID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhY2suYWRkVG9DYXJ0ID0gIXBhY2suYWRkVG9DYXJ0O1xyXG4gICAgcGFjay5sZWF2ZSA9IGZhbHNlO1xyXG5cclxuICB9XHJcbiAgJHNjb3BlLnRvZ2dsZUNhcnQgPSBmdW5jdGlvbihwYWNrKSB7XHJcbiAgICBwYWNrLmFkZFRvQ2FydCA9ICFwYWNrLmFkZFRvQ2FydDtcclxuICB9XHJcblxyXG4gICRzY29wZS5tb250aCA9IDE7XHJcblxyXG4gICRzY29wZS50b2dnbGVOdW1TaGFyZXMgPSBmdW5jdGlvbih3YXksIHBhY2spIHtcclxuICAgIGlmKHdheSA9PSAxKSAgcGFjay5udW1TaGFyZXMrKztcclxuICAgIGlmKHdheSA9PSAtMSkge1xyXG4gICAgICBpZihwYWNrLm51bVNoYXJlcyAhPT0gMSlcclxuICAgICAge1xyXG4gICAgICAgcGFjay5udW1TaGFyZXMtLVxyXG4gICAgIH1cclxuICAgfVxyXG4gfVxyXG5cclxuICRzY29wZS5jaGFuZ2VNb250aCA9IGZ1bmN0aW9uKG1vbnRoICxwYWNrKSB7XHJcbiAgcGFjay5tb250aCA9IG1vbnRoO1xyXG59XHJcblxyXG4kc2NvcGUuY2FsY1ByaWNlID0gZnVuY3Rpb24ocGFjaykge1xyXG4gIHJldHVybiBwYWNrLnByaWNlICogcGFjay5tb250aCAqIHBhY2subnVtU2hhcmVzO1xyXG59XHJcblxyXG4kc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24ocGFjaykge1xyXG4gIHBhY2sucHJpY2U9ICRzY29wZS5jYWxjUHJpY2UocGFjayk7XHJcbiAgcGFjay50eXBlID0gJ2dyb3Vwcyc7XHJcbiAgY2FydFNlcnZpY2UuYWRkVG9DYXJ0KCAnZ3JvdXBzJyxwYWNrKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgJHN0YXRlLmdvKCdjYXJ0LmF1dGgnKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG59XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywnbG90U2VydmljZScsJyRmaWx0ZXInLFxyXG5mdW5jdGlvbigkc2NvcGUsbG90U2VydmljZSwkZmlsdGVyKSB7XHJcblxyXG4gICAgbG90U2VydmljZS5nZXRMYXRlc3RSZXN1bHRzKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAkc2NvcGUubG90dGVyaWVzID0gcmVzLmRhdGEuZGF0YTtcclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS5yZXZlcnNlID0gJyc7XHJcbiAgICAkc2NvcGUucHJlZGljYXRlID0gJyc7XHJcblxyXG4gICAgJHNjb3BlLnNvcnQgPSBmdW5jdGlvbihmaWVsZE5hbWUpIHtcclxuICAgICAgICBpZiAoJHNjb3BlLnByZWRpY2F0ZSA9PT0gZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5yZXZlcnNlID0gISRzY29wZS5yZXZlcnNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzY29wZS5wcmVkaWNhdGUgPSBmaWVsZE5hbWU7XHJcbiAgICAgICAgICAgICRzY29wZS5yZXZlcnNlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnbG90U2VydmljZScsICdsb3QnLCckcm9vdFNjb3BlJywnJHN0YXRlUGFyYW1zJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgbG90U2VydmljZSwgbG90LCRyb290U2NvcGUsJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgJHNjb3BlLmxvdCA9IGxvdC5kYXRhLmRhdGEubG90dGVyeTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRMb3QgPSBfLmZpbmQoJHJvb3RTY29wZS5vcGVyYXRvckNvbmZpZy5wcm9kdWN0cywgZnVuY3Rpb24obG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvdC5pZCA9PSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICRzY29wZS5sb3QuZGF0ZSA9ICRzY29wZS5sb3QuZGF0ZXNbMF07XHJcbiAgICAgICAgbG90U2VydmljZS5nZXRMYXRlc3RSZXN1bHRzRGV0YWlsc0J5RGF0ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ieURhdGVEZXRhaWxzID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuY2hhbmdlTnVtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmxvdC5kYXRlID09ICcyMDE0LTA2LTI3VDAyOjIxOjA3LjU2NycpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ieURhdGVEZXRhaWxzLmRyYXcud2lubmluZ051bWJlcnMubnVtYmVyUmVzdWx0cyA9IFsxLDIsMjMsMyw0LDVdO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmJ5RGF0ZURldGFpbHMuZHJhdy53aW5uaW5nTnVtYmVycy5zZWNvbmRhcnlOdW1iZXJSZXN1bHRzID0gWzM0XVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICRzY29wZS5ieURhdGVEZXRhaWxzLmRyYXcud2lubmluZ051bWJlcnMubnVtYmVyUmVzdWx0cyA9IFs0NCw1LDE3LDI0LDI4LDldO1xyXG4gICAgICAgICAgICAgICRzY29wZS5ieURhdGVEZXRhaWxzLmRyYXcud2lubmluZ051bWJlcnMuc2Vjb25kYXJ5TnVtYmVyUmVzdWx0cyA9IFsxM11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCdsb3R0ZXJpZXMnLCckc3RhdGUnLFxyXG5mdW5jdGlvbigkc2NvcGUsbG90dGVyaWVzLCAkc3RhdGUpIHtcclxuICAkc2NvcGUubG90dGVyaWVzID0gbG90dGVyaWVzLmRhdGEuZGF0YS5kYXRhO1xyXG4gICRzY29wZS4kc3RhdGUgPSAkc3RhdGU7XHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAncHJvbW9TZXJ2aWNlJywgJyR0aW1lb3V0JyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UsIHByb21vU2VydmljZSwgJHRpbWVvdXQpIHtcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvbW9TZXJ2aWNlLmdldFByb21vcygpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5wcm9tb3MgPSByZXMuZGF0YVswXS5wcm9tb3M7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS5BZGRQcm9tbyA9IGZ1bmN0aW9uKHByb21vLGxvYykge1xyXG4gICAgICAgICAgICBpZihsb2MgPT0gJ2ZpcnN0JykgIHByb21vLmZpcnN0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKHByb21vKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywncHJvbW8nLFxyXG5cclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UscHJvbW8pIHtcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5wcm9tbyA9IHByb21vO1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlUHJvbW8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnByb21vLmRlbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUucHJvbW8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJ3Byb21vTG9jU2VydmljZScsICckbW9kYWwnLFxyXG5mdW5jdGlvbigkc2NvcGUsIHByb21vTG9jU2VydmljZSwgJG1vZGFsKSB7XHJcblxyXG4gICAgJHNjb3BlLmdldFByb21vc0J5TG9jID0gZnVuY3Rpb24obG9jKSB7XHJcbiAgICAgICAgJHNjb3BlLnNhdmVkID0gZmFsc2U7XHJcbiAgICAgICAgcHJvbW9Mb2NTZXJ2aWNlLmdldExvYyhsb2MpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5wcm9tb3MgPSByZXMuZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICRzY29wZS5jdXJyZW50TG9jID0gJ0hvbWUnO1xyXG5cclxuICAgICRzY29wZS5nZXRQcm9tb3NCeUxvYygnSG9tZScpO1xyXG5cclxuICAgICRzY29wZS5hZGRQcm9tbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhZGRQcm9tb01vZGFsID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb21Mb2MvYWRkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncHJvbUxvY0FkZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBzaXplOiAnbGcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWRkUHJvbW9Nb2RhbC5yZXN1bHQudGhlbihmdW5jdGlvbihwcm9tbykge1xyXG4gICAgICAgICAgICBpZihwcm9tby5maXJzdCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb21vcy51bnNoaWZ0KHByb21vKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb21vcy5wdXNoKHByb21vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5tb3ZlVG8gPSBmdW5jdGlvbihwcm9tbywgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnByb21vcy5pbmRleE9mKHByb21vKTtcclxuICAgICAgICB2YXIgdG1wID0gJHNjb3BlLnByb21vc1tpbmRleCArIGRpcmVjdGlvbl07XHJcbiAgICAgICAgJHNjb3BlLnByb21vc1tpbmRleCArIGRpcmVjdGlvbl0gPSBwcm9tbztcclxuICAgICAgICAkc2NvcGUucHJvbW9zW2luZGV4XSA9IHRtcDtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuc2F2ZVByb21vcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgIF8ucmVtb3ZlKCRzY29wZS5wcm9tb3MsIGZ1bmN0aW9uKHByb21vKSB7IHJldHVybiBwcm9tby5kZWxldGVkID09IHRydWU7IH0pO1xyXG5cclxuICAgICAgIHZhciBwcm9tb3NJZHMgPSBfLnBsdWNrKCRzY29wZS5wcm9tb3MsICdpZCcpO1xyXG4gICAgICAgcHJvbW9Mb2NTZXJ2aWNlLnVwZGF0ZVByb21Mb2MocHJvbW9zSWRzLCRzY29wZS5jdXJyZW50TG9jKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGFsZXJ0KCdUaGUgUHJvbW9zIHNhdmVkIHN1Y2Nlc3NmdWxseSEnKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgIH1cclxuXHJcbiAgICRzY29wZS5kZWxQcm9tbyA9IGZ1bmN0aW9uKHByb21vKSB7XHJcbiAgICAkc2NvcGUucHJvbW8gPSBwcm9tbztcclxuICAgIHZhciBkZWxldGVQcm9tb01vZGFsID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcHJvbUxvYy9kZWxldGUuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ3Byb21Mb2NEZWxldGVDb250cm9sbGVyJyxcclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIHByb21vOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUucHJvbW87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpemU6ICdzbSdcclxuICAgIH0pO1xyXG4gICAgZGVsZXRlUHJvbW9Nb2RhbC5yZXN1bHQudGhlbihmdW5jdGlvbihwcm9tbykge1xyXG4gICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5wcm9tb3MuaW5kZXhPZihwcm9tbyk7XHJcbiAgICAgICAgJHNjb3BlLnByb21vc1tpbmRleF0gPSBwcm9tbztcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuJHNjb3BlLnJldHVyblByb21vID0gZnVuY3Rpb24ocHJvbW8pIHtcclxuICAgIHByb21vLmRlbGV0ZWQgPSBmYWxzZTtcclxuICAgIHZhciBpbmRleCA9ICRzY29wZS5wcm9tb3MuaW5kZXhPZihwcm9tbyk7XHJcbiAgICAkc2NvcGUucHJvbW9zW2luZGV4XSA9IHByb21vO1xyXG59XHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnb3BlcmF0b3InLCAncHJvbW9TZXJ2aWNlJywgJyRtb2RhbCcsJ3Byb21vTG9jU2VydmljZScsXHJcbmZ1bmN0aW9uKCRzY29wZSwgb3BlcmF0b3IsIHByb21vU2VydmljZSwgJG1vZGFsLHByb21vTG9jU2VydmljZSkge1xyXG5cclxuXHJcbiAgICAkc2NvcGUucHJvbW9zID0gb3BlcmF0b3IuZGF0YVswXS5wcm9tb3M7XHJcblxyXG5cclxuICAgICRzY29wZS5hZGRQcm9tbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhZGRQcm9tb01vZGFsID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb21vcy9hZGQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZGRQcm9tb0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBzaXplOiAnbGcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWRkUHJvbW9Nb2RhbC5yZXN1bHQudGhlbihmdW5jdGlvbihwcm9tbykge1xyXG4gICAgICAgICAgICAkc2NvcGUucHJvbW9zLnB1c2gocHJvbW8pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICAkc2NvcGUuZWRpdFByb21vID0gZnVuY3Rpb24ocHJvbW8pIHtcclxuICAgICAgICAkc2NvcGUucHJvbW8gPSBwcm9tbztcclxuICAgICAgICB2YXIgZWRpdFByb21vTW9kYWwgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcHJvbW9zL2VkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0UHJvbW9Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgcHJvbW86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUucHJvbW87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNpemU6ICdsZydcclxuICAgICAgICB9KTtcclxuICAgICAgICBlZGl0UHJvbW9Nb2RhbC5yZXN1bHQudGhlbihmdW5jdGlvbihwcm9tbykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUucHJvbW9zLmluZGV4T2YoJHNjb3BlLnByb21vKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb21vc1tpbmRleF0gPSBwcm9tbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLmRlbFByb21vID0gZnVuY3Rpb24ocHJvbW8pIHtcclxuICAgICAgICAkc2NvcGUucHJvbW8gPSBwcm9tbztcclxuICAgICAgICB2YXIgZGVsZXRlTW9kYWwgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcHJvbW9zL2RlbGV0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2RlbGV0ZVByb21vQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIHByb21vOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnByb21vO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaXplOiAnc20nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVsZXRlTW9kYWwucmVzdWx0LnRoZW4oZnVuY3Rpb24oZGVsZXRlZCkge1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb21vcy5zcGxpY2UoJHNjb3BlLnByb21vcy5pbmRleE9mKCRzY29wZS5wcm9tbyksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsICckbW9kYWxJbnN0YW5jZScsICdwcm9tb1NlcnZpY2UnLCAnJHRpbWVvdXQnLCckdXBsb2FkJyxcclxuZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgcHJvbW9TZXJ2aWNlLCAkdGltZW91dCwkdXBsb2FkKSB7XHJcbiAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnByb21vID0ge307XHJcbiAgICAkc2NvcGUuZmlsZSA9IFtdO1xyXG4gICAgJHNjb3BlLm9uRmlsZVNlbGVjdCA9IGZ1bmN0aW9uKCRmaWxlcykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5maWxlLnB1c2goJGZpbGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAkc2NvcGUubG9hZGVyID0gJzAnO1xyXG5cclxuICAgICRzY29wZS5hZGROZXdQcm9tbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS51cGxvYWQgPSAkdXBsb2FkLnVwbG9hZCh7XHJcbiAgICAgICAgICAgIHVybDogJ3Byb21vJyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGE6ICRzY29wZS5wcm9tbyxcclxuICAgICAgICAgICAgZmlsZTogJHNjb3BlLmZpbGVcclxuICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICRzY29wZS5zYXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKHJlcyk7XHJcbiAgICAgICAgICAgICRzY29wZS5wcm9tbyA9IHt9O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2F2ZWQgPSBmYWxzZTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAncHJvbW9TZXJ2aWNlJywgJ3Byb21vJyxcclxuXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBwcm9tb1NlcnZpY2UsIHByb21vKSB7XHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5kZWxldGVQcm9tbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwcm9tb1NlcnZpY2UuZGVsUHJvbW8ocHJvbW8uaWQpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZGVsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UocmVzLmRhdGEuZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsICckbW9kYWxJbnN0YW5jZScsICdwcm9tb1NlcnZpY2UnLCAnJHRpbWVvdXQnLCAncHJvbW8nLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgcHJvbW9TZXJ2aWNlLCAkdGltZW91dCwgcHJvbW8pIHtcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLnByb21vQ29weSA9IGFuZ3VsYXIuY29weShwcm9tbyk7XHJcblxyXG4gICAgICAgICRzY29wZS5lZGl0UHJvbW8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHJvbW9TZXJ2aWNlLnVwZGF0ZVByb21vKCRzY29wZS5wcm9tb0NvcHkuaWQsICRzY29wZS5wcm9tb0NvcHkpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2F2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zYXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsJ2NhcnRTZXJ2aWNlJywnJHN0YXRlJyxcclxuZnVuY3Rpb24oJHNjb3BlLGNhcnRTZXJ2aWNlLCRzdGF0ZSkge1xyXG4gICAgJHNjb3BlLm9wZW4gPSB7XHJcbiAgICAgICAgb25lOnRydWVcclxuICAgIH07XHJcbiAgICAkc2NvcGUudG9nZ2xlQWNjID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLm9wZW4sIGZ1bmN0aW9uKGluZCwgdmFsKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5vcGVuW3ZhbF0gPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICRzY29wZS5vcGVuW2luZGV4XSA9ICEkc2NvcGUub3BlbltpbmRleF07XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuZmlyc3RPcGVuID0gdHJ1ZTtcclxuICAgICRzY29wZS5sb3QubnVtU2hhcmVzID0gMTtcclxuICAgICRzY29wZS50b2dnbGVOdW1TaGFyZXMgPSBmdW5jdGlvbih3YXkpIHtcclxuICAgICAgICBpZiAod2F5ID09IDEpICRzY29wZS5sb3QubnVtU2hhcmVzKys7XHJcbiAgICAgICAgaWYgKHdheSA9PSAtMSkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmxvdC5udW1TaGFyZXMgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5sb3QubnVtU2hhcmVzLS1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICRzY29wZS5jYWxjVG90YWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKCRzY29wZS5idW5kbGUubnVtYmVyT2ZEcmF3cyAqICRzY29wZS5sb3QubnVtU2hhcmVzKSAqICRzY29wZS5idW5kbGUucHJpY2VQZXJEcmF3O1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLmFkZFRvQ2FydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuY3VycmVudExvdCA9IHtcclxuICAgICAgICBsb3RMaW5lczogJHNjb3BlLmxvdExpbmVzLFxyXG4gICAgICAgIGxvdHRlcnk6JHNjb3BlLmxvdC5sb3R0ZXJ5LFxyXG4gICAgICAgIGRyYXc6JHNjb3BlLmJ1bmRsZSxcclxuICAgICAgICB0eXBlOidzaW5nbGVHcm91cCcsXHJcbiAgICAgICAgbnVtU2hhcmVzOiAkc2NvcGUubG90Lm51bVNoYXJlcyxcclxuICAgICAgICBwcmljZTogJHNjb3BlLmNhbGNUb3RhbCgpXHJcbiAgICB9XHJcbiAgICBjYXJ0U2VydmljZS5hZGRUb0NhcnQoJ3NpbmdsZUdyb3VwJywgJHNjb3BlLmN1cnJlbnRMb3QpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgJHN0YXRlLmdvKCdjYXJ0LmF1dGgnKTtcclxuICAgIH0pO1xyXG59XHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsJ2xvdHRlcmllcycsICdjYXJ0U2VydmljZScsXHJcbmZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsbG90dGVyaWVzLCBjYXJ0U2VydmljZSkge1xyXG4gICAgJHNjb3BlLmxvdCA9IF8uZmluZChsb3R0ZXJpZXMuZGF0YS5kYXRhLmRhdGEsIHtcclxuICAgICAgICBuYW1lOiAkc3RhdGVQYXJhbXMubG90TmFtZVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICRzY29wZS5sb3RMaW5lQ29uZmlnID0gJHNjb3BlLmxvdC5sb3R0ZXJ5LmxpbmVSdWxlcztcclxuXHJcbiAgICAkc2NvcGUuYnVuZGxlID0gJHNjb3BlLmxvdC5idW5kbGVzWzBdO1xyXG5cclxuXHJcbiAgICAkc2NvcGUubG90TGluZXMgPSBbXTtcclxuXHJcblxyXG4gICAgJHNjb3BlLiRvbignbG90TGluZScsIGZ1bmN0aW9uKGV2ZW50LCBsb3RMaW5lKSB7XHJcbiAgICAgICAgaWYgKGxvdExpbmUudmFsaWQpIHtcclxuICAgICAgICAgICAgXy5yZW1vdmUoJHNjb3BlLmxvdExpbmVzLCBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZS5pZCA9PSBsb3RMaW5lLmlkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHNjb3BlLmxvdExpbmVzLnB1c2gobG90TGluZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgXy5yZW1vdmUoJHNjb3BlLmxvdExpbmVzLCBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZS5pZCA9PSBsb3RMaW5lLmlkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLmxvdFZhbGlkID0gKCRzY29wZS5sb3RMaW5lcy5sZW5ndGggPiAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS5jYWxjVG90YWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKCRzY29wZS5sb3RMaW5lcy5sZW5ndGggKiAkc2NvcGUuYnVuZGxlLm51bWJlck9mRHJhd3MpICogJHNjb3BlLmJ1bmRsZS5wcmljZVBlckRyYXc7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAkc2NvcGUuc2V0QnVuZGxlID0gZnVuY3Rpb24oYnVuZGxlKSB7XHJcbiAgICAgICAgJHNjb3BlLmJ1bmRsZSA9IGJ1bmRsZTtcclxuICAgICAgICAkc2NvcGUuY2FsY1RvdGFsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICRzY29wZS5jbGVhckFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS4kYnJvYWRjYXN0KCdjbGVhckFsbCcpO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5waWNrQWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLiRicm9hZGNhc3QoJ3BpY2tBbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUucGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5jdXJyZW50TG90ID0ge1xyXG4gICAgICAgICAgICBsb3RMaW5lczogJHNjb3BlLmxvdExpbmVzLFxyXG4gICAgICAgICAgICBsb3R0ZXJ5OiRzY29wZS5sb3QubG90dGVyeSxcclxuICAgICAgICAgICAgZHJhdzokc2NvcGUuYnVuZGxlLFxyXG4gICAgICAgICAgICB0eXBlOidzaW5nbGVzJyxcclxuICAgICAgICAgICAgcHJpY2U6ICRzY29wZS5jYWxjVG90YWwoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FydFNlcnZpY2UuYWRkVG9DYXJ0KCAnc2luZ2xlcycsJHNjb3BlLmN1cnJlbnRMb3QpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY2FydC5hdXRoJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnJHRpbWVvdXQnLCAnYXV0aFNlcnZpY2UnLCAndXNlclNlcnZpY2UnLCAncGF5bWVudHNTZXJ2aWNlJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywnRU5WJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UsICR0aW1lb3V0LCBhdXRoU2VydmljZSwgdXNlclNlcnZpY2UsIHBheW1lbnRzU2VydmljZSwgJHN0YXRlLCAkcm9vdFNjb3BlLEVOVikge1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUudXNlciA9IHt9O1xyXG4gICAgICAgICRzY29wZS5sb2dpblVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXIudXNlck5hbWUgPSAkc2NvcGUudXNlci5lbWFpbDtcclxuICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW5Vc2VyKCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UudXNlciA9IHt1c2VyTmFtZTpyZXMuZGF0YS5kYXRhLnVzZXJOYW1lfTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyU2VydmljZS51c2VyLmNsaWVudF9pZCA9IHJlcy5kYXRhLmRhdGEuY2xpZW50SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlclNlcnZpY2UudXNlci5jbGllbnRfc2VjcmV0ID0gJ0JlYXJlcicgKyByZXMuZGF0YS5kYXRhLmNsaWVudFNlY3JldDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFudF90eXBlOiAnb3BlcmF0b3InLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQ6J1hic3VhdUtPRXRoWXQyZVRwZnFHcTdrZEJGRWtUUE9PMGVQcWp2bkp0WjglMjUzRCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6J3JUcXRSdHpYOHVyQnhJNWFGNXJLZGtJanJmV3AwNWZsRlNrZmJoV3BMN1klMjUzRCcsXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoRU5WLmFwaSAhPT0gJ2RldicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UuZ2V0VG9rZW4oY2xpZW50KS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwYXltZW50c1NlcnZpY2UuY2hlY2tJZlVzZXJIYXNQYXltZW50TWV0aG9kKCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyU2VydmljZS51c2VyLmhhc1BheW1lbnQgPSByZXMuZGF0YS5oYXNQYXltZW50O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlLmluY2x1ZGVzKCdjYXJ0JykpICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlbkluJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLndyb25nQ3JlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLCAnYXV0aFNlcnZpY2UnLCAnJHN0YXRlJywgJ3VzZXJTZXJ2aWNlJywgJyRtb2RhbEluc3RhbmNlJywnaW5mb1NlcnZpY2UnLFxyXG5mdW5jdGlvbigkc2NvcGUsIGF1dGhTZXJ2aWNlLCAkc3RhdGUsIHVzZXJTZXJ2aWNlLCAkbW9kYWxJbnN0YW5jZSxpbmZvU2VydmljZSApIHtcclxuICAgICRzY29wZS5mb3JtID0ge307XHJcbiAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9XHJcbiAgICBpbmZvU2VydmljZS5nZXRDb3VudHJpZXMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICRzY29wZS5jb3VudHJpZXMgPSByZXMuZGF0YTtcclxuICAgIH0pO1xyXG4gICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcclxuICAgICRzY29wZS5yZWdpc3RlclVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuc3VibWl0dGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoJHNjb3BlLmZvcm0uc2lnblVwRm9ybS4kdmFsaWQpIHtcclxuICAgICAgICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXJVc2VyKCRzY29wZS5uZXdVc2VyKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6JHNjb3BlLm5ld1VzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5uZXdVc2VyLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiRzY29wZS5uZXdVc2VyLmVtYWlsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW5Vc2VyKCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZXJ2aWNlLnVzZXIgPSB7dXNlck5hbWU6cmVzLmRhdGEuZGF0YS51c2VyTmFtZX07XHJcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgJHNjb3BlLmNoZWNrRXJyb3JzID0gZnVuY3Rpb24oZmllbGQsIGVycikge1xyXG4gICAgICAgIHJldHVybiAkc2NvcGUuc3VibWl0dGVkICYmIGZpZWxkLiRlcnJvcltlcnJdO1xyXG4gICAgfVxyXG59XHJcbl0iLCIndXNlIHN0cmljdCdcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjYXJ0ID0gJCgnLmNvbnRlbnQtY2FydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYXJ0LmRhdGEoJ29wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcnQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdyaWdodCc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiAnLTE0MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ29wZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FydC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJy0xMDAwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndG9wJzogJy00MXB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ29wZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICRzY29wZS5zZXRBcnJvd0Rvd24gPSBmdW5jdGlvbihmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5wcmVkaWNhdGUgPT0gZmllbGROYW1lICYmICRzY29wZS5yZXZlcnNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuc2V0QXJyb3dVcCA9IGZ1bmN0aW9uKGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnByZWRpY2F0ZSA9PSBmaWVsZE5hbWUgJiYgISRzY29wZS5yZXZlcnNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cikge1xyXG4gICAgICAgICAgICBpZiAoYXR0ci5iaXJ0aGRheSkge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VNb250aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VZZWFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkRhdGU6IFwiLTgwWVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heERhdGU6IFwiLTE4WVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IFwiZCBNICx5eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHllYXJSYW5nZTogXCIxOTAxOjE5OTZcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVllYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZTogXCJZXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogXCJkIE0gLHl5XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgbGluazpmdW5jdGlvbigkc2NvcGUsZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50Lm1zRHJvcERvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgbGluazpmdW5jdGlvbigkc2NvcGUsZWxlbWVudCkge1xyXG4gICAgLy8gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIC8vICAgY29uc29sZS5sb2coJCh3aW5kb3cpLnNjcm9sbFRvcCgpKTtcclxuICAgIC8vICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gNDMwICkge1xyXG4gICAgLy8gICAgICQoZWxlbWVudCkuY3NzKCd0b3AnLCAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSA0MDApO1xyXG4gICAgLy8gICB9ZWxzZSB7XHJcbiAgICAvLyAgICAgJChlbGVtZW50KS5jc3MoJ3RvcCcsIDApO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KTtcclxuJChcIi5pbmZvLW5hdlwiKS5zdGlja3koe3RvcFNwYWNpbmc6MTAsIGJvdHRvbVNwYWNpbmc6NDAwfSk7XHJcblxyXG5cclxufVxyXG59XHJcbn0iLCIndXNlIHN0cmljdCdcclxubW9kdWxlLmV4cG9ydHMgPSBbJyRpbnRlcnZhbCcsXHJcbiAgICBmdW5jdGlvbigkaW50ZXJ2YWwpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2RpcmVjdGl2ZXMvbG90TGluZS5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGxvdExpbmVDb25maWc6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW0sIGF0dHIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBndWVzc1JhbmdlID0gJHNjb3BlLmxvdExpbmVDb25maWcuZ3Vlc3NSYW5nZSxcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFNlbGVjdGVkQ291bnQgPSAkc2NvcGUubG90TGluZUNvbmZpZy5yZXF1aXJlZFNlbGVjdGVkQ291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5R3Vlc3NSYW5nZSA9ICRzY29wZS5sb3RMaW5lQ29uZmlnLnNlY29uZGFyeUd1ZXNzUmFuZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5UmVxdWlyZWRTZWxlY3RlZENvdW50ID0gJHNjb3BlLmxvdExpbmVDb25maWcuc2Vjb25kYXJ5UmVxdWlyZWRTZWxlY3RlZENvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeUd1ZXNzUmFuZ2VOYW1lID0gJHNjb3BlLmxvdExpbmVDb25maWcuc2Vjb25kYXJ5R3Vlc3NSYW5nZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcFRpbWU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubGluZU51bSA9IE51bWJlcihhdHRyLmlkLnN1YnN0cig3LCAxKSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgLyogZ2VuZXJhdGUgcmVndWxhciBudW1iZXJzICovXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5oYXNFeHRyYSA9ICEhKHNlY29uZGFyeUd1ZXNzUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgXyhfLnJhbmdlKDEsIGd1ZXNzUmFuZ2UgKyAxKSkuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogbnVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvKiBnZW5lcmF0ZSBleHRyYSBudW1iZXJzICovXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXh0cmFOdW1zY2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIF8oXy5yYW5nZSgxLCBzZWNvbmRhcnlHdWVzc1JhbmdlICsgMSkpLmZvckVhY2goZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmV4dHJhTnVtc2NlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IG51bSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLyogZmluYWwgbnVtYmVycyAqL1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvdExpbmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0cmE6IFtdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgnbG90TGluZScsIGZ1bmN0aW9uKGxvdExpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxMb3RMaW5lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGF0dHIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvdExpbmU6ICRzY29wZS5sb3RMaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgobG90TGluZS5udW1zLmxlbmd0aCA9PSByZXF1aXJlZFNlbGVjdGVkQ291bnQpICYmIChsb3RMaW5lLmV4dHJhLmxlbmd0aCA9PSBzZWNvbmRhcnlSZXF1aXJlZFNlbGVjdGVkQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5saW5lVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2xvdExpbmUnLCBmaW5hbExvdExpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5saW5lVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxMb3RMaW5lLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnbG90TGluZScsIGZpbmFsTG90TGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvKiB0aGUgdXNlciBjbGlja2VkIG9uIG51bWJlciAqL1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJQaWNrTnVtID0gZnVuY3Rpb24oY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucHVsbCgkc2NvcGUubG90TGluZS5udW1zLCBjZWxsLm51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzY29wZS5sb3RMaW5lLm51bXMubGVuZ3RoIDwgcmVxdWlyZWRTZWxlY3RlZENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvdExpbmUubnVtcy5wdXNoKGNlbGwubnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBtb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLyogcGljayBleHRyYSBudW1iZXIgKi9cclxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyUGlja0V4dHJhTnVtID0gZnVuY3Rpb24oY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucHVsbCgkc2NvcGUubG90TGluZS5leHRyYSwgY2VsbC5udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc2NvcGUubG90TGluZS5leHRyYS5sZW5ndGggPCBzZWNvbmRhcnlSZXF1aXJlZFNlbGVjdGVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG90TGluZS5leHRyYS5wdXNoKGNlbGwubnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBtb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdwaWNrQ291bnQnLCBmdW5jdGlvbihuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXdWYWwgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzdG9wVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvKiB0aGUgdXNlciB3YW50cyBxdWljayBwaWNrICovXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucXVpY2tQaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBpY2tDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcFRpbWUgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jbGVhckxvdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG90TGluZS5udW1zID0gXy5zYW1wbGUoXy5yYW5nZSgxLCBndWVzc1JhbmdlICsgMSksIHJlcXVpcmVkU2VsZWN0ZWRDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF8oJHNjb3BlLmxvdExpbmUubnVtcykuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW0gPSBfLmZpbmQoJHNjb3BlLmNlbGxzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiBudW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvdExpbmUuZXh0cmEgPSBfLnNhbXBsZShfLnJhbmdlKDEsIHNlY29uZGFyeUd1ZXNzUmFuZ2UgKyAxKSwgc2Vjb25kYXJ5UmVxdWlyZWRTZWxlY3RlZENvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXygkc2NvcGUubG90TGluZS5leHRyYSkuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW0gPSBfLmZpbmQoJHNjb3BlLmV4dHJhTnVtc2NlbGxzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiBudW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBpY2tDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyogY2xlYXIgbnVtYmVycyAqL1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNsZWFyTnVtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jbGVhckxvdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNsZWFyTG90ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXygkc2NvcGUuY2VsbHMpLmZvckVhY2goZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bS5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXygkc2NvcGUuZXh0cmFOdW1zY2VsbHMpLmZvckVhY2goZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bS5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvdExpbmUubnVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb3RMaW5lLmV4dHJhID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJG9uKCdjbGVhckFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jbGVhckxvdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJG9uKCdwaWNrQWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnF1aWNrUGljaygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5dIiwiJ3VzZSBzdHJpY3QnXHJcbm1vZHVsZS5leHBvcnRzID0gWyckaW50ZXJ2YWwnLGZ1bmN0aW9uKCRpbnRlcnZhbCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgdGVtcGxhdGVVcmw6J3ZpZXdzL2RpcmVjdGl2ZXMvbWJTbGlkZXIuaHRtbCcsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBpbWdXaWR0aDogJ0AnLFxyXG4gICAgICBnYWxsZXJ5RGF0YTogJz0nXHJcbiAgICB9LFxyXG4gICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAkc2NvcGUuc2VsZWN0ZWQgPSAkc2NvcGUuZ2FsbGVyeURhdGFbMF07XHJcblxyXG4gICAgICAkc2NvcGUuc2Nyb2xsVG8gPSBmdW5jdGlvbihpbWFnZSwgaW5kKSB7XHJcbiAgICAgICAgJHNjb3BlLmxpc3RQb3NpdGlvbiA9IHtcclxuICAgICAgICAgIGxlZnQ6IChwYXJzZUludCgkc2NvcGUuaW1nV2lkdGgpICogaW5kICogLTEpICsgXCJweFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQgPSBpbWFnZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICB2YXIgYXV0b1NsaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnNjcm9sbFRvKCRzY29wZS5nYWxsZXJ5RGF0YVtpXSwgaSk7XHJcbiAgICAgICAgaWYgKGkgKyAxID09ICRzY29wZS5nYWxsZXJ5RGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhdXRvU2xpZGVJbnRlcnZhbCA9ICRpbnRlcnZhbChhdXRvU2xpZGUsIDUwMDApO1xyXG4gICAgICAkc2NvcGUuc3RhcnRBdXRvU2xpZGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBhdXRvU2xpZGVJbnRlcnZhbCA9ICRpbnRlcnZhbChhdXRvU2xpZGUsIDUwMDApO1xyXG4gICAgICB9XHJcbiAgICAgICRzY29wZS5zdG9wQXV0b1NsaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGludGVydmFsLmNhbmNlbChhdXRvU2xpZGVJbnRlcnZhbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1dIiwiZXhwb3J0cy5zaG93TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIGF0dHJzLnNob3dNb2RhbCkubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydHMuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgYXR0cnMuY2xvc2VNb2RhbCkubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPVxyXG5cclxuW1xyXG5cclxuICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGlucHV0IHR5cGU9XCJidXR0b25cIiBuZy12YWx1ZT1cInRleHRNb3JlTGVzc1wiIG5nLWNsaWNrPVwibW9yZUxlc3NMaW5lcygpXCIgY2xhc3M9XCJidG4gc2Vjb25kcnktYnRuIGJ0bi1zbVwiPicsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbSwgYXR0cikge1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS5udW1Mb3RMaW5lVG9TaG93ID0gXy5yYW5nZSgxLCAxMSk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubnVtTGluZXMgPSA1O1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRleHRNb3JlTGVzcyA9ICcrIE1vcmUgbGluZXMnO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1vcmVMZXNzTGluZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLm51bUxpbmVzID4gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubnVtTGluZXMgPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGV4dE1vcmVMZXNzID0gJysgTW9yZSBsaW5lcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm51bUxpbmVzID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS50ZXh0TW9yZUxlc3MgPSAnLSBMZXNzIGxpbmVzJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5dIiwiLy8gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgcmVzdHJpY3Q6ICdBRScsXHJcbi8vICAgICAgICAgc2NvcGU6IHtcclxuLy8gICAgICAgICAgICAgbW9kZWw6ICc9JyxcclxuLy8gICAgICAgICAgICAgcHJlX3NlbGVjdGVkOiAnPXByZVNlbGVjdGVkJ1xyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYnRuLWdyb3VwJyBkYXRhLW5nLWNsYXNzPSd7b3Blbjogb3Blbn0nPlwiICsgXCI8YnV0dG9uIGNsYXNzPSdidG4gYnRuLXNtYWxsJz5TZWxlY3QgTGFuZ3VhZ2U8L2J1dHRvbj5cIiArIFwiPGJ1dHRvbiBjbGFzcz0nYnRuIGJ0bi1zbWFsbCBkcm9wZG93bi10b2dnbGUnIGRhdGEtbmctY2xpY2s9J29wZW49IW9wZW47b3BlbkRyb3Bkb3duKCknPjxzcGFuIGNsYXNzPSdjYXJldCc+PC9zcGFuPjwvYnV0dG9uPlwiICsgXCI8dWwgY2xhc3M9J2Ryb3Bkb3duLW1lbnUnIGFyaWEtbGFiZWxsZWRieT0nZHJvcGRvd25NZW51Jz5cIiArIFwiPGxpPjxhIGRhdGEtbmctY2xpY2s9J3NlbGVjdEFsbCgpJz48aSBjbGFzcz0nZmEgZmEtY2hlY2stc3F1YXJlJz48L2k+ICBDaGVjayBBbGw8L2E+PC9saT5cIiArIFwiPGxpPjxhIGRhdGEtbmctY2xpY2s9J2Rlc2VsZWN0QWxsKCk7Jz48aSBjbGFzcz0nZmEgZmEtdGltZXMtY2lyY2xlJz48L2k+ICBVbmNoZWNrIEFsbDwvYT48L2xpPlwiICsgXCI8bGkgY2xhc3M9J2RpdmlkZXInPjwvbGk+XCIgKyBcIjxsaSBkYXRhLW5nLXJlcGVhdD0nb3B0aW9uIGluIHNlbGVjdGVkSXRlbXMnPiA8YSBkYXRhLW5nLWNsaWNrPSdzZXRTZWxlY3RlZEl0ZW0ob3B0aW9uKSc+e3tvcHRpb24ubmFtZX19PHNwYW4gc3R5bGU9J3BhZGRpbmctbGVmdDogNHB4OycgZGF0YS1uZy1jbGFzcz0naXNDaGVja2VkKG9wdGlvbiknPjwvc3Bhbj4gPC9hPjwvbGk+XCIgKyBcIjwvdWw+XCIgKyBcIjwvZGl2PlwiLFxyXG4vLyAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG4vLyAgICAgICAgICAgICAkc2NvcGUub3BlbkRyb3Bkb3duID0gZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4vLyAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUucHJlX3NlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkSXRlbXMucHVzaCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiRzY29wZS5wcmVfc2VsZWN0ZWRbaV0uaWQsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6JHNjb3BlLnByZV9zZWxlY3RlZFtpXS5uYW1lXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH07XHJcbi8vICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IFtdO1xyXG5cclxuLy8gICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0gJHNjb3BlLnNlbGVjdGVkSXRlbXM7XHJcbi8vICAgICAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgICAgICAkc2NvcGUuZGVzZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IFtdO1xyXG4vLyAgICAgICAgICAgICB9O1xyXG5cclxuLy8gICAgICAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uKG9wdGlvbikge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmIChfLmNvbnRhaW5zKCRzY29wZS5tb2RlbCwgb3B0aW9uKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IF8ud2l0aG91dCgkc2NvcGUubW9kZWwsIG9wdGlvbik7XHJcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwucHVzaChvcHRpb24pO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5tb2RlbCk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgICAgICAkc2NvcGUuaXNDaGVja2VkID0gZnVuY3Rpb24ob3B0aW9uKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoXy5jb250YWlucygkc2NvcGUubW9kZWwsIG9wdGlvbikpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ZhIGZhLWNoZWNrJztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfTtcclxuXHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBRScsXHJcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBzZWxlY3RlZExhYmVsOiBcIkBcIixcclxuICAgICAgYXZhaWxhYmxlTGFiZWw6IFwiQFwiLFxyXG4gICAgICBkaXNwbGF5QXR0cjogXCJAXCIsXHJcbiAgICAgIGF2YWlsYWJsZTogXCI9XCIsXHJcbiAgICAgIG1vZGVsOiBcIj1uZ01vZGVsXCJcclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZVVybDondmlld3Mvb3BlcmF0b3JEYXNoL211bHRpcGxlLmh0bWwnLFxyXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsbSwgYXR0cnMpIHtcclxuICAgICAgc2NvcGUuc2VsZWN0ZWQgPSB7XHJcbiAgICAgICAgYXZhaWxhYmxlOiBbXSxcclxuICAgICAgICBjdXJyZW50OiBbXVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyogSGFuZGxlcyBjYXNlcyB3aGVyZSBzY29wZSBkYXRhIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldCAqL1xyXG4gICAgICB2YXIgZGF0YUxvYWRpbmcgPSBmdW5jdGlvbihzY29wZUF0dHIpIHtcclxuICAgICAgICB2YXIgbG9hZGluZyA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgaWYoc2NvcGVbc2NvcGVBdHRyXSkge1xyXG4gICAgICAgICAgbG9hZGluZy5yZXNvbHZlKHNjb3BlW3Njb3BlQXR0cl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzY29wZS4kd2F0Y2goc2NvcGVBdHRyLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWUgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICBsb2FkaW5nLnJlc29sdmUobmV3VmFsdWUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2FkaW5nLnByb21pc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKiBGaWx0ZXJzIG91dCBpdGVtcyBpbiBvcmlnaW5hbCB0aGF0IGFyZSBhbHNvIGluIHRvRmlsdGVyLiBDb21wYXJlcyBieSByZWZlcmVuY2UuICovXHJcbiAgICAgIHZhciBmaWx0ZXJPdXQgPSBmdW5jdGlvbihvcmlnaW5hbCwgdG9GaWx0ZXIpIHtcclxuICAgICAgICB2YXIgZmlsdGVyZWQgPSBbXTtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2gob3JpZ2luYWwsIGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdG9GaWx0ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodG9GaWx0ZXJbaV1bYXR0cnMuZGlzcGxheUF0dHJdID09IGVudGl0eVthdHRycy5kaXNwbGF5QXR0cl0pIHtcclxuICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFtYXRjaCkge1xyXG4gICAgICAgICAgICBmaWx0ZXJlZC5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgc2NvcGUucmVmcmVzaEF2YWlsYWJsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjb3BlLmF2YWlsYWJsZSA9IGZpbHRlck91dChzY29wZS5hdmFpbGFibGUsIHNjb3BlLm1vZGVsKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RlZC5hdmFpbGFibGUgPSBbXTtcclxuICAgICAgICBzY29wZS5zZWxlY3RlZC5jdXJyZW50ID0gW107XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBzY29wZS5hZGQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzY29wZS5tb2RlbCA9IHNjb3BlLm1vZGVsLmNvbmNhdChzY29wZS5zZWxlY3RlZC5hdmFpbGFibGUpO1xyXG4gICAgICAgIHNjb3BlLnJlZnJlc2hBdmFpbGFibGUoKTtcclxuICAgICAgfTtcclxuICAgICAgc2NvcGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2NvcGUuYXZhaWxhYmxlID0gc2NvcGUuYXZhaWxhYmxlLmNvbmNhdChzY29wZS5zZWxlY3RlZC5jdXJyZW50KTtcclxuICAgICAgICBzY29wZS5tb2RlbCA9IGZpbHRlck91dChzY29wZS5tb2RlbCwgc2NvcGUuc2VsZWN0ZWQuY3VycmVudCk7XHJcbiAgICAgICAgc2NvcGUucmVmcmVzaEF2YWlsYWJsZSgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgJHEuYWxsKFtkYXRhTG9hZGluZyhcIm1vZGVsXCIpLCBkYXRhTG9hZGluZyhcImF2YWlsYWJsZVwiKV0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgIHNjb3BlLnJlZnJlc2hBdmFpbGFibGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gWyckcGFyc2UnLFxyXG4gICAgZnVuY3Rpb24oJHBhcnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSAkcGFyc2UoYXR0cnMubWF0Y2gpKHNjb3BlKSA9PT0gY3RybC4kbW9kZWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eSgnbWlzbWF0Y2gnLCB2YWxpZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIid1c2Ugc3RyaWN0J1xyXG5tb2R1bGUuZXhwb3J0cyA9IFsnJGxvY2F0aW9uJywgJyRhbmNob3JTY3JvbGwnLFxyXG4gICAgZnVuY3Rpb24oJGxvY2F0aW9uLCAkYW5jaG9yU2Nyb2xsKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2Nyb2xsVG8gPSBmdW5jdGlvbihzZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLmhhc2goc2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24oaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmZvLmhlYWQgPT0gJGxvY2F0aW9uLmhhc2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIid1c2Ugc3RyaWN0J1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydpbmZvU2VydmljZScsJyRsb2NhdGlvbicsIGZ1bmN0aW9uKGluZm9TZXJ2aWNlLCRsb2NhdGlvbikge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgdGVtcGxhdGVVcmw6J3ZpZXdzL2RpcmVjdGl2ZXMvaW5mby5odG1sJyxcclxuICAgIHNjb3BlOiB7XHJcbiAgICAgIHR5cGU6J0AnLFxyXG4gICAgICBkYXRhOiAnPSdcclxuICAgIH0sXHJcbiAgICBsaW5rOmZ1bmN0aW9uKCRzY29wZSxlbGVtZW50KSB7XHJcblxyXG4gICAgICB2YXIgaW5mb1R5cGUgPSAnZ2V0JyArICRzY29wZS50eXBlWzBdLnRvVXBwZXJDYXNlKCkgKyAkc2NvcGUudHlwZS5zbGljZSgxKTtcclxuXHJcbiAgICAgIGluZm9TZXJ2aWNlW2luZm9UeXBlXSgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgJHNjb3BlLmRhdGEgID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaCgkc2NvcGUuZGF0YVswXS5oZWFkKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XSIsIid1c2Ugc3RyaWN0J1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kaXJlY3RpdmVzL3NsaWRlci5odG1sJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGJveFdpZHRoID0gMTQwICsgMzIsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTaXplID0gJHNjb3BlLmxvdHRlcmllcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXIgPSAkKCcud3JhcFNsaWRlcicpLFxyXG4gICAgICAgICAgICAgICAgbnVtQm94ZXNUb1Nob3cgPSBzbGlkZXIuZGF0YSgnbnVtQm94ZXNUb1Nob3cnKSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBudW1Cb3hlc1RvU2hvdyxcclxuICAgICAgICAgICAgICAgIGJhY2tUb1N0YXJ0ID0gKHNsaWRlclNpemUgKiBib3hXaWR0aCkgLSAobnVtQm94ZXNUb1Nob3cgKiBib3hXaWR0aCksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb247XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXInKS5jc3MoJ21heFdpZHRoJywgYm94V2lkdGggKiAkc2NvcGUubG90dGVyaWVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICQoJy53cmFwLWNvbnRyb2xzJykuY3NzKCdtYXhXaWR0aCcsIGJveFdpZHRoICogJHNjb3BlLmxvdHRlcmllcy5sZW5ndGgpO1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgICRzY29wZS5uZXh0PSBmdW5jdGlvbigpIHtcclxuLy8gICAkKCcjbG90LWxpc3QnKS5zbGlja05leHQoKTtcclxuLy8gfVxyXG4vLyAkc2NvcGUucHJldj0gZnVuY3Rpb24oKSB7XHJcbi8vICAgJCgnI2xvdC1saXN0Jykuc2xpY2tQcmV2KCk7XHJcbi8vIH1cclxuICAgICAgICAgICAgJCgnLmNvbnRyb2wtYnRuJykub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gJCh0aGlzKS5kYXRhKCdkaXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgICAgICAgICArK2N1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gJy09JyArIGJveFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PSBudW1Cb3hlc1RvU2hvdykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIC0tY3VycmVudDtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSAnKz0nICsgYm94V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT0gKHNsaWRlclNpemUgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnOiAnKz0nICsgYmFja1RvU3RhcnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gbnVtQm94ZXNUb1Nob3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JzogYWN0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIGxpbms6ZnVuY3Rpb24oJHNjb3BlLGVsZW1lbnQpIHtcclxuICAgICB2YXIgZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgdmFyIHRvcCA9IGVsZW1lbnQub2Zmc2V0KCkudG9wO1xyXG4gICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+PSB0b3AgKSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgIH1lbHNlIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgfVxyXG4gfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcbm1vZHVsZS5leHBvcnRzID0gWyckcm9vdFNjb3BlJywgJyRpbnRlcnZhbCcsXHJcbmZ1bmN0aW9uKCRyb290U2NvcGUsICRpbnRlcnZhbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFRlc3RpID0gMDtcclxuICAgICAgICAgICAgJHNjb3BlLnRlc3RpID0gJHJvb3RTY29wZS5vcGVyYXRvckNvbmZpZy50ZXN0aXNbJHNjb3BlLmN1cnJlbnRUZXN0aV07XHJcbiAgICAgICAgICAgICRzY29wZS5uZXh0VGVzdGlzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKCRzY29wZS5jdXJyZW50VGVzdGkgKyAxKSA9PSAkcm9vdFNjb3BlLm9wZXJhdG9yQ29uZmlnLnRlc3Rpcy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICRzY29wZS50ZXN0aSA9ICRyb290U2NvcGUub3BlcmF0b3JDb25maWcudGVzdGlzWysrJHNjb3BlLmN1cnJlbnRUZXN0aV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnByZXZUZXN0aXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuY3VycmVudFRlc3RpID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICRzY29wZS50ZXN0aSA9ICRyb290U2NvcGUub3BlcmF0b3JDb25maWcudGVzdGlzWy0tJHNjb3BlLmN1cnJlbnRUZXN0aV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCgkc2NvcGUuY3VycmVudFRlc3RpICsgMSkgPT0gJHJvb3RTY29wZS5vcGVyYXRvckNvbmZpZy50ZXN0aXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RpID0gJHJvb3RTY29wZS5vcGVyYXRvckNvbmZpZy50ZXN0aXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgLS0kc2NvcGUuY3VycmVudFRlc3RpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICRzY29wZS50ZXN0aSA9ICRyb290U2NvcGUub3BlcmF0b3JDb25maWcudGVzdGlzWysrJHNjb3BlLmN1cnJlbnRUZXN0aV07XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgfSwgNzAwMDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5dIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAvKkBuZ0luamVjdCovIGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOid2aWV3cy9teUFjY291bnQvdHJhbnNhY3Rpb25zL3RpY2tldC5odG1sJyxcclxuICAgICAgICBzY29wZTp7XHJcbiAgICAgICAgICB0aWNrZXQ6ICc9JyxcclxuICAgICAgICAgIGxldHRlcnM6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazpmdW5jdGlvbigkc2NvcGUsZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICRzY29wZS5sZXR0ZXJzID0gWydBJywnQicsJ0MnLCdEJywnRScsJ0YnLCdHJywnSCcsJ0knLCdKJywnSycsJ0wnLCdNJywnTicsJ08nLCdQJywnUScsJ1InLCdTJywnVCcsJ1UnLCdWJywnVycsJ1gnLCdZJywnWiddO1xyXG4gICAgICAgICAgJCgnLmZhbmN5Ym94JykuZmFuY3lib3goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIG9iZzogJz0nLFxyXG4gICAgICAgICAgICBkYXRhTGVuOiAnPSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6ZnVuY3Rpb24oJHNjb3BlLGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9iZy5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQoZWxlbWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLm9iZy5vcGVuID0gISRzY29wZS5vYmcub3BlbjtcclxuICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm5leHQoKS5maW5kKCcucm93LXRvZ2dsZScpLnNsaWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygndHItc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZighJHNjb3BlLm9iZy5vcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygndHItc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdsb3R0ZXJ5JywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndGltZXInLFxyXG4gICAgJ25nQW5pbWF0ZScsXHJcbiAgICAnd2ViU3RvcmFnZU1vZHVsZScsXHJcbiAgICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAndWkuYm9vdHN0cmFwJyxcclxuICAgICd0ZXh0QW5ndWxhcicsXHJcbiAgICAnYW5ndWxhckZpbGVVcGxvYWQnLFxyXG4gICAgJ3NsaWNrJ1xyXG4gICAgXSlcclxuXHJcbi8qPT09PT09PT09PSAgQ09ORklHIEJMT0NLID09PT09PT09PT0qL1xyXG5cclxuLmNvbmZpZyhyZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKSlcclxuLmNvbmZpZyhyZXF1aXJlKCcuL2NvbmZpZy90cmFuc2xhdGUnKSlcclxuLmNvbmZpZyhyZXF1aXJlKCcuL2NvbmZpZy9odG1sRWRpdG9yJykpXHJcbi5jb25maWcoWyckc2NlUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlcicsXHJcbiAgICBmdW5jdGlvbigkc2NlUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpIHtcclxuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW4nKTtcclxuICAgICAgICAkc2NlUHJvdmlkZXIuZW5hYmxlZChmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBdKVxyXG4ucnVuKHJlcXVpcmUoJy4vY29uZmlnL3J1blBoYXNlJykpXHJcblxyXG4vKj09PT09PT09PT0gIFNFUlZJQ0VTICA9PT09PT09PT09Ki9cclxuXHJcbi5zZXJ2aWNlKCdhdXRoU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvYXV0aCcpKVxyXG4uc2VydmljZSgndXNlclNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3VzZXInKSlcclxuLnNlcnZpY2UoJ2FkbWluU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvYWRtaW4nKSlcclxuLnNlcnZpY2UoJ3Byb21vU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvcHJvbW8nKSlcclxuLnNlcnZpY2UoJ3Byb21vTG9jU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvcHJvbW9Mb2MnKSlcclxuLmZhY3RvcnkoJ2F1dGhJbicsIHJlcXVpcmUoJy4vY29uZmlnL2F1dGhJbnRlcmNlcHRvcicpKVxyXG4uc2VydmljZSgnYWNjb3VudFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2FjY291bnQnKSlcclxuLnNlcnZpY2UoJ3BheW1lbnRzU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvcGF5bWVudHMnKSlcclxuLnNlcnZpY2UoJ2xvdFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2xvdCcpKVxyXG4uc2VydmljZSgnb3BlcmF0b3JTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9vcGVyYXRvcicpKVxyXG4uc2VydmljZSgnY2FydFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2NhcnQvY2FydCcpKVxyXG4uc2VydmljZSgnY29udGFjdFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2NvbnRhY3QnKSlcclxuLnNlcnZpY2UoJ2luZm9TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9pbmZvJykpXHJcblxyXG4vKj09PT09PT09PT0gIENPTlRST0xMRVJTICA9PT09PT09PT09Ki9cclxuXHJcbi5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvaG9tZScpKVxyXG4uY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvbmF2JykpXHJcbi5jb250cm9sbGVyKCdhdXRoQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvdXNlci9sb2dpbicpKVxyXG4uY29udHJvbGxlcignc2lnblVwTW9kYWxDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy91c2VyL3NpZ25VcE1vZGFsJykpXHJcbi5jb250cm9sbGVyKCdwcm9tb0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Byb21vJykpXHJcbi5jb250cm9sbGVyKCdjb250YWN0Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvY29udGFjdC9jb250YWN0JykpXHJcblxyXG4vKj09PT09PT09PT0gIGFkbWluICA9PT09PT09PT09Ki9cclxuLmNvbnRyb2xsZXIoJ2FkbWluQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvYWRtaW4vYWRtaW4nKSlcclxuLmNvbnRyb2xsZXIoJ2VkaXRPcGVyYXRvckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2FkbWluL2VkaXQnKSlcclxuLmNvbnRyb2xsZXIoJ2NvbnRhY3RzTGlzdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2FkbWluL2NvbnRhY3RzTGlzdCcpKVxyXG5cclxuXHJcbi8qPT09PT09PT09PSAgY2FydCAgPT09PT09PT09PSovXHJcblxyXG4uY29udHJvbGxlcignbXlDYXJ0Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvY2FydC9teUNhcnQnKSlcclxuLmNvbnRyb2xsZXIoJ2NhcnRBdXRoQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvY2FydC9jYXJ0QXV0aCcpKVxyXG4uY29udHJvbGxlcigncGF5bWVudEFuZEluZm9Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9jYXJ0L3BheW1lbnRBbmRJbmZvJykpXHJcblxyXG5cclxuLyo9PT09PT09PT09ICBPUEVSQVRPUiBEQVNIQk9BUkQgID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ29wZXJhdG9yRGFzaENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL29wZXJhdG9yRGFzaC9vcGVyYXRvckRhc2gnKSlcclxuLmNvbnRyb2xsZXIoJ2xhdGVzdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL29wZXJhdG9yRGFzaC9sYXRlc3QnKSlcclxuLmNvbnRyb2xsZXIoJ2xhbmdzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvb3BlcmF0b3JEYXNoL2xhbmdzJykpXHJcbi5jb250cm9sbGVyKCdnZW5lcmFsQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvb3BlcmF0b3JEYXNoL2dlbmVyYWwnKSlcclxuLmNvbnRyb2xsZXIoJ3Rlc3Rpc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL29wZXJhdG9yRGFzaC90ZXN0aXMnKSlcclxuLmNvbnRyb2xsZXIoJ3Byb2R1Y3RzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvb3BlcmF0b3JEYXNoL3Byb2R1Y3RzJykpXHJcblxyXG5cclxuLyo9PT09PT09PT09ICBNWSBBQ0NPVU5UICA9PT09PT09PT09Ki9cclxuXHJcbi5jb250cm9sbGVyKCdteUFjY291bnRDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9teUFjY291bnQvbXlBY2NvdW50JykpXHJcblxyXG4vKj09PT09PT09PT0gIE1ZIFBBWU1FTlRTICA9PT09PT09PT09Ki9cclxuXHJcbi5jb250cm9sbGVyKCdteVBheW1lbnRDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9teUFjY291bnQvbXlQYXltZW50JykpXHJcbi5jb250cm9sbGVyKCd1cGRhdGVQYXltZW50Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvbXlBY2NvdW50L3VwZGF0ZVBheW1lbnQnKSlcclxuLmNvbnRyb2xsZXIoJ2FkZFBheW1lbnRDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9teUFjY291bnQvYWRkUGF5bWVudCcpKVxyXG4uY29udHJvbGxlcignZGVwb3NpdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL215QWNjb3VudC9kZXBvc2l0JykpXHJcbi5jb250cm9sbGVyKCdkZWxldGVQYXltZW50Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvbXlBY2NvdW50L2RlbGV0ZVBheW1lbnQnKSlcclxuXHJcbi8qPT09PT09PT09PSAgTVkgUFVSQ0hBU0VTID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ215UHVyY2hhc2VzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvbXlBY2NvdW50L215UHVyY2hhc2VzJykpXHJcbi5jb250cm9sbGVyKCdzaW5nbGVQdXJjaGFzZUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL215QWNjb3VudC9zaW5nbGVQdXJjaGFzZScpKVxyXG5cclxuLyo9PT09PT09PT09ICBNWSBUSUNLRVRTID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ215VGlja2V0c0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL215QWNjb3VudC9teVRpY2tldHMnKSlcclxuLmNvbnRyb2xsZXIoJ3RpY2tldFJvd0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL215QWNjb3VudC90aWNrZXRSb3cnKSlcclxuLyo9PT09PT09PT09ICBNWSBQRVJTT05BTCBJTkZPID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ3BlcnNvbmFsSW5mb0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL215QWNjb3VudC9wZXJzb25hbEluZm8nKSlcclxuLyo9PT09PT09PT09ICBNWSBUUkFOU0FDVElPTlMgPT09PT09PT09PSovXHJcblxyXG4uY29udHJvbGxlcignbXlUcmFuc2FjdGlvbnNDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9teUFjY291bnQvbXlUcmFuc2FjdGlvbnMnKSlcclxuXHJcbi8qPT09PT09PT09PSBFTkQgTVkgQUNDT1VOVCA9PT09PT09PT09Ki9cclxuXHJcblxyXG4vKj09PT09PT09PT0gIE9QRVJBVE9SIFBST01PUyA9PT09PT09PT09Ki9cclxuXHJcbi5jb250cm9sbGVyKCdhZGRQcm9tb0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Byb21vcy9hZGQnKSlcclxuLmNvbnRyb2xsZXIoJ2RlbGV0ZVByb21vQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvcHJvbW9zL2RlbGV0ZScpKVxyXG4uY29udHJvbGxlcignZWRpdFByb21vQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvcHJvbW9zL2VkaXQnKSlcclxuXHJcbi8qPT09PT09PT09PSAgUFJPTU8gTE9DQVRJT05TID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ3Byb21Mb2NDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9wcm9tTG9jL3Byb21Mb2MnKSlcclxuLmNvbnRyb2xsZXIoJ3Byb21Mb2NBZGRDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9wcm9tTG9jL2FkZCcpKVxyXG4uY29udHJvbGxlcigncHJvbUxvY0RlbGV0ZUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Byb21Mb2MvZGVsZXRlJykpXHJcblxyXG5cclxuLyo9PT09PT09PT09ICBTSU5HTEUgTE9UIFBBR0UgID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ2xvdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3NpbmdsZUxvdC9sb3QnKSlcclxuLmNvbnRyb2xsZXIoJ2dyb3VwQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvc2luZ2xlTG90L2dyb3VwJykpXHJcblxyXG4vKj09PT09PT09PT0gIFBMQVkgTE9UVEVSSUVTIFBBR0UgID09PT09PT09PT0qL1xyXG5cclxuLmNvbnRyb2xsZXIoJ3BsYXlsb3RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9wbGF5TG90dGVyaWVzL3BsYXlsb3QnKSlcclxuLmNvbnRyb2xsZXIoJ2dyb3VwUGxheUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3BsYXlMb3R0ZXJpZXMvZ3JvdXBQbGF5JykpXHJcbi5jb250cm9sbGVyKCdsYXRlc3RSZXN1bHRzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvcGxheUxvdHRlcmllcy9sYXRlc3RSZXN1bHRzJykpXHJcbi5jb250cm9sbGVyKCdsYXRlc3RSZXN1bHRzRGV0YWlsc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3BsYXlMb3R0ZXJpZXMvbGF0ZXN0UmVzdWx0c0RldGFpbHMnKSlcclxuXHJcbi8qPT09PT09PT09PSAgaHVudGVyICA9PT09PT09PT09Ki9cclxuLmNvbnRyb2xsZXIoJ2h1bnRlckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2h1bnRlci9odW50ZXInKSlcclxuLmNvbnRyb2xsZXIoJ2h1bnRKYWNrcG90Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvaHVudGVyL2h1bnRKYWNrcG90JykpXHJcbi5jb250cm9sbGVyKCdwZXJpb2RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9odW50ZXIvcGVyaW9kJykpXHJcblxyXG4vKj09PT09PT09PT0gIElORk8gID09PT09PT09PT0qL1xyXG4uY29udHJvbGxlcigndGVybXNDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9pbmZvL3Rlcm1zJykpXHJcbi5jb250cm9sbGVyKCdmYXFDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9pbmZvL2ZhcScpKVxyXG4uY29udHJvbGxlcigncG9saWN5Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvaW5mby9wb2xpY3knKSlcclxuXHJcbi8qPT09PT09PT09PSAgRElSRUNUSVZFUyA9PT09PT09PT09Ki9cclxuXHJcbi5kaXJlY3RpdmUoJ2xvdExpbmUnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbG90TGluZScpKVxyXG4uZGlyZWN0aXZlKCdtb3JlTGVzc0xpbmVzJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL21vcmVMZXNzTGluZXMnKSlcclxuLmRpcmVjdGl2ZSgncGFzc3dvcmRNYXRjaCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9wYXNzd29yZE1hdGNoJykpXHJcbiAgICAvLyAuZGlyZWN0aXZlKCdjaGVja0VtYWlsRXhpc3RzJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2NoZWNrRW1haWxFeGlzdHMnKSlcclxuICAgIC5kaXJlY3RpdmUoJ2NoYW5nZUFycm93JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2NoYW5nZUFycm93JykpXHJcbiAgICAuZGlyZWN0aXZlKCdzaG93TW9kYWwnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbW9kYWwnKS5zaG93TW9kYWwpXHJcbiAgICAvLyAuZGlyZWN0aXZlKCd0b2dnbGVUaWNrZXRJbmZvJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3RvZ2dsZVRpY2tldEluZm8nKSlcclxuICAgIC8vIC5kaXJlY3RpdmUoJ2xvdFBhZ2luYXRpb24nLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvcGFnaW5hdGlvbicpKVxyXG4gICAgLmRpcmVjdGl2ZSgnY2xvc2VNb2RhbCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9tb2RhbCcpLmNsb3NlTW9kYWwpXHJcbiAgICAuZGlyZWN0aXZlKCdkYXRlUGlja2VyJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2RhdGVQaWNrZXInKSlcclxuICAgIC5kaXJlY3RpdmUoJ3NsaWRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9zbGlkZXInKSlcclxuICAgIC5kaXJlY3RpdmUoJ2Ryb3Bkb3duTXVsdGlzZWxlY3QnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbXVsdGlTZWxlY3QnKSlcclxuICAgIC5kaXJlY3RpdmUoJ3Rlc3Rpc1NsaWRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy90ZXN0aXNTbGlkZXInKSlcclxuICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZVJvdycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy90b2dnbGVSb3cnKSlcclxuICAgIC5kaXJlY3RpdmUoJ2NhcnRTbGlkZScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9jYXJ0U2xpZGUnKSlcclxuICAgIC5kaXJlY3RpdmUoJ2Ryb3BEb3duJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Ryb3BEb3duJykpXHJcbiAgICAuZGlyZWN0aXZlKCdzY3JvbGxUbycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9zY3JvbGxUbycpKVxyXG4gICAgLmRpcmVjdGl2ZSgnbWJTbGlkZXInLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbWJTbGlkZXInKSlcclxuICAgIC5kaXJlY3RpdmUoJ2ZpeGVkTmF2JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2ZpeGVkTmF2JykpXHJcbiAgICAuZGlyZWN0aXZlKCdzaG93SW5mbycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9zaG93SW5mbycpKVxyXG4gICAgLmRpcmVjdGl2ZSgnc3RpY2t5JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3N0aWNreScpKVxyXG4gICAgLmRpcmVjdGl2ZSgndGlja2V0SW5mbycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy90aWNrZXQnKSlcclxuXHJcblxyXG4gICAgLyo9PT09PT09PT09ICBGSUxURVJTID09PT09PT09PT0qL1xyXG5cclxuICAgIC5maWx0ZXIoJ21vbmV5VHlwZScsIHJlcXVpcmUoJy4vZmlsdGVycy9jdXJyZW5jeScpKVxyXG4gICAgLmZpbHRlcigndHJhbnNhY3Rpb25zJywgcmVxdWlyZSgnLi9maWx0ZXJzL3RyYW5zYWN0aW9ucycpKVxyXG4gICAgLmZpbHRlcignZGlzY291bnQnLCByZXF1aXJlKCcuL2ZpbHRlcnMvZGlzY291bnQnKSlcclxuICAgIC5maWx0ZXIoJ2xvY1BhZ2UnLCByZXF1aXJlKCcuL2ZpbHRlcnMvbG9jUGFnZScpKVxyXG4gICAgLmZpbHRlcigncmVzdWx0cycsIHJlcXVpcmUoJy4vZmlsdGVycy9yZXN1bHRzJykpXHJcbiAgICAuZmlsdGVyKCdudW1iZXJGaWx0ZXInLCByZXF1aXJlKCcuL2ZpbHRlcnMvbnVtYmVyRmlsdGVyJykpXHJcbiAgICAuZmlsdGVyKCdkYXRlVG9TZWMnLCByZXF1aXJlKCcuL2ZpbHRlcnMvZGF0ZVRvU2VjJykpO1xyXG5cclxuICAgIC8vIGxvY2FsaG9zdCA6IGxlYXZlIGVtcHR5XHJcbiAgICAvLyBhcGk6IGh0dHA6Ly9kZXYubG90dGVyeWNsaWNrLmNvbTo4MDgxL1xyXG4gICAgdmFyIGJhc2VVcmwgPSAnJztcclxuICAgIHZhciBiYXNlUGF0aCA9ICdhcGkvcGxheWVyLyc7XHJcbiAgICB2YXIgZnVsbFBhdGggPSBiYXNlVXJsICsgYmFzZVBhdGg7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnbG90dGVyeScpLlxyXG5cclxuICAgIGNvbnN0YW50KCdFTlYnLCB7XHJcbiAgICAgICAgYXBpOiAnZGV2JyxcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGFwaUFjdGl2aXR5OiBmdWxsUGF0aCArICdhY3Rpdml0eScsXHJcbiAgICAgICAgYXBpUGF5bWVudE1ldGhvZDogZnVsbFBhdGggKyAnUGF5bWVudE1ldGhvZCcsXHJcbiAgICAgICAgYXBpT3JkZXI6IGZ1bGxQYXRoICsgJ09yZGVyJyxcclxuICAgICAgICBhcGlPZmZlcjogZnVsbFBhdGggKyAnb2ZmZXIvdHlwZScsXHJcbiAgICAgICAgYXBpQWNjb3VudDogZnVsbFBhdGggKyAnYWNjb3VudCcsXHJcbiAgICAgICAgYXBpVG9rZW46IGJhc2VVcmwgKyAnb2F1dGgvdG9rZW4nXHJcbiAgICB9KSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihtb25leVR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG1vbmV5VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdDQUQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdDQUQmIzM2Oyc7XHJcbiAgICAgICAgICAgIGNhc2UgJ0VVUk8nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcmZXVybzsnO1xyXG4gICAgICAgICAgICBjYXNlICdET0xMQVInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcmIzM2OydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgaWYgKGRhdGUpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgZGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24obnVtKSB7XHJcblxyXG4gICAgICAgIGlmIChudW0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnTm8gRGlzY291bnQnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW0gKyAnJSBEaXNjb3VudCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihwcm9tb3MscGFnZSkge1xyXG4gICAgICAgIHZhciBmaWx0ZXJkUHJvbW9zID0gW107XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHByb21vcywgZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgIGlmKHZhbC5sb2MgPT0gcGFnZSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyZFByb21vcy5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmlsdGVyZFByb21vcztcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbJyRmaWx0ZXInLGZ1bmN0aW9uKCRmaWx0ZXIpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG5cclxuICAgICAgICBpZiAoaXNOYU4oaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJGZpbHRlcignbnVtYmVyJykoaW5wdXQsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1dIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG51bXMpIHtcclxuXHJcbiAgICAgICAgaWYgKG51bXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW1zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnUGVuZGluZydcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRyYW4pIHtcclxuXHJcbiAgICAgICAgaWYgKHRyYW4gPT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuICctJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBbJyRodHRwJywnRU5WJyxcclxuZnVuY3Rpb24oJGh0dHAsRU5WKSB7XHJcblxyXG4gICAgdGhpcy5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2VyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRUcmFuc2FjdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHBbRU5WLm1ldGhvZF0oRU5WLmFwaUFjdGl2aXR5ICsgJy90cmFuc2FjdGlvbnMnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFRpY2tldHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHBbRU5WLm1ldGhvZF0oRU5WLmFwaUFjdGl2aXR5ICsgJy90aWNrZXRzJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdldFB1cmNoYXNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cFtFTlYubWV0aG9kXShFTlYuYXBpQWN0aXZpdHkgKyAnL3B1cmNoYXNlcycpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFNpbmdsZVB1cmNoYXNlID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChFTlYuYXBpQWN0aXZpdHkgKyAnL3B1cmNoYXNlLycgKyBpZCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRodHRwJyxcclxuICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0T3BlcmF0b3JzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FkbWluJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5ld09wZXJhdG9yID0gZnVuY3Rpb24ob3BlcmF0b3IsIHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhZG1pbicsIHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJzOiB1c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJvbW9zOiBwcm9tb3NcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlT3BlcmF0b3IgPSBmdW5jdGlvbihvcGVyYXRvcklkLCBvcGVyYXRvckRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnB1dCgnYWRtaW4vJyArIG9wZXJhdG9ySWQsIHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBvcGVyYXRvckRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRlbE9wZXJhdG9yID0gZnVuY3Rpb24ob3BlcmF0b3JJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKCdhZG1pbi8nICsgb3BlcmF0b3JJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dOyIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbJyRodHRwJywnRU5WJyxcclxuZnVuY3Rpb24oJGh0dHAsIEVOVikge1xyXG5cclxuICAgIHRoaXMubG9naW5Vc2VyID0gZnVuY3Rpb24oY3JlZCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAucG9zdChFTlYuYXBpQWNjb3VudCArICcvbG9naW4nLCBjcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKHVzZXJEZXRhaWxzKSB7XHJcbiAgICAgIHJldHVybiAkaHR0cC5wb3N0KEVOVi5hcGlBY2NvdW50ICsgJy9yZWdpc3RlcicsIHVzZXJEZXRhaWxzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuICRodHRwLnBvc3QoRU5WLmFwaUFjY291bnQgKyAnL2xvZy1vdXQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFRva2VuID0gZnVuY3Rpb24oY2xpZW50KSB7XHJcbiAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoRU5WLmFwaVRva2VuLCBjbGllbnQpO1xyXG4gICAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgdXJsOiBFTlYuYXBpVG9rZW4sXHJcbiAgICAgICAgZGF0YTogY2xpZW50LFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuICRodHRwLnBvc3QoIEVOVi5hcGlBY3Rpdml0eSArICcvcGVyc29uYWwnKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5dOyIsIm1vZHVsZS5leHBvcnRzID0gWyckaHR0cCcsXHJcbiAgICBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB7XHJcbiAgICAgICAgICAgIHNpbmdsZXM6IFtdLFxyXG4gICAgICAgICAgICBncm91cHM6IFtdLFxyXG4gICAgICAgICAgICBzaW5nbGVHcm91cDogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0ID0gZnVuY3Rpb24odHlwZSwgaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zW3R5cGVdLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVJdGVtc1RvU2Vzc2lvbih0aGlzLml0ZW1zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0SXRlbXNJbkNhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zSW5DYXJ0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy5pdGVtcykge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuaXRlbXNbdHlwZV0sIGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbW1vbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IGl0ZW0ucHJpY2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSAnc2luZ2xlcycgfHwgaXRlbS50eXBlID09ICdzaW5nbGVHcm91cCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb21tb24ubmFtZSA9IGl0ZW0ubG90dGVyeS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbW1vbi5pZCA9IGl0ZW0ubG90dGVyeS5pZDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY29tbW9uLmlkID0gaXRlbS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVzID0gXy5wbHVjayhpdGVtLmxvdHRlcmllcywgJ25hbWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb21tb24ubmFtZSA9IG5hbWVzLmpvaW4oJywnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNJbkNhcnQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtc0luQ2FydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZWxJdGVtID0gZnVuY3Rpb24oaXRlbSwgdHlwZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLml0ZW1zW3R5cGVdLmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlSXRlbXNUb1Nlc3Npb24gPSBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnY2FydCcsIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2xlYXJJdGVtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0ge1xyXG4gICAgICAgICAgICAgICAgc2luZ2xlczogW10sXHJcbiAgICAgICAgICAgICAgICBncm91cHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2luZ2xlR3JvdXA6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoJ2NhcnQvMScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJGh0dHAnLFxyXG4gICAgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgdGhpcy5nZXRDb250YWN0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2NvbnRhY3QnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNhdmVDb250YWN0ID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdjb250YWN0JywgZGF0YSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kZWxDb250YWN0ID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKCdjb250YWN0LycgKyBpZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckaHR0cCcsXHJcbmZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgdGhpcy5nZXRQb2xpY3kgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAkaHR0cC5nZXQoJ2luZm8vcG9saWN5Jyk7XHJcbiAgfVxyXG5cclxuICB0aGlzLmdldFRlcm1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCdpbmZvL3Rlcm1zJyk7XHJcbiAgfVxyXG5cclxuICB0aGlzLmdldEZBUSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICRodHRwLmdldCgnaW5mby9mYXEnKTtcclxuICB9XHJcblxyXG5cclxuICB0aGlzLmdldENvdW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICRodHRwLmdldCgnY291bnRyaWVzL25hbWVzJyk7XHJcbiAgfVxyXG5cclxuICB0aGlzLmdldFN0YXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICRodHRwLmdldCgnY291bnRyaWVzL3N0YXRlcycpO1xyXG4gIH1cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRodHRwJywnRU5WJyxcclxuZnVuY3Rpb24oJGh0dHAsIEVOVikge1xyXG4gICAgdGhpcy5nZXRMb3R0ZXJpZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHBbRU5WLm1ldGhvZF0oRU5WLmFwaU9mZmVyICsgJy9kcmF3L3Byb2R1Y3QnKTtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldExhdGVzdFJlc3VsdHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvbGF0ZXN0LXJlc3VsdHMnKTtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldExhdGVzdFJlc3VsdHNEZXRhaWxzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL2xvdHRlcnktcmVzdWx0cy1kZXRhaWxzJyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZXRMYXRlc3RSZXN1bHRzRGV0YWlsc0J5RGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS9sb3R0ZXJ5LXJlc3VsdHMtZGV0YWlscy1ieS1kYXRlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0R3JvdXBQbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL2dyb3VwJyk7XHJcbiAgICB9O1xyXG5cclxufVxyXG5dOyIsIm1vZHVsZS5leHBvcnRzID0gWyckaHR0cCcsXHJcbiAgICBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdzYXZlT3BlcmF0b3JTZXR0aW5ncycsIHtvcGVyYXRvckNvbmZpZzpjb25maWd9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXSIsIm1vZHVsZS5leHBvcnRzID0gWyckaHR0cCcsICd1c2VyU2VydmljZScsICckcScsICdFTlYnLFxyXG5mdW5jdGlvbigkaHR0cCwgdXNlclNlcnZpY2UsICRxLCBFTlYpIHtcclxuXHJcbiAgICB0aGlzLmdldFBheW1lbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwW0VOVi5tZXRob2RdKEVOVi5hcGlBY3Rpdml0eSArICcvcGF5bWVudHMnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZFBheW1lbnQgPSBmdW5jdGlvbihwYXltZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoRU5WLmFwaVBheW1lbnRNZXRob2QgKyAnL2NyZWF0ZScsIHBheW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVsZXRlUGF5bWVudCA9IGZ1bmN0aW9uKHBheW1lbnRJZCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoJ2FwaS9wbGF5ZXIvYWN0aXZpdHkvcGF5bWVudHMvJyArIHBheW1lbnRJZCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoaXMudXBkYXRlUGF5bWVudCA9IGZ1bmN0aW9uKHBheW1lbnRJZCwgcGF5bWVudERhdGEpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAucHV0KCdhcGkvcGxheWVyL2FjdGl2aXR5L3BheW1lbnRzLycgKyBwYXltZW50SWQsIHBheW1lbnREYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoZWNrSWZVc2VySGFzUGF5bWVudE1ldGhvZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2NoZWNrSWZVc2VySGFzUGF5bWVudE1ldGhvZCcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbJyRodHRwJyxcclxuICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9tb3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgncHJvbW8nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9tbyA9IGZ1bmN0aW9uKHByb21vSWQsIHByb21vRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucHV0KCdwcm9tby8nICsgcHJvbW9JZCwge1xyXG4gICAgICAgICAgICAgICAgcHJvbW86IHByb21vRGF0YVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5ld1Byb21vID0gZnVuY3Rpb24ocHJvbW8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ3Byb21vJywge1xyXG4gICAgICAgICAgICAgICAgcHJvbW86IHByb21vXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVsUHJvbW8gPSBmdW5jdGlvbihwcm9tb0lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoJ3Byb21vLycgKyBwcm9tb0lkKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IFsnJGh0dHAnLFxyXG4gICAgZnVuY3Rpb24oJGh0dHApIHtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TG9jID0gZnVuY3Rpb24obG9jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ3Byb21vTG9jJywge3BhcmFtczp7XHJcbiAgICAgICAgICAgICAgICBsb2M6bG9jXHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvbUxvYyA9IGZ1bmN0aW9uKHByb21vcyxsb2MpIHtcclxuICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdwcm9tb0xvYycsIHtcclxuICAgICAgICAgICAgICAgIHByb21vczogcHJvbW9zLFxyXG4gICAgICAgICAgICAgICAgbG9jOiBsb2NcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dIiwibW9kdWxlLmV4cG9ydHMgPSBbXHJcbiAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5oYXNQYXltZW50TWV0aG9kID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNldEhhc1BheW1lbnRNZXRob2QgPSBmdW5jdGlvbihwYXltZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzUGF5bWVudE1ldGhvZCA9IHBheW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXTsiXX0=
