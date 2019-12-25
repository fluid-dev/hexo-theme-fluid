const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data');
    sourceConfig = {};
    if (data && data.fluid_config) {
      sourceConfig = data.fluid_config;
    }
    staticPrefix = {};
    if (data && data.fluid_static_prefix) {
      staticPrefix = data.fluid_static_prefix;
    }
  }

  /**
   * Merge configs in /source/_data/fluid_static_prefix.yml into hexo.theme.config.
   */
  const configPath = path.join(__dirname, '../_static_prefix.yml');
  const yamlDoc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  hexo.theme.config.static_prefix = Object.assign({}, yamlDoc, staticPrefix);
  this.log.debug("Fluid: theme static_prefix config merged");

  /**
   * Merge configs in hexo.config.theme_config and /source/_data/fluid_config.yml into hexo.theme.config.
   */
  hexo.theme.config = Object.assign({}, hexo.theme.config, sourceConfig, hexo.config.theme_config);
  this.log.debug("Fluid: theme config merged");

  /**
   * Trigger action that requires configuration data.
   */
  require("./lazyload").lazyload(hexo);

  this.log.debug("Configs:\n", hexo.theme.config);

});
