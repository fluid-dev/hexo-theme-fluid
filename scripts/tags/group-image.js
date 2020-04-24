/* global hexo */

'use strict';

const DEFAULT_LAYOUTS = {
  2 : [1, 1],
  3 : [2, 1],
  4 : [2, 2],
  5 : [3, 2],
  6 : [3, 3],
  7 : [3, 2, 2],
  8 : [3, 2, 3],
  9 : [3, 3, 3],
  10: [3, 2, 2, 3]
};

const groupBy = (total, layout) => {
  const r = [];
  for (let count of total) {
    r.push(layout.slice(0, count));
    layout = layout.slice(count);
  }
  return r;
};

const templates = {

  dispatch: (images, total, layout) => {
    const valid = layout && (layout.reduce((prev, current) => prev + current) === total);
    const _layout = valid ? layout : DEFAULT_LAYOUTS[total];
    return _layout ? templates.getHTML(groupBy(_layout, images)) : templates.defaults(images);
  },

  defaults: (images) => {
    const ROW_SIZE = 3;
    const rows = images.length / ROW_SIZE;
    const imageArr = [];

    for (let i = 0; i < rows; i++) {
      imageArr.push(images.slice(i * ROW_SIZE, (i + 1) * ROW_SIZE));
    }

    return templates.getHTML(imageArr);
  },

  getHTML: (rows) => {
    return rows.map(row => {
      return `<div class="group-image-row">${templates.getColumnHTML(row)}</div>`;
    }).join('');
  },

  getColumnHTML: (images) => {
    return images.map(image => {
      return `<div class="group-image-wrap">${image}</div>`;
    }).join('');
  }
};

const groupImage = (args, content) => {
  const total = parseInt(args[0], 10);
  const layout = args[1] && args[1].split('-').map((v) => parseInt(v, 10));

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  const images = content.match(/<img[\s\S]*?>/g);

  return `<div class="group-image-container">${templates.dispatch(images, total, layout)}</div>`;
};

/*
  {% groupimage total n1-n2-n3-... %}
  ![](url)
  ![](url)
  ![](url)
  {% endgroupimage %}
 */
hexo.extend.tag.register('groupimage', groupImage, { ends: true });
hexo.extend.tag.register('gi', groupImage, { ends: true });
