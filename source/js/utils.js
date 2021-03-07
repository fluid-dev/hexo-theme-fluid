/* global Fluid, Debouncer */

Fluid.utils = {

  listenScroll: function(callback) {
    var dbc = new Debouncer(callback);
    window.addEventListener('scroll', dbc, false);
    dbc.handleEvent();
  },

  scrollToElement: function(target, offset) {
    var of = $(target).offset();
    if (of) {
      $('html,body').animate({
        scrollTop: of.top + (offset || 0),
        easing   : 'swing'
      });
    }
  },

  waitElementVisible: function(targetId, callback) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
        && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));
    var supportsIntersectionObserver = 'IntersectionObserver' in window;
    var attachEvent = 'attachEvent' in window;
    var addEventListener = 'addEventListener' in window;
    if (!isBot && runningOnBrowser && (attachEvent || addEventListener)) {
      var _listenScroll = function() {
        var _callback = function() {
          var _target = document.getElementById(targetId);
          var visibleBottom = window.scrollY + document.documentElement.clientHeight;
          var visibleTop = window.scrollY;
          var centerY = _target.offsetTop + (_target.offsetHeight / 2);
          if (centerY > visibleTop && centerY < visibleBottom) {
            if (attachEvent) {
              document.detachEvent('scroll', _callback);
            }
            if (addEventListener) {
              document.removeEventListener('scroll', _callback);
            }
            callback && callback();
          }
        };
        if (attachEvent) {
          document.attachEvent('scroll', _callback);
        }
        if (addEventListener) {
          document.addEventListener('scroll', _callback);
        }
      };
      if (supportsIntersectionObserver) {
        var io = new IntersectionObserver(function(entries, ob) {
          if (entries[0].intersectionRect.x <= 0) {
            _listenScroll();
          } else if (entries[0].isIntersecting) {
            callback && callback();
          }
          ob.disconnect();
        }, {
          threshold : [0],
          rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
        });
        io.observe(document.getElementById(targetId));
      } else {
        _listenScroll();
      }
    } else {
      callback && callback();
    }
  },

  waitElementLoaded: function(targetId, callback) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
    && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));
    if (!runningOnBrowser || isBot) {
      return;
    }

    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function(records, ob) {
        var ele = document.getElementById(targetId);
        if (ele) {
          callback && callback();
          ob.disconnect();
        }
      });
      mo.observe(document, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        callback && callback();
      });
    }
  },

  createScript: function(url, onload) {
    var s = document.createElement('script');
    s.setAttribute('src', url);
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('charset', 'UTF-8');
    s.async = false;
    if (typeof onload === 'function') {
      if (window.attachEvent) {
        s.onreadystatechange = function() {
          var e = s.readyState;
          if (e === 'loaded' || e === 'complete') {
            s.onreadystatechange = null;
            onload();
          }
        };
      } else {
        s.onload = onload;
      }
    }
    var e = document.getElementsByTagName('script')[0]
    || document.getElementsByTagName('head')[0]
    || document.head || document.documentElement;
    e.parentNode.insertBefore(s, e);
  },

  createCssLink: function(url) {
    var l = document.createElement('link');
    l.setAttribute('rel', 'stylesheet');
    l.setAttribute('type', 'text/css');
    l.setAttribute('href', url);
    var e = document.getElementsByTagName('link')[0]
    || document.getElementsByTagName('head')[0]
    || document.head || document.documentElement;
    e.parentNode.insertBefore(l, e);
  }

};
