/* global Fluid, Debouncer */

Fluid.utils = {

  listenScroll: function(callback) {
    const dbc = new Debouncer(callback);
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
    var supportsIntersectionObserver = runningOnBrowser && 'IntersectionObserver' in window;
    if (!isBot && supportsIntersectionObserver) {
      var io = new IntersectionObserver(function(entries, ob) {
        if (entries[0].isIntersecting) {
          callback && callback();
          ob.disconnect();
        }
      }, {
        threshold : [0],
        rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
      });
      io.observe(document.getElementById(targetId));
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
  },

  transition: function(target, type, complete) {
	var animation = {}
	var display = 'none'
	switch(type) {
	  case 0:
		animation = {opacity: [1, 0]}
	  break;
	  case 1:
		animation = {opacity: [0, 1]}
		display = 'block'
	  break;
	  case 'bounceUpIn':
		animation = {
		  begin: function(anim) {
			target.display('block')
		  },
		  translateY: [
			{ value: -60, duration: 200 },
			{ value: 10, duration: 200 },
			{ value: -5, duration: 200 },
			{ value: 0, duration: 200 }
		  ],
		  opacity: [0, 1]
		}
		display = 'block'
	  break;
	  case 'shrinkIn':
		animation = {
		  begin: function(anim) {
			target.display('block')
		  },
		  scale: [
			{ value: 1.1, duration: 300 },
			{ value: 1, duration: 200 }
		  ],
		  opacity: 1
		}
		display = 'block'
	  break;
	  case 'slideRightIn':
		animation = {
		  begin: function(anim) {
			target.display('block')
		  },
		  translateX: [100, 0],
		  opacity: [0, 1]
		}
		display = 'block'
	  break;
	  case 'slideRightOut':
		animation = {
		  translateX: [0, 100],
		  opacity: [1, 0]
		}
	  break;
	  default:
		animation = type
		display = type.display
	  break;
	}
	anime(Object.assign({
	  targets: target,
	  duration: 200,
	  easing: 'linear'
	}, animation)).finished.then(function() {
		target.display(display)
		complete && complete()
	  });
  }

};
