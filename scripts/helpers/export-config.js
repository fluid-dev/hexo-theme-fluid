/* global hexo */

'use strict';

const url = require('url');
const urlJoin = require('../utils/url-join');

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
    anchorjs     : theme.fun_features.anchorjs,
    progressbar  : theme.fun_features.progressbar,
    copy_btn     : theme.code.copy_btn,
    image_caption: theme.post.image_caption,
    image_zoom   : theme.post.image_zoom,
    toc          : theme.post.toc,
    lazyload     : theme.lazyload,
    web_analytics: theme.web_analytics,
    search_path  : urlJoin(config.root, theme.search.path)
  };
  return `<script id="fluid-configs">
    var Fluid = window.Fluid || {};
    var CONFIG = ${JSON.stringify(exportConfig)};
  </script>`;
});
