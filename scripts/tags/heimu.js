/* global hexo */

'use strict';

const heimu = (args) => {
  args = args.join(' ').split('@');
  const title = args[0] || '你知道的太多了';
  const text = args[1] || '';

  !text && hexo.log.warn('[Fluid] Heimu text must be defined!');

  return `<span class="heimu" title="${title.trim()}">${text}</span>`;
};

// {% heimu title @text %}
hexo.extend.tag.register('heimu', heimu, { ends: false });
