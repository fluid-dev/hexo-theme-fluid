'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const objUtil = require('../../utils/object');

module.exports = (hexo) => {
  let sourceConfig, staticPrefix;

  if (hexo.locals.get) {
    const data = hexo.locals.get('data');
    sourceConfig = {};
    if (data && data.fluid_config) {
      sourceConfig = data.fluid_config;
    } else {
      const isZh = hexo.config.language.search(/zh-CN/i) !== -1;
      if (isZh) {
        hexo.log.warn('推荐你使用覆盖配置功能: https://hexo.fluid-dev.com/docs/guide/#%E8%A6%86%E7%9B%96%E9%85%8D%E7%BD%AE');
      } else {
        hexo.log.warn('It is recommended that you use override configuration: https://hexo.fluid-dev.com/docs/en/guide/#override-configuration');
      }
    }
    staticPrefix = {};
    if (data && data.fluid_static_prefix) {
      staticPrefix = data.fluid_static_prefix;
    }
  }

  // Merge configs in /source/_data/fluid_static_prefix.yml into hexo.theme.config.
  const configPath = path.join(hexo.theme_dir, '_static_prefix.yml');
  const yamlDoc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  hexo.theme.config.static_prefix = objUtil.merge({}, yamlDoc, staticPrefix);
  hexo.log.debug('Fluid: theme static_prefix config merged');

  // Merge configs in hexo.config.theme_config and /source/_data/fluid_config.yml into hexo.theme.config.
  hexo.theme.config = objUtil.merge({}, hexo.theme.config, sourceConfig, hexo.config.theme_config);

  hexo.log.debug('Fluid: theme config merged');
  hexo.log.debug('Configs:\n', JSON.stringify(hexo.theme.config, undefined, 2));
};
