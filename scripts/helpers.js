const path = require('path');

hexo.extend.helper.register('css_ex', function (file_path) {
    var base_path = hexo.theme.config.source_base_path;
    return this.css(path.join(base_path, file_path));
});

hexo.extend.helper.register('js_ex', function (file_path) {
    var base_path = hexo.theme.config.source_base_path;
    return this.js(path.join(base_path, file_path));
});