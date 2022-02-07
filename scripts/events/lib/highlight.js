'use strict';

const fs = require('fs');
const objUtil = require('../../utils/object');
const resolveModule = require('../../utils/resolve');

module.exports = (hexo) => {

  function highlightCSS(name) {
    if (!name) {
      name = 'github-gist';
    }
    const cssName = name.toLowerCase().replace(/([^0-9])\s+?([^0-9])/g, '$1-$2').replace(/\s/g, '');
    let file = resolveModule('highlight.js', `styles/${cssName}.css`);
    if (cssName === 'github-gist' && !fs.existsSync(file)) {
      file = resolveModule('highlight.js', 'styles/github.css');
    }
    if (!fs.existsSync(file)) {
      hexo.log.error(`[Fluid] highlightjs style '${name}' not found`);
      return;
    }
    return file;
  }

  function prismCSS(name) {
    if (!name) {
      name = 'default';
    }
    let cssName = name.toLowerCase().replace(/[\s-]/g, '');
    if (cssName === 'prism' || cssName === 'default') {
      cssName = '';
    } else if (cssName === 'tomorrownight') {
      cssName = 'tomorrow';
    }
    let file = resolveModule('prismjs', `themes/${cssName ? 'prism-' + cssName : 'prism'}.css`);
    if (!fs.existsSync(file)) {
      file = resolveModule('prism-themes', `themes/${cssName}.css`);
    }
    if (!fs.existsSync(file)) {
      hexo.log.error(`[Fluid] prismjs style '${name}' not found`);
      return;
    }
    return file;
  }

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
    hexo.theme.config.code.highlight.highlightjs = objUtil.merge({}, hexo.theme.config.code.highlight.highlightjs, {
      light_css: highlightCSS(hexo.theme.config.code.highlight.highlightjs.style),
      dark_css : hexo.theme.config.dark_mode.enable && highlightCSS(hexo.theme.config.code.highlight.highlightjs.style_dark)
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
      } else {
        page.content = page.content.replace(/(?<!<td class="code.*?">|<div class="code-wrapper">)(<pre.+?<\/pre>)/gims, (str, p1) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
            return str.replace(/(class=".*?)hljs(.*?")/gims, '$1$2');
          }
          return `<div class="code-wrapper">${p1}</div>`;
        });
      }

      page.content = page.content.replace(/<pre><code>/gims, (str) => {
        return '<pre><code class="hljs">';
      });

      if (hexo.config.highlight.line_number) {
        page.content = page.content.replace(/<figure[^>]+?highlight.+?<td[^>]+?code[^>]+?>.*?(<pre.+?<\/pre>).+?<\/figure>/gims, (str, p1) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
            return p1.replace(/(class="[^>]*?)hljs([^>]*?")/gims, '$1$2').replace(/<br>/gims, '\n');
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
    hexo.theme.config.code.highlight.prismjs = objUtil.merge({}, hexo.theme.config.code.highlight.prismjs, {
      light_css: prismCSS(hexo.theme.config.code.highlight.prismjs.style),
      dark_css : hexo.theme.config.dark_mode.enable && prismCSS(hexo.theme.config.code.highlight.prismjs.style_dark)
    });

    hexo.extend.filter.register('after_post_render', (page) => {
      page.content = page.content.replace(/(?<!<div class="code-wrapper">)(<pre.+?<\/pre>)/gims, (str, p1) => {
        if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
          if (hexo.config.highlight.line_number) {
            str = str.replace(/<span[^>]+?line-numbers-rows[^>]+?>.+?<\/span><\/code>/, '</code>');
          }
          str = str.replace(/<pre[^>]*?>/gims, '<pre>')
            .replace(/(class=".*?)language-mermaid(.*?")/gims, '$1mermaid$2')
            .replace(/<span[^>]+?>(.+?)<\/span>/gims, '$1');
          return str;
        }
        return `<div class="code-wrapper">${p1}</div>`;
      });

      page.content = page.content.replace(/<pre><code>/gims, (str) => {
        return '<pre class="language-none"><code class="language-none">';
      });

      return page;
    });
  }
};
