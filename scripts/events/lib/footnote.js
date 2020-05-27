'use strict';

// Register footnotes filter
module.exports = (hexo) => {
  if (hexo.theme.config.post.footnote.enable) {
    hexo.extend.filter.register('before_post_render', function(data) {
      data.content = renderFootnotes(data.content);
      return data;
    });
  }

  /**
   * Modify by https://github.com/kchen0x/hexo-reference
   *
   * Render markdown footnotes
   * @param {String} text
   * @returns {String} text
   */
  function renderFootnotes(text) {
    var footnotes = [];
    var reFootnoteContent = /\[\^(\d+)]: ?([\S\s]+?)(?=\[\^(?:\d+)]|\n\n|$)/g;
    var reInlineFootnote = /\[\^(\d+)]\((.+?)\)/g;
    var reFootnoteIndex = /\[\^(\d+)]/g;
    var html = '';

    // threat all inline footnotes
    text = text.replace(reInlineFootnote, function(match, index, content) {
      footnotes.push({
        index  : index,
        content: content
      });
      // remove content of inline footnote
      return '[^' + index + ']';
    });

    // threat all footnote contents
    text = text.replace(reFootnoteContent, function(match, index, content) {
      footnotes.push({
        index  : index,
        content: content
      });
      // remove footnote content
      return '';
    });

    // create map for looking footnotes array
    function createLookMap(field) {
      var map = {};
      for (var i = 0; i < footnotes.length; i++) {
        var item = footnotes[i];
        var key = item[field];
        map[key] = item;
      }
      return map;
    }
    var indexMap = createLookMap('index');

    // render (HTML) footnotes reference
    text = text.replace(reFootnoteIndex,
      function(match, index) {
        var tooltip = indexMap[index].content;
        return '<sup id="fnref:' + index + '" class="footnote-ref">'
          + '<a href="#fn:' + index + '" rel="footnote">'
          + '<span class="" aria-label="'
          + tooltip
          + '">[' + index + ']</span></a></sup>';
      });

    // sort footnotes by their index
    footnotes.sort(function(a, b) {
      return a.index - b.index;
    });

    // render footnotes (HTML)
    footnotes.forEach(function(footNote) {
      html += '<li><span id="fn:' + footNote.index + '" class="footnote-text">';
      html += '<span>';
      const fn = hexo.render.renderSync({ text: footNote.content.trim(), engine: 'markdown' });
      html += fn.replace(/(^<p>)|(<\/p>$)/g, '');
      html += '<a href="#fnref:' + footNote.index + '" rev="footnote" class="footnote-backref"> ↩</a></span></span></li>';
    });

    // add footnotes at the end of the content
    if (footnotes.length) {
      text += '<section class="footnotes">';
      text += '<hr>';
      text += '<div class="footnote-list">';
      text += '<ol>' + html + '</ol>';
      text += '</div></section>';
    }
    return text;
  }
};
