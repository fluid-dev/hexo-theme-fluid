const joinPath = require('./utils/join-path');

hexo.extend.helper.register('css_ex', function (base, relative, ex = "") {
  return '<link rel="stylesheet" href="' + this.url_for(joinPath(base, relative)) + '" ' + ex + ' >';
});

hexo.extend.helper.register('js_ex', function (base, relative, ex = "") {
  return '<script src="' + this.url_for(joinPath(base, relative)) + '" ' + ex + '></script>';
});

hexo.extend.helper.register('js_async', function (base, relative, ex = "") {
  return '<script async src="' + this.url_for(joinPath(base, relative)) + '" ' + ex + '></script>';
});
