'use strict';

function postButton(args) {
  args = args.join(' ').split(',');
  const url = args[0];
  let text = args[1] || '';
  let title = args[2] || '';

  if (!url) {
    hexo.log.warn('URL can NOT be empty.');
  }

  text = text.trim();
  title = title.trim();

  return `<a class="btn" href="${ url }" ${ title.length > 0 ? ` title="${ title }"` : '' }>${ text }</a>`;
}

// {% btn url, text, title %}
hexo.extend.tag.register('button', postButton, {ends: false});
hexo.extend.tag.register('btn', postButton, {ends: false});
