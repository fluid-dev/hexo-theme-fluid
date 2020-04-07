'use strict';

function postNote(args, content) {
  if (!args || !args[0]) {
    args = ['primary'];
  }
  return `<div class="note note-${ args.join(' ') }">
            ${ hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('') }
          </div>`;
}

// {% note [primary...] [class...] %}
hexo.extend.tag.register('note', postNote, { ends: true });
