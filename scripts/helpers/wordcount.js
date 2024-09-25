/* global hexo */

'use strict';

const { stripHTML } = require('hexo-util');

const getWordCount = (post) => {
  if (!post.wordcount) {
    // post.origin is the original post content of hexo-blog-encrypt
    const content = stripHTML(post.origin || post.content).replace(/[\s\r\n]/g, '');
    post.wordcount = content.length;
  }
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

hexo.extend.helper.register('min2read', (post, { awl, wpm }) => {
  return Math.floor(getWordCount(post) / ((awl || 2) * (wpm || 60))) + 1;
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
