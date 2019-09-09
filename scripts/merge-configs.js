const merge = require('./merge');

/**
 * Merge configs in blog/source/_data/fluid_config.yml into hexo.theme.config.
 */
hexo.on('generateBefore', function () {
  if (!hexo.locals.get) return;
  var data = hexo.locals.get('data');
  if (!data) return;

  if (data.fluid_config) {
    merge(hexo.theme.config, data.fluid_config);
  }
});
