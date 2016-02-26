module.exports = function() {
  return function (items, product) {
        var result = [];
        angular.forEach(items, function (value, key) {
            console.log(product);
        });
        return result;
    }
}

