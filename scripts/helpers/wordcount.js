/* global hexo */

'use strict';

const { stripHTML } = require('hexo-util');

const getWordCount = (post) => {
  const content = stripHTML(post.origin || post.content).replace(/\r?\n|\r/g, ' ').trim();
  
  if (!post.wordcount) {
    // Match words and characters more accurately
    const zhCount = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
    const enCount = (content.match(/[a-zA-Z0-9]+/g) || []).length;
    post.wordcount = zhCount + enCount;
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
