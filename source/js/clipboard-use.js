!function (e, t, a) {
  var initCopyCode = function () {
    var copyHtml = '';
    copyHtml += '<button class="copy-btn" data-clipboard-snippet="">';
    copyHtml += '<i class="iconfont icon-copy"></i><span>Copy</span>';
    copyHtml += '</button>';
    $('.markdown-body pre').each(function () {
      const pre = $(this);
      if (pre.find('code.mermaid').length > 0) {
        return;
      }
      pre.append(copyHtml);
    });
    var clipboard = new ClipboardJS('.copy-btn', {
      target: function (trigger) {
        return trigger.nextElementSibling;
      },
    });
    clipboard.on('success', function (e) {
      e.clearSelection();
      e.trigger.innerHTML = 'Success';
      setTimeout(function () {
        e.trigger.outerHTML = copyHtml;
      }, 2000);
    });
  };
  var oldLoadCb = window.onload;
  window.onload = function () {
    oldLoadCb && oldLoadCb();

    initCopyCode();
  };
}(window, document);
