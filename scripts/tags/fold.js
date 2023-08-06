const md5 = require('../utils/crypto');

hexo.extend.tag.register('fold', (args, content) => {
  args = args.join(' ').split('@');
  const classes = args[0] || 'default';
  const text = args[1] || '';
  const id = 'collapse-' + md5(content).slice(0, 8);

  return `
    <div class="fold">
      <div class="fold-title fold-${classes.trim()} collapsed" data-toggle="collapse" href="#${id}" role="button" aria-expanded="false" aria-controls="${id}">
        <div class="fold-arrow">▶</div>${text}
      </div>
      <div class='fold-content collapse' id="${id}">
        ${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}
      </div>
    </div>`;
}, {
  ends: true
});
