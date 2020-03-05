'use strict';
const joinPath = require('./utils/join-path');


module.exports.lazyload = function (hexo) {
  var config = hexo.theme.config;
  let loadingImage = joinPath(joinPath(hexo.config.root, config.static_prefix.internal_img), 'loading.gif');
  if (!config.lazyload || !config.lazyload.enable || !loadingImage) {
    return;
  }
  if (config.lazyload.onlypost) {
    hexo.extend.filter.register('after_post_render', function (data) {
      data.content = lazyProcess.call(this, data.content, loadingImage);
      return data;
    });
  } else {
    hexo.extend.filter.register('after_render:html', function (str, data) {
      return lazyProcess.call(this, str, loadingImage);
    });
  }
};

function lazyProcess(htmlContent, loadingImage) {
  return htmlContent.replace(/<img[^>]+src="(.*?)"[^>]*>/gi, (str, p1) => {
    if (/srcset=/gi.test(str)) {
      return str;
    }
    return str.replace(p1, `${p1}" srcset="${loadingImage}`);
  });
}
