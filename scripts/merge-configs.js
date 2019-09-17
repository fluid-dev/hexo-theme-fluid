const fs = require('fs');
const path = require('path');
const yaml = require('./utils/js-yaml');
const merge = require('./utils/merge');

/**
 * Merge configs in blog/source/_data/fluid_config.yml into hexo.theme.config.
 */
hexo.on('ready', function () {
  var sourceConfig = {}
  if(fs.existsSync(configPath = path.join(__dirname, '../../../source/_data/fluid_config.yml'))) {
    sourceConfig = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  }
  themeConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../_config.yml'), 'utf8'));
  hexo.theme.config = Object.assign({}, themeConfig, sourceConfig, hexo.config.theme_config);
  hexo.config.theme_config = Object.assign({}, sourceConfig, hexo.config.theme_config);

  
  require("./lazyload/index").lazyload(hexo);
});

hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data');
    if (data && data.fluid_static_prefix) {
      hexo.theme.config.static_prefix = data.fluid_static_prefix;
      this.log.debug("Fluid: theme static_prefix config merged");
    }
  }
  if (!hexo.theme.config.static_prefix) {
    const configPath = path.join(__dirname, '../_static_prefix.yml');
    const doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    hexo.theme.config.static_prefix = doc;
    this.log.debug("Fluid: theme static_prefix config merged");
  }
  return;
});
