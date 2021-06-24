/* global Fluid, CONFIG */

Fluid.boot = {};

Fluid.boot.registerEvents = function() {
  Fluid.events.billboard();
  Fluid.events.registerNavbarEvent();
  Fluid.events.registerParallaxEvent();
  Fluid.events.registerScrollDownArrowEvent();
  Fluid.events.registerScrollTopArrowEvent();
  Fluid.events.registerImageLoadedEvent();
};

Fluid.boot.initPlugins = function() {
  CONFIG.anchorjs.enable && Fluid.plugins.initAnchor();
  CONFIG.toc.enable && Fluid.plugins.initTocBot();
  CONFIG.image_zoom.enable && Fluid.plugins.initFancyBox();
  CONFIG.copy_btn && Fluid.plugins.initCopyCode();
};

document.addEventListener('DOMContentLoaded', function() {
  Fluid.boot.registerEvents();
  Fluid.boot.initPlugins();
});
