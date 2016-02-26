'use strict'


module.exports = function() {
  return {
    restrict: 'A',
    link:function($scope,element) {
     var element = $(element);
     var top = element.offset().top;
     $(window).on('scroll', function() {
      if($(window).scrollTop() >= top ) {
        element.addClass('sticky');
      }else {
        element.removeClass('sticky');
      }
    })
   }
 }
}