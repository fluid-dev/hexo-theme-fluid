'use strict';

const fs = require('fs');
const path = require('path');
const objUtil = require('../../utils/object');

module.exports = (hexo) => {
  let dataConfig = {};
  let dataStaticConfig = {};

  if (hexo.locals.get) {
    const data = hexo.locals.get('data');
    if (data && data.fluid_config) {
      dataConfig = data.fluid_config;
    } else if (!configFromRoot(hexo)) {
      const isZh = hexo.config.language.search(/zh-CN/i) !== -1;
      if (isZh) {
        hexo.log.warn('[Fluid] 推荐你使用覆盖配置功能: https://hexo.fluid-dev.com/docs/guide/#%E8%A6%86%E7%9B%96%E9%85%8D%E7%BD%AE');
      } else {
        hexo.log.warn('[Fluid] It is recommended that you use override configuration: https://hexo.fluid-dev.com/docs/en/guide/#override-configuration');
      }
    }
    if (data && data.fluid_static_prefix) {
      dataStaticConfig = data.fluid_static_prefix;
    }
  }

  if (dataStaticConfig) {
    hexo.theme.config.static_prefix = objUtil.merge({}, hexo.theme.config.static_prefix, dataStaticConfig);
    hexo.log.debug('[Fluid] Merge data/fluid_static_prefix.yml into theme config.');
  }

  if (hexo.config.theme_config) {
    hexo.theme.config = objUtil.merge({}, hexo.theme.config, hexo.config.theme_config);
    hexo.log.debug('[Fluid] Merge theme_config in _config.yml into theme config.');
  }

  if (dataConfig) {
    hexo.theme.config = objUtil.merge({}, hexo.theme.config, dataConfig);
    hexo.log.debug('[Fluid] Merge data/fluid_config.yml into theme config.');
  }

  // Merge configs in hexo.config.theme_config into hexo.theme.config.
  hexo.theme.config = objUtil.merge({}, hexo.theme.config, hexo.config.theme_config);

  hexo.log.debug('[Fluid] Configs:\n', JSON.stringify(hexo.theme.config, undefined, 2));
};

const configFromRoot = (hexo) => {
  const configPath = path.join(hexo.base_dir, '_config.fluid.yml');
  return fs.existsSync(configPath);
};
