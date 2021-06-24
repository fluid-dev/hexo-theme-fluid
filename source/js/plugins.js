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
    if (jQuery('.toc-list-item').length > 0) {
      toc.css('visibility', 'visible');
    }
  },

  initFancyBox: function() {
    if (!$.fancybox) { return; }

    jQuery('.markdown-body :not(a) > img, .markdown-body > img').each(function() {
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
      if ($image.is('.group-image-container img')) {
        $imageWrap.attr('data-fancybox', 'group').attr('rel', 'group');
      } else {
        $imageWrap.attr('data-fancybox', 'default').attr('rel', 'default');
      }

      var imageTitle = $image.attr('title') || $image.attr('alt');
      if (imageTitle) {
        $imageWrap.append(`<p class="image-caption">${imageTitle}</p>`);
        $imageWrap.attr('title', imageTitle).attr('data-caption', imageTitle);
      }
    });

    $.fancybox.defaults.hash = false;
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
    if (!('anchors' in window)) { return; }

    window.anchors.options = {
      placement: CONFIG.anchorjs.placement,
      visible  : CONFIG.anchorjs.visible
    };
    if (CONFIG.anchorjs.icon) {
      window.anchors.options.icon = CONFIG.anchorjs.icon;
    }
    var el = (CONFIG.anchorjs.element || 'h1,h2,h3,h4,h5,h6').split(',');
    var res = [];
    for (const item of el) {
      res.push('.markdown-body > ' + item);
    }
    window.anchors.add(res.join(', '));
  },

  initCopyCode: function() {
    if (!('ClipboardJS' in window)) { return; }

    function getBgClass(ele) {
      if (ele.length === 0) {
        return 'copy-btn-dark';
      }
      var rgbArr = ele.css('background-color').replace(/rgba*\(/, '').replace(')', '').split(',');
      var color = (0.213 * rgbArr[0]) + (0.715 * rgbArr[1]) + (0.072 * rgbArr[2]) > 255 / 2;
      return color ? 'copy-btn-dark' : 'copy-btn-light';
    }

    var copyHtml = '';
    copyHtml += '<button class="copy-btn" data-clipboard-snippet="">';
    copyHtml += '<i class="iconfont icon-copy"></i><span>Copy</span>';
    copyHtml += '</button>';
    var blockElement = jQuery('.markdown-body pre');
    blockElement.each(function() {
      const pre = jQuery(this);
      if (pre.find('code.mermaid').length > 0) {
        return;
      }
      if (pre.find('span.line').length > 0) {
        return;
      }
      pre.append(copyHtml);
    });
    var clipboard = new window.ClipboardJS('.copy-btn', {
      target: function(trigger) {
        return trigger.previousElementSibling;
      }
    });
    jQuery('.copy-btn').addClass(getBgClass(blockElement));
    clipboard.on('success', function(e) {
      e.clearSelection();
      var tmp = e.trigger.outerHTML;
      e.trigger.innerHTML = 'Success';
      setTimeout(function() {
        e.trigger.outerHTML = tmp;
      }, 2000);
    });
  }

};
