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