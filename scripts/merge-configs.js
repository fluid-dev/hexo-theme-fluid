const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const _ = require('./utils/lodash');

// 用于防止重复的执行
let stage = 0;

const mergeConfig = function () {
  if (stage === 1) {
    stage = 2;
    return;
  }

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

  // Merge configs in /source/_data/fluid_static_prefix.yml into hexo.theme.config.
  const configPath = path.join(__dirname, '../_static_prefix.yml');
  const yamlDoc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  hexo.theme.config.static_prefix = _.merge({}, yamlDoc, staticPrefix);
  this.log.debug('Fluid: theme static_prefix config merged');

  // Merge configs in hexo.config.theme_config and /source/_data/fluid_config.yml into hexo.theme.config.
  hexo.theme.config = _.merge({}, hexo.theme.config, sourceConfig, hexo.config.theme_config);
  // Exclude
  if (sourceConfig) {
    if (sourceConfig.navbar && sourceConfig.navbar.menu) {
      hexo.theme.config.navbar.menu = sourceConfig.navbar.menu;
    }
    if (sourceConfig.aplayer && sourceConfig.aplayer.songs) {
      hexo.theme.config.aplayer.songs = sourceConfig.aplayer.songs;
    }
    if (sourceConfig.about && sourceConfig.about.icons) {
      hexo.theme.config.about.icons = sourceConfig.about.icons;
    }
    if (sourceConfig.links && sourceConfig.links.items) {
      hexo.theme.config.links.items = sourceConfig.links.items;
    }
  }
  this.log.debug('Fluid: theme config merged');

  // Trigger action that requires configuration data.
  if (stage === 0) {
    // Force disable hexo highlight
    if (hexo.theme.config.highlight.enable) {
      hexo.config.highlight.enable = false;
    }

    require('./lazyload').lazyload(hexo);

    stage = 1;
  }

  this.log.debug('Configs:\n', hexo.theme.config);
};

hexo.on('generateBefore', mergeConfig);

hexo.extend.generator.register('merge_config', mergeConfig);
