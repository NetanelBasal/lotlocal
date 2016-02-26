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