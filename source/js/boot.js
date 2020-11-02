/* global Fluid, CONFIG */

Fluid.boot = {};

Fluid.boot.registerEvents = function() {
  Fluid.events.registerNavbarEvent();
  Fluid.events.registerParallaxEvent();
  Fluid.events.registerScrollDownArrowEvent();
  Fluid.events.registerScrollTopArrowEvent();
};

Fluid.boot.refresh = function() {
  CONFIG.toc.enable && Fluid.plugins.initTocBot();
  CONFIG.image_zoom && Fluid.plugins.wrapImageWithFancyBox();
  CONFIG.anchorjs.enable && Fluid.plugins.registerAnchor();
  CONFIG.copy_btn && Fluid.plugins.registerCopyCode();
};

document.addEventListener('DOMContentLoaded', function() {
  Fluid.boot.registerEvents();
  Fluid.boot.refresh();

  window.NProgress && window.NProgress.inc();
});
