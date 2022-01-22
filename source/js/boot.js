/* global Fluid */

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
  Fluid.plugins.initAnchor();
  Fluid.plugins.initTocBot();
  Fluid.plugins.initImageCaption();
  Fluid.plugins.initFancyBox();
  Fluid.plugins.initCopyCode();
};

document.addEventListener('DOMContentLoaded', function() {
  Fluid.boot.registerEvents();
  Fluid.boot.initPlugins();
});
