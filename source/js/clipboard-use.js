!function (e, t, a) {
  var initCopyCode = function () {
    var copyHtml = '';
    copyHtml += '<button class="copy-btn" data-clipboard-snippet="">';
    copyHtml += '<i class="iconfont icon-copy"></i><span>Copy</span>';
    copyHtml += '</button>';
    var pre = $('.markdown-body pre');
    pre.prepend(copyHtml);
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
