/* global Fluid, CONFIG */

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

Fluid.utils = {

  listenScroll: function(callback) {
    var dbc = new Debouncer(callback);
    window.addEventListener('scroll', dbc, false);
    dbc.handleEvent();
    return dbc;
  },

  unlistenScroll: function(callback) {
    window.removeEventListener('scroll', callback);
  },

  scrollToElement: function(target, offset) {
    var of = jQuery(target).offset();
    if (of) {
      jQuery('html,body').animate({
        scrollTop: of.top + (offset || 0),
        easing   : 'swing'
      });
    }
  },

  elementVisible: function(element, offsetFactor) {
    offsetFactor = (offsetFactor && offsetFactor >= 1) ? offsetFactor : 1;
    var rect = element.getBoundingClientRect();
    var height = window.innerHeight || document.documentElement.clientHeight;
    var top = rect.top;
    return (top >= 0 && top <= height * (offsetFactor + 1))
      || (top <= 0 && top >= -(height * offsetFactor) - rect.height);
  },

  waitElementVisible: function(selectorOrElement, callback, offsetFactor) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) ||
      (typeof navigator !== 'undefined' && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));

    if (!runningOnBrowser || isBot) {
      return;
    }

    offsetFactor = (offsetFactor && offsetFactor >= 1) ? offsetFactor : 2;

    function waitInViewport(element) {
      if (Fluid.utils.elementVisible(element, offsetFactor)) {
        callback();
        return;
      }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries, ob) {
          if (entries[0].isIntersecting) {
            callback();
            ob.disconnect();
          }
        }, {
          threshold : [0],
          rootMargin: (window.innerHeight || document.documentElement.clientHeight) * offsetFactor + 'px'
        });
        io.observe(element);
      } else {
        var wrapper = Fluid.utils.listenScroll(function() {
          if (Fluid.utils.elementVisible(element, offsetFactor)) {
            Fluid.utils.unlistenScroll(wrapper);
            callback();
          }
        });
      }
    }

    if (typeof selectorOrElement === 'string') {
      this.waitElementLoaded(selectorOrElement, function(element) {
        waitInViewport(element);
      });
    } else {
      waitInViewport(selectorOrElement);
    }
  },

  waitElementLoaded: function(selector, callback) {
    var runningOnBrowser = typeof window !== 'undefined';
    var isBot = (runningOnBrowser && !('onscroll' in window)) ||
      (typeof navigator !== 'undefined' && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));

    if (!runningOnBrowser || isBot) {
      return;
    }

    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function(records, ob) {
        var ele = document.querySelector(selector);
        if (ele) {
          callback(ele);
          ob.disconnect();
        }
      });
      mo.observe(document, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        var ele = document.querySelector(selector);
        if (ele) {
          callback(ele);
        }
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

/**
 * Handles debouncing of events via requestAnimationFrame
 * @see http://www.html5rocks.com/en/tutorials/speed/animations/
 * @param {Function} callback The callback to handle whichever event
 */
function Debouncer(callback) {
  this.callback = callback;
  this.ticking = false;
}
Debouncer.prototype = {
  constructor: Debouncer,

  /**
   * dispatches the event to the supplied callback
   * @private
   */
  update: function() {
    this.callback && this.callback();
    this.ticking = false;
  },

  /**
   * ensures events don't get stacked
   * @private
   */
  requestTick: function() {
    if (!this.ticking) {
      requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
      this.ticking = true;
    }
  },

  /**
   * Attach this as the event listeners
   */
  handleEvent: function() {
    this.requestTick();
  }
};
