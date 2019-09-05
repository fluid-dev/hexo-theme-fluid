function joinPath(base, relative) {
  return relative
    ? base.replace(/\/+$/, '') + '/' + relative.replace(/^\/+/, '')
    : base;
}

hexo.extend.helper.register('css_ex', function (file_path) {
  var base_path = hexo.theme.config.source_base_path;
  return this.css(joinPath(base_path, file_path));
});

hexo.extend.helper.register('js_ex', function (file_path) {
  var base_path = hexo.theme.config.source_base_path;
  return this.js(joinPath(base_path, file_path));
});