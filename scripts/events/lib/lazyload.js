'use strict';

const joinPath = require('../../utils/join-path');

module.exports = (hexo) => {
  const config = hexo.theme.config;
  let loadingImage = joinPath(joinPath(hexo.config.root, config.static_prefix.internal_img), 'loading.gif');
  if (!config.lazyload || !config.lazyload.enable || !loadingImage) {
    return;
  }
  if (config.lazyload.onlypost) {
    hexo.extend.filter.register('after_post_render', (page) => {
      if (page.layout !== 'post' && !page.lazyload) {
        return;
      }
      if (page.lazyload !== false) {
        page.content = lazyProcess(page.content, loadingImage);
      }
      return page;
    });
  } else {
    hexo.extend.filter.register('after_render:html', (html, data) => {
      if (!data.page || data.page.lazyload !== false) {
        return lazyProcess(html, loadingImage);
      }
    });
  }
};

const lazyProcess = (htmlContent, loadingImage) => {
  return htmlContent.replace(/<img[^>]+?src="(.*?)"[^>]*?>/gims, (str, p1) => {
    if (/srcset=/i.test(str)) {
      return str;
    }
    return str.replace(p1, `${p1}" srcset="${loadingImage}`);
  });
};
