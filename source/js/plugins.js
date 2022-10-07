/* global Fluid, CONFIG */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

Fluid.plugins = {

  typing: function(text) {
    if (!('Typed' in window)) { return; }

    var typed = new window.Typed('#subtitle', {
      strings: [
        '  ',
        text
      ],
      cursorChar: CONFIG.typing.cursorChar,
      typeSpeed : CONFIG.typing.typeSpeed,
      loop      : CONFIG.typing.loop
    });
    typed.stop();
    var subtitle = document.getElementById('subtitle');
    if (subtitle) {
      subtitle.innerText = '';
    }
    jQuery(document).ready(function() {
      typed.start();
    });
  },

  fancyBox: function(selector) {
    if (!CONFIG.image_zoom.enable || !('fancybox' in jQuery)) { return; }

    jQuery(selector || '.markdown-body :not(a) > img, .markdown-body > img').each(function() {
      var $image = jQuery(this);
      var imageUrl = $image.attr('data-src') || $image.attr('src') || '';
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
      var $imageWrap = $image.wrap(`
        <a class="fancybox fancybox.image" href="${imageUrl}"
          itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`
      ).parent('a');
      if ($imageWrap.length !== 0) {
        if ($image.is('.group-image-container img')) {
          $imageWrap.attr('data-fancybox', 'group').attr('rel', 'group');
        } else {
          $imageWrap.attr('data-fancybox', 'default').attr('rel', 'default');
        }

        var imageTitle = $image.attr('title') || $image.attr('alt');
        if (imageTitle) {
          $imageWrap.attr('title', imageTitle).attr('data-caption', imageTitle);
        }
      }
    });

    jQuery.fancybox.defaults.hash = false;
    jQuery('.fancybox').fancybox({
      loop   : true,
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  imageCaption: function(selector) {
    if (!CONFIG.image_caption.enable) { return; }

    jQuery(selector || `.markdown-body > p > img, .markdown-body > figure > img,
      .markdown-body > p > a.fancybox, .markdown-body > figure > a.fancybox`).each(function() {
      var $target = jQuery(this);
      var $figcaption = $target.next('figcaption');
      if ($figcaption.length !== 0) {
        $figcaption.addClass('image-caption');
      } else {
        var imageTitle = $target.attr('title') || $target.attr('alt');
        if (imageTitle) {
          $target.after(`<figcaption aria-hidden="true" class="image-caption">${imageTitle}</figcaption>`);
        }
      }
    });
  },

  codeWidget() {
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
    jQuery('.markdown-body pre').each(function() {
      var $pre = jQuery(this);
      if ($pre.find('code.mermaid').length > 0) {
        return;
      }
      if ($pre.find('span.line').length > 0) {
        return;
      }

      var lang = '';

      if (enableLang) {
        lang = CONFIG.code_language.default;
        if ($pre[0].children.length > 0 && $pre[0].children[0].classList.length >= 2 && $pre.children().hasClass('hljs')) {
          lang = $pre[0].children[0].classList[1];
        } else if ($pre[0].getAttribute('data-language')) {
          lang = $pre[0].getAttribute('data-language');
        } else if ($pre.parent().hasClass('sourceCode') && $pre[0].children.length > 0 && $pre[0].children[0].classList.length >= 2) {
          lang = $pre[0].children[0].classList[1];
          $pre.parent().addClass('code-wrapper');
        } else if ($pre.parent().hasClass('markdown-body') && $pre[0].classList.length === 0) {
          $pre.wrap('<div class="code-wrapper"></div>');
        }
        lang = lang.toUpperCase().replace('NONE', CONFIG.code_language.default);
      }
      $pre.append(copyTmpl.replace('LANG', lang).replace('code-widget">',
        getBgClass($pre[0]) + (enableCopy ? ' code-widget copy-btn" data-clipboard-snippet><i class="iconfont icon-copy"></i>' : ' code-widget">')));

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
