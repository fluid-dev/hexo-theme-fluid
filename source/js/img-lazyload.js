/* global Fluid, CONFIG */

(function(window, document) {
  for (const each of document.querySelectorAll('img[lazyload]')) {
    Fluid.utils.waitElementVisible(each, function() {
      each.removeAttribute('srcset');
      each.removeAttribute('lazyload');
    }, CONFIG.lazyload.offset_factor);
  }
})(window, document);
