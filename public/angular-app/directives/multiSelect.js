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