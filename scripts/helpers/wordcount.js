/* global hexo */

'use strict';

const { stripHTML } = require('hexo-util');

const getWordCount = (post) => {
  return post.wordcount;
};

const symbolsCount = (count) => {
  if (count > 9999) {
    count = Math.round(count / 1000) + 'k'; // > 9999 => 11k
  } else if (count > 999) {
    count = (Math.round(count / 100) / 10) + 'k'; // > 999 => 1.1k
  } // < 999 => 111
  return count;
};

hexo.extend.helper.register('min2read', (post, { awl = 2, wpm = 200 }) => {
  const minutes = Math.round(getWordCount(post) / (awl * wpm));
  return minutes < 1 ? 1 : minutes;
});

hexo.extend.helper.register('wordcount', (post) => {
  return symbolsCount(getWordCount(post));
});

hexo.extend.helper.register('wordtotal', (site) => {
  let count = 0;
  site.posts.forEach(post => {
    count += getWordCount(post);
  });
  return symbolsCount(count);
});

hexo.extend.filter.register('after_post_render', (page) => {
  const meta = hexo.theme.config.post.meta;
  if (meta.wordcount.enable || meta.min2read.enable) {
    page.wordcount = stripHTML(page.content).replace(/\r?\n|\r/g, '').replace(/\s+/g, '').length;
  }
}, 0);
