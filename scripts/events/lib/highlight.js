'use strict';

const fs = require('fs');
const css = require('css');
const objUtil = require('../../utils/object');
const resolveModule = require('../../utils/resolve');

module.exports = (hexo) => {

  function resolveHighlight(name) {
    if (!name) {
      name = 'github-gist';
    }
    const cssName = name.toLowerCase().replace(/([^0-9])\s+?([^0-9])/g, '$1-$2').replace(/\s/g, '');
    let file = resolveModule('highlight.js', `styles/${cssName}.css`);
    if (cssName === 'github-gist' && !fs.existsSync(file)) {
      file = resolveModule('highlight.js', 'styles/github.css');
    }
    let backgroundColor;
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      css.parse(content).stylesheet.rules
        .filter(rule => rule.type === 'rule' && rule.selectors.some(selector => selector.endsWith('.hljs')))
        .flatMap(rule => rule.declarations)
        .forEach(declaration => {
          if (declaration.property === 'background' || declaration.property === 'background-color') {
            backgroundColor = declaration.value;
          }
        });
    } else {
      hexo.log.error(`[Fluid] highlightjs style '${name}' not found`);
      return {};
    }
    if (backgroundColor === 'white' || backgroundColor === '#ffffff') {
      backgroundColor = '#fff';
    }
    return { file, backgroundColor };
  }

  function resolvePrism(name) {
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
      return {};
    }
    return { file };
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
      light: resolveHighlight(hexo.theme.config.code.highlight.highlightjs.style),
      dark : hexo.theme.config.dark_mode.enable && resolveHighlight(hexo.theme.config.code.highlight.highlightjs.style_dark)
    });

    hexo.extend.filter.register('after_post_render', (page) => {
      if (hexo.config.highlight.line_number) {
        page.content = page.content.replace(/<figure[^>]+?highlight.+?<td[^>]+?code[^>]+?>.*?(<pre.+?<\/pre>).+?<\/figure>/gims, (str, p1) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(p1)) {
            return p1.replace(/(class="[^>]*?)hljs([^>]*?")/gims, '$1$2').replace(/<br>/gims, '\n');
          }
          return str;
        });
      } else {
        page.content = page.content.replace(/(?<!<div class="code-wrapper">)<pre.+?<\/pre>/gims, (str) => {
          if (/<code[^>]+?mermaid[^>]+?>/ims.test(str)) {
            return str.replace(/(class=".*?)hljs(.*?")/gims, '$1$2');
          }
          return `<div class="code-wrapper">${str}</div>`;
        });
      }

      // 适配缩进型代码块
      page.content = page.content.replace(/<pre><code>/gims, (str) => {
        return '<pre><code class="hljs">';
      });

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
      light: resolvePrism(hexo.theme.config.code.highlight.prismjs.style),
      dark : hexo.theme.config.dark_mode.enable && resolvePrism(hexo.theme.config.code.highlight.prismjs.style_dark)
    });

    hexo.extend.filter.register('after_post_render', (page) => {
      page.content = page.content.replace(/(?<!<div class="code-wrapper">)<pre.+?<\/pre>/gims, (str) => {
        if (/<code[^>]+?mermaid[^>]+?>/ims.test(str)) {
          if (hexo.config.highlight.line_number) {
            str = str.replace(/<span[^>]+?line-numbers-rows[^>]+?>.+?<\/span><\/code>/, '</code>');
          }
          str = str.replace(/<pre[^>]*?>/gims, '<pre>')
            .replace(/(class=".*?)language-mermaid(.*?")/gims, '$1mermaid$2')
            .replace(/<span[^>]+?>(.+?)<\/span>/gims, '$1');
          return str;
        }
        return `<figure><div class="code-wrapper">${str}</div></figure>`;
      });

      // 适配缩进型代码块
      page.content = page.content.replace(/<pre><code>/gims, (str) => {
        return '<pre class="language-none"><code class="language-none">';
      });

      return page;
    });
  }
};
