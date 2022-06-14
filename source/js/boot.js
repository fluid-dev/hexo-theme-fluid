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

Fluid.boot.refreshPlugins = function() {
  Fluid.plugins.fancyBox();
  Fluid.plugins.codeWidget();

  if ('tocbot' in window) {
    tocbot.refresh();
    var toc = jQuery('#toc');
    if (toc.length === 0 || !tocbot) { return; }
    if (toc.find('.toc-list-item').length > 0) {
      toc.css('visibility', 'visible');
    }
  }

  if ('anchors' in window) {
    anchors.removeAll();
    var el = (CONFIG.anchorjs.element || 'h1,h2,h3,h4,h5,h6').split(',');
    var res = [];
    for (var item of el) {
      res.push('.markdown-body > ' + item.trim());
    }
    if (CONFIG.anchorjs.placement === 'left') {
      anchors.options.class = 'anchorjs-link-left';
    }
    anchors.add(res.join(', '));
  }

  if ('MathJax' in window && MathJax.startup.document && typeof MathJax.startup.document.state === 'function') {
    MathJax.startup.document.state(0);
    MathJax.texReset();
    MathJax.typeset();
    MathJax.typesetPromise();
  }

  if ('mermaid' in window) {
    mermaid.init();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  Fluid.boot.registerEvents();
});
