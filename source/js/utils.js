// eslint-disable-next-line no-unused-vars
function waitElementVisible(targetId, callback) {
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
}

// eslint-disable-next-line no-unused-vars
function waitElementLoaded(targetId, callback) {
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
    var oldLoad = window.onload;
    window.onload = function() {
      oldLoad && oldLoad();
      callback && callback();
    };
  }
}

// eslint-disable-next-line no-unused-vars
function addScript(url, onload) {
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
}

// eslint-disable-next-line no-unused-vars
function addCssLink(url) {
  var l = document.createElement('link');
  l.setAttribute('rel', 'stylesheet');
  l.setAttribute('type', 'text/css');
  l.setAttribute('href', url);
  var e = document.getElementsByTagName('link')[0]
    || document.getElementsByTagName('head')[0]
    || document.head || document.documentElement;
  e.parentNode.insertBefore(l, e);
}
