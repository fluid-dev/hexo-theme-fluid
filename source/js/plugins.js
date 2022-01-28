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
        text + '&nbsp;'
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
      jQuery('.typed-cursor').addClass('h2');
      typed.start();
    });
  },

  initTocBot: function() {
    if (!CONFIG.toc.enable) { return; }

    var toc = jQuery('#toc');
    if (toc.length === 0 || !window.tocbot) { return; }
    var boardCtn = jQuery('#board-ctn');
    var boardTop = boardCtn.offset().top;

    window.tocbot.init({
      tocSelector     : '#toc-body',
      contentSelector : '.markdown-body',
      headingSelector : CONFIG.toc.headingSelector || 'h1,h2,h3,h4,h5,h6',
      linkClass       : 'tocbot-link',
      activeLinkClass : 'tocbot-active-link',
      listClass       : 'tocbot-list',
      isCollapsedClass: 'tocbot-is-collapsed',
      collapsibleClass: 'tocbot-is-collapsible',
      collapseDepth   : CONFIG.toc.collapseDepth || 0,
      scrollSmooth    : true,
      headingsOffset  : -boardTop
    });
    if (toc.find('.toc-list-item').length > 0) {
      toc.css('visibility', 'visible');
    }
  },

  initImageCaption: function(selector) {
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

  initFancyBox: function(selector) {
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

  initAnchor: function() {
    if (!CONFIG.anchorjs.enable || !('anchors' in window)) { return; }

    window.anchors.options = {
      placement: CONFIG.anchorjs.placement,
      visible  : CONFIG.anchorjs.visible
    };
    if (CONFIG.anchorjs.icon) {
      window.anchors.options.icon = CONFIG.anchorjs.icon;
    }
    var el = (CONFIG.anchorjs.element || 'h1,h2,h3,h4,h5,h6').split(',');
    var res = [];
    for (var item of el) {
      res.push('.markdown-body > ' + item.trim());
    }
    if (CONFIG.anchorjs.placement === 'left') {
      window.anchors.options.class = 'anchorjs-link-left';
    }
    window.anchors.add(res.join(', '));
  },

  initCodeWidget: function() {
    var enableLang = CONFIG.code_language.enable && CONFIG.code_language.default;
    var enableCopy = CONFIG.copy_btn && ('ClipboardJS' in window);

    if (!enableLang && !enableCopy) { return; }

    function getBgClass(ele) {
      if (ele.length === 0) {
        return 'code-widget-light';
      }
      var rgbArr = ele.css('background-color').replace(/rgba*\(/, '').replace(')', '').split(',');
      var color = (0.213 * rgbArr[0]) + (0.715 * rgbArr[1]) + (0.072 * rgbArr[2]) > 255 / 2;
      return color ? 'code-widget-light' : 'code-widget-dark';
    }

    var copyTmpl = '';
    copyTmpl += '<div class="code-weight">';
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
        if ($pre.hasClass('hljs') && $pre[0].children.length > 0 && $pre[0].children[0].classList.length >= 2) {
          lang = $pre[0].children[0].classList[1];
        } else if ($pre[0].getAttribute('data-language')) {
          lang = $pre[0].getAttribute('data-language');
        } else if ($pre.parent().hasClass('sourceCode') && $pre[0].children.length > 0 && $pre[0].children[0].classList.length >= 2) {
          lang = $pre[0].children[0].classList[1];
          $pre.parent().addClass('code-wrapper');
        } else if ($pre.parent().hasClass('markdown-body') && $pre[0].classList.length === 0) {
          $pre.wrap('<div class="code-wrapper"></div>');
        }
        lang = lang.toUpperCase().replace(/(LIVECODESERVER|NONE)/, CONFIG.code_language.default);
      }
      $pre.append(copyTmpl.replace('LANG', lang).replace('code-weight">',
        `${getBgClass($pre)} ${enableCopy ? 'code-widget copy-btn" data-clipboard-snippet><i class="iconfont icon-copy"></i>' : 'code-widget">'}`));

      if (enableCopy) {
        var clipboard = new window.ClipboardJS('.copy-btn', {
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
