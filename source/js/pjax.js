/* global Fluid, CONFIG, jQuery, NProgress */

(function() {
  if (!CONFIG.pjax || !CONFIG.pjax.enable) { return; }
  if (!('pjax' in jQuery)) { return; }

  var pjaxContainer = '#pjax-wrapper';

  // ─── Exclusion selectors ────────────────────────────────────────────────────
  var defaultExcludes = [
    'a[target="_blank"]',
    'a[download]',
    'a[href^="javascript"]',
    'a[href^="mailto"]',
    'a[href^="tel"]',
    'a[data-no-pjax]'
  ];
  var userExcludes = (CONFIG.pjax.exclude || []).map(function(s) { return s.trim(); }).filter(Boolean);
  var excludeSelector = defaultExcludes.concat(userExcludes).join(', ');

  // ─── Init pjax ──────────────────────────────────────────────────────────────
  jQuery(document).pjax('a:not(' + excludeSelector + ')', {
    container : pjaxContainer,
    fragment  : pjaxContainer,
    timeout   : 8000,
    scrollTo  : false
  });

  // ─── Scroll position management ──────────────────────────────────────────────
  // Save scroll position of every page before leaving, keyed by URL.
  var _scrollMap = {};

  // Before leaving current page, save its scroll position (must use beforeSend so URL hasn't changed yet)
  jQuery(document).on('pjax:beforeSend', function() {
    _scrollMap[window.location.href] = document.documentElement.scrollTop || document.body.scrollTop;
  });

  jQuery(document).on('pjax:send', function() {
    window.NProgress && NProgress.start();
  });

  jQuery(document).on('pjax:complete', function() {
    window.NProgress && NProgress.done();
  });

  // ─── Scroll-listener registry ─────────────────────────────────────────────
  var _scrollListeners = [];

  function clearScrollListeners() {
    _scrollListeners.forEach(function(dbc) {
      window.removeEventListener('scroll', dbc);
    });
    _scrollListeners = [];
  }

  var _origListenScroll = Fluid.utils.listenScroll.bind(Fluid.utils);
  Fluid.utils.listenScroll = function(callback) {
    var dbc = _origListenScroll(callback);
    _scrollListeners.push(dbc);
    return dbc;
  };

  // ─── After navigation ────────────────────────────────────────────────────────
  jQuery(document).on('pjax:success', function() {
    var currentHref = window.location.href;

    // 1. Restore scroll position for this URL (0 if never visited before)
    window.scrollTo(0, _scrollMap[currentHref] || 0);

    // 2. Clear old scroll listeners
    clearScrollListeners();

    // 3. Re-bind per-page events
    Fluid.events.registerNavbarScrollEvent();
    Fluid.events.registerParallaxEvent();
    Fluid.events.registerScrollDownArrowEvent();
    Fluid.events.registerScrollTopArrowEvent();
    Fluid.events.registerImageLoadedEvent();

    // 4. Re-run plugins
    Fluid.boot.refresh();

    // 5. Re-init typed subtitle
    var subtitle = document.getElementById('subtitle');
    if (subtitle && 'Typed' in window && CONFIG.typing && CONFIG.typing.enable) {
      var text = subtitle.getAttribute('data-typed-text');
      if (text) {
        Fluid.plugins.typing(text);
      }
    }

    // 6. Update navbar active state
    var currentPath = window.location.pathname;
    jQuery('#navbar .nav-link').each(function() {
      var $a = jQuery(this);
      var href = $a.attr('href') || '';
      try { href = new URL(href, window.location.origin).pathname; } catch (e) { /* noop */ }
      $a.toggleClass('active-nav', href !== '/' && currentPath.indexOf(href) === 0);
    });

    // 7. Re-trigger img-lazyload
    if ('LazyLoad' in window) {
      new window.LazyLoad({ elements_selector: 'img[lazyload]' });
    } else {
      jQuery(pjaxContainer + ' img[lazyload]').each(function() {
        var $img = jQuery(this);
        var src = $img.attr('data-src') || $img.attr('data-original');
        if (src) { $img.attr('src', src).removeAttr('lazyload'); }
      });
    }
  });

  // ─── Handle pjax errors gracefully ──────────────────────────────────────────
  jQuery(document).on('pjax:error', function(e, xhr, textStatus) {
    if (textStatus !== 'abort') {
      window.location.href = jQuery.pjax.state && jQuery.pjax.state.url
        ? jQuery.pjax.state.url
        : window.location.href;
    }
  });

})();
