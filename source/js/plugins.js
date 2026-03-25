/* global Fluid, CONFIG */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

Fluid.plugins = {

  typing: function(text) {
    if (!('Typed' in window)) { return; }

    if (window._fluidTypedInstance) {
      try { window._fluidTypedInstance.destroy(); } catch(e) { /* noop */ }
      window._fluidTypedInstance = null;
    }

    // Clear the element BEFORE constructing Typed so it sees empty content
    // and starts typing immediately (no backspace of existing text).
    // This also prevents the stop()/start() workaround which creates
    // orphaned setTimeout chains that cannot be cancelled by destroy().
    var subtitle = document.getElementById('subtitle');
    if (!subtitle) { return; }
    subtitle.textContent = '';

    var typed = new window.Typed('#subtitle', {
      strings   : [text],
      cursorChar: CONFIG.typing.cursorChar,
      typeSpeed : CONFIG.typing.typeSpeed,
      loop      : CONFIG.typing.loop
    });
    window._fluidTypedInstance = typed;
  },

  fancyBox: function(selector) {
    if (!CONFIG.image_zoom.enable || typeof Fancybox === 'undefined') { return; }

    document.querySelectorAll(selector || '.markdown-body :not(a) > img, .markdown-body > img').forEach(function(image) {
      var imageUrl = image.getAttribute('data-src') || image.getAttribute('src') || '';
      if (CONFIG.image_zoom.img_url_replace) {
        var rep = CONFIG.image_zoom.img_url_replace;
        var r1 = rep[0] || '';
        var r2 = rep[1] || '';
        if (r1) {
          if (/^re:/.test(r1)) {
            r1 = r1.replace(/^re:/, '');
            var reg = new RegExp(r1, 'gi');
            imageUrl = imageUrl.replace(reg, r2);
          } else {
            imageUrl = imageUrl.replace(r1, r2);
          }
        }
      }
      var a = document.createElement('a');
      a.className = 'fancybox fancybox.image';
      a.href = imageUrl;
      a.setAttribute('itemscope', '');
      a.setAttribute('itemtype', 'http://schema.org/ImageObject');
      a.setAttribute('itemprop', 'url');
      image.wrap(a);
      if (image.closest('.group-image-container')) {
        a.setAttribute('data-fancybox', 'group');
        a.setAttribute('rel', 'group');
      } else {
        a.setAttribute('data-fancybox', 'default');
        a.setAttribute('rel', 'default');
      }
      var imageTitle = image.getAttribute('title') || image.getAttribute('alt');
      if (imageTitle) {
        a.setAttribute('title', imageTitle);
        a.setAttribute('data-caption', imageTitle);
      }
    });

    Fancybox.bind('[data-fancybox]', {
      Hash    : false,
      Carousel: { infinite: true }
    });
  },

  imageCaption: function(selector) {
    if (!CONFIG.image_caption.enable) { return; }

    var defaultSelector = '.markdown-body > p > img, .markdown-body > figure > img,'
      + ' .markdown-body > p > a.fancybox, .markdown-body > figure > a.fancybox';
    document.querySelectorAll(selector || defaultSelector).forEach(function(target) {
      var nextSib = target.nextElementSibling;
      if (nextSib && nextSib.tagName === 'FIGCAPTION') {
        nextSib.classList.add('image-caption');
      } else {
        var imageTitle = target.getAttribute('title') || target.getAttribute('alt');
        if (imageTitle) {
          target.insertAdjacentHTML('afterend', '<figcaption aria-hidden="true" class="image-caption">' + imageTitle + '</figcaption>');
        }
      }
    });
  },

  codeWidget: function() {
    var enableLang = CONFIG.code_language.enable && CONFIG.code_language.default;
    var enableCopy = CONFIG.copy_btn && 'ClipboardJS' in window;
    if (!enableLang && !enableCopy) {
      return;
    }

    function getBgClass(ele) {
      return Fluid.utils.getBackgroundLightness(ele) >= 0 ? 'code-widget-light' : 'code-widget-dark';
    }

    var copyTmpl = '';
    copyTmpl += '<div class="code-widget">';
    copyTmpl += 'LANG';
    copyTmpl += '</div>';
    document.querySelectorAll('.markdown-body pre').forEach(function(pre) {
      if (pre.querySelector('code.mermaid')) {
        return;
      }
      if (pre.querySelector('span.line')) {
        return;
      }

      var lang = '';

      if (enableLang) {
        lang = CONFIG.code_language.default;
        if (pre.children.length > 0 && pre.children[0].classList.length >= 2
            && Array.from(pre.children).some(function(c) { return c.classList.contains('hljs'); })) {
          lang = pre.children[0].classList[1];
        } else if (pre.getAttribute('data-language')) {
          lang = pre.getAttribute('data-language');
        } else if (pre.parentElement.classList.contains('sourceCode') && pre.children.length > 0 && pre.children[0].classList.length >= 2) {
          lang = pre.children[0].classList[1];
          pre.parentElement.classList.add('code-wrapper');
        } else if (pre.parentElement.classList.contains('markdown-body') && pre.classList.length === 0) {
          var wrapper = document.createElement('div');
          wrapper.className = 'code-wrapper';
          pre.wrap(wrapper);
        }
        lang = lang.toUpperCase().replace('NONE', CONFIG.code_language.default);
      }
      pre.insertAdjacentHTML('beforeend', copyTmpl.replace('LANG', lang).replace('code-widget">',
        getBgClass(pre) + (enableCopy ? ' code-widget copy-btn" data-clipboard-snippet><i class="iconfont icon-copy"></i>' : ' code-widget">')));

      if (enableCopy) {
        var clipboard = new ClipboardJS('.copy-btn', {
          target: function(trigger) {
            var nodes = trigger.parentNode.childNodes;
            for (var i = 0; i < nodes.length; i++) {
              if (nodes[i].tagName === 'CODE') {
                return nodes[i];
              }
            }
          }
        });
        clipboard.on('success', function(e) {
          e.clearSelection();
          e.trigger.innerHTML = e.trigger.innerHTML.replace('icon-copy', 'icon-success');
          setTimeout(function() {
            e.trigger.innerHTML = e.trigger.innerHTML.replace('icon-success', 'icon-copy');
          }, 2000);
        });
      }
    });
  }
};
