/* global hexo */

'use strict';

// 生成前过滤文章
hexo.extend.filter.register('before_generate', function() {
  this._bindLocals();

  const allPages = this.locals.get('pages');
  allPages.data.map((page) => {
    if (page.comment !== true) {
      page.comments = typeof page.comment === 'string' && page.comment !== '';
    } else {
      page.comments = true;
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
  const indexPost = allPosts.filter(post => !post.hide && !post.archive)

  this.locals.set('all_posts', allPosts);
  this.locals.set('hide_posts', hidePosts);
  this.locals.set('posts', normalPosts);
  this.locals.set('index_posts', indexPost);
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

// 渲染文章后的过滤
hexo.extend.filter.register('after_post_render', (page) => {
  // 移除 hexo-renderer-pandoc 生成的 <colgroup>
  page.content = page.content.replace(/<colgroup>.+?<\/colgroup>/gims, '');
  // 移除 hexo-renderer-pandoc 生成的 <span class="footnote-text">...<br>...</span>
  page.content = page.content.replace(/(class="footnote-text".+?)<br.+?>(.+?rev="footnote")/gims, '$1$2');
  return page;
});
