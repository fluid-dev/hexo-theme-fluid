/* global hexo */

'use strict';

const checkbox = (args) => {
  args = args[0] === ',' ? args.slice(1) : args;
  args = args.join(' ').split(',');
  const text = (args[0] || '').trim();

  if (text === 'checked' || text === 'true' || text === 'false') {
    const checked = text === 'checked' || text === 'true';
    return `<input type="checkbox" disabled ${checked ? 'checked="checked"' : ''}>`;
  }
  !text && hexo.log.warn('Checkbox text must be defined!');

  const checked = (args[1] || '').length > 0 && args[1].trim() !== 'false';
  const inline = (args[2] || '').length > 0 && args[2].trim() !== 'false';

  return `${!inline ? '<div>' : ''}
            <input type="checkbox" disabled ${checked ? 'checked="checked"' : ''}>${text}
          ${!inline ? '</div>' : ''}`;

};

// {% cb text, checked?, inline? %}
hexo.extend.tag.register('checkbox', checkbox, { ends: false });
hexo.extend.tag.register('cb', checkbox, { ends: false });
