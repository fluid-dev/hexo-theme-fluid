/* global hexo */

'use strict';

function findVisiblePost(post, key) {
  for (let item = post[key]; item; item = item[key]) {
    if (!item.hide) {
      return item;
    }
  }
  return null;
}

hexo.extend.helper.register('prev_post', function prev_post(post) {
  return findVisiblePost(post, 'prev');
});

hexo.extend.helper.register('next_post', function next_post(post) {
  return findVisiblePost(post, 'next');
});
