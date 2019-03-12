// initializer for parallax effect
(function($){
    $(function(){
  
      $('.sidenav').sidenav();
      $('.parallax').parallax();
  
    }); // end of document ready
  })(jQuery); // end of jQuery name space

// initializer for the carousel for events from eventbrite
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });

// initilize my form for eventBrite
$(document).ready(function(){
    $('select').formSelect();
});