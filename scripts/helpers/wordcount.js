/* global hexo */

'use strict';

const { stripHTML } = require('hexo-util');

const getWordCount = (post) => {
  const lang = post.lang.toLowerCase();
  // post.origin is the original post content of hexo-blog-encrypt
  const content = stripHTML(post.origin || post.content).replace(/\r?\n|\r/g, '').replace(/\s+/g, '');

  if (!post.wordcount) {
    if (['zh-cn', 'zh-hk', 'zh-tw'].includes(lang)) {
      post.wordcount = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
    } else {
      post.wordcount = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
    }
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
