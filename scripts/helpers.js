const joinPath = require('./utils/join-path');

hexo.extend.helper.register('css_ex', function (base, relative, ex = '') {
  return `<link ${ ex } rel="stylesheet" href="${ this.url_for(joinPath(base, relative)) }" />`;
});

hexo.extend.helper.register('js_ex', function (base, relative, ex = '') {
  return `<script ${ ex } src="${ this.url_for(joinPath(base, relative)) }" ></script>`;
});

hexo.extend.helper.register('prev_page', function prev_page(page) {
  const prev = page.prev;
  if (!prev) {
    return null;
  }
  if (prev.hide) {
    return prev_page(prev);
  }
  return prev;
});

hexo.extend.helper.register('next_page', function next_page(page) {
  const next = page.next;
  if (!next) {
    return null;
  }
  if (next.hide) {
    return next_page(next);
  }
  return next;
});
