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