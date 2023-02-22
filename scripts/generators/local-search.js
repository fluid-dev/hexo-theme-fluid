/* global hexo */

'use strict';

hexo.extend.generator.register('_hexo_generator_search', function(locals) {
  const config = this.theme.config;
  if (!config.search.enable) {
    return;
  }

  const nunjucks = require('nunjucks');
  const env = new nunjucks.Environment();
  const pathFn = require('path');
  const fs = require('fs');

  env.addFilter('uriencode', function(str) {
    return encodeURI(str);
  });

  env.addFilter('noControlChars', function(str) {
    // eslint-disable-next-line no-control-regex
    return str && str.replace(/[\x00-\x1F\x7F]/g, '');
  });

  env.addFilter('urlJoin', function(str) {
    const base = str[0];
    const relative = str[1];
    return relative
      ? base.replace(/\/+$/, '') + '/' + relative.replace(/^\/+/, '')
      : base;
  });

  const searchTmplSrc = pathFn.join(hexo.theme_dir, './source/xml/local-search.xml');
  const searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, 'utf8'), env);

  const searchConfig = config.search;
  let searchField = searchConfig.field;
  const content = searchConfig.content && true;

  let posts, pages;

  if (searchField.trim() !== '') {
    searchField = searchField.trim();
    if (searchField === 'post') {
      posts = locals.posts.sort('-date');
    } else if (searchField === 'page') {
      pages = locals.pages;
    } else {
      posts = locals.posts.sort('-date');
      pages = locals.pages;
    }
  } else {
    posts = locals.posts.sort('-date');
  }

  const xml = searchTmpl.render({
    config : config,
    posts  : posts,
    pages  : pages,
    content: content,
    url    : hexo.config.root
  });

  return {
    path: searchConfig.generate_path || '/local-search.xml',
    data: xml
  };
});
