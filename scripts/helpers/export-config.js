/* global hexo */

'use strict';

const url = require('url');

/**
 * Export theme config to js
 */
hexo.extend.helper.register('export_config', function() {
  let { config, theme, fluid_version } = this;
  const exportConfig = {
    hostname     : url.parse(config.url).hostname || config.url,
    root         : config.root,
    version      : fluid_version,
    typing       : theme.fun_features.typing,
    toc          : theme.post.toc,
    anchorjs     : theme.fun_features.anchorjs,
    copy_btn     : theme.code.copy_btn,
    image_zoom   : theme.post.image_zoom,
    lazyload     : theme.lazyload,
    web_analytics: theme.web_analytics
  };
  return `<script id="fluid-configs">
    var Fluid = window.Fluid || {};
    var CONFIG = ${JSON.stringify(exportConfig)};
  </script>`;
});
