'use strict';

module.exports = (hexo) => {
  const isZh = hexo.theme.i18n.languages[0].search(/zh-CN/i) !== -1;

  // Breaking change at v1.8.3 2020/09/03
  if (hexo.theme.config.highlight && !hexo.theme.config.code) {
    if (isZh) {
      hexo.log.warn('[Fluid] 检测到弃用的配置项: "highlight" 已被修改为 "code:highlight"，请根据新版本更新');
    } else {
      hexo.log.warn('[Fluid] Deprecated config detected: "highlight" has been modified to "code:highlight", please update according to the release.');
    }
    hexo.theme.config.code = {
      copy_btn : hexo.theme.config.highlight.copy_btn,
      highlight: {
        enable     : hexo.theme.config.highlight.enable,
        lib        : 'highlightjs',
        highlightjs: {
          style   : hexo.theme.config.highlight.style,
          bg_color: hexo.theme.config.highlight.bg_color
        },
        prismjs: {
          style     : 'default',
          preprocess: true
        }
      }
    };
  }

  // Some configs that require hexo >= 5.0
  if (hexo.version[0] < '5') {
    if (hexo.theme.config.code.highlight.lib === 'prismjs' && hexo.theme.config.code.highlight.prismjs.preprocess) {
      hexo.theme.config.code.highlight.prismjs.preprocess = false;
      if (isZh) {
        hexo.log.warn('[Fluid] 检测到 Hexo 版本低于 5.0.0，配置项 "prismjs:preprocess" 参数值被强制设置为 false');
      } else {
        hexo.log.warn('[Fluid] Hexo version < 5.0.0 detected, "prismjs:preprocess" in theme config is forced to false.');
      }
    }
  }

  // Breaking change at v1.8.7 2020/12/02
  if (hexo.theme.config.index.post_default_img) {
    if (isZh) {
      hexo.log.warn('[Fluid] 检测到弃用的配置项: "index:post_default_img" 已被修改为 "post:default_index_img"，请根据新版本更新');
    } else {
      hexo.log.warn('[Fluid] Deprecated config detected: "index:post_default_img" has been modified to "post:default_index_img", please update according to the release.');
    }
    hexo.theme.config.post.default_index_img = hexo.theme.config.index.post_default_img;
  }

  // Breaking change at v1.8.7 2020/12/10
  if (hexo.theme.config.banner_parallax) {
    if (isZh) {
      hexo.log.warn('[Fluid] 检测到弃用的配置项: "banner_parallax" 已被修改为 "banner:parallax"，请根据新版本更新');
    } else {
      hexo.log.warn('[Fluid] Deprecated config detected: "banner_parallax" has been modified to "banner:parallax", please update according to the release.');
    }
    if (!hexo.theme.config.banner) {
      hexo.theme.config.banner = {};
    }
    hexo.theme.config.banner.parallax = hexo.theme.config.banner_parallax;
  }
};
