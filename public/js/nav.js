// http://responsive-sass-nav.com/

$(document).ready(function() {
   $(document).on('click', 'a.mobile_nav', function () {
       $('.business_nav').toggleClass('clicked')
   });
  $('.mobile').click(function () {
      $('.main_nav').toggleClass('active'); 
   });
   $('nav ul li ul').each(function() {
    $(this).before('<span class=\"arrow\"></span>');
  });
  $('nav ul li').click(function() {
    $(this).children('ul').toggleClass('active');
     $(this).children('.arrow').toggleClass('rotate');
  });
  $('section ul li ul').each(function() {
    $(this).before('<span class=\"arrow\"></span>');
  });
  
 $('section ul li').click(function(){
  $(this).children('ul').toggleClass('clicked');
  $(this).children('.arrow').toggleClass('rotate');
   })
});
