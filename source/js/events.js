/* global Fluid */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

Fluid.events = {

  registerNavbarEvent: function() {
    var navbar = $('#navbar');
    var submenu = $('#navbar .dropdown-menu');
    if (navbar.offset().top > 0) {
      navbar.removeClass('navbar-dark');
      submenu.removeClass('navbar-dark');
    }
    Fluid.utils.listenScroll(function() {
      navbar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
      submenu[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('dropdown-collapse');
      if (navbar.offset().top > 0) {
        navbar.removeClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      } else {
        navbar.addClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      }
    });
    $('#navbar-toggler-btn').on('click', function() {
      $('.animated-icon').toggleClass('open');
      $('#navbar').toggleClass('navbar-col-show');
    });
  },

  registerParallaxEvent: function() {
    var target = $('#background[parallax="true"]');
    var parallax = function() {
      var oVal = $(window).scrollTop() / 5;
      var offset = parseInt($('#board').css('margin-top'), 0);
      var max = 96 + offset;
      if (oVal > max) {
        oVal = max;
      }
      target.css({
        transform          : 'translate3d(0,' + oVal + 'px,0)',
        '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
        '-ms-transform'    : 'translate3d(0,' + oVal + 'px,0)',
        '-o-transform'     : 'translate3d(0,' + oVal + 'px,0)'
      });

      var toc = $('#toc');
      if (toc) {
        $('#toc-ctn').css({
          'padding-top': oVal + 'px'
        });
      }
    };
    if (target.length > 0) {
      Fluid.utils.listenScroll(parallax);
    }
  },

  registerScrollDownArrowEvent: function() {
    $('.scroll-down-bar').on('click', function() {
      Fluid.utils.scrollToElement('#board', -$('#navbar').height());
    });
  },

  registerScrollTopArrowEvent: function() {
    var topArrow = $('#scroll-top-button');
    if (!topArrow) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Position
    var setTopArrowPos = function() {
      var boardRight = document.getElementById('board').getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
        'right' : right - 64 + 'px'
      });
    };
    setTopArrowPos();
    $(window).resize(setTopArrowPos);
    // Display
    var headerHeight = $('#board').offset().top;
    Fluid.utils.listenScroll(function() {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
      });
    });
    // Click
    topArrow.on('click', function() {
      $('body,html').animate({
        scrollTop: 0,
        easing   : 'swing'
      });
    });
  }
};
