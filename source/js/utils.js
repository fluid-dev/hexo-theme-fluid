// eslint-disable-next-line no-unused-vars
function createObserver(func, obid) {
  var runningOnBrowser = typeof window !== 'undefined';
  var isBot = (runningOnBrowser && !('onscroll' in window)) || (typeof navigator !== 'undefined'
    && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent));
  var supportsIntersectionObserver = runningOnBrowser && 'IntersectionObserver' in window;
  if (!isBot && supportsIntersectionObserver) {
    var io = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        func();
        io.disconnect();
      }
    }, {
      threshold : [0],
      rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
    });
    io.observe(document.getElementById(obid));
  } else {
    func();
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
