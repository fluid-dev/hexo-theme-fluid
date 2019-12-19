'use strict';
hexo.extend.generator.register('_hexo_generator_search', function (locals) {
  var config = this.theme.config;
  if (!config.search.enable) {
    return;
  }

  var nunjucks = require('nunjucks');
  var env = new nunjucks.Environment();
  var pathFn = require('path');
  var fs = require('fs');

  env.addFilter('uriencode', function (str) {
    return encodeURI(str);
  });

  env.addFilter('noControlChars', function (str) {
    return str && str.replace(/[\x00-\x1F\x7F]/g, '');
  });

  var searchTmplSrc = pathFn.join(__dirname, '../pages/local-search.xml');
  var searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, 'utf8'), env);

  var searchConfig = config.search;
  var template = searchTmpl;
  var searchField = searchConfig.field;
  var content = searchConfig.content || true;

  var posts, pages;

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

  var xml = template.render({
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
