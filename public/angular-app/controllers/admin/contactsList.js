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