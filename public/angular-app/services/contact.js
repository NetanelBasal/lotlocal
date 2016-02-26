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