'use strict';

function postLabel(args) {
  args = args.join(' ').split('@');
  var classes = args[0] || 'default';
  var text    = args[1] || '';

  !text && hexo.log.warn('Label text must be defined!');

  return `<span class="label ${classes.trim()}">${text}</span>`;
}

// {% label [primary...]@text %}
hexo.extend.tag.register('label', postLabel, {ends: false});
