/* global Debouncer */

(function(window, document) {
  var runningOnBrowser = typeof window !== 'undefined';
  var supportsIntersectionObserver = runningOnBrowser && 'IntersectionObserver' in window;

  var images = Array.prototype.slice.call(document.querySelectorAll('img[srcset]'));
  if (!images || images.length === 0) {
    return;
  }

  if (supportsIntersectionObserver) {
    var io = new IntersectionObserver(function(changes) {
      changes.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.setAttribute('srcset', target.src);
        const oldLoad = target.onload;
        target.onload = function() {
          io.unobserve(target);
          oldLoad && oldLoad();
        };
      });
    }, {
      threshold : [0],
      rootMargin: (window.innerHeight || document.documentElement.clientHeight) + 'px'
    });
    images.map((item) => io.observe(item));
  } else {
    // eslint-disable-next-line no-inner-declarations
    function elementInViewport(el) {
      var rect = el.getBoundingClientRect();
      var height = window.innerHeight || document.documentElement.clientHeight;
      var top = rect.top;
      return (top >= 0 && top <= height * 3) || (top <= 0 && top <= -(height * 2) - rect.height);
    }

    // eslint-disable-next-line no-inner-declarations
    function loadImage(el, fn) {
      var img = new Image();
      var src = el.getAttribute('src');
      img.onload = function() {
        el.srcset = src;
        fn && fn();
      };
      img.srcset = src;
    }

    var lazyLoader = new Debouncer(processImages);

    // eslint-disable-next-line no-inner-declarations
    function processImages() {
      for (var i = 0; i < images.length; i++) {
        if (elementInViewport(images[i])) {
          // eslint-disable-next-line no-loop-func
          (function(index) {
            var loadingImage = images[index];
            loadImage(loadingImage, function() {
              images = images.filter(function(t) {
                return loadingImage !== t;
              });
            });
          })(i);
        }
      }
      if (images.length === 0) {
        window.removeEventListener('scroll', lazyLoader, false);
      }
    }

    window.addEventListener('scroll', lazyLoader, false);
    lazyLoader.handleEvent();
  }

})(window, document);
