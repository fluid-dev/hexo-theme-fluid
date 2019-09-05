// generator 404 page
hexo.extend.generator.register('_404', function (locals) {
  return {
    path: '404.html',
    data: locals.theme,
    layout: '404'
  };
});

// generator tags Page
hexo.extend.generator.register('_tags', function (locals) {
  return {
    path: 'tags/index.html',
    data: locals.theme,
    layout: 'tags'
  };
});

// generator categories Page
hexo.extend.generator.register('_categories', function (locals) {
  return {
    path: 'categories/index.html',
    data: locals.theme,
    layout: 'categories'
  };
});

// generator about page
hexo.extend.generator.register('_about', function (locals) {
  return {
    path: 'about/index.html',
    data: locals.theme,
    layout: 'about'
  };
});
const path = require('path');
hexo.extend.helper.register('about_body', function () {
  var mdPath = path.join(__dirname, '../pages/about.md');
  return hexo.render.renderSync({ path: mdPath });
});