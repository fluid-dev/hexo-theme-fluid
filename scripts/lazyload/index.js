'use strict';
module.exports.lazyload = function (hexo) {
  var config = hexo.theme.config;
  if (!config.lazyload || !config.lazyload.enable) {
    return;
  }
  if (config.lazyload.onlypost) {
    hexo.extend.filter.register('after_post_render', require('./process').processPost);
  } else {
    hexo.extend.filter.register('after_render:html', require('./process').processSite);
  }
};