'use strict';
hexo.source.on('processAfter', function () {
  if (!hexo.theme.config.lazyload || !hexo.theme.config.lazyload.enable) {
    return;
  }
  if (hexo.theme.config.lazyload.onlypost) {
    hexo.extend.filter.register('after_post_render', require('./process').processPost);
  } else {
    hexo.extend.filter.register('after_render:html', require('./process').processSite);
  }
});
