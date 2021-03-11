/* global Fluid, CONFIG */

(function(window, document) {
  for (const each of document.querySelectorAll('main img[srcset]')) {
    Fluid.utils.waitElementVisible(each, function() {
      each.removeAttribute('srcset');
    }, CONFIG.lazyload.offset_factor);
  }
})(window, document);
