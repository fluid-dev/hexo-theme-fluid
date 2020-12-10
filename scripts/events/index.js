/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  require('./lib/hello')(hexo);
  require('./lib/merge-configs')(hexo);
  require('./lib/compatible-configs')(hexo);
  require('./lib/highlight')(hexo);
  require('./lib/lazyload')(hexo);
  require('./lib/footnote')(hexo);
});

hexo.on('generateAfter', () => {
  require('./lib/version')(hexo);
});
