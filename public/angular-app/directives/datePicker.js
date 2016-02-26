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