'use strict'


module.exports = function() {
  return {
    restrict: 'A',
    link:function($scope,element) {
    //  $(window).scroll(function(){
    //   console.log($(window).scrollTop());
    //   if($(window).scrollTop() > 430 ) {
    //     $(element).css('top', $(window).scrollTop() - 400);
    //   }else {
    //     $(element).css('top', 0);
    //   }
    // });
$(".info-nav").sticky({topSpacing:10, bottomSpacing:400});


}
}
}