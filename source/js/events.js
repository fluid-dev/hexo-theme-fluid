/* global Fluid */

var _navTogglerData = new WeakMap();
var _scrollTopArrowResizeHandler = null;
var _dropdownListenerRegistered = false;
var _categoryHashListenerRegistered = false;

function setCategoryCollapse(trigger, target, show) {
  target.classList.toggle('show', show);
  trigger.classList.toggle('collapsed', !show);
  trigger.setAttribute('aria-expanded', show ? 'true' : 'false');
}

function openCategoryByHash() {
  if (!window.location.hash) {
    return;
  }

  var target = document.getElementById(window.location.hash.slice(1));
  if (!target || !target.classList.contains('category-collapse')) {
    return;
  }

  // 直接访问子分类锚点时，需要同步展开所有父级折叠容器。
  for (var el = target; el; el = el.parentElement) {
    if (el.classList && el.classList.contains('category-collapse')) {
      var trigger = document.querySelector('.category-item-action[href="#' + el.id + '"]');
      if (trigger) {
        setCategoryCollapse(trigger, el, true);
      }
    }
  }
}

function closeMobileGridMenu(mobileGridMenu) {
  mobileGridMenu.classList.remove('show');
  document.querySelectorAll('.animated-icon').forEach(function(el) {
    el.classList.remove('open');
  });
  document.body.classList.remove('mobile-menu-open');
}

Fluid.events = {

  registerCategoryCollapseEvent: function() {
    document.querySelectorAll('.category-list').forEach(function(list) {
      if (list.dataset.categoryCollapseBound) {
        return;
      }
      list.dataset.categoryCollapseBound = '1';
      list.addEventListener('click', function(e) {
        var trigger = e.target.closest('.category-item-action[data-toggle="collapse"]');
        if (!trigger || !list.contains(trigger)) {
          return;
        }

        var target = document.getElementById((trigger.getAttribute('href') || '').slice(1));
        if (!target) {
          return;
        }

        e.preventDefault();
        setCategoryCollapse(trigger, target, !target.classList.contains('show'));
      });
    });

    openCategoryByHash();
    if (!_categoryHashListenerRegistered) {
      _categoryHashListenerRegistered = true;
      window.addEventListener('hashchange', openCategoryByHash);
    }
  },

  registerNavbarScrollEvent: function() {
    var navbar = document.getElementById('navbar');
    if (!navbar) {
      return;
    }
    var submenu = document.querySelector('#navbar .dropdown-menu');
    // Set initial state based on current scroll position
    if (window.scrollY > 0) {
      navbar.classList.remove('navbar-dark');
      if (submenu) { submenu.classList.remove('navbar-dark'); }
    } else {
      navbar.classList.add('navbar-dark');
    }
    Fluid.utils.listenScroll(function() {
      navbar.classList.toggle('top-nav-collapse', window.scrollY > 50);
      if (submenu) { submenu.classList.toggle('dropdown-collapse', window.scrollY > 50); }
      if (window.scrollY > 0) {
        navbar.classList.remove('navbar-dark');
        if (submenu) { submenu.classList.remove('navbar-dark'); }
      } else {
        navbar.classList.add('navbar-dark');
        if (submenu) { submenu.classList.remove('navbar-dark'); }
      }
    });
  },

  registerNavbarEvent: function() {
    var navbar = document.getElementById('navbar');
    if (!navbar) {
      return;
    }

    // Register scroll-driven state (also called on pjax navigation)
    Fluid.events.registerNavbarScrollEvent();

    var mobileGridMenu = document.getElementById('mobile-grid-menu');

    document.getElementById('navbar-toggler-btn').addEventListener('click', function() {
      var btn = this;
      if ((_navTogglerData.get(btn) || {}).animating) {
        return;
      }
      _navTogglerData.set(btn, { animating: true });
      document.querySelectorAll('.animated-icon').forEach(function(el) {
        el.classList.toggle('open');
      });

      // On mobile use grid menu; on desktop keep original collapse behavior
      if (window.innerWidth < 992) {
        navbar.classList.add('top-nav-collapse');
        mobileGridMenu.classList.toggle('show');
        // Apply staggered animation delays when opening
        if (mobileGridMenu.classList.contains('show')) {
          mobileGridMenu.querySelectorAll('.mobile-grid-cell, .mobile-grid-group-header').forEach(function(el, i) {
            el.style.animationDelay = (i * 20) + 'ms';
          });
        }
        // Prevent body scroll when menu is open
        document.body.classList.toggle('mobile-menu-open', mobileGridMenu.classList.contains('show'));
      } else {
        navbar.classList.toggle('navbar-col-show');
      }

      setTimeout(function() {
        _navTogglerData.set(btn, { animating: false });
      }, 300);
    });

    // Close grid menu when a link inside it is clicked (event delegation via closest())
    mobileGridMenu.addEventListener('click', function(e) {
      var link = e.target.closest('a[href]');
      if (link && link.getAttribute('href') !== 'javascript:;') {
        closeMobileGridMenu(mobileGridMenu);
        navbar.classList.remove('top-nav-collapse');
        var toggler = document.getElementById('navbar-toggler-btn');
        if (toggler) { _navTogglerData.set(toggler, { animating: false }); }
      }
    });

    // Close grid menu on resize to desktop (D-07: direct bind, no cleanup needed)
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 992 && mobileGridMenu.classList.contains('show')) {
        closeMobileGridMenu(mobileGridMenu);
      }
    });

    // Native dropdown handler (event delegation on document, registered once)
    if (!_dropdownListenerRegistered) {
      _dropdownListenerRegistered = true;
      document.addEventListener('click', function(e) {
        var toggle = e.target.closest('.dropdown-toggle[data-toggle="dropdown"]');
        var wasOpen = toggle && toggle.getAttribute('aria-expanded') === 'true';
        // Close all open dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(function(m) { m.classList.remove('show'); });
        document.querySelectorAll('[data-toggle="dropdown"][aria-expanded="true"]').forEach(function(t) { t.setAttribute('aria-expanded', 'false'); });
        // Open clicked toggle if it was not already open
        if (toggle && !wasOpen) {
          e.preventDefault();
          var menu = toggle.parentElement.querySelector('.dropdown-menu');
          if (menu) {
            menu.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  },

  registerParallaxEvent: function() {
    var ph = document.querySelector('#banner[parallax="true"]');
    if (!ph) {
      return;
    }
    var board = document.getElementById('board');
    if (!board) {
      return;
    }
    // Cache layout-triggering reads once at init, not per-frame
    var offset = parseInt(getComputedStyle(board).marginTop, 10);
    // Select the side-col that actually contains the sidebar (TOC),
    // not the first .side-col (which is the empty left column)
    var sidebar = document.querySelector('.sidebar');
    var sideCol = sidebar ? sidebar.closest('.side-col') : null;
    var parallax = function() {
      var pxv = window.scrollY / 5;
      var max = 96 + offset;
      if (pxv > max) {
        pxv = max;
      }
      ph.style.transform = 'translate3d(0,' + pxv + 'px,0)';
      // Use paddingTop (not transform) to preserve position:sticky on .sidebar
      if (sideCol) {
        sideCol.style.paddingTop = pxv + 'px';
      }
    };
    Fluid.utils.listenScroll(parallax);
  },

  registerScrollDownArrowEvent: function() {
    var scrollbar = document.querySelector('.scroll-down-bar');
    if (!scrollbar) {
      return;
    }
    scrollbar.addEventListener('click', function() {
      var navbarEl = document.getElementById('navbar');
      Fluid.utils.scrollToElement('#board', -(navbarEl ? navbarEl.offsetHeight : 0));
    });
  },

  registerScrollTopArrowEvent: function() {
    var topArrow = document.getElementById('scroll-top-button');
    if (!topArrow) {
      return;
    }
    var board = document.getElementById('board');
    if (!board) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Use transform for show/hide to avoid layout thrashing (bottom is a layout property)
    var updateArrowVisibility = function() {
      topArrow.style.transform = posDisplay && scrollDisplay ? 'translateY(0)' : 'translateY(80px)';
    };
    // Position
    var setTopArrowPos = function() {
      var boardRight = board.getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      updateArrowVisibility();
      topArrow.style.right = (right - 64) + 'px';
    };
    setTopArrowPos();
    // Use module-level variable to prevent listener accumulation on PJAX re-bind (D-06)
    if (_scrollTopArrowResizeHandler) {
      window.removeEventListener('resize', _scrollTopArrowResizeHandler);
    }
    _scrollTopArrowResizeHandler = setTopArrowPos;
    window.addEventListener('resize', _scrollTopArrowResizeHandler);
    // Display
    var headerHeight = board.getBoundingClientRect().top + window.scrollY;
    Fluid.utils.listenScroll(function() {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      updateArrowVisibility();
    });
    // Click (D-03: window.scrollTo smooth)
    // Guard: #scroll-top-button is outside #pjax-wrapper and persists across PJAX navigation.
    // Adding a new listener on every page:view causes multiple synchronous scrollTo calls on click,
    // which makes browsers fall back to instant scroll. Register click only once.
    if (!topArrow.dataset.scrollClickBound) {
      topArrow.dataset.scrollClickBound = '1';
      topArrow.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  },

  registerImageLoadedEvent: function() {
    if (!('NProgress' in window)) { return; }

    var bg = document.getElementById('banner');
    if (bg) {
      var src = bg.style.backgroundImage;
      var url = src.match(/\((.*?)\)/)[1].replace(/(['"])/g, '');
      var img = new Image();
      img.onload = function() {
        window.NProgress && window.NProgress.status !== null && window.NProgress.inc(0.2);
      };
      img.src = url;
      if (img.complete) { img.onload(); }
    }

    var notLazyImages = document.querySelectorAll('main img:not([lazyload])');
    var total = notLazyImages.length;
    for (const img of notLazyImages) {
      const old = img.onload;
      img.onload = function() {
        old && old();
        window.NProgress && window.NProgress.status !== null && window.NProgress.inc(0.5 / total);
      };
      if (img.complete) { img.onload(); }
    }
  },

  registerRefreshCallback: function(callback) {
    if (!Array.isArray(Fluid.events._refreshCallbacks)) {
      Fluid.events._refreshCallbacks = [];
    }
    Fluid.events._refreshCallbacks.push(callback);
  },

  refresh: function() {
    if (Array.isArray(Fluid.events._refreshCallbacks)) {
      for (var callback of Fluid.events._refreshCallbacks) {
        if (callback instanceof Function) {
          callback();
        }
      }
    }
  },

  billboard: function() {
    if (!('console' in window)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`
-------------------------------------------------
|                                               |
|      ________  __            _        __      |
|     |_   __  |[  |          (_)      |  ]     |
|       | |_ \\_| | | __   _   __   .--.| |      |
|       |  _|    | |[  | | | [  |/ /'\`\\' |      |
|      _| |_     | | | \\_/ |, | || \\__/  |      |
|     |_____|   [___]'.__.'_/[___]'.__.;__]     |
|                                               |
|            Powered by Hexo x Fluid            |
| https://github.com/fluid-dev/hexo-theme-fluid |
|                                               |
-------------------------------------------------
    `);
  }
};
