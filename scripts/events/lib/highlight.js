'use strict';

const objUtil = require('../../utils/object');

module.exports = (hexo) => {
  const config = hexo.theme.config;
  if (!config.code || !config.code.highlight.enable) {
    return;
  }

  if (config.code.highlight.lib === 'highlightjs') {
    // Force set hexo config
    hexo.config.prismjs = objUtil.merge({}, hexo.config.prismjs, {
      enable: false
    });
    hexo.config.highlight = objUtil.merge({}, hexo.config.highlight, {
      enable     : true,
      hljs       : true,
      line_number: false,
      wrap       : false,
      auto_detect: true
    });

    if (config.code.highlight.highlightjs.bg_color) {
      hexo.extend.filter.register('after_render:html', (html, data) => {
        return html.replace(/(?<!<div class="hljs">)<pre.*?(class=".+?".*?)*>(.*?)<\/pre>/gis, (str, p1, p2) => {
          if (p2.search(/mermaid/) !== -1) {
            return str;
          }
          return `<div class="hljs"><pre${p1 ? p1.replace('class="', ' class="hljs ') : ''}>${p2}</pre></div>`;
        });
      });
    }
  } else if (config.code.highlight.lib === 'prismjs') {
    // Force set hexo config
    hexo.config.highlight = objUtil.merge({}, hexo.config.highlight, {
      enable: false
    });
    hexo.config.prismjs = objUtil.merge({}, hexo.config.prismjs, {
      enable     : true,
      preprocess : config.code.highlight.prismjs.preprocess || false,
      line_number: config.code.highlight.prismjs.line_number || false
    });
  }
};
