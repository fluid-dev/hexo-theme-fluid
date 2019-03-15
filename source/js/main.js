$(document).ready(function () {
  // var navbar = $("#navbar");
  // $(window).scroll(function(){
  //   if(navbar.offset().top > 0) {
  //     navbar.addClass("navbar-light");
  //     navbar.removeClass("navbar-dark");
  //   } else {
  //     navbar.addClass("navbar-dark");
  //     navbar.removeClass("navbar-light");
  //   }
  // })
  $('#navbar-toggler-btn').on('click', function () {
    $('.animated-icon').toggleClass('open');
    $('#navbar').toggleClass('navbar-col-show');
  });
});