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

  unlistenScroll: function(callback) {
    window.removeEventListener('scroll', callback);
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

  elementInViewport: function(element, heightFactor) {
    heightFactor = heightFactor || 1;
    var rect = element.getBoundingClientRect();
    var height = window.innerHeight || document.documentElement.clientHeight;
    var top = rect.top;
    return (top >= 0 && top <= height * (heightFactor + 1))
      || (top <= 0 && top >= -(height * heightFactor) - rect.height);
  },

  waitElementVisible: function(selectorsOrElement, callback, heightFactor) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
        && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));
    var supportsIntersectionObserver = 'IntersectionObserver' in window;

    if (!runningOnBrowser || isBot) {
      callback();
      return;
    }

    var target;
    if (typeof selectorsOrElement === 'string') {
      target = document.querySelector(selectorsOrElement);
    } else {
      target = selectorsOrElement;
    }

    var _heightFactor = heightFactor || 2;

    if (Fluid.utils.elementInViewport(target, _heightFactor)) {
      callback();
      return;
    }

    if (supportsIntersectionObserver) {
      var io = new IntersectionObserver(function(entries, ob) {
        if (entries[0].isIntersecting) {
          callback();
          ob.disconnect();
        }
      }, {
        threshold : [0],
        rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
      });
      io.observe(target);
    } else {
      var _callback = function() {
        if (Fluid.utils.elementInViewport(target, _heightFactor)) {
          Fluid.utils.unlistenScroll(_callback);
          callback();
        }
      };
      Fluid.utils.listenScroll(_callback);
    }
  },

  waitElementLoaded: function(targetId, callback) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
    && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));

    if (!runningOnBrowser || isBot) {
      callback();
      return;
    }

    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function(records, ob) {
        var ele = document.getElementById(targetId);
        if (ele) {
          callback();
          ob.disconnect();
        }
      });
      mo.observe(document, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        callback();
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

  loadComments: function(selectors, loadFunc) {
    var ele = document.querySelector('#comments[lazyload]');
    if (ele) {
      var callback = function() {
        loadFunc();
        ele.removeAttribute('lazyload');
      };
      Fluid.utils.waitElementVisible(selectors, callback, CONFIG.lazyload.offset_factor);
    } else {
      loadFunc();
    }
  }

};
