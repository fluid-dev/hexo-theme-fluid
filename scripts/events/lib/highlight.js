'use strict';

const objUtil = require('../../utils/object');

module.exports = (hexo) => {
  const config = hexo.theme.config;
  if (!config.highlight.enable) {
    return;
  }

  // Force set hexo config
  hexo.config.highlight = objUtil.merge({}, hexo.config.highlight, {
    enable     : true,
    hljs       : true,
    line_number: false,
    wrap       : false,
    auto_detect: true
  });

  if (config.highlight.bg_color) {
    hexo.extend.filter.register('after_render:html', (html, data) => {
      return html.replace(/(?<!<div class="hljs">)<pre.*?(class=".+?".*?)*>(.*?)<\/pre>/gis, (str, p1, p2) => {
        return `<div class="hljs"><pre${p1 ? p1.replace('class="', ' class="hljs ') : ''}>${p2}</pre></div>`;
      });
    });
  }
};
