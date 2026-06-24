/* global Fluid, CONFIG */

Fluid.boot = {};

Fluid.boot.registerEvents = function() {
  Fluid.events.billboard();
  Fluid.events.registerNavbarEvent();
  Fluid.boot.registerPageEvents();
  Fluid.events.registerCategoryCollapseEvent();
};

Fluid.boot.registerPageEvents = function() {
  Fluid.events.registerParallaxEvent();
  Fluid.events.registerScrollDownArrowEvent();
  Fluid.events.registerScrollTopArrowEvent();
  Fluid.events.registerImageLoadedEvent();
};

Fluid.boot.initLazyload = function() {
  if (!CONFIG.lazyload || !CONFIG.lazyload.enable) { return; }
  for (const each of document.querySelectorAll('img[lazyload]')) {
    Fluid.utils.waitElementVisible(each, function() {
      each.removeAttribute('srcset');
      each.removeAttribute('lazyload');
    }, CONFIG.lazyload.offset_factor);
  }
};

Fluid.boot.refresh = function() {
  Fluid.plugins.fancyBox();
  Fluid.plugins.codeWidget();
  Fluid.events.refresh();
  Fluid.events.registerCategoryCollapseEvent();
  Fluid.boot.initLazyload();
};

document.addEventListener('DOMContentLoaded', function() {
  Fluid.boot.registerEvents();
});
