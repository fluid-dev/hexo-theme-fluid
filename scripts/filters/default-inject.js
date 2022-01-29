/* global hexo */

'use strict';

const path = require('path');

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.header.file('default', path.join(hexo.theme_dir, 'layout/_partials/header.ejs'));
  injects.footer.file('default', path.join(hexo.theme_dir, 'layout/_partials/footer.ejs'));

  injects.postLeft.file('default', path.join(hexo.theme_dir, 'layout/_partials/post/sidebar-left.ejs'));
  injects.postRight.file('default', path.join(hexo.theme_dir, 'layout/_partials/post/sidebar-right.ejs'));
  injects.postMetaHeader.file('default', path.join(hexo.theme_dir, 'layout/_partials/post/meta-header.ejs'));
  if (hexo.theme.config.post.copyright.enable) {
    injects.postCopyright.file('default', path.join(hexo.theme_dir, 'layout/_partials/post/copyright.ejs'));
  }
  if (hexo.theme.config.post.comments.enable) {
    injects.postComments.file('default', path.join(hexo.theme_dir, 'layout/_partials/comments.ejs'));
  }

  injects.pageComments.file('default', path.join(hexo.theme_dir, 'layout/_partials/comments.ejs'));
}, -99);
