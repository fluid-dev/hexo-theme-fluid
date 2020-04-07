'use strict';

function centerQuote(args, content) {
  return '<blockquote class="blockquote-center">'
       + hexo.render.renderSync({text: content, engine: 'markdown'})
       + '</blockquote>';
}

// {% cq %} text {% endcq %}
hexo.extend.tag.register('centerquote', centerQuote, {ends: true});
hexo.extend.tag.register('cq', centerQuote, {ends: true});
