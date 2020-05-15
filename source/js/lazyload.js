// eslint-disable-next-line no-unused-expressions
!(function(window, document) {
  var images = Array.prototype.slice.call(document.querySelectorAll('img[srcset]'));

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    var height = window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= height * 3
    );
  }

  function loadImage(el, fn) {
    var img = new Image();
    var src = el.getAttribute('src');
    img.onload = function() {
      el.srcset = src;
      fn && fn();
    };
    img.srcset = src;
  }

  // eslint-disable-next-line no-undef
  var lazyLoader = new Debouncer(processImages);

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

})(window, document);
