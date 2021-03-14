/* global Fluid, CONFIG, Debouncer */

Fluid.utils = {

  listenScroll: function(callback) {
    if ('Debouncer' in window) {
      var dbc = new Debouncer(callback);
      window.addEventListener('scroll', dbc, false);
      dbc.handleEvent();
    } else {
      window.addEventListener('scroll', callback, false);
    }
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

  waitElementVisible: function(target, callback, heightFactor) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
        && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));
    var supportsIntersectionObserver = 'IntersectionObserver' in window;

    if (!runningOnBrowser || isBot) {
      callback && callback();
      return;
    }

    var _target;
    if (typeof target === 'string') {
      _target = document.getElementById(target);
    } else {
      _target = target;
    }

    var _heightFactor = heightFactor || 2;

    var _elementInViewport = function(el) {
      var rect = el.getBoundingClientRect();
      var height = window.innerHeight || document.documentElement.clientHeight;
      var top = rect.top;
      return (top >= 0 && top <= height * (_heightFactor + 1))
          || (top <= 0 && top >= -(height * _heightFactor) - rect.height);
    };

    if (_elementInViewport(_target)) {
      callback && callback();
      return;
    }

    var _listenScroll = function() {
      var _callback = function() {
        if (_elementInViewport(_target)) {
          window.removeEventListener('scroll', _callback);
          callback && callback();
        }
      };
      window.addEventListener('scroll', _callback);
    };

    if (supportsIntersectionObserver) {
      var io = new IntersectionObserver(function(entries, ob) {
        if (entries[0].intersectionRect.x <= 0) {
          if ('Debouncer' in window) {
            var dbc = new Debouncer(_listenScroll);
            dbc.handleEvent();
          } else {
            _listenScroll();
          }
        } else if (entries[0].isIntersecting) {
          callback && callback();
        }
        ob.disconnect();
      }, {
        threshold : [0],
        rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
      });
      io.observe(_target);
    } else {
      if ('Debouncer' in window) {
        var dbc = new Debouncer(_listenScroll);
        dbc.handleEvent();
      } else {
        _listenScroll();
      }
    }
  },

  waitElementLoaded: function(targetId, callback) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
    && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));

    if (!runningOnBrowser || isBot) {
      callback && callback();
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
  },

  lazyComments: function(eleId, loadFunc) {
    var ele = document.querySelector('#comments[lazyload]');
    if (ele) {
      var callback = function() {
        loadFunc && loadFunc();
        ele.removeAttribute('lazyload');
      };
      this.waitElementVisible(eleId, callback, CONFIG.lazyload.offset_factor);
    } else {
      loadFunc && loadFunc();
    }
  }

};
