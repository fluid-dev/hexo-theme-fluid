/* global Fluid, CONFIG, NProgress, Swup */

(function() {
  if (!CONFIG.pjax || !CONFIG.pjax.enable) { return; }
  if (typeof Swup === 'undefined') { return; }

  var pjaxContainer = '#pjax-wrapper';

  // ─── Exclusion selectors ────────────────────────────────────────────────────
  // swup automatically excludes: target="_blank", download, cross-origin, javascript:, mailto:, tel:
  // We only need to handle data-no-pjax and user-configured selectors
  var userExcludes = (CONFIG.pjax.exclude || []).map(function(s) { return s.trim(); }).filter(Boolean);

  // ─── Init swup ──────────────────────────────────────────────────────────────
  var swup = new Swup({
    containers       : [pjaxContainer],
    animationSelector: false,
    cache            : false,
    timeout          : 8000,
    ignoreVisit      : function(url, ref) {
      var el = ref && ref.el;
      if (!el) { return false; }
      if (el.closest('[data-no-pjax]')) { return true; }
      return userExcludes.some(function(sel) {
        try { return el.matches(sel); } catch(e) { return false; }
      });
    }
  });

  // ─── Scroll position management ──────────────────────────────────────────────
  // Save scroll position of every page before leaving, keyed by URL.
  var _scrollMap = {};

  // Before leaving current page, save its scroll position.
  // link:click fires before history.pushState, so window.location.href is still the current page.
  swup.hooks.on('link:click', function() {
    _scrollMap[window.location.href] = document.documentElement.scrollTop || document.body.scrollTop;
  });

  swup.hooks.on('visit:start', function() {
    window.NProgress && NProgress.start();
  });

  swup.hooks.on('visit:end', function() {
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
  // page:view fires after new content is inserted and visible — correct hook for DOM re-init
  swup.hooks.on('page:view', function() {
    // 0a. Destroy any existing Typed instance.
    //    typed.ejs IIFE lives in scripts.ejs (outside #pjax-wrapper) and runs ONCE on the
    //    initial page load. On every PJAX swap, #pjax-wrapper is replaced, so #subtitle is a
    //    brand-new DOM node. The old Typed instance still holds a reference to the previous
    //    (now-detached) #subtitle; keeping it alive wastes CPU and blocks re-init on return.
    if (window._fluidTypedInstance) {
      try { window._fluidTypedInstance.destroy(); } catch(e) { /* noop */ }
      window._fluidTypedInstance = null;
    }

    // 0b. Reset per-page refresh callbacks before re-executing scripts.
    //    Each page load re-registers callbacks like tocbot.refresh(); without clearing first,
    //    the array grows on every navigation and each callback fires multiple times.
    Fluid.events._refreshCallbacks = [];

    // Re-execute inline script snippets injected inside #pjax-wrapper.
    //    swup does NOT execute <script> tags when replacing DOM content (browser security model).
    //    For external scripts, createScript() will detect they are already loaded and call onload
    //    synchronously instead of re-adding a duplicate <script src> tag.
    document.querySelectorAll(pjaxContainer + ' script:not([src])').forEach(function(original) {
      var s = document.createElement('script');
      s.textContent = original.textContent;
      document.head.appendChild(s);
      document.head.removeChild(s);
    });

    var currentHref = window.location.href;

    // 1. Restore scroll position for this URL (0 if never visited before)
    window.scrollTo(0, _scrollMap[currentHref] || 0);

    // 2. Clear old scroll listeners
    clearScrollListeners();

    // 3. Re-bind per-page events
    Fluid.events.registerNavbarScrollEvent();
    Fluid.boot.registerPageEvents();

    // 4. Re-run plugins
    Fluid.boot.refresh();

    // 5. Update navbar active state
    var currentPath = window.location.pathname;
    document.querySelectorAll('#navbar .nav-link').forEach(function(a) {
      var href = a.getAttribute('href') || '';
      try { href = new URL(href, window.location.origin).pathname; } catch(e) { /* noop */ }
      a.classList.toggle('active-nav', href !== '/' && currentPath.indexOf(href) === 0);
    });

    // 6. Re-trigger img-lazyload
    if ('LazyLoad' in window) {
      new window.LazyLoad({ elements_selector: 'img[lazyload]' });
    } else {
      document.querySelectorAll(pjaxContainer + ' img[lazyload]').forEach(function(img) {
        var src = img.getAttribute('data-src') || img.getAttribute('data-original');
        if (src) { img.setAttribute('src', src); img.removeAttribute('lazyload'); }
      });
    }

    // 7. Re-initialize typing animation.
    //    The typed.ejs IIFE (in scripts.ejs, outside #pjax-wrapper) only fires on the very
    //    first page load. After every PJAX swap we must re-init manually for pages that carry
    //    a typed subtitle (banner.ejs renders #subtitle[data-typed-text] only when in-scope).
    var typedEl = document.querySelector('#subtitle[data-typed-text]');
    if (typedEl && CONFIG.typing && CONFIG.typing.enable) {
      var typedText = typedEl.getAttribute('data-typed-text');
      Fluid.utils.createScript(CONFIG.typing.src, function() {
        Fluid.plugins.typing(typedText);
      });
    }
  });

  // ─── Handle errors gracefully ──────────────────────────────────────────────
  swup.hooks.on('fetch:error', function(visit) {
    window.location.assign(visit && visit.to && visit.to.url
      ? visit.to.url
      : window.location.href);
  });

})();
