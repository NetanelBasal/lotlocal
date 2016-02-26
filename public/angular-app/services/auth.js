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