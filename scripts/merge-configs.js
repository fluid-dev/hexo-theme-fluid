const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const _ = require('./utils/lodash');

hexo.on('generateBefore', function () {
  let sourceConfig;
  let staticPrefix;

  if (hexo.locals.get) {
    const data = hexo.locals.get('data');
    sourceConfig = {};
    if (data && data.fluid_config) {
      sourceConfig = data.fluid_config;
    }
    staticPrefix = {};
    if (data && data.fluid_static_prefix) {
      staticPrefix = data.fluid_static_prefix;
    }
  }

  // Force disable hexo highlight
  if (hexo.theme.config.highlight.enable) {
    hexo.config.highlight.enable = false;
  }

  // Merge configs in /source/_data/fluid_static_prefix.yml into hexo.theme.config.
  const configPath = path.join(__dirname, '../_static_prefix.yml');
  const yamlDoc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  hexo.theme.config.static_prefix = _.merge({}, yamlDoc, staticPrefix);
  this.log.debug('Fluid: theme static_prefix config merged');

  // Merge configs in hexo.config.theme_config and /source/_data/fluid_config.yml into hexo.theme.config.
  hexo.theme.config = _.mergeWith({}, hexo.theme.config, sourceConfig, hexo.config.theme_config,
    function (objValue, srcValue) {
      if (_.isArray(objValue)) {
        return srcValue;
      }
    });
  this.log.debug('Fluid: theme config merged');

  // Trigger action that requires configuration data.
  require('./lazyload').lazyload(hexo);
  this.log.debug('Configs:\n', JSON.stringify(hexo.theme.config, undefined, 2));

});
