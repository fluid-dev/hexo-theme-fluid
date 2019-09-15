const fs = require('fs');
const path = require('path');
const yaml = require('./utils/js-yaml');
const merge = require('./utils/merge');

/**
 * Merge configs in blog/source/_data/fluid_***config.yml into hexo.theme.config.
 */
hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data');
    if (data) {
      if (data.fluid_config) {
        merge(hexo.theme.config, data.fluid_config);
      }
      if (data.fluid_static_prefix) {
        hexo.theme.config.static_prefix = data.fluid_static_prefix;
      }
    }
  }
  if (!hexo.theme.config.static_prefix) {
    const configPath = path.join(__dirname, '../_static_prefix.yml');
    const doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    hexo.theme.config.static_prefix = doc;
  }
});
