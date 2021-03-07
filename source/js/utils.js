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
    const runningOnBrowser = typeof window !== 'undefined',
        isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
        && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent)),
        supportsIntersectionObserver = 'IntersectionObserver' in window,
        attachEvent = 'attachEvent' in window,
        addEventListener = 'addEventListener' in window;
    if (!isBot && runningOnBrowser && (attachEvent || addEventListener)) {
        function _scroll() {
            if(attachEvent)document.attachEvent("scroll", _callback);
            if(addEventListener)document.addEventListener('scroll', _callback);
            function _callback() {
                const _target = document.getElementById(targetId);
                //滚动条高度+视窗高度 = 可见区域底部高度
                let visibleBottom = window.scrollY + document.documentElement.clientHeight;
                //可见区域顶部高度
                let visibleTop = window.scrollY;
                let centerY = _target.offsetTop + (_target.offsetHeight / 2);
                if (centerY > visibleTop && centerY < visibleBottom) {
                    if(attachEvent)document.detachEvent('scroll', _callback);
                    if(addEventListener)document.removeEventListener('scroll', _callback);
                    callback && callback();
                }
            }
        }
        if(supportsIntersectionObserver){
          var io = new IntersectionObserver(function(entries, ob) {
            //如果失败，回退到scroll方式
            if(entries[0].intersectionRect.x <= 0){_scroll();ob.disconnect();return;}
            if (entries[0].isIntersecting) {
              callback && callback();
              ob.disconnect();
            }
          }, {
            threshold : [0],
            rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
          });
          io.observe(document.getElementById(targetId));
        }else{
            _scroll();
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
