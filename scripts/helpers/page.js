/* global hexo */

'use strict';

hexo.extend.helper.register('prev_post', function prev_post(post) {
  const prev = post.prev;
  if (!prev) {
    return null;
  }
  if (prev.hide) {
    return prev_post(prev);
  }
  return prev;
});

hexo.extend.helper.register('next_post', function next_post(post) {
  const next = post.next;
  if (!next) {
    return null;
  }
  if (next.hide) {
    return next_post(next);
  }
  return next;
});
