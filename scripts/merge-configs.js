const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Merge configs in /source/_data/fluid_static_prefix.yml into hexo.theme.config.
 */

hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data');
    if (data && data.fluid_static_prefix) {
      hexo.theme.config.static_prefix = data.fluid_static_prefix;
      this.log.debug("Fluid: theme static_prefix config merged");
    }
    sourceConfig = {}
    if (data && data.fluid_config) {
      sourceConfig = data.fluid_config;
    }
  }
  if (!hexo.theme.config.static_prefix) {
    const configPath = path.join(__dirname, '../_static_prefix.yml');
    const doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    hexo.theme.config.static_prefix = doc;
    this.log.debug("Fluid: theme static_prefix config merged");
  }

/**
 * Merge configs in hexo.config.theme_config and /source/_data/fluid_config.yml into hexo.theme.config.
 */
  hexo.theme.config = Object.assign({}, hexo.theme.config, sourceConfig, hexo.config.theme_config);
  this.log.debug("Fluid: theme config merged");

/**
 * Trigger action that requires configuration data.
 */
  require("./lazyload").lazyload(hexo)
  return;
});
