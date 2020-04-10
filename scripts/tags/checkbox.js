'use strict';

function checkbox(args) {
  args = args.join(' ').split(',');
  let text = args[0] || '';
  let checked = args[1] || '';
  let inline = (args[2] || '').length;

  return `${ !inline ? '<div>' : ''}
            <input type="checkbox" ${ checked.length > 0 ? 'checked="checked"' : '' }></input>${ text }
          ${ !inline ? '</div>' : ''}`;
}

// {% cb, text, inline? %}
hexo.extend.tag.register('checkbox', checkbox, {ends: false});
hexo.extend.tag.register('cb', checkbox, {ends: false});
