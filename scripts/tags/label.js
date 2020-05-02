/* global hexo */

'use strict';

const label = (args) => {
  args = args.join(' ').split('@');
  const classes = args[0] || 'default';
  const text = args[1] || '';

  !text && hexo.log.warn('Label text must be defined!');

  return `<span class="label label-${classes.trim()}">${text}</span>`;
};

// {% label class @text %}
hexo.extend.tag.register('label', label, { ends: false });
