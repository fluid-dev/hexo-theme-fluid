const joinPath = require('./utils/join-path');

hexo.extend.helper.register('css_ex', function (base, relative) {
  return this.css(joinPath(base, relative));
});

hexo.extend.helper.register('js_ex', function (base, relative) {
  return this.js(joinPath(base, relative));
});
