'use strict';

const {stripHTML} = require('hexo-util');

// Register footnotes filter
module.exports = (hexo) => {
  const config = hexo.theme.config;
  if (config.post.footnote.enable) {
    hexo.extend.filter.register('before_post_render', function (page) {
      page.content = renderFootnotes(page.content, page.footnote);
      return page;
    });
  }

  /**
   * Modified from https://github.com/kchen0x/hexo-reference
   *
   * Render markdown footnotes
   * @param {String} text
   * @param {String} header
   * @returns {String} text
   */
  function renderFootnotes(text, header) {
    const reFootnoteContent = /\[\^([a-zA-Z\d\u4e00-\u9fa5]+)]: ?([\S\s]+?)(?=\[\^(?:[a-zA-Z\d\u4e00-\u9fa5]+)]|\n\n|$)/g;
    const reInlineFootnote = /\[\^([a-zA-Z\d\u4e00-\u9fa5]+)]\((.+?)\)/g;
    const reFootnoteIndex = /\[\^([a-zA-Z\d\u4e00-\u9fa5]+)]/g;
    let footnotesMap = new Map();
    let html = '';

    // threat all inline footnotes
    text = text.replace(reInlineFootnote, function (match, index, content) {
      footnotesMap.set(index, content ? content.trim() : '');
      // remove content of inline footnote
      return '[^' + index + ']';
    });

    // threat all footnote contents
    text = text.replace(reFootnoteContent, function (match, index, content) {
      footnotesMap.set(index, content ? content.trim() : '');
      // remove footnote content
      return '';
    });

    // render (HTML) footnotes reference
    text = text.replace(reFootnoteIndex,
      function (match, index) {
        if (footnotesMap[index]) {
          return match;
        }
        return '<sup id="fnref:' + index + '" class="footnote-ref">'
          + '<a href="#fn:' + index + '" rel="footnote">'
          + '<span class="hint--top hint--rounded" aria-label="'
          + stripHTML(footnotesMap.get(index))
          + '">[' + index + ']</span></a></sup>';
      });

    // sort footnotes by their index
    // footnotes.sort(function(a, b) {
    //   return a.index - b.index;
    // });

    // render footnotes (HTML)
    for (let key of footnotesMap.keys()) {
      html += '<li><span id="fn:' + key + '" class="footnote-text">';
      html += '<span><span style="font-weight: bold;font-style:italic;">' + key + '：</span>';
      const fn = hexo.render.renderSync({text: footnotesMap.get(key), engine: 'markdown'});
      html += fn.replace(/(<p>)|(<\/p>)/g, '');
      html += '<a href="#fnref:' + key + '" rev="footnote" class="footnote-backref">↩</a></span></span></li>';
    }

    // add footnotes at the end of the content
    if (footnotesMap.size) {
      text += '<section class="footnotes">';
      text += header || config.post.footnote.header || '';
      text += '<div class="footnote-list">';
      text += '<ol>' + html + '</ol>';
      text += '</div></section>';
    }
    return text;
  }
};
