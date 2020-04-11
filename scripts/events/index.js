'use strict';

hexo.on('generateBefore', () => {
  require('./lib/merge-configs')(hexo);
  require('./lib/lazyload')(hexo);
});
