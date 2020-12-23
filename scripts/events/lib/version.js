'use strict';

module.exports = (hexo) => {
  if (!hexo.theme.config.version.check) {
    return;
  }

  const https = require('https');
  const path = require('path');
  const { version } = require(path.normalize(path.join(hexo.theme_dir, 'package.json')));
  const isZh = hexo.theme.i18n.languages[0].search(/zh-CN/i) !== -1;

  const errorLog = (_) => {
    if (isZh) {
      hexo.log.warn('[Fluid] 获取主题最新版本信息失败，可能与 GitHub 连接不畅，不影响正常使用');
    } else {
      hexo.log.warn('[Fluid] Failed to detect version info. Don\'t worry, it won\'t hinder the use');
    }
  };

  https.get('https://api.github.com/repos/fluid-dev/hexo-theme-fluid/releases/latest', {
    headers: {
      'User-Agent': 'Theme Fluid Client'
    }
  }, (res) => {
    let result = '';
    res.on('data', data => {
      result += data;
    });
    res.on('end', () => {
      try {
        const tag = JSON.parse(result).tag_name;
        if (!tag) {
          errorLog('Missing release tag');
          return;
        }
        const latest = tag.replace('v', '').split('.');
        const current = version.split('.');

        let isOutdated = false;
        for (let i = 0; i < Math.max(latest.length, current.length); i++) {
          if (!current[i] || latest[i] > current[i]) {
            isOutdated = true;
            break;
          }
          if (latest[i] < current[i]) {
            break;
          }
        }

        if (isOutdated) {
          if (isZh) {
            hexo.log.warn(`[Fluid] 你的主题版本已落后. 当前版本: v${current.join('.')}, 最新版本: v${latest.join('.')}`);
            hexo.log.warn('[Fluid] 查看 https://github.com/fluid/hexo-theme-fluid/releases 获取更多信息.');
          } else {
            hexo.log.warn(`[Fluid] Your theme version is outdated. Current version: v${current.join('.')}, latest version: v${latest.join('.')}`);
            hexo.log.warn('[Fluid] Visit https://github.com/fluid/hexo-theme-fluid/releases for more information.');
          }
        } else {
          if (isZh) {
            hexo.log.info(`[Fluid] 感谢支持！你现在使用的是最新版本，版本号: v${current.join('.')}`);
          } else {
            hexo.log.info(`[Fluid] Congratulations! Your are using the latest version of theme Fluid. Current version: v${current.join('.')}`);
          }
        }
      } catch (err) {
        errorLog(err);
      }
    });
  }).on('error', err => {
    errorLog(err);
  });
};
