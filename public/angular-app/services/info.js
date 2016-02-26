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