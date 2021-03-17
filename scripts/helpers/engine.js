/* global hexo */

'use strict';

hexo.extend.helper.register('inject_point', function(point) {
  return this.theme.injects[point]
    .map(item => this.partial(item.layout, item.locals, item.options))
    .join('');
});
