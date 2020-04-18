// eslint-disable-next-line no-unused-expressions
!(function(e, t, a) {
  function initCopyCode() {
    var copyHtml = '';
    copyHtml += '<button class="copy-btn" data-clipboard-snippet="">';
    copyHtml += '<i class="iconfont icon-copy"></i><span>Copy</span>';
    copyHtml += '</button>';
    $('.markdown-body pre').each(function() {
      const pre = $(this);
      if (pre.find('code.mermaid').length > 0) {
        return;
      }
      pre.append(copyHtml);
    });
    // eslint-disable-next-line no-undef
    var clipboard = new ClipboardJS('.copy-btn', {
      target: function(trigger) {
        return trigger.previousElementSibling;
      }
    });
    $('.copy-btn').addClass(getBgClass());
    clipboard.on('success', function(e) {
      e.clearSelection();
      var tmp = e.trigger.outerHTML;
      e.trigger.innerHTML = 'Success';
      setTimeout(function() {
        e.trigger.outerHTML = tmp;
      }, 2000);
    });
  }

  function getBgClass() {
    var ele = $('div.hljs, pre');
    if (ele.length === 0) {
      return 'copy-btn-dark';
    }
    var rgbArr = ele.css('background-color').replace(
      /rgba*\(/, '').replace(')', '').split(',');
    var color = (0.213 * rgbArr[0]) + (0.715 * rgbArr[1]) + (0.072 * rgbArr[2]) > 255 / 2;
    return color ? 'copy-btn-dark' : 'copy-btn-light';
  }

  var oldLoadCb = window.onload;
  window.onload = function() {
    oldLoadCb && oldLoadCb();

    initCopyCode();
  };
})(window, document);
