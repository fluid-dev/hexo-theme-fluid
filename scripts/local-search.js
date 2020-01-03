'use strict';
hexo.extend.generator.register('_hexo_generator_search', function (locals) {
  let config = this.theme.config;
  if (!config.search.enable) {
    return;
  }

  let nunjucks = require('nunjucks');
  let env = new nunjucks.Environment();
  let pathFn = require('path');
  let fs = require('fs');

  env.addFilter('uriencode', function (str) {
    return encodeURI(str);
  });

  env.addFilter('noControlChars', function (str) {
    return str && str.replace(/[\x00-\x1F\x7F]/g, '');
  });

  let searchTmplSrc = pathFn.join(__dirname, '../pages/local-search.xml');
  let searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, 'utf8'), env);

  let searchConfig = config.search;
  let template = searchTmpl;
  let searchField = searchConfig.field;
  let content = searchConfig.content || true;

  let posts, pages;

  if (searchField.trim() != '') {
    searchField = searchField.trim();
    if (searchField == 'post') {
      posts = locals.posts.sort('-date');
    } else if (searchField == 'page') {
      pages = locals.pages;
    } else {
      posts = locals.posts.sort('-date');
      pages = locals.pages;
    }
  } else {
    posts = locals.posts.sort('-date');
  }

  let xml = template.render({
    config: config,
    posts: posts,
    pages: pages,
    content: content,
    url: hexo.config.root
  });

  return {
    path: searchConfig.generate_path || '/local-search.xml',
    data: xml
  };
});
