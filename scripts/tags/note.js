/* global hexo */

'use strict';

const note = (args, content) => {
  if (!args || !args[0]) {
    args = ['default'];
  }
  return `<div class="note note-${args.join(' ')}">
            ${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}
          </div>`;
};

/*
  {% note class %}
  text
  {% endnote %}
 */
hexo.extend.tag.register('note', note, { ends: true });
