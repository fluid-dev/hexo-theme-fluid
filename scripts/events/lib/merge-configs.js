'use strict';

const fs = require('fs');
const path = require('path');
const objUtil = require('../../utils/object');
const { isNotEmptyObject } = require('../../utils/object');

module.exports = (hexo) => {
  const isZh = hexo.theme.i18n.languages[0].search(/zh-CN/i) !== -1;

  let dataConfig = {};
  let dataStaticConfig = {};

  if (hexo.locals.get) {
    const data = hexo.locals.get('data');
    if (data && isNotEmptyObject(data.fluid_config)) {
      dataConfig = data.fluid_config;
    } else if (!configFromRoot(hexo)) {
      if (isZh) {
        hexo.log.warn('[Fluid] 推荐你使用覆盖配置功能: https://hexo.fluid-dev.com/docs/guide/#%E8%A6%86%E7%9B%96%E9%85%8D%E7%BD%AE');
      } else {
        hexo.log.warn('[Fluid] It is recommended that you use override configuration: https://hexo.fluid-dev.com/docs/en/guide/#override-configuration');
      }
    }
    if (data && isNotEmptyObject(data.fluid_static_prefix)) {
      dataStaticConfig = data.fluid_static_prefix;
    }
  }

  if (isNotEmptyObject(hexo.config.theme_config)) {
    hexo.theme.config = objUtil.merge({}, hexo.theme.config, hexo.config.theme_config);
    if (isZh) {
      hexo.log.info('[Fluid] 读取 _config.yml 中 theme_config 配置项覆盖配置');
    } else {
      hexo.log.info('[Fluid] Merge theme config from theme_config in _config.yml');
    }
  }

  if (isNotEmptyObject(dataStaticConfig)) {
    hexo.theme.config.static_prefix = objUtil.merge({}, hexo.theme.config.static_prefix, dataStaticConfig);
    if (isZh) {
      hexo.log.info('[Fluid] 读取 source/_data/fluid_static_prefix.yml 文件覆盖配置');
    } else {
      hexo.log.info('[Fluid] Merge theme config from source/_data/fluid_static_prefix.yml');
    }
  }

  if (isNotEmptyObject(dataConfig)) {
    hexo.theme.config = objUtil.merge({}, hexo.theme.config, dataConfig);
    if (isZh) {
      hexo.log.info('[Fluid] 读取 source/_data/fluid_config.yml 文件覆盖配置');
    } else {
      hexo.log.info('[Fluid] Merge theme config from source/_data/fluid_config.yml');
    }
  }

  hexo.log.debug('[Fluid] Output theme config:\n', JSON.stringify(hexo.theme.config, undefined, 2));
};

const configFromRoot = (hexo) => {
  const configPath = path.join(hexo.base_dir, '_config.fluid.yml');
  return fs.existsSync(configPath);
};
