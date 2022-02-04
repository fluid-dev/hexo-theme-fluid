/* global hexo */

'use strict';

hexo.extend.helper.register('point_injected', function(type) {
  return hexo.theme.config.injects[type] && hexo.theme.config.injects[type].length > 0;
});
