$(document).ready(function() {
  particlesJS.load('particles-js', '../js/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
  $(".container>.jumbotron>p>a").on('click', function(){
    $('.container>.jumbotron>p>a').css('z-index', 0);
  });
});
