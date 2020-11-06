/* global hexo */

'use strict';

// 生成前过滤文章
hexo.extend.filter.register('before_generate', function() {
  this._bindLocals();

  const allPages = this.locals.get('pages');
  allPages.data.map((page) => {
    if (page.comment !== true) {
      page.comments = false;
    }
    return page;
  });
  this.locals.set('pages', allPages);

  const allPosts = this.locals.get('posts');
  allPosts.data.map((post) => {
    if (post.comment === false) {
      post.comments = false;
    }
    return post;
  });
  const hidePosts = allPosts.filter(post => post.hide);
  const normalPosts = allPosts.filter(post => !post.hide);

  this.locals.set('all_posts', allPosts);
  this.locals.set('hide_posts', hidePosts);
  this.locals.set('posts', normalPosts);
});

const original_post_generator = hexo.extend.generator.get('post');

hexo.extend.generator.register('post', function(locals) {
  // 发送时需要把过滤的页面也加入
  return original_post_generator.bind(this)({
    posts: new locals.posts.constructor(
      locals.posts.data.concat(locals.hide_posts.data)
    )
  });
});
