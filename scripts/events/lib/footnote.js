'use strict';

const { stripHTML } = require('hexo-util');

// Register footnotes filter
module.exports = (hexo) => {
  const config = hexo.theme.config;
  if (config.post.footnote.enable) {
    hexo.extend.filter.register('before_post_render', (page) => {
      if (page.footnote !== false) {
        page.content = renderFootnotes(page.content, page.footnote);
      }
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
    const reFootnoteContent = /\[\^(\d+)]: ?([\S\s]+?)(?=\[\^(?:\d+)]|\n\n|$)/g;
    const reInlineFootnote = /\[\^(\d+)]\((.+?)\)/g;
    const reFootnoteIndex = /\[\^(\d+)]/g;
    const reCodeBlock = /<pre>[\s\S]*?<\/pre>/g;

    let footnotes = [];
    let html = '';
    let codeBlocks = [];

    // extract code block
    text = text.replace(reCodeBlock, function(match) {
      codeBlocks.push(match);
      return 'CODE_BLOCK_PLACEHOLDER';
    });

    // threat all inline footnotes
    text = text.replace(reInlineFootnote, function(match, index, content) {
      footnotes.push({
        index  : index,
        content: content ? content.trim() : ''
      });
      // remove content of inline footnote
      return '[^' + index + ']';
    });

    // threat all footnote contents
    text = text.replace(reFootnoteContent, function(match, index, content) {
      footnotes.push({
        index  : index,
        content: content ? content.trim() : ''
      });
      // remove footnote content
      return '';
    });

    // create map for looking footnotes array
    function createLookMap(field) {
      let map = {};
      for (let i = 0; i < footnotes.length; i++) {
        const item = footnotes[i];
        const key = item[field];
        map[key] = item;
      }
      return map;
    }
    const indexMap = createLookMap('index');

    // render (HTML) footnotes reference
    text = text.replace(reFootnoteIndex,
      function(match, index) {
        if (!indexMap[index]) {
          return match;
        }
        const tooltip = indexMap[index].content;
        return '<sup id="fnref:' + index + '" class="footnote-ref">'
          + '<a href="#fn:' + index + '" rel="footnote">'
          + '<span class="hint--top hint--rounded" aria-label="'
          + stripHTML(tooltip)
          + '">[' + index + ']</span></a></sup>';
      });

    // sort footnotes by their index
    footnotes.sort(function(a, b) {
      return a.index - b.index;
    });

    // render footnotes (HTML)
    footnotes.forEach(function(item) {
      html += '<li><span id="fn:' + item.index + '" class="footnote-text">';
      html += '<span>';
      const fn = hexo.render.renderSync({ text: item.content, engine: 'markdown' });
      html += fn.replace(/(<p>)|(<\/p>)/g, '').replace(/<br>/g, '');
      html += '<a href="#fnref:' + item.index + '" rev="footnote" class="footnote-backref"> ↩</a></span></span></li>';
    });

    // add footnotes at the end of the content
    if (footnotes.length) {
      text += '<section class="footnotes">';
      text += header || config.post.footnote.header || '';
      text += '<div class="footnote-list">';
      text += '<ol>' + html + '</ol>';
      text += '</div></section>';
    }

    // restore code block
    text = text.replace(/CODE_BLOCK_PLACEHOLDER/g, function() {
      return codeBlocks.shift();
    });

    return text;
  }
};
