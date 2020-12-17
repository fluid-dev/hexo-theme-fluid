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
      wrap       : false,
      auto_detect: true,
      line_number: config.code.highlight.line_number || false
    });

    hexo.extend.filter.register('after_post_render', (page) => {
      if (config.code.highlight.highlightjs.bg_color) {
        page.content = page.content.replace(/(?<!<div class="hljs code-wrapper">)(<pre.+?<\/pre>)/gims, (str, p1) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
            return str.replace(/(class=".*?)hljs(.*?")/gims, '$1$2');
          }
          return `<div class="hljs code-wrapper">${p1}</div>`;
        });
        page.content = page.content.replace(/<td class="gutter/gims, '<td class="gutter hljs');
      } else if (!hexo.config.highlight.line_number) {
        page.content = page.content.replace(/(?<!<div class="code-wrapper">)(<pre.+?<\/pre>)/gims, (str, p1) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
            return str.replace(/(class=".*?)hljs(.*?")/gims, '$1$2');
          }
          return `<div class="code-wrapper">${p1}</div>`;
        });
      }

      if (hexo.config.highlight.line_number) {
        // Mermaid block adaptation
        page.content = page.content.replace(/<figure.+?<td class="code">.*?(<pre.+?<\/pre>).+?<\/figure>/gims, (str, p1) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
            return p1.replace(/(class=".*?)hljs(.*?")/gims, '$1$2').replace(/<br>/gims, '\n');
          }
          return str;
        });
      }
      return page;
    });
  } else if (config.code.highlight.lib === 'prismjs') {
    // Force set hexo config
    hexo.config.highlight = objUtil.merge({}, hexo.config.highlight, {
      enable: false
    });
    hexo.config.prismjs = objUtil.merge({}, hexo.config.prismjs, {
      enable     : true,
      preprocess : config.code.highlight.prismjs.preprocess || false,
      line_number: config.code.highlight.line_number || false
    });

    hexo.extend.filter.register('after_post_render', (page) => {
      page.content = page.content.replace(/(?<!<div class="code-wrapper">)(<pre.+?<\/pre>)/gims, (str, p1) => {
        if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
          str = str.replace(/<pre[^>]*?>/gims, '<pre>')
            .replace(/(class=".*?)language-mermaid(.*?")/gims, '$1mermaid$2');
          if (hexo.config.highlight.line_number) {
            str = str.replace(/<span.+?line-numbers-rows.+?>.+?<\/span><\/code>/, '</code>');
          }
          return str;
        }
        return `<div class="code-wrapper">${p1}</div>`;
      });
      return page;
    });
  }
};
