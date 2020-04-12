'use strict';

module.exports = (hexo) => {
  var config = hexo.theme.config;
  if (!config.highlight.enable || !config.highlight.bg_color) {
    return;
  }

  hexo.extend.filter.register('after_render:html', (html, data) => {
    return html.replace(/(?<!<div class="hljs">)<pre.+?class="(.+?)".*?>(.*?)<\/pre>/gis, (str, p1, p2) => {
      return `<div class="hljs"><pre class="${ p1 } hljs">${ p2 }</pre></div>`;
    });
  });
};
